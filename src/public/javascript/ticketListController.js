var app = angular.module('TicketList', []);

app.controller('TicketListController', function($scope, $http, $window, $location) {


$http.get("/api/tickets").then(function(response){
     $scope.tickets = response.data.tickets;//get the respose from the API an put it in somewhere
});

$scope.checkIfCompleted = function(ticket){
  var check = false;
  if(ticket.status == "Completed" || ticket.assignedto == undefined || ticket.assignedto == ""){
    console.log(ticket.status)
    check = false;
  }
  else{
    check = true;
  }
  return check;
}

$scope.checkIfTenent = function(ticket){
  var check = false;
  if(ticket.assignedto == undefined || ticket.assignedto == ""){
    console.log(ticket.title)
    check = true;
  }
  else{
    check = false;
  }
  return check;

}

  var session = $window.sessionStorage.getItem("SessionID");
  checkAuthentication(session);
  function checkAuthentication(session){
    if(session != "1"){
      window.location.href = "/logout";
    }
  }









});
