var Router =  require('express'); 

var Lecturers = require("../middlewares/auth_lecturers"); 
var Result = require("../middlewares/upload_result"); 
var get = require("../middlewares/get"); 

const baseRoute = Router()

const adminRoute = Router()
 

adminRoute.post('/login', Lecturers.signin);
 

baseRoute.use('/lecturers',adminRoute)
baseRoute.use('/lecturers/courses',Lecturers.login,get.getLecturerCourses)
baseRoute.use('/lecturers/result/upload',Lecturers.login,Result)


module.exports = baseRoute