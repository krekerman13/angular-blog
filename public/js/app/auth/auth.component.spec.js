describe('authComponent', ()=> {
    "use strict";
    let $scope,
        element,
        authService,
        requestService,
        pendingService,
        $ctrl;

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$httpBackend_, _authService_, _requestService_, _pendingService_) => {
        authService = _authService_;
        requestService = _requestService_;
        pendingService = _pendingService_;
        $scope = _$rootScope_.$new();
        element = angular.element('<auth></auth>');
        element = _$compile_(element)($scope);
        $scope.$digest();
        $ctrl = element.controller('auth');
    }));

    it('all objects and funcs should be defined', ()=> {
        expect($ctrl.login).toBeDefined();
        expect($ctrl.logout).toBeDefined();
        expect($ctrl.registration).toBeDefined();
        expect($ctrl.authMessage).toBeDefined();
        expect($ctrl.regMessage).toBeDefined();
        expect($ctrl.pendingService).toBeDefined();
        expect($ctrl.isErrorModalOpen).toBeDefined();
        expect($ctrl.registrationForm).toBeDefined();
        expect($ctrl.showErrorModal).toBeDefined();
        expect($ctrl.hideErrorModal).toBeDefined();
    });

    it('register function should work correct', ()=> {
        let mockData = {
            email: 'test@test.test',
            password: 'qqqqqqqq',
            confirmPassword: 'qqqqqqqq'
        };
        spyOn(authService, 'registerUser');
        $ctrl.registrationForm.email.$setViewValue(mockData.email);
        $ctrl.registrationForm.password.$setViewValue(mockData.password);
        $ctrl.registrationForm.confirmPassword.$setViewValue(mockData.confirmPassword);
        $scope.$digest();
        element.find('.signUp').click();
        expect(authService.registerUser.calls.count()).toBe(1);
        expect(authService.registerUser).toHaveBeenCalledWith(mockData);
    });

    describe('validation registration form', ()=> {
        describe('email field validation should be correct', () => {
            it('email has incorrect format', ()=> {
                let email = $ctrl.registrationForm.email;
                expect(email.$pristine).toBe(true);
                email.$setViewValue('test');
                expect(email.$pristine).toBe(false);
                expect(email.$valid).toBe(false);
                expect(email.$error).toEqual({email: true});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.email.$error"] > div.my-message').text()).toBe('Invalid email format');
            });
            it('email has correct format', ()=> {
                let email = $ctrl.registrationForm.email;
                expect(email.$pristine).toBe(true);
                email.$setViewValue('test@test.com');
                expect(email.$pristine).toBe(false);
                expect(email.$valid).toBe(true);
                expect(email.$error).toEqual({});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.email.$error"] > div.my-message').length).toBe(0);
            });
            it('email field should be required', ()=> {
                let email = $ctrl.registrationForm.email;
                expect(email.$pristine).toBe(true);
                email.$pristine = false;
                expect(email.$valid).toBe(false);
                expect(email.$error).toEqual({required: true});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.email.$error"] > div.my-message').text()).toBe('You must supply a email');
            });
            it('email already exist', (done)=> {
                spyOn(authService, 'checkEmail').and.callFake((email)=> {
                    return new Promise((resolve, reject) => {
                        if (email === mockEmail) reject();
                    });
                });
                let mockEmail = 'mock@email.com';
                let email = $ctrl.registrationForm.email;
                expect(email.$pristine).toBe(true);

                email.$setViewValue('mock@email.com');
                expect(authService.checkEmail).toHaveBeenCalledWith('mock@email.com');

                setTimeout(()=> {
                    expect(email.$valid).toBe(false);
                    expect(email.$error).toEqual({emailExist: true});
                    done();
                }, 1000);
            });
        });
        describe('password validation should be correct', () => {
            it('too short', ()=> {
                let password = $ctrl.registrationForm.password;
                expect(password.$pristine).toBe(true);
                password.$setViewValue('sad21');
                expect(password.$valid).toBe(false);
                expect(password.$error).toEqual({minlength: true});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.password.$error"] > div.my-message').text()).toBe('Too short');
            });
            it('password is correct', ()=> {
                let password = $ctrl.registrationForm.password;
                expect(password.$pristine).toBe(true);
                password.$setViewValue('asdsadasd');
                expect(password.$valid).toBe(true);
                expect(password.$error).toEqual({});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.password.$error"] > div.my-message').length).toBe(0);
            });
            it('password in confirm field is different, that password in password field', ()=> {
                let password = $ctrl.registrationForm.password,
                    confirmPassword = $ctrl.registrationForm.confirmPassword;
                expect(password.$pristine).toBe(true);
                expect(confirmPassword.$pristine).toBe(true);
                password.$setViewValue('asdsadasd');
                confirmPassword.$setViewValue('aasadsadsd');
                expect(password.$valid).toBe(true);
                expect(password.$error).toEqual({});
                expect(confirmPassword.$valid).toBe(false);
                expect(confirmPassword.$error).toEqual({pwdCheck: true});
                expect(element.find('div [ng-messages="$ctrl.registrationForm.confirmPassword.$error"] > div.my-message').text()).toBe('Your passwords are differents');
            })
        });
        describe('sign up button should be disabled while form invalid, and enable while valid', ()=> {
            it('enable', ()=> {
                $ctrl.registrationForm.$valid = true;
                $scope.$digest();
                expect(element.find('.signUp')[0].disabled).toBe(false);
            });
            it('disable', ()=> {
                $ctrl.registrationForm.$valid = false;
                $scope.$digest();
                expect(element.find('.signUp')[0].disabled).toBe(true);
            });
        });
        describe('all fields should be disable, while send reguest', ()=> {
            it('inputs should be disable, when pending = true',()=> {
                let inputs = element.find('form[name="$ctrl.registrationForm"] input');
                pendingService.pending = true;
                $scope.$digest();
                for(let i = 0; i < inputs.length; i++) {
                    expect(inputs[i].disabled).toBe(true);
                }
            });
            it('inputs should be enable, when pending = false', ()=> {
                let inputs = element.find('form[name="$ctrl.registrationForm"] input');
                pendingService.pending = false;
                $scope.$digest();
                for(let i = 0; i < inputs.length; i++) {
                    expect(inputs[i].disabled).toBe(false);
                }
            })
        });
    });

    describe('validation authorization form', ()=> {
        describe('email field validation should be correct', ()=> {
            it('email has incorrect format', ()=> {
                let email = $ctrl.authorizationForm.email;
                expect(email.$pristine).toBe(true);
                email.$setViewValue('test');
                expect(email.$pristine).toBe(false);
                expect(email.$valid).toBe(false);
                expect(email.$error).toEqual({email: true});
                expect(element.find('div [ng-messages="$ctrl.authorizationForm.email.$error"] > div.my-message').text()).toBe('Invalid email format');
            })
        })
    })

});
