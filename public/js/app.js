var app = angular.module('chatApp', ['firebase']);
var groupNum = 1
var ref = null


app.controller('ChatController', function($scope, $firebaseArray) {
    
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

    // if(ref == firebase.database().ref().child('chat/'+ "group"+ groupNum +'/messages')){  //check for public group 
    //     $scope.messages = $firebaseArray(ref); 
    //     }
    //     else{
    //         ref = firebase.database().ref().child('chat/group6/'+firebase.auth().currentUser.displayName+'/messages')  //enter private group
            $scope.messages = $firebaseArray(ref);
    // }
        // console.log("groupNum: "+ groupNum + " ref: "+ ref) for debug use


    $scope.send = function() {
    	var currentuser = firebase.auth().currentUser;
        $scope.messages.$add({
        	name: currentuser.displayName, 
            message: $scope.messageText,
            date: Date.now(),
        })
    }


    $scope.clicked = function(id){
        groupNum = id,
        ref = firebase.database().ref().child('chat/'+ "group"+ groupNum +'/messages');
        // console.log("in click groupNum: "+ groupNum + " ref: "+ ref) for debug use
        $scope.messages = $firebaseArray(ref);
    }

    // $scope.sendFriend = function() {
    //     var name = prompt("Input firend's user name: ");
    //     var ref = firebase.database().ref().child('chat/group6/' + name + 'group');  //group 6 is special for private chat use
    //     ref.set({
    //       'messages': firebase.auth().currentUser.displayName + ' added you as friend. You can chat now!',
    //  });
    // }




})
    