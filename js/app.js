var app = angular.module('app', []);

app.config(function ($locationProvider, $routeProvider) {
	//
	// routing to home tab
	//
    $routeProvider.when("/", {templateUrl:"partials/home.html"});
    
    // 
    // routing to state page with ajax call
    //
    $routeProvider.when("/:state", {

        templateUrl:"partials/ranking.html",
        //
        // controller for state tab.
        // the rankings parameter is the 
        // data set resolved by promise
        //
        controller :function ($scope, $routeParams, rankings) {
            $scope.img = $routeParams.state + ".jpg";

            $scope.rankings = rankings;
        },
        //
        // resove property.
    	// All the view and controller will not get created 
    	// and instantiated until the promise get satisfied.
    	//
        resolve    :{
            rankings:function ($q, $route, $timeout) {
            	//
            	// use angular promise library
            	// create a deferred object
            	//
                var deferred = $q.defer();
                
                //
                // cannot using $routeParams.state, 
                // because $routeParams.state can only be resolved 
                // after the routing get changed.
                //
                var state = $route.current.params.state;

                var successCb = function (result) {
                    if (angular.equals(result, [])) {
                    	//
                    	// no data found, reject the promise
                    	//
                        deferred.reject("No state found by that name");
                    }
                    else {
                    	//
                    	// found data, resove the promise
                    	// pass resoved result to rankings propertity
                    	//
                        deferred.resolve(result);
                    }
                };
                //
                // this timeout is only to use to simulate an time consuming ajax call
                //
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
                //
            	// return a promise.
            	//
                return deferred.promise;
            }
        }

    });
});

//
// main controller
//
function AppCtrl($scope, $rootScope, $location) {
	//
	// handle the route change start event
	//
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        $scope.alertType = "";
        $scope.alertMessage = "Loading...";
        $scope.active = "progress-striped active progress-warning";
    });
    //
    // handle the route change success event
    //
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
        $scope.alertType = "alert-success";
        $scope.alertMessage = "Successfully changed routes :)";
        $scope.active = "progress-success";

        $scope.newLocation = $location.path();
    });
    //
    // handle the route chage error event
    // notice the reject reason passed as 4th parameter here
    //
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
