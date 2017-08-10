angular
    .module('blog')
    .service('blogService', blogService);

function blogService($http, $q, authService) {
    var _self = this;

    _self.getAllPosts = getAllPosts;
    _self.getPost = getPost;
    _self.addPost = addPost;
    _self.removePost = removePost;

    function getAllPosts() {
        "use strict";
        var deffered = $q.defer();
        $http.get('//localhost:3000/api/blog')
            .then(function(resp) {
                "use strict";
                deffered.resolve(resp);
            }, function (err) {
                deffered.reject(err);
            });
        return deffered.promise;
    }

    function getPost(id) {
        "use strict";
        var deffered = $q.defer();
        $http.get('//localhost:3000/api/blog/' + id)
            .then(function(resp) {
                deffered.resolve(resp);
            }, function(err) {
                deffered.reject(err)
            });

        return deffered.promise;
    }

    function addPost(title, text) {
        "use strict";
        var deffered = $q.defer();
        $http.post('//localhost:3000/api/blog',{
            title: title,
            text: text,
        }, {
            headers: {
                'Token': authService.getProfileData().token
            }
        }).then(function (resp) {
            deffered.resolve(resp);
        }, function (err) {
            deffered.reject(err);
        });
        return deffered.promise;
    }

    function removePost(id) {
        "use strict";
        var deffered = $q.defer();
        $http.delete('//localhost:3000/api/blog/'+id, {
            data: {},
            headers: {
                'Token': authService.getProfileData().token,
            }
        }).then(function (resp) {
            deffered.resolve(resp);
        }, function (err) {
            deffered.reject(err);
        });
        return deffered.promise;
    }
}