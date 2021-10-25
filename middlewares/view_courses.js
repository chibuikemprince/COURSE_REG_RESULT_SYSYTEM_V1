var CoursesModel  = require("../models/coursemodel");

var uploadStudents = function(req,res,next){
	var {password,email} = req.body;
	  
	
	
 CoursesModel.find({}," coursename coursecode session  unit level dept lectureremail level semester",function(err,result){
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


module.exports = uploadStudents;