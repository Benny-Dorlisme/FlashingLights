<?php

include("php/CustomSessionHandler.php");
include("php/functions.php");
	 
$mysql = new mysqli("127.0.0.1" , "root" , ""  , "flashing_lights");	



if(isset($_COOKIE['fls'])){
   
  
	$user_data = $mysql->query("select * from users where id = '{$_COOKIE['fls'] }' limit 1")->fetch_assoc();
 	//print_r($_COOKIE);
    if($user_data){    
        $player_name = $user_data["name"];
    	$highscore   = $user_data["highscore"];
	
	}else{
        $player_name = "Player" . (getNumberOfActivePlayers() + 1); 	
		
     }
}else{
 
 $player_name = "Player" . (getNumberOfActivePlayers() + 1);
}

//this is ok for now but when I think of more cookies to set this will have to change
if(!isCookieSet("vists"))
	setSiteCookies();


session_set_save_handler(new CustomSessionHandler());

	if(session_status() == PHP_SESSION_NONE) {
		session_name("fls");
    	session_start();
		$id = $_COOKIE['fls']; 
} 

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
				<input class='hud_item' id='player_name' name='username' value='{$player_name}' onkeypress=''/>
				<br />
				<span class='hud_item'>Score: </span> <span id='current_score'></span>
				<br />
				<span class='hud_item' id='number_of_trys'>Trys: </span><span id='current_number_of_trys_left'></span>
		
			</section>
			
	
				
				
				
				
			
		
				
				<section id='game'>
				
				<div  class='energy'>
					<div  class='energy_layer' id='energy_layer_1'>
					
					<div  class='energy_layer' id='energy_layer_2'>
					<div  class='energy_layer' id='energy_layer_3'>
					
				</div>
				</div>
				</div>
				</div>
				
					<div class='circle' id='1' data-circle='null'>
						<footer class='timer' id='timer_1'>
							<meter title='time' class='time_bar' id='time_bar1' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>

					<div class='circle' id='2' data-circle='null' >
						<footer class='timer' id='timer_2'>
							<meter title='time' class='time_bar' id='time_bar2' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='3' data-circle='null' >
						<footer class='timer' id='timer_3'>
							<meter title='time' class='time_bar' id='time_bar3' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='4' data-circle='null' >
						<footer class='timer' id='timer_4'>
							<meter title='time' class='time_bar' id='time_bar4' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<br />
					<div class='circle' id='5' data-circle='null'>
						<footer class='timer' id='timer_5'>
							<meter title='time' class='time_bar' id='time_bar5' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='6' data-circle='null'>
						<footer class='timer' id='timer_6'>
							<meter title='time' class='time_bar' id='time_bar6' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='7' data-circle='null'>
						<footer class='timer' id='timer_7'>
							<meter title='time' class='time_bar' id='time_bar7' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='8' data-circle='null'>
						<footer class='timer' id='timer_8'>
							<meter title='time' class='time_bar' id='time_bar8' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<br />
					<div class='circle' id='9' data-circle='null'>
						<footer class='timer' id='timer_9'>
							<meter title='time' class='time_bar' id='time_bar9' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='10' data-circle='null'>
						<footer class='timer' id='timer_10'>
							<meter title='time' class='time_bar' id='time_bar10' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='11' data-circle='null'>
						<footer class='timer' id='timer_11'>
							<meter title='time' class='time_bar' id='time_bar11' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='12' data-circle='null'>
						<footer class='timer' id='timer_12'>
							<meter title='time' class='time_bar' id='time_bar12' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<br />
					<div class='circle' id='13' data-circle='null' >
						<footer class='timer' id='timer_13'>
							<meter title='time' class='time_bar' id='time_bar13' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='14' data-circle='null'>
						<footer class='timer' id='timer_14'>
							<meter title='time' class='time_bar' id='time_bar14' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='15' data-circle='null'>
						<footer class='timer' id='timer_15'>
							<meter title='time' class='time_bar' id='time_bar15' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					<div class='circle' id='16' data-circle='null'>
						<footer class='timer' id='timer_16'>
							<meter title='time' class='time_bar' id='time_bar16' value='0' max='5' min='0'>
							</meter>
						</footer>
					</div>
					
					<div id='skills_container'>
						<ul>
							<li>
								<div class='skill' id='skill1'>
								</div>
							</li>
							<li>
								<div class='skill' id='skill2'>
								</div>
							</li>
							<li>
								<div class='skill' id='skill3'>
								</div>
							</li>
						</ul>
					</div>
					
				</section>
				
		<button id='start_game' >
						Play
				    </button>
			
			
				<!--
				
				-->
			
				
		</div>
		
		<div id='count_down'>
			
		</div>
	</body>
	 </html>");
	 

	?>