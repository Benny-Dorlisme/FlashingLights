d = {
	
	date: new Date(),
	setDate: function(date , type){
		
		try{
			if(type == "UTC"){
				this.date.setUTCDate(date);
				this.date.replace(this.date.substring(this.date.indexOf("GMT")), "UTC");
			}else if(type == "GMT"){
				this.date.setGMTDate(date);
			}
		}catch(ex){
			
		}finally{
			
		}
	},
	getDate : function(){
		try{
			
		}catch(ex){
			
		}finally{
			return this.date;
		}
	}
};
