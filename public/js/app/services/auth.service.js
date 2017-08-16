(function () {
    "use strict";

    angular
        .module('auth')

        .service('authService', authService);


    function authService($http, $q, $state, localStorageService, urls) {
        var _self = this;

        _self.authData = {
            authorization: isAuth(),
            email: getProfileData() ? getProfileData().email : '',
        };

        _self.registerUser = registerUser;
        _self.authUser = authUser;
        _self.logout = logout;
        _self.checkEmail = checkEmail;

        _self.setProfileData = setProfileData;
        _self.getProfileData = getProfileData;
        _self.removeProfileData = removeProfileData;

        return _self;

        function isAuth() {
            return getProfileData() ? true : false;
        }

        function registerUser(email, password) {
            var deffered = $q.defer();
            $http
                .post(urls.registration, {
                    email: email,
                    password: password
                })
                .then(function (res) {
                    deffered.resolve(authUser(email, password));

                }, function (err) {
                    deffered.reject(err.status);
                });

            return deffered.promise;
        };

        function authUser(email, password) {
            var deffered = $q.defer();
            console.log(urls)
            $http
                .post(urls.signIn, {
                    email: email,
                    password: password
                })
                .then(function (res) {
                    var data = {
                        token: res.data.token,
                        email: res.config.data.email
                    }
                    setProfileData(data);
                    _self.authData.email = data.email;
                    _self.authData.authorization = true;
                    $state.go('main');
                    deffered.resolve();
                }, function (err) {
                    deffered.reject(err);
                });

            return deffered.promise;
        }

        function logout() {
            $http
                .post(urls.logout, {}, {
                    headers: {
                        'Token': getProfileData().token
                    }
                })
                .then(function (res) {
                        removeProfileData();
                        _self.authData.authorization = false;
                    },
                    function (err) {
                        console.log(err);
                    })
        }

        function checkEmail(email) {
            var deffered = $q.defer();
            $http
                .get(urls.checkEmail + email)
                .then(function (resp) {
                    deffered.resolve();
                })
                .catch(function (err) {
                    if (err.status != 406) {
                        deffered.resolve(err.status);
                    } else {
                        deffered.reject();
                    }
                });

            return deffered.promise;
        }

        function setProfileData(data) {
            return localStorageService.set('blogData', data);
        }

        function getProfileData() {
            return localStorageService.get('blogData') ? localStorageService.get('blogData') : false;
        }

        function removeProfileData() {
            return localStorageService.remove('blogData');
        }

    }
})();


