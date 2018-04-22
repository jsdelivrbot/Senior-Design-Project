var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var session = require('express-session');

var db = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);

var sess;
var username;
var password;
id = null;

router.get('/homepage/:id?', function(req, res) {//anywhere there is title on the homepage this is displayed
    res.render('homepage');
});

router.get('/logout', function(req, res) {//logout
  res.render('login', {feedback: ''});
});

router.get('/', function(req, res) {//render the login page this is finished so dont touch
    res.render('login', {feedback: ''});
});

router.post('/login', function(req, res) {
    sess = req.session;
    username = req.body.username;
    password = req.body.password;

    dbUsers.users.find({'username': username,'password': password}, function(err, user) {//save the ticket after you create
      if (err) {
        res.send(500, {
          error: 'Database Error'
        });
        console.log("DATABASE ERROR");
      }
      //DONT EXIST
      if((user[0]) == undefined){
        return res.render('login', {feedback: 'Your Username or Password is Incorrect or You have not created an Account'});
      }
      //CLIENT
      else if(user[0].employee == "No" && user[0].name != 'admin'){
        //RECYCLE THE ID
        id = (user[0]._id);
        return res.redirect('/clienthomepage/?id=' + id);
      }
      else{
        //EMPLOYEE OR ADMIN, send them in
        id = (user[0]._id);
        return res.redirect('/homepage/?id=' + id);
      }
    });
});

router.get('/clienthomepage/:id?', function(req, res) {
      res.render('clienthomepage');
});

module.exports = router;
