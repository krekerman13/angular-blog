(function () {
    "use strict";

    angular
        .module('blog')
        .config(function ($stateProvider, $urlRouterProvider) {
            const mainState = {
                    name: 'main',
                    url: '/',
                    component: 'blogList',
                    resolve: {
                        posts: (blogService) => blogService.getAllPosts()
                            .then((resp) => resp.status === 200
                                ? resp.data
                                : [])

                    }
                },
                auth = {
                    name: 'auth',
                    url: '/auth',
                    component: 'auth',
                },
                blogState = {
                    name: 'blogItem',
                    url: '/blog/{itemId}',
                    component: 'blogItem',
                    resolve: {
                        post: (blogService, $transition$) => blogService.getPost($transition$.params().itemId)
                            .then((resp) => resp.data)
                            .catch(() => false)

                    }
                },
                state404 = {
                    name: '404',
                    url: '/404',
                    component: 'notFound'
                };

            $urlRouterProvider.otherwise('/');
            $stateProvider.state(mainState);
            $stateProvider.state(blogState);
            $stateProvider.state(state404);
            $stateProvider.state(auth);

        });
})();
