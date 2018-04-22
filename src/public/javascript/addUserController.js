var app = angular.module('AddUser', []);
app.controller('AddUserController', function($scope, $http, $window, $location, $sce) {
var session = $window.sessionStorage.getItem("SessionID");
checkAuthentication(session);

function checkAuthentication(session){
  if(session != "1"){
    window.location.href = "/logout";
  }
  var userId = $window.sessionStorage.getItem("userID");
  $http.get("/api/users/"+userId).then(function(data){
    if(data.data.user.permissions == 'Admin'){
      console.log("your admin, showing everything");
      $scope.isAdmin = true;
    }else{
      $scope.isAdmin = false;
      window.alert("You Do Not Have Admin Permissions");
      window.history.back();
    }
  });
 }
});
