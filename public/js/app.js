var app = angular.module('chatApp', ['firebase']);
var groupNum = 1
var ref = null


app.controller('ChatController', function($scope, $firebaseArray) {
    // Ref with Group number
    ref = firebase.database().ref().child('chat/'+ "group"+ groupNum +'/messages');
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

    //send button on click
    $scope.send = function() {
    	var currentuser = firebase.auth().currentUser;
        $scope.messages.$add({
        	name: currentuser.displayName,
            message: $scope.messageText,
            date: Date.now(),
        })
    }

    //change the groupnumber
    $scope.clicked = function(id){
        groupNum = id,
        ref = firebase.database().ref().child('chat/'+ "group"+ groupNum +'/messages');
        // console.log("in click groupNum: "+ groupNum + " ref: "+ ref) for debug use
        $scope.messages = $firebaseArray(ref);
    }
})
