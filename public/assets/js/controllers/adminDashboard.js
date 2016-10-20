'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller("AdminDashboardCtrl", function ($scope, $http, DTOptionsBuilder, DTColumnDefBuilder) {
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
        $scope.notification = {};
        $scope.notification.position = 'top';
        $scope.notification.type = 'bar';
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
        //$scope.dtOptions2 = DTOptionsBuilder.newOptions().withDOM('lpfrtip').withPaginationType('full_numbers').withButtons([
        //  'copy',
        //  'print',
        //  'pdf',
        //  'csv',
        //  {
        //      text: 'EXCEL',
        //      key: '1',
        //      action: function (e, dt, node, config) {
        //          exportData();
        //      }
        //  }
        //]);
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
        var _format2 = function (d) {
            // `d` is the original data object for the row
            return '<div class="col-sm-5"><table class="table table-inline table01">' +


                '<tr>' +
                '<td width="20%">Address :</td>' +
                '<td>32, Abc , 02727   </td>' +

                '</tr>' +

                '<tr>' +


				'<td width="20%">Cuisine :</td>' +
                '<td>Cuisine, Cuisine1, Cuisine2, Cuisine3, Cuisine4, Cuisine5</td>' +
                '</tr>' +

                '<tr>' +
                '<td width="20%">Veg :</td>' +
                '<td>true</td>' +

                '</tr>' +
                '<tr>' +

				 '<td width="20%">Halal :</td>' +
                '<td>false</td>' +

                '</tr>' +

                   '<tr>' +


				'<td width="20%">code :</td>' +
                '<td>02154</td>' +
                '</tr>' +

				   '<tr>' +


				 '<td width="20%">Phone :</td>' +
                '<td>9988665522</td>' +
                '</tr>' +

                 '<td width="20%">Price :</td>' +
                '<td>500</td>' +

                '</tr>' +

				'<tr>' +

				 '<td width="20%">Zip :</td>' +
                '<td>87878</td>' +

                '</tr>' +
				'<tr>' +

					'<td width="20%">Total :</td>' +
                '<td>500</td>' +




                '</tr>' +
                '</table></div><div class="col-sm-7"><table class="table table-inline  table02">' +
				'<tr>' +
                '<td colspan="5"><h4>Create New Discount</h4></td>' +
                '</tr>' +

				'<tr class="min_headeing">' +
                '<td>Discount Type</td>' +
				'<td>Amount</td>' +
				'<td>Start Date</td>' +
				'<td>End Date</td>' +
				'<td></td>' +
                '</tr>' +

				'<tr>' +
                '<td><select class="form-control"><option>%age</option><option>Fixed</option></select></td>' +
				'<td><input type="text" placeholder="30" class="form-control" /></td>' +
				'<td> <div style="position: relative;bottom: 9px;" class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><div class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><a ui-sref="#" class="btn btn-primary w100p"><i class="fa fa-plus"></i>Add </a></td>' +
                '</tr>' +

				'<tr>' +
                '<td colspan="5"><h4> Existing Discount</h4></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="3">30% from 12 Sep 2016 to 14 Oct 2016</td>' +
                '<td colspan="2"><div class="actionbtn"><button class="btn btn-success" type="button" title="Edit User"><i class="fa fa-pencil"></i></button> <button type="button" class="btn btn-primary" title="Pause User"><i class="fa fa-pause"></i></button><button class="btn btn-danger" type="button" title="Remove User"><i class="fa fa-trash-o"></i></button></div></td>' +
				'</tr>' +
                '</table></div>';

        }
        var _format = function (d) {
            // `d` is the original data object for the row
            return '<table class="table table-inline table01">' +
                '<tr>' +
                '<td width="25%">Total User</td>' +
                '<td>180</td>' +


                '</tr>' +

                '<tr>' +

				'<td width="25%">Active User</td>' +
                '<td>38</td>' +

                '</tr>' +
                '<tr>' +
                '<td width="25%">Lunches this week</td>' +
                '<td>12</td>' +

                '</tr>' +
                '<tr>' +

				'<td width="25%">Total Lunches</td>' +
                '<td>44</td>' +
                '</tr>' +


                '</table>';
        }



        var table = $('#detailedTable');
        $scope.expand = function (event) {

            var element = event.currentTarget;
            if ($(element).parents('tr').hasClass('shown') && $(element).parents('tr').next().hasClass('row-details')) {
                $(element).parents('tr').removeClass('shown');
                $(element).parents('tr').next().remove();
                return;
            }
            var tr = $(element).closest('tr');
            var row = table.DataTable().row(tr);
            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).parents('tbody').find('.row-details').remove();

            row.child(_format(row.data())).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }
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
            debugger;
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
          //  debugger;
            if ($scope.isEdit == false) {
                debugger;
                $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
                $.post('/api/addCompany', $scope.newcompany, function (data, status, xhr) {
                    debugger;

                    $scope.$apply(function () {
                        $scope.companies.push($scope.newcompany);
                    });
                    $('body').pgNotification({
                        style: 'bar',
                        message: "Company added successfully.",
                        position: $scope.notification.position,
                        timeout: 0,
                        type: "success"
                    }).show();
                    resetCompanies();
                });
            }
            else {
                var i = $scope.editIndex;
                var _t = $scope.companies[i];
                $scope.newcompany = { 'name': $scope.newcompany.name, 'country': $scope.newcompany.country, 'city': $scope.newcompany.city, 'branchname': $scope.newcompany.branchname, 'regdate': $scope.newcompany.regdate, 'id': _t._id, 'isdisable': false, 'logo': $scope.active_companypicture, 'userunitprice': $scope.newcompany.userunitprice };
                console.log($scope.newcompany);
                $.post('/api/updateCompany', $scope.newcompany, function (data, status, xhr) {
                  //  debugger;
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
        $scope.refreshTest = function (portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function () {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }
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
                         debugger;
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
        var table = $('#detailedTable');

        // Add event listener for opening and closing details
        $scope.expand = function (event) {

            var element = event.currentTarget;
            if ($(element).parents('tr').hasClass('shown') && $(element).parents('tr').next().hasClass('row-details')) {
                $(element).parents('tr').removeClass('shown');
                $(element).parents('tr').next().remove();
                return;
            }
            var tr = $(element).closest('tr');
            var row = table.DataTable().row(tr);

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).parents('tbody').find('.row-details').remove();

            row.child(_format(row.data())).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }
        var _format = function (d) {
            // `d` is the original data object for the row
            return '<table class="table table-inline table01">' +
                '<tr>' +
                '<td width="25%">Total User</td>' +
                '<td>180</td>' +


                '</tr>' +

                '<tr>' +

				'<td width="25%">Active User</td>' +
                '<td>38</td>' +

                '</tr>' +
                '<tr>' +
                '<td width="25%">Lunches this week</td>' +
                '<td>12</td>' +

                '</tr>' +
                '<tr>' +

				'<td width="25%">Total Lunches</td>' +
                '<td>44</td>' +
                '</tr>' +


                '</table>';
        }

        var _format2 = function (d) {
            // `d` is the original data object for the row
            return '<div class="col-sm-5"><table class="table table-inline table01">' +


                '<tr>' +
                '<td width="20%">Address :</td>' +
                '<td>32, Abc , 02727   </td>' +

                '</tr>' +

                '<tr>' +


				'<td width="20%">Cuisine :</td>' +
                '<td>Cuisine, Cuisine1, Cuisine2, Cuisine3, Cuisine4, Cuisine5</td>' +
                '</tr>' +

                '<tr>' +
                '<td width="20%">Veg :</td>' +
                '<td>true</td>' +

                '</tr>' +
                '<tr>' +

				 '<td width="20%">Halal :</td>' +
                '<td>false</td>' +

                '</tr>' +

                   '<tr>' +


				'<td width="20%">code :</td>' +
                '<td>02154</td>' +
                '</tr>' +

				   '<tr>' +


				 '<td width="20%">Phone :</td>' +
                '<td>9988665522</td>' +
                '</tr>' +

                 '<td width="20%">Price :</td>' +
                '<td>500</td>' +

                '</tr>' +

				'<tr>' +

				 '<td width="20%">Zip :</td>' +
                '<td>87878</td>' +

                '</tr>' +
				'<tr>' +

					'<td width="20%">Total :</td>' +
                '<td>500</td>' +




                '</tr>' +
                '</table></div><div class="col-sm-7"><table class="table table-inline  table02">' +
				'<tr>' +
                '<td colspan="5"><h4>Create New Discount</h4></td>' +
                '</tr>' +

				'<tr class="min_headeing">' +
                '<td>Discount Type</td>' +
				'<td>Amount</td>' +
				'<td>Start Date</td>' +
				'<td>End Date</td>' +
				'<td></td>' +
                '</tr>' +

				'<tr>' +
                '<td><select class="form-control"><option>%age</option><option>Fixed</option></select></td>' +
				'<td><input type="text" placeholder="30" class="form-control" /></td>' +
				'<td> <div style="position: relative;bottom: 9px;" class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><div class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><a ui-sref="#" class="btn btn-primary w100p"><i class="fa fa-plus"></i>Add </a></td>' +
                '</tr>' +

				'<tr>' +
                '<td colspan="5"><h4> Existing Discount</h4></td>' +
                '</tr>' +
                '<tr>' +
                '<td colspan="5"><table class="table table-striped dataTable no-footer"><tr><th>Discount</th><th>Start Date</th><th>End Date</th><th>Action</th></tr><tr><td>30%</td><td>12 Sep 2016</td><td>14 Oct 2016</td><td><div class="actionbtn"><button class="btn btn-success" type="button" title="Edit User"><i class="fa fa-pencil"></i></button> <button type="button" class="btn btn-primary" title="Pause User"><i class="fa fa-pause"></i></button><button class="btn btn-danger" type="button" title="Remove User"><i class="fa fa-trash-o"></i></button></div></td></tr><table> </td>' +

				'</tr>' +
                '</table></div>';

        }



        var _format3 = function (d) {
            // `d` is the original data object for the row
            return '<div class="col-sm-5"><table class="table table-inline table01">' +


                '<tr>' +
                '<td width="20%">Address :</td>' +
                '<td>32, Abc , 02727   </td>' +

                '</tr>' +

                '<tr>' +


				'<td width="20%">Cuisine :</td>' +
                '<td>Cuisine, Cuisine1, Cuisine2, Cuisine3, Cuisine4, Cuisine5</td>' +
                '</tr>' +

                '<tr>' +
                '<td width="20%">Veg :</td>' +
                '<td>true</td>' +

                '</tr>' +
                '<tr>' +

				 '<td width="20%">Halal :</td>' +
                '<td>false</td>' +

                '</tr>' +

                   '<tr>' +


				'<td width="20%">code :</td>' +
                '<td>02154</td>' +
                '</tr>' +

				   '<tr>' +


				 '<td width="20%">Phone :</td>' +
                '<td>9988665522</td>' +
                '</tr>' +

                 '<td width="20%">Price :</td>' +
                '<td>500</td>' +

                '</tr>' +

				'<tr>' +

				 '<td width="20%">Zip :</td>' +
                '<td>87878</td>' +

                '</tr>' +
				'<tr>' +

					'<td width="20%">Total :</td>' +
                '<td>500</td>' +




                '</tr>' +
                '</table></div><div class="col-sm-7"><table class="table table-inline  table02">' +
				'<tr>' +
                '<td colspan="5"><h4>Create New Discount</h4></td>' +
                '</tr>' +

				'<tr class="min_headeing">' +
                '<td>Discount Type</td>' +
				'<td>Amount</td>' +
				'<td>Start Date</td>' +
				'<td>End Date</td>' +
				'<td></td>' +
                '</tr>' +

				'<tr>' +
                '<td><select class="form-control"><option>%age</option><option>Fixed</option></select></td>' +
				'<td><input type="text" placeholder="30" class="form-control" /></td>' +
				'<td> <div style="position: relative;bottom: 9px;" class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><div class="input-group date" id="datepicker-component"><input type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span></div></td>' +
				'<td><a ui-sref="#" class="btn btn-primary w100p"><i class="fa fa-plus"></i>Add </a></td>' +
                '</tr>' +


                '</table></div>';

        }


        var table2 = $('#detailedTable2');
        $scope.expand2 = function (event) {

            var element = event.currentTarget;

            if ($(element).parents('tr').hasClass('shown') && $(element).parents('tr').next().hasClass('row-details')) {
                $(element).parents('tr').removeClass('shown');
                $(element).parents('tr').next().remove();
                return;
            }
            var tr = $(element).closest('tr');
            var row = table2.DataTable().row(tr);

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).parents('tbody').find('.row-details').remove();

            row.child(_format2(row.data())).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }

        $scope.expand3 = function (event) {

            var element = event.currentTarget;

            if ($(element).parents('tr').hasClass('shown') && $(element).parents('tr').next().hasClass('row-details')) {
                $(element).parents('tr').removeClass('shown');
                $(element).parents('tr').next().remove();
                return;
            }
            var tr = $(element).closest('tr');
            var row = table2.DataTable().row(tr);

            $(element).parents('tbody').find('.shown').removeClass('shown');
            $(element).parents('tbody').find('.row-details').remove();

            row.child(_format3(row.data())).show();
            tr.addClass('shown');
            tr.next().addClass('row-details');
        }

        // Widget-4
        // Widget-4
        $scope.widget_4_options = {
            chart: {
                type: 'lineChart',
                x: function (d) {
                    return d[0]
                },
                y: function (d) {
                    return d[1] / 100
                },
                margin: {
                    top: 60,
                    right: -10,
                    bottom: -10,
                    left: -10
                },
                color: [
                    $.Pages.getColor('success')

                ],
                useInteractiveGuideline: true,
                forceY: [0, 2],
                showLegend: false,
                transitionDuration: 500
            }
        }

        // Widget-8
        $scope.widget_8_options = {
            chart: {
                type: 'lineChart',
                x: function (d) {
                    return d[0]
                },
                y: function (d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: -13,
                    left: -10
                },
                color: [
                    '#000'

                ],
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                useInteractiveGuideline: false
            }
        }

        // Widget-7
        $scope.widget_7_options = {
            chart: {
                type: 'lineChart',
                x: function (d) {
                    return d[0]
                },
                y: function (d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: 20,
                    left: -10
                },
                color: [
                    '#fff'

                ],
                showXAxis: false,
                showYAxis: false,
                showLegend: false,
                useInteractiveGuideline: false
            }
        }

        // Widget-12
        $scope.widget_12_options = {
            chart: {
                type: 'lineChart',
                x: function (d) {
                    return d[0]
                },
                y: function (d) {
                    return d[1]
                },
                margin: {
                    left: 30,
                    bottom: 35
                },
                color: [
                    $.Pages.getColor('success'),
                    $.Pages.getColor('danger'),
                    $.Pages.getColor('primary'),
                    $.Pages.getColor('complete'),

                ],
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%a')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                },
                showLegend: false,
                useInteractiveGuideline: true,
            }
        }

        // Widget-16
        $scope.widget_16_options = {
            chart: {
                type: 'lineChart',
                x: function (d) {
                    return d[0]
                },
                y: function (d) {
                    return d[1]
                },
                margin: {
                    top: 10,
                    right: -10,
                    bottom: 10,
                    left: -10
                },
                color: [
                    '#27cebc'

                ],
                xAxis: {
                    tickFormat: function (d) {
                        return d3.time.format('%a')(new Date(d))
                    }
                },
                yAxis: {
                    tickFormat: d3.format('d')
                },
                showLegend: false,
                showXAxis: false,
                showYAxis: false,
                useInteractiveGuideline: true,
            }
        }

        // Widget-5
        $scope.options1 = {
            renderer: 'bar'
        };

        $scope.series1 = [{
            name: 'Series 1',
            data: [{
                x: 0,
                y: 10
            }, {
                x: 1,
                y: 8
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 9
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 8
            }, {
                x: 6,
                y: 10
            }],
            color: $.Pages.getColor('danger')
        }, {
            name: 'Series 2',
            data: [{
                x: 0,
                y: 0
            }, {
                x: 1,
                y: 2
            }, {
                x: 2,
                y: 5
            }, {
                x: 3,
                y: 1
            }, {
                x: 4,
                y: 5
            }, {
                x: 5,
                y: 2
            }, {
                x: 6,
                y: 0
            }],
            color: $.Pages.getColor('master-light')
        }];


        // Widget-14
        var widget_14_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(50);
        for (var i = 0; i < 50; i++) {
            random.addData(widget_14_seriesData);
        }

        $scope.widget_14_options = {
            renderer: 'area'

        };

        $scope.widget_14_series = [{
            data: widget_14_seriesData[0],
            color: $.Pages.getColor('success-light', .5),
            name: 'DB Server'
        }, {
            data: widget_14_seriesData[1],
            color: $.Pages.getColor('master-light'),
            name: 'Web Server'
        }];

        $scope.widget_14_features = {
            yAxis: {
                tickFormat: function (y) {
                    return y / 10;
                },
                orientation: 'right'
            }
        }


        // Widget-16
        $scope.widget_16_data = [{
            "key": "Site visits",
            "values": [
                [100, 0],
                [150, 8],
                [200, 20],
                [250, 22],
                [300, 30],
                [350, 26],
                [400, 10]
            ]
        }];

        $scope.widget_16_xFunction = function () {
            return function (d) {
                return d[0];
            };
        }
        $scope.widget_16_yFunction = function () {
            return function (d) {
                return d[1];
            };
        }
        $scope.widget_16_colorFunction = function () {
            return function (d, i) {
                return "#27cebc"
            };
        }

        var widget_14_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(50);
        for (var i = 0; i < 50; i++) {
            random.addData(widget_14_seriesData);
        }

        $scope.widget_14_options = {
            renderer: 'area'

        };

        $scope.widget_14_series = [{
            data: widget_14_seriesData[0],
            color: $.Pages.getColor('success-light', .5),
            name: 'DB Server'
        }, {
            data: widget_14_seriesData[1],
            color: $.Pages.getColor('master-light'),
            name: 'Web Server'
        }];

        $scope.widget_14_features = {
            yAxis: {
                tickFormat: function (y) {
                    return y / 10;
                },
                orientation: 'right'
            }
        }

        // Widget-15-chart2
        var widget_15_2_seriesData = [
            [],
            [],
            []
        ];
        var random = new Rickshaw.Fixtures.RandomData(40);
        for (var i = 0; i < 40; i++) {
            random.addData(widget_15_2_seriesData);
        }

        $scope.widget_15_2_options = {
            renderer: 'bar'

        };

        $scope.widget_15_2_series = [{
            data: widget_15_2_seriesData[0],
            color: $.Pages.getColor('complete-light'),
            name: "New users"
        }, {
            data: widget_15_2_seriesData[1],
            color: $.Pages.getColor('master-lighter'),
            name: "Returning users"
        }];

        $scope.widget_15_2_features = {}
        // Manually Destroy LiveTile objects
        $scope.$on('$destroy', function () {
            $('.live-tile').liveTile("destroy");
        });

    });



