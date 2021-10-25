var CoursesModel  = require("../models/coursemodel");
var CoursesRegModel  = require("../models/registeredcoursemodel");

var uploadStudents = function(req,res,next){
	var {password,regno,semester,session,level,dept,carryover} = req.body;
	  
	
			
 CoursesRegModel.findOne({semester,session,level,dept,regno}," coursename coursecode session  unit level dept lectureremail level semester",function(err,exists){
		if(err){
			throw new Error("Error found please try again");
		}
		
		else{
			//console.log(result);
	 if(exists){
		 
		 res.status(200).json({
		
		error:true,
		message: "you have registered your courses for this semester."
		 
		
		
	})
		 
		 
	 }
	 else{
		 
		
	if(carryover=="true"){
		
		
 CoursesModel.find({dept,semester,level:{$lt:level}}," coursename coursecode session  unit level dept lectureremail level semester",function(err,result){
		if(err){
			throw new Error("Error found please try again");
		}
		
		else{
			//console.log(result);
			
			
	res.status(200).json({
		
		error:false,
		message: "Courses Successfully fetched",
		data:result
		
		
	})
			
			
		}
		
		
	});
	

		
		
		
		
	}
	
	else{
		
		
 CoursesModel.find({semester,session,level,dept}," coursename coursecode session  unit level dept lectureremail level semester",function(err,result){
		if(err){
			throw new Error("Error found please try again");
		}
		
		else{
			//console.log(result);
			
			
	res.status(200).json({
		
		error:false,
		message: "Courses Successfully fetched",
		data:result
		
		
	})
			
			
		}
		
		
	});
	

	}	 
	
 
		 
		 
	 }
			
			
		}
		
		
	});
	
	
	
	
	
	
	
		
}


module.exports = uploadStudents;