(function () {
    angular
        .module('blog')
        .component('addDialog', {
            controller: addDialogController,
            templateUrl: './js/app/add-dialog/add-dialog.tmpl.html',
            bindings: {
                posts: '='
            },
            require: {
                parent: '^modal'
            },
        })

    function addDialogController($scope, blogService, pendingService) {
        'use strict';

        const $ctrl = this;
        $ctrl.addPost = addPost;
        $ctrl.close = close;
        $ctrl.pendingService = pendingService;

        console.log($ctrl.parent);

        $ctrl.$onInit = () => console.log($ctrl.parent.close);

        function close() {
            return $ctrl.parent.close();
        }

        function addPost() {
            let post = {
                title: $ctrl.title,
                text: $ctrl.text
            };

            blogService.addPost(post)
                .then((resp) => {
                    $ctrl.posts.push(resp.data);
                    close();
                })
                .catch((err) => console.log(err));
        }
    }
}());