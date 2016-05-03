<?php

function getIPAddress(){

    return $_SERVER["REMOTE_ADDR"];
}

function getNumberOfActivePlayers(){

    try{
          $mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
 	       		$number_of_players = count($mysql->query("select * from sessions  where  status = 1")->fetch_all());
			
		         $mysql->close();
           $mysql = null;
           return $number_of_players;
        
    }catch(Exception $ex){
   	
		print_r($ex);
    }
}
function getOS(){

    $os = null;
    try{
        if(strpos($_SERVER["HTTP_USER_AGENT"] , "Android") != false){
       
           $os = $_SERVER["HTTP_USER_AGENT"];
           $os =  substr($os,strpos($os , "Android") );
           $os =  substr($os , strpos($os , "Android") , strpos($os , ";"));
          
         
        }else if(strpos($_SERVER["HTTP_USER_AGENT"] , "Windows") != false){
        
           $os = $_SERVER["HTTP_USER_AGENT"];
           $os =  substr($os,strpos($os , "Windows") );
           $os =  substr($os , strpos($os , "Windows") , strpos($os , ";"));
                 
        }
		 return $os;   
    }catch(Exception $ex){
    		
    	print_r($ex);
    }    
}
function getSystem(){


    try{
         $ip = $_SERVER['REMOTE_ADDR'];
         $os = $_SERVER['HTTP_USER_AGENT'];
        
    }
    catch(Exception $ex){
    print_r($ex);
    }
}
function isCookieSet($cookie){
	
	if(!empty($_COOKIE[$cookie]))
		return true;
	else 
		return false;
}
function InitCookies(){
	
	
	setcookie("visits","1",time()+60*60*24*30*12);
	setcookie("name","player" . (getNumberOfActivePlayers()+1),time()+60*60*24*30*12);
}

function setSiteCookies(){
	
	setcookie("visits","1",time()+60*60*24*30*12);
	setcookie("name","player" . (getNumberOfActivePlayers()+1),time()+60*60*24*30*12);
	
}



?>