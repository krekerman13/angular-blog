describe('authService', ()=> {
    "use strict";
    let urls,
        $scope,
        $state,
        authService,
        requestService,
        pendingService,
        mockData = {
            data: {
                token: '121'
            },
            config: {
                data: {
                    email: 'test'
                }
            }
        },
        mockNewData = {
            data: {
                email: 'asdsad@sad.com',
                password: 'sadsadsad'
            }
        },
        mockError = {
            status: '333',
        };


    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach((angular.mock.inject((_urls_, _authService_, _requestService_, _pendingService_, _$rootScope_, _$state_) => {
        urls = _urls_;
        authService = _authService_;
        requestService = _requestService_;
        pendingService = _pendingService_;
        $scope = _$rootScope_.$new();
        $state = _$state_
    })));


    describe('requests with resolve()', ()=> {
        beforeEach(()=> {
            spyOn(requestService, 'makeRequest').and.callFake((url, method)=> new Promise((resolve)=> {
                if (url === urls.signIn) resolve(mockData);
                resolve('');
            }));
        });

        it('authUser', ()=> {
            spyOn(authService, 'authUser').and.callThrough();
            spyOn($state, 'go');
            let promise = authService.authUser(mockData);
            expect(pendingService.pending).toBe(true);
            promise.then(()=> {
                expect(authService.authUser.calls.count()).toBe(1);
                expect(pendingService.pending).toBe(false);
                expect(authService.authData.email).toBe(mockData.config.data.email);
                expect(authService.authData.authorization).toBe(true);
                expect($state.go.calls.count()).toBe(1);
            });
        });
        it('register user', ()=> {
            spyOn(authService, 'authUser');
            expect(authService.authUser.calls.count()).toBe(0);
            authService.registerUser(mockNewData).then(()=> {
                expect(authService.authUser.calls.count()).toBe(1);
                expect(authService.authUser).toHaveBeenCalledWith(mockNewData);
            });
        });
        it('logout', ()=> {
            authService.authData.authorization = true;
            authService.logout().then(()=> {
                expect(authService.authData.authorization).toBe(false);
            });
        });

    });
    describe('request with catch()', ()=> {
        beforeEach(()=> {
            spyOn(requestService, 'makeRequest').and.callFake((url, method)=> new Promise((resolve, reject)=> {
                reject(mockError)
            }));
        });

        it('authUser', ()=> {
            spyOn(authService, 'authUser').and.callThrough();
            let promise = authService.authUser(mockData);
            expect(pendingService.pending).toBe(true);
            promise.catch((err)=> {
                expect(pendingService.pending).toBe(false);
                expect(err).toBe(mockError);
            });
        });
        it('registerUser', ()=> {
            authService.registerUser(mockNewData).catch((err)=> {
                expect(err).toBe(mockError.status);
            });
        });
        it('logout', ()=> {
            authService.logout().catch((err)=> {
                expect(err).toBe(mockError);
            });
        })
    });
});
