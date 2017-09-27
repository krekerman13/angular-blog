(function () {
    'use strict';

    angular
        .module('blog')
        .component('modal', {
            templateUrl: 'build/views/modals/modals.tmpl.html',
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

        $ctrl.$onInit = $onInit;

        $ctrl.isOpen = true;
        $ctrl.close = close;
        $ctrl.closeWithCancel = cancel;

        function $onInit() {
            $ctrl.title = $ctrl.title || 'Please, confirm your action';
            $ctrl.ok = $ctrl.ok || 'Ok';
            $ctrl.cancel = $ctrl.cancel || false;
            $ctrl.custom = $ctrl.custom || false;
            $ctrl.reject = $ctrl.reject || false;
            $ctrl.resolve = $ctrl.resolve || true;
        }

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

