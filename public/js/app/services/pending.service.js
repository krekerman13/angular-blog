(function () {
  'use strict';

    angular
        .module('blog')
        .service('pendingService', function () {
            const _self = this;

            _self.pending = false;

            return _self;
        })
}());