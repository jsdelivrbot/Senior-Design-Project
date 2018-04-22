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

router.get('/',function(req,res){
  res.json({"error" : false, "message" : "Hello !"});
});

router.post('/add',function(req,res){
  res.json({"error" : false, "message" : "success", "data" : req.body.num1 + req.body.num2});
});

router.get('/api', function(req, res) {
  res.json({"error" : false, "message" : "Here are the api main page..."});
});

router.get('/api/tickets', function(req, res) {//anywhere there is title on the homepage this is displayed
  dbTickets.tickets.find(function(err, tickets) {
    if (err) {
      res.send(500, {
        error: 'Database Error MOFO'
      });
    }
    res.send({tickets});
  });
});

router.get('/api/users', function(req, res) {//anywhere there is title on the homepage this is displayed
  dbUsers.users.find(function(err, users) {
    if (err) {
      res.send(500, {
        error: 'Database Error'
      });
    }
    res.send({users});
  });
});

app.use('/',router);

if(!module.parent){
  app.listen(3000,function(){
    console.log("I am listening at PORT 3000");
  });
}

module.exports = {
  sayHello: function(){
    return 'hello'
  },
  addNumbers: function(value1, value2){
    return value1 + value2
  }
}
