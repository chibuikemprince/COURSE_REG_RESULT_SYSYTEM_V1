var StudentsModel  = require("../models/students");

var uploadStudents = function(req,res,next){
	var {password,email} = req.body;
	  
	
	
 StudentsModel.find({},"firstname surname lastname  sex  phone  dept  faculty  email dob country level regno state lga ",function(err,result){
		if(err){
			throw new Error("Error found please try again");
		}else{
			//console.log(result);
			
			
	res.status(200).json({
		
		error:false,
		message: "Students Successfully fetched",
		data:result
		
		
	})
			
			
		}
		
		
	});
	
	 
	
	
}


module.exports = uploadStudents;