describe('click on book', function () {

    var count = 0;

    beforeEach(function () {
        browser.get('/');
        var bookList = element.all(by.repeater('book in books'));
        count = bookList.count();

        /*var listOfPages = element.all(by.css('.test'));
        console.log('**********************************************************');
        console.log(listOfPages.count());
        console.log('**********************************************************');*/
    });

    beforeEach(function () {
        element(by.linkText('Добавить книгу')).click(); //make search via x-path
    });

    beforeEach(function () {
        var name = element(by.model('form.name'));
        var author = element(by.model('form.author'));
        var description = element(by.model('form.description'));
        var pages = element(by.model('form.pages'));

        name.sendKeys('TestName');
        author.sendKeys('TestPassword');
        description.sendKeys('TestDescription');
        pages.sendKeys('33');

        element(by.buttonText('Добавить')).click();
    });


    beforeEach(function () {
        browser.get('/');
    });

    it('get list of books', function () {
        //expect(bookList.count()).toBe(count + 1);
    })
})
