/*
 *  Akshata Mohanty, February 2016
 *  Angular App - LunchedIn
 */


/*
 *  App Defintion and Configuration
 */
var app = angular
      .module("lunchedIn", ["ngMaterial", "ngRoute", "ngResource", "720kb.datepicker", "angularMoment", 'datatables','datatables.buttons','ngMap'])
      .config(function ($mdThemingProvider) {
          $mdThemingProvider.theme('default')
		    .primaryPalette('red')
      });


// configure our routes
app.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/terms', {
            templateUrl: "templates/landing.html",
            controller: 'admin'
        })


});
/*
 *  Routing
 */
//app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {

// $routeProvider.
//   when("terms", {
//      templateUrl: "templates/landing.html",
//   }).
//   when("privacypolicy", {
//      templateUrl: "templates/privacy.html",
//   }).
//    otherwise({
//      templateUrl: "templates/body.html"
//    });

//	 $locationProvider.html5Mode(true);

//}]);


/***************** Main Controller ************************************/
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

app.controller("user", [
      "$scope", "$http", "$timeout",
      function ($scope, $http, $timeout) {
          debugger;
          window.location = '#account';

          $('#spinner').hide();

          $scope.active_user = null;

          $scope.cuisines = [];

          $scope.letters = ["A", "B", "C", "D", "E", "F",
           "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

          $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

          $scope.users = [];
          $scope.usersAlpha = [];
          $scope.restaurants = [];
          /* MAP */
          $scope.finder = {};
          $scope.finder.zoom = 12;
          $scope.finder.plotaddress = "Singapore";
          $scope.finder.locations = [];
          //$scope.plotData1 = function () {
          //    $scope.finder.zoom = 12;
          //    $scope.finder.plotaddress = [1.290270, 103.851959];
          //    $scope.finder.locations = [
          //      { "POSTCODE": "Ichidon,32 Maxwell Rd, 069115,Singapore" },
          //      { "POSTCODE": "Kotobuki Japanese Restaurant,01-17/18/19/20, 8 Shenton Way, 068811,Singapore" }];
          //}

          /*MAP */

   
          ////      ];
          //var cities = $scope.finder.locations;

          //var geocoder;
          //$scope.initialise = function () {
          //    geocoder = new google.maps.Geocoder();
          //    var myLatlng = new google.maps.LatLng(1.290270, 103.851959);
          //    var mapOptions = {
          //        center: myLatlng,
          //        zoom: 16,
          //        mapTypeId: google.maps.MapTypeId.ROADMAP
          //    };
          //    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
          //    // Geo Location /
          //    //navigator.geolocation.getCurrentPosition(function (pos) {
          //    //    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          //    //    var myLocation = new google.maps.Marker({
          //    //        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          //    //        map: map,
          //    //        animation: google.maps.Animation.DROP,
          //    //        title: "My Location"
          //    //    });
          //    //});

          //    var totallength = $scope.finder.locations.length;
          //    var i = 0;
          //    ///   $timeout(function () {
          //    //var cmarker = function () {
          //    //    createMarker($scope.finder.locations[i]);
          //    //    i++;
          //    //}
          //    //cmarker();
          //    $scope.map = map;
          //    // Additional Markers //
          //    $scope.markers = [];
          //    var infoWindow = new google.maps.InfoWindow();
          //    var createMarker = function (info) {
          //        console.log(info);
          //        geocoder.geocode({ 'address': info.POSTCODE }, function (results, status) {
          //            if (status == google.maps.GeocoderStatus.OK) {
          //             //   map.setCenter(results[0].geometry.location);
          //                var marker = new google.maps.Marker({
          //                    position: results[0].geometry.location,
          //                    map: $scope.map,
          //                    animation: google.maps.Animation.DROP,
          //                    title: info.POSTCODE
          //                });
          //                marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
          //                google.maps.event.addListener(marker, 'click', function () {
          //                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
          //                    infoWindow.open($scope.map, marker);
          //                });
          //                $scope.markers.push(marker);
          //            } else {
          //                alert("Geocode was not successful for the following reason: " + status);
          //            }
          //        });
          //        if (i >= $scope.finder.locations[i].length) { }
          //        else {
          //            $timeout(function () {

          //                createMarker($scope.finder.locations[i]);
          //                i++;
          //            }, 500);
          //        }
          //    }
             
          //  //  }, 1000);

          //    //for (i = 0; i < $scope.finder.locations.length; i++) {
          //    //    var loc = $scope.finder.locations[i];
          //    //      createMarker(loc);
          //    //}
          //    $timeout(function () {
          //        createMarker($scope.finder.locations[i]);
          //        i++;
          //    }, 500);
          //};
          ////$timeout(function () {
          ////google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
          ////}, 8000);
         











          $http.get("/api/cuisines")
            .success(function (data) {
              
                $scope.cuisines = data;
            })
            .error(function (data) {
                console.log("Error:" + data);
            });

          var filterrestaurant = function () {
              var searchrestaurants = [];
              var restdata = $scope.restaurants;
              angular.forEach(restdata, function (restaurant, r) {
                  angular.forEach(restdata[r].cuisine, function (cuis, c) {
                      if ($scope.exists(restdata[r].cuisine[c], $scope.active_user.cuisine)) {
                          searchrestaurants.push({ "POSTCODE": restdata[r].name+","+restdata[r].address.replace("#", "") + ' Singapore' });
                      }
                  });
              });
              $scope.finder.locations = searchrestaurants;
              console.log($scope.finder.locations)
            //  google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
          };

          var resetMap = function () {
              $http.get("/api/restaurants")
              .success(function (restdata) {
                 
                  if (restdata) {
                      $scope.restaurants = restdata;
                      filterrestaurant();
                  }
              });
          };

          var resetUser = function () {
              console.log('resetUser');
              $http.get("/api/getLoggedInUser")
                             .success(function (data) {
                                 debugger;
                                 console.log('getLoggedInUser');
                                 if (data) {
                                     $scope.active_user = data;
                                     resetMap();

                                     $http.get("/api/users")
                                       .success(function (data) {

                                           $scope.users = data;
         
                                           // Initializing Alpha
                                           for (var i = 0; i < $scope.letters.length; i++)
                                               $scope.usersAlpha[$scope.letters[i]] = [];

                                           for (var i = 0; i < data.length; i++) {
                                               if (data[i].email == $scope.active_user.email)
                                                   continue;
                                               if (typeof $scope.usersAlpha[data[i].name[0].toUpperCase()] != 'undefined')
                                                   $scope.usersAlpha[data[i].name[0].toUpperCase()].push(data[i]);
                                           }

                                           console.log($scope.usersAlpha);

                                       })
                                       .error(function (data) {
                                           console.log("Error:" + data);
                                       });

                                 }
                                 else
                                     console.log("User is not logged in.");

                             })
                             .error(function (data) {
                                 console.log("Error:" + data);
                             });
          }
          resetUser();

          //$interval(function () {
          //    filterrestaurant();
          //}, 2000);
        
          $scope.$watch('active_user.cuisine', function (newValue, oldValue) {
             
              console.log('cuisine has changed', newValue, oldValue);
                 filterrestaurant();
           //   google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
          }, true);
          $scope.toggle = function (item, list) {
             
              if (list) {
                  var idx = list.indexOf(item);
                  if (idx > -1) {
                      list.splice(idx, 1);
                  }
                  else {
                      list.push(item);
                  }
                 // filterrestaurant();
                 // filterrestaurant();
              }
          };

          $scope.exists = function (item, list) {
              //console.log("exists");
              if (list)
                  return list.indexOf(item) > -1;
              else
                  return false;
          };

          $scope.addToKnown = function (uid) {

              if ($scope.exists(uid, $scope.active_user.blocked))
                  $scope.toggle(uid, $scope.active_user.blocked);

              $scope.toggle(uid, $scope.active_user.known);

          };

          $scope.addToBlocked = function (uid) {

              if ($scope.exists(uid, $scope.active_user.known))
                  $scope.toggle(uid, $scope.active_user.known);

              $scope.toggle(uid, $scope.active_user.blocked);

          };

          $scope.isBlocked = function (uid) {

              if ($scope.exists(uid, $scope.active_user.blocked))
                  return true;
              else
                  return false;

          };

          $scope.isKnown = function (uid) {

              if ($scope.exists(uid, $scope.active_user.known))
                  return true;
              else
                  return false;

          };

          $scope.updateUserPicture = function (new_url) {
              $scope.active_user.picture = new_url;
              $scope.$parent.loggedInUser.picture = new_url;
              console.log("Picture updated", $scope.$parent.loggedInUser.picture);
          }

          $scope.updateUser = function () {

              if ($scope.active_user.blocked == null)
                  $scope.active_user.blocked = [];
              if ($scope.active_user.known == null)
                  $scope.active_user.known = [];
              if ($scope.active_user.cuisine == null)
                  $scope.active_user.cuisine = [];
              if ($scope.active_user.available == null)
                  $scope.active_user.available = [];

              console.log($scope.active_user);
              $('#spinner').show();

              $.post('/api/editUser', $scope.active_user, function (data, status, xhr) {

                  console.log($scope.active_user, status);
                  alert("Updated");
                  $('#spinner').hide();
              })
          };

      }]);

app.controller("admin",function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
          $scope.currentName = "";
          $scope.currentId = "";
          $scope.matches = [];
          $scope.restaurants = [];
          $scope.users = [];
          $scope.newuser = { 'name': 'UserName', 'email': 'user@example.com', 'gender': 1 };
          $scope.defaultLogo = "https://res.cloudinary.com/hzif3kbk7/image/upload/v1470393547/users/kgdgk15nsipvbtwszhmw.png";
          $scope.active_companypicture = $scope.defaultLogo;
          $scope.newcompany = { 'name': '', 'country': '', 'city': '', 'branchname': '', 'regdate': '', 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': 0 };
          $scope.companies = [];
          $scope.isEdit = false;
          $scope.editIndex = -1;
          $scope.isCompanyForm = true;
          $scope.companyusers = [];

          // Data table settings
          $scope.dtOptions1 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
          $scope.dtColumnDefs1 = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];
          var exportData = function () {
              var blob = new Blob([document.getElementById('exportable').innerHTML], {
                  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
              });
              saveAs(blob, "Company.xls");
          };
          //$scope.exportData = function () {
          //    var blob = new Blob([document.getElementById('exportable').innerHTML], {
          //        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
          //    });
          //    saveAs(blob, "Report.xls");
          //};
          $scope.dtOptions2 = DTOptionsBuilder.newOptions().withDOM('lpfrtip').withPaginationType('full_numbers').withButtons([
            'copy',
            'print',
            'pdf',
            'csv',
            {
                text: 'EXCEL',
                key: '1',
                action: function (e, dt, node, config) {
                    exportData();
                }
            }
          ]);
          $scope.dtColumnDefs = [
              DTColumnDefBuilder.newColumnDef(0).notSortable(),
              DTColumnDefBuilder.newColumnDef(1),
              DTColumnDefBuilder.newColumnDef(2),
              DTColumnDefBuilder.newColumnDef(3),
              DTColumnDefBuilder.newColumnDef(4),
              DTColumnDefBuilder.newColumnDef(5),
               DTColumnDefBuilder.newColumnDef(6).notSortable()
          ];

          $scope.dtOptions3 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
          $scope.dtColumnDefs3 = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3).notSortable()
          ];
          //.............................//
          $scope.addRating = function (restaurantid) {
              $.post("/api/updaterating", { 'id': restaurantid, 'userid': '57a87d3ac9c497984cd41af5', 'rating': 4, 'comment': 'Awesome', date: new Date() }, function (data, status, xhr) {
                  alert(data);
              });
          };

     
          /* Get User Metrics */
          var getuserMetrics = function (userid) {
              $http.get("/api/getuserbyid?id=" + userid)
                                        .success(function (userdata) {
                                            var alreadyknown = [];
                                            if (userdata) {
                                                console.log("Total Lunches: " + userdata.lunchCount);
                                                alreadyknown = userdata.known;
                                            }
                                            else
                                                console.log("Error getting companies");



                                            /* Get the User KPI here, But need to move it to HR Dashboard */

                                            var startdate = new Date();
                                            startdate.setDate(startdate.getDate() - 7);
                                            var enddate = new Date();

                                            $.post("/api/newpeoplemet?id=" + userid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                                                var allmetpeoples = [];
                                                var restaurantlist = [];


                                                if (data) {
                                                    angular.forEach(data, function (value, i) {
                                                        if (typeof data[i].location != 'undefined') {
                                                            if (restaurantlist.indexOf(data[i].location._id) == -1) {
                                                                restaurantlist.push(data[i].location._id);
                                                            }
                                                        }
                                                        angular.forEach(data[i].participants, function (participants, p) {
                                                            if (allmetpeoples.indexOf(data[i].participants[p]) == -1 && alreadyknown.indexOf(data[i].participants[p]) == -1 && data[i].participants[p] != userid) {
                                                                allmetpeoples.push(data[i].participants[p]);
                                                            }
                                                        });
                                                    });
                                                 //   console.log("startdate: " + startdate);
                                                 //   console.log("enddate: " + enddate);
                                                    console.log("Total New People Met: " + allmetpeoples.length);
                                                    console.log("Total Restaurant Visited: " + restaurantlist.length);
                                                }
                                                else
                                                    console.log("Error getting companies");
                                            });





                                        })
                                        .error(function (data) {
                                            console.log("Error:" + data);
                                        });

          };
          //  getNewPeopleMet('574fe2ef3b0cc90300c21712');
          getuserMetrics('57a87d3ac9c497984cd41af5');
          /*User Edge*/
          var getuseredge = function (userid) {
              var startdate = new Date();
              startdate.setDate(startdate.getDate() - 7);
              var enddate = new Date();

              $.post("/api/getuseredge?id=" + userid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                  var allmetpeoples = [];
                  var totaluserknown = 0;
                 
                  if (data) {
                      var knownpeople = [];
                      var alreadyknown = data.user.known;
                          angular.forEach(data.matches, function (match, m) {
                              if (data.matches[m].participants.indexOf(userid) > -1) {
                                  angular.forEach(data.matches[m].participants, function (participants, p) {
                                      if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
                                          if (data.matches[m].participants[p] != userid) {
                                              knownpeople.push(data.matches[m].participants[p]);
                                          }
                                      }
                                  });
                              }
                          });
                      totaluserknown = ((knownpeople.length - 0) - (alreadyknown.length - 0));
                     
                      console.log("User Edge : " + totaluserknown);
                      // console.log("totalcompanyusers: " + totalusers);
                      //console.log("enddate: " + enddate);
                      //console.log("Total New People Met: " + allmetpeoples.length);
                      //console.log("Total Restaurant Visited: " + restaurantlist.length);
                  }
                  else
                      console.log("Error getting companies");
              });
          };
          /* Call Get path lenght */
          getuseredge('57a87d3ac9c497984cd41af5');

          $scope.userkpi = {};

          /*Avg. path length of network*/
          var getpathlength = function (companyid) {
              var startdate = new Date();
              startdate.setDate(startdate.getDate() - 7);
              var enddate = new Date();

              $.post("/api/getpathlength?id=" + companyid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                  var allmetpeoples = [];
                  var totalcompanyknown = 0;
                  var totalusers = 1;
                  if (data) {
                      console.log(data.totallunches);
                      $scope.userkpi.totallunches = data.totallunches;
                      totalusers = data.users.length;
                      var activeusers = data.users.filter(x=> x.available.length > 0);
                      console.log("Total Active Users : " + activeusers.length);
                      if (typeof data.company.userunitprice == 'undefined')
                          data.company.userunitprice = 0;
                      console.log("Total Billed Amount = Total Active Users * Unit Price = " + (data.company.userunitprice - 0) * (activeusers.length - 0));
                      var totalbilledusers = [];
                      var matcheddata = [];
                      angular.forEach(data.users, function (value, i) {
                          var knownpeople = [];
                          var alreadyknown = data.users[i].known;
                          angular.forEach(data.matches, function (match, m) {
                             
                              if (data.matches[m].participants.indexOf(data.users[i]._id) > -1) {
                                   angular.forEach(data.matches[m].participants, function (participants, p) {
                                      if (matcheddata.indexOf(data.matches[m]._id) == -1)
                                          totalbilledusers.push(data.matches[m].participants[p]);
                                      if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
                                          if (data.matches[m].participants[p] != data.users[i]._id) {
                                              knownpeople.push(data.matches[m].participants[p]);
                                          }
                                      }
                                     
                                   });
                                   matcheddata.push(data.matches[m]._id);
                              }
                             
                              
                          });
                         
                          totalcompanyknown = (totalcompanyknown - 0) + ((knownpeople.length - 0) - (alreadyknown.length - 0));
                      });
                      console.log("Total Billed Users : " + totalbilledusers.length);
                      console.log("Total Lunches : " + data.matches.length);
                      console.log("Avg. path length of network in company : " + totalcompanyknown + '/' + totalusers + ' = ' + (totalcompanyknown - 0) / (totalusers - 0));
                      // console.log("totalcompanyusers: " + totalusers);
                      //console.log("enddate: " + enddate);
                      //console.log("Total New People Met: " + allmetpeoples.length);
                      //console.log("Total Restaurant Visited: " + restaurantlist.length);
                  }
                  else
                      console.log("Error getting companies");
              });
          };
          /* Call Get path lenght */
          getpathlength('57a44e08fe7281983ad4efd4');




          // Get Company to the server
          $scope.getCompany = function ($event, i) {
              $scope.isEdit = true;
              $scope.editIndex = i;
              var _t = $scope.companies[i];
              var formatteddate = moment(_t.regdate).format('MM/DD/YYYY');
              console.log(_t.logo);
              if (typeof _t.logo == 'undefined')
                  $scope.active_companypicture = $scope.defaultLogo;
              else
                  $scope.active_companypicture = _t.logo;
              $scope.newcompany = { 'name': _t.name, 'country': _t.country, 'city': _t.city, 'branchname': _t.branchname, 'regdate': formatteddate, 'isdisable': false, 'logo': _t.logo, 'userunitprice': _t.userunitprice };
          };
          var clearDetail = function clearDetail() {
              $scope.isEdit = false;
              $scope.editIndex = -1;
              $scope.newcompany = { 'name': '', 'country': '', 'city': '', 'branchname': '', 'regdate': '', 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': 0 };
              $scope.active_companypicture = $scope.defaultLogo;
              $scope.isCompanyForm = true;
              $scope.newuser = {
                  'name': '',
                  'email': '',
                  'gender': 1
              };
          };
          $scope.updateUserPicture = function (new_url) {
              $scope.active_companypicture = new_url;
              //console.log("Picture updated", $scope.$parent.loggedInUser.picture);
              console.log("Picture updated", new_url);
          };
          $scope.cancelCompany = function () {
              clearDetail();

          };
          $scope.goBack = function () {
              $state.go('terms');
          };

          $scope.isUserEdit = false;
          $scope.userIndex = -1;

          $scope.alldays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

          // selected fruits
          $scope.selection = ['MO', 'TH'];

          // toggle selection for a given day by name
          $scope.toggleSelection = function toggleSelection(dayName) {
              var idx = $scope.selection.indexOf(dayName);
              // is currently selected
              if (idx > -1) {
                  $scope.selection.splice(idx, 1);
              }
                  // is newly selected
              else {
                  $scope.selection.push(dayName);
              }
          };

          $scope.addUsertoCompany = function () {
              var ci = $scope.editIndex;
              var _ct = $scope.companies[ci];
              if ($scope.isUserEdit == false) {
                  $scope.newuser = {
                      'name': $scope.newuser.name,
                      'email': $scope.newuser.email,
                      'gender': $scope.newuser.gender,
                      'companyid': _ct._id
                  };
                  addNewUser();
              }
              else {

                  var i = $scope.userIndex;
                  var _t = $scope.companyusers[i];
                  $scope.newuser = {
                      'name': $scope.newuser.name,
                      'email': $scope.newuser.email,
                      'gender': $scope.newuser.gender,
                      'companyid': _ct._id
                      , 'id': _t._id
                  };
                  $scope.newuser.available = $scope.selection;
                  $.post('/api/updateUser', $scope.newuser, function (data, status, xhr) {
                      alert("Updated User");
                      resetUsers();
                  });
              }

          };
          $scope.addCompanyUser = function ($event, i) {
              clearDetail();
              $scope.companyusers = [];
              $scope.isCompanyForm = false;
              $scope.editIndex = i;
              var _t = $scope.companies[i];
              $scope.currentName = _t.name;
              $scope.currentId = _t._id;
              resetfields();

          };
          $scope.deleteCompany = function ($event, i) {
              var _t = $scope.companies[i];
              $.post('/api/deleteCompany', { '_id': _t._id }, function (data, status, xhr) {
                  alert("Deleted company");
                  resetCompanies();
              });
              clearDetail();
          };


          $scope.addCompany = function () {

              if ($scope.isEdit == false) {
                  $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
                  $.post('/api/addCompany', $scope.newcompany, function (data, status, xhr) {
                      alert("Added company");
                      resetCompanies();
                  });
              }
              else {
                  var i = $scope.editIndex;
                  var _t = $scope.companies[i];
                  $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'id': _t._id, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
                  console.log($scope.newcompany);
                  $.post('/api/updateCompany', $scope.newcompany, function (data, status, xhr) {
                      alert("Updated company");
                      resetCompanies();
                  });
              }
              clearDetail();
          }
          var resetCompanies = function () {
              $http.get("/api/companies")
                             .success(function (data) {

                             
                                 if (data) {
                                     angular.forEach(data, function (dis, j) {
                                         data[j].expanded = false;
                                     });

                                     $scope.companies = data;

                                 }
                                 else
                                     console.log("Error getting companies");

                             })
                             .error(function (data) {
                                 console.log("Error:" + data);
                             });
          }

          resetCompanies();


        

          // Get Company to the server
          $scope.getUser = function ($event, i) {
              $scope.isUserEdit = true;
              $scope.userIndex = i;
              var _t = $scope.companyusers[i];
              $scope.newuser = { 'name': _t.name, 'email': _t.email, 'gender': _t.gender, 'companyid': _t.companyid };
              $scope.selection = _t.available;
          };
          var resetfields = function () {
              $scope.isUserEdit = false;
              $scope.userIndex = -1;
              $scope.newuser = {
                  'name': '',
                  'email': '',
                  'gender': 1
              };
              $scope.companyusers = [];
              angular.forEach($scope.users, function (value, i) {

                  if (typeof $scope.users[i].isPause == 'undefined' || $scope.users[i].isPause == false)
                      $scope.users[i].isPause = false;
                  else
                      $scope.users[i].isPause = true;
                  if ($scope.users[i].company == $scope.currentId) {
                      if (typeof $scope.users[i].isDisable == 'undefined' || $scope.users[i].isDisable == false)
                          $scope.companyusers.push($scope.users[i]);
                  }
              });
          };
          $scope.cancelUser = function ($event, i) {
              resetfields();
              clearDetail();
          };
          $scope.updateStatus = function ($event, i, status) {
              $scope.companyusers[i].isPause = status;
              $.post('/api/updateStatus', $scope.companyusers[i], function (data, status, xhr) {
                  alert("Updated user status");
              });
          };
          $scope.deleteUser = function ($event, i) {
              $scope.companyusers[i].isDisable = true;
              $.post('/api/deleteUser', $scope.companyusers[i], function (data, status, xhr) {
                  alert("Deleted user");
                  resetUsers();
              });
          };

          //var items = ["111", "112", "113", "114", "115"];
          //var item = items[Math.floor(Math.random() * items.length)];
          //console.log(item);

          //...........................//
          var addNewUser = function () {
              $scope.newuser.available = $scope.selection;
              console.log($scope.newuser);
              $.post('/api/addUser', $scope.newuser, function (data, status, xhr) {
                  alert("Added user");
                  resetUsers();
              });
              resetfields();
          };
          $scope.addUser = function () {
              addNewUser();
          }
          var resetUsers = function () {
              $http.get("/api/users")
                               .success(function (data) {

                                   if (data) {
                                       $scope.users = data;

                                       angular.forEach($scope.users, function (value, i) {
                                           if (typeof $scope.users[i].companyid == 'undefined')
                                               $scope.users[i].company = "";
                                           else
                                               $scope.users[i].company = $scope.users[i].companyid;
                                           //  $scope.users[value].company = $scope.users[value].companyid;
                                       });
                                       resetfields();
                                   }
                                   else
                                       console.log("Error getting users");

                               })
                               .error(function (data) {
                                   console.log("Error:" + data);
                               });

          }
          resetUsers();

          $http.get("/api/lunches")
                   .success(function (data) {

                       if (data) {
                           $scope.matches = data;

                       }
                       else
                           console.log("Error getting matches");

                   })
                   .error(function (data) {
                       console.log("Error:" + data);
                   });

          $scope.restaurantdiscount = [];
          $scope.currentrestaurant = {};
          //$http.get("/api/restaurantdiscount")
          //         .success(function (data) {

          //             if (data) {
          //                 $scope.restaurantdiscount = data;
          //             }
          //             else
          //                 console.log("Error getting restaurant discounts");
          //         })
          //         .error(function (data) {
          //             console.log("Error:" + data);
          //         });

          $scope.newdiscount = { 'discountDate': '', 'discountPrice': '', 'discountUnit': '', 'restaurantid': '' };

          var cleardiscount = function () {
              $scope.newdiscount = { 'discountDate': '', 'discountPrice': '', 'discountUnit': '', 'restaurantid': '' };
          };

          $scope.addDiscount = function () {
              //   console.log(restaurantid);
              console.log($scope.newdiscount);
              $.post('/api/addDiscount', $scope.newdiscount, function (data, status, xhr) {
                  alert("Discount added");

              });
          }

          $http.get("/api/restaurants")
                   .success(function (data) {

                       if (data) {
                           $scope.restaurants = data;

                           $http.get("/api/restaurantdiscounts")
                                .success(function (datadiscount) {

                                    if (datadiscount) {
                                        $scope.restaurantdiscount = datadiscount;
                                        angular.forEach($scope.restaurants, function (value, i) {
                                            $scope.restaurants[i].discounts = [];
                                            $scope.restaurants[i].avgrating = 0;
                                            if (typeof $scope.restaurants[i].rating != 'undefined') {
                                                var totalratings = 0;
                                                angular.forEach($scope.restaurants[i].rating, function (star, r) {
                                                    totalratings = (totalratings - 0) + ($scope.restaurants[i].rating[r].rating - 0);
                                                });
                                                var userlength = $scope.restaurants[i].rating.length;
                                                if (userlength == 0)
                                                    userlength = 1;
                                                $scope.restaurants[i].avgrating = totalratings / ((userlength - 0));
                                            }

                                            angular.forEach($scope.restaurantdiscount, function (dis, j) {
                                                if ($scope.restaurants[i]._id === $scope.restaurantdiscount[j].restaurantid) {
                                                    $scope.restaurants[i].discounts.push($scope.restaurantdiscount[j]);
                                                }
                                            });
                                            
                                        });
                                      
                                    }
                                    else
                                        console.log("Error getting restaurants");

                                }).error(function (datadiscount) {
                                    console.log("Error:" + datadiscount);
                                });

                       }
                       else
                           console.log("Error getting restaurants");

                   })
                   .error(function (data) {
                       console.log("Error:" + data);
                   });

          $scope.toggle = function (item, list) {
              if (list) {
                  var idx = list.indexOf(item);
                  if (idx > -1) {
                      list.splice(idx, 1);
                  }
                  else {
                      list.push(item);
                  }
              }
          };

          $scope.exists = function (item, list) {
              if (list)
                  return list.indexOf(item) > -1;
              else
                  return false;
          };

          $scope.updateRestaurant = function () {

              $.post('/api/editUser', $scope.selectedRestaurant, function (data, status, xhr) {
                  console.log(status);
              })
          };
});

