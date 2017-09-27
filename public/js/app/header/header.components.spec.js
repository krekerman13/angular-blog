describe('headerComponent', () => {
    let $ctrl,
        $scope,
        authService,
        element;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));

    beforeEach(angular.mock.inject((_authService_,_blogService_, _$rootScope_, _$compile_, _$httpBackend_) => {
        $scope = _$rootScope_.$new();
        element = angular.element('<blog-header></blog-header>');
        element = _$compile_(element)($scope);
        authService = _authService_;
        $scope.$digest();
        $ctrl = element.controller('blogHeader');

        _$httpBackend_.expectGET('//localhost:3000/api/blog/').respond(200, '');
        _$httpBackend_.flush();
    }));

    it('all functions and objects should be defined', ()=> {
        expect($ctrl.authData).toBeDefined();
        expect($ctrl.logout).toBeDefined();
    });

    it('if user is authorized, his email should be display, if not - should not', ()=> {
        expect(element.find('.email').length).toBe(0);
        expect(element.find('.signin span').text()).toBe('Sign in');

        $ctrl.authData.authorization = true;
        $ctrl.authData.email = 'test';
        $scope.$digest();

        expect(element.find('.signin span').length).toBe(0);
        expect(element.find('.email').text()).toBe('test');
    });

    it('click on logout', ()=> {
        $ctrl.authData.authorization = true;
        $ctrl.authData.email = 'test';
        $scope.$digest();

        spyOn($ctrl, 'logout');
        expect($ctrl.logout.calls.count()).toBe(0);
        element.find('.logout').click();
        expect($ctrl.logout.calls.count()).toBe(1);
    })
});
