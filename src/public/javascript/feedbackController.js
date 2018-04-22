var app = angular.module('Feedback', []);

app.controller('FeedbackController', function($scope, $http, $window, $location) {
  $scope.sendMail = function(){
    console.log($scope.description);
    var des = {
      description: $scope.description
    }
    $http.post("/api/feedback/new", des).then(function(){
      window.alert("Feedback Successfully Sent");
      home();
    //  window.location.href = '/homepage/?id='+$scope.users[i]._id;
    });
    //location.href = ("mailto:brennanmuir@gmail.com?subject=fromWebApp&body="+$scope.message);
};
});
var id = sessionStorage.getItem("userID");
function logOut(elem) {
  sessionStorage.removeItem("userID");
  sessionStorage.removeItem("SessionID");
  window.location.href = "/logout";
  }
var id = sessionStorage.getItem("userID");
function home() {
    window.location.href = "/homepage/?id=" + sessionStorage.getItem("userID");
  }
