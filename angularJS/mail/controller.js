var aMailServices = angular.module('AMail', []);

// *** ROUTING ***
function emailRouteConfig($routeProvider) {
	$routeProvider.
	when('/', {
		controller: ListController,
		templateUrl: 'list.html'
	}).
	when('/view/:id', {
		controller: DetailController,
		templateUrl: 'detail.html'
	}).
	when('/newmail', {
		controller: NewMailController,
		templateUrl: 'newmail.html'
	}).
	otherwise({
		redirectTo: '/'
	});
}

aMailServices.config(emailRouteConfig);

// *** CONTROLLERS ***
function ListController($scope,$http) {
	console.log("ListController");
	
	$scope.orderProp='sender';
		
	$scope.sort = function(item) {
		return item[$scope.orderProp];
	}
	
	$scope.orderby = function(s) {
		if ($scope.orderProp == s)
			$scope.orderProp='-'+s;
		else if ($scope.orderProp == '-'+s)
			$scope.orderProp=s;
		else	
			$scope.orderProp=s;
	}
	
	$scope.messages =  [];
	$http.get('data/list.json').then(
	function(data, status, headers, config) {
		$scope.messages = data.data;
		console.dir($scope.messages);
	},
	function () {
		alert("Problemi nel download");
	});
	
}
// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams, $http) {
	$http.get('data/'+$routeParams.id+'.json').then(
	function(data, status, headers, config) {
		$scope.message = data.data;
	},
	function () {
		alert("Problemi nel download");
	});
}

function NewMailController($scope,CheckSyntax) {
	
	$scope.newMail = function () {
		// inviare la mail
		$scope.message="Email inviata a " + $scope.newmail.to + " ..." + CheckSyntax.chars($scope.newmail.text);
	}
	
}