app.controller("hr", function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.companyusers = [];
    $scope.userkpi = {};
    //    // Data table settings
        $scope.dtOptions1 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        $scope.dtColumnDefs1 = [
          DTColumnDefBuilder.newColumnDef(0).notSortable(),
          DTColumnDefBuilder.newColumnDef(1),
          DTColumnDefBuilder.newColumnDef(2),
          DTColumnDefBuilder.newColumnDef(3),
          DTColumnDefBuilder.newColumnDef(4),
          DTColumnDefBuilder.newColumnDef(5).notSortable(),
          DTColumnDefBuilder.newColumnDef(6).notSortable()
        
        ];
        var resetUsers = function () {
            $http.get("/api/companyusers")
                             .success(function (data) {
                                 if (data) {
                                     
                                     angular.forEach(data, function (value, i) {

                                         if (typeof data[i].isPause == 'undefined' || data[i].isPause == false)
                                             data.isPause = false;
                                         else
                                             data.isPause = true;
                                        
                                         if (typeof data[i].isDisable == 'undefined' || data[i].isDisable == false)
                                             $scope.companyusers.push(data[i]);

                                     });
                                     var startdate = new Date();
                                     startdate.setDate(startdate.getDate() - 30);
                                     var enddate = new Date();
                                     var companyid = 0;
                                     $.post("/api/getpathlength?id=" + companyid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                                         var allmetpeoples = [];
                                         var totalcompanyknown = 0;
                                         var totalusers = 1;
                                         console.log('data')
                                         console.log(data);
                                         if (data) {
                                             console.log('data.totallunches');
                                             console.log(data.totallunches);
                                             $scope.userkpi.totallunches = data.totallunches;
                                             $scope.userkpi.lunchesweek = data.matches.length;
                                             $scope.$apply();
                                             totalusers = $scope.companyusers.length;
                                             var activeusers = $scope.companyusers.filter(x=> x.available.length > 0);
                                             console.log("Total Active Users : " + activeusers.length);
                                             if (typeof data.company.userunitprice == 'undefined')
                                                 data.company.userunitprice = 0;
                                             console.log("Total Billed Amount = Total Active Users * Unit Price = " + (data.company.userunitprice - 0) * (activeusers.length - 0));
                                             var totalbilledusers = [];
                                             var matcheddata = [];
                                             angular.forEach($scope.companyusers, function (value, i) {
                                                 var knownpeople = [];
                                                 var alreadyknown = $scope.companyusers[i].known;
                                                 angular.forEach(data.matches, function (match, m) {

                                                     if (data.matches[m].participants.indexOf($scope.companyusers[i]._id) > -1) {
                                                         angular.forEach(data.matches[m].participants, function (participants, p) {
                                                             if (matcheddata.indexOf(data.matches[m]._id) == -1)
                                                                 totalbilledusers.push(data.matches[m].participants[p]);
                                                             if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
                                                                 if (data.matches[m].participants[p] != $scope.companyusers[i]._id) {
                                                                     knownpeople.push(data.matches[m].participants[p]);
                                                                 }
                                                             }

                                                         });
                                                         matcheddata.push(data.matches[m]._id);
                                                     }


                                                 });
                                                 $scope.companyusers[i].knownpeople = (knownpeople.length - 0) / $scope.companyusers.length;
                                                 //  totalcompanyknown = (totalcompanyknown - 0) + ((knownpeople.length - 0) - (alreadyknown.length - 0));
                                                 totalcompanyknown = (totalcompanyknown - 0) + ($scope.companyusers[i].knownpeople - 0);
                                             });
                                             console.log("Total Billed Users : " + totalbilledusers.length);
                                             console.log("Total Lunches : " + data.matches.length);
                                             console.log("Avg. path length of network in company : " + totalcompanyknown);
                                             $scope.userkpi.totalcompanyknown = totalcompanyknown;
                                             $scope.$apply();
                                             // console.log("totalcompanyusers: " + totalusers);
                                             //console.log("enddate: " + enddate);
                                             //console.log("Total New People Met: " + allmetpeoples.length);
                                             //console.log("Total Restaurant Visited: " + restaurantlist.length);
                                         }
                                         else
                                             console.log("Error getting companies");
                                     });

                                 }
                                 else
                                     console.log("Error getting users");

                             })
                             .error(function (data) {
                                 console.log("Error:" + data);
                             });
        }
        resetUsers();


    /*Avg. path length of network*/
        var getpathlength = function (companyid) {
            var startdate = new Date();
            startdate.setDate(startdate.getDate() - 7);
            var enddate = new Date();

            $.post("/api/getpathlength?id=" + companyid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                var allmetpeoples = [];
                var totalcompanyknown = 0;
                var totalusers = 1;
                if (data) {
                    console.log(data.totallunches);
                    $scope.userkpi.totallunches = data.totallunches;
                    $scope.userkpi.lunchesweek = data.matches.length;
                    totalusers = data.users.length;
                    var activeusers = data.users.filter(x=> x.available.length > 0);
                    console.log("Total Active Users : " + activeusers.length);
                    if (typeof data.company.userunitprice == 'undefined')
                        data.company.userunitprice = 0;
                    console.log("Total Billed Amount = Total Active Users * Unit Price = " + (data.company.userunitprice - 0) * (activeusers.length - 0));
                    var totalbilledusers = [];
                    var matcheddata = [];
                    angular.forEach(data.users, function (value, i) {
                        var knownpeople = [];
                        var alreadyknown = data.users[i].known;
                        angular.forEach(data.matches, function (match, m) {

                            if (data.matches[m].participants.indexOf(data.users[i]._id) > -1) {
                                angular.forEach(data.matches[m].participants, function (participants, p) {
                                    if (matcheddata.indexOf(data.matches[m]._id) == -1)
                                        totalbilledusers.push(data.matches[m].participants[p]);
                                    if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
                                        if (data.matches[m].participants[p] != data.users[i]._id) {
                                            knownpeople.push(data.matches[m].participants[p]);
                                        }
                                    }

                                });
                                matcheddata.push(data.matches[m]._id);
                            }


                        });
                        data.users[i].knownpeople = knownpeople.length;
                        totalcompanyknown = (totalcompanyknown - 0) + ((knownpeople.length - 0) - (alreadyknown.length - 0));
                    });
                    console.log("Total Billed Users : " + totalbilledusers.length);
                    console.log("Total Lunches : " + data.matches.length);
                    console.log("Avg. path length of network in company : " + totalcompanyknown + '/' + totalusers + ' = ' + (totalcompanyknown - 0) / (totalusers - 0));
                    // console.log("totalcompanyusers: " + totalusers);
                    //console.log("enddate: " + enddate);
                    //console.log("Total New People Met: " + allmetpeoples.length);
                    //console.log("Total Restaurant Visited: " + restaurantlist.length);
                }
                else
                    console.log("Error getting companies");
            });
        };
    /* Call Get path lenght */
        getpathlength('0');





});
//app.controller("hr", function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
//    $scope.currentName = "";
//    $scope.currentId = "";
//    $scope.matches = [];
//    $scope.restaurants = [];
//    $scope.users = [];
//    $scope.newuser = { 'name': 'UserName', 'email': 'user@example.com', 'gender': 1 };
//    $scope.defaultLogo = "https://res.cloudinary.com/hzif3kbk7/image/upload/v1470393547/users/kgdgk15nsipvbtwszhmw.png";
//    $scope.active_companypicture = $scope.defaultLogo;
//    $scope.newcompany = { 'name': '', 'country': '', 'city': '', 'branchname': '', 'regdate': '', 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': 0 };
//    $scope.companies = [];
//    $scope.isEdit = false;
//    $scope.editIndex = -1;
//    $scope.isCompanyForm = true;
//    $scope.companyusers = [];

