var testApp = angular.module('testApp', ['bookFilters']);

testApp.controller('BookListCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.books = [
        {
            'id': 1,
            'name': 'Tainstvennyj ostrov',
            'author': 'ZHyul\' Vern',
            'pages': 566
        },
        {
            'id': 0,
            'name': '',
            'author': 'Bozhestvennaya komediya',
            'pages': 257
        },
        {
            'id': 2,
            'name': 'Otec Gorio',
            'author': 'Otec Gorio',
            'pages': 138
        }
    ];

    $http.get('http://vk.com').success(function(data) {
        console.log(data);
    });

    $scope.hello = function() {
        alert('Hello world');
    }
}]);


angular.module('bookFilters', []).filter('checkmark', function() {
    return function(input) {
        return (input == '257') ? 'x' : 'y';
    };
});