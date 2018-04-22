var app = angular.module('ClientHomePage' ,[]);
app.controller('ClientHomePageController', function($scope, $http, $window, $location, $filter) {

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
//both of the homepage/client homepage checks are different ask brandon why
$scope.id = getUrlParameter("id");
$window.sessionStorage.setItem("userID", $scope.id);
checkAuthentication();
$scope.companyname = null;

function checkAuthentication(){

  $http.get("/api/users/"+$scope.id).then(function(response){
              $scope.user = response.data;//get the respose from the API an put it in somewhere
              $scope.companyname = $scope.user.user.name;
              console.log($scope.companyname);
              $window.sessionStorage.setItem("SessionID", 1);//since a user just logged in and its not null, set the sessionID to 1
   }).catch(function (err) {
     window.location.href = "/logout";//redirect to the login page because they were not auththenticated
   });
 }

$http.get("/api/tickets").then(function(data){
  $scope.ticketsForCompany = [];
  var tickets = data.data.tickets;
  for(var i = 0;i < tickets.length;i++){
    if(tickets[i].companyname == $scope.companyname){
      $scope.ticketsForCompany.push(tickets[i]);
      console.log(tickets[i]);
    }
    else{
      //you have no tickets
    }
  }

});


$scope.submitTicket = function(){
  var timestamp = Date();
  var ticket = {//make a JSON object
    tickettitle: $scope.title,
    ticketdescription: $scope.description,
    companyname: $scope.companyname,
    location: $scope.location,
    assignedto: "Not Assigned Yet",
    prioritylevel: "Not Set",
    duedate: "Not Set",
    status: "not started",
    timestamp: timestamp
  };

  console.log(ticket);
$http.post("/api/tickets/new",ticket).then(function(data){
  window.alert("Successfully Submitted Ticket!");

    $http.post("/api/sendemail",ticket).then(function(data){
    window.alert("Successfully Sent Email!");
  window.location.reload();
  });
  window.location.reload();

});
};
});
