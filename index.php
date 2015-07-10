<?php

include("php/CustomSessionHandler.php");
include("php/functions.php");
	 
if(isset($_COOKIE['PHPSESSID'])){
    
    $mysql = new mysqli("127.0.0.1" , "root" , ""  , "flashing_lights");
    if($mysql->query("select * 	from users where id = '" . $_COOKIE['PHPSESSID'] . "' limit 1")->fetch_row() == 0)    
        $player_name = "	User" . getNumberOfActivePlayers();
     else{
        $player_name = $mysql->query("select * 	from users where id = '" . $_COOKIE['PHPSESSID'] . "' limit 1")->fetch_assoc();
        $player_name = $player_name['name'];
     }
}else{
 $player_name = "User" . (getNumberOfActivePlayers() + 1);
}

session_set_save_handler(new CustomSessionHandler());

	if(session_status() == PHP_SESSION_NONE) {
    session_start();
}
	
//getMacAddress();
//echo session_id();
	//$mysql_connection = new mysqli('127.0.0.1','root','','flashing_lights');
 //print_r($mysql_connection->query('select * from sessions where id = '' . session_id() . ''')->fetch_row());
	
//	print_r($_SERVER);

echo("
<!DOCTYPE html>
<html>
	<head>
		<title>
			Web app 
		</title>
		<script type='text/javascript' src='js/jquery-1.10.1.js'></script>
				 <script src='/js/date.js'></script>
		 <script src='/js/cookie.js'></script>
  		 		<script src='/js/ajax.js'></script>
		<script src='/js/game.js'></script> 
<script src='/js/events.js'></script>
		<link type='text/css' rel='stylesheet' href='/css/css.css'>
	</head>
	<body>
		
		
		<div id='game_container'>
			<section id='hud'>
				<label for='username'>Username:</label>
				<input class='hud_item' id='player_name' name='username' value='" . $player_name ."' />
				<br />
				<span class='hud_item'>Score: </span> <span id='current_score'></span>
				<br />
				<span class='hud_item' id='number_of_trys'>Trys: </span><span id='current_number_of_trys_left'></span>
			</section>
			
	
				
				
				
				
			<div  class='energy'>
					<div  class='energy_layer' id='energy_layer_1'>
					
					<div  class='energy_layer' id='energy_layer_2'>
					<div  class='energy_layer' id='energy_layer_3'>
					
				</div>
				</div>
				</div>
				</div>
		
				
				<section id='game'>
				
					<div class='circle' id='1' data-circle='null'>
						<footer class='timer' id='timer_1'>
							7
						</footer>
					</div>

					<div class='circle' id='2' data-circle='null' >
						<footer class='timer' id='timer_2'>
							7
						</footer>
					</div>
					<div class='circle' id='3' data-circle='null' >
						<footer class='timer' id='timer_3'>
							7
						</footer>
					</div>
					<div class='circle' id='4' data-circle='null' >
						<footer class='timer' id='timer_4'>
							7
						</footer>
					</div>
					<br />
					<div class='circle' id='5' data-circle='null'>
						<footer class='timer' id='timer_5'>
							7
						</footer>
					</div>
					<div class='circle' id='6' data-circle='null'>
						<footer class='timer' id='timer_6'>
							7
						</footer>
					</div>
					<div class='circle' id='7' data-circle='null'>
						<footer class='timer' id='timer_7'>
							7
						</footer>
					</div>
					<div class='circle' id='8' data-circle='null'>
						<footer class='timer' id='timer_8'>
							7
						</footer>
					</div>
					<br />
					<div class='circle' id='9' data-circle='null'>
						<footer class='timer' id='timer_9'>
							7
						</footer>
					</div>
					<div class='circle' id='10' data-circle='null'>
						<footer class='timer' id='timer_10'>
							7
						</footer>
					</div>
					<div class='circle' id='11' data-circle='null'>
						<footer class='timer' id='timer_11'>
							7
						</footer>
					</div>
					<div class='circle' id='12' data-circle='null'>
						<footer class='timer' id='timer_12'>
							7
						</footer>
					</div>
					<br />
					<div class='circle' id='13' data-circle='null' >
						<footer class='timer' id='timer_13'>
							7
						</footer>
					</div>
					<div class='circle' id='14' data-circle='null'>
						<footer class='timer' id='timer_14'>
							7
						</footer>
					</div>
					<div class='circle' id='15' data-circle='null'>
						<footer class='timer' id='timer_15'>
							7
						</footer>
					</div>
					<div class='circle' id='16' data-circle='null'>
						<footer class='timer' id='timer_16'>
							7
						</footer>
					</div>
					<button id='start_game' >
						Play
				    </button>
				</section>
				
		
			
			
				<!--
				<meter title='time'  class='timer' value ='0' max='3000' min='0'>
						
				</meter>
				-->
			
				
		</div>
		
		<div id='count_down'>
			
		</div>
	</body>
	 </html>");
	 

	?>