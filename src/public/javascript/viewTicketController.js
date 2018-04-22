var app = angular.module('ViewTicket', []);

app.controller('ViewTicketController', function($scope, $http, $window, $location, $sce) {

  var getUrlParameter = function getUrlParameter(sParam) {//basically a dependency
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

  Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

  $scope.ticketid = getUrlParameter("id");
  var ticketId = null;
  $http.get("/api/tickets/"+$scope.ticketid).then(function(response){
  //console.log("successfully recieved data");
   $scope.ticket = response.data;//get the respose from the API an put it in somewhere
   ticketId = $scope.ticket.ticket._id;
   $scope.comments = $scope.ticket.ticket.comments;
   console.log($scope.comments);


   //show all files associated with the ticket
   $http.get("/api/show/"+$scope.ticketid).then(function(data){
     $scope.files = [];
     var files = data.data;
     files.clean(undefined);
     console.log(files)
     if(files.length > 0){
     for(var i = 0;i < files.length;i++){
       var test = files[i].Key.split("---");
       console.log(test[3])
       if(test[0] == $scope.ticketid){
         $scope.files[i] = (test[1]+"---"+test[2]);
       }
     }
     $scope.files.clean(undefined);
     console.log($scope.files)
   }
   });


   });

  $scope.deleteTicket = function(){
    var response = window.confirm("Are You Sure You Want To Delete This Ticket?");
    if(response){
    $http.get("/api/tickets/delete/"+ticketId).then(function(response){
      window.alert("Successfully Deleted This Ticket");
      window.history.back();
    });
  }else{return;}
  };
  $scope.inProgress = function(){
    $scope.ticket.ticket.status = "In Progress";
    var ticket = $scope.ticket.ticket;
    $http.put("/api/tickets/update/"+ticketId, ticket).then(function(response){
      window.location.reload();
    });
  };
  $scope.onHold = function(){
    $scope.ticket.ticket.status = "On Hold";
    var ticket = $scope.ticket.ticket;
    $http.put("/api/tickets/update/"+ticketId, ticket).then(function(response){
      window.location.reload();
    });
  };
  $scope.completeTicket = function(){
    $scope.ticket.ticket.status = "Completed";
    var ticket = $scope.ticket.ticket;
    $http.put("/api/tickets/update/"+ticketId, ticket).then(function(response){
      window.location.reload();
    });
  };

  $scope.editTicket = function(){
    location.href = '/tickets/editticket/?id='+ticketId;
  };

  $scope.formUrl = $sce.trustAsResourceUrl('/tickets/upload/' + $scope.ticketid);

  $scope.addAttachment = function(){
    console.log("pressed");
  };
  $scope.addComment = function(){

    var userId = $window.sessionStorage.getItem("userID", $scope.id);
    var name = null;
    $http.get("/api/users/"+userId).then(function(data){
      name = data.data.user.name;

      var oldTicket = $scope.ticket.ticket;
    if(oldTicket.comments == null || oldTicket.comments == undefined || oldTicket.comments.length == 0){
    var comment = [{
      name: name,
      comment: $scope.comment,
    }];

    var ticket = {//make a JSON object
      tickettitle: oldTicket.tickettitle,
      ticketdescription: oldTicket.ticketdescription,
      companyname: oldTicket.companyname,
      assignedto: oldTicket.assignedto,
      prioritylevel: oldTicket.prioritylevel,
      duedate: oldTicket.duedate,
      comments: comment,
      status: oldTicket.status,
      timestamp: oldTicket.timestamp
    };

    console.log(ticket);

    $http.put("/api/tickets/update/"+oldTicket._id, ticket).then(function(response){
      window.location.reload();
    });
  }else{

    var comment = {
      name: name,
      comment: $scope.comment,
    };

    //push the new comment
    oldTicket.comments.push(comment);

    $http.put("/api/tickets/update/"+oldTicket._id, oldTicket).then(function(response){
      window.location.reload();
    });
  }
 });
};
$scope.editTicket = function(){
  location.href = '/tickets/editticket/?id='+ticketId;
};

$scope.isAdmin = false;
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
    }
  });
 }

$scope.downloadAttachment = function(filename){
  window.open("/api/download/"+filename+"/"+$scope.ticketid);
}

});