//    // Data table settings
//    $scope.dtOptions1 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
//    $scope.dtColumnDefs1 = [
//      DTColumnDefBuilder.newColumnDef(0),
//      DTColumnDefBuilder.newColumnDef(1),
//      DTColumnDefBuilder.newColumnDef(2),
//      DTColumnDefBuilder.newColumnDef(3).notSortable()
//    ];
//    var exportData = function () {
//        var blob = new Blob([document.getElementById('exportable').innerHTML], {
//            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
//        });
//        saveAs(blob, "Company.xls");
//    };
//    //$scope.exportData = function () {
//    //    var blob = new Blob([document.getElementById('exportable').innerHTML], {
//    //        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
//    //    });
//    //    saveAs(blob, "Report.xls");
//    //};
//    $scope.dtOptions2 = DTOptionsBuilder.newOptions().withDOM('lpfrtip').withPaginationType('full_numbers').withButtons([
//      'copy',
//      'print',
//      'pdf',
//      'csv',
//      {
//          text: 'EXCEL',
//          key: '1',
//          action: function (e, dt, node, config) {
//              exportData();
//          }
//      }
//    ]);
//    $scope.dtColumnDefs = [
//        DTColumnDefBuilder.newColumnDef(0).notSortable(),
//        DTColumnDefBuilder.newColumnDef(1),
//        DTColumnDefBuilder.newColumnDef(2),
//        DTColumnDefBuilder.newColumnDef(3),
//        DTColumnDefBuilder.newColumnDef(4),
//        DTColumnDefBuilder.newColumnDef(5),
//         DTColumnDefBuilder.newColumnDef(6).notSortable()
//    ];

