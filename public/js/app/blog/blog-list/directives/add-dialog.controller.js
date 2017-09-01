function addDialogController($scope, $mdDialog, posts, displayPosts, blogService, pendingService) {
    'use strict';

    const $ctrl = $scope;

    $ctrl.addPost = addPost;
    $ctrl.posts = posts;
    $ctrl.postsDisplay = displayPosts;
    $ctrl.close = close;
    $ctrl.pendingService = pendingService;


    function close() {
        $mdDialog.hide();
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