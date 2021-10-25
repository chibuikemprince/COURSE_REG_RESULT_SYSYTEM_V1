var CoursesRegModel  = require("../models/registeredcoursemodel");

var uploadStudents = function(req,res,next){
	var {password,regno,session,semester} = req.body;
	  
	//console.log(req.body);
	
 CoursesRegModel.find({regno,session,semester},function(err,result){
		if(err){
			//console.log(err);
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


module.exports = uploadStudents;