(function () {
    "use strict";

    angular
        .module('blog')
        .service('blogService', blogService);

    function blogService($q, authService, urls, requestService, $state, pendingService) {
        const _self = this;

        _self.getAllPosts = getAllPosts;
        _self.getPost = getPost;
        _self.addPost = addPost;
        _self.removePost = removePost;

        function getAllPosts() {
            "use strict";
            let deffered = $q.defer();

            requestService.makeRequest(urls.blog)
                .then((resp) => deffered.resolve(resp))
                .catch((err) => deffered.reject(err));

            return deffered.promise;
        }

        function getPost(id) {
            "use strict";
            let deffered = $q.defer();

            requestService.makeRequest(urls.blog + id)
                .then((resp) => deffered.resolve(resp))
                .catch((err) => $state.go('404'));

            return deffered.promise;
        }

        function addPost(post) {
            "use strict";
            let deffered = $q.defer(),
                headers = {
                    'Token': authService.getProfileData().token,
                };

            pendingService.pending = true;

            requestService.makeRequest(urls.blog, 'post', headers, post)
                .then((resp) => {
                    pendingService.pending = false;
                    deffered.resolve(resp)
                })
                .catch((err) => {
                    pendingService.pending = false;
                    deffered.reject(err)
                });

            return deffered.promise;
        }

        function removePost(id) {
            "use strict";
            let deffered = $q.defer(),
                headers = {
                'Token': authService.getProfileData().token,
            };

            requestService.makeRequest(urls.blog + id, 'delete', headers)
                .then((resp) => deffered.resolve(resp))
                .catch((err) => deffered.reject(err));

            return deffered.promise;
        }
    }
})();