
var StudentsModel  = require("../models/students");
var CoursesModel  = require("../models/coursemodel");
var LecturersModel  = require("../models/lecturers");





class GET_DOCS{
	
 //getStudents who registered your course.


//get course for a lecturer
static getLecturerCourses(req,res,next){
	
	var {email} = req.body;
	CoursesModel.find({lectureremail:email},"coursecode _id",function(err,data){
		
		
		if(err){
			return res.status(200).json({ error:true,message:"error occurred",data:[]})
		}  else{
			var name="";
			
			if(req.body.name){
				name = req.body.name;
			}
			
		return res.status(200).json({ error:false,message:"Found",data:data,name:name})
		
		}
	})
	
	
	
	
	
}

 
	
	
}



module.exports=GET_DOCS;