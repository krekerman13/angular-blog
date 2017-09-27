/**
 * Created by krek on 25.09.17.
 */
describe('blogService', ()=> {
    "use strict";
    let urls,
        blogService,
        requestService,
        data = [
            {
                id: '1',
                title: 'post1',
                text: 'post1 text',
                created: 123213123
            },
            {
                id: '2',
                title: 'post2',
                text: 'post2 text',
                created: 123213123
            },
            {
                id: '3',
                title: 'post2',
                text: 'post2 text',
                created: 123213123
            },
            {
                id: '',
                title: '',
                text: '',
                created: ''
            }
        ],
        mocks = {
            getPostResult: data[0],
            getAllPostsResult: data,
            addPostResult: data[1],
            deletePostResult: data[3],
            id: 1,
            error: 'error',
        };

    beforeEach(angular.mock.module('blog'));
    beforeEach(module('templates'));
    beforeEach(angular.mock.inject((_urls_, _blogService_, _requestService_) => {
        urls = _urls_;
        blogService = _blogService_;
        requestService = _requestService_;
    }));

    describe('all functions should be define and call with true params', ()=> {
        it('defined', ()=> {
            expect(blogService.getAllPosts).toBeDefined()
            expect(blogService.getPost).toBeDefined();
            expect(blogService.addPost).toBeDefined();
            expect(blogService.removePost).toBeDefined();
        });

        it('trueParams', ()=> {
            spyOn(blogService, 'getPost');
            blogService.getPost(mocks.id);
            expect(blogService.getPost).toHaveBeenCalledWith(mocks.id);

            spyOn(blogService, 'addPost');
            blogService.addPost(mocks.addPostResult);
            expect(blogService.addPost).toHaveBeenCalledWith(mocks.addPostResult);

            spyOn(blogService, 'removePost');
            blogService.removePost(mocks.id);
            expect(blogService.removePost).toHaveBeenCalledWith(mocks.id);

        })
    });
    describe('successfully requests', () => {
        beforeEach(() => {
            spyOn(requestService, 'makeRequest').and.callFake((url, method = 'get') => {
                return new Promise((resolve)=> {
                    if (url === urls.blog && method === 'get') {
                        resolve(mocks.getAllPostsResult);
                    }

                    if (url === urls.blog + mocks.id && method === 'get') {
                        resolve(mocks.getPostResult);
                    }

                    if (method === 'post' && url === urls.blog) {
                        resolve(mocks.addPostResult);
                    }

                    if (method === 'delete') {
                        resolve(mocks.deletePostResult);
                    }
                });
            });
        });

        it('get all posts', ()=> {
            blogService.getAllPosts()
                .then(resp => expect(resp).toBe(mocks.getAllPostsResult));
        });

        it('get post by id', ()=> {
            blogService.getPost(mocks.id)
                .then(resp => expect(resp).toBe(mocks.getPostResult));
        });

        it('add new post', ()=> {
            blogService.addPost(mocks.addPostResult)
                .then(resp => expect(resp).toBe(mocks.addPostResult));
        });

        it('remove post', ()=> {
            blogService.removePost(mocks.id)
                .then(resp => expect(resp).toBe(mocks.deletePostResult));
        });
    });
    describe('unsuccessfully requests', () => {
        beforeEach(() => {
            spyOn(requestService, 'makeRequest').and.callFake(() => {
                return new Promise((resolve, reject) => reject(mocks.error));
            })
        });

        it('get all posts', ()=> {
            blogService.getAllPosts()
                .catch(err => expect(err).toBe(mocks.error));
        });
        it('get post', ()=> {
            blogService.getPost(mocks.id)
                .catch(err => expect(err).toBe(mocks.error));
        });
        it('add post', ()=> {
            blogService.addPost(mocks.addPostResult)
                .catch(err => expect(err).toBe(mocks.error));
        });
        it('remove post', ()=> {
            blogService.removePost(mocks.id)
                .catch(err => expect(err).toBe(mocks.error));
        })
    })


});
