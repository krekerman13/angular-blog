describe('modalComponent', ()=> {
    "use strict";
    let $ctrl,
        $scope,
        $compile,
        element,
        title,
        ok,
        cancel,
        reject,
        resolve;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));

    beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$httpBackend_) => {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        element = angular.element('<modal></modal>');
        element = $compile(element)($scope);
        $scope.$digest();
        $ctrl = element.controller('modal');


        _$httpBackend_.expectGET('//localhost:3000/api/blog/').respond(200, '');
        _$httpBackend_.flush();
    }));

    afterEach(()=> element.remove());

    it('all func and objects should be defined', ()=> {
        element = angular.element('<modal></modal>');
        element = $compile(element)($scope);
        $scope.$digest();
        $ctrl = element.controller('modal');

        expect($ctrl.title).toBeDefined();
        expect($ctrl.ok).toBeDefined();
        expect($ctrl.cancel).toBeDefined();
        expect($ctrl.custom).toBeDefined();
        expect($ctrl.isOpen).toBeDefined();
        expect($ctrl.resolve).toBeDefined();
        expect($ctrl.reject).toBeDefined();
        expect($ctrl.close).toBeDefined();
        expect($ctrl.closeWithCancel).toBeDefined();
    });

    it('bindigns should equals to attr value', ()=> {
        element = angular.element('<modal title="\'sss\'" ok="\'sad\'" cancel="\'cancel\'"></modal>');
        element = $compile(element)($scope);
        $scope.$digest();
        $ctrl = element.controller('modal');

        expect($ctrl.title).toBe('sss');
        expect($ctrl.ok).toBe('sad');
        expect($ctrl.cancel).toBe('cancel');
        expect($ctrl.custom).toBe(false);
    });

    it('if attrs values is empty, bindings should have default values', ()=> {
        expect($ctrl.title).toBe('Please, confirm your action');
        expect($ctrl.ok).toBe('Ok');
        expect($ctrl.cancel).toBe(false);
        expect($ctrl.custom).toBe(false);
    });

    it('resolve and reject function should execute', ()=> {
        $ctrl.resolve = ()=> true;
        $ctrl.reject = ()=> false;

        expect($ctrl.close()).toBe(true);
        expect($ctrl.closeWithCancel()).toBe(false);
    });

    it('after click on "ok" button, should execute close function; after "cancel" - closeWithCancel', ()=> {
        $ctrl.cancel = true;
        $scope.$digest;

        spyOn($ctrl, 'close');
        spyOn($ctrl, 'closeWithCancel');

        expect($ctrl.close.calls.count()).toBe(0);
        expect($ctrl.closeWithCancel.calls.count()).toBe(0);

        element.find('button.modal-ok').click();
        element.find('button.modal-cancel').click();

        expect($ctrl.close.calls.count()).toBe(1);
        expect($ctrl.closeWithCancel.calls.count()).toBe(1);
    });
});
