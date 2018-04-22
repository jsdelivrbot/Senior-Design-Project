var app = angular.module('HomePage' ,[]);

app.filter('myDate', function($filter){
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate = $filter('date')((date), 'MM/dd/yyyy');
     return items.filter(function(item){

       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate2', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 1);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate3', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 2);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate4', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 3);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate5', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 4);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate6', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 5);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});
app.filter('myDate7', function($filter)
{
  return function(items) {
    if(items == undefined){
      return null;
    }
     var currentDate = new Date();
     var date = new Date();
     currentDate.setDate(date.getDate() + 6);
     //(currentDate);
     currentDate = $filter('date')((currentDate), 'MM/dd/yyyy');
     //(currentDate);
     return items.filter(function(item){
       //(item);
       if(JSON.stringify(item).includes(currentDate)){ //true)){
         return (item);
       }
        //return new Date(item) <= currentDate;
     });
   };
});


app.controller('HomePageController', function($scope, $http, $window, $location, $filter) { /// main controller!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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


$scope.id = getUrlParameter("id");
$window.sessionStorage.setItem("userID", $scope.id);
checkAuthentication();
fetch();

function checkAuthentication(){
//get the user and if you cant find that user then redirect to login page
  $http.get("/api/users/"+$scope.id).then(function(response){
    $scope.user = response.data;//get the respose from the API an put it in somewhere
    $window.sessionStorage.setItem("SessionID", 1);//since a user just logged in and its not null, set the sessionID to 1
   }).catch(function (err) {
     window.location.href = "/logout";
   });
 }

function fetch(){$http.get("/api/tickets").then(function(response){
   $scope.tickets = response.data;//get the respose from the API an put it in somewhere
 });
}


 $scope.today = new Date();
 $scope.date = new Date();
 $scope.showToday = false;
 $scope.showTomorrow = false;
 $scope.tomorrow = new Date();
 $scope.tomorrow1 = new Date();
 $scope.tomorrow2 = new Date();
 $scope.tomorrow3 = new Date();
 $scope.tomorrow4 = new Date();
 $scope.tomorrow5 = new Date();

 $scope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
 $scope.tomorrow1.setDate($scope.today.getDate() + 2);
 $scope.tomorrow2.setDate($scope.today.getDate() + 3);
 $scope.tomorrow3.setDate($scope.today.getDate() + 4);
 $scope.tomorrow4.setDate($scope.today.getDate() + 5);
 $scope.tomorrow5.setDate($scope.today.getDate() + 6);

 $scope.single =  ($filter('date')($scope.date, 'MM-dd-yyyy'));

});

// <script>
// angular.bootstrap(document.getElementById('1'), ['AppPermissionController']);
// angular.bootstrap(document.getElementById('2'), ['HomePage']);
// </script>

//http://nadeemkhedr.com/how-to-do-authorization-and-role-based-permissions-in-angularjs/
