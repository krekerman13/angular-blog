(function () {
    "use strict";

    angular
        .module('blog')
        .service('blogService', blogService);

    function blogService(authService, urls, requestService, $state, pendingService) {
        const _self = this;

        _self.getAllPosts = getAllPosts;
        _self.getPost = getPost;
        _self.addPost = addPost;
        _self.removePost = removePost;

        function getAllPosts() {
            return new Promise((resolve, reject) => {
                requestService.makeRequest(urls.blog)
                    .then((resp) => resolve(resp))
                    .catch((err) => reject(err));
            })


        }

        function getPost(id) {
            return new Promise((resolve)=> {
                requestService.makeRequest(urls.blog + id)
                    .then((resp) => resolve(resp))
                    .catch((err) => $state.go('404'));
            });
        }

        function addPost(post) {
            return new Promise((resolve, reject)=> {
               let headers = {
                   'Token': authService.getProfileData().token,
               };
                pendingService.pending = true;
                requestService.makeRequest(urls.blog, 'post', headers, post)
                    .then((resp) => {
                        pendingService.pending = false;
                        resolve(resp)
                    })
                    .catch((err) => {
                        pendingService.pending = false;
                        reject(err)
                    });
            });
        }

        function removePost(id) {
            // let deffered = $q.defer(),
            //     headers = {
            //         'Token': authService.getProfileData().token,
            //     };
            //
            // requestService.makeRequest(urls.blog + id, 'delete', headers)
            //     .then((resp) => deffered.resolve(resp))
            //     .catch((err) => deffered.reject(err));
            //
            // return deffered.promise;

            return new Promise((resolve, reject) => {
                let headers = {
                    'Token': authService.getProfileData().token,
                };

                requestService.makeRequest(urls.blog + id, 'delete', headers)
                    .then((resp) => resolve(resp))
                    .catch((err) => reject(err));
            })
        }
    }
})();
