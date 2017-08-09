angular
    .module('blog')
    .config(function($stateProvider, $urlRouterProvider) {
        let mainState = {
                name: 'main',
                url: '/',
                component: 'blogList',
                resolve: {
                    posts: function (blogService) {
                        return blogService.getAllPosts()
                            .then(function (resp) {
                                if (resp.status === 200) {
                                    return resp.data;
                                } else {
                                    return [];
                                }
                            });
                    }
                }
            },
            auth = {
                name: 'auth',
                url: '/auth',
                component: 'auth',
            },
            // blogState = {
            //     name: 'blog',
            //     url: '/blog/{itemId}',
            //     component: 'blogItem',
            //     resolve: {
            //         post: function(BlogService, $transition$) {
            //             console.log($transition$.params().itemId);
            //             return BlogService.getPost($transition$.params().itemId);
            //         }
            //     }
            // },
            state404 = {
                name: '404',
                url: '/404',
                templateUrl: '/404.html'
            };

        $urlRouterProvider.otherwise('/');
        $stateProvider.state(mainState);
        // $stateProvider.state(blogState);
        $stateProvider.state(state404);
        $stateProvider.state(auth);

    })