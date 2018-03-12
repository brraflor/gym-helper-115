var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var firebase = require("firebase");


var port = process.env.PORT || 8080;
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
//render loging page
app.get('/login', function(req,res){
  res.render('login');
});
//render journal update page
app.get('/journal', function(req,res){
  res.render('journal');
});
//redirect from logged in to profile
app.get('/loggedIn', function(req,res){
  res.redirect('profile');
});
//render page with form to update profile information
app.get('/updateprofile', function(req,res){
  res.render('updateprofile');
});
//render chat page
app.get('/chat', function(req, res){
  res.render('chat');
});
//render leaderboard page, get from database done in .ejs
app.get('/leaderboard', function(req, res){
  res.render('leaderboard');
});
//renders page with height weight and static HR information
app.get('/updateBMI', function(req, res){
  res.render('updateBMI');
});
//initially renders information
app.get('/fitnessdata', function(req, res){
  //dummy variables copied from app.post with same name
  var exercise = ' '
  var uid = 123
  var xAxis = []
  var data = []
  // var leadsRef = firebase.database().ref('users/' +uid+ '/journal/' +exercise+'/tpd');
  // leadsRef.once("value").then(function(snapshot) {
  //   snapshot.forEach(function(child) {
  //   xAxis.push(child.key);
  //   data.push(child.val());
  // });
  res.render('fitnessdata', {xAxis: xAxis, data:data, exercise:exercise});
  //});
});
//app.post to get information about specific user data
app.post('/fitnessdata', function(req, res) {
  var data = req.body;
  var uid = data.userid
  var exercise = data.exercise
  var xAxis = []
  var data = []
  var leadsRef = firebase.database().ref('users/' +uid+ '/journal/' + exercise + '/tpd');
  //for each value in ../tpd , get the key and value and push to appropriate lists
  leadsRef.once("value").then(function(snapshot) {
    snapshot.forEach(function(child) {
      xAxis.push(child.key);
      data.push(child.val());
      console.log(data);
    });
    console.log(data);
    res.render('fitnessdata', {xAxis: xAxis, data:data, exercise: exercise});
  });
});
//function to update user bmi and related information
app.post("/updateheightweight", (req, res) => {
  //parse data from request
  var data = req.body;
  var height = data.height;
  var weight = data.weight;
  //var bmi = data.bmi;
  var heartrate = data.heart;
  var uid = data.userid
  //change variables to fit calculations
  var intHeight = parseInt(height) / 100;//now in meters
  var intWeight = parseInt(weight);//in kilograms
  var bmi = (intWeight / (intHeight * intHeight));//bmi calculations
  //broca ideal body weight for gender
  var brocaInt = ((intHeight * 100)-100); //integer for ideal weight calculations
  var brocaM = brocaInt - (brocaInt * .1); //broca weight for Male
  var brocaW = brocaInt - (brocaInt * .15);//broca weight for Female
  //IBW = ideal body weight

  //format Date() object for data entry
  var today = new Date();
  var dd = today.getDate();//get day
  var mm = today.getMonth()+1;//get month //January is 0!
  var yyyy = today.getFullYear();//get year
  //fix date and month so that they are always 2 digits long
  if(dd<10) {
    dd = '0'+dd
  }
  if(mm<10) {
    mm = '0'+mm
  }
  //set variable today
  today = mm + '_' + dd + '_' + yyyy;
  //push data to database for each data point
  firebase.database().ref('users/' + uid + '/profile/bodyinfo').update({
    height: height,
    weight: weight,
    staticHR: heartrate,//unused in frontend
    bmi: bmi,
    maleIBW: brocaM,//unused in frontend
    femaleIBW: brocaW//unused in frontend
  });
  //push weight and bmi calculations to tpd directory for data visualization
  var tpdRef = firebase.database().ref('users/' + uid + '/journal/bmi/tpd/');
  tpdRef.update({
    [today]: bmi
  });
  var tpdweight = firebase.database().ref('users/' + uid + '/journal/weight/tpd/');
  tpdweight.update({
    [today]: weight
  })
  //render
  res.render('profile');
});

