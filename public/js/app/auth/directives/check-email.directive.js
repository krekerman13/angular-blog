angular
    .module('auth')
    .directive('checkEmail', function ($http, authService) {
        "use strict";
        return {
            require: 'ngModel',
            restrict: 'A',
            link: link
        }

        function link(scope, elem, attrs, ngModel) {
            ngModel.$asyncValidators.emailExist = emailExist;


            function emailExist(modelValue, viewValue) {
                return authService.checkEmail(viewValue);
            }
        }
    })