var app = angular.module('Search', []);

app.controller('SearchController', function($scope, $http, $window, $location) {
  $scope.results = false;
  $scope.searchKeyword =function(ticket){
    var check = false;
    if(ticket.tickettitle.match($scope.title) && ticket.assignedto!= ""&& ticket.assignedto!= undefined ){
      console.log(ticket.title)
      check = true;
        $scope.results = true;
    }
    else{
      check = false;
    }
    return check;
  }

  $scope.searchKeywords =function(ticket){
    var check = false;
    if(ticket.tickettitle.match($scope.title) && ticket.assignedto== "" || ticket.tickettitle.match($scope.title) && ticket.assignedto == undefined ){
      console.log(ticket.title)
      check = true;
      $scope.results = true;
    }
    else{
      check = false;
    }
    return check;
  }
  $scope.search = function(){
    if($scope.title != null && $scope.title != ''){
      $http.get("/api/tickets").then(function(data){
           $scope.tickets = data.data.tickets;
           console.log(" by title")
           for(var i = 0;i < $scope.tickets.length;i++){
             if($scope.tickets[i].tickettitle.match($scope.title)){
               $scope.searchFailed = false;//$window.location.href = '/tickets/viewticketinformation/?id='+$scope.tickets[i]._id;
               return;
             }
             else{
               $scope.searchFailed = true;
             }
           }
      });
    }
    else if($scope.number != null && $scope.number != ''){
      $http.get("/api/tickets").then(function(data){
           $scope.tickets = data.data.tickets;
              console.log(" by number")
           for(var i = 0;i < $scope.tickets.length;i++){
             if($scope.tickets[i].id == $scope.number){
                  console.log(" found it hoe")
               $window.location.href = '/tickets/viewticketinformation/?id='+$scope.tickets[i]._id;
             }
             else{
               $scope.searchFailed = true;
             }
           }
      });
    }
  }
});