//    $scope.dtOptions3 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
//    $scope.dtColumnDefs3 = [
//      DTColumnDefBuilder.newColumnDef(0),
//      DTColumnDefBuilder.newColumnDef(1),
//      DTColumnDefBuilder.newColumnDef(2),
//      DTColumnDefBuilder.newColumnDef(3).notSortable()
//    ];
//    //.............................//
//    $scope.addRating = function (restaurantid) {
//        $.post("/api/updaterating", { 'id': restaurantid, 'userid': '57a87d3ac9c497984cd41af5', 'rating': 4, 'comment': 'Awesome', date: new Date() }, function (data, status, xhr) {
//            alert(data);
//        });
//    };















//    /* Get User Metrics */
//    var getuserMetrics = function (userid) {
//        $http.get("/api/getuserbyid?id=" + userid)
//                                  .success(function (userdata) {
//                                      var alreadyknown = [];
//                                      if (userdata) {
//                                          console.log("Total Lunches: " + userdata.lunchCount);
//                                          alreadyknown = userdata.known;
//                                      }
//                                      else
//                                          console.log("Error getting companies");



//                                      /* Get the User KPI here, But need to move it to HR Dashboard */

//                                      var startdate = new Date();
//                                      startdate.setDate(startdate.getDate() - 7);
//                                      var enddate = new Date();

