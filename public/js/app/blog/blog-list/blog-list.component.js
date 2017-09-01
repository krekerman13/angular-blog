(function () {
    'use strict';

    angular
        .module('blog')
        .component('blogList', {
            templateUrl: './js/app/blog/blog-list/blog-list.tmpl.html',
            controller: blogListController,
            bindings: {
                posts: '<'
            }
        });


    function blogListController($q, $timeout, blogService, $mdDialog, authService) {
        const $ctrl = this;

        $ctrl.showAddDialog = showAddDialog;
        $ctrl.$onInit = $onInit;
        $ctrl.deletePost = deletePost;
        $ctrl.currentPage = 1;
        $ctrl.itemsPerPage = 3;
        $ctrl.getMatches = getMatches;
        $ctrl.typeOfSearch = 'byTitle';
        $ctrl.pendingIndex = -1;

        function getMatches(searchText) {
            let deferred = $q.defer();

            $timeout(() => {
                let posts = $ctrl.posts.filter((post) =>
                    $ctrl.typeOfSearch === 'byText'
                        ? post.text.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
                        : post.title.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
                );
                deferred.resolve(posts);
            }, 500);

            return deferred.promise;
        }

        function showAddDialog(env) {
            $mdDialog.show({
                controller: addDialogController,
                templateUrl: './js/app/blog/blog-list/directives/add-dialog.tmpl.html',
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
            let confirm = $mdDialog.confirm()
                .title('Would you like to delete this article?')
                .ok('Ok')
                .cancel('Cancel');

            $mdDialog.show(confirm)
                .then(() => {
                    $ctrl.pendingIndex = $index;
                    blogService.removePost(id)
                        .then(() => {
                            _.remove($ctrl.posts, {'id': id});
                            $ctrl.pendingIndex = -1;
                        });
                    $mdDialog.hide();
                }, () => {
                    $ctrl.pendingIndex = -1;
                    $mdDialog.hide();
                });
        }
    }
}());
