
var StudentsModel  = require("../models/students");
var CoursesModel  = require("../models/coursemodel");
var LecturersModel  = require("../models/lecturers");





class DELETE_DOCS{
	
  static deleteLecturers(req,res,next){
	
	
	
LecturersModel.deleteOne({ _id:req.body.id}).then(function(){
    
	res.status(200).json({
		
		error:false,
		message:"Lecturers Deleted" 
		
		
	});
	
}).catch(function(error){
    console.log(error); // Failure
	
	throw new Error("Delete failed");
	
});
	
	
	
}	
	
		
  static deleteStudents(req,res,next){
	
	
	
StudentsModel.deleteOne({ _id:req.body.id}).then(function(){
    
	res.status(200).json({
		
		error:false,
		message:"Students Deleted" 
		
		
	});
	
}).catch(function(error){
    console.log(error); // Failure
	
	throw new Error("Delete failed");
	
});
	
	
	
}	
	
	
	
  static deleteCourses(req,res,next){
	
	
	
CoursesModel.deleteOne({ _id:req.body.id}).then(function(){
    
	res.status(200).json({
		
		error:false,
		message:"Course Deleted" 
		
		
	});
	
}).catch(function(error){
    console.log(error); // Failure
	
	throw new Error("Delete failed");
	
});
	
	
	
}	
	
	
	
	
	
}



module.exports=DELETE_DOCS;