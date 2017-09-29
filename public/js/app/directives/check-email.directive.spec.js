describe('checkEmailDirective', ()=> {
    "use strict";
    let $scope,
        element,
        form,
        authService;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_$rootScope_, _$compile_, _requestService_, _authService_) => {
        $scope = _$rootScope_.$new();
        authService = _authService_;

        element = angular.element('<form name="form"><input type="email" name="email" check-email="" ng-disabled="$ctrl.pendingService.pending" ng-model="$ctrl.formData.registrationForm.email" placeholder="login" required=""/></form>');
        element = _$compile_(element)($scope);
        $scope.$digest();
        form = $scope.form;
    }));

    it('check email function should be called', ()=> {
        spyOn(authService, 'checkEmail').and.callFake(()=> new Promise((resolve) => {
            resolve();
        }));
        expect(authService.checkEmail.calls.count()).toBe(0);
        form.email.$setViewValue('asfasf@asdfsadf.com');
        expect(authService.checkEmail).toHaveBeenCalledWith('asfasf@asdfsadf.com');
        expect(authService.checkEmail.calls.count()).toBe(1);
    })
});
