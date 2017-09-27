describe('blogItemComponent', ()=> {
    "use strict";
    let $scope,
        element,
        $ctrl,
        mdDialog,
        mockPost = {
            id: 1,
            text: 'ssss',
            created: 12331
        };

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));

    beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _authService_, _$mdDialog_) => {
        $scope = _$rootScope_.$new();
        element = angular.element('<blog-item></blog-item>');
        element = _$compile_(element)($scope);
        mdDialog = _$mdDialog_;
        spyOn(mdDialog, 'show');
        mdDialog.show.and.callFake(function () {
            return {
                then: function (callBack) {
                    callBack(true); //return the value to be assigned.
                }
            }
        });
        $scope.$digest();
        $ctrl = element.controller('blogItem');
        $ctrl.post = mockPost;
        $ctrl.authService.authData.authorization = true;
        $scope.$digest();
    }));

    it('all objects and funcs should be defined', ()=> {
        expect($ctrl.authService).toBeDefined();
        expect($ctrl.deletePost).toBeDefined();
        expect($ctrl.selectedMode).toBeDefined();
        expect($ctrl.selectedDirection).toBeDefined();
    });
    it('delete button should be display, only if user is authorized', ()=> {
        let elem = element.find('.deletePost');
        expect(elem.length).not.toBe(0);
    });
    it('delete button should not display, if user isn`t authorized', ()=> {
        $ctrl.authService.authData.authorization = false;
        $scope.$digest();

        let elem = element.find('.deletePost');

        expect(elem.length).toBe(0);
    });
    it('after click on delete button, should display modal window', ()=> {
        spyOn($ctrl, 'deletePost').and.callThrough();
        expect($ctrl.deletePost.calls.count()).toBe(0);
        expect(mdDialog.show.calls.count()).toBe(0);
        element.find('.deletePost').click();
        expect($ctrl.deletePost.calls.count()).toBe(1);
        expect(mdDialog.show.calls.count()).toBe(1);
    })
});
