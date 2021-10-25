 
const Mongoose = require('mongoose');

var model = Mongoose.model;
var Schema = Mongoose.Schema;


const user_schema = new Schema({
    firstname:{
        type: String,
        required: true
    },
    surname:{
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    phone: Number,
    dept: String,
    title: String,
    faculty: String,
    email: String,
    dept:{
        type: String 
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: String, // ddmmyyy
        required: true
    },
    country: {
        type: String,
        required: true
    },
   level: {
	   
        type: String,
        required: true
    },
   
    
    state: {
        type: String,
        required: true
    },
    lga: {
        type: String,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
     
     
    createdAt: {
        default: Date.now(),
        type: Date
    } 
})

module.exports =  model('SchoolLecturers', user_schema);