angular
    .module('auth')
    .directive('checkEmail', function ($http, $q) {
        "use strict";
        return {
            require: 'ngModel',
            restrict: 'A',
            link: link
        }

        function link(scope, elem, attrs, ngModel) {
            ngModel.$asyncValidators.emailExist = emailExist;


            function emailExist(modelValue, viewValue) {
                return $http.get('//localhost:3000/api/auth/check/' + viewValue)
                    .then(function (response) {
                        if (response.data.status == 200) {
                            return true;
                        } else {
                            $q.reject(response.data.status);
                        }
                    });
            }
        }
    })