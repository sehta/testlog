'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('HeaderCtrl', ['$scope', '$http', '$state', '$timeout', 'clientId', function ($scope, $http, $state, $timeout, clientId) {

        $scope.login = {};
        $scope.loggedInUser = null;
       
        $http.get("/api/getLoggedInUser")
                         .success(function (data) {

                             if (data) {
                                 $scope.loggedInUser = data;
                                 console.log("User is logged in.", data);
                                 clientId.value = data;  
                             }
                             else
                                 console.log("User is not logged in.");

                         })
                         .error(function (data) {
                             console.log("Error:" + data);
                         });

        $scope.isRole = function (id) {
            return $scope.loggedInUser.role.indexOf(id) > -1;
        }

        


    }]);