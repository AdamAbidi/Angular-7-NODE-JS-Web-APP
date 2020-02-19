var express = require('express');
var router = express.Router();
var app = express();


app.get('/service', function(req, res){
    res.send('post service');
    res.render('index.html')

    console.log('yo',req.body)
});

module.exports = app;