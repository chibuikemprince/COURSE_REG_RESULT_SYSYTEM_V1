var util= require('util');
var encoder = new util.TextEncoder('utf-8');
var  app  = require('./app');
var dotenv = require('dotenv');
var  db_connection =  require('./Helpers/db_connection');

var express = require("express");
console.log("App Starting .......");
var express_app = express();

const {connect, disconnect} = db_connection;

dotenv.config()


// Connection object which contains the constant for the port and the database
let connection_config = {
    port: process.env.PORT,
    database_url: process.env.MONGODB_ATLAS
} 


  connect(connection_config, app)

 //console.log("connecting----"+process.env.MONGODB_ATLAS)
 

//app.use(globalErrorHandler);
