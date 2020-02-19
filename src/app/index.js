

var mysql = require('mysql');

const express = require('express') ;
const app = express();
const https = require('https')


const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "projetvermeg"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM webservicetable", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      app.get('/',(req,res)=>{
        res.send(result);
    });
    });

    con.query("SELECT * FROM input_output_table", function (err, result, fields) {
      console.log(result);
      app.get('/generated',(req,res)=>{
        res.send(result);
    });
    });

   
  });




/*

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/postService', function (req, res) {
  res.send('ger postservice');
 
});



app.get('/postServiceDetail', function (req, res) {
  res.send('get postservicedetail');
});



app.post('/postService', function(request, response) {
  
  console.log("post postService");
  console.log(request.body)


});



app.post('/postServiceDetail', function(request, response) {
  
  console.log("post postServiceDetail");
  console.log(request.body)

});


const users = express.Router()

users.use(cors())

var router = express.Router();

router.get('/postService', function(req, res, next){
    res.render('yesss');
});*/
/*

router.get('/postServiceDetail', function(req, res, next){
  //res.render('index.html');
});

*/




//var express2 = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var service = require('../../routes/service');
var servicedetail = require('../../routes/servicedetail');
//var app = express();

//View Engine
app.set('views', path.join(__dirname, '../../views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/service', service);
app.use('/servicedetail', servicedetail);












const port =  3000 ;

app.listen(port, ()=> console.log('Listening on port', port));