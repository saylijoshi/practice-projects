//var app = angular.module('angularjs_with_Nodejs',[]);
//


(function() {
    var root;

    root = typeof exports !== "undefined" && exports !== null ? exports : this;



    root.app = angular.module("angularjs_with_Nodejs", [ 'ui', 'ui.bootstrap', 'ui.directives', 'ui.compat', 'ngCookies','ui.select2','uiHandsontable']).config([

        "$stateProvider", "$routeProvider", "$urlRouterProvider", "$locationProvider",  '$provide', function($stateProvider, $routeProvider, $urlRouterProvider, $locationProvider, fileUploadProvider, RestangularProvider, $provide) {


        }
    ]).run(function($rootScope, $state, $routeParams, $route, $http) {
        $rootScope.$state = $state;
        $rootScope.$route = $route;
        return $rootScope.$routeParams = $routeParams;
    });


}).call(this);
