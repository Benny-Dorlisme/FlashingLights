//Author: Benny Dorlisme

 Game = {
      
         Player : {
        
            name : null,
            score : null,
            skills : null,
            highscore : null,
            
            System : {
                
                os : null,
                browser : null,
                ip_address : null,
                mac_address : null
                  
            },
            initPlayer : function(){
        
             // need to find a way to fully init player 
             			
	                         this.name = document.getElementById("player_name").value;
	                         this.score = 0;
                             this.skills = null;
                             this.System.os = getOS();
                             this.System.browser = null;
                             this.System.ip_address = null;
                             this.System.mac_address = null;
                             if(isNaN(localStorage.highscore)){
                             	localStorage.highscore = 0;
                             	this.highscore = localStorage.highscore;
                             }else{
                            	
                            	this.highscore = localStorage.highscore;
                             } 
             }
         
        },
        
        Interface : {
        
            Hud : {
                  
                player_name : null,
                player_score : null,
                attempts_left : null,
                highscore : null
                
            },
            possibilities : {
                
                number_of_possibilities : Math.pow(16,3),
                array : [],
                setPossibility : function(a){
                    this.array.push(a);
                }

            },
            circles : [],
            skills : {
            		box:[]
            },
            energybar : {
            				value:null,
            				setEnergyBar:function(number){
            					
            					this.value += number;
            					if(this.value >200){
            						$("#energy_layer_3").animate({width:"+="+number+"%"},function(){});
            						console.log("energy:" + this.value);
            					}else if(this.value >100 && this.value < 200){
            						$("#energy_layer_2").animate({width:"+="+number+"%"},function(){});
            						console.log("energy:" + this.value);
            					}else if(this.value >0 && this.value < 100){
            						$("#energy_layer_1").animate({width:"+="+number+"%"},function(){});
            						console.log("energy:" + this.value);
            					}else if(this.value ==0){
            						return;
            					}
            				}
  							
            },
            initInterface : function(){
	                          this.Hud.player_name = Game.Player.name;
                              this.Hud.player_score = Game.Player.score;
                              document.getElementById("current_score").innerHTML = this.Hud.player_score;
                              this.Hud.highscore   = Game.Player.highscore;
                              this.skills = null;
                              this.energybar.value = 300;
                              this.Hud.attempts_left = 3;
                              document.getElementById("current_number_of_trys_left").innerHTML = this.Hud.attempts_left;
                            
                              for(var i = 0; i < 16; i++){
                                       this.circles.push({status:"null",last_status:"null",clicked:false,target:"null",Timer :  { timer_interval:null,timer_timeout : null, active : null, time : null, startTimer : function(i){  
                                       	this.active = true; 
                                       	this.time = Math.ceil((((Math.random() * 3000) + 1000) / 1000) ) * 1000; 
                                       	var v = (this.time - 1000) / 1000;
                                       	 
                                       	this.timer_timeout = setTimeout(function(){
                                       		if(Game.Data.game_over == true)
                                       			return;
                                       	if(Game.Driver.getNumberOfGreenCircles() > 0){
                                       		Game.Interface.Hud.attempts_left--;
                                       	
                                       		document.getElementById("current_number_of_trys_left").innerHTML = Game.Interface.Hud.attempts_left;
                                       		Game.Driver.turnCircleOff(i);
                                       		if(Game.Driver.getNumberOfGreenCircles() == 0&& Game.Data.game_over == false)
                                       			Game.Driver.lightCircles();
                                       	}	
                                       	console.log("from timeout" + i);
                                       	if(Game.Interface.Hud.attempts_left == 0)
                                       		Game.Driver.endGame();
                                       		
                                       }, this.time);
                                       this.timer_interval = setInterval(function(){
                                       	 	if(Game.Data.game_over == true){
                                       	 		clearInterval(Game.Interface.circles[i].Timer.timer_interval);
                                       			return;
                                       		}
                                       		  //  console.log(v);
                                       			console.log("from interval "+ Game.Interface.circles[i].Timer.timer_interval +" "+v);
                                       			
                                       			switch(v){
                                       				case 3 :document.getElementById("timer_"+(i+1)).innerHTML = 3;
                                       				break;
                                       				case 2: document.getElementById("timer_"+(i+1)).innerHTML = 2;
                                       				break;
                                       				case 1: document.getElementById("timer_"+(i+1)).innerHTML = 1;
                                       				break;
                                       				case 0: document.getElementById("timer_"+(i+1)).innerHTML = 0;
                                       						
                                       						clearInterval(Game.Interface.circles[i].Timer.timer_interval);
                                       				break;
                                       				default:clearInterval(Game.Interface.circles[i].Timer.timer_interval);
                                       				break;
                                       			}
												v--;
                                       		}, 1000);
                                        } }});
                                       $("#"+(i+1)).click(function(e){
        	                                        Game.Interface.circles[e.target.id - 1].target = e.target.id - 1;
                                                Game.Interface.clickedCircle(e.target.id - 1);
                                        });
  
                              }
              },
              clickedCircle : function(circle_number){
	
		                              console.log("from clcikedCircle: "+circle_number);
		                              if(Game.Data.game_over === true)
			                                         return;
			
			                              this.circles[circle_number].target = "null";
		                             if(this.circles[circle_number].status == "good"){
		                             		
		                             				  clearTimeout(this.circles[circle_number].Timer.timer_timeout);
		                             				  clearInterval(this.circles[circle_number].Timer.timer_interval);	
			                                          Game.Player.score = Game.Player.score + 10;
			                                          if(Game.Player.score > Game.Player.highscore)
			                                          		localStorage.highscore = Game.Player.score;
			                                          document.getElementById("current_score").innerHTML = Game.Player.score;
			                                          this.circles[circle_number].last_status = "good";
			                                          this.circles[circle_number].status = "null";
			                                          $("#" + (circle_number+1)).attr("data-circle" , "null");
			                                          for(var i = 0; i <16; i++){
			 	                                                 if(this.circles[i].status == "bad"){
						
					                                                           Game.Driver.turnCircleOff(i);
					                                                           Game.Interface.circles[i].last_status = "bad";
					                                                           Game.Driver.lightCirclesRed(i);
					
			                                                  	}
			    	
	                                              		}

		                                              if(Game.Driver.getNumberOfGreenCircles() == 0){
			     		                                                if(Game.Data.level < 1)
			     		                                                	Game.Data.level = Game.Data.level + 0.1;
			     		                                                else if(Game.Data.level > 1 && Game.Data.level < 3)
			     		                                                	Game.Data.level = Game.Data.level + 0.05;
			     		                                                else if(Game.Data.level > 3 && Game.Data.level < 4){
			     		                                                	var constant = 0.033; 
			     		                                                	Game.Data.level = Game.Data.level + constant;
			     		                                                }else if(Game.Data.level > 4 && Game.Data.level < 5){
			     		                                                	Game.Data.level = Game.Data.level + 0.025;
			     		                                                }else if(Game.Data.level > 5 && Game.Data.level < 6){
			     		                                                	Game.Data.level = Game.Data.level + 0.02;
			     		                                                }else if(Game.Data.level > 6 && Game.Data.level < 7){
			     		                                                	Game.Data.level = Game.Data.level + 0.016;
			     		                                                }else if(Game.Data.level > 7 && Game.Data.level < 8){
			     		                                                	Game.Data.level = Game.Data.level + 0.0142857;
			     		                                                }else if(Game.Data.level > 8 && Game.Data.level < 9){
			     		                                                	Game.Data.level = Game.Data.level + 0.0125;
			     		                                                }else if(Game.Data.level > 9 && Game.Data.level < 10){
			     		                                                	Game.Data.level = Game.Data.level + 0.01111111111111111111111111111111;
			     		                                                }else if(Game.Data.level > 10 && Game.Data.level < 11)
			     		                                                	Game.Data.level = Game.Data.level + 0.01;
			     		                                                	
			     		                                                if(Game.Data.level > 11){
			     			                                               Game.Data.level = 10;
			     			                                               Game.Driver.endGame();
			     														}
			     		                                                for(var i = 1; i <16; i++){
				                                                                if(this.circles[i].status == "bad")
			    	                                                                     Game.Driver.turnCircleOff(i);
			                                                      }
						                                                    //clearTimeout(time);
					 	                                                  Game.Driver.lightCircles();
					 	                                                  if(Game.Driver.getNumberOfGreenCircles == 0 && Game.Driver.getNumberOfRedCircles == 0)
					 	                                                  	Game.Driver.lightCircles();						
			                                                      }else{
				
			 	                                                         if(Math.floor(Math.random() * 16) > 8)
			 	                    											Game.Driver.changeGreenCirclePostion();
					                                                               
					                                                            
					                                                     
			                                                       }
		
		                              }else if(this.circles[circle_number].status == "null"){
		                              						if(this.energybar.value > 0)
		                              							this.energybar.setEnergyBar(-10);
		                              							var w = document.getElementById("energy_layer_3").style.width;

		                              							
		                                                	return;
		                              }else if(this.circles[circle_number].status == "bad"){
			                                                
			                                                Game.Interface.Hud.attempts_left--;
			                                                document.getElementById("current_number_of_trys_left").innerHTML = this.Hud.attempts_left;
			                                                Game.Driver.turnCircleOff(circle_number);
			                                                if(Game.Interface.Hud.attempts_left == 0)
			                                                	Game.Driver.endGame();
		                                                	
		                              }
		
	             }
             
        },
        
        Data : {
        	players : [],
            level : null,
            highscore: null,
            game_over : null,
            initData  :function(){
	                            this.level = 0;
	                            this.game_over = false;
                            /* if(localStorage.highscore === undefined){
    	                                 localStorage.highscore = 0; 
                             	        this.highscore = localStorage.highscore;
    	                         }else{
    	                                 this.highscore = localStorage.highscore;
                              }*/
  
                        }

        },
        
        Driver:{
           status : null,
            run:function(){
            
                this.status = true;
                Game.Data.initData();
                Game.Player.initPlayer();
                Game.Interface.initInterface();
                this.lightCircles();
                
            
            },
            lightCircles : function(){
	 	                             var array = [];
	 	                             var m = undefined;
	 	                             switch(Math.floor(Game.Data.level)){
	 	                             	
	 	                             	case 0: {
	 	                             				m = Math.round(Math.random()*6);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*3);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*6);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	
	 	                             	case 1: {
	 	                             				m = Math.round(Math.random()*7);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*4);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*7);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	case 2: {
	 	                             				m = Math.round(Math.random()*8);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*4);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*8);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	case 3: {
	 	                             				m = Math.round(Math.random()*9);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*5);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*9);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	case 4: {
	 	                             				m = Math.round(Math.random()*10);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*5);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*10);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	
	 	                             	case 5: {
	 	                             				m = Math.round(Math.random()*11);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*6);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*11);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	case 6: {
	 	                             				m = Math.round(Math.random()*12);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*6);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*12);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	case 7: {
	 	                             				m = Math.round(Math.random()*13);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*7);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*13);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             	default : {
	 	                             				m = Math.round(Math.random()* 13);
	 	                             				while(Math.random()<0.5){
	 	                             					m = Math.round(Math.random()*7);
	 	                             				}
	 	                             				while(m == 0){
	 	                             					m = Math.round(Math.random()*13);
	 	                             				}
	 	                             				break;
	 	                             		}
	 	                             }
	 	                           
	                            	
		                            if(this.getNumberOfGreenCircles() == 0){
	 		
	 	    	                                for(var i = 0; i < m; i++ )
	 		                                            	this.lightCirclesGreen();
	 		                        }
	 	
		                          for(var i = 0; i < Math.floor(m); i++)
	 		                                      this.lightCirclesRed();
	 		
	                                  // timer.circleTimer();
	
                            for(var i = 0; i <= 15; i ++)
                                    array.push(Game.Interface.circles[i].status);
                                    
                                
                            Game.Interface.possibilities.setPossibility(array);
                            for(var i in Game.Interface.possibilities.array){
                            
                                if(i == array){
                                	
                                	for(var b = 0; b <=15; b++)
                                		this.turnCircleOff(b);
                                	
                                	return;
                                	
                                }
                                	
                            }
                            
                            array= undefined;
	           },
        
   turnCircleOff : function(circle_position){
	
		                                  Game.Interface.circles[circle_position].status = "null";
		                                  $("#" + (circle_position+1)).attr("data-circle" , "null");
            },
            changeGreenCirclePostion : function(){
		                                         var new_position = Math.floor(Math.random() * 16);
		                                         for(var i = 1; i <16; i++){
			                                                  if(Game.Interface.circles[i].status == "good"){
				                                                          this.turnCircleOff(i);	
				                                                          Game.Interface.circles[i].Timer.startTimer(i);
				                                                          break;
			                                                   }		
			                                                   		
		                                         }
		                                         while(new_position == i || new_position == 0 || new_position == 16)
			                                                       new_position = Math.floor(Math.random() * 16);	
		
                                           Game.Interface.circles[new_position].status = "good";
                                           $("#" + (new_position+1)).attr("data-circle" , "good");
             },
             getNumberOfGreenCircles : function(){
		                                         var number_of_circles = 0;
		                                         for(var i = 0; i <= 15; i++){
			                                               if(Game.Interface.circles[i].status == "good")
				                                                          number_of_circles++;
			                                        
                                           }
		                                         return number_of_circles;
             },
             getGreenCirclePostion : function(){
		
		                                        var position = {};
		
		                                        for(var i = 1; i <16; i++){
			                                                   if(Game.Interface.circles[i] === "good")
				                                                             position.push(i);
			
		                                         }
		                                         return position;
	           },
            lightCircleGreen : function(circle_position){
		                                   if (Game.Interface.circles[circle_position].status == "null"){
		                                                   Game.Interface.circles[circle_position].status = "good";
		                                                   Game.Interface.circles[circle_position].last_status = "null";
		                                                   Game.Interface.circles[circle_position].Timer.startTimer(circle_position);
		                                                   $("#" + (circle_position+1)).attr("data-circle" , "good");
		                                                   
		                                   }else
			                                                  this.lightCirclesGreen();
            },
	
            lightCirclesGreen : function(){
		                                var light = Math.floor(Math.random() * 16);
		                                switch(light){
			
		                                           	case 0 : this.lightCircleGreen(0);
					                                                  break;
		                     	                      case 1 : this.lightCircleGreen(1);	
					                                                  break;
			                                           case 2 : this.lightCircleGreen(2);	
					                                                  break;
			                                           case 3 : this.lightCircleGreen(3);	
					                                                  break;
			                                           case 4 : this.lightCircleGreen(4);	
					                                                  break;
			                                           case 5 : this.lightCircleGreen(5);		
					                                                 break;
			                                           case 6 : this.lightCircleGreen(6);	
					                                                 break;
			                                           case 7 : this.lightCircleGreen(7);	
					                                                 break;
			                                           case 8 : this.lightCircleGreen(8);	
					                                                  break;
			                                           case 9 : this.lightCircleGreen(9);	
					                                                  break;
			                                           case 10 : this.lightCircleGreen(10);	
					                                                  break;
			                                           case 11 : this.lightCircleGreen(11);	
					                                                  break;
			                                           case 12 : this.lightCircleGreen(12);	
					                                                  break;
			                                           case 13 : this.lightCircleGreen(13);	
					                                                  break;
			                                           case 14: this.lightCircleGreen(14);	
					                                                  break;
			                                           case 15: this.lightCircleGreen(15);	
					                                                  break;	
			                                           default : this.lightCircleGreen();
					                                                  break;	
		                                  }
	             },
        
             lightCirclesRed : function(){
	
		                     var same =-1;
		                     var light = Math.floor(Math.random() * 16);
	                      while(light==same)
	                               light = Math.floor(Math.random() * 16);
	
		                     switch(light){
			
			                              case 0: this.lightCircleRed(0);
					                                    break;
			                              case 1: this.lightCircleRed(1);	
					                                    break;
			                              case 2: this.lightCircleRed(2);	
				                                    	break;
			                              case 3: this.lightCircleRed(3);	
					                                    break;
			                              case 4: this.lightCircleRed(4);	
					                                    break;
			                              case 5: this.lightCircleRed(5);		
				         	                           break;
			                              case 6: this.lightCircleRed(6);	
					                                    break;
			                              case 7: this.lightCircleRed(7);	
					                                    break;
			                              case 8: this.lightCircleRed(8);	
					                                    break;
		                              	  case 9: this.lightCircleRed(9);	
					                                    break;
			                             case 10: this.lightCircleRed(10);	
					                                    break;
			                             case 11: this.lightCircleRed(11);	
					                                     break;
			                             case 12: this.lightCircleRed(12);	
					                                     break;
			                             case 13: this.lightCircleRed(13);	
					                                     break;
			                             case 14: this.lightCircleRed(14);	
					                                     break;
			                             case 15: this.lightCircleRed(15);	
					                                     break;	
			                             default: this.lightCirclesRed();
					                                     break;	
                        }
		                      same = light;
	          },
           lightCircleRed : function(circle_position){
	                                     if (Game.Interface.circles[circle_position].status == "null"){
		                                                      Game.Interface.circles[circle_position].status = "bad";
		                                                      Game.Interface.circles[circle_position].last_status = "null";
		                                                      $("#" + (circle_position+1)).attr("data-circle" , "bad");
	                                     }else 
		                                       this.lightCirclesRed();
           },
           getNumberOfRedCircles : function(){
		                             var number_of_circles = 0;
		                             for(var i = 0; i < 16; i++){
			                                       if(Game.Interface.circles[i].status == "bad")
				                                                 number_of_circles++;
			
	                             	}
		                             return number_of_circles;
           },
           endGame: function(){
           		
           		Game.Data.game_over=true;
           		this.status = false;
           		if(Game.Player.score > Game.Player.highscore)
           			localStorage.highscore = Game.Player.score;  
           		console.log("gameOver");
           }
           
        
        
        
    }
    
    	
    };
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
 
