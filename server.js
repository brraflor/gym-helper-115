var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var firebase = require("firebase");
var port = 8080;
var path = require('path');

var app = express();

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

app.get('/login/loggedIn', function(req,res){
  res.redirect('/');
});





app.listen(port, function() {
  console.log('Server Started!\nPort:'+port);
});
