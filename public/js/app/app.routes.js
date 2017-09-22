(function () {
    "use strict";

    angular
        .module('blog')
        .config(function ($stateProvider, $urlRouterProvider) {
            const state404 = {
                    name: '404',
                    url: '/404',
                    component: 'notFound'
                };

            $urlRouterProvider.otherwise('/');
            $stateProvider.state(state404);

        });
})();
