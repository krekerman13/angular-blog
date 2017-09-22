(function () {
    "use strict";
    angular
        .module('blog')
        .config(function ($stateProvider) {
            const auth = {
                name: 'auth',
                url: '/auth',
                component: 'auth',
            };

            $stateProvider.state(auth);
        });
}());