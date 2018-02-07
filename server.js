var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var firebase = require("firebase");
var port = 8080;
var path = require('path');
var app = express();
app.use(bodyParser.json());

/*
var admin = require("firebase-admin");

var serviceAccount = require("/private/gymapp-fd949-firebase-adminsdk-f6l0b-48cc6350b8.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gymapp-fd949.firebaseio.com"
});

*/

var config = {
  apiKey: "AIzaSyBA5J-Hn2Cl7GBxOZYBqb11B24ckd2yF1M",
  authDomain: "gymapp-fd949.firebaseapp.com",
  databaseURL: "https://gymapp-fd949.firebaseio.com",
  projectId: "gymapp-fd949",
  storageBucket: "gymapp-fd949.appspot.com",
  messagingSenderId: "871486720421"
};
firebase.initializeApp(config);


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

app.get('/journal', function(req,res){
  res.render('journal');
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
  var uid = data.uid;

  firebase.database().ref('users/test').set({
    test: 'test'
  });



  console.log(name);
  console.log(last);
  console.log(age);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(uid);
  res.send("printed")

});





app.listen(port, function() {
  console.log('Server Started!\nPort:'+port);
});
