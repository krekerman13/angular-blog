angular
    .module('auth')

    .component('auth', {
        templateUrl: './js/app/auth/auth.tmpl.html',
        controller: authController,
    });

function authController($scope, authService, $state) {
    var $ctrl = this;

    $ctrl.$onInit = onInit;
    $ctrl.login = login;
    $ctrl.logout = logout;
    $ctrl.registration = registration;
    $ctrl.authMessage = '';
    $ctrl.regMessage = '';

    console.log($ctrl);

    function onInit() {
        "use strict";
        console.log(authService.status);
    }

    function login() {
        "use strict";
        var email = $ctrl.formData.authForm.email,
            password = $ctrl.formData.authForm.password;

        authService.authUser(email, password)
            .then(function() {
                $state.go('main');
            })
            .catch(function (err) {
                $ctrl.authMessage = err.data.message;
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

        console.log(authService.registerUser(email, password));
    }
}