//                                      $.post("/api/newpeoplemet?id=" + userid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
//                                          var allmetpeoples = [];
//                                          var restaurantlist = [];


//                                          if (data) {
//                                              angular.forEach(data, function (value, i) {
//                                                  if (typeof data[i].location != 'undefined') {
//                                                      if (restaurantlist.indexOf(data[i].location._id) == -1) {
//                                                          restaurantlist.push(data[i].location._id);
//                                                      }
//                                                  }
//                                                  angular.forEach(data[i].participants, function (participants, p) {
//                                                      if (allmetpeoples.indexOf(data[i].participants[p]) == -1 && alreadyknown.indexOf(data[i].participants[p]) == -1 && data[i].participants[p] != userid) {
//                                                          allmetpeoples.push(data[i].participants[p]);
//                                                      }
//                                                  });
//                                              });
//                                              //   console.log("startdate: " + startdate);
//                                              //   console.log("enddate: " + enddate);
//                                              console.log("Total New People Met: " + allmetpeoples.length);
//                                              console.log("Total Restaurant Visited: " + restaurantlist.length);
//                                          }
//                                          else
//                                              console.log("Error getting companies");
//                                      });





//                                  })
//                                  .error(function (data) {
//                                      console.log("Error:" + data);
//                                  });

//    };
//    //  getNewPeopleMet('574fe2ef3b0cc90300c21712');
//    getuserMetrics('57a87d3ac9c497984cd41af5');
//    /*User Edge*/
//    var getuseredge = function (userid) {
//        var startdate = new Date();
//        startdate.setDate(startdate.getDate() - 7);
//        var enddate = new Date();

