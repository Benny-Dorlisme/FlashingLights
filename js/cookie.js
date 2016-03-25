//Author: Benny Dolisme
    
        CookieFile = {
            
            cookies : null,
        
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
            
            createCookie : function(name , value , expire , path , domain ,secure){
               var cookie = undefined;
        		try{
	        		cookie = name +"=" +value+";";
	        		if(expire != undefined || expire != null)
	        			cookie += (expire+";");
	        		if(path != undefined || path != null)
	        			cookie += (path+";");
	        		if(domain != undefined || domain != null)
	        			cookie += (domain+";");
	        		if(secire != undefined || secure != null)
        			cookie += ("secure="+ secure + ";");
        			
        		}catch(ex){
        			
        		}finally{
        			document.cookie = cookie;
        		}
    },
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
    /* function to determine does cookie exist in cookie file
     * @param name
     * name of cookie in file
     */
    
    doesCookieExist : function(name){
          
          var cookies = undefined;
          var exist   = undefined;
           
	      try{
	     
	      	cookies = document.cookie;
	      	exist   = false;
	     
	             if (cookies.indexOf(name) != -1)
	                exist = true;
	             else
	             	exist = exist;
	             	
	             	return exist;
	      }catch(ex){
	      	
	      }finally{
	      	
	      }
           
      
    },
    
     /* This function returns a value of a key in the cookie file
      * @param key
      * The key of the cookie you want to get the value of
      * 
      * @return 
      * The value of the key
      */
    getCookieValue : function(key){
    	
    	var value = undefined;
    	var cookies = document.cookie;
 
    	try{
    		if(this.doesCookieExist(key)){
        
        if(cookies.indexOf(";" , key ) == -1)
        	value = cookies.substring(cookies.indexOf(key)+(key.length + 1 ));
        else
        	value = cookies.substring(cookies.indexOf(key)+(key.length + 1 ) , cookies.indexOf(";" , cookies.indexOf(key)));
    			return value;
    		}else{
    			throw new Error();
    		}
    	}catch(ex){
    		console.log(ex);
    	}finally{
    		
    	}
    },
    
    initCookies : function(){
        
        var cookies = undefined;
        var key     = undefined;
        var value   = undefined;
        var expires = undefined;
        var path    = undefined;
        var domain  = undefined;
        var secure  = undefined;
        var number_of_cookies;
        this.cookies = {};
        try{
            if(cookies.indexOf(";") > -1){
            
                   cookies = document.cookies.split(";");
                   for(var i in cookies){
                        
                        var key = i.substring(0,i.indexOf("=")-1);
                        var value = i.substring(i.indexOf("="), i.length);
                        if(CookieFile.isCookieExpireDateSet(key)){
                            if(i.indexOf(";" , i.indexOf("expire")) > -1)
                                 expires = i.substring(i.indexOf("expires" , key) , i.indexOf(";" , "expires"));
                            else
                                 expires = i.substring(i.indexOf("expires"));
                        }
                        if(CookieFile.isCookiePathSet(key)){
                            if(i.indexOf(";" , i.indexOf("path")) > -1)
                                 path = i.substring(i.indexOf("path" , key) , i.indexOf(";" , "path"));
                            else
                                 expires = i.substring(i.indexOf("path"));
                        }
                         Object.defineProperty(CookieFile.cookies ,key,{value:value , configurable:true} );
                        
                    }
            }
            else{
                   cookies = document.cookie;  
            }
            this.cookies = {};
            
        }catch(ex){
        }finally{
        }
    },
    /*
    * Checks to see if expire is set in the cookie
    * @param key
    * the cookie to check
    * @return
    * returns true if expire is found in cookie    
    */
    isCookieExpireDateSet : function(key){
    
        var cookies = undefined;
        try{
            cookies = document.cookie;
            if(doesCookieExist(key)){
                if(cookies.indexOf("expires" , key) > -1)
                    return true;
                else
                    return false;         
            }
        }catch(ex){
        }finally{
        }
    },
    isCookiePathSet : function(key){
    
        var cookies = undefined;
        try{
            cookies = document.cookie;
            if(doesCookieExist(key)){
                if(cookies.indexOf("path" , key) > -1)
                    return true;
                else
                    return false;         
            }
        }catch(ex){
        }finally{
        }
    },
    isCookieDomainSet : function(key){
    
        var cookies = undefined;
        try{
            cookies = document.cookie;
            if(doesCookieExist(key)){
                if(cookies.indexOf("domain" , key) > -1)
                    return true;
                else
                    return false;         
            }
        }catch(ex){
        }finally{
        }
    },
    isCookieSecureStatusSet : function(key){
    
        var cookies = undefined;
        try{
            cookies = document.cookie;
            if(doesCookieExist(key)){
                if(cookies.indexOf("secure" , key) > -1)
                    return true;
                else
                    return false;         
            }
        }catch(ex){
        }finally{
        }
    }
};