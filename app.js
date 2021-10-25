var util= require('util');
var encoder = new util.TextEncoder('utf-8');
var express = require('express');
var  bodyParser = require('body-parser');
var cors = require('cors');  
const app = express();
const adminRoute = require("./Routes/adminRoutes");
const studentsRoutes = require("./Routes/studentsRoutes");
const lecturersRoutes = require("./Routes/lecturersRoutes");
//allowing CORS
app.use(       
    cors({
        "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
    })
);
// application/json parsing json incoming request
app.use(bodyParser.json())   
app.use(bodyParser.urlencoded({extended: true, useNewUrlParser: false}))


app.use(express.static('public'))


app.use('/v1', adminRoute)
app.use('/v1', studentsRoutes)
app.use('/v1', lecturersRoutes)
  
app.use('*', function(req,res,next){
	
	throw new Error("invalid request. Please try again");
	
	
})
  

//Handling errors  

app.use((error, req, res, next) => {
    //console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        statusCode: status
    });
});




process.on('uncaughtException', function (err) {
    console.log('**************************');
    console.log('* [process.on(uncaughtException)]: err:', err);
    console.log('**************************');
  });

module.exports =  app;