//        $.post("/api/getuseredge?id=" + userid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
//            var allmetpeoples = [];
//            var totaluserknown = 0;

//            if (data) {


//                var knownpeople = [];
//                var alreadyknown = data.user.known;
//                angular.forEach(data.matches, function (match, m) {
//                    if (data.matches[m].participants.indexOf(userid) > -1) {
//                        angular.forEach(data.matches[m].participants, function (participants, p) {
//                            if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
//                                if (data.matches[m].participants[p] != userid) {
//                                    knownpeople.push(data.matches[m].participants[p]);
//                                }
//                            }
//                        });
//                    }
//                });
//                totaluserknown = ((knownpeople.length - 0) - (alreadyknown.length - 0));

//                console.log("User Edge : " + totaluserknown);
//                // console.log("totalcompanyusers: " + totalusers);
//                //console.log("enddate: " + enddate);
//                //console.log("Total New People Met: " + allmetpeoples.length);
//                //console.log("Total Restaurant Visited: " + restaurantlist.length);
//            }
//            else
//                console.log("Error getting companies");
//        });
//    };
//    /* Call Get path lenght */
//    getuseredge('57a87d3ac9c497984cd41af5');



//    /*Avg. path length of network*/
//    var getpathlength = function (companyid) {
//        var startdate = new Date();
//        startdate.setDate(startdate.getDate() - 7);
//        var enddate = new Date();

