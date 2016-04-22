'use strict'

var bookServices = angular.module('bookServices', ['ngResource']);

bookServices.factory('BookInfo', ['$resource', function ($resource) {
    return $resource(server + 'books/:id', null, {
        query: {
            isArray: false,
            timeout: 35
        },
        update: {
            method: 'PUT'
        }
    });
}]);

bookServices.factory('Auth', ['$http', function ($http) {
    var service = {};

    service.isAuth = function () {
        return $http.get(server + 'book?offset=1&limit=1').then(
            result => {
                return true;
            },
            result => {
                return false;
            }
        );
    }

    service.auth = function (data) {
        return $http.post(IdP,
            JSON.stringify(data)
        ).then(
            result => {
                return true;
            },
            error => {
                return false;
            }
        );
    }

    return service;
}]);


