var express = require('express');
var bodyParser = require("body-parser");
var request = require('request');
var firebase = require("firebase");


var port = 8080;
var serverPort = 3000;
var path = require('path');
var app = express();

//^^^^^^^^^^^^^^^^^ Socket IO ^^^^^^^^^^^^^^^^^^^^
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    //console.log('message: ' + msg);
  });
  socket.on('disconnect', function(socket){
    console.log('user disconnected');
  });
});


server.listen(serverPort, function(){
  console.log('Server listening: port:', serverPort);
});
//^^^^^^^^^^^^^^^^^^ Socket IO ^^^^^^^^^^^^^^^^^^^^


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

app.get('/profilepage', function(req,res){
  res.render('profilepage');
});

app.get('/chat', function(req, res){
  res.render('chat');
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
  var sets = data.sets;
  var reps = data.reps;
  var exercise = data.exercise;
  var uid = data.uid;

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

  if(dd<10) {
      dd = '0'+dd
  }

  if(mm<10) {
      mm = '0'+mm
  }

  today = mm + '_' + dd + '_' + yyyy;
  //get total for exercise

  //push into database
  firebase.database().ref('users/' + uid + '/journal/' + exercise +'/'+ today).set({
  reps: reps,
  sets: sets
  });

  var ref = firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total');

  ref.once("value").then(function(snapshot) {
    console.log('before if statement');
    //console.log(snapshot.child('total'));
    if(snapshot.child('total').exists()){

      var pasttotal = snapshot.child('total').val();
      var total = parseInt(pasttotal) + (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
      });
    } else {
      console.log('in else');
      var total = (parseInt(reps) * parseInt(sets));
      firebase.database().ref('users/' + uid + '/journal/' + exercise + '/total').set({
        total: total
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
