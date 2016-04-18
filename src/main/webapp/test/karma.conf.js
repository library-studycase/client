module.exports = function(config){
    config.set({

        basePath : '../',

        files : [
            'assets/bower_components/angular/angular.js',
            'assets/bower_components/angular-route/angular-route.js',
            'assets/bower_components/angular-mocks/angular-mocks.js',
            'assets/bower_components/angular-cookies/angular-cookies.js',
            'assets/bower_components/angular-resource/angular-resource.js',
            //'assets/js/*.js',
            'assets/js/**/*.js',
            'test/unit/**/*.js'
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome', 'Firefox'],
        //browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};