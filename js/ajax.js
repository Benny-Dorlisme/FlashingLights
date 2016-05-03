Ajax = 	{
  
    request : null,
    
    getIpAddress : function(){
         
    },
    getNumberOfPlayers : function(){
    	
        try{
        
           if(window.XMLHttpRequest){
      
                if(this.request == null)
                      this.request = new XMLHttpRequest();
                
                this.request.open("GET","../index.php?player",true);
                this.request.send();
                this.request.onreadystatechange = function(){
                 
                         if(Ajax.request.status == 200 && Ajax.request.readyState == 4 ){
                             
                         
                                  
                        }
                        
                };
               
            }else{
         
                if(this.request == null)
                      this.request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
            
        }catch(ex){
        }
    },
    setPlayerName : function(player_name , id){
    	try{
    		if(window.XMLHttpRequest){
    			if(this.request == null)
                      this.request = new XMLHttpRequest();
         
                this.request.open("GET" , "../php/ajax.php?username=" + player_name + "&id=" + id, true);
                this.request.send();
                this.request.onreadystatechange = function(){
	                if(Ajax.request.status == 200 && Ajax.request.readyState == 4 ){
		              				
		              	console.log(Ajax.request.responseText);
		              	
		            }
	            };
    		}else{
    			if(this.request == null)
                      this.request = new ActiveXObject("Microsoft.XMLHTTP");
    		}
    	}catch(ex){
    		
    	}finally{
    		
    	}
    },
    turnSessionOff: function(){
    	var id      = undefined;
    	var cookies = undefined;
    	
        try{
        	
        	cookies = document.cookie;
        	id = CookieFile.getCookieValue("fls");
        	if(id == null || id == undefined)
        		return;
        		
           if(window.XMLHttpRequest){
          		
          		 if(this.request == null)
	                      this.request = new XMLHttpRequest();
	               
               	
               		this.request.open("GET","/php/ajax.php?status=0&id="+id,true);
	                this.request.send();
	                this.request.onreadystatechange = function(){
		                if(Ajax.request.status == 200 && Ajax.request.readyState == 4 ){
		              	
		                }
               		};
            
            } else{
         
                if(this.request == null)
                      this.request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            
        }catch(ex){
        }finally{
        	}
    }
};