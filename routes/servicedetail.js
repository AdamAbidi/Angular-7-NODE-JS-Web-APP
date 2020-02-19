var express = require('express');
var router = express.Router();
var app = express();

app.get('/servicedetail', function(req, res){
    res.send('post service detail');
    res.render('index.html')

    console.log('yooooo',req.body)
});

module.exports = router;