angular.module('app')
    .directive('widget5Chart', function () {
        return {
            restrict: 'C',
            link: function (scope, el, attrs) {

                var container = '.widget-5-chart';

                var seriesData = [
                    [],
                    []
                ];
                var random = new Rickshaw.Fixtures.RandomData(7);
                for (var i = 0; i < 7; i++) {
                    random.addData(seriesData);
                }

                var graph = new Rickshaw.Graph({
                    element: document.querySelector(container),
                    renderer: 'bar',
                    series: [{
                        data: [{
                            x: 0,
                            y: 10
                        }, {
                            x: 1,
                            y: 8
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 9
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 8
                        }, {
                            x: 6,
                            y: 10
                        }],
                        color: $.Pages.getColor('danger')
                    }, {
                        data: [{
                            x: 0,
                            y: 0
                        }, {
                            x: 1,
                            y: 2
                        }, {
                            x: 2,
                            y: 5
                        }, {
                            x: 3,
                            y: 1
                        }, {
                            x: 4,
                            y: 5
                        }, {
                            x: 5,
                            y: 2
                        }, {
                            x: 6,
                            y: 0
                        }],
                        color: $.Pages.getColor('master-light')
                    }]

                });


                var MonthBarsRenderer = Rickshaw.Class.create(Rickshaw.Graph.Renderer.Bar, {
                    barWidth: function (series) {

                        return 7;
                    }
                });


                graph.setRenderer(MonthBarsRenderer);


                graph.render();


                $(window).resize(function () {
                    graph.configure({
                        width: $(container).width(),
                        height: $(container).height()
                    });

                    graph.render()
                });

                $(container).data('chart', graph);
            }
        };
    });


$('body').on('click', '.mapplic-pin', function (e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});