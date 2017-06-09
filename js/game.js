//Author: Benny Dorlisme
client_entry.entry_point("launch_stream_audio","guitar")
var n = (function() {

    var functions = {};
    functions.setPlayerScore = function (value) {
        $("#current_score").text(value);
    }
    functions.setPlayerAttempts = function (value) {

        $("#current_number_of_trys_left").text(value);
    }
    functions.setLevel = function (value) {

        $("#current_game_level").text(value);
    }
    var Game = {
		/*  Object representing the player
		 * ********************************
		 *  @param name                    ******************************
		 *  The player's name. The player can change it at any time.*****
		 *  @param score                                              ***
		 *  The player's current score.                               ***
		 *  @param skills                                             ***
		 *  The skills currently avaiable to the player.              ***
		 *  @param highscore                                          ***
		 *  The highest score the player has ever accumulated.        ***
		 * **************************************************************
		 */
        Player: {

            name: null,
            score: null,
            skills: null,
            highscore: null,

			/*  Object representing the player's computer
			 * *******************************************
			 *  @param os                                **
			 *  The operating system the player is using.**
			 *  @param broswer                           **
			 *  The browser the player is using.         **
			 *  @param ip_address                        **
			 *  The ip address of the player is using.   **
			 *  @param mac_address                       **
			 *  The mac address of the player's computer.**
			 * ********************************************
			 */
            System: {

                os: null,
                browser: null,
                ip_address: null,
                mac_address: null

            },
            //Function to initialize the Player Object.
            initPlayer: function () {

                // need to find a way to fully init player

                this.name = document.getElementById("player_name").value;
                this.score = 0;
                this.skills = null;
                Game.Player.System.os = getOS();
                Game.Player.System.browser = null;
                Game.Player.System.ip_address = null;
                Game.Player.System.mac_address = null;
                if (isNaN(localStorage.highscore)) {
                    localStorage.highscore = 0;
                    this.highscore = localStorage.highscore;
                } else {

                    this.highscore = localStorage.highscore;
                }
            }

        },
		/*  Object representing the game's interface
		 * ******************************************
		 * @param circles
		 * an array to hold the circles in the interface
		 */
        Interface: {
			/*  Object representing the game's hud
			 * ************************************
			 *  @param player_name                 *********************************************
			 *  The player's name to be displayed in the hud.                              *****
			 *  @param player_score                                                          ***
			 *  The player's current score to be displayed in the hud.                       ***
			 *  @param attempts_left                                                         ***
			 *  The number of attempts the player has left to play the game                  ***
			 *  @param highscore                                                             ***
			 *  The highest score the player has ever accumulated to be displayed in the hud.***
			 * *********************************************************************************
			 */
            Hud: {

                player_name: null,
                player_score: null,
                attempts_left: null,
                highscore: null

            },
			/*  Object representing all the possible outcomes of the game's circles
			 * **********************************************************************
			 *  @param number_of_possibilities         ******************************
			 *  The the number of possible outcomes                             *****
			 *  @param array                                                      ***
			 *  An array to hold realtime outcomes                                ***
			 * **********************************************************************
			 */
            possibilities: {

                number_of_possibilities: Math.pow(16, 3),

                array: [],
                setPossibility: function (a) {
                    this.array.push(a);
                }

            },
            circles: [],

			/*  Object representing skills currently in the interface
			 * ******************************************************
			 * @param box                                        ****
			 * an array of the skills                             ***
			 * ******************************************************
			 */
            skills: {
                box: []
            },
			/*  Object representing the energybar in the interface
			 * ******************************************************
			 * @param value                                       ****
			 * A value representing the player' energy
			 *                              ***
			 * ******************************************************
			 */
            energybar: {
                value: null,
                setEnergyBar: function (number) {

                    this.value += number;
                    if (this.value > 200) {
                        $("#energy_layer_3").animate({
                            width: "+=" + number + "%"
                        },100);
                        console.log("energy:" + this.value);
                    } else if (this.value > 100 && this.value < 200 || this.value > 100 && this.value === 200) {
                        $("#energy_layer_3").css("width", 0);
                        $("#energy_layer_2").animate({width: "+=" + number + "%"
                        },100);
                        console.log("energy:" + this.value);
                    } else if (this.value > 0 && this.value < 100 ||this.value > 0 && this.value === 100) {
                        $("#energy_layer_1").animate(
                            {width: "+=" + number + "%"
                            },100);
                        console.log("energy:" + this.value);
                    } else if (this.value == 0) {

                        return;
                    }
                }

            },
            initInterface: function () {
                Game.Interface.Hud.player_name = Game.Player.name;
                Game.Interface.Hud.player_score = Game.Player.score;
                functions.setPlayerScore(Game.Interface.Hud.player_score)
                Game.Interface.Hud.highscore = Game.Player.highscore;
                Game.Interface.Hud.attempts_left = 3;
                functions.setPlayerAttempts(Game.Interface.Hud.attempts_left)
                functions.setLevel(Game.Data.level)
                Game.Interface.energybar.value = 300;
                for (var i = 0; i < 16; i++) {
                    Game.Interface.circles.push({
                        status: "null", last_status: "null", clicked: false, target: "null", Timer: {
                            is_paused: false,
                            timer_interval: null,
                            timer_timeout: null,
                            active: null,
                            time: null,
                            meter:null,
                            /*////////////////////////////////////////////////////////
                            // timer depends on level
                                timer starts out at 2 seconds
                                as level increase timer increases maxing out 5 seconds
                            *////////////////////////////////////////////////////////
                            startTimer: function (i) {

                                this.active = true

                                if(Game.Data.level <3) {
                                    this.time = 2000
                                }else if(Game.Data.level >=3 || Game.Data.level < 6){
                                    this.time = 3000
                                }else if(Game.Data.level >=6 || Game.Data.level < 9){
                                    this.time = 4000
                                }else{
                                    this.time = 5000
                                }

                                var v = ((this.time) / 1000)
                                $("#time_bar" + (i + 1)).attr("value", v)
                                console.log("circle timer started : " + i)

                                this.timer_interval = setInterval(function () {

                                    if (Game.Data.game_over == true) {
                                        clearInterval(Game.Interface.circles[i].Timer.timer_interval);
                                        return
                                    }
                                    if (Game.Interface.circles[i].Timer.is_paused == true)
                                        return




                                    Game.Interface.circles[i].Timer.time -= 1000

                                    if (Game.Interface.circles[i].Timer.time == 0 || Game.Interface.circles[i].Timer.time < 0 || Game.Interface.circles[i].Timer.time == -0) {
                                        this.active = false;

                                        Game.Interface.Hud.attempts_left--
                                        console.log("ap "+Game.Data.game_over)
                                        if (Game.Interface.Hud.attempts_left == 0) {
                                            document.getElementById("current_number_of_trys_left").innerHTML = Game.Interface.Hud.attempts_left
                                            clearInterval(Game.Interface.circles[i].Timer.timer_interval)
                                            clearInterval(Game.Interface.circles[i].Timer.meter)
                                            Game.Driver.endGame()
                                            return
                                        }
                                        clearInterval(Game.Interface.circles[i].Timer.timer_interval)

                                        document.getElementById("current_number_of_trys_left").innerHTML = Game.Interface.Hud.attempts_left
                                        Game.Driver.turnCircleOff(i)

                                        if (Game.Driver.getNumberOfGreenCircles() === 0 && Game.Data.game_over === false) {
                                            console.log("and me")
                                            Game.Driver.lightCircles()

                                        }


                                        console.log("circle timer that ran out :" + i)
                                    }
                                }, 1000);
                                this.meter = setInterval(function () {
                                    if (Game.Data.game_over == true) {
                                        clearInterval(Game.Interface.circles[i].Timer.meter)
                                        return
                                    }
                                    if (Game.Interface.circles[i].Timer.is_paused == true)
                                        return



                                    if (v < 0 || v == 0 || Game.Interface.circles[i].Timer.active===false) {
                                        clearInterval(Game.Interface.circles[i].Timer.meter)

                                    }

                                   v -= 0.1

                                    $("#time_bar" + (i + 1)).attr("value", v)
                                }, 100)

                            },

                            moveTimerToCircle: function (current_circle_number, new_circle_number) {


                                Game.Interface.circles[new_circle_number].Timer.active = Game.Interface.circles[current_circle_number].Timer.active
                                Game.Interface.circles[new_circle_number].Timer.time = Game.Interface.circles[current_circle_number].Timer.time
                                Game.Interface.circles[new_circle_number].Timer.timer_interval = Game.Interface.circles[current_circle_number].Timer.timer_interval
                                Game.Interface.circles[new_circle_number].Timer.meter= Game.Interface.circles[current_circle_number].Timer.meter
                                // console.log("new circle time: "+ Game.Interface.circles[new_circle_number].Timer.timer_interval );
                                //  console.log("old circle time: "+Game.Interface.circles[current_circle_number].Timer.timer_interval );
                                var new_time = Game.Interface.circles[new_circle_number].Timer.time
                                Game.Interface.circles[current_circle_number].Timer.time = 0
                                clearInterval(Game.Interface.circles[current_circle_number].Timer.timer_interval);
                                clearInterval(Game.Interface.circles[current_circle_number].Timer.meter)
                                Game.Interface.circles[current_circle_number].Timer.active = false
                                $("#time_bar" + (current_circle_number + 1)).attr("value", 0)

                                Game.Interface.circles[new_circle_number].Timer.timer_interval = setInterval(function () {

                                    if (Game.Data.game_over == true) {
                                        clearInterval(Game.Interface.circles[new_circle_number].Timer.timer_interval)
                                        clearInterval(Game.Interface.circles[new_circle_number].Timer.meter)
                                        return
                                    }

                                   // $("#time_bar" + (new_circle_number + 1)).attr("value", new_time)
                                    Game.Interface.circles[new_circle_number].Timer.time = new_time

                                    new_time -= 1000


                                    if (new_time == 0 || new_time < 0 || new_time == -0) {

                                        Game.Interface.circles[new_circle_number].Timer.active = false
                                       // $("#time_bar" + (new_circle_number + 1)).attr("value", 0)
                                        Game.Interface.Hud.attempts_left--
                                        console.log( "attempts: "+ Game.Interface.Hud.attempts_left)
                                        if (Game.Interface.Hud.attempts_left == 0) {
                                            clearInterval(Game.Interface.circles[new_circle_number].Timer.timer_interval)
                                            clearInterval(Game.Interface.circles[new_circle_number].Timer.meter)
                                            document.getElementById("current_number_of_trys_left").innerHTML = Game.Interface.Hud.attempts_left
                                            Game.Driver.endGame()
                                            return
                                        }

                                        Game.Driver.turnCircleOff(new_circle_number)
                                        if (Game.Driver.getNumberOfGreenCircles() == 0 && Game.Data.game_over == false) {
                                            Game.Driver.lightCircles()

                                        }
                                        console.log("still in resumed timer function number :" + new_circle_number)



                                        console.log("circle timer that ran out :" + new_circle_number)
                                    }
                                }, 1000)
                                var v = (new_time / 1000)
                                Game.Interface.circles[new_circle_number].Timer.meter = setInterval(function () {
                                    if (Game.Data.game_over == true) {
                                        clearInterval(Game.Interface.circles[new_circle_number].Timer.meter)
                                        return
                                    }
                                    if (Game.Interface.circles[new_circle_number].Timer.is_paused == true)
                                        return



                                    if ( v< 0 || v == 0 || Game.Interface.circles[new_circle_number].Timer.active === false) {
                                        clearInterval(Game.Interface.circles[new_circle_number].Timer.meter)

                                    }

                                    v -= 0.1

                                    $("#time_bar" + (new_circle_number + 1)).attr("value", ( v))
                                }, 100)
                                console.log("old position : " + current_circle_number)
                                console.log("new position : " + new_circle_number)
                                console.log($("#time_bar" + (current_circle_number + 1)).attr("value"))
                                console.log("circle timer resumed : " + new_circle_number)

                                //     console.log("new circle time: "+ Game.Interface.circles[new_circle_number].Timer.timer_interval );
                            }
                        }
                    });
                    $("#" + (i + 1)).click(function (e) {

                        if (e.target.id.indexOf("time") == -1) {
                            Game.Interface.circles[e.target.id - 1].target = e.target.id - 1
                            Game.Interface.clickedCircle(e.target.id - 1)
                        } else {
                            e.preventDefault()

                        }


                    });

                }
            },
            clickedCircle: function (circle_number) {


                if (Game.Data.game_over == true)
                    return
                if (Game.Interface.circles[circle_number].Timer.is_paused == true)
                    return
                console.log("circle clicked on : " + circle_number)
                this.circles[circle_number].target = "null"
                if (this.circles[circle_number].status == "good") {

                    //			  clearTimeout(this.circles[circle_number].Timer.timer_timeout);
                    clearInterval(this.circles[circle_number].Timer.timer_interval)
                    clearInterval(this.circles[circle_number].Timer.meter)
                    $("#time_bar" + (circle_number + 1)).attr("value", 0)
                    Game.Player.score = Game.Player.score + 10
                    if(Game.Interface.energybar.value < 300)
                        Game.Interface.energybar.setEnergyBar(10)
                    if (Game.Player.score > Game.Player.highscore)
                        localStorage.highscore = Game.Player.score
                    document.getElementById("current_score").innerHTML = Game.Player.score
                    this.circles[circle_number].last_status = "good"
                    this.circles[circle_number].status = "null"
                    $("#" + (circle_number + 1)).attr("data-circle", "null")
                    for (var i = 0; i < 16; i++) {
                        if (this.circles[i].status == "bad") {
                            console.log("this is bad :" + i)
                            Game.Driver.turnCircleOff(i)
                            Game.Interface.circles[i].last_status = "bad"
                            Game.Driver.lightCirclesRed(i)

                        }

                    }

                    if (Game.Driver.getNumberOfGreenCircles() == 0) {
                        console.log("ran out of green circles")
                        /*//////////////////////////////////////////////////////////////////////////////
                            change level here
                            there is a total of 100 levels
                             with a total of 40 posibilities on each level

                         *////////////////////////////////////////////////////////////////////////
                        if(Game.Data.sub_level == 40){
                            Game.Data.level++
                            Game.Data.sub_level = 1
                            functions.setLevel(Game.Data.level)
                        }else{
                            Game.Data.sub_level++
                        }
                        for (var i = 1; i < 16; i++) {
                            if (this.circles[i].status == "bad")
                                Game.Driver.turnCircleOff(i)
                        }


                        if (Game.Driver.getNumberOfGreenCircles == 0 && Game.Driver.getNumberOfRedCircles == 0)
                            Game.Driver.lightCircles()
                        else
                            Game.Driver.lightCircles()
                    } else {

                        if (Math.floor(Math.random() * 16) >= 8)
                            Game.Driver.changeGreenCirclePostion()
                    }

                } else if (this.circles[circle_number].status == "null") {

                    if (this.energybar.value > 0) {
                        console.log("where is this place")
                        this.energybar.setEnergyBar(-10)
                    }
                    var w = document.getElementById("energy_layer_3").style.width


                    return;
                } else if (this.circles[circle_number].status == "bad") {

                    Game.Interface.Hud.attempts_left--
                    document.getElementById("current_number_of_trys_left").innerHTML = this.Hud.attempts_left
                    this.energybar.setEnergyBar(-10)
                    Game.Driver.turnCircleOff(circle_number)
                    if (Game.Interface.Hud.attempts_left == 0)
                        Game.Driver.endGame()

                }
                //  console.log("circle timer status : " + this.circles[circle_number].Timer.active);

            }

        },

        Data: {
            players: [],
            level: null,
            sub_level:null,
            highscore: null,
            game_over: null,
            initData: function () {
                Game.Data.level = 1
                Game.Data.game_over = false

				 if(localStorage.highscore === undefined){
				 localStorage.highscore = 0
				 this.highscore = localStorage.highscore
				 }else{
				 this.highscore = localStorage.highscore
				 }

            }

        },

        Driver: {
            status: null,
            run: function () {

                this.status = true
                functions.initData()
                functions.initPlayer()
                functions.initInterface()
                Game.Driver.lightCircles()


            },
            lightCircles: function () {
                var array = []
                var m = undefined

                switch (Game.Data.level) {



                    case 1: {
                        m = (Math.round(Math.random() * 2) + 1)
                        break
                    }
                    case 2: {
                        m = (Math.round(Math.random() * 3) + 1)
                        break
                    }
                    case 3: {
                        m = (Math.round(Math.random() * 4) + 1)
                        break
                    }
                    case 4: {
                        m = (Math.round(Math.random() * 5) + 1)
                        break
                    }

                    case 5: {
                        m = (Math.round(Math.random() * 6) + 1)
                        break
                    }
                    case 6: {
                        m = (Math.round(Math.random() * 7) + 1)
                        break
                    }
                    case 7: {
                        m = (Math.round(Math.random() * 8) + 1)
                        break
                    }
                    case 8: {
                        m = (Math.round(Math.random() * 9) + 1)
                        break
                    }
                    case 9: {
                        m = (Math.round(Math.random() * 10) + 1)
                        break
                    }
                    case 10: {
                        m = (Math.round(Math.random() * 11) + 1)
                        break
                    }
                    default : {
                        m = Math.round(Math.random() * 13)
                        while (Math.random() < 0.5) {
                            m = Math.round(Math.random() * 7)
                        }
                        while (m == 0) {
                            m = Math.round(Math.random() * 13)
                        }
                        break
                    }
                }


                if (this.getNumberOfGreenCircles() == 0) {

                    for (var i = 0; i < m; i++)
                        this.lightCirclesGreen()
                }
                var r = (Math.round(Math.random() * m)+ 1)
                for (var i = 0; i < r ; i++)
                    this.lightCirclesRed();


                for (var i = 0; i <= 15; i++)
                    array.push(Game.Interface.circles[i].status)


                Game.Interface.possibilities.setPossibility(array)
                for (var i in Game.Interface.possibilities.array) {

                    if (i == array) {

                        for (var b = 0; b <= 15; b++)
                            this.turnCircleOff(b);

                        return;

                    }

                }

                array = undefined;
            },

            turnCircleOff: function (circle_position) {

                Game.Interface.circles[circle_position].status = "null"
                $("#" + (circle_position + 1)).attr("data-circle", "null")
                console.log("circle turn off : " + circle_position)

            },
            changeGreenCirclePostion: function () {
                var new_position = Math.floor(Math.random() * 16)
                for (var i = 0; i < 16; i++) {
                    if (Game.Interface.circles[i].status == "good") {

                        while (new_position == i || $("#" + (new_position + 1)).attr("data-circle") == "good" || $("#" + (new_position + 1)).attr("data-circle") == "bad")
                            new_position = Math.floor(Math.random() * 16)
                        this.turnCircleOff(i)

                        Game.Interface.circles[i].Timer.moveTimerToCircle(i, new_position)
                        Game.Interface.circles[new_position].status = "good"
                        $("#" + (new_position + 1)).attr("data-circle", "good")

                        break;
                    }

                }


            },
            getNumberOfGreenCircles: function () {
                var number_of_circles = 0
                for (var i = 0; i <= 15; i++) {
                    if (Game.Interface.circles[i].status == "good")
                        number_of_circles++

                }

                return number_of_circles
            },
            getGreenCirclePostion: function () {

                var position = {}

                for (var i = 0; i < 16; i++) {
                    if (Game.Interface.circles[i] === "good")
                        position.push(i)

                }
                return position
            },
            lightCircleGreen: function (circle_position) {
                if (Game.Interface.circles[circle_position].status == "null") {
                    Game.Interface.circles[circle_position].status = "good"
                    Game.Interface.circles[circle_position].last_status = "null"
                    Game.Interface.circles[circle_position].Timer.startTimer(circle_position)
                    $("#" + (circle_position + 1)).attr("data-circle", "good")
                    console.log("this circle is good" + circle_position)
                } else
                    this.lightCirclesGreen();


            },

            lightCirclesGreen: function () {
                var light = Math.floor(Math.random() * 16)
                switch (light) {

                    case 0 :
                        this.lightCircleGreen(0)
                        break;
                    case 1 :
                        this.lightCircleGreen(1)
                        break;
                    case 2 :
                        this.lightCircleGreen(2)
                        break;
                    case 3 :
                        this.lightCircleGreen(3)
                        break;
                    case 4 :
                        this.lightCircleGreen(4)
                        break;
                    case 5 :
                        this.lightCircleGreen(5)
                        break;
                    case 6 :
                        this.lightCircleGreen(6)
                        break;
                    case 7 :
                        this.lightCircleGreen(7)
                        break;
                    case 8 :
                        this.lightCircleGreen(8)
                        break;
                    case 9 :
                        this.lightCircleGreen(9)
                        break;
                    case 10 :
                        this.lightCircleGreen(10)
                        break;
                    case 11 :
                        this.lightCircleGreen(11)
                        break;
                    case 12 :
                        this.lightCircleGreen(12)
                        break;
                    case 13 :
                        this.lightCircleGreen(13)
                        break;
                    case 14:
                        this.lightCircleGreen(14)
                        break;
                    case 15:
                        this.lightCircleGreen(15)
                        break;
                    default :
                        this.lightCircleGreen()
                        break;
                }
            },

            lightCirclesRed: function () {

                var same = -1;
                var light = Math.floor(Math.random() * 16)
                while (light == same)
                    light = Math.floor(Math.random() * 16)

                switch (light) {

                    case 0:
                        this.lightCircleRed(0)
                        break;
                    case 1:
                        this.lightCircleRed(1)
                        break;
                    case 2:
                        this.lightCircleRed(2)
                        break;
                    case 3:
                        this.lightCircleRed(3)
                        break;
                    case 4:
                        this.lightCircleRed(4)
                        break;
                    case 5:
                        this.lightCircleRed(5)
                        break;
                    case 6:
                        this.lightCircleRed(6)
                        break;
                    case 7:
                        this.lightCircleRed(7)
                        break;
                    case 8:
                        this.lightCircleRed(8)
                        break;
                    case 9:
                        this.lightCircleRed(9)
                        break;
                    case 10:
                        this.lightCircleRed(10)
                        break;
                    case 11:
                        this.lightCircleRed(11)
                        break;
                    case 12:
                        this.lightCircleRed(12)
                        break;
                    case 13:
                        this.lightCircleRed(13)
                        break;
                    case 14:
                        this.lightCircleRed(14)
                        break;
                    case 15:
                        this.lightCircleRed(15)
                        break;
                    default:
                        this.lightCirclesRed()
                        break;
                }
                same = light;
            },
            lightCircleRed: function (circle_position) {
                if (Game.Interface.circles[circle_position].status == "null") {
                    Game.Interface.circles[circle_position].status = "bad"
                    Game.Interface.circles[circle_position].last_status = "null"
                    $("#" + (circle_position + 1)).attr("data-circle", "bad")
                } else
                    this.lightCirclesRed()
            },
            getNumberOfRedCircles: function () {
                var number_of_circles = 0
                for (var i = 0; i < 16; i++) {
                    if (Game.Interface.circles[i].status == "bad")
                        number_of_circles++

                }
                return number_of_circles
            },
            endGame: function () {

                Game.Data.game_over = true
                this.status = false
                if (Game.Player.score > Game.Player.highscore)
                    localStorage.highscore = Game.Player.score
                console.log("gameOver")
            },
            pauseGame: function () {

                for (var i = 0; i < 16; i++)
                    Game.Interface.circles[i].Timer.is_paused = true

            },
            unPauseGame: function () {

                for (var i = 0; i < 16; i++)
                    Game.Interface.circles[i].Timer.is_paused = false

            }


        }


    }
    var Ajax = {

        request: null,

        getIpAddress: function () {

        },
        getNumberOfPlayers: function () {

            try {

                if (window.XMLHttpRequest) {

                    if (Ajax.request == null)
                        Ajax.request = new XMLHttpRequest();

                    Ajax.request.open("GET", "../index.php?player", true);
                    Ajax.request.send();
                    Ajax.request.onreadystatechange = function () {

                        if (Ajax.request.status == 200 && Ajax.request.readyState == 4) {

                            console.log(Ajax.request.responseText);
                        }

                    };

                } else {

                    if (Ajax.request == null)
                        Ajax.request = new ActiveXObject("Microsoft.XMLHTTP");
                }


            } catch (ex) {
            }
        },
        setPlayerName: function (player_name, id) {

            try {
                if (window.XMLHttpRequest) {
                    if (Ajax.request == null)
                        Ajax.request = new XMLHttpRequest();

                    Ajax.request.open("GET", "../php/ajax.php?username=" + player_name + "&id=" + id, true);
                    Ajax.request.send();
                    Ajax.request.onreadystatechange = function () {
                        if (Ajax.request.status == 200 && Ajax.request.readyState == 4) {

                            console.log(Ajax.request.responseText);

                        }
                    };
                } else {
                    if (Ajax.request == null)
                        Ajax.request = new ActiveXObject("Microsoft.XMLHTTP");
                }
            } catch (ex) {

            } finally {

            }
        },
        turnSessionOff: function () {
            var id = undefined;
            var cookies = undefined;

            try {

                cookies = document.cookie;
                id = CookieFile.getCookieValue("fls");
                if (id == null || id == undefined)
                    return;

                if (window.XMLHttpRequest) {

                    if (Ajax.request == null)
                        Ajax.request = new XMLHttpRequest();


                    Ajax.request.open("GET", "/php/ajax.php?status=0&id=" + id, true);
                    Ajax.request.send();
                    Ajax.request.onreadystatechange = function () {
                        if (Ajax.request.status == 200 && Ajax.request.readyState == 4) {
                            console.log(Ajax.request.responseText);
                        }
                    };

                } else {

                    if (Ajax.request == null)
                        Ajax.request = new ActiveXObject("Microsoft.XMLHTTP");
                }

            } catch (ex) {
            } finally {
            }
        }
    }



//this to do when window closes
    /*
     * need too fix this
     * need to figure out how to fire this in every instance where the window closes or the location of the window is changed
     */

// Things to do when the window is done loading

    window.onunload = function(){
        Ajax.turnSessionOff();
}
window.onbeforeunload = function(){


};
    window.onload = function(){


        try{

            //next add a listener to the player_name input box so player can set their name
            document.getElementById("player_name").addEventListener("blur" , function(){
                try{

                    var id = CookieFile.getCookieValue("fls");

                    Game.Player.name = this.value;
                    Ajax.setPlayerName(Game.Player.name ,id);
                }catch(ex){
                    console.log(ex);
                }finally{

                }
            });

            //if the mouse gets clicked down over a button but then is moved away from the button
            // then released the mouse up event does not work
            // need to fix that
            for(var i =0; i < 16; i++){
                document.getElementById(""+(i+1)).addEventListener("mousedown",function(e){
                    if(e.target.id.indexOf("time") == -1)
                        $("#"+e.target.id).css("box-shadow" , "0px 0px 0px");
                });
                document.getElementById(""+(i+1)).addEventListener("mouseup",function(e){

                    if(e.target.id.indexOf("time") == -1)
                        $("#"+e.target.id).css("box-shadow" , "-3px 3px 5px black");
                });

            }



        }catch(ex){

        }
    }
    functions.run = Game.Driver.run;
    functions.initData = Game.Data.initData
    functions.initInterface = Game.Interface.initInterface
    functions.initPlayer = Game.Player.initPlayer

    return functions
}()).run()
/////////////////end of game object///////////////////////





















