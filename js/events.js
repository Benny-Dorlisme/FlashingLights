window.onbeforeunload = function(){
   Ajax.turnSessionOff();
};
window.onload = function(){
      
    Game.Driver.run();  
    
    document.getElementById("player_name").addEventListener("blur" , function(){
    Game.Player.name = this.value;
    var d = new Date();
    d.setUTCSeconds(60 * 60 * 24 * (30 * 6));
	d = d.toUTCString();
	d = d.replace(d.substring(d.indexOf("GMT")) , "UTC");
    document.cookie = "player_name="+this.value+"; expires="+d;
});


};

/*
document.getElementById("player_name").onchange = function(){
    
    Game.Player.name = this.value;
   
};*/
    
