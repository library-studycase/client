describe('My test', function () {
        beforeEach(module('bookControllers'));
        beforeEach(module('bookServices'));

        it('checks range function', inject(function ($controller, BookInfo) {
            var scope = {};
            var locationProvider = {};

            var ctrl = $controller('BookListCtrl', {
                $scope: scope,
                $locationProvider: locationProvider,
                'BookInfo': BookInfo
            });
            result = scope.range(1, 2, 3)
            expect(result.length).toBe(1);

            result = scope.range(1, 2, 1);
            expect(result.length).toBe(2);

            result = scope.range(1, 3, 1)
            expect(result.length).toBe(3);

            result = scope.range(2, 5, 1)
            expect(result.length).toBe(4);
        }));


        it('gets list of books', inject(function ($httpBackend, BookInfo) {
            $httpBackend.expectGET(server + 'book?offset=1&limit=10').respond('200');
            BookInfo.getBooks(1, 10);
            $httpBackend.flush();

            /*respond – {function([status,] data[, headers, statusText]) | function(function(method, url, data, headers)} – The respond method takes a set of static data to be returned or a function that can return an array containing response status (number), response data (string), response headers (Object), and the text for the status (string).
             You're doing the second option, passing a function that returns an array. Here's what should work. Status text is the 4th item. (For clarity, I included the optional function parameters.)

             $httpBackend
             .expectGET('/example/url')
             .respond(function (method, url, data, headers) {
             return [409, 'response body', {}, 'TestPhrase'];
             });*/
        }));


        it('should get first book if exists', inject(function ($httpBackend, BookInfo) {
            var bookId = 1;
            var Book = {
                id: bookId
            }
            $httpBackend.expectGET(server + 'book/' + bookId).respond('200');
            BookInfo.getBook(Book);
            $httpBackend.flush();
        }));


        it('should try get book which doesn\'t exist', inject(function ($httpBackend, BookInfo) {
            var bookId = 998;
            var Book = {
                id: bookId
            }
            $httpBackend.expectGET(server + 'book/' + bookId).respond('500', {data: 'value'});
            BookInfo.getBook(Book);
            $httpBackend.flush();
        }));


    }
)
