'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('LoginCtrl', ['$scope', '$http', '$state', '$timeout', 'clientId', function ($scope, $http, $state, $timeout, clientId) {

        $scope.login = {};
        $scope.loggedInUser = null;      
        if (clientId.value != '') {           
            $state.go('app.hrdashboard');
        }
            
           // $state.go('app.dashboard');
        
         //  $state.go('app.forms.settings');


        $scope.getlogin = function () {
            console.log($scope.login);
            var logininfo = { 'username': $scope.login.username.$modeValue, 'password': $scope.login.password.$modeValue };
            $.post('/login', logininfo, function (data, status, xhr) {
                alert("Updated user status");
            });
        };
             

        $http.get("/api/getLoggedInUser")
                         .success(function (data) {

                             if (data) {
                                 $scope.loggedInUser = data;
                                 console.log("User is logged in.", data);                                
                                 clientId.value = data;                                  
                                // $state.go('app.hrdashboard');
                                 if (data.adminStatus == true) {
                                     $state.go('app.admindashboard');
                                 }
                                 else if (data.role[0] == "HR") {
                                     if (!data.isRegistered) {
                                         $state.go('app.settings');
                                     }
                                     $state.go('app.hrdashboard');
                                 }
                                 else if (data.role[0] == "User") {
                                     if (!data.isRegistered) {
                                         $state.go('app.settings');
                                     }
                                     $state.go('app.dashboard');
                                 }
                              

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

        $scope.refreshTest = function (portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function () {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }


    }]);