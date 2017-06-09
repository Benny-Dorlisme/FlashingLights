<?php

include("php/CustomSessionHandler.php");
include("php/functions.php");

$mysql = new mysqli("192.168.1.15" , "root" , ""  , "flashing_lights");
session_set_save_handler(new CustomSessionHandler());
if(isset($_COOKIE['fls'])){

	session_name("fls");
  	session_start();
	$id = $_COOKIE['fls'];

	$user_data = $mysql->query("select data from sessions where id = '{$id}' limit 1")->fetch_assoc();
    if($user_data){
    	session_decode($user_data["data"]);
       $player_name = $_SESSION["name"];
		$score       = $_SESSION["score"];
    	$highscore   = $_SESSION["highscore"];
		$visits      = $_SESSION["visits"]++;

	}else{
        $player_name = "Player" . getNumberOfActivePlayers();
		$highscore   = 0;
		$score       = 0;
		$visits      = 1;
     }

}


	if(session_status() == PHP_SESSION_NONE) {

		session_name("fls");
    	session_start();
		$id = $_COOKIE['fls'];

		$player_name = "Player" . getNumberOfActivePlayers();

		$_SESSION["name"] = $player_name;
		$_SESSION["score"] = 0;
		$_SESSION["highscore"] = 0;
		$_SESSION["visits"] = 1;



}

echo("
<!DOCTYPE html>
<html >
	<head>
		<title>
			Web app 
		</title>
		<script type='text/javascript' src='js/jquery-3.2.1.js'></script>
				 <script src='/js/date.js'></script>
		 <script src='/js/cookie.js'></script>
		 <script src='/js/cookie.js'></script>
<script src='/js/render_streaming_web_audio.js'></script>
<script src='/js/common_utils.js'></script>
<script src='/js/client_entry.js'></script>
<script src='/js/shared_utils.js'></script>


		<link type='text/css' rel='stylesheet' href='/css/css.css'>
	</head>
	<body>
		
		
		<div id='game_container'>

				<section id='game'>
				<header>
					<div>
					<section id='hud'>
							<label for='username'>Username:</label>
						<input class='hud_item' id='player_name' name='username' value='{$player_name}' />
						<br />
						<span class='hud_item' id='player_score'>Score: </span> <span id='current_score'></span>
						<br />
						<span class='hud_item' id='player_highscore'>HighScore: </span> <span id='current_highscore'></span>
						<br />
						<span class='hud_item' id='number_of_trys'>Trys: </span><span id='current_number_of_trys_left'></span>
						<br/>
				        <span class='hud_item' id='game_level'>Level: </span><span id='current_game_level'></span>
					</section>
					</div>
					<div>
					</div>
				</header>
			
				<div  class='energy'>
					<div  class='energy_layer' id='energy_layer_1'>
					
					<div  class='energy_layer' id='energy_layer_2'>
					<div  class='energy_layer' id='energy_layer_3'>
					
				</div>
				</div>
				</div>
				</div>
				<div id='game_stage'>
					<div class='circle' id='1' data-circle='null'>
						<footer class='timer' id='timer_1'>
							<meter title='time' class='time_bar' id='time_bar1' value='0' max='5' min='0'></meter>
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
			
			<script src='/js/game.js'></script> 
	
				
			
				
		</div>
		
		<div id='count_down'>
			
		</div>
	</body>
	 </html>");
	 

	?>