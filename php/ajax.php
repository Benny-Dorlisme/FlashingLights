<?php
include("CustomSessionHandler.php");
if($_SERVER["REQUEST_METHOD"] != "GET")
	exit;
include("functions.php");
if(isset($_GET['id']) && !empty($_GET['id']))
	$id = htmlentities($_GET['id']);
else
	exit;
$mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");

if(!mysqli){
	echo "db error!";
	exit;
}
if(isset($_GET['status']) && !empty($_GET['status'])){
	if($_GET['status'] == 0){
		$stmt = $mysql->prepare("select * from sessions where id = ? limit 1");
		$stmt->bind_param("s",$id);
		$s = $stmt->execute();
		$stmt->close();
		if( $s == 0)
			return;
		else{
			$stmt = $mysql->prepare("update sessions set status = 0 , time_accessed = now() where  id = ? limit 1" );
			$stmt->bind_param("s",$id);
			$stmt->execute();
			$stmt->close();
		}
	}else{
		
	}
}else if(isset($_GET['username']) && !empty($_GET['username'])){
	
	session_set_save_handler(new CustomSessionHandler());
	session_name("fls");
	session_start();
	$name = htmlentities($_GET["username"]);
	$stmt = $mysql->prepare("select data from sessions where id = ? limit 1");
	
	$stmt->bind_param("s",$id);
	$stmt->execute();

	$s = $stmt->get_result();
	
	$stmt->close();

	
	if($s->num_rows < 1){
		echo("An Error Occurred trying to change your username. ");
			return;
		}else{
			
				$_SESSION["name"] = $name;
		}
	
	
}
$mysql->close();
?>