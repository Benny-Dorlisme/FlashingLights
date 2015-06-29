//Author: Benny Dolisme
    
        CookieFile = {
        
            cookies : {},
            
            changeCookieValue : function( key , value, expires){
            	
            	document.cookie = (key +"="+value +";" + " expires="+expires);
            	/*
            	var array = cookie.split(";");
            	var new_key;
            	cookie = "";
            	for(var i =0; i < array.length; i++){
            		if(array[i].includes(key)){
            				
            				new_key = array[i].replace(array[i].substring(array[i].indexOf("=")+1, array[i].length), value);
            				
            				
            				break;
            		}
            	}
            	for(var i =0; i < array.length; i++){
            	
            				if(i != array.length -1)
            					cookie += array[i] + ";";
            				else
            					cookie += array[i];
            	}
            	console.log(cookie);
            	
            	if(cookie.indexOf(";", cookie.indexOf(key)) == -1){
            		
                cookie = cookie.replace(cookie.substring(cookie.indexOf(key)) , new_key.trim());
                console.log("yes");
                 
                  console.log(cookie);
                }else{
                	 console.log("no");
                	cookie = cookie.replace(cookie.substring(cookie.indexOf(key), cookie.indexOf(";", cookie.indexOf(key)) ) , new_key.trim());
                }
                
                return cookie;
                */
            },
            
            createCookie : function(object){
        
              
                 var cookie_name = Object.keys(object)[0];
                 var cookie = "";
                 var search_undefined = new RegExp("undefined" , "g");
                 var search_null = new RegExp("null","g");
                 var array = null;
                 Object.defineProperty(this.cookies , cookie_name , {value:object ,configurable:true});
        
            cookie += (Object.keys(this.cookies[cookie_name])[0] + "=" 
            + this.cookies[cookie_name][cookie_name] + ";" 
            + Object.keys(this.cookies[cookie_name])[1] 
            + "=" + this.cookies[cookie_name]["expires"] + ";"
            + Object.keys(this.cookies[cookie_name])[2] + "=" 
            +  this.cookies[cookie_name]["path"] + ";" 
            + Object.keys(this.cookies[cookie_name])[3] + "="
            + this.cookies[cookie_name]["domain"] + ";"
            + Object.keys(this.cookies[cookie_name])[4] );
        
         if(search_undefined.test(cookie)){
           
          array = cookie.split(";");
        
            cookie = "";
            for(var i = 0; i < array.length; i++){
                  
                 if(search_undefined.test(array[i]))
                    array.splice(i, i);
                    if(i != array.length - 1){
                        array[i] = array[i] + ";";
                        cookie += array[i];
                    }
            }
            
        }else if(search_null.test("null")){
            
          array = cookie.split(";");
        cookie = "";
            for(var i = 0; i < array.length; i++){
                    
                 if(search_null.test(array[i]))
                    array[i].splice(i ,i);
                    if(i != array.length - 1){
                        array[i] = array[i]+ ";";
                        cookie += array[i];
                    }
              }
        }
        
        return cookie; 
    } ,
    destroyCookie : function(cookie){
            
        var d = new Date();
        var search_expire = new RegExp("expires","g");
        d.setUTCFullYear(1980);
        
        if(search_expire.test(cookie)){
         
            for(var i = cookie.search(search_expire); i < cookie.length; i++){
                            
                if(cookie.charAt(i) == ";"){
  
                cookie = cookie.replace(cookie.substring(cookie.lastIndexOf("=") + 1 , i), d.toUTCString());
                    break;
                }
            }
                
        }else
            cookie += ("expires=" + d.toUTCString());    
       
     delete  this.cookies[cookie.substring(0 , cookie.indexOf("=") )] ;
        document.cookie = cookie;
      
    },
    
    doesCookieExist : function(name){
            
        var exist = false;
      
                 
             if (this.cookies[name])
                exist = true;
           
      return exist;
    },
    
    validateCookie : function(cookie){
         
        if(Object.getOwnPropertyNames(cookie).length == 0)
            throw new Exception("");    
        else if(Object.getOwnPropertyNames(cookie).length > 5)
            throw new Exception("");
        
      for(var i = 0; i < Object.keys(cookie).length; i++ ){
        
           
      }
            
              
         
    }
};