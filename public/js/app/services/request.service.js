(function () {
    'use strict';

    angular
        .module('blog')
        .service('requestService', requestService);

    function requestService($http, $q) {

        const _self = this;

        _self.makeRequest = makeRequest;

        return _self;

        function makeRequest(url, method = 'get', headers = '', data = '') {
            let deffered = $q.defer();

            let options = {
                url: url,
                method: method,
                headers: headers,
                data: data,
            };

            $http(options)
                .then(
                    (resp) => deffered.resolve(resp),
                    (err) => deffered.reject(err)
                );

            return deffered.promise;
        }
    }
}());
