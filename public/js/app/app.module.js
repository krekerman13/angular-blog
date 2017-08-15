/**
 * Created by krek on 01.08.17.
 */
angular
    .module('auth', []);

var app = angular
            .module('blog', ['ui.router', 'ngMessages', 'LocalStorageModule', 'angularUtils.directives.dirPagination', 'ngMaterial', 'auth'])
            .run(function () {

            })

