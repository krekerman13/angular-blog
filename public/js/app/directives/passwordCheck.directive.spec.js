describe('checkPasswordDirective', ()=> {
    "use strict";
    let $scope,
        element,
        form;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_$rootScope_, _$compile_, _$httpBackend_) => {
        $scope = _$rootScope_.$new();
        let template =
            '<form name="form">'+
            '<input '+
                'type="password"'+
                'ng-model="password"'+
                'name="password"'+
                'placeholder="password"'+
                'required=""/>'+
            '<input '+
                'type="password"'+
                'ng-model="confirmPassword"'+
                'name="confirmPassword"'+
                'pwd-check="password"'+
                'placeholder="Repeat password"'+
                'required=""/>'+
            '</form>';


        element = angular.element(template);
        element = _$compile_(element)($scope);
        $scope.$digest();
        form = $scope.form;

        _$httpBackend_.expectGET('//localhost:3000/api/blog/').respond(200, '');
        _$httpBackend_.flush();
    }));

    it('valid if passwords are equals', ()=> {
        form.password.$setViewValue(12345678);
        form.confirmPassword.$setViewValue(12345678);
        expect(form.confirmPassword.$valid).toBe(true);
    });

    it('invalid if passwords are not equals', ()=> {
        form.password.$setViewValue(12345678);
        form.confirmPassword.$setViewValue(123456);
        expect(form.confirmPassword.$valid).toBe(false);
    });
})
