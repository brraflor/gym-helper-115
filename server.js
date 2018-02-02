var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');

var port = 8080;
var path = require('path');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
//Dont have to write ejs extension
app.set('view engine', 'ejs');


//Home Route
app.get('/', function(req,res){
  res.render('home');
});

app.get('/login', function(req,res){
  res.render('login');
});

app.get('/loggedIn', function(req,res){
  res.render('loggedIn');
});

app.get('/profilepage', function(req,res){
  res.render('profilepage');
});

app.post("/tst", (req, res) => {
  var data= req.body;
  //name
  var name = data.first;
  var last = data.last;
  var age = data.age;
  var address = data.address;
  var city = data.city;
  var state = data.state;
  var zip = data.zip;

  console.log(name);
  console.log(last);
  console.log(age);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  res.send("printed")

});





app.listen(port, function() {
  console.log('Server Started!\nPort:'+port);
});
