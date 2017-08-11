angular
    .module('auth')

    .component('auth', {
        templateUrl: './js/app/auth/auth.tmpl.html',
        controller: authController,
    });

function authController(authService, $mdDialog) {
    var $ctrl = this;

    $ctrl.$onInit = onInit;
    $ctrl.login = login;
    $ctrl.logout = logout;
    $ctrl.registration = registration;
    $ctrl.authMessage = '';
    $ctrl.regMessage = '';
    $ctrl.pending = false;


    console.log($ctrl);

    function onInit() {
        "use strict";
    }

    function login() {
        "use strict";
        var email = $ctrl.formData.authForm.email ? $ctrl.formData.authForm.email: '',
            password = $ctrl.formData.authForm.password;

        $ctrl.pending = true;
        authService.authUser(email, password)
            .then(function() {
                $ctrl.pending = false;
            })
            .catch(function (err) {
                $ctrl.authMessage = err.data.message;
                $ctrl.pending = false;
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
        "use strict";
        authService.logout();
    }

    function registration() {
        "use strict";
        var email = $ctrl.formData.registrationForm.email,
            password = $ctrl.formData.registrationForm.password;

        (authService.registerUser(email, password));
    }
}
