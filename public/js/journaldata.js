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
      var ref = firebase.database().ref('users/' + uid + '/journal');
      ref.once('value').then(function(snapshot){
        var pushupsexist = snapshot.exists('pushups/total');
        var pushupsref = snapshot.child('pushups/total');
        var situpsexist = snapshot.exists('situps/total');
        var situpsref = snapshot.child('situps/total');
        var pullupsexist = snapshot.exists('pullups/total');
        var pullupsref = snapshot.child('pullups/total');
        

        user.getIdToken().then(function(accessToken) {
          document.getElementById('pushups') = parseElements(pushupsexist, pushupsref);
          document.getElementById('situps') = parseElement(situpsexist, situpsref);
          document.getElementById('pullups')  = parseElement(pullupsexist, pullupsref);
          console.log(pushupsref);
          console.log(situpsref);
          console.log(pullupsref);
         });

      });

    } else {
      //user is signed out
    }
  }, function(error) {
    console.log(error);
  });

};
function parseElement(exists, ref) {
  if(exists){
    return ref;
  } else{
    return null;
  }
};
window.addEventListener('load', function() {
  initApp()
});
