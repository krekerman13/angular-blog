(function () {
    "use strict";
    angular
        .module('blog')

        .component('auth', {
            templateUrl: 'build/views/auth/auth.tmpl.html',
            controller: authController,
        });

    function authController(authService, pendingService, $timeout) {
        const $ctrl = this;

        $ctrl.login = login;
        $ctrl.logout = logout;
        $ctrl.registration = registration;
        $ctrl.authMessage = '';
        $ctrl.regMessage = '';
        $ctrl.pendingService = pendingService;
        $ctrl.isErrorModalOpen = false;
        $ctrl.showErrorModal = showErrorModal;
        $ctrl.hideErrorModal = hideErrorModal;

        function login() {
            authService.authUser($ctrl.formData.authForm)
                .catch((err) => {
                    $ctrl.authMessage = err.data.message;
                    // $mdDialog.show(
                    //     $mdDialog.alert()
                    //         .clickOutsideToClose(true)
                    //         .title('Authentication Error')
                    //         .textContent($ctrl.authMessage)
                    //         .ok('Ok')
                    // );
                    $timeout($ctrl.showErrorModal, 100);
                });
        }

        function logout() {
            authService.logout();
        }

        function registration() {
            authService.registerUser($ctrl.formData.registrationForm);
        }

        function showErrorModal() {
            $ctrl.isErrorModalOpen = true
        }

        function hideErrorModal() {
            $ctrl.isErrorModalOpen = false;
        }
    }
})();
