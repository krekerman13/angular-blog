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
            let deffered = $q.defer();

            requestService.makeRequest(urls.registration, 'post', undefined, userData)
                .then(() => authUser(userData))
                .catch((err) => deffered.reject(err.status));

            return deffered.promise;
        }

        function authUser(userData) {
            let deffered = $q.defer();

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
                        deffered.resolve();
                    })
                .catch((err) => {
                    deffered.reject(err);
                    pendingService.pending = false;
                });

            return deffered.promise;
        }

        function logout() {
            let headers = {
                'Token': getProfileData().token
            };

            requestService.makeRequest(urls.logout, 'post', headers)
                .then(() => {
                        removeProfileData();
                        _self.authData.authorization = false;
                    }
                )
                .catch((err) => console.log(err));
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


