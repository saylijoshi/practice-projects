/**
 * Created by kaushik.pankhaniya on 6/19/2017.
 */
app.controller('myController', function ($scope, $http) {
    $scope.data = [];
//    var request = $http.get('/data');
//    request.success(function(data) {
//        $scope.data = data;
//    });
//    request.error(function(data){
//        console.log('Error: ' + data);
//    });
    /**
     * Created by pallavidandane on 13/6/17.
     */
// Functions =============================================================
    var map;
    //var myLatLng = {lat: 18.580085, lng: 73.738125};
    var myLatLng, arrMarkers = [], arrUserMarkers = [], arrInfowindows = [];
    $scope.filterFields = [];
    $scope.categories = [];
    $scope.categoryData = [];
    var wareHouses, selectedCategory, objMarkersFilterQuery = {};
    var arrdirectionsDisplay = [];
    var arrdirectionsService = [];//= new google.maps.DirectionsService();
    var flgShowAllMarkers = true;

    $scope.initMap = function () {
        myLatLng = new google.maps.LatLng(18.580085, -73.738125);
        map = new google.maps.Map(document.getElementById('mymap'), {
            center: myLatLng,
            zoom: 10
        });
        $scope.getTemplates();
        $scope.populateWareHouses();
    }
//$scope.moveMarker( map, marker ) {
//    myLatLng.lat += 0.000100;
//    myLatLng.lng += 0.000100;
//    marker.setPosition( new google.maps.LatLng( myLatLng.lat, myLatLng.lng ) );
//    map.panTo( new google.maps.LatLng( myLatLng.lat, myLatLng.lng ) );
//}
//    jQuery.curCSS = function(element, prop, val) {
//        return jQuery(element).css(prop, val);
//    };
//
//    $(document).on('click', '.trigger', $scope.(event) {
//        $("#modal").iziModal({
//            theme: '',
//            overlayColor: 'rgba(0, 0, 0, 0.4)',
//            iconColor: '',
//            overlayClose: true,
//            closeOnEscape: true,
//            bodyOverflow: false
//        });
//        event.preventDefault();
//        $('#modal').iziModal('open', this); // Use "this" to get URL href or option 'iframeURL'
//    });
    $scope.showReport = function () {
        $("#dialog").dialog({width: 800, height: 500});
        $("#frame").attr("src", "images/Report - VW.pdf");
    };
    $scope.addInput= function(divName, dataToAppend) {
//        $scope.unique = dataToAppend.filter((set => f => !set.has(f[divName]) && set.add(f[divName]))(new Set));
        //for(var i=0;i<$scope.unique.length;i++){
        //    select.append($("<option/>").attr("value", $scope.unique[i][divName]).text($scope.unique[i][divName]));
        //}
        //$.each(unique, $scope.(a, b){
           //
        //});
        // $("#" + divName).append(select);
    }
    $scope.placeMarkesrs = function (data) {
        if (flgShowAllMarkers == false) {
            for (i = 0; i < arrMarkers.length; i++) {
                arrMarkers[i].setMap(null);
            }
            arrMarkers = [];
            for (i = 0; i < arrInfowindows.length; i++) {
                arrInfowindows[i].close();
            }
            arrInfowindows = [];
        }

        if (data != null) {
            var markerImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            $.each(data, function () {
                myLatLng = new google.maps.LatLng(parseFloat(this.latitude ? this.latitude : this.Latitude), parseFloat(this.longitude ? this.longitude : this.Longitude));
                var infoWindowContent = "";
                markerImage = 'http://maps.google.com/mapfiles/ms/icons/' + (this.markerColor ? this.markerColor : 'red') + '-dot.png';

                if (this.docType == 'WareHouses' || this.docType == 'Warehouses') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['Warehouse Code'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p >' +
                        '<label>Manager Name ' + this['Manager Name'] + '</label> <br>' +
                        '<label>City  ' + this['City'] + '</label> <br>' +
                        '<label>State  ' + this['State'] + '</label> <br>' +
                        '<label>Capacity Utilization ' + this['Capacity Utilization'] + '</label> <br>' +
                        '<label>Area (SQ FT)' + this['Area'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'Plants') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['Plant'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p>' +
                        '<label>FY 15-16 MT ' + this['FY15-16MT'] + '</label> <br>' +
                        '<label>Type  ' + this['Type'] + '</label> <br>' +
                        '<label>State  ' + this['State'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'Competitors') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['Name'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p >' +
                        '<label>State  ' + this['State'] + '</label> <br>' +
                        '<label>Net Profit ' + this['Net Profit'] + '</label> <br>' +
                        '<label>Total Assets ' + this['Total Assets'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'Dealers') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<img src=" images/' + this['Image Source'] + '"><h1 id="firstHeading" class="firstHeading">' + this['Dealer Name'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p>' +
                        '<label>Manager Name ' + this['Manager Name'] + '</label> <br>' +
                        '<label>Sales Rep  ' + this['Sales Rep First Name'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
                        '<label>Average Monthly Billing  ' + this['Average Monthly Billing'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
                        '<label>City  ' + this['City'] + '</label> <br>' +
                        '<label>State  ' + this['State'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'Top Perforrming Sales Executives') {
                    markerImage = 'images/userNormal.png';
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<img src=" images/' + this['Images'] + '"><h1 id="firstHeading" class="firstHeading">' + this['First Name'] + ' ' + this['Last Name'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p>' +
                        '<label>City ' + this['City'] + '</label> <br>' +
                        '<label>State  ' + this['State'] + '</label> <br>' +
                        '<label>Ranking  ' + this['Ranking'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'StoreLocations') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['AgencyName'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p >' +
                        '<label>Store -  ' + this['Store'] + '</label> <br>' +
                        '<label>City -  ' + this['City'] + '</label> <br>' +
                        '<label>State -  ' + this['State'] + '</label> <br>' +
                        '<label>Sales Representative - ' + this['SalesRepFirstName'] + ' ' + this['SalesRepLastName'] + '</label> <br>' +
                        '<label>Average Monthly Billing (Rs. Crore) -  ' + this['AverageMonthlyBilling'] + '</label> <br>' +
                        '<label>Income Bands -  ' + this['IncomeBands'] + '</label> <br>' +
                        '<label>Gender Ratio - ' + this['GenderRatio'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['Dealer Name'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p>' +
                        '<label> nothing to show </label>' +
//                    '<label>Manager Name ' + this['Manager Name'] + '</label> <br>' +
//                    '<label>Sales Rep  ' + this['Sales Rep First Name'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
//                    '<label>Average Monthly Billing  ' + this['Average Monthly Billing'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
//                    '<label>City  ' + this['City'] + '</label> <br>' +
//                    '<label>State  ' + this['State'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                }
                var marker = new google.maps.Marker({
                    position: myLatLng, map: map,
                    icon: markerImage// 'http://maps.google.com/mapfiles/ms/icons/' + (this.markerColor?this.markerColor:'red') + '-dot.png'
                });
                marker.setMap(map);
                var infoWindow = new google.maps.InfoWindow({
                    content: this.markerContent ? this.markerContent : infoWindowContent
                });
                marker.addListener('click', function () {
                    for (i = 0; i < arrInfowindows.length; i++) {
                        arrInfowindows[i].close();
                    }
                    arrInfowindows = [];
                    infoWindow.open(map, marker);
                    arrInfowindows.push(infoWindow);
                });
                arrMarkers.push(marker);
            });
        }
    }
    $scope.createFilter= function() {
        //    divFilter.append("<div class='filter_group'><label>Category</label><select id='category' onchange='loadFilter(this)' ></select></div>");
        var ele;
        $.each(filterFields, function (a, b) {
            $scope.filterOption = filterFields;
            $scope.$apply();
            $scope.addInput(b.key, $scope.categoryData);
            //divFilter.append("<div class='filter_group'><label>" + b.label + "</label><select id="+ b.key +" ng-model='selectedName' ng-options='item for item in names'> </select></div>");
//          divFilter.append("");
            //$scope.category
        });

    }
    $scope.showMarkersforAllCategories = function () {

        for (i = 0; i < $scope.categories.length; i++) {
            $.getJSON('/getData', {"docType": $scope.categories[i]}, function (data) {
                $scope.placeMarkesrs(data);
            });
        }
    }
    $scope.getTemplates = function () {
        flgShowAllMarkers = true;
        // jQuery AJAX call for JSON
        $.getJSON('/templates', function (data) {
            $scope.categories = data;
//            var select = $("#category");
//            select.append($("<option/>").attr("value", "all").text("All"));
//            for (i = 0; i < categories.length; i++) {
//                select.append($("<option/>").attr("value", categories[i]).text(categories[i]));
//            }
            $scope.showMarkersforAllCategories();
            $scope.$apply();
           // var select = $("#category");
           // select.append($("<option/>").attr("value", "all").text("All"));
            //for (i = 0; i < categories.length; i++) {
            //    select.append($("<option/>").attr("value", categories[i]).text(categories[i]));
            //}
        });
    }

    $scope.getData = function (dbName) {
        if (dbName == 'all' || dbName == 'All') {
            $scope.filterFields = [];
            $scope.showMarkersforAllCategories();
        }
        else {
            $.getJSON('/getData', {"docType": dbName}, function (data) {
                $scope.categoryData = data;
//                $scope.createFilter();
                $scope.placeMarkesrs(data);
            });
        }
    }

    $scope.loadFilter = function () {
        flgShowAllMarkers = false;
        var value = $scope.category;
        $scope.filter_opt = [];
        $scope.filterOption= [];
        selectedCategory = value;
        if (value == 'all' || value == 'All') {
            flgShowAllMarkers = true;
            $scope.showMarkersforAllCategories();
        }
        else {
            $.getJSON('/templatesFields', {'docType': $scope.category}, function (data) {
                $scope.filterFields = data[0].fields;
                console.log($scope.filterFields);
                console.log($scope.category);
                $scope.getData($scope.category);
            });
        }
    }

    $scope.placeNearestLocations = function (latitude, longitude) {
//    var value = element.value;
//    var keyName = element.id;
        flgShowAllMarkers = true;
        objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
        if (selectedCategory != "" && selectedCategory != undefined) {
            objMarkersFilterQuery = {"docType": selectedCategory,
                'Latitude': latitude,
                'Longitude': longitude,
                'Latitude1': latitude + 3,
                'Longitude1': longitude + 3};
//        objMarkersFilterQuery = {"docType":selectedCategory,
//            'query':"{'docType':" + selectedCategory + ",'$and' : [{'Latitude' :{'$gte':" + latitude + "}},{'Latitude' :{'$lte': " + (latitude +10) + "}}]}"};
        }
        else {
            objMarkersFilterQuery = {
                'Latitude': latitude,
                'Longitude': longitude,
                'Latitude1': latitude + 3,
                'Longitude1': longitude + 3};
        }
        $.getJSON('/getNearestData', objMarkersFilterQuery, function (data) {
            flgShowAllMarkers = true;
            $scope.placeMarkesrs(data);
            //$scope.(data, latitude, longitude, true, false);  add it later...

        }, function () {
            $scope.placeMarkesrs(null);
        });
    }

// Fill table with data

    $scope.populateWareHouses = function () {


        // Empty content string
        var tableContent = '';
        directionsDisplay = new google.maps.DirectionsRenderer();

        map = new google.maps.Map(document.getElementById('mymap'), {
            center: myLatLng,
            zoom: 10,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        directionsDisplay.setMap(map);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                map.setCenter(pos);
            }, function () {
//            handleLocationError(true, infoWindow, map.getCenter());
            });
        }
//        map.setCenter(new google.maps.LatLng(28.541766, 77.243415));
        google.maps.event.addListener(map, 'click', function (event) {
            for (i = 0; i < arrUserMarkers.length; i++) {
                arrUserMarkers[i].setMap(null);
            }
            arrUserMarkers = [];
            var latitude = event.latLng.lat();
            var longitude = event.latLng.lng();
            console.log(latitude + ', ' + longitude);
            var pinImage = new google.maps.MarkerImage("http://www.googlemapsmarkers.com/v1/009900/");

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
                icon: pinImage,
                map: map
            });
            arrUserMarkers.push(marker);
            objMarkersFilterQuery = {};
            $scope.placeNearestLocations(latitude, longitude);
        });

      // jQuery AJAX call for JSON
//    $.getJSON('/wareHouses', function( data ) {
//        wareHouses = data;
//        addInput();
//        // For each item in our JSON, add a table row and cells to the content string
//        placeMarkesrs(data);
//    });
    };
    //$scope.filterMarkerData= function(templateCategory, keyName, element)
    $scope.filterMarkerData=function(){
        console.log($scope.filter_opt);
        //console.log(kyeName);
        flgShowAllMarkers = false;
        objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
        //if (value == "" || value == undefined) {
        //    delete objMarkersFilterQuery[keyName];
        //}
        //else {
        //    objMarkersFilterQuery[keyName] = value;
        //}
        //objMarkersFilterQuery['docType'] = templateCategory;
        //delete objMarkersFilterQuery['$and'];
        //$.getJSON('/filter', objMarkersFilterQuery, function (data) {
        //    $scope.placeMarkesrs(data);
        //}, function () {
        //    $scope.placeMarkesrs(null);
        //});
    }
    $scope.resetMarkers = function () {
        placeMarkesrs(wareHouses);
    }
    $scope.showFilters = function (filterName) {
        $("#filter1").hide();
        $("#salesPerson").hide();
        $("#salerPersonPics").hide();
        flgShowAllMarkers = false;
        $scope.placeMarkesrs(null);

        if (filterName == "filter1") {
            flgShowAllMarkers = true;
            $scope.showMarkersforAllCategories();
        }
        else if (filterName == "salesPerson") {
            // alert("hi all" + filterName);
            //$("#salerPersonPics").show();
            flgShowAllMarkers = false;
        }
        else {
            flgShowAllMarkers = false;
            $scope.placeMarkesrs(null);
        }
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }

        k = -1;
        $("#" + filterName).show();
    }
    $scope.loadFilterSalesPerson = function (element) {
        $('#top20').hide();
        $('#2080').hide();
        $('#Bottom20').hide();
        if (element.value == "Top20") {
            $('#top20').show();
        }
        else if (element.value == "2080") {
            $('#2080').show();
        }
        else if (element.value == "Bottom20") {
            $('#Bottom20').show();
        }

        var value = element.value;
        var keyName = element.id;

        objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
        if (value == "" || value == undefined) {
            delete objMarkersFilterQuery[keyName];
        }
        else {
            objMarkersFilterQuery[keyName] = value;
        }
        $.getJSON('/filter', objMarkersFilterQuery, function (data) {

            $scope.placeMarkesrs(data);
//        calcRoute(data);

        }, function () {
            $scope.placeMarkesrs(null);
        });
        value = element.value;
        selectedCategory = value;

        $.getJSON('/templatesFields', {'docType': value}, function (data) {
            $scope.filterFields = data[0].fields;
            $scope.getData(value);
        });
    };

    var arrLatLongTruck = [
        [22.58608, 88.37402],
        [22.58608, 88.19824],
        [22.4846, 88.13232],
        [22.47445, 87.96753],
        [22.43892, 87.84668],
        [22.40845, 87.66541],
        [22.39829, 87.52808],
        [22.38813, 87.39624],
        [22.35766, 87.31384],
        [22.32717, 87.22046],
        [22.35258, 87.07764],
        [22.32209, 86.98425],
        [22.31193, 86.90186],
        [22.28651, 86.79199],
        [22.28143, 86.72607],
        [22.35258, 86.68213],
        [22.43892, 86.61072],
        [22.54042, 86.5448],
        [22.62665, 86.44592],
        [22.69761, 86.39099],
        [22.7888, 86.32507],
        [22.84956, 86.20972],
        [22.90017, 86.09985],
        [22.95582, 86.01196],
        [22.97606, 85.92957],
        [22.98617, 85.84717],
        [23.02662, 85.72083],
        [23.06706, 85.65491],
        [23.11254, 85.61646],
        [23.17315, 85.58899],
        [23.20345, 85.5011],
        [23.26402, 85.42969],
        [23.33969, 85.38025],
        [23.35987, 85.3363],
        [23.378157, 85.320415],
        [23.415926, 85.227822],
        [23.453684, 85.108481],
        [23.491431, 85.003542],
        [23.538599, 84.908892],
        [23.546144, 84.812185],
        [23.619689, 84.771032],
        [23.655504, 84.731938],
        [23.706381, 84.664036],
        [23.74829, 84.54686],
        [23.858459, 84.356532],
        [23.972084, 84.216699],
        [24.021763, 84.10794],
        [24.163598, 84.05356],
        [24.227373, 83.917611],
        [24.191946, 83.684556],
        [24.284034, 83.478691],
        [24.245082, 83.303899],
        [24.255707, 83.156298],
        [24.206118, 83.008696],
        [24.227373, 82.853326],
        [24.174229, 82.760104],
        [24.096246, 82.562007],
        [24.220288, 82.429942],
        [24.326514, 82.286225],
        [24.44326, 82.146392],
        [24.404357, 81.812346],
        [24.439724, 81.664744],
        [24.347749, 81.458879],
        [24.36898, 81.334583],
        [24.457403, 81.214171],
        [24.513962, 81.097643],
        [24.559898, 80.95781],
        [24.584625, 80.767482],
        [24.581093, 80.596574],
        [24.623472, 80.351866],
        [24.722302, 80.138232],
        [24.761107, 79.932367],
        [24.817529, 79.730386],
        [24.902113, 79.602205]
    ];
    var k = 0;
    $scope.calcRoute = function (data, originLatitude, originLongitude, supressMarkers, isAssetTracking) {
        flgShowAllMarkers = false;
        var start = new google.maps.LatLng(originLatitude, originLongitude);
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        $.each(data, function (a, b) {
            var directionsDisplay = new google.maps.DirectionsRenderer(
                {
                    suppressMarkers: supressMarkers ? supressMarkers : false
                }
            );
            var directionsService = new google.maps.DirectionsService();
            directionsDisplay.setMap(map);
            var end = new google.maps.LatLng(b.Latitude, b.Longitude);
            var infowindow2 = new google.maps.InfoWindow();
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setOptions({ preserveViewport: true });
                    directionsDisplay.setDirections(response);
                    infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ")
                    if (response.routes) {
                        if (response.routes[0].overview_path) {
//                        arrLatLongTruck = response.routes[0].overview_path;
                            var index = parseInt(response.routes[0].overview_path.length / 2);
                            var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());
                        }
                    }
                    infowindow2.setPosition(infoposition ? infoposition : end);
                    infowindow2.open(map);
                    arrInfowindows.push(infowindow2);
                }
            });
            arrdirectionsDisplay.push(directionsDisplay);
        });
    }
    $scope.assetTracking = function () {
        flgShowAllMarkers = false;
        k = arrLatLongTruck.length - 1;
//    k = 0;
        var markersToSend = [
            {
                "Latitude": 22.58608,
                "Longitude": 88.37402
            },
            {
                "Latitude": 24.902113,
                "Longitude": 79.602205
            }
        ];
        placeMarkesrs(markersToSend);
        var markerTruck = new google.maps.Marker({position: new google.maps.LatLng(24.902113, 79.602205), map: map, icon: 'images/smalltruck.png'});
        markerTruck.setMap(map);
        arrMarkers.push(markerTruck);
        calcRoute([
            {"Latitude": 22.58608, "Longitude": 88.37402}
        ], 24.902113, 79.602205, false, true);
        setTimeout(function () {
            moveTruck(map, markerTruck);
        }, 1000);
    }
    $scope.moveTruck = function (map, markerTruck) {

        setTimeout(function () {
            markerTruck.setPosition(new google.maps.LatLng(arrLatLongTruck[k][0], arrLatLongTruck[k][1]));
            //map.panTo( new google.maps.LatLng( auto[k][0], auto[k][1] ) );
            k--;
//        k++;
//        if (k <= arrLatLongTruck.length) {
            if (k >= 0) {
                moveTruck(map, markerTruck);
            }
        }, 500)
    }
    setTimeout(function () {
        $scope.initMap();
    }, 1000);
});
