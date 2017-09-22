(function () {
    "use strict";
    angular
        .module('blog')
        .config(function ($stateProvider) {
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
                };

            $stateProvider.state(mainState);
        });
}());