function circleTimer(){

    var a = 3000;


    if(a == 3000){

        time = setTimeout(function(){

            if(circle.getNumberOfGreenCircles() > 0){
                //GameActions.endGame();
            }else{
                clearTimeout(time);
                return;
            }
            a--;

        },3000);
    }
    t = setInterval(function(){
        a--;
        //document.getElementsByClassName("timer")[0].setAttribute("value","" + a);

    },1);


};
/*
 if(Game.Interface.circles[i].status =="null"){
 $("#" + (i+1)).attr("data-circle" , "null");
 }else if(Game.Interface.circles[i].status =="good"){
 $("#" + (i+1)).attr("data-circle" , "good");
 }else if(Game.Interface.circles[i].status =="bad"){
 $("#" + (i+1)).attr("data-circle" , "bad");

 }
 */
function getOS(){
// got to add other OS's to this function
//right now I can only get Android OS
    var result = undefined;
    var useragent = navigator.userAgent;

    if( useragent.indexOf("Android") > -1)
        result = useragent.substr(useragent.indexOf("Android") , useragent.indexOf(";" ,useragent.indexOf("Android")) - 1);
    else if(useragent.indexOf("Windows") > -1)
        result = useragent.substr(useragent.indexOf("Windows") , useragent.indexOf("NT", useragent.indexOf("Windows")));


    return result;
};

