Ajax = 	{
  
    request : null,
    turnSessionOff: function(){
    	console.log("why me");
    	var id = undefined;
    	
        try{
        	
           if(window.XMLHttpRequest){
          	console.log(document.cookie.indexOf(";" , document.cookie.indexOf("PHPSESSID")));
           		if(document.cookie.indexOf(";" , document.cookie.indexOf("PHPSESSID")) == -1){
      				id = document.cookie.substring(document.cookie.indexOf("PHPSESSID")+10 , document.cookie.length);
      				console.log(id);
      			console.log("yeah");
      				}
      			else{
      				id = document.cookie.substring(document.cookie.indexOf("PHPSESSID")+10 , document.cookie.indexOf(";"));
      				console.log(id);
      			console.log("no");
      			}
      			
                if(this.request == null)
                      this.request = new XMLHttpRequest();
                
                this.request.open("GET","../php/ajax.php?status=0&id="+id,true);
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
    getIpAddress : function(){
         
    }
};