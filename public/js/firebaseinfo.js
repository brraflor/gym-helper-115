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
        document.getElementById('username').textContent = displayName;
        document.getElementById('email').textContent = email;
        document.getElementById(profile_picture) = uphotoURL;
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
        console.log("firebaseinfo check");
        firebase.database().ref('users/' + uid + '/generatedUserInfo').set({
          username = displayName,
          email = email,
          photoURL = photoURL
        });
        console.log("post firebaseinfo check");
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