//        $.post("/api/getpathlength?id=" + companyid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
//            var allmetpeoples = [];
//            var totalcompanyknown = 0;
//            var totalusers = 1;
//            if (data) {
//                totalusers = data.users.length;
//                var activeusers = data.users.filter(x=> x.available.length > 0);
//                console.log("Total Active Users : " + activeusers.length);
//                if (typeof data.company.userunitprice == 'undefined')
//                    data.company.userunitprice = 0;
//                console.log("Total Billed Amount = Total Active Users * Unit Price = " + (data.company.userunitprice - 0) * (activeusers.length - 0));
//                var totalbilledusers = [];
//                var matcheddata = [];
//                angular.forEach(data.users, function (value, i) {
//                    var knownpeople = [];
//                    var alreadyknown = data.users[i].known;
//                    angular.forEach(data.matches, function (match, m) {

//                        if (data.matches[m].participants.indexOf(data.users[i]._id) > -1) {
//                            angular.forEach(data.matches[m].participants, function (participants, p) {
//                                if (matcheddata.indexOf(data.matches[m]._id) == -1)
//                                    totalbilledusers.push(data.matches[m].participants[p]);
//                                if (knownpeople.indexOf(data.matches[m].participants[p]) == -1) {
//                                    if (data.matches[m].participants[p] != data.users[i]._id) {
//                                        knownpeople.push(data.matches[m].participants[p]);
//                                    }
//                                }

//                            });
//                            matcheddata.push(data.matches[m]._id);
//                        }


//                    });

//                    totalcompanyknown = (totalcompanyknown - 0) + ((knownpeople.length - 0) - (alreadyknown.length - 0));
//                });
//                console.log("Total Billed Users : " + totalbilledusers.length);
//                console.log("Total Lunches : " + data.matches.length);
//                console.log("Avg. path length of network in company : " + totalcompanyknown + '/' + totalusers + ' = ' + (totalcompanyknown - 0) / (totalusers - 0));
//                // console.log("totalcompanyusers: " + totalusers);
//                //console.log("enddate: " + enddate);
//                //console.log("Total New People Met: " + allmetpeoples.length);
//                //console.log("Total Restaurant Visited: " + restaurantlist.length);
//            }
//            else
//                console.log("Error getting companies");
//        });
//    };
//    /* Call Get path lenght */
//    getpathlength('57a44e08fe7281983ad4efd4');




//    // Get Company to the server
//    $scope.getCompany = function ($event, i) {
//        $scope.isEdit = true;
//        $scope.editIndex = i;
//        var _t = $scope.companies[i];
//        var formatteddate = moment(_t.regdate).format('MM/DD/YYYY');
//        console.log(_t.logo);
//        if (typeof _t.logo == 'undefined')
//            $scope.active_companypicture = $scope.defaultLogo;
//        else
//            $scope.active_companypicture = _t.logo;
//        $scope.newcompany = { 'name': _t.name, 'country': _t.country, 'city': _t.city, 'branchname': _t.branchname, 'regdate': formatteddate, 'isdisable': false, 'logo': _t.logo, 'userunitprice': _t.userunitprice };
//    };
//    var clearDetail = function clearDetail() {
//        $scope.isEdit = false;
//        $scope.editIndex = -1;
//        $scope.newcompany = { 'name': '', 'country': '', 'city': '', 'branchname': '', 'regdate': '', 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': 0 };
//        $scope.active_companypicture = $scope.defaultLogo;
//        $scope.isCompanyForm = true;
//        $scope.newuser = {
//            'name': '',
//            'email': '',
//            'gender': 1
//        };
//    };
//    $scope.updateUserPicture = function (new_url) {
//        $scope.active_companypicture = new_url;
//        //console.log("Picture updated", $scope.$parent.loggedInUser.picture);
//        console.log("Picture updated", new_url);
//    };
//    $scope.cancelCompany = function () {
//        clearDetail();

//    };
//    $scope.goBack = function () {
//        $state.go('terms');
//    };

//    $scope.isUserEdit = false;
//    $scope.userIndex = -1;

//    $scope.alldays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

//    // selected fruits
//    $scope.selection = ['MO', 'TH'];

//    // toggle selection for a given day by name
//    $scope.toggleSelection = function toggleSelection(dayName) {
//        var idx = $scope.selection.indexOf(dayName);
//        // is currently selected
//        if (idx > -1) {
//            $scope.selection.splice(idx, 1);
//        }
//            // is newly selected
//        else {
//            $scope.selection.push(dayName);
//        }
//    };

//    $scope.addUsertoCompany = function () {
//        var ci = $scope.editIndex;
//        var _ct = $scope.companies[ci];
//        if ($scope.isUserEdit == false) {
//            $scope.newuser = {
//                'name': $scope.newuser.name,
//                'email': $scope.newuser.email,
//                'gender': $scope.newuser.gender,
//                'companyid': _ct._id
//            };
//            addNewUser();
//        }
//        else {

//            var i = $scope.userIndex;
//            var _t = $scope.companyusers[i];
//            $scope.newuser = {
//                'name': $scope.newuser.name,
//                'email': $scope.newuser.email,
//                'gender': $scope.newuser.gender,
//                'companyid': _ct._id
//                , 'id': _t._id
//            };
//            $scope.newuser.available = $scope.selection;
//            $.post('/api/updateUser', $scope.newuser, function (data, status, xhr) {
//                alert("Updated User");
//                resetUsers();
//            });
//        }

//    };
//    $scope.addCompanyUser = function ($event, i) {
//        clearDetail();
//        $scope.companyusers = [];
//        $scope.isCompanyForm = false;
//        $scope.editIndex = i;
//        var _t = $scope.companies[i];
//        $scope.currentName = _t.name;
//        $scope.currentId = _t._id;
//        resetfields();

//    };
//    $scope.deleteCompany = function ($event, i) {
//        var _t = $scope.companies[i];
//        $.post('/api/deleteCompany', { '_id': _t._id }, function (data, status, xhr) {
//            alert("Deleted company");
//            resetCompanies();
//        });
//        clearDetail();
//    };


//    $scope.addCompany = function () {

