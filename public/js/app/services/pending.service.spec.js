describe('pending service', () => {
    let pendingService;

    beforeEach(angular.mock.module('blog'));
    beforeEach(angular.mock.inject((_pendingService_) => pendingService = _pendingService_));

    it('pending value should be defined', ()=> {
        expect(pendingService.pending).toBeDefined();
    });

    it('pending value should be false by default', ()=> {
        "use strict";
        expect(pendingService.pending).toBe(false);
    });

    it('pending vaulue shold be true, after changing this', ()=> {
        "use strict";
        expect(pendingService.pending = true).toBe(true);
    })

});
