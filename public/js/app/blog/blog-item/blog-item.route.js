(function () {
    "use strict";
    angular
        .module('blog')
        .config(function ($stateProvider) {
            const blogState = {
                name: 'blogItem',
                url: '/blog/{itemId}',
                component: 'blogItem',
                resolve: {
                    post: (blogService, $transition$) => blogService.getPost($transition$.params().itemId)
                        .then((resp) => resp.data)
                        .catch(() => false)
                }
            };

            $stateProvider.state(blogState);
        });
}());
