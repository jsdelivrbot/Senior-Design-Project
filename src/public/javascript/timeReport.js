var app = angular.module('TimeReportApp', []);

app.controller('TimeReport', function($scope, $http, $window, $location) {
  $http.get("/api/tickets").then(function(response){
       $scope.tickets = response.data;//get the respose from the API an put it in somewhere
       console.log($scope.tickets.tickets);//print the results to the console
  });






  
});
