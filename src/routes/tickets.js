var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var mongodb = require('mongodb');
var fs = require('fs');
var s3fs = require('s3fs');
var s3fsImpl = new s3fs('attachments-midwestrealty',{accessKeyId: 'AKIAIWKNAPPURZ5ROJYQ',secretAccessKey: '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'});

// THIS IS MULTIPARTY MIDDLEWARE FOR CONVERTING BODY TO A FILE, DONT GET RID OF THIS
var multi = require('connect-multiparty');
multipartyMiddleware = multi();
router.use(multipartyMiddleware);


var db = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);

router.post('/create', function(req, res) {//anywhere there is title on the homepage this is displayed
  var title = req.body.title;
  var description = req.body.description;
  var companyname = req.body.companyname;
  var location = req.body.location;
  var assign = req.body.assign;
  var priority = req.body.priority;
  var due = req.body.due;
  var status = "not started";
  var timestamp = new Date();
  var id = 0;
  //var id = getNextSequence('id');

  if(title == '' || description == '' || priority == '' || due == '' || status == ''){
    return res.render('addticket', { title: 'You Can not leave some of those items blank' });
  }



    db.tickets.find().sort({"id": -1}).limit(1).toArray(function(err, ticket) {
      if(err){
        throw err;
      }
       if(ticket[0] == undefined){
         id = 1;
       }
       else{
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

       db.tickets.save(ticket, function(err, ticket) {//save the ticket after you create
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

router.get('/addticket', function(req, res) {
    res.render('addticket');
});

router.get('/feedback', function(req, res) {
    res.render('feedback');
});

router.get('/search', function(req, res) {
    res.render('search');
});

router.get('/viewticketinformation/:id?', function(req, res) {
    res.render('viewticketinformation', {feedback: ''});
    //res.render('/tickets/viewticketinformation/?id='+ id, {feedback: 'Cannot Add Empty Attachment'});
});

router.get('/editticket/:id?', function(req, res) {
  res.render('edittickets');
});

router.get('/ticketlist', function(req, res) {
  console.log("test");
  db.tickets.find(function(err, tickets) {
    if (err) {
      res.send(500, {
        error: 'Database Error MOFO'
      });
    }
    res.render('ticketlist', {
      tickets: tickets
    });
  });
});

//THIS BELOW NEEDS TO GO IN THE API CONTROLLER IN A UPDATE
router.post('/upload/:id?', function(req, res){
  var file = req.files.file;
  var id = req.params.id;
  console.log(file.size);
  if(file.size != 0){
  //APPEND THE ID TO THE FILE NAME and date to make it unique from pics with the same name
  file.originalFilename = id+"---"+file.originalFilename+"---"+new Date();
  var stream = fs.createReadStream(file.path);
  return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
    res.redirect('/tickets/viewticketinformation/?id='+ id);
  });
}
else{
  res.redirect('/tickets/viewticketinformation/?id='+ id);
  //res.send("i like titties");
}

});

module.exports = router;
