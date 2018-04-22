var app = angular.module('AddTicket', []);

app.controller('AddTicketController', function($scope, $http, $window, $location) {

  $http.get("/api/users").then(function(response){
     $scope.users = response.data;//get the respose from the API an put it in somewhere
   });


  var session = $window.sessionStorage.getItem("SessionID");
  checkAuthentication(session);
  function checkAuthentication(session){
    if(session != "1"){
      window.location.href = "/logout";
    }
   }

   $scope.companyCheck = function(user){
     if(user.employee == "No" && user.name != "admin"){
       return true;
     }
     else{
       return false;
     }
   };
   $scope.employeeCheck = function(user){
     if(user.employee == "Yes"){
       return true;
     }
     else{
       return false;
     }
   };

});


//http://nadeemkhedr.com/how-to-do-authorization-and-role-based-permissions-in-angularjs/
