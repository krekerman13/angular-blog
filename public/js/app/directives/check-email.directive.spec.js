describe('checkEmailDirective', ()=> {
    "use strict";
    let $scope,
        element,
        authService;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_$rootScope_, _$compile_, _requestService_, _authService_) => {
        $scope = _$rootScope_.$new();
        authService = _authService_;

        element = angular.element('<form><input type="email" name="email" check-email="" ng-disabled="$ctrl.pendingService.pending" ng-model="$ctrl.formData.registrationForm.email" placeholder="login" required=""/></form>');
        element = _$compile_(element)($scope);
        $scope.$digest();
    }));

    it('check email', ()=> {
        // let data = {
        //     email: 'ttt',
        //     password: '11111111'
        // };
        // console.log(authService.checkEmail('ttt').then());
        // element.find('input').val('ttt');
    })
});
