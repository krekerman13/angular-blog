describe('blogListComponent', ()=> {
    "use strict";
    let $ctrl,
        $scope,
        $compile,
        $timeout,
        element,
        authService,
        posts = [
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

    beforeEach(angular.mock.inject((_$compile_, _$rootScope_, _$httpBackend_, _$timeout_, _authService_) => {
        $scope = _$rootScope_.$new();
        authService = _authService_;
        $compile = _$compile_;
        $timeout = _$timeout_;
        element = angular.element('<blog-list></blog-list>');
        element = $compile(element)($scope);
        $scope.$digest();
        $ctrl = element.controller('blogList');
        $ctrl.posts = posts;
        $ctrl.status.authorization = true;

        _$httpBackend_.expectGET('//localhost:3000/api/blog/').respond(200, '');
        _$httpBackend_.flush();

    }));

    it('all func and objects should be defined', ()=> {
        expect($ctrl.deletePost).toBeDefined();
        expect($ctrl.getMatches).toBeDefined();
        expect($ctrl.showAddingModal).toBeDefined();
        expect($ctrl.hideAddingModal).toBeDefined();
        expect($ctrl.showDeletingModal).toBeDefined();
        expect($ctrl.hideDeletingModal).toBeDefined();
        expect($ctrl.confirmDeleting).toBeDefined();
        expect($ctrl.currentPage).toBeDefined();
        expect($ctrl.itemsPerPage).toBeDefined();
        expect($ctrl.typeOfSearch).toBeDefined();
        expect($ctrl.pendingIndex).toBeDefined();
        expect($ctrl.deletePost).toBeDefined();
        expect($ctrl.isDeleteModalOpen).toBeDefined();
        expect($ctrl.isAddingModalOpen).toBeDefined();
        expect($ctrl.authService).toBeDefined();
        expect($ctrl.status).toBeDefined();
    });

    describe('getMatches function should working correct', ()=> {
        it('search by title', ()=> {
            let result = $ctrl.getMatches('ss');

            spyOn($ctrl, 'getMatches').and.callThrough();
            expect($ctrl.getMatches.calls.count()).toBe(0);
            element.find('md-autocomplete input').val('ss').trigger('input');
            expect($ctrl.getMatches.calls.count()).toBe(1);
            expect($ctrl.getMatches).toHaveBeenCalledWith('ss');

            $timeout.flush();
            $timeout.verifyNoPendingTasks();

            result.then((resp) => expect(resp[0]).toEqual(posts[0]));
        });
        it('search by text', ()=> {
            $ctrl.typeOfSearch = 'byText';
            $scope.$digest();
            let result = $ctrl.getMatches('w');

            spyOn($ctrl, 'getMatches').and.callThrough();
            expect($ctrl.getMatches.calls.count()).toBe(0);
            element.find('md-autocomplete input').val('w').trigger('input');
            expect($ctrl.getMatches.calls.count()).toBe(1);
            expect($ctrl.getMatches).toHaveBeenCalledWith('w');

            $timeout.flush();
            $timeout.verifyNoPendingTasks();

            result.then((resp) => expect(resp[0]).toEqual(posts[1]));
        })
    });
    describe('filters should working correct', ()=> {
        it('sort by created date | first new', ()=> {
            let firstPost = element.find('.md-list-item-text').first().find('h2').text();
            expect(firstPost).toBe(posts[2].title);
            $ctrl.selectedFilter = 'created';
            $scope.$digest();
        });
        it('sort by created date | first old', ()=> {
            $ctrl.selectedFilter = 'created';
            $scope.$digest();
            let firstPost = element.find('.md-list-item-text').first().find('h2').text();
            expect(firstPost).toBe(posts[0].title);
        })
    });
    describe('deleting modal should working correct', ()=> {
        beforeEach(()=> {
            spyOn($ctrl, 'showDeletingModal').and.callThrough();
            expect($ctrl.showDeletingModal.calls.count()).toBe(0);
            element.find('.deletePost').first().click();
        });
        it('modal should be show, after click on delete button', ()=> {
            expect($ctrl.showDeletingModal.calls.count()).toBe(1);
            expect($ctrl.isDeleteModalOpen).toBe(true);
        });
        it('modal should close, after cancel', ()=> {
            spyOn($ctrl, 'hideDeletingModal').and.callThrough();
            expect($ctrl.hideDeletingModal.calls.count()).toBe(0);
            $ctrl.hideDeletingModal();
            expect($ctrl.hideDeletingModal.calls.count()).toBe(1);
            expect($ctrl.isDeleteModalOpen).toBe(false);
        });
        it('function, that deleting post should work correctly', ()=> {
            spyOn($ctrl, 'deletePost').and.callFake((id) => {
                delete $ctrl.posts[id];
            });
            $ctrl.deletePost(2);
            expect($ctrl.deletePost.calls.count()).toBe(1);
            expect($ctrl.posts[2]).toBe(undefined);
        });
    });
    describe('adding modal should working correct', ()=> {
        beforeEach(()=> {
            spyOn($ctrl, 'showAddingModal').and.callThrough();
            expect($ctrl.showAddingModal.calls.count()).toBe(0);
            element.find('.addPost').first().click();
        });
        it('modal should be show, after click on add button', ()=> {
            expect($ctrl.showAddingModal.calls.count()).toBe(1);
            expect($ctrl.isAddingModalOpen).toBe(true);
        });
        it('modal should close after cancel', ()=> {
            spyOn($ctrl, 'hideAddingModal').and.callThrough();
            expect($ctrl.hideAddingModal.calls.count()).toBe(0);
            $ctrl.hideAddingModal();
            expect($ctrl.hideAddingModal.calls.count()).toBe(1);
            $timeout.flush();
            expect($ctrl.isAddingModalOpen).toBe(false);
        })
    });
    describe('buttons should display, if user authorized', ()=> {
        it('add button', ()=> {
            let button = element.find('.addPost');
            expect(button.length).not.toBe(0);
        });

        it('remove button', ()=> {
            let button = element.find('.deletePost');
            expect(button.length).not.toBe(0);
        })
    });
    describe('buttons should not display, if user not authorized', ()=> {
        beforeEach(()=> {
            $ctrl.status.authorization = false;
            $scope.$digest();
        });

        it('add button', ()=> {
            let button = element.find('.addPost');
            expect(button.length).toBe(0);
        });

        it('remove button', ()=> {
            let button = element.find('.deletePost');
            expect(button.length).toBe(0);
        })
    })
});
