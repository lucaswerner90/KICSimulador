app.config(['$locationProvider','$stateProvider','$urlRouterProvider',
	function($locationProvider,$stateProvider,$urlRouterProvider){
	// Elimina el # de la URL
	// $locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
	      url: "/",
    		templateUrl:"templates/main.html",
        controller:"mainController"
	    });
}])
