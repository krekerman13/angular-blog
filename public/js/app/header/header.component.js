(function () {
    "use strict";

    angular
        .module('blog')

        .component('blogHeader', {
            templateUrl: './js/app/header/header.tmpl.html',
            controller: headerController
        });

    function headerController(authService) {
        var $ctrl = this;
        $ctrl.authService = authService;
        $ctrl.authData = $ctrl.authService.authData;

        $ctrl.logout = logout;

        function logout() {
            "use strict";
            authService.logout();
        }
    }
})();

