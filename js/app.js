var app = angular.module('app', []);

app.config(function ($locationProvider, $routeProvider) {
    $routeProvider.when("/", {templateUrl:"partials/home.html"});

    $routeProvider.when("/:state", {
        templateUrl:"partials/ranking.html",
        controller :function ($scope, $routeParams, rankings) {
            $scope.img = $routeParams.state + ".jpg";
            $scope.rankings = rankings;
        },
        resolve    :{
            rankings:function ($q, $route, $timeout) {
                var deferred = $q.defer();

                var state = $route.current.params.state;

                var successCb = function (result) {
                    if (angular.equals(result, [])) {
                        deferred.reject("No state found by that name");
                    }
                    else {
                        deferred.resolve(result);
                    }
                };
                //the timeout is only to simulate an ajax call
                $timeout(function () {
                    
                    var dataNY = [   
                                { "name" : "Bethpage (Black), Farmingdale",  
                                  "rank" : 1 },
                                { "name" : "Atunyote at Turning Stone, Verona",  
                                  "rank" : 2 },
                                { "name" : "Shenendoah at Turning Stone, Verona",  
                                  "rank" : 3},
                                { "name" : "Leatherstocking, Cooperstown",  
                                  "rank" : 4 },
                                { "name" : "Ravenwood, Victor",  
                                  "rank" : 5 }
                              ];  
                     var dataNJ = [   
                                { "name" : "Atlantic City Country Club, Northfield",  
                                  "rank" : 1 },
                                { "name" : "Neshanic Valley (Ridge/Lake), Neshanic Station",  
                                  "rank" : 2 },
                                { "name" : "Ballamor, Egg Harbor Township",  
                                  "rank" : 3},
                                { "name" : "Architects, Phillipsburg",  
                                  "rank" : 4 },
                                { "name" : "Ballyowen at Crystal Springs, Hamburg",  
                                  "rank" : 5 }
                              ];      
                     switch (state)
								{
								case 'ny':
								  successCb(dataNY);
								  break;
								case 'nj':
								  successCb(dataNJ);
								  break;
								default:
								  successCb([]);
								} 
                       
                }, 2000);

                return deferred.promise;
            }
        }

    });
});

function AppCtrl($scope, $rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $scope.alertType = "";
        $scope.alertMessage = "Loading...";
        $scope.active = "progress-striped active progress-warning";
    });
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        $scope.alertType = "alert-success";
        $scope.alertMessage = "Successfully changed routes :)";
        $scope.active = "progress-success";

        $scope.newLocation = $location.path();
    });
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
        alert("ROUTE CHANGE ERROR: " + rejection);
        $scope.alertType = "alert-error";
        $scope.alertMessage = "Failed to change routes :(";
        $scope.active = "";
    });

    $scope.alertType = "alert-info";
    $scope.alertMessage = "Welcome to the resolve demo";

    $scope.tabs = [
        {
            title:"Home",
            url  :"#/"
        },
        {
            title:"New York",
            url  :"#/ny"
        },
        {
            title:"New Jersey",
            url  :"#/nj"
        }
    ];

    $scope.checkActive = function (url) {
        if (url == "#" + $scope.newLocation) {
            return "active";
        } else {
            return "";
        }
    };


}
