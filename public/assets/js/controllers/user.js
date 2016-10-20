'use strict';

angular.module('app', ['ngSanitize', 'ui.select', 'summernote', 'ngDropzone', 'daterangepicker', 'siyfion.sfTypeahead', 'ui.bootstrap'])
    // Chart controller 
    .controller('userCntrl', ["$scope", "$http", "$timeout", "$filter", '$sce', '$compile', function ($scope, $http, $timeout, $filter, $sce, $compile) {
        $('#spinner').hide();
        $scope.filteredTodos = [];
        $scope.currentPage = 1;
        $scope.numPerPage = 3;
        $scope.maxSize = 5;
        $scope.allUsers = [];
        $scope.letter = 'A';
        $scope.ActiveTab = "";
        $scope.IsCuisineActive = false;
        $scope.IsPeopleActive = false;
        $scope.numPages = function () {
            console.log($scope.allUsers.length)
            console.log($scope.numPerPage)

            return Math.ceil($scope.allUsers.length / $scope.numPerPage);
        };

        $scope.currentNumberPage = Math.ceil($scope.allUsers.length / $scope.numPerPage);

        $scope.$watch('currentPage + numPerPage', function () {
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;           
            var usr = $scope.usersAlpha[$scope.letter];
            if (typeof (usr) != "undefined") {

                $scope.filteredUsers = usr.slice(begin, end);
            }

        });
        $scope.CardColors = [{ "Name": "Gainsboro", "Value": "#DEDEDE" },
            { "Name": "MediumTurquoise", "Value": "#BAF1EC" },
            { "Name": "SummerSky", "Value": "#3E97D4" },
            { "Name": "LightBlue", "Value": "#B9D5E3" },
             { "Name": "NavyBlue", "Value": "#BFDDF1" },
            { "Name": "HawkesBlue", "Value": "#E2DEEF" }

        ];

        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };
        $scope.active_user = {},
        $scope.FilteredUserCol = [];
        $scope.KnownUserCol = [];
        $scope.BlockedUserCol = [];
        $scope.UnKnownUserCol = [];
        $scope.FilteredUserCol[$scope.letter] = [];
        $scope.KnownUserCol[$scope.letter] = [];
        $scope.BlockedUserCol[$scope.letter] = [];
        $scope.UnKnownUserCol[$scope.letter] = [];
        $scope.ActivePeopleTab = "active";
        $scope.weakDays = ['M', 'Tu', 'W', 'Th', 'F'];
        $scope.active_user.days = [];
        $scope.cuisines = [];
        $scope.letters = ["A", "B", "C", "D", "E", "F",
         "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

        // $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

        $scope.users = [];
        $scope.usersAlpha = [];
        $scope.restaurants = [];
        /* MAP */
        $scope.finder = {};
        $scope.finder.zoom = 12;
        $scope.finder.plotaddress = "Singapore";
        $scope.finder.locations = [];
        $scope.notification = {};
        $scope.notification.position = 'top';
        $scope.notification.type = 'bar';
        $scope.daterange = { startDate: null, endDate: null };


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
                        searchrestaurants.push({ "POSTCODE": restdata[r].name + "," + restdata[r].address.replace("#", "") + ' Singapore' });
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
                               console.log('getLoggedInUser');
                               if (data) {                                 
                                   $scope.active_user = data;                                  
                                   var companyid = data.companyid;

                                   if (data.linkedin != "") {
                                       $scope.active_user.showlinkedBtn = true;
                                   }
                                   else {
                                       $scope.active_user.showlinkedBtn = false;
                                   }

                                   if (data.mobilephone != "") {
                                       $scope.active_user.ShowMobileNum = true;
                                   }
                                   else {
                                       $scope.active_user.ShowMobileNum = false;
                                   }

                                   if (typeof ($scope.active_user.isRegistered) == "undefined") {
                                       $scope.active_user.isRegistered = false;
                                   }
                                  
                                   if (!$scope.active_user.isRegistered) {
                                      
                                           var regStep = $scope.active_user.registerStep;
                                           switch (regStep)
                                           {
                                               case "EditProfile":
                                                   $scope.ActiveTab = regStep;
                                                   break;
                                               case "Cuisine":
                                                   $scope.ActiveTab = regStep;
                                                   $scope.IsCuisineActive = true;
                                                   $scope.IsPeopleActive = false;
                                                   break;
                                               case "People":
                                                   $scope.ActiveTab = regStep;
                                                   $scope.IsCuisineActive = true;
                                                   $scope.IsPeopleActive = true;
                                                   break;
                                               default:
                                                   $scope.ActiveTab = "EditProfile";
                                                   break;
                                           }                                       
                                   }

                                   if (typeof (data.days) != "undefined" && data.days != null) {
                                       angular.forEach(data.days, function (value) {
                                           var keepGoing = true;
                                           var lblId = $("#lbl_" + value);
                                           angular.forEach($scope.weakDays, function (weakday) {
                                               if (typeof ($scope.active_user.days) == "undefined") {
                                                   $scope.active_user.days = [];
                                               }
                                               if (typeof ($scope.active_user.days) != "undefined") {
                                                   var idx = $scope.active_user.days.indexOf(value);
                                                   if (keepGoing) {
                                                       if (value == weakday) {

                                                           lblId.addClass("active");
                                                           keepGoing = false;
                                                       }

                                                   }



                                               }
                                           });

                                       });
                                   }
                                   resetMap();

                                   //  resetMap();
                                   $scope.active_user.active = 0;
                                   $http.get("/api/users")
                                     .success(function (data) {

                                         $scope.users = data;
                                         console.log(data);
                                         console.log('---data---');
                                         // Initializing Alpha
                                         for (var i = 0; i < $scope.letters.length; i++)
                                             $scope.usersAlpha[$scope.letters[i]] = [];

                                         for (var i = 0; i < data.length; i++) {                                            
                                             if (companyid == data[i].companyid)
                                                 $scope.active_user.active = ($scope.active_user.active - 0) + (1 - 0);
                                             console.log(data[i].name[0].toUpperCase())
                                             if (typeof $scope.usersAlpha[data[i].name[0].toUpperCase()] != 'undefined')
                                                 $scope.usersAlpha[data[i].name[0].toUpperCase()].push(data[i]);
                                             
                                             if (typeof (data[i].linkedin) != "undefined" && data[i].linkedin != "") {
                                                 data[i].showlinkedBtn = true;
                                             }
                                             else {
                                                 data[i].showlinkedBtn = false;
                                             }
                                             if (typeof (data[i].mobilephone) != "undefined" && data[i].mobilephone != "") {
                                                 data[i].ShowMobileNum = true;
                                             }
                                             else if (typeof (data[i].phone) != "undefined" && data[i].phone != "") {
                                                 data[i].ShowMobileNum = false;
                                             }
                                             //debugger;
                                             //if (data[i].known.length != 0) {
                                             //    debugger;
                                                 
                                             //}
                                             data[i].DegreeofConnectedness = parseFloat(data[i].known.length) / parseFloat(data.length);
                                         }

                                         var auser = $scope.usersAlpha['A']
                                         $scope.allUsers = auser;

                                         $scope.filteredUsers = auser;

                                         if (typeof $scope.active_user.known == 'undefined')
                                             $scope.active_user.known = 0;
                                         if (typeof $scope.active_user.active == 'undefined')
                                             $scope.active_user.active = 0;
                                         if (typeof $scope.active_user.blocked == 'undefined')
                                             $scope.active_user.blocked = 0;
                                         if (typeof $scope.active_user.unknown == 'undefined')
                                             $scope.active_user.unknown = 0;

                                         console.log($scope.active_user.known);                                        
                                         var active = 0, known = 0, blocked = 0, unknown = 0,connectedNess=0;
                                         if (!isNaN($scope.active_user.active) && $scope.active_user.active != 0) {
                                             active = $scope.active_user.active;
                                         }
                                         if (!isNaN($scope.active_user.known.length) && $scope.active_user.known.length != 0) {
                                             known = $scope.active_user.known.length;
                                             connectedNess = parseFloat(known - 0) / parseFloat(data.length - 0);
                                         }
                                         if (!isNaN($scope.active_user.blocked.length) && $scope.active_user.blocked.length != 0) {
                                             blocked = $scope.active_user.blocked.length;
                                         }
                                         unknown = active - known - blocked;
                                         // $scope.active_user.unknown = parseInt($scope.active_user.active - 0) - parseInt($scope.active_user.known - 0) - parseInt($scope.active_user.blocked - 0);
                                         $scope.active_user.unknown = unknown;
                                         $scope.currentPage = 1;
                                         $scope.numPerPage = 4;
                                         $scope.DegreeofConnectedness = connectedNess;
                                         $scope.filerUser('A');
                                     })
                                     .error(function (data) {
                                         console.log("Error:" + data);
                                     });

                               }
                               else
                                   console.log("User is not logged in.");
                               //  $scope.$apply();
                           })
                           .error(function (data) {
                               console.log("Error:" + data);
                           });
        }
        resetUser();


        $scope.addToKnown = function (uid) {

            //if ($scope.exists(uid, $scope.users))
            //    $scope.toggle(uid, users);
            console.log(uid);
            var found = $filter('filter')($scope.users, { _id: $scope.active_user._id }, true);
            if (found.length) {
                //  $scope.selected = JSON.stringify(found[0]);
                console.log(found);
                var knownuser = $filter('filter')($scope.users, { _id: uid }, true);
                found[0].known.push(uid);

                var blockedId = found[0].blocked.indexOf(uid);
                if (blockedId > -1) {
                    found[0].blocked.splice(blockedId, 1);
                    if (typeof ($scope.active_user.blocked) != "undefined") {
                        $scope.active_user.blocked.length = $scope.active_user.blocked.length - 1;
                    }
                    if ($scope.ActivePeopleTab == "unknown") {
                        $scope.active_user.unknown = $scope.active_user.unknown - 1;
                    }
                    console.log("User was blocked but has now been known");
                }

                $http.get("/api/knownUserbyid?user=" + $scope.active_user._id + "&known=" + uid)
       .success(function (data) {
           console.log("Success:" + data);
           //increase known count
           if (typeof ($scope.active_user.known) != "undefined") {
               $scope.active_user.known.length = $scope.active_user.known.length + 1;  }
          
           if (typeof ($scope.filteredUsers) != "undefined" && ($scope.ActivePeopleTab == "known" || $scope.ActivePeopleTab == "unknown")) {
              
               var index = $scope.filteredUsers.indexOf(uid);
               $scope.filteredUsers.splice(index, 1);
           }
       })
       .error(function (data) {
           console.log("Error:" + data);
       });
            } else {
                // $scope.selected = 'Not found';
                console.log('Not found');
            }

        };



        $scope.getIncludeFile = function () {
            // Make this more dynamic, but you get the idea
            return 'templates/user_card.html';
        }

        $scope.filerUser = function (letter, searchUserName) {

            var alusers = $scope.allUsers;
            $scope.searchText = "";
            $scope.letter = letter;
            switch ($scope.ActivePeopleTab) {
                case 'active':
                    if (typeof ($scope.FilteredUserCol[letter]) != "undefined" && $scope.FilteredUserCol[letter].length > 0) {
                        $scope.usersAlpha[letter] = $scope.FilteredUserCol[letter];
                    }
                    break;
                case 'known':
                    $scope.usersAlpha[letter] = $scope.KnownUserCol[letter];

                    break;
                case 'unknown':
                    $scope.usersAlpha[letter] = $scope.UnKnownUserCol[letter];
                    break;
                case 'blocked':
                    $scope.usersAlpha[letter] = $scope.BlockedUserCol[letter];
                    break;
                default:

            }

            //remove class and set active class on selected letter
            $(".list_line li").removeClass("active");
            $("#li_" + letter).addClass("active");
            var auser = $scope.usersAlpha[letter];
            $scope.filteredUsers = auser;
            //for search
            if (typeof (searchUserName) != "undefined" && searchUserName != "") {
                $scope.searchText = searchUserName;
            }
            $scope.currentPage = 1;
            $scope.numPerPage = 4;
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
            , end = begin + $scope.numPerPage;
            $scope.currentNumberPage = Math.ceil(auser.length / $scope.numPerPage);
            $scope.filteredUsers = auser.slice(begin, end);

        }
        $scope.FilteredUser = function (status) {
            $scope.filteredUsers = [];
            $scope.ActivePeopleTab = "";
            for (var i = 0; i < $scope.letters.length; i++) {
                $scope.KnownUserCol[$scope.letters[i]] = [];
                $scope.UnKnownUserCol[$scope.letters[i]] = [];
                $scope.BlockedUserCol[$scope.letters[i]] = [];
                $scope.FilteredUserCol[$scope.letters[i]] = [];
            }

            for (var i = 0; i < $scope.users.length; i++) {

                //   console.log(data[i].name[0].toUpperCase())

                if (status == "known") {

                    if (typeof $scope.KnownUserCol[$scope.users[i].name[0].toUpperCase()] != 'undefined') {
                        if ($scope.isKnown($scope.users[i]._id)) {
                            $scope.KnownUserCol[$scope.users[i].name[0].toUpperCase()].push($scope.users[i]);
                        }
                    }
                    $scope.ActivePeopleTab = "known";
                }
                if (status == "unknown") {
                    if (typeof $scope.UnKnownUserCol[$scope.users[i].name[0].toUpperCase()] != 'undefined') {
                        if (!$scope.isBlocked($scope.users[i]._id) && !$scope.isKnown($scope.users[i]._id)) {
                            $scope.UnKnownUserCol[$scope.users[i].name[0].toUpperCase()].push($scope.users[i]);
                        }
                    }
                    $scope.ActivePeopleTab = "unknown";
                }
                if (status == "blocked") {
                    if (typeof $scope.BlockedUserCol[$scope.users[i].name[0].toUpperCase()] != 'undefined') {
                        if ($scope.isBlocked($scope.users[i]._id)) {
                            $scope.BlockedUserCol[$scope.users[i].name[0].toUpperCase()].push($scope.users[i]);
                        }
                    }
                    $scope.ActivePeopleTab = "blocked";
                }
                if (status == "active") {
                    if (typeof $scope.FilteredUserCol[$scope.users[i].name[0].toUpperCase()] != 'undefined') {

                        $scope.FilteredUserCol[$scope.users[i].name[0].toUpperCase()].push($scope.users[i]);

                    }
                    $scope.ActivePeopleTab = "active";
                }

            }
            if (typeof ($scope.searchText) != "undefined" && $scope.searchText != "") {
                $scope.filerUser($scope.letter, $scope.searchText);
            }
            else {
                $scope.filerUser($scope.letter, '');
            }

        }
        $scope.SearchUser = function () {
            $scope.filteredUsers = [];
            $scope.filerUser($scope.letter, $scope.searchText);
        }
        $scope.daysSelection = function daysSelection(day) {
            $scope.active_user.isDaysUpdated = true;
            if (typeof ($scope.active_user.days) == "undefined") {
                $scope.active_user.days = [];
            }
            if (typeof ($scope.active_user.days) != "undefined") {
                var idx = $scope.active_user.days.indexOf(day);

                // is currently selected
                if (idx > -1) {
                    $scope.active_user.days.splice(idx, 1);

                }
                    // is newly selected
                else {

                    $scope.active_user.days.push(day);
                }
            }

        };

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
                if ($scope.active_user.registerStep == "People") {
                    $scope.UpdateCuisine(1);
                }
               
            }
        };

        $scope.exists = function (item, list) {

            ////console.log("exists");
            if (list)
                return list.indexOf(item) > -1;
            else
                return false;
        };
        $scope.existsCuisine = function (item, list) {
            
            ////console.log("exists");
            if (list)
                return list.indexOf(item) > -1;
            else
                return false;

        };


        $scope.addToBlocked = function (uid) {

            //if ($scope.exists(uid, $scope.active_user.known))
            //    $scope.toggle(uid, $scope.active_user.known);

            //$scope.toggle(uid, $scope.active_user.blocked);
            console.log(uid);
            var found = $filter('filter')($scope.users, { _id: $scope.active_user._id }, true);
            console.log(found);
            if (found.length) {
                //  $scope.selected = JSON.stringify(found[0]);
                var blockuser = $filter('filter')($scope.users, { _id: uid }, true);
                found[0].blocked.push(uid);

                var knownId = found[0].known.indexOf(uid);
                if (knownId > -1) {
                    found[0].known.splice(knownId, 1);
                    console.log("User was known but has now been blocked");
                    if (typeof ($scope.active_user.known) != "undefined") {
                        $scope.active_user.known.length = $scope.active_user.known.length - 1;
                       
                    }
                    if ($scope.ActivePeopleTab == "unknown") {
                        $scope.active_user.unknown = $scope.active_user.unknown - 1;
                    }
                }

                $http.get("/api/blockUserbyid?user=" + $scope.active_user._id + "&block=" + uid)
         .success(function (data) {
             console.log("Success:" + data);
             //increase blocked count
             if (typeof ($scope.active_user.blocked) != "undefined") {
                 $scope.active_user.blocked.length = $scope.active_user.blocked.length + 1;
                
                 if (typeof ($scope.filteredUsers) != "undefined" && ($scope.ActivePeopleTab == "blocked" || $scope.ActivePeopleTab=="unknown")) {
                     var index = $scope.filteredUsers.indexOf(uid);
                     $scope.filteredUsers.splice(index, 1);
                 }
             }
         })
         .error(function (data) {
             console.log("Error:" + data);
         });

                console.log('found');

            } else {
                // $scope.selected = 'Not found';
                console.log('Not found');
            }

        };

        $scope.isBlocked = function (uid) {           
            var found = $filter('filter')($scope.users, { _id: $scope.active_user._id }, true);
            if (found.length) {

                var blockUser = found[0].blocked.indexOf(uid);
                if (blockUser > -1)
                    return true;
                else
                    return false;
            } else {
                return false;
            }
        };

        $scope.isKnown = function (uid) {
            var found = $filter('filter')($scope.users, { _id: $scope.active_user._id }, true);           
            if (found.length) {
                var knownUser = found[0].known.indexOf(uid);
                if (knownUser > -1)
                    return true;
                else
                    return false;
            } else {
                return false;
            }
        };

        $scope.updateUserPicture = function (new_url) {         
            $scope.active_user.picture = new_url;
            //$scope.$parent.loggedInUser.picture = new_url;
            // console.log("Picture updated", $scope.$parent.loggedInUser.picture);
        }
        $scope.SelectAllCuisine = function () {

            angular.forEach($scope.cuisines, function (cuisine) {

                var idx = $scope.active_user.cuisine.indexOf(cuisine);
                if (idx > -1) {
                    //  list.splice(idx, 1);
                }
                else {
                    $scope.active_user.cuisine.push(cuisine);
                }


            });
            if ($scope.active_user.registerStep == "People") {
                $scope.UpdateCuisine(1);
            }
           
           
        };
        $scope.updateUser = function () {

            if ($scope.active_user.blocked == null)
                $scope.active_user.blocked = [];
            if ($scope.active_user.known == null)
                $scope.active_user.known = [];
            if ($scope.active_user.cuisine == null)
                $scope.active_user.cuisine = [];
            if ($scope.active_user.available == null)
                $scope.active_user.available = [];

            if ($scope.active_user.days == null)
                $scope.active_user.days = [];

            if (typeof ($scope.active_user.newpassword) != "undefined" && $scope.active_user.newpassword != "") {
                $scope.active_user.password = $scope.active_user.newpassword;
            }
            else {
                $scope.active_user.password = $scope.active_user.password;
            }
            // active_user.vocationFrom, active_user.vocationTo
            if (typeof ($scope.active_user.vocationFrom) != "undefined" && typeof ($scope.active_user.vocationTo) != "undefined") {
                if (new Date($scope.active_user.vocationFrom) > new Date($scope.active_user.vocationTo)) {
                    $scope.errMessage = 'Vocation To Date should be greater than Vocation From date';
                    return false;
                }
            }


            console.log($scope.active_user);
            $('#spinner').show();
            if (!$scope.active_user.isVocationPeriod) {               
                $scope.active_user.vocationFrom = null;
                $scope.active_user.vocationTo = null;
            }
           
            if ($scope.ActiveTab == "EditProfile") {
                $scope.active_user.registerStep = "Cuisine";
            }
           // var btnText = $("#btnSubmit").val();
            $.post('/api/editUser', $scope.active_user, function (data, status, xhr) {

                console.log($scope.active_user, status);
             //   var btnText = $("#btnSubmit").val();
                if (typeof ($scope.active_user.newpassword) != "undefined" && $scope.active_user.newpassword != "") {
                    $scope.active_user.newpassword = "";
                    $scope.active_user.confirmpassword = "";
                }
                if ($scope.ActiveTab == "EditProfile") {
                    //debugger;
                    //$scope.active_user.registerStep = "Cuisine";
                    resetUser();
                }
                else {
                    $('body').pgNotification({
                        style: 'bar',
                        message: "User profile updated successfully.",
                        position: $scope.notification.position,
                        timeout: 0,
                        type: "success"
                    }).show();
                }
               

            })
        };

        $scope.$watch('active_user.vocationTo', function (newValue, oldValue) {

            if (typeof (newValue) != "undefined") {
                $scope.active_user.vocationTo = $filter('date')(newValue, 'MM/dd/yyyy');
            }

        });


        $scope.$watch('active_user.vocationFrom', function (newValue, oldValue) {
            if (typeof (newValue) != "undefined") {
                $scope.active_user.vocationFrom = $filter('date')(newValue, 'MM/dd/yyyy');
            }
        });

        $scope.navClass = function () {

            var name = $scope.active_user.cardColor;
            // $scope.active_user.CardColorValue = value;

            if (typeof (name) != "undefined") {
                var objColor = $filter('filter')($scope.CardColors, { "Name": name })[0];
                $scope.active_user.CardColorValue = objColor.Value;
                $("#" + name).addClass("active");
            }


        };
        $scope.SetCardColor = function (colorName, colorValue) {

            angular.forEach($scope.CardColors, function (key, value) {

                if (key.Name == colorName) {
                    $("#" + colorName).addClass("active");

                    $scope.active_user.cardColor = colorName;
                    $scope.active_user.CardColorValue = colorValue;
                }
                else {
                    $("#" + key.Name).removeClass("active");
                }
            });
        }
       
        $scope.checkErr = function (fromDate, toDate) {
            $scope.errMessage = '';
            var curDate = new Date();

            if (new Date(fromDate) > new Date(toDate)) {
                $scope.errMessage = 'Vocation To Date should be greater than Vocation From date';
                return false;
            }
            //if (new Date(startDate) < curDate) {
            //    $scope.errMessage = 'Start date should not be before today.';
            //    return false;
            //}
        };
        $scope.UpdateCuisine = function (regVal) {           
            if (regVal == 0) {
                $scope.active_user.registerStep = "People";
            }
            if (regVal == 2) {
                $scope.active_user.isRegistered = true;
            }
            $.post('/api/editUser', $scope.active_user, function (data, status, xhr) {               
                if (regVal == 0 || regVal==2) {
                    resetUser();
                }
                console.log($scope.active_user, status);
            })
        }
       
        //$scope.UpdateChip = function () {
        //    alert("ok");
        //}
        //$scope.$watch('active_user.cuisine', function (newValue, oldValue) {
        //    // alert("ok");
        //    alert("ok");
        //    if (typeof (newValue) != "undefined") {
        //        // $scope.active_user.vocationFrom = $filter('date')(newValue, 'MM/dd/yyyy');
        //        alert("ok");
        //    }
        //});
       
    }]);



