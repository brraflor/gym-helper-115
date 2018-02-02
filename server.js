var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var firebase = require("firebase");
var port = 8080;
var path = require('path');
var app = express();

var config = {
  apiKey: "AIzaSyBA5J-Hn2Cl7GBxOZYBqb11B24ckd2yF1M",
  authDomain: "gymapp-fd949.firebaseapp.com",
  databaseURL: "https://gymapp-fd949.firebaseio.com",
  projectId: "gymapp-fd949",
  storageBucket: "gymapp-fd949.appspot.com",
  messagingSenderId: "871486720421"
};
var fb = firebase.initializeApp(config);


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

app.get('/journal', function(req,res){
  res.render('journal');
});





app.listen(port, function() {
  console.log('Server Started!\nPort:'+port);
});
