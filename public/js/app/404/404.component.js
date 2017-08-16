(function () {
    angular
        .module('blog')
        .component('notFound', {
            templateUrl: './js/app/404/404.tmpl.html',
            controller: controller
        })

    function controller() {
        console.log(this);
    }
})();