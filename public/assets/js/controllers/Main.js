app.controller("MainCtrl", [
      "$scope", "$http",
      function ($scope, $http) {

          $scope.loggedInUser = null;

          window.history.replaceState(null, null, "/");

          $http.get("/api/getLoggedInUser")
                           .success(function (data) {

                               if (data) {
                                   $scope.loggedInUser = data;
                                   console.log("User is logged in.", data);
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

      }
]);