var ResultModel  = require("../models/resultmodel");
   
 var mongoose = require('mongoose');
var ObjectID = mongoose.Types.ObjectId;


var uploadStudents = function(req,res,next){
	var {data,} = req.body;
	data = JSON.parse(data);
	 
	   
		var noErrorData = 0;
		var ErrorData = 0;
	var	ResMessage = "";
		
	var failedUpload = [];
	data.forEach((e,i,a)=>{
		
		// get required fields
		 a[i].lecturerid = req.body.email;
		 a[i].coursecode = req.body.code;
		 a[i].courseid = new ObjectID(req.body.id);
		
		 
		
		 var {regno,session,semester,courseid,coursecode,lecturerid,level,dept,unit,ca_score,exam_score,assignment_score} =  a[i];
 
		
		
	var eachuser =  {regno,session ,semester,courseid,coursecode,lecturerid,level,dept,unit,ca_score,exam_score,assignment_score} 
		 var totalscore = Number(assignment_score)+Number(ca_score)+Number(exam_score);
		eachuser.total_score = totalscore;
		var grade = "";
		var gp= "";
		 if(totalscore<40){
			 grade="F";
			 gp = unit;
		 }
		else if(totalscore<50){
			 grade="D";
			 gp = 2*Number(unit);
		 }
		 else if(totalscore<60){
			 grade="C";
			 gp = 3*Number(unit);
		 }
		 else if(totalscore<70){
			 grade="B";
			 gp = 4*Number(unit);
		 }
		 else {
			 grade="A";
			 gp = 5*Number(unit);
		 }
		 
		eachuser.gp = gp;
		eachuser.grade = grade;
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
			ResultModel.updateOne(  {regno: eachuser.regno , session: eachuser.session,courseid:eachuser.courseid}, 
    eachuser,{upsert:true},function(err,res){
		if (err){
        EachErroMsg += regno+" 's result' couldnt upload please try again. "
    eachuser["error"] = EachErroMsg;
	ErrorData = ErrorData+1;
		failedUpload.push(eachuser);	
	}
	else{
		 noErrorData = noErrorData+1;
		  
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