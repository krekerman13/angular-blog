angular
    .module('blog')
    .component('blogList', {
        templateUrl: './js/app/blog-list/blog-list.tmpl.html',
        controller: blogListController,
        bindings: {
            posts: '<'
        }
    });


function blogListController($scope, $q, $timeout, blogService, $mdDialog, authService, $state) {
    var $ctrl = this;

    $ctrl.showAddDialog = showAddDialog;
    $ctrl.$onInit = $onInit;
    $ctrl.deletePost = deletePost;
    $ctrl.currentPage = 1;
    $ctrl.itemsPerPage = 3;
    $ctrl.getMatches = getMatches;
    $ctrl.typeOfSearch = 'byTitle';


    function getMatches(searchText) {
        "use strict";
        var deferred = $q.defer();

        $timeout(function () {
            var posts = $ctrl.posts.filter(function (post) {
                return $ctrl.typeOfSearch === 'byText' ? post.text.toUpperCase().indexOf(searchText.toUpperCase()) !== -1 : post.title.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
            });
            deferred.resolve(posts);
        }, 1500);

        return deferred.promise;
    }

    function showAddDialog(env) {
        "use strict";
        $mdDialog.show({
            controller: addDialogController,
            templateUrl: './js/app/blog-list/directives/add-dialog.tmpl.html',
            targetEvent: env,
            clickOutsideToClose: true,
            locals: {
                posts: $ctrl.posts,
                displayPosts: $ctrl.postsDisplay
            }

        }).then(function (result) {
            console.log(result);
        });

        function addDialogController($scope, $mdDialog, posts, displayPosts) {
            var $ctrl = $scope;

            $ctrl.close = close;
            $ctrl.addPost = addPost;
            $ctrl.posts = posts;
            $ctrl.postsDisplay = displayPosts;

            function close() {
                "use strict";
                $mdDialog.hide();
            }

            function addPost() {
                blogService.addPost($ctrl.title, $ctrl.text)
                    .then(function (resp) {
                        $ctrl.posts.push(resp.data);
                        close();
                    }).catch(function (err) {
                    console.log(err);
                });
            }
        }
    }

    function $onInit() {
        "use strict";
        $ctrl.authService = authService;
        $ctrl.status = $ctrl.authService.authData;
    }

    function deletePost(id, $index, currentPage, pageSize) {
        "use strict";
        var confirm = $mdDialog.confirm()
                .title('Would you like to delete this article?')
                .ok('Ok')
                .cancel('Cancel');


        $mdDialog.show(confirm).then(function () {
            blogService.removePost(id);
            _.remove($ctrl.posts, {'id': id});
            $mdDialog.hide();


        }, function () {
            $mdDialog.hide();
        });
    };

}
