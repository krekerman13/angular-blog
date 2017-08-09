angular
    .module('blog')
    .component('blogList', {
        templateUrl: './js/app/blog-list/blog-list.tmpl.html',
        controller: blogListController,
        bindings: {
            posts: '<'
        }
    });


function blogListController($scope, blogService, $mdDialog, authService, $state) {
    var $ctrl = this;


    $ctrl.showAddDialog = showAddDialog;
    $ctrl.$onInit = $onInit;
    $ctrl.deletePost = deletePost;


    function showAddDialog(env) {
        "use strict";
        $mdDialog.show({
            controller: addDialogController,
            templateUrl: './js/app/blog-list/directives/add-dialog.tmpl.html',
            targetEvent: env,
            clickOutsideToClose: true,
            locals: {
                posts: $ctrl.posts
            }

        }).then(function (result) {
            console.log(result);
        })

        function addDialogController($scope, $mdDialog, posts) {
            var $ctrl = $scope;
            $ctrl.close = close;
            $ctrl.addPost = addPost;
            $ctrl.posts = posts;

            function close() {
                "use strict";
                $mdDialog.hide();
            }

            function addPost() {
                blogService.addPost($ctrl.title, $ctrl.text)
                    .then(function (resp) {
                        console.log(resp);
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

    function deletePost(id, $index) {
        "use strict";
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete this article?')
            .ok('Ok')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            blogService.removePost(id);
            $ctrl.posts.splice($index, 1);
            $mdDialog.hide();
        }, function() {
            $mdDialog.hide();
        });
    };

}
