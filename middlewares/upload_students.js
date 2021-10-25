var StudentsModel  = require("../models/students");

var uploadStudents = function(req,res,next){
	var {data} = req.body;
	data = JSON.parse(data);
	 
		var noErrorData = 0;
		var ErrorData = 0;
	var	ResMessage = "";
		
	var failedUpload = [];
	data.forEach((e,i,a)=>{
		
		// get required fields
		var {firstname, surname , lastname ,  sex , phone , dept , faculty , email , password ,  dob,country,level,regno,state,lga 
		} = a[i];
		
		 
		
	var eachuser = {
		firstname, surname , lastname ,  sex , phone , dept , faculty , email , password ,  dob,country,level,regno,state,lga 
	
	}
		
		eachuser.usertype ="student";
		
		// check if error is found
		EachErroMsg = "";
		for(var e in eachuser){
			if(eachuser[e]==undefined){
			EachErroMsg  += e+" is required. "
				
			}
			
		}
		
	
		// if error is found, save report
		if(EachErroMsg.length>0){
			eachuser["error"] = EachErroMsg;
			ErrorData = ErrorData+1;
			failedUpload.push(eachuser);
	
		}
		
		else{
			
			// if no error found , save to db
			StudentsModel.updateOne(  {regno: eachuser.regno}, 
    eachuser,{upsert:true})
	.then(res=>{
		 noErrorData = noErrorData+1;
		 
	})
	.catch(err=>{
		
		if (err){
        EachErroMsg += eachuser.surname+" "+eachuser.firstname+" "+eachuser.lastname+" couldnt upload please try again. "
    eachuser["error"] = EachErroMsg;
	ErrorData = ErrorData+1;
		failedUpload.push(eachuser);	
	}
		
		
	}) 
			 
			 
			 
			 
			 
		}
		
		
		
		
		
		
		
		
		
		 
		
		
	})
	
	
	
	res.status(200).json({
		
		error:false,
		message: "Uploaded Successfully",
		failed_data:failedUpload
		
		
	})
	
}


module.exports = uploadStudents;