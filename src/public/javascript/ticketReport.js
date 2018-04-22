var app = angular.module('TicketReportApp', ['ui.select']);

app.controller('TicketReport', function($scope, $http, $window, $location) {

  $scope.companyArray = [];
  $scope.priorityArray = [];
  $scope.statusArray = [];
  var companyArray = [];
  var priorityArray = [];
  var statusArray = [];
  $scope.company = null;
  $scope.sortAlreadyPressed = false;
  $scope.titleAlreadyPressed = false;
  var session = $window.sessionStorage.getItem("SessionID");
  checkAuthentication(session);
  getTickets();
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

function getTickets(){
  $http.get("/api/tickets").then(function(response){
       $scope.tickets = response.data;//get the respose from the API an put it in somewhere
       //console.log($scope.tickets.tickets);//print the results to the console
       for(var i = 0;i< $scope.tickets.tickets.length;i++){
         companyArray[i] = $scope.tickets.tickets[i].companyname;
         priorityArray[i] = $scope.tickets.tickets[i].prioritylevel;
         statusArray[i] = $scope.tickets.tickets[i].status;
       }

        companyArray.forEach(function(item) {
             if($scope.companyArray.indexOf(item) < 0) {
                 $scope.companyArray.push(item);
             }
        });
        priorityArray.forEach(function(item) {
             if($scope.priorityArray.indexOf(item) < 0) {
                 $scope.priorityArray.push(item);
             }
        });
        statusArray.forEach(function(item) {
             if($scope.statusArray.indexOf(item) < 0) {
                 $scope.statusArray.push(item);
             }
        });

       //console.log($scope.companyArray);

  });

}

  $scope.$watch("selectedStatus", function(newValue, oldValue) {
  if (newValue !==oldValue) {

				$scope.status = newValue;
        //$scope.getTickets();
  }
});

$scope.$watch("selectedCompany", function(newValue, oldValue) {
if (newValue != oldValue) {
      $scope.company = newValue;
//$scope.getTickets();
}
});

$scope.$watch("selectedPriority", function(newValue, oldValue) {
if (newValue != oldValue) {
      $scope.priority = newValue;
      //$scope.getTickets();
}
});

$scope.showTicketByCompany = function(ticket){
  var check = true;
  if($scope.company == undefined){
    return true;
  }else{
  if(ticket.companyname == $scope.company){
    check = true;
  }
  else{
    check = false;
  }
}
  return check;
}
$scope.showTicketByPriority = function(ticket){
  var check = true;
  if($scope.priority == undefined){
    return true;
  }else{
  if(ticket.prioritylevel == $scope.priority){
    check = true;
  }
  else{
    check = false;
  }
}
  return check;
}
$scope.showTicketByStatus = function(ticket){
  var check = true;
  if($scope.status == undefined || ($scope.status == undefined && $scope.priority != undefined)){
    check = $scope.showTicketByPriority(ticket);
  }else{
  if(ticket.status == $scope.status){
    check = true;
  }
  else{
    check = false;
  }
}
if($scope.priority != undefined && check == true){
  $scope.showTicketByPriority(ticket);
}
  return check;
}

$scope.sortByDue = function(){
  var date = [];
  var temp = [];
  var k = 0;
if(!$scope.sortAlreadyPressed){
while(k < $scope.tickets.tickets.length){
  for(var i = 0;i< $scope.tickets.tickets.length;i++){
    date[i] = new Date($scope.tickets.tickets[i].duedate);
    if(i == 0){
      //do nothin
    }
    else if(date[i] < date[i-1]){
      //swappy
      temp[i] = $scope.tickets.tickets[i];
      $scope.tickets.tickets[i] = $scope.tickets.tickets[i-1];
      $scope.tickets.tickets[i-1] = temp[i];
    }
  }
  k++;
}
$scope.sortAlreadyPressed = true;
}
else{
  while(k < $scope.tickets.tickets.length){
    for(var i = 0;i< $scope.tickets.tickets.length;i++){
      date[i] = new Date($scope.tickets.tickets[i].duedate);
      if(i == 0){
        //do nothin
      }
      else if(date[i] > date[i-1]){
        //swappy
        temp[i] = $scope.tickets.tickets[i];
        $scope.tickets.tickets[i] = $scope.tickets.tickets[i-1];
        $scope.tickets.tickets[i-1] = temp[i];
      }
    }
    k++;
  }
  $scope.sortAlreadyPressed = false;
}
}
$scope.sortByTitle = function(){
  var date = [];
  var temp = [];
  var k = 0;
if(!$scope.titleAlreadyPressed){
while(k < $scope.tickets.tickets.length){
  for(var i = 0;i< $scope.tickets.tickets.length;i++){
    date[i] = ($scope.tickets.tickets[i].tickettitle);
    if(i == 0){
    }
    else if(date[i] < date[i-1]){
      //swappy
      temp[i] = $scope.tickets.tickets[i];
      $scope.tickets.tickets[i] = $scope.tickets.tickets[i-1];
      $scope.tickets.tickets[i-1] = temp[i];
    }
  }
  k++;
}
$scope.titleAlreadyPressed = true;
}
else{
  while(k < $scope.tickets.tickets.length){
    for(var i = 0;i< $scope.tickets.tickets.length;i++){
      date[i] = $scope.tickets.tickets[i].duedate;
      if(i == 0){
        //do nothin
      }
      else if(date[i] > date[i-1]){
        //swappy
        temp[i] = $scope.tickets.tickets[i];
        $scope.tickets.tickets[i] = $scope.tickets.tickets[i-1];
        $scope.tickets.tickets[i-1] = temp[i];
      }
    }
    k++;
  }
  $scope.titleAlreadyPressed = false;
}
}
});
