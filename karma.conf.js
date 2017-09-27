// Karma configuration
// Generated on Sat Sep 23 2017 16:22:36 GMT+0300 (EEST)

module.exports = function (config) {
    config.set({

        preprocessors: {
            'public/build/views/**/*.html': ['ng-html2js']
        },

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'public/build/js/vendor.min.js',
            'public/bower_components/angular-mocks/angular-mocks.js',
            'public/build/views/**/*.html',
            'public/build/js/app.min.js',
            'public/js/app/**/*.spec.js'
        ],

        ngHtml2JsPreprocessor: {


            // or define a custom transform function
            // - cacheId returned is used to load template
            //   module(cacheId) will return template at filepath
            cacheIdFromPath: function (filepath) {
                console.log(filepath);
                // // example strips 'public/' from anywhere in the path
                // // module(app/templates/template.html) => app/public/templates/template.html
                var cacheId = filepath.replace('public/', '');
                return cacheId;
            },

            // - setting this option will create only a single module that contains templates
            //   from all the files, so you can load them all with module('foo')
            // - you may provide a function(htmlPath, originalPath) instead of a string
            //   if you'd like to generate modules dynamically
            //   htmlPath is a originalPath stripped and/or prepended
            //   with all provided suffixes and prefixes
            moduleName: 'templates'
        },

        // list of files to exclude
        exclude: [],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
