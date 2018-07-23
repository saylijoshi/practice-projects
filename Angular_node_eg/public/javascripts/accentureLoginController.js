
angular.module('angularjs_with_Nodejs').controller('accentureLoginController', function ($rootScope,$scope, $timeout, $filter, $http) {

    $scope.SwitchtoDemoPage = function()
    {
        var username = document.getElementById("username").value;  
        var password = document.getElementById("password").value; 
        
        console.log("---username---:", username);
        console.log("---password---:", password);

        if( username == "alessandro.puccio@accenture.com" && password == "demo@123" )
        {
            window.location.href = '/AccentureBIPlatform';
        }
        else
        {
            alert("Please enter valid Username and Password");
        }
    }
});
