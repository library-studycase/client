var app = angular.module('myApp', ['ngRoute', 'bookControllers', 'ngCookies', 'bookServices']);
var server = 'http://spbnb-prc789:8080/';
var root = '/';

app.config(['$routeProvider', '$locationProvider', '$httpProvider',
    //$locationProvider.html5Mode(true);
    function ($routeProvider, $locationProvider, $httpProvider) {
        console.log('Star configuration');

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        //It needs for the same session with many gets
        $httpProvider.defaults.withCredentials = true;

        $routeProvider.when(root, {
                templateUrl: root + 'partials/main.html',
                controller: 'BookListCtrl'
            }
        ).when('/test', {
            templateUrl: root + 'partials/test.html',
            controller: ''
        }
        ).when('/add', {
            templateUrl: root + 'partials/add.html',
            controller: 'BookAddCtrl'
        })
        .when('/books/:bookId', {
                templateUrl: root + 'partials/edit.html',
                controller: 'BookEditCtrl'
            }
        ).otherwise({
            redirectTo: root
        });
    }
]);
/*.run(['$http', '$cookies', function ($http, $cookies) {
 $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
 }]);*/

transformRequest = function (obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}