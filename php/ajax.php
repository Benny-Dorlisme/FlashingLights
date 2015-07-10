<?php
include("functions.php");

if(isset($_GET['status'])){
	if($_GET['status'] == 0){
		$mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
		if($mysql->query("select * from sessions where id ='". $_GET['id']."' limit 1")->fetch_row() == 0)
			return;
		else
			$mysql->query("update  sessions  set status = 0 , time_accessed = now() where  id ='" . $_GET['id'] ."' limit 1" );
			 
		$mysql->close();
	}
}else if(isset($_GET['username'])){

		$mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
		if($mysql->query("select * from user where id ='". $_GET['id']."' limit 1")->fetch_row > 0){
			echo("That username is already taken please input a different username");
			return;
		}
		else{
			if($mysql->query("select * from users where id ='". $_GET['id']."' limit 1")->fetch_row() == 0)
				$mysql->query("insert into  users  (id , name, highscore ) values(('" . $_GET['id'] ."'), ('" . $_GET['username'] ."'),(0))");
			else 
				$mysql->query("update users set name = '" . $_GET['username'] ."' where id = '" . $_GET['id'] . "'");
		}
		$mysql->close();
	
}
?>