var Router =  require('express'); 

var Students = require("../middlewares/auth_students"); 
var getResult = require("../middlewares/get_result"); 
var course_to_register = require("../middlewares/course_to_register"); 
var course_reg = require("../middlewares/registerCourse"); 
var course_reg_get = require("../middlewares/get_course_reg"); 

const baseRoute = Router()

const adminRoute = Router()
 

adminRoute.post('/login', Students.signin);
 
adminRoute.post('/course',course_to_register)
adminRoute.post('/coursereg/get',course_reg_get)
adminRoute.post('/coursereg',course_reg)
adminRoute.post('/result/get',getResult)


baseRoute.use('/students',adminRoute)

module.exports = baseRoute