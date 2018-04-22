var express = require('express');
var router = express.Router();

router.get('/tickets', function(req, res) {
    res.render('ticketreport');
});

router.get('/time', function(req, res) {
    res.render('timereport');
});

module.exports = router;
