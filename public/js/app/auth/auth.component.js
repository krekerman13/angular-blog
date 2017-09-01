(function () {
    "use strict";
    angular
        .module('auth')

        .component('auth', {
            templateUrl: './js/app/auth/auth.tmpl.html',
            controller: authController,
        });

    function authController(authService, $mdDialog, pendingService) {
        const $ctrl = this;

        $ctrl.login = login;
        $ctrl.logout = logout;
        $ctrl.registration = registration;
        $ctrl.authMessage = '';
        $ctrl.regMessage = '';
        $ctrl.pendingService = pendingService;

        function login() {
            authService.authUser($ctrl.formData.authForm)
                .catch((err) => {
                    $ctrl.authMessage = err.data.message;
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Authentication Error')
                            .textContent($ctrl.authMessage)
                            .ok('Ok')
                    );
                });
        }

        function logout() {
            authService.logout();
        }

        function registration() {
            authService.registerUser($ctrl.formData.registrationForm);
        }
    }
})();
