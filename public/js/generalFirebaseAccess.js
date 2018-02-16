var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyBA5J-Hn2Cl7GBxOZYBqb11B24ckd2yF1M",
  authDomain: "gymapp-fd949.firebaseapp.com",
  databaseURL: "https://gymapp-fd949.firebaseio.com",
  projectId: "gymapp-fd949",
  storageBucket: "gymapp-fd949.appspot.com",
  messagingSenderId: "871486720421"
};
firebase.initializeApp(config);

initApp = function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var uid = user.uid;
      var phoneNumber = user.phoneNumber;
      var providerData = user.providerData;
      user.getIdToken().then(function(accessToken) {
        document.getElementById('sign-in-status').textContent = 'Signed in';
        document.getElementById('name').textContent = "Welcome "+displayName;
         document.getElementById('uid').textContent = uid;
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: displayName,
          email: email,
          emailVerified: emailVerified,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
          uid: uid,
          accessToken: accessToken,
          providerData: providerData
        }, null, '  ');
      });
      var database = firebase.database();
      firebase.database().ref('users/' + uid).set({
  username: user.displayName,
  email: user.email,
  profile_picture : user.photoURL
});
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      document.getElementById('sign-in').textContent = 'Sign in';
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});
