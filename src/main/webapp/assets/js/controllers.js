'use strict'

//Controllers
var bookControllers = angular.module('bookControllers', []);

bookControllers.controller('BookListCtrl', ['$scope', '$location', 'BookInfo', function ($scope, $locationProvider, BookInfo) {
    console.log('started "BookListCtrl" controller');
    var getParams = $locationProvider.search();
    var offset = (getParams.offset != undefined) ? getParams.offset : 1;

    BookInfo.query({offset: offset, limit: limit}).$promise.then(
        function (data) {
            $scope.books = data.books;
            var total = data.total;
            //--
            $scope.pages = Math.ceil(total / limit);
            $scope.activePage = Math.floor(offset / limit) + 1;
        },
        function (err) {
            if (err.status == 401) {
                alert('Authorization error');
                $locationProvider.path('/login');
            } else {
                alert('Server error. Cannot get list of books.');
            }
        }
    );

    $scope.go = function (path) {
        $locationProvider.search({}); //cleans get params from address bar
        $locationProvider.path(path);
    };

    $scope.edit = function (bookId) {
        $locationProvider.path('/books/' + bookId);
    }

    $scope.range = function (min, max, step) {
        if (max <= 1) return [];

        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.showPage = function (numberOfPage) {
        var offset = limit * (numberOfPage - 1) + 1;
        var params = {
            'offset': offset
        };
        $locationProvider.path('/').search(params);
    }
}]);

bookControllers.controller('BookAddCtrl', ['$scope', '$location', 'BookInfo', function ($scope, $locationProvider, BookInfo) {
    console.log('started "BookAddCtrl" controller');

    $scope.submit = function () {
        console.log('submitting form of adding a book');

        var Book = $scope.form;
        BookInfo.save(Book).$promise.then(
            function (data) {
                $locationProvider.path('/');
            },
            function (err) {
                if (err.status == 401) {
                    alert('Authorization error');
                    $locationProvider.path('/login');
                } else {
                    alert('Error. The book hasn\'t been added');
                }

            }
        );
    }
}]);


bookControllers.controller('BookEditCtrl', ['$scope', '$location', '$routeParams', 'BookInfo', function ($scope, $locationProvider, $routeParams, BookInfo) {
    console.log('started "BookEditCtrl" controller');

    var Book = {
        id: $routeParams.bookId
    }

    BookInfo.get(Book).$promise.then(
        function (data) {
            $scope.book = data;
        },
        function (err) {
            if (err.status == 401) {
                alert('Authorization error');
                $locationProvider.path('/login');
            } else {
                alert('Cannot get information about a book. Try to refresh the page.');
            }
        }
    );

    $scope.update = function () {
        console.log('update');
        var Book = $scope.book;
        var resource = BookInfo.update({id: Book.id}, Book);
        resource.$promise.then(
            function (data) {
                $locationProvider.path('/');
            }
        ).catch(function (err) {
            if (err.status == 401) {
                alert('Authorization error');
                $locationProvider.path('/login');
            } else {
                alert('Error. The book hasn\'t been edited');
            }
        });
    }

    $scope.remove = function () {
        var Book = $scope.book;
        var resource = BookInfo.remove({id: Book.id}).$promise;
        resource.then(
            function (data) {
                $locationProvider.search({}); //cleans get params from address bar
                $locationProvider.path('/');
            },
            function (err) {
                if (err.status == 401) {
                    alert('Authorization error');
                    $locationProvider.path('/login');
                } else {
                    alert('Error. The book hasn\'t been removed.');
                }
            }
        );
    }
}]);

bookControllers.controller('LoginCtrl', ['$scope', '$location', '$routeParams', '$http', 'Auth', function ($scope, $locationProvider, $routeParams, $http, Auth) {
    console.log('started "LoginCtrl" controller');

    Auth.isAuth().then(function (isAuth) {
        if (isAuth) {
            $locationProvider.path('/');
        }
    })

    $scope.submit = function () {
        Auth.auth($scope.form).then(function (isAuth) {
            if (isAuth) {
                alert('Successful authorization');
                $locationProvider.path('/');
            } else {
                alert('Authorization error');
            }
        })
    }
}]);