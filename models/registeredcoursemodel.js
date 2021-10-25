 
const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;




const course_schema = new Schema({
    coursename:{
        type: String,
        required: true
    },
    regno:String,
    lectureremail:{
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    coursecode: String,
    semester: String,
    unit: Number,
   level: {
        type: String,
        required: true
    },
    session: {
        type: String,
        required: true
    },
     
    required:{
        type: String,
        required: true
    },
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports  = model('Course_Reg', course_schema)