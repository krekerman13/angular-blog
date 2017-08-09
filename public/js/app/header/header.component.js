angular
    .module('blog')

    .component('blogHeader', {
        templateUrl: './js/app/header/header.tmpl.html',
        controller: headerController
    });

function headerController($scope, authService) {
    let $ctrl = this;
    $ctrl.authService = authService;
    $ctrl.authData = $ctrl.authService.authData;

    $ctrl.logout = logout;


    // $scope.$watch('$ctrl.status.authorization', checkAuth);
    //
    // function checkAuth(newValue, oldValue, scope) {
    //     "use strict";
    //     if (newValue) {
    //         $ctrl.email = authService.getProfileData().email;
    //     }
    // }

    function logout () {
        "use strict";
        authService.logout();
    }
}

