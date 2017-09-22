(function () {
    'use strict';

    angular
        .module('blog')
        .component('modal', {
            templateUrl: './js/app/modals/modals.tmpl.html',
            controller: modalController,
            transclude: true,
            bindings: {
                title: '<',
                ok: '<',
                cancel: '<',
                custom: '<',
                reject: '<',
                resolve: '<',
            }
        });

    function modalController() {
        const $ctrl = this;

        $ctrl.isOpen = true;
        $ctrl.close = close;
        $ctrl.closeWithCancel = cancel;


        function close() {
            $ctrl.isOpen = false;
            return $ctrl.resolve();
        }

        function cancel() {
            $ctrl.isOpen = false;
            return $ctrl.reject();
        }
    }
}());

