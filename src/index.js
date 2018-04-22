var express = require('express');//EXPRESS MOFO
var app = express();// It instantiates Express and assigns our app variable to it
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var fs = require('fs');
var db = mongojs('mongodb://bseager:bseager@@ds243335.mlab.com:43335/tickettest', ['tickets']);
var dbUsers = mongojs('mongodb://midwest:midwest@ds149495.mlab.com:49495/midwestrealty', ['users']);
var https = require('https');

var routes = require('./routes/mainroute');
var users = require('./routes/users');
var tickets = require('./routes/tickets');
var api = require('./routes/api');
var reports = require('./routes/reports');

//keep track of the session
//use sessions for tracking logins

app.use(session({
    secret: "bladfk dsakjfkasd jasdkfj ;",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.set('port', (process.env.PORT || 5000));//this sets the port the app is running on

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');//embedded javascript is our engine

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){//dont touch this function without brandons permission because things break
    req.db = db;
    next();
});//things will break if you move this function

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use('/reports', reports);
app.use('/tickets', tickets);
//we need to migrate into a tickets one for orginizational purposes

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    console.log("404 Error");
});

/// error handlers are below

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('500', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('500', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(app.get('port'), function() {//write to console what we are doing
  console.log('Node app is running on port', app.get('port'));
});
