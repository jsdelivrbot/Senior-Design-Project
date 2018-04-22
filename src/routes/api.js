var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');
var dbTickets = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);
var dbFeedback = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['feedback']);
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var path1 = require('path')
var fs = require('fs');
var s3fs = require('s3fs');
var s3fsImpl = new s3fs('attachments-midwestrealty',{accessKeyId: 'AKIAIWKNAPPURZ5ROJYQ',secretAccessKey: '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'});
var multi = require('connect-multiparty');
multipartyMiddleware = multi();
router.use(multipartyMiddleware);

router.get('/', function(req, res) {
    res.send("api/tickets is the list of all the tickets api/tickets/id# will display that current user, api/users will return the list of all the users api/users/id will display that user");
});//main route

router.get('/tickets', function(req, res) {//anywhere there is title on the homepage this is displayed
  dbTickets.tickets.find(function(err, tickets) {
    if (err) {
      res.send(500, {
        error: 'Database Error MOFO'
      });
    }
    res.send({tickets});
  });
});//end of get all tickets

router.get('/users', function(req, res) {//anywhere there is title on the homepage this is displayed
  dbUsers.users.find(function(err, users) {
    if (err) {
      res.send(500, {
        error: 'Database Error MOFO'
      });
    }
    res.send({users});
  });
});

// GET HTTP request is called to retrieve individual tickets by ID
router.get('/tickets/:id', function(req, res){
  let uId = ObjectId(req.params.id);
dbTickets.tickets.findOne({"_id": uId}, function(err, ticket) {
    if(ticket.length != 0){
    res.send({ticket});
    }
    else{
      console.log("couldnt find that ticket number");
      res.redirect('/api/tickets');
    }
  });
});

router.get('/tickets/delete/:id', function(req, res){
  // Obtain the id of the todo which is stored in the req.params.id
  let uId = ObjectId(req.params.id);
dbTickets.tickets.remove({"_id": uId}, function(err, ticket) {
    if(ticket.length != 0){
    console.log("Successfully removed");
    res.redirect('/api/tickets');
    }
    else{
      console.log("couldnt find that Ticket ID number");
      res.redirect('/api/tickets');
    }
  });
});

router.get('/users/:id', function(req, res){
  let uId = ObjectId(req.params.id);
dbUsers.users.findOne({"_id": uId}, function(err, user) {
    if(user.length != 0){
    res.send({user});
    }
    else{
      console.log("couldnt find that user ID number");
      res.redirect('/api/users');
    }
  });
});

//this is the remove route for users
router.get('/users/delete/:id', function(req, res){
  let uId = ObjectId(req.params.id);
  console.log(uId);
dbUsers.users.remove({"_id": uId}, function(err, user) {
  console.log(user);
    if(user.length != 0){
    console.log("Successfully removed");
    //res.send({user});
    res.render('userslist');
    }
    else{
      console.log("couldnt find that user ID number");
      res.redirect('/api/users');
    }
  });
});

//update ticket
router.post('/tickets/new', function (req, res) {

  //REQUIRED PARAMETERS
  var title = req.body.tickettitle;
  var description = req.body.ticketdescription;
  var companyname = req.body.companyname;
  var location = req.body.location;
  var assign = req.body.assign;
  var priority = req.body.priority;
  var due = req.body.due;
  var status = req.body.status;
  var timestamp = new Date();
  var id = 0;
//////////////////////////////////////////////


dbTickets.tickets.find().sort({"id": -1}).limit(1).toArray(function(err, ticket) {
  if(err){
    throw err;
  }
   if(ticket[0] == undefined){
     id = 1;
     console.log("doggies")
   }
   else{
     console.log("ponies")
     var temp = ticket[0].id;
     id = parseInt(temp) + 1;
   }

   var ticket = {
     id: id,
     tickettitle: title,
     ticketdescription: description,
     companyname: companyname,
     location: location,
     assignedto: assign,
     prioritylevel: priority,
     duedate: due,
     status: status,
     timestamp: timestamp
   };

   console.log(ticket)

   dbTickets.tickets.save(ticket, function(err, ticket) {//save the ticket after you create
     if (err) {
       res.send(500, {
         error: 'Database Error'
       });
       console.log("DATABASE ERROR");
     }
     return res.render('ticketlist');
   });
});
});

