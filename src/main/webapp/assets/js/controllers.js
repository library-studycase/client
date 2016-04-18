'use strict'

/* Controllers */
var bookControllers = angular.module('bookControllers', []);
var limit = 5;

bookControllers.controller('BookListCtrl', ['$scope', '$location', 'BookInfo', function ($scope, $locationProvider, BookInfo) {
    console.log('started "BookListCtrl" controller');
    var getParams = $locationProvider.search();
    $scope.offset = (getParams.offset != undefined) ? getParams.offset : 1;
    $scope.limit = limit;

    var promiseGetBooks = BookInfo.getBooks($scope.offset, $scope.limit);
    promiseGetBooks.then(
        function(data) {
            //$scope.data = data.data; // {books, total}
            $scope.books = data.data.books;
            $scope.total = data.data.total;

            $scope.pages = Math.ceil($scope.total / limit);
            $scope.activePage = Math.floor($scope.offset / limit) + 1;
        }
    ); //may add addition catches and thens
;
    $scope.go = function (path) {
        $locationProvider.search({}); //cleans get params from address bar
        $locationProvider.path(path);
    };

    $scope.edit = function (bookId) {
        $locationProvider.path('/books/' + bookId);
    }

    $scope.range = function(min, max, step) {
        if (max <= 1) return [];

        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.showPage = function(numberOfPage) {
        var offset = limit * (numberOfPage - 1) + 1;
        var params = {
            'offset' : offset
        };
        $locationProvider.path('/').search(params);
    }
}]);

bookControllers.controller('BookAddCtrl', ['$scope', '$location', 'BookInfo', function ($scope, $locationProvider, BookInfo) {
    console.log('started "BookAddCtrl" controller');

    $scope.submit = function () {
        console.log('submitting form of adding a book');

        var Book = $scope.form;
        var promiseUpdateBook = BookInfo.addBook(Book);

        promiseUpdateBook.then(
            function(data) {
                $locationProvider.path('/');
            }
        );
    }
}]);


bookControllers.controller('BookEditCtrl', ['$scope', '$location', '$routeParams', 'BookInfo', function ($scope, $locationProvider, $routeParams, BookInfo) {
    console.log('started "BookEditCtrl" controller');

    var Book = {
        id : $routeParams.bookId
    }
    var promiseGetBook = BookInfo.getBook(Book);
    promiseGetBook.then(
        function(data) {
            $scope.book = data.data;
        }
    );

    $scope.save = function () {
        var Book = $scope.book;
        var promiseBookUpdate = BookInfo.updateBook(Book);
        promiseBookUpdate.then(
            function(data) {
                $locationProvider.path('/');
            }
        );
    }

    $scope.remove = function () {

        var Book = $scope.book;
        console.log(BookInfo);
        var promiseBookUpdate = BookInfo.removeBook(Book);
        promiseBookUpdate.then(
            function(data) {
                $locationProvider.search({}); //cleans get params from address bar
                $locationProvider.path('/');
            }
        );
    }
}]);