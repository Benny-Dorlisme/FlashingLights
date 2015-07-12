<?php
	class CustomSessionHandler extends SessionHandler{
		
		public function open($save_path, $session_name){}
			
		public function read($id){
			
			$mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
		
			if($mysql->query("select * from sessions where id ='". $id."' limit 1")->fetch_row() == 0){
			
				$mysql->query("insert into sessions (id , data , status, time_accessed) 
				values(('". sha1($id) . "'),
			 	(''), 
			 	(1) ,
			  	(NOW())) on duplicate key update status = 1,time_accessed = NOW()");
				
		}else{
			$mysql->query("update sessions set status = 1 , time_accessed = now() where id ='" . $id ."'");
		}
			
			
			$result = $mysql->query("select * from sessions where id ='".$id."'");
			$data = $result->fetch_row();
		
 			$mysql->close();
			
    		return $data;
			
		}
		public function write($id , $data){
			
			$mysql = new mysqli("127.0.0.1" ,"root", "", "flashing_lights");
			
			$mysql->query("update sessions  set data ='" . $data ."' , time_accessed = now() where id = '" . $id . "'");
			$mysql->close();
		
		}
		
		public function close(){
			
		}
		public function destroy($id){
			
		}
		public function gc($lifetime){
			
		}
		
	}
?>
