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
}
?>