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

app.get('/journal', function(req,res){
  res.render('journal');
});

app.get('/loggedIn', function(req,res){
  res.redirect('profile');
});

app.get('/updateprofile', function(req,res){
  res.render('updateprofile');
});

app.get('/chat', function(req, res){
  res.render('chat');
});

app.get('/fitnessdata', function(req, res){
  res.render('fitnessdata');
});

app.get('/leaderboard', function(req, res){
  res.render('leaderboard');
});

app.get('/updateBMI', function(req, res){
  res.render('updateBMI');
});

app.post("/updateheightweight", (req, res) => {
  var data = req.body;
  var height = data.height;
  var weight = data.weight;
  //var bmi = data.bmi;
  var heartrate = data.heart;
  var uid = data.uid

  var intHeight = parseInt(height) / 100;
  var intWeight = parseInt(weight) / 100;
  var bmi = (intWeight / intHeight) / intHeight;
//broca ideal body weight for gender
  var brocaInt = ((intHeight * 100)-100);
  var brocaM = brocaInt - (brocaInt * .1);
  var brocaW = brocaInt - (brocaInt * .15);
//IBW = ideal body weight
  firebase.database().ref('users/'+ uid + '/profile/bodyinfo').update({
    height: height,
    weight: weight,
    staticHR: heartrate,
    bmi: bmi,
    maleIBW: brocaM,
    femaleIBW: brocaW
  });
  res.render('home');
});

app.post("/updateleaderboard", (req, res) => {
  var data = req.body;
  var uid = data.userid;
  var exercise = data.exercise;

  console.log(data)
  console.log(uid)

  firebase.database().ref('users/' + uid + '/leaderboard').set({
    exercise: exercise
  });
  res.render('leaderboard');
});

app.post("/updateInformation", (req, res) => {
  var data= req.body;
  //name
  var name = data.first;
  var last = data.last;
  var age = data.age;
  var address = data.address;
  var city = data.city;
  var state = data.state;
  var zip = data.zip;
  var sets = data.sets;
  var reps = data.reps;
  var exercise = data.exercise;
  var uid = data.userid;

  firebase.database().ref('users/' + uid + '/profile').set({
    firstName: data.first,
    lastName: data.last,
    age: data.age,
    //gender: data.inlineFormCustomSelect,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zip
  });
  console.log(sets);
  console.log(reps);
  console.log(exercise);
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(uid);
  res.render("profile");

});

app.post("/updatejournal", (req, res) => {
  var data = req.body;
  var uid = data.userid;
  var date = data.date;
  var sets = data.sets;
  var reps = data.reps;
  var exercise = data.exercise
  var exercise = data.exercise;
  console.log(data)

  //get current date
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = mm + '_' + dd + '_' + yyyy;
  var todayFull = mm + '_' + dd + '_' + yyyy + ' ' + hr + ':' + min + ':' + sec;
  //get total for exercise

  //push into database
  firebase.database().ref('users/' + uid + '/journal/' + exercise +'/'+ todayFull).set({
  reps: reps,
  sets: sets
  });
  var tpdRef = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/tpd/');

  tpdRef.once('value').then(function(snapshot){
    if(snapshot.child(today).exists()){
      var todayTotal = snapshot.child([today]).val();

      var todayTotal = todayTotal + (reps * sets);
      tpdRef.update({
        [today]: todayTotal
      });
    }
    else {
      var todayTotal = (reps * sets);
      tpdRef.update({
        [today]: todayTotal
      });
    }
  });

  var ref = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total');
  var totals = firebase.database().ref('exercises/' + exercise);
  ref.once("value").then(function(snapshot) {
    //console.log('before if statement in total');
    //console.log(snapshot.child('total'));
   if(snapshot.child('total').exists()) {

      var pasttotal = snapshot.child('total').val();
      var total = parseInt(pasttotal) + (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      firebase.database().ref('leaderboard/' + exercise).update({
        [uid]: total
      });

    } else {
      //console.log('in else');
      var total = (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      firebase.database().ref('leaderboard/' + exercise).set({
        [uid]: total
      });
    }
  });

  res.render("journal");

});

app.get('/profile', function(req,res){
  res.render('profile');
});

module.exports = {
tst:  function(){
  return 'hello';
},
tsttwo: function(one, two){
    return one + two;
  }
}


app.listen(port, function() {
  console.log('Server Started!\nPort:'+port);
});
