//this to do when window closes
/*
 * need too fix this
 * need to figure out how to fire this in every instance where the window closes or the location of the window is changed
 */
window.onbeforeunload = function(){
   Ajax.turnSessionOff();
};
// Things to do when the window is done loading
window.onload = function(){
      
      try{
      	//first start the game. Going to have to change this when I'm done
		    Game.Driver.run();  
		 //next add a listener to the player_name input box so player can set their name 
		    document.getElementById("player_name").addEventListener("blur" , function(){
			    try{
			    	//need to change name of session cookie
			    	var id = CookieFile.getCookieValue("PHPSESSID");
       				
				    Game.Player.name = this.value;
					Ajax.setPlayerName(Game.Player.name , id);
				}catch(ex){
					
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
CustomEvents = {
	
	circleTimeUp : null,
	
	initCustomEvents : function(){
		
		this.circleTimeUp = new CustomEvent("circletimeup");
		for(var i = 1; i < 17; i++ ){
			
			document.getElementById(""+i).addEventListener("circletimeup" , function(element){
				
				if(Game.Driver.getNumberOfGreenCircles() > 0){
                    	
                    	Game.Interface.Hud.attempts_left--;
                                       	
                         document.getElementById("current_number_of_trys_left").innerHTML = Game.Interface.Hud.attempts_left;
                         Game.Driver.turnCircleOff(i);
                         if(Game.Driver.getNumberOfGreenCircles() == 0 && Game.Data.game_over == false)
                         	Game.Driver.lightCircles();
                         if(Game.Interface.Hud.attempts_left == 0)
                         	Game.Driver.endGame();
               }
			});
		}
	}
	
	
};
};
