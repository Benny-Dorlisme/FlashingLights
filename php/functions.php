<?php
function getNumberOfActivePlayers(){

    try{
          $mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
 	       		$number_of_players = count($mysql->query("select * from sessions  where  status = 1")->fetch_all());
				
		         $mysql->close();
           $mysql = null;
           return $number_of_players;
        
    }catch(Exception $ex){
    }
}


function getSystem(){


    try{
         $ip = $_SERVER['REMOTE_ADDR'];
         $os = $_SERVER['HTTP_USER_AGENT'];
         echo(toArray($os)->indexOf(2));
    }
    catch(Exception $ex){
    
    }
}
function getOS(){

    $os = null;
    try{
        if(strpos($_SERVER["HTTP_USER_AGENT"] , "Android") != false){
       
           $os = $_SERVER["HTTP_USER_AGENT"];
           $os =  substr($os,strpos($os , "Android") );
           $os =  substr($os , strpos($os , "Android") , strpos($os , ";"));
           return $os;
         
        }else if(strpos($_SERVER["HTTP_USER_AGENT"] , "Windows") != false){
        
           $os = $_SERVER["HTTP_USER_AGENT"];
           $os =  substr($os,strpos($os , "Windows") );
           $os =  substr($os , strpos($os , "Windows") , strpos($os , ";"));
           return $os;          
        }
    }catch(Exception $ex){
    }    
}
function getIPAddress(){

    return $_SERVER["REMOTE_ADDR"];
}
function getMacAddress(){

    try{
    
    ob_start(); // Turn on output buffering
    if(strpos(getOS() ,"droid" ) != false){
          
        echo(shell_exec("whoami")); 
         shell_exec("ifconfig"); //Execute external program to display output
         $mycom=ob_get_contents(); // Capture the output into a variable
         echo $mycom;
         ob_clean(); // Clean (erase) the output buffer
         $findme = "wlan";
         $findme =  substr($mycom , stripos($mycom , $findme));
         echo $findme;
      //   $findme = substr($findme , strpos() );
         $pmac = strpos($mycom, $findme); // Find the position of Physical text
         $mac=substr($mycom,($pmac+36),17); // Get Physical Address
     }
    }catch(Exception $ex){
    }
}
?>