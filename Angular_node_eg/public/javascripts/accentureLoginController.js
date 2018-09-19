
var angularjs_with_Nodejs = angular.module('angularjs_with_Nodejs');

angularjs_with_Nodejs.controller('accentureLoginController', function ($rootScope,$scope, $timeout, $filter, $http) {


    $scope.SwitchtoDemoPage = function()
    {
        var username = document.getElementById("username").value;  
        var password = document.getElementById("password").value; 
        
        if( username == "alessandro.puccio@accenture.com" && password == "demo@123" )
        {
            sessionStorage.setItem("token",'lzbPt76HhtGKhHRj');
            window.location.href = '/AccentureBIPlatform';
        }
        else
        {
            alert("Please enter valid Username and Password");
        }

        //window.location.href = '/AccentureBIPlatform';
    }
});
