var LecturersModel  = require("../models/lecturers");

var uploadStudents = function(req,res,next){
	var {password,email} = req.body;
	  
	
	
 LecturersModel.find({},"title firstname surname lastname  sex  phone  dept  faculty  email dob country level regno state lga ",function(err,result){
		if(err){
			throw new Error("Error found please try again");
		}else{
			//console.log(result);
			
			
	res.status(200).json({
		
		error:false,
		message: "Lecturers Successfully fetched",
		data:result
		
		
	})
			
			
		}
		
		
	});
	
	 
	
	
}


module.exports = uploadStudents;