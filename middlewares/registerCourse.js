var CoursesModel  = require("../models/registeredcoursemodel");

var uploadStudents = function(req,res,next){
	try{
	 if(typeof req.body=="string" ){
		req.body = JSON.parse(req.body);
	}
	 
	var {data,regno } = req.body;
	 
	// var regno = data.regno;
		var noErrorData = 0;
		var ErrorData = 0;
	var	ResMessage = "";
		
	var failedUpload = [];
	data.forEach((e,i,a)=>{
		
		// get required fields
		var {
			coursename, coursecode , session ,  semester,level
		} = a[i];
		//console.log("_id: ",a[i]._id);
		
		 a[i].hasOwnProperty("_id")?delete a[i]._id:false;
		
	var eachuser = {
		 ...a[i],regno
	}
		//console.log("\n\n _id: ",a[i]._id,"\n\n");
		
		//console.log(eachuser);
		 
		
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
			CoursesModel.updateOne(  {coursecode: eachuser.coursecode,session:session,regno:regno}, 
    eachuser,{upsert:true})
	.then(res=>{
		// console.log("res: ",res);
		 noErrorData = noErrorData+1;
		 
	})
	.catch(err=>{
		// console.log("error: ",err);
		
		if (err){
        EachErroMsg += coursename+" couldnt upload please try again. "
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
	catch(err){
		console.log(err);
		res.status(400).json({
		
		error:true,
		message: "upload failed, please try again.",
		
		
		
	})
	}

}


module.exports = uploadStudents;