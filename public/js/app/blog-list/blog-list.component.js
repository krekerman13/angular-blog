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
                blogService.addPost($ctrl.text, $ctrl.title)
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
        // blogService.getAllPosts().then(function(resp) {
        //     if(resp.status == 204) {
        //         console.log("No content");
        //     } else console.log(resp);
        // });
        //
        // console.log($ctrl.posts);
        console.log($ctrl.posts);
        $ctrl.authService = authService;
        $ctrl.status = $ctrl.authService.authData;
    }

}
