var Router =  require('express'); 

var StudentsUpload = require("../middlewares/upload_students");
var StudentsView = require("../middlewares/view_students");

var LecturersUpload = require("../middlewares/upload_lecturers");
var LecturersView = require("../middlewares/view_lecturers");


var CoursesUpload = require("../middlewares/upload_courses");
var CoursesView = require("../middlewares/view_courses");
var DeleteAction = require("../middlewares/delete");

const baseRoute = Router()

const adminRoute = Router()


var adminAuth = function (req,res,next){
	var {email,password}= req.body;
	
	var adminemail = process.env.ADMINEMAIL;
	var adminpass = process.env.ADMINPASSWORD;
	
	console.log(adminemail, "Trying to Login")
	
	if(email==adminemail && password==adminpass){
		console.log(adminemail, "Trying to Logged in successfully")
	
		next();
	}
	else{
		return res.status(401).json({
			error:true,
			message:"Wrong login details",
			redirect:false
		})
		
	}
	
	
}

//hodRoute.post('/signup', Validation.createUser, UserController.signup)

adminRoute.post('/login', adminAuth,function(req,res,next){
	return res.status(200).json({
			error:false,
			message:"login successfull",
			redirect:true
		})
})

adminRoute.post('/students/upload', adminAuth, StudentsUpload)

adminRoute.post('/students/view', adminAuth, StudentsView)


adminRoute.post('/lecturers/upload', adminAuth, LecturersUpload)

adminRoute.post('/lecturers/view', adminAuth, LecturersView)

adminRoute.post('/courses/upload', adminAuth, CoursesUpload)

adminRoute.post('/courses/view', adminAuth, CoursesView)



adminRoute.post('/courses/delete', adminAuth, DeleteAction.deleteCourses);
adminRoute.post('/students/delete', adminAuth, DeleteAction.deleteStudents);
adminRoute.post('/lecturers/delete', adminAuth, DeleteAction.deleteLecturers);


baseRoute.use('/admin',adminRoute)


module.exports= baseRoute