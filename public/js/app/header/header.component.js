(function () {
    "use strict";

    angular
        .module('blog')

        .component('blogHeader', {
            templateUrl: './js/app/header/header.tmpl.html',
            controller: headerController
        });

    function headerController(authService) {
        const $ctrl = this;

        $ctrl.authData = authService.authData;

        $ctrl.logout = logout;

        function logout() {
            authService.logout();
        }
    }
})();

