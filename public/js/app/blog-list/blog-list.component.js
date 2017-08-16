(function () {
    'use strict';

    angular
        .module('blog')
        .component('blogList', {
            templateUrl: './js/app/blog-list/blog-list.tmpl.html',
            controller: blogListController,
            bindings: {
                posts: '<'
            }
        });


    function blogListController($q, $timeout, blogService, $mdDialog, authService) {
        var $ctrl = this;

        $ctrl.showAddDialog = showAddDialog;
        $ctrl.$onInit = $onInit;
        $ctrl.deletePost = deletePost;
        $ctrl.currentPage = 1;
        $ctrl.itemsPerPage = 3;
        $ctrl.getMatches = getMatches;
        $ctrl.typeOfSearch = 'byTitle';
        $ctrl.pending = false;


        function getMatches(searchText) {
            var deferred = $q.defer();

            $timeout(function () {
                var posts = $ctrl.posts.filter(function (post) {
                    return $ctrl.typeOfSearch === 'byText' ? post.text.toUpperCase().indexOf(searchText.toUpperCase()) !== -1 : post.title.toUpperCase().indexOf(searchText.toUpperCase()) !== -1;
                });
                deferred.resolve(posts);
            }, 500);

            return deferred.promise;
        }

        function showAddDialog(env) {
            $mdDialog.show({
                controller: addDialogController,
                templateUrl: './js/app/blog-list/directives/add-dialog.tmpl.html',
                targetEvent: env,
                clickOutsideToClose: true,
                locals: {
                    posts: $ctrl.posts,
                    displayPosts: $ctrl.postsDisplay
                }

            });
        }

        function $onInit() {
            $ctrl.authService = authService;
            $ctrl.status = $ctrl.authService.authData;
        }

        function deletePost(id, $index) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this article?')
                .ok('Ok')
                .cancel('Cancel');
            console.log(this);

            $mdDialog.show(confirm).then(
                function () {
                    $ctrl.pending = $index;
                    console.log($ctrl.pending);
                    blogService.removePost(id)
                        .then(function() {
                            $ctrl.pending = false;
                            _.remove($ctrl.posts, {'id': id});
                        });
                    $mdDialog.hide();
                },
                function () {
                    $ctrl.pending = false;
                    $mdDialog.hide();
                });
        };
    }
}());
