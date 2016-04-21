'use strict'

var bookServices = angular.module('bookServices', ['ngResource']);

bookServices.factory('BookInfo', ['$http', '$resource', function ($http, $resource) {
    var service = {};

    var newService = $resource(server+ 'book/:id');

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

        //return newService.query();

        /*var request = "?offset=" + offset + "&limit=" + limit;
        var promise = $http.get(getPath('index') + request); //promise
        return promise;*/
    };

    //adding book
    service.addBook = function (Book) {
        return $http.post(getPath('save'), JSON.stringify(Book));
    };

    //updating book
    service.updateBook = function (Book) {
        return $http.put(getPath('update', Book.id), JSON.stringify(Book));
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


