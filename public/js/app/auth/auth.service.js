(function () {
    "use strict";

    angular
        .module('auth')

        .service('authService', authService);


    function authService(requestService, $q, $state, localStorageService, urls, pendingService) {
        const _self = this;

        _self.authData = {
            authorization: isAuth(),
            email: getProfileData().email || '',
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

        function registerUser(userData) {
            return new Promise((resolve, reject) => {
                requestService.makeRequest(urls.registration, 'post', undefined, userData)
                    .then(() => {
                        _self.authUser(userData);
                        resolve();
                    })
                    .catch((err) => reject(err.status));
            })
        }

        function authUser(userData) {
            return new Promise((resolve, reject) => {
                pendingService.pending = true;
                requestService.makeRequest(urls.signIn, 'post', undefined, userData)
                    .then(
                        (res) => {
                            let data = {
                                token: res.data.token,
                                email: res.config.data.email
                            };
                            pendingService.pending = false;
                            setProfileData(data);
                            _self.authData.email = data.email;
                            _self.authData.authorization = true;
                            $state.go('main');
                            resolve();
                        })
                    .catch((err) => {
                        reject(err);
                        pendingService.pending = false;
                    });
            })
        }

        function logout() {

            return new Promise((resolve, reject) => {
                let headers = {
                    'Token': getProfileData().token
                };

                requestService.makeRequest(urls.logout, 'post', headers)
                    .then(() => {
                            _self.authData.authorization = false;
                            removeProfileData();
                            resolve();
                        }
                    )
                    .catch((err) => {
                        console.log(err);
                        reject(err);
                    });
            });
        }

        function checkEmail(email) {
            let deffered = $q.defer();

            requestService.makeRequest(urls.checkEmail + email)
                .then(() => deffered.resolve())
                .catch((err) => err.status != 406 ? deffered.resolve(err.status) : deffered.reject());

            return deffered.promise;
        }

        function setProfileData(data) {
            return localStorageService.set('blogData', data);
        }

        function getProfileData() {
            return localStorageService.get('blogData') || false;
        }

        function removeProfileData() {
            return localStorageService.remove('blogData');
        }
    }
})();


