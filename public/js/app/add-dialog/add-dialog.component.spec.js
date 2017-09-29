describe('addDialogComponent', ()=> {
    "use strict";
    let element,
        $ctrl,
        $scope,
        blogService,
        pendingService,
        newPost = {
            data: {
                title: 'sadasd',
                text: 'asdasd'
            }

        },
        mockPosts = [
            {
                id: '1',
                title: 'sss',
                text: 'sss',
                created: 111
            },
            {
                id: '2',
                title: 'qqq',
                text: 'www',
                created: 222
            },
            {
                id: '3',
                title: 'aaa',
                text: 'aaa',
                created: 3333
            },
        ];

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_$rootScope_, _$compile_, _blogService_, _pendingService_)=> {
        $scope = _$rootScope_.$new();
        element = angular.element('<modal><add-dialog posts="mockPosts"></add-dialog></modal>');
        element = _$compile_(element)($scope);
        blogService = _blogService_;
        pendingService = _pendingService_;
        $scope.$digest();
        $ctrl = element.find('add-dialog').controller('addDialog');
        $ctrl.posts = mockPosts;
        $scope.$digest();
    }));

    it('all objects and funcs should be defined', ()=> {
        expect($ctrl.addPost).toBeDefined();
        expect($ctrl.close).toBeDefined();
        expect($ctrl.pendingService).toBeDefined();
    });

    describe('validation of adding form should work correct', ()=> {
        it('title length should be greater then 2', ()=> {
            let title = $ctrl.addPostForm.title;
            expect(title.$pristine).toBe(true);
            title.$setViewValue('ss');
            expect(title.$pristine).toBe(false);
            expect(title.$error).toEqual({minlength: true});
            expect(element.find('div [ng-messages="$ctrl.addPostForm.title.$error"] .my-message').text()).toBe('Too short');
            title.$setViewValue('sss');
            expect(title.$error).toEqual({});
            expect(element.find('div [ng-messages="$ctrl.addPostForm.title.$error"] .my-message').text()).toBe('');
        });
        it('title should be required', ()=> {
            let title = $ctrl.addPostForm.title;
            expect(title.$pristine).toBe(true);
            title.$pristine = false;
            expect(title.$error).toEqual({required: true});
            expect(element.find('div [ng-messages="$ctrl.addPostForm.title.$error"] .my-message').text()).toBe('Title is required');
        });
        it('text should be required', ()=> {
            let text = $ctrl.addPostForm.text;
            expect(text.$pristine).toBe(true);
            text.$pristine = false;
            expect(text.$error).toEqual({required: true});
            expect(element.find('div [ng-messages="$ctrl.addPostForm.title.$error"] .my-message').text()).toBe('Title is required');
        });
        it('create  button should be disabled, while form is invalid', ()=> {
            let form = $ctrl.addPostForm;
            form.$valid = false;
            $scope.$digest();
            expect(element.find('.createPost')[0].disabled).toBe(true);
            form.$valid = true;
            $scope.$digest();
        });
        it('create  button should be enabled, while form is valid', ()=> {
            let form = $ctrl.addPostForm;
            form.$valid = true;
            $scope.$digest();
            expect(element.find('.createPost')[0].disabled).toBe(false);
        });
        it('post should be created, after click on create button', ()=> {
            spyOn(blogService, 'addPost').and.callFake(() => {
                return new Promise((resolve)=> {
                    resolve(newPost);
                })
            });
            $ctrl.parent.resolve = ()=> true;
            expect($ctrl.posts.length).toBe(3);
            element.find('.createPost').click();
            $scope.$digest();
            expect(blogService.addPost.calls.count()).toBe(1);

            setTimeout(()=> {
                expect($ctrl.posts.length).toBe(4);
                expect($ctrl.posts[3]).toEqual(newPost.data);
            }, 100)
        });
    })

});
