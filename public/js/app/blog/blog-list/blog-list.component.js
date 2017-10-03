(function () {
    'use strict';

    angular
        .module('blog')
        .component('blogList', {
            templateUrl: 'build/views/blog/blog-list/blog-list.tmpl.html',
            controller: blogListController,
            bindings: {
                posts: '<'
            }
        });


    function blogListController($scope, $timeout, blogService, authService) {
        const $ctrl = this;

        // $ctrl.showAddDialog = showAddDialog;
        $ctrl.$onInit = $onInit;
        $ctrl.deletePost = deletePost;
        $ctrl.getMatches = getMatches;

        $ctrl.showAddingModal = showAddingModal;
        $ctrl.hideAddingModal = hideAddingModal;
        $ctrl.showDeletingModal = showDeletingModal;
        $ctrl.hideDeletingModal = hideDeletingModal;
        $ctrl.confirmDeleting = confirmDeleting;

        $ctrl.currentPage = 1;
        $ctrl.itemsPerPage = 3;
        $ctrl.typeOfSearch = 'byTitle';
        $ctrl.pendingIndex = -1;
        $ctrl.isDeleteModalOpen = false;
        $ctrl.isAddingModalOpen = false;

        function getMatches(searchText) {
            return new Promise((resolve) => {
                $timeout(() => {
                    let posts = $ctrl.posts.filter((post) =>
                        $ctrl.typeOfSearch === 'byText'
                            ? post.text.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
                            : post.title.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
                    );
                    resolve(posts);
                }, 500);
            });
        }

        // function showAddDialog(env) {
        //     $mdDialog.show({
        //         controller: addDialogController,
        //         templateUrl: './js/app/blog/blog-list/directives/add-dialog.tmpl.html',
        //         targetEvent: env,
        //         clickOutsideToClose: true,
        //         locals: {
        //             posts: $ctrl.posts,
        //             displayPosts: $ctrl.postsDisplay
        //         }
        //
        //     });
        // }

        function $onInit() {
            $ctrl.authService = authService;
            $ctrl.status = $ctrl.authService.authData;
        }

        function deletePost(id, $index) {
            $ctrl.pendingIndex = $index;
            blogService.removePost(id)
                .then(() => {
                    _.remove($ctrl.posts, {'id': id});
                    $ctrl.pendingIndex = -1;
                    $timeout(hideDeletingModal, 100);
                })
                .catch((err)=> {
                    $ctrl.pendingIndex = -1;
                    $timeout(hideDeletingModal, 100);
                    console.log(err);
                });
        }

        function showDeletingModal(id, $index) {
            $ctrl.id = id;
            $ctrl.$index = $index;
            $ctrl.isDeleteModalOpen = true;
        }

        function hideDeletingModal() {
            $ctrl.pendingIndex = -1;
            $ctrl.isDeleteModalOpen = false;
        }

        function confirmDeleting() {
            deletePost($ctrl.id, $ctrl.$index);
        }

        function showAddingModal() {
            $ctrl.isAddingModalOpen = true;
        }

        function hideAddingModal() {
            $timeout(()=> $ctrl.isAddingModalOpen = false, 100);
        }
    }
}());
