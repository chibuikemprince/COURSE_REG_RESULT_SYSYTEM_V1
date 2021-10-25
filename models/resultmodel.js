 
const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const result_schema = new Schema({
    courseid:{
        type: Schema.Types.ObjectId,
        required: true
    },
    coursecode:{
        type: String,
        required: true
    },
    regno:{
        type: String,
        required: true
    },
   
    lectureremail:{
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    },
    unit: Number,
   level: {
        type: String,
        required: true
    },
    
     session:String,
     semester:String,
    gp:String,
    grade:String,
	
     assignment_score:Number,
     ca_score:Number,
     exam_score:Number,
     total_score:Number,
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 

})

module.exports= model('SchoolResult', result_schema)