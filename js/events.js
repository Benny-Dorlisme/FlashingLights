//this to do when window closes
/*
 * need too fix this
 * need to figure out how to fire this in every instance where the window closes or the location of the window is changed
 */
window.onbeforeunload = function(){
   Ajax.turnSessionOff();
   return null;
};
// Things to do when the window is done loading
window.onload = function(){
      
      
      try{
      	//first start the game. Going to have to change this when I'm done
		    Game.Driver.run();  
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
};
