var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);
/* I want to route everything for the user in this router */
router.post('/create', function(req, res) {//anywhere there is title on the homepage this is displayed
  var name = req.body.name;
  //var employee = req.body.employee;
  var username = req.body.username;//it gathers by name
  var permissions = req.body.permissions;
  var password = req.body.password;//it gathers by name
  var password2 = req.body.password2;//it gathers by name
  var timestamp = new Date();//changed to new
  if(username == '' || name == '' || employee == '' || permissions == ''){
    res.render('createuser', { feedback: 'You Left Null Values' });
  }
  if(permissions == "Tenant"){
    employee = 'Yes';
  }else{
    employee = 'No';
  }
  if(password == password2){
  var task = {//make a JSON object
    name: name,
    username: username,
    employee: employee,
    permissions : permissions,
    password: password,
    timestamp: timestamp
  };
  dbUsers.users.save(task, function(err, task) {//save the ticket after you create
    if (err) {
      res.send(500, {
        error: 'Database Error'
      });
      console.log("DATABASE ERROR");
    }//end of if
    console.log("user is saved");
  });
  res.render('createuser', { feedback: 'Successfully Created!' });
}
else{
  res.render('createuser', { feedback: 'Your Passwords did not match' });
}
});

router.get("/createuser", function(req, res) {//deletes a user from the DB
  res.render('createuser', { feedback: '' });
});

router.get('/userslist', function(req, res) {
  res.render('userslist');
});

router.get('/edituserinfo/:id?', function(req, res) {
  res.render('edituser');
});


module.exports = router;
