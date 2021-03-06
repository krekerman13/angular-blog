(function () {
    "use strict";
    angular
        .module('auth', []);

    angular
        .module('blog', [
            'ui.router',
            'ngMessages',
            'LocalStorageModule',
            'angularUtils.directives.dirPagination',
            'ngMaterial',
            'auth'
        ])
        .constant('urls', (() => {
            let host = '//localhost:3000',
                urls = {
                    signIn: host + '/api/auth/signin',
                    registration: host + '/api/auth/signup',
                    checkEmail: host + '/api/auth/check/',
                    logout: host + '/api/auth/logout',
                    blog: host + '/api/blog/'
                };
            return urls;

        })())

        .run(function () {

        });
})();

