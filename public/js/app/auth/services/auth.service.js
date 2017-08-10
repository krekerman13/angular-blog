angular
    .module('auth')

    .service('authService', authService);


function authService($http, $q, $state, localStorageService) {
    "use strict";
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
            .post("//localhost:3000/api/auth/signup", {
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
        "use strict";
        var deffered = $q.defer();
        $http
            .post("//localhost:3000/api/auth/signin", {
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
        "use strict";
        $http
            .post("http://localhost:3000/api/auth/logout", {}, {
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
            .get('//localhost:3000/api/auth/check/' + email)
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
        return localStorageService.get('blogData');
    }

    function removeProfileData() {
        return localStorageService.remove('blogData');
    }

}


