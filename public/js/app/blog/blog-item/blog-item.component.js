(function () {
    "use strict";

    angular
        .module('blog')

        .component('blogItem', {
            templateUrl: 'build/views/blog/blog-item/blog-item.tmpl.html',
            controller: blogItemController,
            bindings: {
                post: '<',
            }
        });

    function blogItemController(blogService, $mdDialog, authService, $state) {
        const $ctrl = this;

        $ctrl.$onInit = $onInit;
        $ctrl.authService = authService;
        $ctrl.deletePost = deletePost;

        $ctrl.selectedMode = 'md-fling';
        $ctrl.selectedDirection = 'left';

        function $onInit() {
            $ctrl.isOpen = false;
            if (!$ctrl.post) {
                $state.go('404');
            }
        }

        function deletePost(id) {
            let confirm = $mdDialog.confirm()
                .title('Would you like delete this article?')
                .ok('Ok')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                blogService.removePost(id)
                    .then(
                        () => $state.go('main'),
                        () => $mdDialog.hide()
                    );
            })
        }
    }
})();
