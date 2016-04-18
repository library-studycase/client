'use strict'

var bookServices = angular.module('bookServices', ['ngResource']);

bookServices.service('BookInfo', ['$http', function ($http) {
    var service = {};


    var getPath = function (query, bookId) {
        bookId = (bookId == undefined) ? null : bookId;

        var endpoints = {
            'index': server + 'book', //GET, getting list of books
            'save': server + 'book', //POST, creating new book
            'show': server + `book/${bookId}`, //GET, getting info about a book
            'update': server + `book/${bookId}`, //PUT, updating info about a book
            'delete': server + `book/${bookId}` //DELETE, removing a book
        };
        return endpoints[query];
    }

    //getting list of books
    service.getBooks = function (offset, limit) {
        var request = "?offset=" + offset + "&limit=" + limit;
        return $http.get(getPath('index') + request); //promise
    };

    //adding book
    service.addBook = function (Book) {
        return $http.post(getPath('save'), JSON.stringify(Book));
    };

    //updating book
    service.updateBook = function (Book) {
        return $http.put(getPath('update', Book.id), transformRequest(Book),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
    }

    //removing book
    service.removeBook = function (Book) {
        return $http.delete(getPath('delete', Book.id));
    }

    service.getBook = function (Book) {
        return $http.get(getPath('show', Book.id));
    }

    return service
}]);


/*{
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}*/


