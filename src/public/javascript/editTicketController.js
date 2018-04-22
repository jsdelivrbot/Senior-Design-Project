var app = angular.module('EditTicket', []);

app.controller('EditTicketController', function($scope, $http, $window, $location) {



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

$scope.ticketId = getUrlParameter("id");

var session = $window.sessionStorage.getItem("SessionID");
checkAuthentication(session);
function checkAuthentication(session){
  if(session != "1"){
    window.location.href = "/logout";
  }
}
  $http.get("/api/tickets/"+$scope.ticketId).then(function(response){
     $scope.ticket = response.data;
     $scope.description = $scope.ticket.ticket.ticketdescription;
     $scope.due = $scope.ticket.ticket.duedate;
     $scope.location = $scope.ticket.ticket.location;
     $scope.priority = $scope.ticket.ticket.prioritylevel;
     $scope.assign = $scope.ticket.ticket.assignedto;
     $scope.title = $scope.ticket.ticket.tickettitle;
     $scope.companyname = $scope.ticket.ticket.companyname;
   });

   $scope.saveTicket = function(){
     $scope.ticket.ticket.tickettitle = $scope.title;
     $scope.ticket.ticket.companyname = $scope.companyname;
     $scope.ticket.ticket.assignedto = $scope.assign;
     $scope.ticket.ticket.duedate = $scope.due;
     $scope.ticket.ticket.location = $scope.location;
     $scope.ticket.ticket.prioritylevel = $scope.priority;
     $scope.ticket.ticket.ticketdescription = $scope.description;

     $http.put('/api/tickets/update/'+$scope.ticketId, $scope.ticket.ticket).then(function (req, res, next) {
       window.alert("Successfully Updated Ticket");
       location.href = '/tickets/ticketlist';
     });
   };

   $http.get("/api/users").then(function(response){
      $scope.users = response.data;//get the respose from the API an put it in somewhere
    });

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
