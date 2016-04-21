'use strict'

var bookServices = angular.module('bookServices', ['ngResource']);


/**
 * - AN по умолчанию сериализует запрос, поэтому можно не делать стрингифай?????
 * - Автоматически происходить populate. не надо писать обработчики
 *
 */
bookServices.factory('BookInfo', ['$http', '$resource', function ($http, $resource) {
    var service = {};

    var resource = $resource(server+ 'books/:id', null, {
        query : {
            isArray: false
        },
        update : {
            method: 'PUT'
        }
    });

    service.getBooks = function (offset, limit) {
        return resource.query({offset: offset, limit : limit}).$promise.then(function(data) {
            return data;
        });
    };

    //adding book
    service.addBook = function (Book) {
        return resource.save({}, Book).$promise.then(function(data) {return data;});
    };

    //updating book
    service.updateBook = function (Book) {
        return resource.update({'id' : Book.id}, Book).$promise.then(function(data) {
            return data;
        });
    }

    //removing book
    service.removeBook = function (Book) {
        return resource.remove({id: Book.id}).$promise.then(function(data) {
            return data;
        })
    }

    service.getBook = function (Book) {
        return resource.get({'id' : Book.id}).$promise.then(function(data) {
            return data;
        })
    }

    return service
}]);

