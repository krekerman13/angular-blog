function addDialogController($scope, $mdDialog, posts, displayPosts, blogService) {
    'use strict';

    var $ctrl = $scope;

    $ctrl.addPost = addPost;
    $ctrl.posts = posts;
    $ctrl.postsDisplay = displayPosts;
    $ctrl.close = close;

    function close() {
        $mdDialog.hide();
    }

    function addPost() {
        $ctrl.pending = true;
        blogService.addPost($ctrl.title, $ctrl.text)
            .then(function (resp) {
                $ctrl.posts.push(resp.data);
                $ctrl.pending = false;
                close();
            }).catch(function (err) {
            console.log(err);
        });
    }
}