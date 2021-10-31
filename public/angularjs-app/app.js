angular.module("MyTravels", ["ngRoute"]).config(config);

function config($routeProvider){
    $routeProvider.when("/", {
        templateUrl:"./angularjs-app/main/main.html",
         controller:"MainController", 
        controllerAs: "vm"
     }).when("/travels", {
        templateUrl:"./angularjs-app/travels-list/travels.html",
        controller:"TravelsController", 
        controllerAs: "vm"
    }).when("/travels/:travelId", {
        templateUrl:"./angularjs-app/travel-one/travel.html",
        controller:"TravelController", 
        controllerAs: "vm"
    })
    .when("/travels/:travelId/hotels", {
        templateUrl:"./angularjs-app/hotel-list/hotels.html",
        controller:"TravelController", 
        controllerAs: "vm"
    })
    .when("/travels/:travelId/hotels/:hotelId", {
        templateUrl:"./angularjs-app/hotel-one/hotel.html",
        controller:"TravelController", 
        controllerAs: "vm"
    }).otherwise({redirectTo:"/"});
}