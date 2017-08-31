(function() {
    "use strict";

    angular
        .module('blog')

        .component('blogItem', {
            templateUrl: './js/app/blog-item/blog-item.tmpl.html',
            controller: blogItemController,
            bindings: {
                post: '<',
            }
        });

    function blogItemController(blogService, $mdDialog, authService, $state) {
        var $ctrl = this;

        $ctrl.$onInit = $onInit;
        $ctrl.authService = authService;
        $ctrl.deletePost = deletePost;

        $ctrl.selectedMode = 'md-fling';
        $ctrl.selectedDirection = 'left';

        function $onInit() {
            $ctrl.isOpen = false;
            if(!$ctrl.post) {
                $state.go('404');
            }
        }

        function deletePost(id) {
            var confirm = $mdDialog.confirm()
                .title('Would you like delete this article?')
                .ok('Ok')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                blogService.removePost(id)
                    .then(function () {
                        $state.go('main');
                    }, function () {
                        $mdDialog.hide();
                    });
            })
        }
    }
})();
