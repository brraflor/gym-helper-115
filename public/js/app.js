var app = angular.module('chatApp', ['firebase']);

app.controller('ChatController', function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child('chat/group/messages');
    var auth = firebase.auth();
    auth.onAuthStateChanged(function(user) {
  	var user = firebase.auth().currentUser;
	var name, email;

	if (user != null) {
 	 name = user.displayName;
	 email = user.email;
	} else {
   		 // No user is signed in.
 		 }
	});

    $scope.messages = $firebaseArray(ref);

    $scope.send = function() {
    	var currentuser = firebase.auth().currentUser;
        $scope.messages.$add({
        	name: currentuser.displayName,
            message: $scope.messageText,
            date: Date.now()

        })
    }

})