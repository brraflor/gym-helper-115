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
      console.log(uid)
      user.getIdToken().then(function(accessToken) {
        document.getElementById('name').textContent = displayName;
        document.getElementById('uid').textContent = uid;
	document.getElementById('userid').value = uid;
        document.getElementById('phone').textContent = phoneNumber;
        document.getElementById('email').textContent = email;
      });
      
    } else {
      // User is signed out.
    }
  }, function(error) {
    console.log(error);
  });
};
window.addEventListener('load', function() {
  initApp()
});
