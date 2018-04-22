var app = angular.module('UsersList', []);

app.controller('UsersListController', function($scope, $http, $window, $location) {

var session = $window.sessionStorage.getItem("SessionID");
checkAuthentication(session);

$http.get("/api/users/").then(function(data){
if(data.length == 0){
  window.alert("There were no users to display!");
  window.history.back();
}
$scope.users = data.data.users;
});

$scope.editUser = function(userId){
  location.href = '/users/edituserinfo/?id='+userId;
};
$scope.deleteUser = function(userId){
  var response = window.confirm("Are You Sure You Want To Delete This User?");
  if(response){
  $http.get("/api/users/delete/"+userId).then(function(data){
    console.log("it worked");
    location.reload();
  });
}else{return;}
};

//DONT DISPLAY ANYTHING ABOUT ADMIN WE NEED TO KEEP A DEV ACCOUNT
$scope.findAdmin = function(user){
  var check = true;
  if(user.name == 'admin' && user.username == 'admin'){
    check = false;
  }
  return check;
}

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
      //window.alert("Your Not a Admin");
      location.histoy.back();
    }
  });
 }


});
