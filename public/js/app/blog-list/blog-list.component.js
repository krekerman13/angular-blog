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
    $ctrl.currentPage = 1;
    $ctrl.itemsPerPage = 3;

    console.log($scope);

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
        console.log($ctrl.posts);
    }

    function deletePost(id, $index, currentPage, pageSize) {
        "use strict";

        var absoluteIndex = ($index + 1) + (currentPage - 1 ) * pageSize,
            confirm = $mdDialog.confirm()
                .title('Would you like to delete this article?')
                .ok('Ok')
                .cancel('Cancel');


        $mdDialog.show(confirm).then(function () {
            blogService.removePost(id);
            console.log(absoluteIndex);
            $ctrl.posts.splice(absoluteIndex, 1);
            $mdDialog.hide();
        }, function () {
            $mdDialog.hide();
        });
    };

}
