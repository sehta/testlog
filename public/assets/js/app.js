/* ============================================================
 * File: app.js
 * Configure global module dependencies. Page specific modules
 * will be loaded on demand using ocLazyLoad
 * ============================================================ */

'use strict';

var app = angular.module('app', [
    'ui.router',
    'ui.utils',
    'oc.lazyLoad',
    'datatables',
    'ngtimeago',
    'ngAnimate',
    "ngMaterial"
    
    
]);



app.value('clientId', { value: '' });
 