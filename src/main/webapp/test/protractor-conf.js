exports.config = {
    allScriptsTimeout: 110000,

    specs: [
        'e2e/*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    chromeOnly: false,

    baseUrl: 'http://localhost:8081/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 100000
    }
};
