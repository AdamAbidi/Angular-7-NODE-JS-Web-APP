var acceptLanguage = require('accept-language')
acceptLanguage.languages(['en-US', 'zh-CN']);
console.log(acceptLanguage.get('en-GB,en;q=0.8,sv'));



var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var cors = require('cors')

//var service = require('./routes/service');
//var servicedetail = require('./routes/servicedetail');

var app = express();


app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', 'Origin , X-Requested-With ,Content-Type,Accept,Authorization');
  if (req.method==='OPTIONS'){  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');return res.status(200).json({})}
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
  
  con.query("SELECT * FROM input_output_table ORDER BY id_service", function (err, result, fields) {
    console.log(result);
    app.get('/generated',(req,res)=>{
      res.send(result);
    });
  });
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
//app2.use(express2.static(path.join(__dirname, 'client')));

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use('/service', service);
//app.use('/servicedetail', servicedetail);




app.get('/service', function(req, res){
    //res.render('index.html')
    res.send(JSON.stringify('post service'))  
    res.end()

}).use('/service',function(req, res, next){
  console.log('content :',req.body)
  let stmt = `INSERT INTO webservicetable(name,description,URI) VALUES(?,?,?)`;
  let todo = [req.body.Name, req.body.Description,req.body.URI];
  con.query(stmt,todo);
  res.end()

});


function getFilesizeInBytes(filename) {
  const stats = fs.statSync(filename);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}
var fs = require('fs');

app.get('/service_add_detail', function(request, response){
  //res.render('index.html')
  response.send(JSON.stringify('post service detail'))   
// next();
//response.end()

}).use('/service_add_detail',function(request, response, next){
console.log('content detail ser:',request.body)
console.log('content detail ser id:',request.body.id_service)


var buffer = fs.readFile("./CNY.json",(err, data) => {
  if (err) {
    console.error(err)
    //return
  }
  console.log(data)})
var fileSize = getFilesizeInBytes("./CNY.json");
var azerty = new Buffer(fileSize);
console.log(azerty)
console.log(fileSize)
console.log(buffer)
let stmt = `INSERT INTO input_output_table(id_service,input_file_name,input_file_content,output_file_name,output_file_content,file) VALUES(?,?,?,?,?,?)`;
let todo = [request.body.id_service,request.body.input_name ,request.body.input_content,request.body.output_name ,request.body.output_content,buffer];
//let stmt = `INSERT INTO input_output_table(id_service,input_file_name,input_file_content,output_file_name,output_file_content) VALUES(?,?,?,?,?)`;
//let todo = [request.body.id_service,request.body.input_name ,request.body.input_content,request.body.output_name ,request.body.output_content];
con.query(stmt,todo);
response.end()


});





app.get('/Delete_Web_Service', function(request, response){
  //res.render('index.html')
  response.send(JSON.stringify('delete web service'))   
// next();
//response.end()

}).use('/Delete_Web_Service',function(request, response, next){
console.log('content detail:',request.body)

console.log('id :',request.body.id);
//next();
let sql1 = `DELETE FROM webservicetable WHERE id = ?`;
let sql2 = `DELETE FROM input_output_table WHERE id_service = ?`;

con.query(sql1,request.body.id);
con.query(sql2,request.body.id);

response.end()


});



app.get('/Rename_Web_Service', function(request, response){
  //res.render('index.html')
  response.send(JSON.stringify('rename web service'))   
// next();
//response.end()

}).use('/Rename_Web_Service',function(request, response, next){
console.log('content detail:',request.body)

console.log('name :',request.body.name);
console.log('id :',request.body.id);

//next();
let sql = `UPDATE webservicetable SET name = ? WHERE id = ?`;
let todo = [request.body.name,request.body.id] 
con.query(sql,todo);

response.end()


});
  


app.get('/Rewrite_Web_Desc', function(request, response){
  response.send(JSON.stringify('rewrite web desc'))   

}).use('/Rewrite_Web_Desc',function(request, response, next){
console.log('content detail:',request.body)

console.log('dec :',request.body.description);
console.log('id :',request.body.id);

//next();
let sql = `UPDATE webservicetable SET description = ? WHERE id = ?`;
let todo = [request.body.description,request.body.id] 
con.query(sql,todo);

response.end()


});
  

app.get('/Delete_ATR', function(request, response){
  response.send(JSON.stringify('delete attribute'))   


}).use('/Delete_ATR',function(request, response, next){
//console.log('content detail:',request.body)
console.log('content detail:',request.body.id_service)
console.log('content detail:',request.body.id_input)

//next();
let sql = `DELETE FROM input_output_table WHERE id_service = ? and id_input= ?`;
let todo = [request.body.id_service,request.body.id_input] 

con.query(sql,todo);

response.end()


});

app.get('/Change_input', function(request, response){
  response.send(JSON.stringify('Change input'))   


}).use('/Change_input',function(request, response, next){
//console.log('content detail:',request.body)
console.log('content detail:',request.body.id_service)
console.log('content detail:',request.body.id_input)
console.log('content detail:',request.body.input_content)
console.log('content detail:',request.body.input_name)

//next();
let sql = `UPDATE input_output_table SET input_file_content = ? , input_file_name = ? WHERE id_service = ? and id_input =?`;

let todo = [request.body.input_content,request.body.input_name,request.body.id_service,request.body.id_input] 

con.query(sql,todo);

response.end()


});


app.get('/Change_output', function(request, response){
  response.send(JSON.stringify('change output'))   
}).use('/Change_output',function(request, response, next){
//console.log('content detail:',request.body)
console.log('content detail:',request.body.id_service)
console.log('content detail:',request.body.id_input)
console.log('content detail:',request.body.output_content)
console.log('content detail:',request.body.output_name)
//next();
let sql = `UPDATE input_output_table SET output_file_content = ? , output_file_name = ? WHERE id_service = ? and id_input =?`;
let todo = [request.body.output_content,request.body.output_name,request.body.id_service,request.body.id_input] 

con.query(sql,todo);

response.end()


});


app.get('/Change_input_output', function(request, response){
  response.send(JSON.stringify('change input output'))   


}).use('/Change_input_output',function(request, response, next){
//console.log('content detail:',request.body)

console.log('id service:',request.body.id_service)
console.log('id input:',request.body.id_input)
console.log('input content:',request.body.input_content)
console.log('input file name:',request.body.input_name)
console.log('output content',request.body.output_content)
console.log('output file name:',request.body.output_name)
//next();
let sql = `UPDATE input_output_table SET input_file_content = ? , input_file_name = ? , output_file_content = ? , output_file_name = ? WHERE id_service = ? and id_input =?`;

let todo = [request.body.input_content,request.body.input_name,request.body.output_content,request.body.output_name,request.body.id_service,request.body.id_input] 
con.query(sql,todo);




response.end()


});
  

//////////////////////////////

var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
  context: '/api',
  target: 'http://localhost:3000',
  secure: false
}];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);

/////////////////////////////



const port = 3000 ;

app.listen(port, ()=> console.log('Listening on port', port));
