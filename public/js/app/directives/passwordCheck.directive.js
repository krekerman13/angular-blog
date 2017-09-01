(function() {
    "use strict";

    angular
        .module('auth')
        .directive('pwdCheck', () => {
            return {
                require: 'ngModel',
                restrict: 'A',
                scope: {
                    passwordValue: '=pwdCheck'
                },
                link: link
            };

            function link (scope, element, attrs, ngModel) {
                ngModel.$validators.pwdCheck = pwdCheck;
                scope.$watch('passwordValue', watch);

                function pwdCheck(modelValue) {
                    return modelValue === scope.passwordValue;
                }

                function watch() {
                    ngModel.$validate();
                }
            }

        })
})();