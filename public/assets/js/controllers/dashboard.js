'use strict';

/* Controllers */

angular.module('app')
    // Chart controller 
    .controller('DashboardCtrl', ['$scope', '$http', '$state', '$timeout', 'clientId', 'DTOptionsBuilder', 'DTColumnDefBuilder', function ($scope, $http, $state, $timeout, clientId, DTOptionsBuilder, DTColumnDefBuilder) {
        $scope.companyusers = [];
        $scope.userkpi = {};
        $scope.isUserEdit = false;
        $scope.userIndex = -1;
       // $scope.newUser = {};
        var oriUser = { 'gender': 1 };
        $scope.user = angular.copy(oriUser);
        $scope.notification = {};
        $scope.notification.position = 'top';
        $scope.notification.type = 'bar';
        function makeRequest(id, callback) {
            $http.get("/api/getuserlastlunch?id=" + id).success(callback);
        }

        function resetForm(form) {
         
                form.$setPristine();
                form.$setUntouched();

                // clear the form
                $scope.user = { 'gender': 1 };
                angular.element(document.querySelector('#testModel')).modal('hide');
            

        };




        var resetUsers = function () {
            
            $http.get("/api/companyusers")
                             .success(function (data) {                              
                                 if (data) {
                                     var iuser = 0;
                                     var companyusrs = [];
                                     makeRequest(data[iuser]._id, function success(result) {                                         
                                         if (result)
                                             data[iuser].lastlunch = result.lastlunch;
                                         else
                                             data[iuser].lastlunch = null;
                                         if (typeof data[iuser].isPause == 'undefined' || data[iuser].isPause == false)
                                             data[iuser].isPause = false;
                                         else
                                             data[iuser].isPause = true;

                                         if (typeof data[iuser].isDisable == 'undefined' || data[iuser].isDisable == false)
                                             companyusrs.push(data[iuser]); 

                                         iuser = iuser + 1;
                                         var nextURL = data[iuser];
                                         if (nextURL) {
                                             makeRequest(nextURL._id, success);
                                         }
                                         else
                                         {                                            
                                             $scope.companyusers = companyusrs;
                                             var startdate = new Date();
                                             startdate.setDate(startdate.getDate() - 21);
                                             var enddate = new Date();
                                             //   enddate.setDate(startdate.getDate() + 14);
                                             var companyid = 0;
                                             var totallunches = 0;
                                             var lunchesweek = 0;
                                             $.post("/api/getpathlength?id=" + companyid, { 'startdate': startdate, 'enddate': enddate }, function (data, status, xhr) {
                                                 var allmetpeoples = [];
                                                 var totalcompanyknown = 0;
                                                 var totalusers = 1;
                                                 $scope.$apply(function () {
                                                     if (data) {
                                                        
                                                         totallunches = data.totallunches;
                                                         lunchesweek = data.matches.length;
                                                         totalusers = $scope.companyusers.length;
                                                         var activeusers = $scope.companyusers.filter(x=> x.available.length > 0);
                                                       //  console.log("Total Active Users : " + activeusers.length);
                                                         if (typeof data.company.userunitprice == 'undefined')
                                                             data.company.userunitprice = 0;
                                                        // console.log("Total Billed Amount = Total Active Users * Unit Price = " + (data.company.userunitprice - 0) * (activeusers.length - 0));
                                                         var totalbilledusers = [];
                                                         var matcheddata = [];
                                                         angular.forEach($scope.companyusers, function (value, i) {
                                                             var knownpeople = [];
                                                             var userlunch = 0;
                                                             var alreadyknown = $scope.companyusers[i].known;
                                                             angular.forEach(data.matches, function (match, m) {

                                                                 if (data.matches[m].participants.indexOf($scope.companyusers[i]._id) > -1) {
                                                                     userlunch = userlunch + 1;

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
                                                             $scope.companyusers[i].totallunches = userlunch;
                                                             $scope.companyusers[i].knownpeople = (knownpeople.length - 0) / $scope.companyusers.length;
                                                             //  totalcompanyknown = (totalcompanyknown - 0) + ((knownpeople.length - 0) - (alreadyknown.length - 0));
                                                             totalcompanyknown = (totalcompanyknown - 0) + ($scope.companyusers[i].knownpeople - 0);
                                                         });
                                                      //   console.log("Total Billed Users : " + totalbilledusers.length);
                                                      //   console.log("Total Lunches : " + data.matches.length);
                                                       //  console.log("Avg. path length of network in company : " + totalcompanyknown);
                                                         $scope.userkpi.totalcompanyknown = totalcompanyknown;
                                                         // console.log("totalcompanyusers: " + totalusers);
                                                         //console.log("enddate: " + enddate);
                                                         //console.log("Total New People Met: " + allmetpeoples.length);
                                                         //console.log("Total Restaurant Visited: " + restaurantlist.length);


                                                     }
                                                     else
                                                         console.log("Error getting companies");

                                                     $scope.userkpi.totallunches = totallunches;
                                                     $scope.userkpi.lunchesweek = lunchesweek;

                                                 });
                                             });



                                         }
                                     });



                                     
                                 }
                                 else
                                     console.log("Error getting users");

                             })
                             .error(function (data) {
                                 console.log("Error:" + data);
                             });
        }

        $scope.dtOptions1 = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
        $scope.dtColumnDefs1 = [
          DTColumnDefBuilder.newColumnDef(0),
          DTColumnDefBuilder.newColumnDef(1),
          DTColumnDefBuilder.newColumnDef(2),
          DTColumnDefBuilder.newColumnDef(3).notSortable(),
          DTColumnDefBuilder.newColumnDef(4),
          DTColumnDefBuilder.newColumnDef(5),
          DTColumnDefBuilder.newColumnDef(6),
           DTColumnDefBuilder.newColumnDef(7).notSortable()

        ];



        if (clientId.value == '') {
            $http.get("/api/getLoggedInUser")
                       .success(function (data) {

                           if (data) {
                               $scope.loggedInUser = data;
                               console.log("User is logged in.");
                               clientId.value = data;
                               resetUsers();
                           }
                           else {
                               console.log("User is not logged in.");
                               $state.go('access.login');
                           }

                       })
                       .error(function (data) {
                           console.log("Error:" + data);
                       });
        }
        else
            resetUsers();



        //$scope.updateUser = function ()
        //{
        //    console.log(newuser);
        //    console.log(user);
        //    angular.element(document.querySelector('#testModel')).modal('hide');
        //    $scope.newUser = {};
        //    $scope.user = {'gender':'Male'};
        //}
       
        $scope.updateUser = function (form) {
            if (clientId.value != '') {
                $scope.user.companyid = clientId.value.companyid;
                var message = "User added successfully";
                var updateMessage = "User updated successfully";
                var currentuser = { 'name': $scope.user.name, 'phone': $scope.user.phone, 'email': $scope.user.email, 'gender': $scope.user.gender, 'isPause': false, 'lastlunch': null,'knownpeople':0,'totallunches':0,'role':['User'] };
                if ($scope.isUserEdit==false) {
                    $.post('/api/addUser', $scope.user, function (data, status, xhr) {
                        //  resetUsers();
                        $scope.user.isPause = false;
                        $scope.user.lastlunch = '';
                        $scope.$apply(function () {
                            $scope.companyusers.push(currentuser);
                        });
                        $('body').pgNotification({
                            style: 'bar',
                            message: message,
                            position: $scope.notification.position,
                            timeout: 0,
                            type: "success"
                        }).show();
                    });
                   
                }
                else {
                //    debugger;
                    var i = $scope.userIndex;
                    var _t = $scope.companyusers[i];
                    $scope.user = {
                        'name': $scope.user.name,
                        'email': $scope.user.email,
                        'gender': $scope.user.gender,
                        'companyid':  $scope.user.companyid = clientId.value.companyid, 
                        'id': _t._id
                    };
                   //// debugger;
                   // $scope.user.available = $scope.selection;
                    $.post('/api/updateUser', $scope.user, function (data, status, xhr) {
                       // debugger;
                        $scope.user.isPause = false;
                        $scope.user.lastlunch = '';
                       // debugger;
                        if (status == "success") {
                            //    debugger;
                           // $timeout(function () { resetUsers(); }, 6000);
                            
                        }
                        $scope.$apply(function () {                                                     
                            $scope.companyusers.splice(i, 1);
                            $scope.companyusers.push(currentuser);
                        });

                        $('body').pgNotification({
                            style: 'bar',
                            message: updateMessage,
                            position: $scope.notification.position,
                            timeout: 0,
                            type: "success"
                        }).show();
                    });
                }
                resetForm(form);
               
               
            }
        };
        $scope.getUser = function ($event, i) {          
            $scope.isUserEdit = true;
            $scope.userIndex = i;
            var _t = $scope.companyusers[i];
            $scope.user = { 'name': _t.name, 'email': _t.email, 'gender': _t.gender, 'companyid': _t.companyid, 'phone': _t.phone };
            $scope.selection = _t.available;
        };
        $scope.deleteUser = function ($event, i) {
            var currentuser = $scope.companyusers[i];
         //   $scope.$apply(function () {
            $scope.companyusers[i].isDisable = true;
            $scope.companyusers.splice(i, 1);
          //  });
            $.post('/api/deleteUser', currentuser, function (data, status, xhr) {              
                $('body').pgNotification({
                    style: 'bar',
                    message: "User deleted successfully",
                    position: $scope.notification.position,
                    timeout: 0,
                    type: "success"
                }).show();
               
            });
        };
        $scope.updateStatus = function ($event, i, status) {
            var message = "";
            if (status == false) {
                message="User is active now."
            }
            else {
                message = "User is paused now."
            }
            $scope.companyusers[i].isPause = status;
            $.post('/api/updateStatus', $scope.companyusers[i], function (data, status, xhr) {  
                $('body').pgNotification({
                    style: 'bar',
                    message: message,
                    position: $scope.notification.position,
                    timeout: 0,
                    type: "success"
                }).show();
            });
        };
        
           
        $scope.refreshTest = function(portlet) {
            console.log("Refreshing...");
            // Timeout to simulate AJAX response delay
            $timeout(function() {
                $(portlet).portlet({
                    refresh: false
                });
            }, 2000);

        }

      
		
		var table = $('#tableWithExportOptions');


        $scope.options = {
            "sDom": "<'exportOptions'T><'table-responsive't><'row'<p i>>",
            
            "destroy": true,
            "scrollCollapse": true,
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
            },
            "iDisplayLength": 5,
            "oTableTools": {
                "sSwfPath": "assets/plugins/jquery-datatable/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "csv",
                    "sButtonText": "<i class='pg-grid'></i>",
                }, {
                    "sExtends": "xls",
                    "sButtonText": "<i class='fa fa-file-excel-o'></i>",
                }, {
                    "sExtends": "pdf",
                    "sButtonText": "<i class='fa fa-file-pdf-o'></i>",
                }, {
                    "sExtends": "copy",
                    "sButtonText": "<i class='fa fa-copy'></i>",
                }]
            },
            fnDrawCallback: function(oSettings) {
		
			$('.export-options-container').append($('.exportOptions'));

                $('#ToolTables_tableWithExportOptions_0').tooltip({
                    title: 'Export as CSV',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_1').tooltip({
                    title: 'Export as Excel',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_2').tooltip({
                    title: 'Export as PDF',
                    container: 'body'
                });

                $('#ToolTables_tableWithExportOptions_3').tooltip({
                    title: 'Copy data',
                    container: 'body'
                });
				
            }
        };
		

        // Widget-4
        $scope.widget_4_options = {
            chart: {
                type: 'lineChart',
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
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
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
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
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
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
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
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
                    tickFormat: function(d) {
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
                x: function(d) {
                    return d[0]
                },
                y: function(d) {
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
                    tickFormat: function(d) {
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
                tickFormat: function(y) {
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

        $scope.widget_16_xFunction = function() {
            return function(d) {
                return d[0];
            };
        }
        $scope.widget_16_yFunction = function() {
            return function(d) {
                return d[1];
            };
        }
        $scope.widget_16_colorFunction = function() {
            return function(d, i) {
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
                tickFormat: function(y) {
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
        $scope.$on('$destroy', function() {
            $('.live-tile').liveTile("destroy");
        });


    }]);



angular.module('app')
    .directive('widget5Chart', function() {
        return {
            restrict: 'C',
            link: function(scope, el, attrs) {

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
                    barWidth: function(series) {

                        return 7;
                    }
                });


                graph.setRenderer(MonthBarsRenderer);


                graph.render();


                $(window).resize(function() {
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

$('body').on('click', '.mapplic-pin', function(e) {
    e.preventDefault();
    var location = $(e.target).data('location');
    $('#mapplic').data().mapplic.goToLocation(location, 800);
});