angular
    .module('blog')

    .component('blogItem', {
        templateUrl: './js/app/blog-item/blog-item.tmpl.html',
        controller: blogItemController,
        bindings: {
            post: '<',
        }
    });

function blogItemController($scope, blogService, $mdDialog, authService, $state) {
    "use strict";
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.authService = authService;
    $ctrl.deletePost = deletePost;

    this.selectedMode = 'md-fling';
    this.selectedDirection = 'left';

    function $onInit() {
        console.log($ctrl.post);
        console.log($ctrl.authService);
        $ctrl.isOpen = false;
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