//render leaderboard
app.post("/leaderboard", (req, res) => {
  //parse data from request
  var data = req.body;
  var uid = data.userid;
  var exercise = data.exercise;

  console.log(data)
  //store leaderboard selection in file in database
  firebase.database().ref('users/' + uid + '/leaderboard').set({
    exercise: exercise
  });
  //render leaderboard
  res.render('leaderboard');
});

app.post("/updateInformation", (req, res) => {
  //parse data from request
  var data= req.body;
  var name = data.first;
  var last = data.last;
  var age = data.age;
  var address = data.address;
  var city = data.city;
  var state = data.state;
  var gender = data.gender;
  var zip = data.zip;
  var sets = data.sets;
  var reps = data.reps;
  var exercise = data.exercise;
  var uid = data.userid;

  //store data in profile directory in database
  firebase.database().ref('users/' + uid + '/profile').update({
    firstName: data.first,
    lastName: data.last,
    age: data.age,
    gender: data.gender,
    address: data.address,
    city: data.city,
    state: data.state,
    zipcode: data.zip
  });
  console.log(address);
  console.log(city);
  console.log(state);
  console.log(zip);
  console.log(uid);
  //render profile
  res.render("profile");
});

app.post("/updatejournal", (req, res) => {
  //parse data from request
  var data = req.body;
  var uid = data.userid;
  var username = data.displayName;
  var date = data.date;
  var sets = data.sets;
  var reps = data.reps;
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
  //more accurate date used for individual data points
  var todayFull = mm + '_' + dd + '_' + yyyy + ' ' + hr + ':' + min + ':' + sec;
  //push sets and reps into database, not used in frontend
  firebase.database().ref('users/' + uid + '/journal/' + exercise +'/'+ todayFull).set({
  reps: reps,
  sets: sets
  });
  //create or update files in database for data presentation purposes in tpd
  //used solely for graphing purposes
  var tpdRef = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/tpd/');
  tpdRef.once('value').then(function(snapshot){
    if(snapshot.child(today).exists()){
      //data point exists
      var todayTotal = snapshot.child([today]).val();
      var todayTotal = todayTotal + (reps * sets);
      tpdRef.update({
        //override existing datapoint
        [today]: todayTotal
      });
    }
    else {
      var todayTotal = (reps * sets);
      tpdRef.update({
        //creates datapoint
        [today]: todayTotal
      });
    }
  });
  //creates a total value under users profile, and on leaderboard.
  var ref = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total');
  //var totals = firebase.database().ref('exercises/' + exercise);
  ref.once("value").then(function(snapshot) {
    //console.log('before if statement in total');
    //console.log(snapshot.child('total'));
    //check to see if a value exists
   if(snapshot.child('total').exists()) {
      //overwrite past value under user and leaderboard
      var pasttotal = snapshot.child('total').val();
      var total = parseInt(pasttotal) + (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      //check assumes that this is created due to other also being created
      firebase.database().ref('leaderboard/' + exercise).update({
        [username]: total
      });
      //impliment achievements
      var achieveRef = firebase.database().ref('users/' + uid + '/achievements');
      //for each level of achievement a different number is used
      if (total > 100000) {
        achieveRef.update({
          [exercise]: 5
        });
      } else
      if (total > 50000){
        achieveRef.update({
          [exercise]: 4
        });
      } else
      if (total > 10000){
        achieveRef.update({
          [exercise]: 3
        });
      } else
      if (total > 5000){
        achieveRef.update({
          [exercise]: 2
        });
      } else
      if (total > 1000){
        achieveRef.update({
          [exercise]: 1
        });
      } else{
        achieveRef.update({
          [exercise]: 0
        });
      }
      //end achievement implimentation

    } else {
      //console.log('in else');
      //assumes first time doing this exercise
      var total = (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      firebase.database().ref('leaderboard/' + exercise).set({
        [username]: total
      });
      //impliment achievements
      var achieveRef = firebase.database().ref('users/' + uid + '/achievements');
      if (total > 100000) {
        achieveRef.update({
          [exercise]: 5
        });
      } else
      if (total > 50000){
        achieveRef.update({
          [exercise]: 4
        });
      } else
      if (total > 10000){
        achieveRef.update({
          [exercise]: 3
        });
      } else
      if (total > 5000){
        achieveRef.update({
          [exercise]: 2
        });
      } else
      if (total > 1000){
        achieveRef.update({
          [exercise]: 1
        });
      } else{
        achieveRef.update({
          [exercise]: 0
        });
      }
      //end of achievements implimentation
    }
  });

  res.render("journal");

});

app.post("/updatejournal2", (req, res) => {
  //parse data from request
  var data = req.body;
  var distance = data.miles;
  var hours = data.Hours;
  var minutes = data.Minutes;
  var uid = data.userid;
  var username = data.displayName;
  var exercise = data.exercise;
  console.log(data);
  //get and parse date information
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
  //more accurate data points for individual workout data points
  var todayFull = mm + '_' + dd + '_' + yyyy + ' ' + hr + ':' + min + ':' + sec;
  //change time data to a single number, based on hours
  var timeInHour = parseInt(hours) + (parseInt(minutes)/60);
  //workout pace is distance/time
  var workoutPace = parseInt(distance) / timeInHour;
  //store individual workout data into database
  firebase.database().ref('users/' + uid + '/journal/' + exercise +'/'+ todayFull).set({
    distance: distance,
    time: timeInHour,
    workoutPace: workoutPace
  });
  //store workout pace to tpd for data visualization
  var tpdRef = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/tpd/');
  tpdRef.update({
    [todayFull]: workoutPace
  });

  var ref = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total');
  //var totals = firebase.database().ref('exercises/' + exercise);
  ref.once("value").then(function(snapshot) {
    //console.log('before if statement in total');
    //console.log(snapshot.child('total'));
   if(snapshot.child('total').exists()) {
      var pasttotal = snapshot.child('total').val();
      var total = parseInt(pasttotal) + (parseInt(distance));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      firebase.database().ref('leaderboard/' + exercise).update({
        [username]: total
      });
      //impliment achievements
      var achieveRef = firebase.database().ref('users/' + uid + '/achievements');
      if (total > 100000) {
        achieveRef.update({
          [exercise]: 5
        });
      } else
      if (total > 50000){
        achieveRef.update({
          [exercise]: 4
        });
      } else
      if (total > 10000){
        achieveRef.update({
          [exercise]: 3
        });
      } else
      if (total > 5000){
        achieveRef.update({
          [exercise]: 2
        });
      } else
      if (total > 1000){
        achieveRef.update({
          [exercise]: 1
        });
      } else{
        achieveRef.update({
          [exercise]: 0
        });
      }
      //end achievement implimentation

    } else {
      //console.log('in else');
      var total = (parseInt(distance));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
      firebase.database().ref('leaderboard/' + exercise).set({
        [username]: total
      });
      //impliment achievements
      var achieveRef = firebase.database().ref('users/' + uid + '/achievements');
      if (total > 100000) {
        achieveRef.update({
          [exercise]: 5
        });
      } else
      if (total > 50000){
        achieveRef.update({
          [exercise]: 4
        });
      } else
      if (total > 10000){
        achieveRef.update({
          [exercise]: 3
        });
      } else
      if (total > 5000){
        achieveRef.update({
          [exercise]: 2
        });
      } else
      if (total > 1000){
        achieveRef.update({
          [exercise]: 1
        });
      } else{
        achieveRef.update({
          [exercise]: 0
        });
      }
      //end of achievements implimentation
    }
  });
  //render journal page for subsequent updates to information
  res.render('journal');
});
//render profile page
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
