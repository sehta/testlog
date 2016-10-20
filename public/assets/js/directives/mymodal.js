/* ============================================================
 * Directive: pgPortlet
 * AngularJS directive for Pages Portlets jQuery plugin
 * ============================================================ */

angular.module('app')
    .directive('mymodal', function () {
        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attrs, controller) {

                scope.dismiss = function () {
                    element.modal('hide');
                };

            }
        }
    }
    );