var express = require("express");
var bodyParser = require("body-parser");
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var dbTickets = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);
var dbFeedback = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['feedback']);
var ObjectId = require('mongodb').ObjectID;
var app = express();
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
var router = express.Router();

module.exports = {
  sayHello: function(){
    return 'hello';
  },
  addNumbers: function(value1, value2){
    return value1 + value2;
  },
  divideNumbers: function(value1, value2){
    return value1 / value2;
  },
  multiplyNumbers: function(value1, value2){
    return value1 * value2;
  },
  moduleNumbers: function(value1, value2){
    return value1 % value2;
  }

}
