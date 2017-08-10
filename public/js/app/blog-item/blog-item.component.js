angular
    .module('blog')

    .component('blogItem', {
        templateUrl: './js/app/blog-item/blog-item.tmpl.html',
        controller: blogItemController,
        bindings: {
            post: '<',
        }
    });

function blogItemController($scope, blogService, authService, $state) {
    "use strict";
    var $ctrl = this;

    $ctrl.$onInit = $onInit;
    $ctrl.authService = authService;
    $ctrl.deletePost = deletePost;


    function $onInit() {
        // $ctrl.post = post;
        console.log($ctrl.post);
    }

    function deletePost(id) {
        blogService.removePost(id)
            .then($state.go('main'));
    }
}
