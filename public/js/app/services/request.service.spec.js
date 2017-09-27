describe('request service', () => {
    "use strict";
    let requestService;

    beforeEach(angular.mock.module('blog'));

    beforeEach(angular.mock.inject((_requestService_) =>
        requestService = _requestService_));

    it('function for making request should be defined', ()=>
        expect(requestService.makeRequest).toBeDefined());
    it('bad request', ()=>
        expect(() => requestService.makeRequest()).toThrowError());
    it('good request',() =>
        expect(()=> requestService.makeRequest('params')).not.toThrowError());
})
