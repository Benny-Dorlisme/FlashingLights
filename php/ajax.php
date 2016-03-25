<?php

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
	
	$name = $_GET["username"];
	$stmt = $mysql->prepare("select * from users where id = ? and name = ? limit 1");
	$stmt->bind_param("ss",$id, $name);
	$stmt->execute();

	$s = $stmt->fetch();
	$stmt->close();
	print_r($s);
	
	if($s > 0){
		echo("That username is already taken please input a different username");
			return;
		}else{
			
		
				$stmt = $mysql->prepare("insert into  users  (id , name, highscore ) values(?,?,0)");
				$stmt->bind_param("ss",$id,$name);
				$s = $stmt->execute();
				
			
				if(!$s){
					$stmt = $mysql->prepare("update users set name = ? where id = ?");
					$stmt->bind_param("ss",$name ,$id);
					$stmt->execute();
					
				}
				$stmt->close();
		}
	
	
}
$mysql->close();
?>