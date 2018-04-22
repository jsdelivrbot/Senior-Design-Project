var app = angular.module('EditUser', []);

app.controller('EditUserController', function($scope, $http, $window, $location) {

  var getUrlParameter = function getUrlParameter(sParam) {//dependency
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
  };

  var id = getUrlParameter("id");
  console.log(id);

  $http.get("/api/users/"+id).then(function(data){
    $scope.user = data.data.user
  });

$scope.saveUser = function(){
   $scope.user.name = $scope.name;
   $scope.user.username = $scope.username;
   $scope.user.password = $scope.password;
  $http.put('/api/users/update/'+id, $scope.user).then(function (req, res, next) {
    window.alert("Successfully Updated User");
    location.href = '/users/userslist';
  });

};



});