//        if ($scope.isEdit == false) {
//            $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
//            $.post('/api/addCompany', $scope.newcompany, function (data, status, xhr) {
//                alert("Added company");
//                resetCompanies();
//            });
//        }
//        else {
//            var i = $scope.editIndex;
//            var _t = $scope.companies[i];
//            $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'id': _t._id, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
//            console.log($scope.newcompany);
//            $.post('/api/updateCompany', $scope.newcompany, function (data, status, xhr) {
//                alert("Updated company");
//                resetCompanies();
//            });
//        }
//        clearDetail();
//    }
//    var resetCompanies = function () {
//        $http.get("/api/companies")
//                       .success(function (data) {


//                           if (data) {
//                               angular.forEach(data, function (dis, j) {
//                                   data[j].expanded = false;
//                               });

//                               $scope.companies = data;

//                           }
//                           else
//                               console.log("Error getting companies");

//                       })
//                       .error(function (data) {
//                           console.log("Error:" + data);
//                       });
//    }

//    resetCompanies();




//    // Get Company to the server
//    $scope.getUser = function ($event, i) {
//        $scope.isUserEdit = true;
//        $scope.userIndex = i;
//        var _t = $scope.companyusers[i];
//        $scope.newuser = { 'name': _t.name, 'email': _t.email, 'gender': _t.gender, 'companyid': _t.companyid };
//        $scope.selection = _t.available;
//    };
//    var resetfields = function () {
//        $scope.isUserEdit = false;
//        $scope.userIndex = -1;
//        $scope.newuser = {
//            'name': '',
//            'email': '',
//            'gender': 1
//        };
//        $scope.companyusers = [];
//        angular.forEach($scope.users, function (value, i) {

//            if (typeof $scope.users[i].isPause == 'undefined' || $scope.users[i].isPause == false)
//                $scope.users[i].isPause = false;
//            else
//                $scope.users[i].isPause = true;
//            if ($scope.users[i].company == $scope.currentId) {
//                if (typeof $scope.users[i].isDisable == 'undefined' || $scope.users[i].isDisable == false)
//                    $scope.companyusers.push($scope.users[i]);
//            }
//        });
//    };
//    $scope.cancelUser = function ($event, i) {
//        resetfields();
//        clearDetail();
//    };
//    $scope.updateStatus = function ($event, i, status) {
//        $scope.companyusers[i].isPause = status;
//        $.post('/api/updateStatus', $scope.companyusers[i], function (data, status, xhr) {
//            alert("Updated user status");
//        });
//    };
//    $scope.deleteUser = function ($event, i) {
//        $scope.companyusers[i].isDisable = true;
//        $.post('/api/deleteUser', $scope.companyusers[i], function (data, status, xhr) {
//            alert("Deleted user");
//            resetUsers();
//        });
//    };

//    //var items = ["111", "112", "113", "114", "115"];
//    //var item = items[Math.floor(Math.random() * items.length)];
//    //console.log(item);

//    //...........................//
//    var addNewUser = function () {
//        $scope.newuser.available = $scope.selection;
//        console.log($scope.newuser);
//        $.post('/api/addUser', $scope.newuser, function (data, status, xhr) {
//            alert("Added user");
//            resetUsers();
//        });
//        resetfields();
//    };
//    $scope.addUser = function () {
//        addNewUser();
//    }
//    var resetUsers = function () {
//        $http.get("/api/users")
//                         .success(function (data) {

//                             if (data) {
//                                 $scope.users = data;

//                                 angular.forEach($scope.users, function (value, i) {
//                                     if (typeof $scope.users[i].companyid == 'undefined')
//                                         $scope.users[i].company = "";
//                                     else
//                                         $scope.users[i].company = $scope.users[i].companyid;
//                                     //  $scope.users[value].company = $scope.users[value].companyid;
//                                 });
//                                 resetfields();
//                             }
//                             else
//                                 console.log("Error getting users");

//                         })
//                         .error(function (data) {
//                             console.log("Error:" + data);
//                         });

//    }
//    resetUsers();

//    $http.get("/api/lunches")
//             .success(function (data) {

//                 if (data) {
//                     $scope.matches = data;

//                 }
//                 else
//                     console.log("Error getting matches");

//             })
//             .error(function (data) {
//                 console.log("Error:" + data);
//             });

//    $scope.restaurantdiscount = [];
//    $scope.currentrestaurant = {};
   
//    $scope.newdiscount = { 'discountDate': '', 'discountPrice': '', 'discountUnit': '', 'restaurantid': '' };

//    var cleardiscount = function () {
//        $scope.newdiscount = { 'discountDate': '', 'discountPrice': '', 'discountUnit': '', 'restaurantid': '' };
//    };

//    $scope.addDiscount = function () {
//        //   console.log(restaurantid);
//        console.log($scope.newdiscount);
//        $.post('/api/addDiscount', $scope.newdiscount, function (data, status, xhr) {
//            alert("Discount added");

//        });
//    }

//    $http.get("/api/restaurants")
//             .success(function (data) {

//                 if (data) {
//                     $scope.restaurants = data;

//                     $http.get("/api/restaurantdiscounts")
//                          .success(function (datadiscount) {

//                              if (datadiscount) {
//                                  $scope.restaurantdiscount = datadiscount;
//                                  angular.forEach($scope.restaurants, function (value, i) {
//                                      $scope.restaurants[i].discounts = [];
//                                      $scope.restaurants[i].avgrating = 0;
//                                      if (typeof $scope.restaurants[i].rating != 'undefined') {
//                                          var totalratings = 0;
//                                          angular.forEach($scope.restaurants[i].rating, function (star, r) {
//                                              totalratings = (totalratings - 0) + ($scope.restaurants[i].rating[r].rating - 0);
//                                          });
//                                          var userlength = $scope.restaurants[i].rating.length;
//                                          if (userlength == 0)
//                                              userlength = 1;
//                                          $scope.restaurants[i].avgrating = totalratings / ((userlength - 0));
//                                      }

//                                      angular.forEach($scope.restaurantdiscount, function (dis, j) {
//                                          if ($scope.restaurants[i]._id === $scope.restaurantdiscount[j].restaurantid) {
//                                              $scope.restaurants[i].discounts.push($scope.restaurantdiscount[j]);
//                                          }
//                                      });

//                                  });

//                              }
//                              else
//                                  console.log("Error getting restaurants");

//                          }).error(function (datadiscount) {
//                              console.log("Error:" + datadiscount);
//                          });

//                 }
//                 else
//                     console.log("Error getting restaurants");

//             })
//             .error(function (data) {
//                 console.log("Error:" + data);
//             });

//    $scope.toggle = function (item, list) {
//        if (list) {
//            var idx = list.indexOf(item);
//            if (idx > -1) {
//                list.splice(idx, 1);
//            }
//            else {
//                list.push(item);
//            }
//        }
//    };

//    $scope.exists = function (item, list) {
//        if (list)
//            return list.indexOf(item) > -1;
//        else
//            return false;
//    };

//    $scope.updateRestaurant = function () {

//        $.post('/api/editUser', $scope.selectedRestaurant, function (data, status, xhr) {
//            console.log(status);
//        })
//    };
//});