router.post('/users/new', function (req, res) {

  var name = req.body.name;
  var employee = req.body.employee;
  var username = req.body.username;//it gathers by name
  var permissions = req.body.permissions;
  var password = req.body.password;//it gathers by name
  var password2 = req.body.password2;
//////////////////////////////////////////////
var user = {//make a JSON object
  name: name,
  username: username,
  permissions: permissions,
  employee: employee,
  password: password,
  timestamp: timestamp
};


  dbUsers.users.save(user, function(err, newUser) {//save the ticket after you create
    if (err) {
      res.send(500, {
        error: 'Database Error'
      });
      console.log("DATABASE ERROR");
    }
    res.send(newUser);
  });

});

router.post('/feedback/new', function (req, res) {

var description = req.body.description;
//////////////////////////////////////////////
var feedback = {//make a JSON object
  description: description
};

  dbFeedback.feedback.save(feedback, function(err, feedback) {//save the ticket after you create
    if (err) {
      res.send(500, {
        error: 'Database Error'
      });
      console.log("DATABASE ERROR");
    }
    res.send(feedback);
  });

});

router.put('/tickets/update/:id', function (req, res, next) {
//console.log(req.body);
  //REQUIRED PARAMETERS
  // id = req.body.id;
  var id = ObjectId(req.params.id);
  var title = req.body.tickettitle;
  var description = req.body.ticketdescription;
  var companyname = req.body.companyname;
  var assign = req.body.assignedto;
  var location = req.body.location;
  var priority = req.body.prioritylevel;
  var due = req.body.due;
  //console.log(due);
  var status = req.body.status;
  var timestamp = req.body.timestamp;
  var comments = req.body.comments;
//////////////////////////////////////////////

  var ticket = {//make a JSON object
    tickettitle: title,
    ticketdescription: description,
    companyname: companyname,
    assignedto: assign,
    location: location,
    prioritylevel: priority,
    duedate: due,
    comments: comments,
    status: status,
    timestamp: timestamp
  };

dbTickets.collection("tickets").update({"_id": id}, { $set: ticket }, function(err, newTicket) {
  if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(newTicket);
    res.send(newTicket);
  });

});//end of route

router.put('/users/update/:id', function (req, res, next) {

  console.log(req);
  //REQUIRED PARAMETERS
  // id = req.body.id;
  var id = ObjectId(req.params.id);
  var name = req.body.name;
  var employee = req.body.employee;
  var username = req.body.username;//it gathers by name
  var permissions = req.body.permissions;
  var password = req.body.password;//it gathers by name
  var timestamp = req.body.timestamp;//it gathers by name
  //var password2 = req.body.password2;
//////////////////////////////////////////////
var user = {//make a JSON object
  name: name,
  username: username,
  permissions: permissions,
  employee: employee,
  password: password,
  timestamp: timestamp
};

dbTickets.collection("users").update({"_id": id}, { $set: user }, function(err, newUser) {
  if(err){
        console.log("Something wrong when updating data!");
    }
    console.log(newUser);
    res.send(newUser);
  });
});//end of route

router.get('/download/:filename/:id', function(req, res, next){
    var filename = req.params.filename;
    var id = req.params.id;
    var checkForThisName = id+"---"+filename;
    return s3fsImpl.readFile(checkForThisName).then(function(data){
    res.send(data.Body);
  });
});

    router.get('/show/:id', function(req, res){
    var id = req.params.id;
    s3fsImpl.listContents('/').then(function(data) {
      //console.log(data)
      res.send(data);
    }, function(reason) {
      // Something went wrong
    });
});

//SEND A EMAIL WHEN THE CLIENT MAKES A Ticket

router.post('/sendemail', function(req, res, next){
  var title = req.body.tickettitle;
  var description = req.body.ticketdescription;
  var companyname = req.body.companyname;
  var location = req.body.location;
  var assign = req.body.assign;
  var priority = req.body.priority;
  var due = req.body.due;
  var status = req.body.status;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'midwestticketsupport@midwestrealty.com',
    pass: 'Rabbit50%'
  }
});

var mailOptions = {
  from: 'midwestticketsupport@midwestrealty.com',
  to: 'dan@midwestrealty.com',
  subject: 'Work Ticket Request by '+companyname+'.',
  text: 'Subject: '+title+'.\nLocation: '+location+'.\nDescription: '+description+'.'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
});


module.exports = router;//need this at the end of every file
