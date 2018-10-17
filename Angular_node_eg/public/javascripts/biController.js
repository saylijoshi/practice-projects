
angular.module('angularjs_with_Nodejs').controller('biController', function ($templateCache,$window,$rootScope,$scope,$route, $timeout, $filter, $http) {

    var map,geocoder,radius_circle,places;;
    var infoWindow;
    var markers = []; 
    var placesMarkers = [];
    var restaurantsMarkers = [];
    var zomatoRestaurantsMarkers = [];
    var facebookRestaurantsMarkers = [];
    var airportMarkers = [];
    var barMarkers = [];
    var busstationMarkers = [];
    var cafeMarkers = [];
    var casinoMarkers = [];
    var liquorStoreMarkers = [];
    var nightClubsMarkers = [];
    var parkMarkers = [];
    var superMarketMarkers = [];
    var subwayMarkers = [];
    var shoppingMallMarkers = [];
    var MealTakeAwayMarkers = [];
    var movietheatermarkers = [];
    var categoryPOSmarkers = [];
    var categoryProductionCentresMarker = [];
    var categoryWarehouseMarker = [];
    var categoryDistributionCentreMarker = [];
    var subcategoryBakeryAndCakesmarkers = [];
    var subcategoryBeautyAndHygienemarkers = [];
    var subcategoryCleaningAndHouseholdmarkers = [];
    var subcategoryFruitsAndVegetablesmarkers = [];
    var subcategoryBabyCaremarkers = [];
    var subcategoryCerealsmarkers = [];
    var cityAndRegionMarkers = [];
    var jsonObject;
    var infoWindow,infowindow2,infoWindownRadius,infowindowplacesmarker;
    var directionsDisplayCollection = [],infowindowsCollection = [];
    var directionsDisplay, directionsService;
    $scope.selectedStore = {};
    var countryMarkerCluster;
    var airportMarkersCluster,barMarkersCluster,busstationMarkersCluster,cafeMarkersCluster,casinoMarkersCluster,liquorStoreMarkersCluster,nightClubsMarkersCluster,parkMarkersCluster,superMarketMarkersCluster,subwayMarkersCluster,shoppingMallMarkersCluster,MealTakeAwayMarkersCluster,movietheatermarkersCluster;
    var allOption = {"name": "All Stores","latitude":0,"longitude":0};
    $scope.storeNames = [];
    $scope.showStorePlaceTypes = false;
    var heatmap,heatmapEast,heatmapWest,heatmapSouth,heatmapNorth;
    var trafficLayer;
    var selectedCategoryName;
    var userSelectedCategoryName;
    $scope.SelectedCountry = "";
    var showBikeMarker = false;
    $scope.formblock = true;
    $scope.showMarketing = false;
    $scope.showTrafficButton = true;
    $scope.loading = false;

    $scope.minValueSalesRevenue = null;
    $scope.maxValueSalesRevenue = null; 
    $scope.placesValue = null;
    $scope.allStoresArray = [];

    $scope.countries =
    [
        //{"name":"", "selected":true},
        //{"name":"India", "selected":false},
        {"name":"Singapore", "selected":false}
    ]

    // $scope.cities =
    // [
    //     {"name":"Delhi", "selected":false},
    //     {"name":"Mumbai", "selected":false},
    //     {"name":"Bengaluru", "selected":false},
    //     {"name":"Kolkata", "selected":false},
    //     {"name":"Chennai", "selected":false},
    //     {"name":"Indore", "selected":false},
    //     {"name":"Ahmedabad", "selected":false},
    //     {"name":"Pune", "selected":false}
    // ]

    
$scope.cities =
[
    {"name":"Lim Chu Kang", "selected":false},
    {"name":"Mandai", "selected":false},
    {"name":"Sembawang", "selected":false},
    {"name":"Jurong West", "selected":false},
    {"name":"Woodlands", "selected":false},
    {"name":"Queenstown", "selected":false},
    {"name":"Bukit Merah", "selected":false},
    {"name":"Kallang", "selected":false},
    {"name":"Geylang", "selected":false},
    {"name":"Bedok", "selected":false},
    {"name":"Tampines", "selected":false}
]

    $scope.regions =
    [
        {"name":"East", "selected":false},
        {"name":"West", "selected":false},
        {"name":"North", "selected":false},
        {"name":"South", "selected":false}
    ]

    $scope.placetypes = 
    [
        {"name":"Google - Restaurants", "checked":false},
        {"name":"Facebook - Restaurants", "checked":false},
        {"name":"Zomato - Restaurants", "checked":false},
        {"name":"Bar", "checked":false},
        {"name":"Cafe", "checked":false},
        {"name":"Casino", "checked":false},
        {"name":"Night Clubs", "checked":false},
        {"name":"Park", "checked":false},
        {"name":"Super Market", "checked":false},
        {"name":"Subway", "checked":false},
        {"name":"Shopping Mall", "checked":false},
        {"name":"Meal Take Aways", "checked":false},
        {"name":"Movie Theatres", "checked":false}
    ]

    $scope.categories = 
    [
        {"name":"POS", "checked":false},
        {"name":"Production Centres", "checked":false},
        {"name":"Warehouses", "checked":false},
        {"name":"Distribution Centres", "checked":false}
    ]

    $scope.consumerTypes = 
    [
        {"name":"Demographics", "checked":false},
        {"name":"Traffic layer", "checked":false}
    ]

    $scope.marketingTypes = 
    [
        {"name":"Outdoor", "checked":false},
        {"name":"Bus", "checked":false},
        {"name":"Corporate Events", "checked":false}
    ]

    $scope.competitiontypes = 
    [
        {"name":"Beauty and Hygiene", "checked":false},
        {"name":"Bakery and Cakes", "checked":false},
        {"name":"Cleaning and Household", "checked":false},
        {"name":"Fruits and Vegetables", "checked":false}, 
        {"name":"Cereals", "checked":false},
        {"name":"Baby Care", "checked":false}
    ]

    $scope.salesTypes = 
    [
        {"name":"Advertising", "checked":false},
        {"name":"Sales & Promotion", "checked":false},
        {"name":"Public Relations", "checked":false},
        {"name":"Direct Marketing", "checked":false},
        {"name":"Personal Selling", "checked":false}
    ]

    $scope.promotionTypes = 
    [
        {"name":"Corporate", "checked":false},
        {"name":"University", "checked":false},
        {"name":"Commercial", "checked":false}
    ]

    $scope.subCategories = 
    [
        {"name":"Beauty & Hygiene", "checked":false},
        {"name":"Bakery & Cakes", "checked":false},
        {"name":"Cleaning & Household", "checked":false},
        {"name":"Fruits & Vegetables", "checked":false}, 
        {"name":"Cereals", "checked":false},
        {"name":"Baby Care", "checked":false}
    ]
    
    $scope.productiontypes = 
    [
        {"name":"Production House 1", "checked":false},
        {"name":"Production House 2", "checked":false}
    ]

    $scope.warehousetypes = 
    [
        {"name":"Warehouse 1", "checked":false},
        {"name":"Warehouse 2", "checked":false}
    ]

    $scope.distributiontypes = 
    [
        {"name":"Main Distribution Centre", "checked":false},
        {"name":"Distribution Centre 1", "checked":false},
        {"name":"Distribution Centre 2", "checked":false},
    ]

    $scope.marketingTypes =
    [
        {"name":"Indoor", "checked":false}
        //
    ]

    var arrdirectionsDisplay = [];
    var arrLatLongTruck = [];
    var arrInfowindows = [], arrInfowindowsAssetTrackingMarkers = [];
    var arrMarkers = [];
    var arrShowMarkers = [];
    var fusionLayer;
    $scope.showPersonAnalysis = false;
    $scope.weightagePOI = [];
    $scope.TotalWeightage = 0;
    $scope.categorizedWeightage = {};
    var timer;

    $scope.statesData = {
        'selectedStates': [],
        'selectedZipcodes': [],
        'selectedTalukas': [],
        'selectedDistricts': [],
        'selectedCity': [],
        'states': [],
        'talukas': [],
        'districts': [],
        'zipCodes': [],
        'allCities': []
    };

    $scope.filter = {
        "filterFields": [],
        "filterCategories": [],
        "selectedCategory": "",
        "categoryData": []
    };

    setTimeout(function ()
    {
        $scope.initMap();
       // $scope.showAllLocations();
    }, 100);

    $scope.initMap = function ()
    {
        map = new google.maps.Map(document.getElementById("mymap"), {
            //center: new google.maps.LatLng(23.492690, 78.680398),
            center: new google.maps.LatLng(1.328178, 103.845055),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            map.data.loadGeoJson(
                'https://www.jasonbase.com/things/Lzkb');

                //https://www.jasonbase.com/things/z0wx
                //https://www.jasonbase.com/things/Lzkb
                //https://api.myjson.com/bins/fngwg


            map.data.setStyle(function(feature) {
                var NAME = feature.getProperty('ST_NAME');
                var scolor = "grey";
                // if (NAME == "ANDAMAN AND NICOBAR ISLANDS") {
                //     color = "green";
                // }
                // else if (NAME == "Andhra Pradesh") {
                //     color = "blue";
                // }
                // else if (NAME == "Arunachal Pradesh") {
                //     color = "violet";
                //     }

                return {
                    fillColor: "#efd4f9", //#8ac601 , #adbfff , #d39e17
                    strokeWeight: 1.5,
                strokeColor:scolor,
                }
                });

        trafficLayer = new google.maps.TrafficLayer();

        $scope.storeIPAddress();

        // storeLatLng = {lat: 39.923845,lng: 116.452412};
        // var service = new google.maps.places.PlacesService(map);
        //             service.nearbySearch({
        //                 location : storeLatLng,
        //                 radius : 12000,
        //                 //componentRestrictions: {'country': 'SG'},
        //                 type : [ 'restaurant']
        //             },$scope.restaurantCallback);


        // Create the autocomplete object and associate it with the UI input control.
        // Restrict the search to the default country, and to place type "cities".
        autocomplete = new google.maps.places.Autocomplete(
            /** @type {!HTMLInputElement} */ (
                document.getElementById('mylocation')), {
            //types: ['address'],
            //componentRestrictions: countryRestrict
            });
        places = new google.maps.places.PlacesService(map);
        

        autocomplete.addListener('place_changed', onPlaceChanged);
    }

    // When the user selects a city, get the place details for the city and
    // zoom the map in on the city.
    function onPlaceChanged() {
        var place = autocomplete.getPlace();
        if (place.geometry) {
        map.panTo(place.geometry.location);
        map.setZoom(15);
        //search();
        showNearbyLocations();
        } else {
        document.getElementById('mylocation').placeholder = 'Enter a location';
        }
    }

    function clearRadius()
    {
        if (radius_circle) 
        {
            radius_circle.setMap(null);
            radius_circle = null;
        }
    } 

    function showNearbyLocations() 
    {
        $scope.clearIndiaMarkers();
        if( placesMarkers != null )
        {
            for (var key in placesMarkers) 
            {
                placesMarkers[key].setMap(null);
                //markers =[];
            };
        }

        for (var key in placesMarkers) 
        {
            //markers[key].setMap(null);
            placesMarkers =[];
        };

        clearRadius();

        if($scope.allStoresArray != null )
        {
            //console.log("mylocation:"+ mylocation);
            var mylocation = document.getElementById("mylocation").value;
            console.log("mylocation:"+ mylocation);
            var givenLatLng;
            var mygeocoder = new google.maps.Geocoder();

            mygeocoder.geocode( { 'address': mylocation}, function(results, status) 
            {

                    if (status == google.maps.GeocoderStatus.OK) 
                    {
                        var latitude = results[0].geometry.location.lat();
                        var longitude = results[0].geometry.location.lng();
                        //alert(latitude);
                        givenLatLng = { lat : latitude , lng : longitude};

                        if (mygeocoder) 
                        {
                            mygeocoder.geocode({'location': givenLatLng}, function (results, status) {
                                if (status == google.maps.GeocoderStatus.OK) 
                                {
                                    if (status != google.maps.GeocoderStatus.ZERO_RESULTS) 
                                    {
                                        var current_lat_lng = results[0].geometry.location;
                                        radius_circle = new google.maps.Circle({
                                        center: current_lat_lng,
                                        radius: 3 * 1000,
                                        clickable: false,
                                        map: map
                                        });

                                        radius_circle.setOptions({
                                                    fillColor: '#ffcf70',
                                                    strokeColor: '#ffac05'
                                                });

                                        if ( radius_circle )
                                        {
                                            map.fitBounds(radius_circle.getBounds());
                                        } 

                                        for (var i = 0, length = $scope.allStoresArray.length; i < length; i++) 
                                        {
                                            var storeData = $scope.allStoresArray[i];
                                            var marker_lat_lng = new google.maps.LatLng($scope.allStoresArray[i].latitude, $scope.allStoresArray[i].longitude);
                                            //distance in meters between your location and the marker
                                            
                                            var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(current_lat_lng, marker_lat_lng); 
                                        
                                            if (distance_from_location <= 3 * 1000) 
                                            {
                                                console.log("$scope.allStoresArray[i].name: "+ $scope.allStoresArray[i].name );
                                                var new_marker = new google.maps.Marker({
                                                position: marker_lat_lng,
                                                map: map,
                                                icon: 'images/purple.png',
                                                title: $scope.allStoresArray[i].name
                                                });      								
                                                
                                                var storeName = $scope.allStoresArray[i].name;

                                                infoWindow = new google.maps.InfoWindow();
                                                (function(new_marker, storeData) {

                                                // Attaching a click event to the current marker
                                                google.maps.event.addListener(new_marker, "click", function(e) {
                                                infoWindow.setContent('<h3>' + storeData.name + '</h3>'+ "<br/>" + storeData.address + "<br/>" + storeData.contact);
                                                infoWindow.open(map, new_marker);
                                                });

                                                placesMarkers.push(new_marker);

                                                })(new_marker, storeData);
                                            }
                                        }
                                    } 
                                    else 
                                    {
                                        alert("No results found while geocoding!");
                                    }
                                } 
                                else 
                                {
                                    alert("Geocode was not successful: " + status);
                                }
                            });
                        }
                    } 
            });
        }
        else
        {
            alert("Please select country...");
        }
    }

    $scope.initHeatMap = function()
    {
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: $scope.getPoints(),
            map: map
            });
    }

    $scope.storeIPAddress = function()
    {
        $.getJSON('https://ipapi.co/json/', function(data) {
        // console.log("----ipapi-----",JSON.stringify(data, null, 2));
            ipAddress = data.ip;
            //console.log("---ipapi ipAddress----",ipAddress);
            $.post('/getIPAddress', {'ipAddress': data.ip, 'country': data.country_name}, function (data) {

            });

        });
        //optional method for getting client ip address
        // $.getJSON('http://ip-api.com/json?callback=?', function(data) {
        // console.log("----ip-api-----",JSON.stringify(data, null, 2));
        // });
    }

    $scope.getUserLocation = function()
    {
        if (navigator.geolocation) 
        {
            navigator.geolocation.getCurrentPosition(function (position) 
            {
            //myLatLng = {lat: position.coords.latitude,lng: position.coords.longitude};
            myLatLng = {lat:1.328178,lng: 103.845055};
            markerUserLocation = new google.maps.Marker({
            map: map,
            //animation: google.maps.Animation.BOUNCE,
            position: myLatLng,
            title: "Your Location",
            icon : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            });
            map.setCenter(myLatLng);
            //map.setZoom(10);
            }, function () {
            map.setCenter(myLatLng);
                });
        } 
    };

    $scope.showStoreLocatorUI = function()
    {
        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        $scope.clearCityAndRegionMarker();

        $scope.storeNames.length = 0; 
        $scope.showStorePlaceTypes = false;
        for (var i = 0, length = $scope.categories.length; i < length; i++) 
        {
            $scope.categories[i].checked = false;
        }

        for (var i = 0, length = $scope.subCategories.length; i < length; i++) 
        {
            $scope.subCategories[i].checked = false;
        }


        $scope.formblock = true;
        //show traffic button
        $scope.showTrafficButton = true;
        //Hide SalesTracking UI
        $scope.whichOverlayToShow = ""; //this hides city score card UI too
        if( arrMarkers != null )
        {
            for (var key in arrMarkers) 
            {
                //arrMarkers =[];
                arrMarkers[key].setMap(null);
            };
        }

        //hide Assettracking UI
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        showBikeMarker = false;

        //hide Marketing
        $scope.showMarketing = false;

    }

    $scope.showMarketingUI = function()
    {
        $scope.showMarketing = true;

        //hide traffic button
        $scope.showTrafficButton = false;
        //hide store locator
        $scope.formblock = false;

        //Hide SalesTracking UI
        $scope.whichOverlayToShow = ""; //this hides city score card UI too
        if( arrMarkers != null )
        {
            for (var key in arrMarkers) 
            {
                //arrMarkers =[];
                arrMarkers[key].setMap(null);
            };
        }

        //hide Assettracking UI
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        showBikeMarker = false;
        
    }


    $scope.calulateWeightageforPOI = function (selectedCity) {
        console.log("---calulateWeightageforPOI---",selectedCity);
        if (selectedCity == "" || selectedCity == undefined || selectedCity == null) {
            return;
        }

        $scope.loading = true;
        $scope.TotalWeightage = 0;
        angular.forEach($scope.weightagePOI, function (item, index) {
            $scope.weightagePOI[index]['TotalWeightage'] = "";
            $scope.weightagePOI[index]['count'] = "";
        });
        flgShowAllMarkers = false;
        $scope.placeMarkesrs(null);

        var mapDataToload = {"type": "FeatureCollection", "features": []};

        var itemData;
        $.getJSON('/citiesShapeFile', {'properties.NAME': selectedCity.trim()}, function (data) {
            itemData = data;

//            mapDataToload['features'].push(item);

            angular.forEach(itemData, function (item, index) {
//                if (index == 0) {
//                    var geocoder = new google.maps.Geocoder();
//                    var addressToSearch = "";
//                    if (item.properties.NAME != undefined && item.properties.NAME != null)
//                        addressToSearch = addressToSearch + item.properties.NAME
//                    if (item.properties.DISTRICT != undefined && item.properties.DISTRICT != null)
//                        addressToSearch = addressToSearch + item.properties.DISTRICT
//                    if (item.properties.PINCODE != undefined && item.properties.PINCODE != null)
//                        addressToSearch = addressToSearch + item.properties.PINCODE
//                    // Get LatLng information by name
//                    if (addressToSearch != "") {
//                        geocoder.geocode({
//                            address: addressToSearch
////                                    location: item.properties.PINCODE
//                        }, function (results, status) {
//                            if (status === 'OK') {
//                                map.setCenter(results[0].geometry.location);
//                            }
//                        });
//                    }
//                }
                mapDataToload['features'].push(item);
            });

//            for (var t=0; t<itemData.length; t++) {
////                var polygon = item[t].getPath();
//                // Iterate over the polygonBounds vertices.
//
////                    var polygon = mapDataToload['features'];//['geometry']['coordinates'];
//                itemData[t].geometry.coordinates.forEach(function (path, index) {
//
////                    var points = path.getArray();
//                    for (var p=0;p<  path.length;p++)
//                        if (path[p])
//                            boundsPOI.extend(new google.maps.LatLng(parseFloat(path[p][0]), parseFloat(path[p][1])));
//                });
//
//
//            }
//            map.fitBounds(bounds);
//            map.setZoom(getZoomByBounds(map, bounds));
        });


//        var location = new google.maps.LatLng($scope.wayPointsPOI[0].location.geometry.location.lat(), $scope.wayPointsPOI[0].location.geometry.location.lng());
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': selectedCity}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    map.setCenter(results[0].geometry.location);
                    map.setZoom(8);
//                    createMarkerPOI(results[0].geometry.location);
                    callCalulationWeightage(results[0].geometry.location, mapDataToload)

                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });

    };

    function callCalulationWeightage(locationSelected, mapDataToload) {
        $scope.categorizedWeightage = {};

        angular.forEach($scope.weightagePOI, function (item, index) {
            if (item != null) {
                setTimeout(function () {
                    // Specify location, radius and place types for your Places API search.
                    var request = {
                        location: locationSelected,
//                bounds: boundsPOI,
//                        radius:10000,
                        name: item['Brand'],
                        rankBy: google.maps.places.RankBy.DISTANCE,
                        type: item['type']
                    };

                    // Create the PlaceService and send the request.
                    // Handle the callback with an anonymous function.
                    var service = new google.maps.places.PlacesService(map);
//            service.nearbySearch(request, calculateWeightage);
//            service.radarSearch(request, function (results, status, pagination) {
                    service.nearbySearch(request, function (results, status, pagination) {
//                        console.log(item['Brand'] + '  -  ' + results.length + '  -  ' + pagination);
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
//            console.log(request);
                            console.log('-------------' + index + '--------' + $scope.weightagePOI[index]['Brand'] + '  -----  ' + pagination.hasNextPage + '------' + results.length + '-------------------');
                            for (var g = 0; g < results.length; g++)
                                console.log(results[g].name);
//                    cntSearch++;
                            var wt = parseFloat(results.length * $scope.weightagePOI[index]['Weigtage']);
                            $scope.TotalWeightage = parseFloat($scope.TotalWeightage) + wt;
                            var categoryName = $scope.weightagePOI[index]['Category'];

                            if ($scope.categorizedWeightage[categoryName] == undefined || $scope.categorizedWeightage[categoryName] == null) {
                                $scope.categorizedWeightage[categoryName] = {'count': 0, 'score': 0}
                            }

                            if ($scope.weightagePOI[index]['TotalWeightage'] == "") {
                                $scope.weightagePOI[index]['TotalWeightage'] = wt;
                                $scope.weightagePOI[index]['count'] = results.length;
                            }
                            else {
                                $scope.weightagePOI[index]['TotalWeightage'] = parseFloat($scope.weightagePOI[index]['TotalWeightage']) + wt;
                                $scope.weightagePOI[index]['count'] = parseFloat($scope.weightagePOI[index]['count']) + results.length;
                            }


                            $scope.categorizedWeightage[categoryName]['score'] = $scope.categorizedWeightage[categoryName]['score'] + wt;
                            $scope.categorizedWeightage[categoryName]['count'] = parseFloat($scope.categorizedWeightage[categoryName]['count']) + $scope.weightagePOI[index]['count'];

                            if (pagination.hasNextPage) {
                                setTimeout(function () {
                                    pagination.nextPage();
                                }, 2000)

                            }
                        }
                        else {
                            console.log(status + '   ----' + $scope.weightagePOI[index]['Brand']);
                        }
                    });
                }, 500 * index);
            }
        });


        setTimeout(function () {
            $scope.loading = false;
            createMarkerPOI(locationSelected, mapDataToload);
            $scope.$apply();

//        $scope.placeZipcodesBoundries();
        }, 10000);

    }

    function createMarkerPOI(place, mapDataToload) {

        var marker = new google.maps.Marker({
            map: map,
            position: place,
//            icon : place.icon
        });
        var infoWindow = new google.maps.InfoWindow();
        var infoWindowContent = "";

//        angular.forEach($scope.weightagePOI, function(item, index){
//            infoWindowContent += '<label> ' + $scope.weightagePOI[index]['Brand']+ ' - ' + $scope.weightagePOI[index]['TotalWeightage'] + '</label> <br>'
//        });

        angular.forEach($scope.categorizedWeightage, function (item, index) {
            infoWindowContent += '<label> ' + index + ' -  #' + item['count'] + '  - score - ' + item['score'] + '</label> <br>';
        });
        infoWindowContent += '<label> Total - ' + $scope.TotalWeightage + '</label> <br>';

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(infoWindowContent);
            infoWindow.open(map, this);
        });

        arrMarkers.push(marker);

        loadMapShapePolygonJSON(mapDataToload, infoWindowContent);
    }


    function loadMapShapePolygonJSON(mapDataToload, infowindowContent) {
        map.data.forEach(function (feature) {
            // If you want, check here for some constraints.
            map.data.remove(feature);
        });
        map.data.addGeoJson(mapDataToload);
        map.data.addListener('click', function (event) {
            var myHTML = '<div id="content"  class="infowindow_warehouse">' +
                '<label id="firstHeading" class="firstHeading">' + event.feature.f['NAME'] + ', ' + event.feature.f['DISTRICT'] + ', ' +
                event.feature.f['STATE'] + '</label>' +
                '</div>';

            if ($scope.whichOverlayToShow == 'zipCodes') {
                var polygon = $scope.zipCodesData[0].geometry.coordinates;
                isPointInPoly([ event.latLng.lat(), event.latLng.lng() ], polygon); // true
            }
            else if ($scope.whichOverlayToShow == 'POI') {
                myHTML = infowindowContent;
            }

            for (i = 0; i < arrInfowindows.length; i++) {
                arrInfowindows[i].close();
            }
            arrInfowindows = [];


            var infowindow = new google.maps.InfoWindow({content: myHTML});
            infowindow.setPosition(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
            infowindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
            infowindow.open(map);
            arrInfowindows.push(infowindow);
        });
        var featureStyle = {
            strokeColor: '#ff3333',
            strokeWeight: 1,
            fillColor: 'green'
        };

        map.data.setStyle(featureStyle);
        if ($scope.whichOverlayToShow != 'POI') {
            map.setZoom(8);
        }
    }

    function isPointInPoly(point, vs) {
        var x = point[1], y = point[0];
        console.log(x);
        console.log(y);
//        var y = 28.659141, x =  77.083273;
//        Delhi
//        28.659141	77.083273
//        28.552771	76.744832
//        28.743942	77.057525
//        28.900662	77.464005
//Banglore
//        13.242760	77.430387
//        13.018079	77.507291
//        12.869517	77.867093
//        12.869517	77.312284

//Mumbai
//        19.194422	72.817316
//        19.055590	72.939538
//        19.154860	73.017129
//        19.337672	73.052835
//        19.244347	72.955331
//        19.186640	72.884607


        vs = vs[0];
        var poly = vs;
        var pt = point;

//        var a = google.maps.geometry.poly.containsLocation(point, vs);

        var inside = false;

//        for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
//            ((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1] < poly[i].y))
//            && (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
//            && (c = !c);
//        console.log(c);

        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }

        if (inside == false) {
            x = point[0];
            y = point[1];
//            console.log(x);
//            console.log(y);


            for (i = 0, j = vs.length - 1; i < vs.length; j = i++) {
                xi = vs[i][0], yi = vs[i][1];
                xj = vs[j][0], yj = vs[j][1];

                intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
        }
//        var msg  = 'Location is ' + inside?'inside ':'outside ' + 'the boundry'
//        alert(inside );

        return inside;
    }


    $scope.getSalesData = function (dbName) {
        
        $.getJSON('/getData', {"docType": dbName}, function (data) {
            $scope.filter.categoryData = data;
            $scope.salesPersonData = data;
            $scope.$apply();
//                $.each($scope.filter.filterFields, function (a, b) {
//                    var unique = $scope.filter.categoryData.filter((set => f => !set.has(f[b.key]) && set.add(f[b.key]))(new Set));
//                    console.log(unique);
//                });

            $scope.$apply();
            $scope.placeMarkesrs(data);
        });
    };

    $scope.listAllCities = function () {
        $.getJSON('/allCities', {}, function (data) {
            $scope.statesData.allCities = data;
            $scope.$apply();
        });
    };

    $scope.getPOIWeightages = function () {
        $.getJSON('/weightagePOI', {}, function (data) {
            $scope.weightagePOI = data;
            $scope.$apply();
        });
    };

    $scope.showFilters = function (filterName) {

        map.setCenter({lat:23.492690,lng: 78.680398});
        map.setZoom(5);
        
        $scope.whichOverlayToShow = filterName;
        $scope.TotalWeightage = 0;
        $scope.categorizedWeightage = {};
        $scope.statesData.selectedCity = "";
        $scope.addresses = [
            {"lat": "", "lng": "", status: ""}
        ];
        $scope.wayPointsPOI = [
            {
                'location': {},
                'locationName': {},
                'POI': ""
            }
        ];

        $scope.filter.selectedCategory = "All";
        $scope.showNavigationSaveConfirmation = false;
        //map.setZoom(5);
        //trafficLayer.setMap(null);
        //map.setCenter(myLatLng);

        flgShowAllMarkers = true;
        $scope.placeMarkesrs(null);


//        setMapStyle('default');
        if (filterName == "salesPerson") 
        {
            // $scope.clearIndiaMarkers();
            // $scope.clearAllCategoryMarkers();
            // $scope.clearAllSubcategoryMarkers();
            // $scope.clearAllPlacesMarkers();
            // $scope.clearAllHeatMaps();
            // $scope.clearFusionLayer();
            // $scope.clearCityAndRegionMarker();

            //hide store locator
            $scope.formblock = false;

            //hide traffic button
            $scope.showTrafficButton = false;

            //hide Assettracking UI
            $scope.clearAllAssetTrackingMarkersAndInfoWindows();
            showBikeMarker = false;

            
            //hide Marketing
            $scope.showMarketing = false;


            $scope.title = "Sales Tracking";
            // alert("hi all" + filterName);
            //$("#salerPersonPics").show();
            $scope.filter.selectedCategory = "Top Perforrming Sales Executives";
            $scope.showPersonAnalysis = false;
            flgShowAllMarkers = true;
            $scope.getSalesData('Top Perforrming Sales Executives');
            $scope.placeMarkesrs();
        }

        if( filterName== "POI" )
        {
            $scope.formblock = false;
            //Hide SalesTracking UI
            //$scope.whichOverlayToShow = ""; //this hides city score card UI too
            if( arrMarkers != null )
            {
                for (var key in arrMarkers) 
                {
                    //arrMarkers =[];
                    arrMarkers[key].setMap(null);
                };
            }

             //hide Assettracking UI
            $scope.clearAllAssetTrackingMarkersAndInfoWindows();
            showBikeMarker = false;

            //hide Marketing
            $scope.showMarketing = false;

            //hide traffic button
            $scope.showTrafficButton = false;
        }
    };

    
    /**
     * Place markers on map as per data given
     * @param data
     * @param isFilteredData
     * @param filterValue
     * @param filterKeyName
     */

    $scope.placeMarkesrs = function (data, isFilteredData, filterValue, filterKeyName) {
        
        if (data != null) 
        {
            var markerImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            $.each(data, function (index, item) {
            myLatLng = new google.maps.LatLng(parseFloat(this.latitude ? this.latitude : this.Latitude), parseFloat(this.longitude ? this.longitude : this.Longitude));
            var infoWindowContent = "";
            markerImage = 'http://maps.google.com/mapfiles/ms/icons/' + (this.markerColor ? this.markerColor : 'red') + '-dot.png';

            if (this.docType == 'Top Perforrming Sales Executives') 
            {
                markerImage = this['Ranking'] >= 8 ? 'images/icon/user_red.png' : this['Ranking'] >= 5 ? 'images/icon/user_blue.png' : 'images/icon/user_green.png';

                infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                    '<div id="siteNotice">' +
                    '</div>' +
                    '<img src=" images/' + this['Images1'] + '"><h2 id="firstHeading" class="firstHeading">' + this['First Name'] + ' ' + this['Last Name'] + '</h2>' +
                    '<div id="bodyContent" class="infowindow_warehouse">' +
                    '<big> <p>' +
                    '<label>City - ' + this['City'] + ', ' +
                    'State  - ' + this['State'] + '</label> <br>' +
                    '<label>Last location -  ' + this['Lastlocation'] + '</label> <br>' +
                    '<label>Battery -  ' + this['Battery'] + '</label> <br>' +
                    '</p></big>' +
                    '</div>' +
                    '</div>'
            }


            if (isFilteredData && filterValue.length > 0 && this.docType != 'Top Perforrming Sales Executives') {


                var idx = filterValue.indexOf(this[filterKeyName]);
                console.log(idx);

                if (idx != -1) {
                    if (typeof colours[CSS_COLOR_NAMES[idx].toLowerCase()] != 'undefined')
                        markerImage = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=|' + colours[CSS_COLOR_NAMES[idx].toLowerCase()] + '|0000FF'
                }
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
};

    $scope.showModal = function (showToUser, img) 
    {
        $scope.showPersonAnalysis = showToUser;
        $scope.salePersonImage = img;
    };

    $scope.clearAllAssetTrackingMarkersAndInfoWindows = function()
    {
        if (arrdirectionsDisplay != null) 
        {
            for (var i = 0; i < arrdirectionsDisplay.length; i++) 
            {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }

        if(infowindowsCollection != null)
        {
            for(var j = 0; j < infowindowsCollection.length; j++)
            {
                //console.log(j);
                infowindowsCollection[j].close();
            }
            infowindowsCollection = [];
        }

        if(arrInfowindowsAssetTrackingMarkers != null)
        {
            for(var j = 0; j < arrInfowindowsAssetTrackingMarkers.length; j++)
            {
                //console.log(j);
                arrInfowindowsAssetTrackingMarkers[j].close();
            }
            arrInfowindowsAssetTrackingMarkers = [];
        }

        if(arrInfowindows != null)
        {
            for(var j = 0; j < arrInfowindows.length; j++)
            {
                //console.log(j);
                arrInfowindows[j].close();
            }
            arrInfowindows = [];
        }

        if( arrMarkers != null )
        {
            for (var key in arrMarkers) 
            {
                arrMarkers[key].setMap(null);
                //arrMarkers =[];
            };
        }

        for (var key in arrShowMarkers) 
        {
            arrShowMarkers[key].setMap(null);
        };

        //$timeout.cancel(timer);
    }

    $scope.marketingTypeChanged = function()
    {
        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        $scope.clearCityAndRegionMarker();

        if($scope.selectedMarketingType == "Indoor")
        {
            map.setCenter({lat:1.328178,lng: 103.845055});
            map.setZoom(12);
            fusionLayer = new google.maps.FusionTablesLayer({
                query: {
                select: '\'Geocodable address\'',
                from: '1nt2z4yrRZHh9jOGqg_P_XolehEfbF7VC6-GT9Zo'
                //1nt2z4yrRZHh9jOGqg_P_XolehEfbF7VC6-GT9Zo   = for Singapore
                //1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg - Chicago
                }
            });
            fusionLayer.setMap(map);
            $scope.showMarker(1.378223,103.875572,1);
            $scope.showMarker(1.334066,103.897101,1);
            $scope.showMarker(1.303553,103.83418,1);
            $scope.showMarker(1.273481,103.845322,1);
            $scope.showMarker(1.281157,103.784939,1);
        }
        else if( $scope.selectedMarketingType == "Digital" )
        {
            map.setCenter({lat:1.328178,lng: 103.845055});
            map.setZoom(11);
            fusionLayer = new google.maps.FusionTablesLayer({
                query: {
                select: 'location',
                from: '1pf56DPihj3fX_6YHNQp-OKeHA05Jj4aUqvWuCFc' //For HeatMap
                },
                heatmap: {
                    enabled: true
                  }
            });
            fusionLayer.setMap(map);
        }
    }

    $scope.assetTracking = function ()
    { 
        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearCityAndRegionMarker();
        //hide storelocator
        $scope.formblock = false;
        //Hide SalesTracking UI
        $scope.whichOverlayToShow = ""; //this hides city score card UI too
        if( arrMarkers != null )
        {
            for (var key in arrMarkers) 
            {
                //arrMarkers =[];
                arrMarkers[key].setMap(null);
            };
        }

        //hide Marketing
        $scope.showMarketing = false;

        map.setCenter({lat:1.328178,lng: 103.845055});
        map.setZoom(11);
        var assetOriginDestDetails = [
            {"destination": {"Latitude": 1.381027, "Longitude": 103.917468}, "origin": {"Latitude": 1.345802, "Longitude": 103.639373}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Ankush Jain </h6><br>' + '<h7> Vehicle# -  MH 12 JX 1634 </h7><br>' + '<h7> Mobile# -  9673990425 </h7><br>' + '<h7> Goods Type -  Food Product </h7><br>' + '<h7> Speed -  40 km/h </h7><br>' + '<h7> Battery -  67% </h7><br>' + '</div>'},
            {"destination": {"Latitude": 1.265500, "Longitude": 103.823668}, "origin": {"Latitude": 1.438404, "Longitude": 103.766953}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akhilesh Aggarwal </h6><br>' + '<h7> Vehicle# -  MH 12 BQ 5454 </h7><br>' + '<h7> Mobile# -  8551089000 </h7><br>' + '<h7> Goods Type -  Electronics Items </h7><br>' + '<h7> Speed -  50 km/h </h7><br>' + '<h7> Battery -  43% </h7><br>' + '</div>'}
            //{"destination": {"Latitude": 24.5854, "Longitude": 73.7125}, "origin": {"Latitude": 28.7041, "Longitude": 77.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Abhishek Jha </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Cement </h7><br>' + '<h7> Speed -  30 km/h </h7><br>' + '<h7> Battery -  87% </h7><br>' + '</div>'},
            //{"destination": {"Latitude": 24.5854, "Longitude": 74.7125}, "origin": {"Latitude": 26.7041, "Longitude": 80.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akash Joshi </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Furniture </h7><br>' + '<h7> Speed -  65 km/h </h7><br>' + '<h7> Battery -  10% </h7><br>' + '</div>'}
        ];
        // var assetOriginDestDetails = [
        //     {"destination": {"Latitude": 18.541488, "Longitude": 73.883803}, "origin": {"Latitude": 18.53259461051731, "Longitude": 73.87395720399496}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Ankush Jain </h6><br>' + '<h7> Vehicle# -  MH 12 JX 1634 </h7><br>' + '<h7> Mobile# -  9673990425 </h7><br>' + '<h7> Goods Type -  Food Product </h7><br>' + '<h7> Speed -  40 km/h </h7><br>' + '<h7> Battery -  67% </h7><br>' + '</div>'},
        //     // {"destination": {"Latitude": 1.265500, "Longitude": 103.823668}, "origin": {"Latitude": 1.438404, "Longitude": 103.766953}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akhilesh Aggarwal </h6><br>' + '<h7> Vehicle# -  MH 12 BQ 5454 </h7><br>' + '<h7> Mobile# -  8551089000 </h7><br>' + '<h7> Goods Type -  Electronics Items </h7><br>' + '<h7> Speed -  50 km/h </h7><br>' + '<h7> Battery -  43% </h7><br>' + '</div>'}
        //     //{"destination": {"Latitude": 24.5854, "Longitude": 73.7125}, "origin": {"Latitude": 28.7041, "Longitude": 77.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Abhishek Jha </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Cement </h7><br>' + '<h7> Speed -  30 km/h </h7><br>' + '<h7> Battery -  87% </h7><br>' + '</div>'},
        //     //{"destination": {"Latitude": 24.5854, "Longitude": 74.7125}, "origin": {"Latitude": 26.7041, "Longitude": 80.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akash Joshi </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Furniture </h7><br>' + '<h7> Speed -  65 km/h </h7><br>' + '<h7> Battery -  10% </h7><br>' + '</div>'}
        // ];
        showBikeMarker = true;
        calcRoute(assetOriginDestDetails, false, true);
        $scope.showMarker(1.330700, 103.672792,0);
        $scope.showMarker(1.345309, 103.689468,0);
        $scope.showMarker(1.353045, 103.729125,0);
        $scope.showMarker(1.329729, 103.858286,0);
        $scope.showMarker(1.341565, 103.946813,0);
        $scope.showMarker(1.436069, 103.768623,0);
        $scope.showMarker(1.387756, 103.775031,0);
        $scope.showMarker(1.318515, 103.830182,0);
        $scope.showMarker(1.298473, 103.781391,0);
        
    };

    $scope.showMarker = function(latitude,longitude,value)
    {

        latLng = new google.maps.LatLng(latitude, longitude); 

        // Creating a marker and putting it on the map
        var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: "",
        icon: 'images/purple.png',
        //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        });

        infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
        (function(marker) {

        // Attaching a click event to the current marker
        google.maps.event.addListener(marker, "click", function(e) {
            // infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
            // + '<h3>' + cocacolaStoreData.name + '</h3>'
            // + "<br/>" + "Address: " + cocacolaStoreData.address 
            // + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
            // + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
            // + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
            if(value)
            infoWindow.setContent("<div><img src='images/sales-singapore.png'></div><div style='float:right;'><img src='images/total-sales-singapore.png'></div>");
                
            
        infoWindow.open(map, marker);
        arrInfowindowsAssetTrackingMarkers.push(infoWindow);
        
        });

        //markers.push(marker);
        arrShowMarkers.push(marker);
        })(marker);
    };

    function calcRoute(assetOriginDestDetails, supressMarkers, isAssetTracking) 
    {
        flgShowAllMarkers = false;
        if(arrdirectionsDisplay != null) 
        {
            for (i = 0; i < arrdirectionsDisplay.length; i++)
            {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        angular.forEach(assetOriginDestDetails, function (item, index) {
            var start = new google.maps.LatLng(item.origin.Latitude, item.origin.Longitude);
            var end = new google.maps.LatLng(item.destination.Latitude, item.destination.Longitude);
            var infowindow2 = new google.maps.InfoWindow();
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.DRIVING
            };
            var directionsService = new google.maps.DirectionsService();

            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) 
                {
                    var directionsDisplay = new google.maps.DirectionsRenderer(
                        {
                            suppressMarkers: supressMarkers ? supressMarkers : false
                        }
                    );
                    directionsDisplay.setMap(map);
                    directionsDisplay.setOptions({ preserveViewport: true });
                    directionsDisplay.setDirections(response);
                    arrdirectionsDisplay.push(directionsDisplay);
                    infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");


                    if (response.routes) {
                        if (response.routes[0].overview_path) {
                            if (arrLatLongTruck.length == 0) {
                                arrLatLongTruck = [response.routes[0].overview_path];
                            }
                            else {
                                arrLatLongTruck.push(response.routes[0].overview_path);
                            }
                            var index = parseInt(response.routes[0].overview_path.length / 2);
                            var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());
                        }
                    }
                    infowindow2.setPosition(infoposition ? infoposition : end);
                    infowindow2.open(map);
                    infowindowsCollection.push(infowindow2);
                    //infowindowsCollection.push(infowindow2);

                    if (isAssetTracking) 
                    {
                        var markerTruck = new google.maps.Marker({position: start, map: map, icon: 'images/icon/truck3.png'});
                        markerTruck.setMap(map);
                        markerTruck.addListener('click', function () {

                        var infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                            '<div id="siteNotice">' +
                            '</div>' +
                            '<h1 id="firstHeading" class="firstHeading">' + this['Dealer Name'] + '</h1>' +
                            '<div id="bodyContent" class="infowindow_warehouse">' +
                            '<big> <p>' +
                            '<label> nothing to show </label>' +
                            '</p></big>' +
                            '</div>' +
                            '</div>'
                        var infoWindow = new google.maps.InfoWindow({
                            content: item.markerContent ? item.markerContent : infoWindowContent
                        });
                        infoWindow.open(map, markerTruck);
                        arrInfowindows.push(infoWindow);

                        });
                        arrMarkers.push(markerTruck);

                        for (var i = 0; i < arrMarkers.length; i++) {
                            $scope.moveTruck(map, arrMarkers[i], i, 0, 0);
                        }
                    }
                }
            });
        });
    };

$scope.moveTruck = function (map, markerTruck, markerIndex, latLngindex, countDotMarker) {
        
    timer = setTimeout(function () {
        if (countDotMarker == 3 ) 
        {
            countDotMarker = 0;

            var geocoder = geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': markerTruck.position }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) 
                {
                    if (results[1]) 
                    {
                        if (showBikeMarker)
                        {
                            var markerDot = new google.maps.Marker({position: markerTruck.position, map: map, icon: 'images/marker-dot.png'});

                        markerDot.setMap(map);
                        markerDot.setPosition(markerTruck.position);
                        markerDot.addListener('click', function () {
                            for (i = 0; i < arrInfowindowsAssetTrackingMarkers.length; i++) 
                            {
                                arrInfowindowsAssetTrackingMarkers[i].close();
                            }
                            arrInfowindowsAssetTrackingMarkers = [];

                            var infoWindowContent = '<div id="content"  class="inf owindow_warehouse">' +
                                '<div id="siteNotice">' +
                                '</div>' +
                                '<div id="bodyContent" class="infowindow_warehouse">' +
                                '<big> <p>' +
                                '<label> ' + results[1].formatted_address + ' </label>' +
                                '</p></big>' +
                                '<p><i> Time : ' + $filter("date")(new Date(), "HH:mm:ss")
                                + '</i></p></div>' +
                                '</div>';
                            var infoWindow = new google.maps.InfoWindow({
                                content: infoWindowContent
                            });
                            infoWindow.open(map, markerDot);
                            arrInfowindowsAssetTrackingMarkers.push(infoWindow);
                        })
                        arrMarkers.push(markerDot);
                        }
                    }
                }
            });
        }
        else 
        {
            countDotMarker++;
        }

        markerTruck.setPosition(new google.maps.LatLng(arrLatLongTruck[markerIndex][latLngindex].lat(), arrLatLongTruck[markerIndex][latLngindex].lng()));
        latLngindex++;

        if (latLngindex <= arrLatLongTruck[markerIndex].length)
        {
            $scope.moveTruck(map, markerTruck, markerIndex, latLngindex, countDotMarker);
        }

    }, 3000)
};

    $scope.showCatergorisedLocations = function (event,index) 
    {
        $.getJSON('/getBIData', {}, function (data) {

        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearCityAndRegionMarker();

        $scope.storeNames.length = 0;  

        //checking and assiging values got from callback( index and event )
        if(index!= -1)
        $scope.categories[index].checked = event.target.checked;

        //console.log("---$scope.SelectedCountry---:",$scope.SelectedCountry);

        for (var i = 0, length = data.length; i < length; i++) 
        {
            var cocacolaStoreData = data[i];
            var typeName = cocacolaStoreData.category;
            var country = cocacolaStoreData.country;
            // console.log("---$scope.SelectedCountry---:",$scope.SelectedCountry);
            // console.log("---country------------------:",country);
            // console.log("---typeName-----------------:",typeName);
            
            for (var j = 0, categoryArraylength = $scope.categories.length; j < categoryArraylength; j++) 
            {
                selectedCategoryName = $scope.categories[j].name;
                //console.log("---selectedCategoryName-----:",selectedCategoryName);
                
                if($scope.categories[j].checked)
                { 
                    var Country = cocacolaStoreData.country;
                    console.log("---Country---:", Country);

                    if( $scope.SelectedCountry == "India" && Country == "India"  )
                    {
                        map.setCenter({lat:23.492690,lng: 78.680398});
                        map.setZoom(5);
    
                        if( selectedCategoryName == "POS" && typeName == "pos" )
                        {
                            console.log("---in India POS---:");
                            userSelectedCategoryName = "POS";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            //infoWindow = new google.maps.InfoWindow();
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });

                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);

                            infoWindow.open(map, marker);
                            });

                            categoryPOSmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Production Centres" && typeName == "productioncentres" )
                        {
                            userSelectedCategoryName = "Production Centres";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/pink.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            });

                            categoryProductionCentresMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Warehouses" && typeName == "warehouses")
                        {
                            userSelectedCategoryName = "Warehouses";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/green.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            });

                            categoryWarehouseMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Distribution Centres" && typeName == "distributioncentre")
                        {
                            userSelectedCategoryName = "Distrubition Centres";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/blue.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );

                            });

                            categoryDistributionCentreMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                    }
                    else if($scope.SelectedCountry == "Singapore" && Country == "Singapore")
                    {
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
    
                        if( selectedCategoryName == "POS" && typeName == "pos" )
                        {
                            console.log("---in Singapore POS---:");
                            userSelectedCategoryName = "POS";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            //infoWindow = new google.maps.InfoWindow();
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });

                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);

                            infoWindow.open(map, marker);
                            });

                            categoryPOSmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Production Centres" && typeName == "productioncentres" )
                        {
                            userSelectedCategoryName = "Production Centres";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/pink.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            });

                            categoryProductionCentresMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Warehouses" && typeName == "warehouses")
                        {
                            userSelectedCategoryName = "Warehouses";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/green.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            });

                            categoryWarehouseMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedCategoryName == "Distribution Centres" && typeName == "distributioncentre")
                        {
                            userSelectedCategoryName = "Distrubition Centres";
                            $scope.storeNames.push(cocacolaStoreData);

                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/blue.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });

                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {

                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );

                            });

                            categoryDistributionCentreMarker.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                    } 
                }
                else
                {
                    if( selectedCategoryName == "POS" && typeName == "pos" )
                    {
                        $scope.clearCategoryPOSMarkers();
                    }
                    else if(selectedCategoryName == "Production Centres" && typeName == "productioncentres")
                    {
                        $scope.clearCategoryProductionCentresMarkers();
                    }
                    else if(selectedCategoryName == "Warehouses" && typeName == "warehouses")
                    {
                        $scope.clearCategoryWarehouseMarkers();
                    }
                    else if(selectedCategoryName == "Distribution Centres" && typeName == "distributioncentre")
                    {
                        $scope.clearDistributionCentreMarkers();
                    }
                }
            }  
        }  
        
        $scope.$apply();
    });
};

$scope.searchForSalesRevenue = function()
{
        if( markers != null )
        {
            for (var key in markers) 
            {
                markers[key].setMap(null);
                //markers =[];
            };
        }

        for (var key in markers) 
        {
            //markers[key].setMap(null);
            markers =[];
        };

    $.getJSON('/getBIData', {}, function (data) {
                                
        //$scope.storeNames.length = 0;  commented to display , POS related data.
        //$scope.storeNames.push(allOption);
        //$scope.clearAllCategoryMarkers();add this later.
        
         $scope.clearIndiaMarkers();
        // $scope.clearAllCategoryMarkers();
        // $scope.clearAllSubcategoryMarkers();
        // $scope.clearAllPlacesMarkers();
        // $scope.clearAllHeatMaps();
        // $scope.clearFusionLayer();
        // $scope.clearCityAndRegionMarker();
        

        

        console.log("---($scope.minValueSalesRevenue---: ",$scope.minValueSalesRevenue);
        console.log("--- $scope.maxValueSalesRevenue---: ", $scope.maxValueSalesRevenue);
        //console.log("---data.length---:",data.length);

        for (var i = 0, length = data.length; i < length; i++) 
        { 
            var storeData = data[i];
            
            if( ($scope.minValueSalesRevenue == null || $scope.minValueSalesRevenue == "" ) 
            && ( $scope.maxValueSalesRevenue == null || $scope.maxValueSalesRevenue == "" ) )
            {
                console.log("---Both Null---");
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    // $scope.storeNames.push(storeData);
                    // var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    // $scope.heatmapArray.push(heatmapPoint);

                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:1.328178,lng: 103.845055});
                    map.setZoom(11);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/red1.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                        + '<h3>' + storeData.name + '</h3>'
                        + "<br/>" + "Address: " + storeData.address 
                        + "<br/>" + "Contact No: " + storeData.contact 
                        + "<br/>" + "Operating Hours: " +storeData.timing
                        + "<br/>" + "Average Sales per Month: " + storeData.averagesalespermonth
                        + "<br/>" + "Available Products: " +storeData.productclassification);
                    infoWindow.open(map, marker);

                    });

                    markers.push(marker);

                    })(marker, storeData);
                }
            }
            else if( ( $scope.minValueSalesRevenue == null || $scope.minValueSalesRevenue == "" ) && $scope.maxValueSalesRevenue != null )
            {    
                console.log("---Only Min Null---:");
                if( storeData.averagesalespermonth < $scope.maxValueSalesRevenue )
                {
                    console.log("---storeData.averagesalespermonth---:",storeData.averagesalespermonth);
                    if( storeData.latitude != null && storeData.longitude != null  )
                    {
                        // $scope.storeNames.push(storeData);
                        // var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                        // $scope.heatmapArray.push(heatmapPoint);

                        latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                        
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: storeData.name,
                        icon: 'images/red1.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                        (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                            + '<h3>' + storeData.name + '</h3>'
                            + "<br/>" + "Address: " + storeData.address 
                            + "<br/>" + "Contact No: " + storeData.contact 
                            + "<br/>" + "Operating Hours: " +storeData.timing
                            + "<br/>" + "Average Sales per Month: " + storeData.averagesalespermonth
                            + "<br/>" + "Available Products: " +storeData.productclassification);
                        infoWindow.open(map, marker);

                        });

                        markers.push(marker);

                        })(marker, storeData);
                    }
                }
            }
            else if( ( $scope.maxValueSalesRevenue == null || $scope.maxValueSalesRevenue == "" ) && $scope.minValueSalesRevenue != null )
            {
                console.log("---Only Max Null---");
                if(storeData.averagesalespermonth > $scope.minValueSalesRevenue)
                {
                    if( storeData.latitude != null && storeData.longitude != null  )
                    {
                        // $scope.storeNames.push(storeData);
                        // var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                        // $scope.heatmapArray.push(heatmapPoint);

                        latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                        
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: storeData.name,
                        icon: 'images/red1.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                        (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                            + '<h3>' + storeData.name + '</h3>'
                            + "<br/>" + "Address: " + storeData.address 
                            + "<br/>" + "Contact No: " + storeData.contact 
                            + "<br/>" + "Operating Hours: " +storeData.timing
                            + "<br/>" + "Average Sales per Month: " + storeData.averagesalespermonth
                            + "<br/>" + "Available Products: " +storeData.productclassification);
                        infoWindow.open(map, marker);

                        });

                        markers.push(marker);

                        })(marker, storeData);
                    }
                }
            }
            else if( $scope.minValueSalesRevenue != null && $scope.maxValueSalesRevenue != null )
            {
                console.log("---Both Not Null---");
                if(storeData.averagesalespermonth > $scope.minValueSalesRevenue && storeData.averagesalespermonth < $scope.maxValueSalesRevenue )
                {
                    if( storeData.latitude != null && storeData.longitude != null  )
                    {
                        // $scope.storeNames.push(storeData);
                        // var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                        // $scope.heatmapArray.push(heatmapPoint);

                        latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                        
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: storeData.name,
                        icon: 'images/red1.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                        (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                            + '<h3>' + storeData.name + '</h3>'
                            + "<br/>" + "Address: " + storeData.address 
                            + "<br/>" + "Contact No: " + storeData.contact 
                            + "<br/>" + "Operating Hours: " +storeData.timing
                            + "<br/>" + "Average Sales per Month: " + storeData.averagesalespermonth
                            + "<br/>" + "Available Products: " +storeData.productclassification);
                        infoWindow.open(map, marker);

                        });

                        markers.push(marker);

                        })(marker, storeData);
                    }
                }
            }
        }
    //     countryMarkerCluster = new MarkerClusterer(map, markers,
    //    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
        setTimeout(function(){ $scope.$apply(); },100);
    });
};

$scope.showSubCatergorisedLocations = function (event,index) 
{
    $.getJSON('/getBIData', {}, function (data) {

    $scope.clearAllHeatMaps();
    $scope.clearFusionLayer();
    $scope.clearCityAndRegionMarker();

  
    $scope.storeNames.length = 0;  

    //If user selects subcategory directly, for now, we are checking POS as a default category. 
    if(!$scope.categories[0].checked)
    {
        $scope.categories[0].checked = true;
        userSelectedCategoryName = "POS";
    }

    //checking and assiging values got from callback( index and event )
    if(index!= -1)
    $scope.subCategories[index].checked = event.target.checked;

    for (var i = 0, length = data.length; i < length; i++) 
    {
        var cocacolaStoreData = data[i];
        var typeName = cocacolaStoreData.productclassification;

        for (var j = 0, categoryArraylength = $scope.subCategories.length; j < categoryArraylength; j++) 
        {
            var selectedSubCategoryName = $scope.subCategories[j].name;

            if($scope.subCategories[j].checked)
            {
                var Country = cocacolaStoreData.country;

                if( $scope.SelectedCountry == "India" && Country == "India"  )
                {
                    if( userSelectedCategoryName == "POS" )
                    {            
                        $scope.clearCategoryPOSMarkers();
                        if( selectedSubCategoryName == "Beauty & Hygiene" && typeName == "Beauty and Hygiene")
                        {
                            console.log("---Beauty & Hygiene---");
                            
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBeautyAndHygienemarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Bakery & Cakes" && typeName == "Bakery and Cakes" )
                        {
    
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude);
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBakeryAndCakesmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Cleaning & Household" && typeName == "Cleaning and Household")
                        {
    
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryCleaningAndHouseholdmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Fruits & Vegetables" && typeName == "Fruits and vegetables" )
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
    
                            });
    
                            subcategoryFruitsAndVegetablesmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Cereals" && typeName == "Cereals" )
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
    
                            });
    
                            subcategoryCerealsmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Baby Care" && typeName == "Baby Care")
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBabyCaremarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                    }
                    else if(userSelectedCategoryName == "Production Centres")
                    {
    
                    }
                    else if(userSelectedCategoryName == "Warehouses")
                    {
    
                    }
                    else if(userSelectedCategoryName == "Distribution Centres")
                    {
    
                    }

                }
                else if($scope.SelectedCountry == "Singapore" && Country == "Singapore" )
                {
                    if( userSelectedCategoryName == "POS" )
                    {            
                        $scope.clearCategoryPOSMarkers();
                        if( selectedSubCategoryName == "Beauty & Hygiene" && typeName == "Beauty and Hygiene")
                        {
                            console.log("---Beauty & Hygiene---");
                            
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBeautyAndHygienemarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Bakery & Cakes" && typeName == "Bakery and Cakes" )
                        {
    
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude);
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBakeryAndCakesmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Cleaning & Household" && typeName == "Cleaning and Household")
                        {
    
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryCleaningAndHouseholdmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Fruits & Vegetables" && typeName == "Fruits and vegetables" )
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
    
                            });
    
                            subcategoryFruitsAndVegetablesmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Cereals" && typeName == "Cereals" )
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
    
                            });
    
                            subcategoryCerealsmarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                        else if(selectedSubCategoryName == "Baby Care" && typeName == "Baby Care")
                        {
                            $scope.storeNames.push(cocacolaStoreData);
    
                            latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                            // Creating a marker and putting it on the map
                            var marker = new google.maps.Marker({
                            position: latLng,
                            map: map,
                            title: cocacolaStoreData.name,
                            icon: 'images/purple.png',
                            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                            });
    
                            infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                            (function(marker, cocacolaStoreData) {
    
                            // Attaching a click event to the current marker
                            google.maps.event.addListener(marker, "click", function(e) {
                                infoWindow.setContent("<div style='float:left'><img src='images/"+ cocacolaStoreData.imagename + "'>" 
                                + '<h3>' + cocacolaStoreData.name + '</h3>'
                                + "<br/>" + "Address: " + cocacolaStoreData.address 
                                + "<br/>" + "Contact No: " + cocacolaStoreData.contact 
                                + "<br/>" + "Operating Hours: " +cocacolaStoreData.timing
                                + "<br/>" + "Available Products: " +cocacolaStoreData.productclassification);
                            infoWindow.open(map, marker);
                            //$scope.clearDirection();
                            dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                            //$scope.showDirections(myLatLng,dirLatLng,storeData );
    
                            });
    
                            subcategoryBabyCaremarkers.push(marker);
                            })(marker, cocacolaStoreData);
                        }
                    }
                    else if(userSelectedCategoryName == "Production Centres")
                    {
    
                    }
                    else if(userSelectedCategoryName == "Warehouses")
                    {
    
                    }
                    else if(userSelectedCategoryName == "Distribution Centres")
                    {
    
                    }

                }
    
            }
            else
            {
                if( userSelectedCategoryName == "POS" )
                {
                    if( selectedSubCategoryName == "Beauty & Hygiene" && typeName == "Beauty and Hygiene")
                    {
                        $scope.clearSubcategoryBeautyAndHygienemarkers();
                    }
                    else if(selectedSubCategoryName == "Bakery & Cakes" && typeName == "Bakery and Cakes" )
                    {
                        $scope.clearSubcategoryBakeryAndCakesmarkers();
                    }
                    else if(selectedSubCategoryName == "Cleaning & Household" && typeName == "Cleaning and Household" )
                    {
                        $scope.clearSubcategoryCleaningAndHouseholdmarkers();
                    }
                    else if(selectedSubCategoryName == "Fruits & Vegetables" && typeName == "Fruits and vegetables" )
                    {
                        $scope.clearSubcategoryFruitsAndVegetablesmarkers();
                    }
                    else if(selectedSubCategoryName == "Cereals" && typeName == "Cereals")
                    {
                        $scope.clearSubcategoryCerealsmarkers();
                    }
                    else if(selectedSubCategoryName == "Baby Care" && typeName == "Baby Care")
                    {
                        $scope.clearSubcategoryBabyCaremarkers();
                    }
                }
                else if(userSelectedCategoryName == "Production Centres")
                {

                }
                else if(userSelectedCategoryName == "Warehouses")
                {

                }
                else if(userSelectedCategoryName == "Distribution Centres")
                {

                }            
            }
        }  
    }   
    $scope.$apply();
});
};

$scope.countryChange = function()
{
    //$scope.formblock = false;

    //$scope.SelectedCountry = name;

    $scope.clearAllCategoryMarkers();
    $scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearCityAndRegionMarker();
    $scope.storeNames.length = 0; 
    $scope.showStorePlaceTypes = false;
    for (var i = 0, length = $scope.categories.length; i < length; i++) 
    {
        $scope.categories[i].checked = false;
    }

    for (var i = 0, length = $scope.subCategories.length; i < length; i++) 
    {
        $scope.subCategories[i].checked = false;
    }


    console.log("---$scope.SelectedCountry---:",$scope.SelectedCountry);
    

    if( $scope.SelectedCountry == "India" )
    {
        
        $scope.clearIndiaMarkers();
        $scope.showAllLocations();
    }
    else if( $scope.SelectedCountry == "Singapore" )
    {
        $scope.clearIndiaMarkers();
        $scope.showAllLocations();
        
    }
    else
    {
        $scope.clearIndiaMarkers();
        map.setCenter({lat:23.492690,lng: 78.680398});
        map.setZoom(5);
    }
}

    $scope.showAllLocations = function () 
    {
        $.getJSON('/getBIData', {}, function (data) {

            $scope.allStoresArray = data;
                                
            //$scope.storeNames.length = 0;  commented to display , POS related data.
            //$scope.storeNames.push(allOption);
            //$scope.clearAllCategoryMarkers();add this later.
            $scope.clearAllHeatMaps();
            $scope.clearFusionLayer();

            console.log("---data.length---:",data.length);

            for (var i = 0, length = data.length; i < length; i++) 
            { 
                var storeData = data[i];
                
                if ($scope.SelectedCountry == "India" && storeData.country == "India")
                {       
                    //$scope.storeNames.push(data[i]);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:23.492690,lng: 78.680398});
                    map.setZoom(5);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/red1.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                        + '<h3>' + storeData.name + '</h3>'
                        + "<br/>" + "Address: " + storeData.address 
                        + "<br/>" + "Contact No: " + storeData.contact 
                        + "<br/>" + "Operating Hours: " +storeData.timing
                        + "<br/>" + "Available Products: " +storeData.productclassification);
                    infoWindow.open(map, marker);

                    });

                    markers.push(marker);

                    })(marker, storeData);
                } 
                else if ($scope.SelectedCountry == "Singapore" && storeData.country == "Singapore")
                {
                    //$scope.storeNames.push(data[i]);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:1.328178,lng: 103.845055});
                    map.setZoom(11);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/red1.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                        + '<h3>' + storeData.name + '</h3>'
                        + "<br/>" + "Address: " + storeData.address 
                        + "<br/>" + "Contact No: " + storeData.contact 
                        + "<br/>" + "Operating Hours: " +storeData.timing
                        + "<br/>" + "Available Products: " +storeData.productclassification);
                    infoWindow.open(map, marker);

                    });

                    markers.push(marker);

                    })(marker, storeData);
                }   
            }
            countryMarkerCluster = new MarkerClusterer(map, markers,
           {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
            $scope.$apply();
        });
    };

    $scope.showHeatMap = function()
    {
        var latlng = new google.maps.LatLng(1.322532, 103.808953);
        map = new google.maps.Map(document.getElementById('mymap'), {
        center: latlng,
        zoom: 11,
        //mapTypeId: 'satellite'
        });

        heatmap = new google.maps.visualization.HeatmapLayer({
        data: $scope.getPoints(),
        map: map
        });
    }

    
    $scope.clearFusionLayer = function()
    {
        if( fusionLayer != null )
        {
            fusionLayer.setMap(null);
        }
    }

    $scope.clearIndiaMarkers = function()
    {
        if( markers != null )
        {
            for (var key in markers) 
            {
                //markers[key].setMap(null);
                markers =[];
            };
        }
        
        if( countryMarkerCluster != null )
        {
            countryMarkerCluster.length = 0;
            countryMarkerCluster.clearMarkers();
        }
        
    }; 

    $scope.clearAllPlacesMarkers = function()
    {
        $scope.clearRestaurantsMarker();
        $scope.clearFacebookRestaurantsMarker();
        $scope.clearZomatoRestaurantsMarker();
        $scope.clearAirportMarkers();
        $scope.clearBarMarkers();
        $scope.clearBusstationMarkers();
        $scope.clearCafeMarkers();
        $scope.clearCasinoMarkers();
        $scope.clearParkMarkers();
        $scope.clearSubwayMarker();
        $scope.clearShoppingMallMarker();
        $scope.clearNightClubsMarker();
        $scope.clearLiquorStoreMarkers();
        $scope.clearMovieTheatersMarkers();
        $scope.clearMealTakewayMarkers();
        $scope.clearSuperMarketsMarker();
    };

    $scope.clearCityAndRegionMarker = function()
    {
        for (var key in cityAndRegionMarkers) 
        {
            cityAndRegionMarkers[key].setMap(null);
        };
    };

    $scope.clearRestaurantsMarker = function()
    {
        for (var key in restaurantsMarkers) 
        {
            restaurantsMarkers[key].setMap(null);
        };
        //restaurantsMarkers.length = 0;

        //if (countryMarkerCluster!=null)
        //countryMarkerCluster.clearMarkers();
    };

    $scope.clearFacebookRestaurantsMarker = function()
    {
        for (var key in facebookRestaurantsMarkers) 
        {
            facebookRestaurantsMarkers[key].setMap(null);
        };
        //restaurantsMarkers.length = 0;
    };

    $scope.clearZomatoRestaurantsMarker = function()
    {
        for (var key in zomatoRestaurantsMarkers) 
        {
            zomatoRestaurantsMarkers[key].setMap(null);
        };
        //restaurantsMarkers.length = 0;
    };

    $scope.clearAirportMarkers = function()
    {
        for (var key in airportMarkers) 
        {
            airportMarkers[key].setMap(null);
        };
        //airportMarkers.length = 0;
       // airportMarkersCluster.clearMarkers();
    };

    $scope.clearBarMarkers = function()
    {
        for (var key in barMarkers) 
        {
            barMarkers[key].setMap(null);
        };
        //barMarkers.length = 0;
       // barMarkersCluster.clearMarkers();

    };

    $scope.clearBusstationMarkers = function()
    {
        for (var key in busstationMarkers) 
        {
            busstationMarkers[key].setMap(null);
        };
        //busstationMarkers.length = 0;
        //busstationMarkersCluster.clearMarkers();
    };

    $scope.clearCafeMarkers = function()
    {
        for (var key in cafeMarkers) 
        {
            cafeMarkers[key].setMap(null);
        };
        //cafeMarkers.length = 0;
        //cafeMarkersCluster.clearMarkers();
    };

    $scope.clearCasinoMarkers = function()
    {
        for (var key in casinoMarkers) 
        {
            casinoMarkers[key].setMap(null);
        };
        //casinoMarkers.length = 0;
        //casinoMarkersCluster.clearMarkers();
    };

    $scope.clearParkMarkers = function()
    {
        for (var key in parkMarkers) 
        {
            parkMarkers[key].setMap(null);
        };
        //parkMarkers.length = 0;
        //parkMarkersCluster.clearMarkers();
    };

    $scope.clearSubwayMarker = function()
    {
        
        for (var key in subwayMarkers) 
        {
            subwayMarkers[key].setMap(null);
        };
        //subwayMarkers.length = 0;
        //subwayMarkersCluster.clearMarkers();
    };

    $scope.clearShoppingMallMarker = function()
    {
        
        for (var key in shoppingMallMarkers) 
        {
            shoppingMallMarkers[key].setMap(null);
        };
        //shoppingMallMarkers.length = 0;
        //shoppingMallMarkersCluster.clearMarkers();
    };

    $scope.clearNightClubsMarker = function()
    {

        for (var key in nightClubsMarkers) 
        {
            nightClubsMarkers[key].setMap(null);
        };
       // nightClubsMarkers.length = 0;
       // nightClubsMarkersCluster.clearMarkers();
    };

    $scope.clearSuperMarketsMarker = function()
    {
        for (var key in superMarketMarkers) 
        {
            superMarketMarkers[key].setMap(null);
        };
        //superMarketMarkers.length = 0;
        //superMarketMarkersCluster.clearMarkers();
    };

    $scope.clearLiquorStoreMarkers = function()
    {
        for (var key in liquorStoreMarkers) 
        {
            liquorStoreMarkers[key].setMap(null);
        };
        //liquorStoreMarkers.length = 0;
        //liquorStoreMarkersCluster.clearMarkers();
    };

    $scope.clearMovieTheatersMarkers = function()
    {
        for (var key in movietheatermarkers) 
        {
            movietheatermarkers[key].setMap(null);
        };
        //movietheatermarkers.length = 0;
       // movietheatermarkersCluster.clearMarkers();
    };

    $scope.clearMealTakewayMarkers = function()
    {
        for (var key in MealTakeAwayMarkers) 
        {
            MealTakeAwayMarkers[key].setMap(null);
        };
       // MealTakeAwayMarkers.length = 0;
        //MealTakeAwayMarkersCluster.clearMarkers();
    };

    $scope.clearAllCategoryMarkers = function()
    {
        $scope.clearCategoryPOSMarkers();
        $scope.clearCategoryProductionCentresMarkers();
        $scope.clearCategoryWarehouseMarkers();
        $scope.clearDistributionCentreMarkers();
    }

    $scope.clearCategoryPOSMarkers = function()
    {
        for (var key in categoryPOSmarkers) 
        {
            categoryPOSmarkers[key].setMap(null);
        };
    };

    $scope.clearCategoryProductionCentresMarkers = function()
    {
        for (var key in categoryProductionCentresMarker) 
        {
            categoryProductionCentresMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryWarehouseMarkers = function()
    {
        for (var key in categoryWarehouseMarker) 
        {
            categoryWarehouseMarker[key].setMap(null);
        };
    };

    $scope.clearDistributionCentreMarkers = function()
    {
        for (var key in categoryDistributionCentreMarker) 
        {
            categoryDistributionCentreMarker[key].setMap(null);
        };
    };

    $scope.clearAllCategoryMarkers = function()
    {
        $scope.clearCategoryPOSMarkers();
        $scope.clearCategoryProductionCentresMarkers();
        $scope.clearCategoryWarehouseMarkers();
        $scope.clearDistributionCentreMarkers();
    }

    $scope.clearSubcategoryBeautyAndHygienemarkers = function()
    {
        for (var key in subcategoryBeautyAndHygienemarkers) 
        {
            subcategoryBeautyAndHygienemarkers[key].setMap(null);
        };
    };

    $scope.clearSubcategoryBakeryAndCakesmarkers = function()
    {
        for (var key in subcategoryBakeryAndCakesmarkers) 
        {
            subcategoryBakeryAndCakesmarkers[key].setMap(null);
        };
    };

    $scope.clearSubcategoryCleaningAndHouseholdmarkers = function()
    {
        for (var key in subcategoryCleaningAndHouseholdmarkers) 
        {
            subcategoryCleaningAndHouseholdmarkers[key].setMap(null);
        };
    };

    $scope.clearSubcategoryFruitsAndVegetablesmarkers = function()
    {
        for (var key in subcategoryFruitsAndVegetablesmarkers) 
        {
            subcategoryFruitsAndVegetablesmarkers[key].setMap(null);
        };
    };

    $scope.clearSubcategoryCerealsmarkers = function()
    {
        for (var key in subcategoryCerealsmarkers) 
        {
            subcategoryCerealsmarkers[key].setMap(null);
        };
    };

    $scope.clearSubcategoryBabyCaremarkers = function()
    {
        for (var key in subcategoryBabyCaremarkers) 
        {
            subcategoryBabyCaremarkers[key].setMap(null);
        };
    };

    $scope.clearAllSubcategoryMarkers = function()
    {
        $scope.clearSubcategoryBeautyAndHygienemarkers();
        $scope.clearSubcategoryBakeryAndCakesmarkers();
        $scope.clearSubcategoryCleaningAndHouseholdmarkers();
        $scope.clearSubcategoryFruitsAndVegetablesmarkers();
        $scope.clearSubcategoryCerealsmarkers();
        $scope.clearSubcategoryBabyCaremarkers();
    };

    $scope.clearAllHeatMaps = function()
    {
        $scope.clearEastHeatmap();
        $scope.clearWestHeatmap();
        $scope.clearSouthHeatmap();
        $scope.clearNorthHeatmap();
    };

    $scope.clearEastHeatmap = function()
    {
        if(heatmapEast)
        {
            heatmapEast.setMap(null);
        }  
    };

    $scope.clearWestHeatmap = function()
    {
        if(heatmapWest)
        {
            heatmapWest.setMap(null);
        }  
    };

    $scope.clearSouthHeatmap = function()
    {
        if(heatmapSouth)
        {
            heatmapSouth.setMap(null);
        } 
    };

    $scope.clearNorthHeatmap = function()
    {
        if(heatmapNorth)
        {
            heatmapNorth.setMap(null);
        } 
    };



    $scope.clearRadius = function()
    {
        if (radius_circle) 
        {
            radius_circle.setMap(null);
            radius_circle = null;
        }
    };

    $scope.clearDirection = function()
    {
        if (directionsDisplayCollection != null) 
        {
            for (var i = 0; i < directionsDisplayCollection.length; i++) 
            {
                directionsDisplayCollection[i].setMap(null);
                directionsDisplayCollection[i] = null;
            }
            directionsDisplayCollection = [];
        }
    };

    $scope.clearInfoWindow = function()
    {
        if(infowindowsCollection != null)
        {
            for(var j = 0; j < infowindowsCollection.length; j++)
            {
                console.log(j);
                infowindowsCollection[j].close();
            }
            infowindowsCollection = [];
        }
    };


    $scope.showDirections = function(start, end, locationObject)
    {
        $scope.clearDirection();
        $scope.clearInfoWindow();
        $scope.clearRadius();

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
            
        request = {
            origin: start,
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) 
        {
            if (status == google.maps.DirectionsStatus.OK) 
            {
            var directionsDisplay = new google.maps.DirectionsRenderer(
                {
                    suppressMarkers: true
                }
            );
            directionsDisplay.setMap(map);
            directionsDisplay.setOptions({ preserveViewport: true });
            directionsDisplay.setDirections(response);
            directionsDisplayCollection.push(directionsDisplay);
            directionsDisplay.setPanel(document.getElementById('directionsList'));

            
            infowindow2 = new google.maps.InfoWindow();

            infowindow2.setContent(locationObject.name + "<br>" 
            +locationObject.address + "<br>" 
            +response.routes[0].legs[0].distance.text + "<br>" 
            +response.routes[0].legs[0].duration.text + " ");
            if (response.routes) 
            {
                if (response.routes[0].overview_path) {
                    var index = parseInt(response.routes[0].overview_path.length / 2);
                    //var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());
                }
            }
            //infowindow2.setPosition(infoposition ? infoposition : end);
            infowindow2.open(map);
            infowindowsCollection.push(infowindow2);
            }
            else
            {

            console.log(" Direction Not found : " ) + start + " , " + end;
            }
            });
    };

    $scope.restaurantCallback = function(results, status)
    {
       // var restaurantsCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForRestaurant(results[i]);
        }
        }
       
        // countryMarkerCluster = new MarkerClusterer(map, restaurantsMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.airportCallback = function(results, status)
    {
        //var airportCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForAirport(results[i]);
        }
        }
        // airportMarkersCluster = new MarkerClusterer(map, airportMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.barCallback = function(results, status)
    {
        //var barCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForBar(results[i]);
        }
        }
        // barMarkersCluster = new MarkerClusterer(map, barMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.busStationCallback = function(results, status)
    {
       // var busCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForBusStop(results[i]);
        }
        }
        // busstationMarkersCluster = new MarkerClusterer(map, busstationMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.cafeCallback = function(results, status)
    {
        //var cafeCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForCafe(results[i]);
        }
        }
        // cafeMarkersCluster = new MarkerClusterer(map, cafeMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.casinoCallback = function(results, status)
    {
        //var casinoCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForCasino(results[i]);
        }
        }
        // casinoMarkersCluster = new MarkerClusterer(map, casinoMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.liquorStoreCallback = function(results, status)
    {
        //var liquorStoreCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForLiquor(results[i]);
        }
        }
        // liquorStoreMarkersCluster = new MarkerClusterer(map, liquorStoreMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.mealTakeawayCallback = function(results, status)
    {
        //var mealTakeAwayCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForMealTakeAway(results[i]);
        }
        }
        // MealTakeAwayMarkersCluster = new MarkerClusterer(map, MealTakeAwayMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.movieTheaterCallback = function(results, status)
    {
        //var movieTheaterCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForMovieTheater(results[i]);
        }
        }
        
        // movietheatermarkersCluster = new MarkerClusterer(map, movietheatermarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.nightClubCallback = function(results, status)
    {
        //var nightClubCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForNightClubs(results[i]);
        }
        }
        // nightClubsMarkersCluster = new MarkerClusterer(map, nightClubsMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.parkCallback = function(results, status)
    {
        //var parkCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForPark(results[i]);
        }
        }
        // parkMarkersCluster = new MarkerClusterer(map, parkMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.supermarketCallback = function(results, status)
    {
        //var superMarketCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForSuperMarket(results[i]);
        }
        }
        // superMarketMarkersCluster = new MarkerClusterer(map, superMarketMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.subwayCallback = function(results, status)
    {
        //var subwayCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForSubway(results[i]);
        }
        }
        // subwayMarkersCluster = new MarkerClusterer(map, subwayMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.shoppingmallCallback = function(results, status)
    {
        //var shoppingMallCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
        google.maps.places.type
        for (var i = 0; i < results.length; i++) 
        {
            $scope.createPlacesMarkerForShoppingMall(results[i]);
        }
        }
        // shoppingMallMarkersCluster = new MarkerClusterer(map, shoppingMallMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.createPlacesMarkerForRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/restaurant.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });
    
        google.maps.event.addListener(restaurantMarker, 'click', function() {
        infowindowplacesmarker.setContent( "Name     : " + place.name
                                        + "<br>" + "Ratings     : " + place.rating
                                        + "<br>" + "Address     : " + place.formatted_address
                                        + "<br>" + "Phone Number: " + place.formatted_phone_number
                                        + "<br>" + "Vicinity    : " + place.vicinity
                                        + "<br>" + "Website     : " + place.website
                                        + "<br>" + "International Number: " + place.international_phone_number
                                        + "<br>" + "Phone Number: " + place.formatted_phone_number
                                        + "<br>" + "Place Id    : " + place.place_id
                                        //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                    );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        restaurantsMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForFacebookRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        locationLatLng = new google.maps.LatLng(place.location.latitude, place.location.longitude); 
        var image = 'images/fbicon.png';
        
        infowindowplacesmarker = new google.maps.InfoWindow();
        
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : locationLatLng
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
          infowindowplacesmarker.setContent( "Name     : " + place.name
                                          + "<br>" + "Ratings  : " + place.overall_star_rating
                                          + "<br>" + "Checkins : " + place.checkins
                                          + "<br>" + "Address  : " + place.location.street
                                      );
          infowindowplacesmarker.open(map, this);
          infowindowsCollection.push(infowindowplacesmarker);
          });
          facebookRestaurantsMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForZomatoRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        locationLatLng = new google.maps.LatLng(place.location.latitude, place.location.longitude); 
        var image = 'images/zomatoicon.png';
        
        infowindowplacesmarker = new google.maps.InfoWindow();
        
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : locationLatLng
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {

            var reviewText = "";
            $http({
                method: 'GET',
                url: 'https://developers.zomato.com/api/v2.1/reviews?',
                headers: {'user-key' : '1b6ddcb47426d068e923e86a6046a39b'},
                params: {
                  res_id: place.id, 
                  start: 0,
                  count : 5
                }
            }).success(function(data) {
              //console.log("---success---:",data);
              for (var i = 0; i < data.user_reviews.length; i++) 
              {
                //console.log("---Review Text---: ",data.user_reviews[i].review.review_text);
                //console.log("---Ratings-------: ",data.user_reviews[i].review.rating);
                if( data.user_reviews.length == 1)
                {
                  reviewText = "<br>" + (i+1) + ". " + data.user_reviews[i].review.review_text;
                }
                else
                {
                  reviewText = reviewText + "<br>" + (i+1) + ". " + data.user_reviews[i].review.review_text;
                }
                
              }
              //console.log("---Final Text -------: ",reviewText);
              infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.user_rating.aggregate_rating
                                            + "<br>" + "Address     : " + place.location.address
                                            + "<br>" + "City        : " + place.location.city
                                            + "<br>" + "Locality    : " + place.location.locality
                                            + "<br>" + "Reviews     : " + reviewText
                                            // + "<br>" + "Website     : " + place.website
                                            // + "<br>" + "International Number: " + place.international_phone_number
                                            // + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            // + "<br>" + "Place Id    : " + place.place_id
                                            // //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
            }).error(function(error) {
              console.log("---error---:",error);
            });

            infowindowplacesmarker.open(map, this);
            infowindowsCollection.push(infowindowplacesmarker);
            });
            zomatoRestaurantsMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForPark = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/restaurant.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        parkMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForNightClubs = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/restaurant.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        nightClubsMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForCasino = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/casino-2.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        casinoMarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForLiquor = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/liquor.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        liquorStoreMarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForAirport = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/airport.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
        infowindowplacesmarker.setContent( "Name     : " + place.name
                                        + "<br>" + "Ratings     : " + place.rating);
                                        //+ "<br>" + "Address     : " + place.formatted_address
                                        //+ "<br>" + "Phone Number: " + place.formatted_phone_number);
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        airportMarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForBusStop = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/busstop.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            //+ "<br>" + "Reviews    : " + place.reviews[0].text
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        busstationMarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForBar = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/bar_coktail.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );

        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        barMarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForSuperMarket = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/supermarket.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        superMarketMarkers.push(restaurantMarker); 
    };

    

    $scope.createPlacesMarkerForShoppingMall = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/supermarket.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        shoppingMallMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForMovieTheater = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/supermarket.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        movietheatermarkers.push(restaurantMarker); 
    };


    $scope.createPlacesMarkerForCafe = function(place) {
        $scope.clearInfoWindow();
        //http://maps.google.com/mapfiles/ms/icons/" + color + ".png
        //var image = 'http://maps.google.com/mapfiles/kml/pal2/icon19.png';
        var image = 'images/fastfood.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

    
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        cafeMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForSubway = function(place) {
        $scope.clearInfoWindow();
        //http://maps.google.com/mapfiles/ms/icons/" + color + ".png
        //var image = 'http://maps.google.com/mapfiles/kml/pal2/icon19.png';
        var image = 'images/fastfood.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

    
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        subwayMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForMealTakeAway = function(place) {
        $scope.clearInfoWindow();
        //http://maps.google.com/mapfiles/ms/icons/" + color + ".png
        //var image = 'http://maps.google.com/mapfiles/kml/pal2/icon19.png';
        var image = 'images/fastfood.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        restaurantMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

    
        google.maps.event.addListener(restaurantMarker, 'click', function() {
            infowindowplacesmarker.setContent( "Name     : " + place.name
                                            + "<br>" + "Ratings     : " + place.rating
                                            + "<br>" + "Address     : " + place.formatted_address
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Vicinity    : " + place.vicinity
                                            + "<br>" + "Website     : " + place.website
                                            + "<br>" + "International Number: " + place.international_phone_number
                                            + "<br>" + "Phone Number: " + place.formatted_phone_number
                                            + "<br>" + "Place Id    : " + place.place_id
                                            + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        MealTakeAwayMarkers.push(restaurantMarker); 
    };


    $scope.toggleTrafficLayer = function () 
    {
        if(trafficLayer.getMap() == null)
        {
            //traffic layer is disabled.. enable it
            trafficLayer.setMap(map);
        } else 
        {
            //traffic layer is enabled.. disable it
            trafficLayer.setMap(null);             
        }
    };

    $scope.showLiveInventory = function () 
    {
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearCityAndRegionMarker();
        if( placesMarkers != null )
        {
            for (var key in placesMarkers) 
            {
                placesMarkers[key].setMap(null);
                //markers =[];
            };
        }

        for (var key in placesMarkers) 
        {
            //markers[key].setMap(null);
            placesMarkers =[];
        };

        clearRadius();
        $scope.storeNames.length = 0; 
        $scope.showStorePlaceTypes = false;
        for (var i = 0, length = $scope.categories.length; i < length; i++) 
        {
            $scope.categories[i].checked = false;
        }

        for (var i = 0, length = $scope.subCategories.length; i < length; i++) 
        {
            $scope.subCategories[i].checked = false;
        }


        console.log("---$scope.SelectedCountry---:",$scope.SelectedCountry);
        

        if( $scope.SelectedCountry == "India" )
        {
            
            $scope.clearIndiaMarkers();
            $scope.showLiveInventoryLocations();
        }
        else if( $scope.SelectedCountry == "Singapore" )
        {
            $scope.clearIndiaMarkers();
            $scope.showLiveInventoryLocations();
            
        }
        else
        {
            $scope.clearIndiaMarkers();
            map.setCenter({lat:23.492690,lng: 78.680398});
            map.setZoom(5);
        }

    };

    $scope.showLiveInventoryLocations = function () 
    {
        $.getJSON('/getBIData', {}, function (data) {
                                
            //$scope.storeNames.length = 0;  commented to display , POS related data.
            //$scope.storeNames.push(allOption);
            //$scope.clearAllCategoryMarkers();add this later.
            $scope.clearAllHeatMaps();
            $scope.clearFusionLayer();

            console.log("---data.length---:",data.length);

            for (var i = 0, length = data.length; i < length; i++) 
            { 
                var storeData = data[i];
                
                if ($scope.SelectedCountry == "India" && storeData.country == "India")
                {       
                    //$scope.storeNames.push(data[i]);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:23.492690,lng: 78.680398});
                    map.setZoom(5);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/red1.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent("<div style='float:left'><img src='images/"+ storeData.imagename + "'>" 
                        + '<h3>' + storeData.name + '</h3>'
                        + "<br/>" + "Address: " + storeData.address 
                        + "<br/>" + "Contact No: " + storeData.contact 
                        + "<br/>" + "Operating Hours: " +storeData.timing
                        + "<br/>" + "Available Products: " +storeData.productclassification);
                    infoWindow.open(map, marker);

                    });

                    markers.push(marker);

                    })(marker, storeData);
                } 
                else if ($scope.SelectedCountry == "Singapore" && storeData.country == "Singapore")
                {
                    //$scope.storeNames.push(data[i]);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:1.328178,lng: 103.845055});
                    map.setZoom(11);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/red1.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow();
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent("<div style='float:left'><img src='images/liveinventory.jpg'>" 
                        + '<h3>' + storeData.name + '</h3>'
                        + "<br/>" + "Address: " + storeData.address 
                        + "<br/>" + "Contact No: " + storeData.contact 
                        + "<br/>" + "Operating Hours: " +storeData.timing
                        + "<br/>" + "Available Products: " +storeData.productclassification);
                    infoWindow.open(map, marker);

                    });

                    markers.push(marker);

                    })(marker, storeData);
                }   
            }
            countryMarkerCluster = new MarkerClusterer(map, markers,
           {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
            $scope.$apply();
        });
    };


    $scope.regionChange = function () {
 
        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        $scope.clearCityAndRegionMarker();

        if( $scope.selectedRegion == "East" )
        {
            //map.setCenter({lat:22.551296,lng: 88.385557});
            map.setCenter({lat:1.360177,lng: 103.931237});
            map.setZoom(13);
            
            heatmapEast = new google.maps.visualization.HeatmapLayer({
            data: $scope.getEastPointsForSingapore(),
            map: map
            });

            heatmapEast.set('radius', heatmapEast.get('radius') ? null : 20);
        }
        else if( $scope.selectedRegion == "West" )
        {   	
           // map.setCenter({lat:19.070517,lng: 72.877055});
            map.setCenter({lat:1.346351,lng: 103.737608});
            map.setZoom(13);

            heatmapWest = new google.maps.visualization.HeatmapLayer({
            data: $scope.getWestPointsForSingapore(),
            map: map
            });
            heatmapWest.set('radius', heatmapWest.get('radius') ? null : 20);
        } 
        else if( $scope.selectedRegion == "South" )
        {
            //map.setCenter({lat:12.973054,lng: 77.584958});
            map.setCenter({lat:1.284098,lng: 103.805952});
            map.setZoom(13);
            
            heatmapSouth = new google.maps.visualization.HeatmapLayer({
            data: $scope.getSouthPointsForSingapore(),
            map: map
            });
            heatmapSouth.set('radius', heatmapSouth.get('radius') ? null : 20);
        } 
        else if( $scope.selectedRegion == "North" )
        {
            //map.setCenter({lat:28.624982,lng: 77.185231});
            map.setCenter({lat:1.423004,lng: 103.795870});
            map.setZoom(13);
            
            heatmapNorth = new google.maps.visualization.HeatmapLayer({
            data: $scope.getNorthPointsForSingapore(),
            map: map
            });
            heatmapNorth.set('radius', heatmapNorth.get('radius') ? null : 20);
        } 
        
    };

    $scope.cityChange = function (value) {

        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();
        $scope.clearFusionLayer();
        $scope.clearAllAssetTrackingMarkersAndInfoWindows();
        $scope.clearCityAndRegionMarker();
        
        
        //$scope.clearAllHeatMaps();

        

    if ( value == 0 )
        {
            if( $scope.selectedCity == "Lim Chu Kang" )
            {
                //12.973054	77.584958
                latLng = new google.maps.LatLng(1.432428, 103.716847); 
                	  
                map.setCenter({lat:1.432428,lng: 103.716847});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Lim Chu Kang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Mandai" )
            {
                //19.070517	72.877055
                latLng = new google.maps.LatLng(1.428433, 103.826689); 
                	  
                map.setCenter({lat:1.428433,lng: 103.826689});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Mandai",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Sembawang" )
            {
                //13.066886	80.19252 
                latLng = new google.maps.LatLng(1.455161, 103.812711); 
                	  
                map.setCenter({lat:1.455161,lng: 103.812711});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Sembawang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/4.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Woodlands" )
            {
                //18.517116	73.859531
                latLng = new google.maps.LatLng(1.439104, 103.788475); 
                	  
                map.setCenter({lat:1.439104,lng: 103.788475});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Woodlands",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/5.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Jurong West" )
            {
                //	
                latLng = new google.maps.LatLng(1.340108, 103.708511); 
                	  
                map.setCenter({lat:1.340108,lng: 103.708511});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Jurong West",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/6.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Queenstown" )
            {	
                latLng = new google.maps.LatLng(1.298289, 103.790768); 
                	  
                map.setCenter({lat:1.298289,lng: 103.790768});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Queenstown",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/8.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Bukit Merah" )
            {	
                latLng = new google.maps.LatLng(1.280749, 103.823730); 	
                	  
                map.setCenter({lat:1.280749,lng: 103.823730});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Bukit Merah",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCity == "Kallang" )
            {	
                latLng = new google.maps.LatLng(1.314328, 103.863643); 	
                	  
                map.setCenter({lat:1.314328,lng: 103.863643});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Kallang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCity == "Geylang" )
            {	
                latLng = new google.maps.LatLng(1.322450, 103.888951); 	
                	  
                map.setCenter({lat:1.322450,lng: 103.888951});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Geylang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCity == "Bedok" )
            {	
                latLng = new google.maps.LatLng(1.330831, 103.920720); 	
                	  
                map.setCenter({lat:1.330831,lng: 103.920720});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Bedok",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Tampines" )
            {	
                latLng = new google.maps.LatLng(1.352334, 103.945484); 	
                	  
                map.setCenter({lat:1.352334,lng: 103.945484});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Tampines",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
        }
        else if( value == 1 )
        {
            if( $scope.selectedCityForSales == "Lim Chu Kang" )
            {
                latLng = new google.maps.LatLng(1.432428, 103.716847); 
                	  
                map.setCenter({lat:1.432428,lng: 103.716847});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Lim Chu Kang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/sales-bengaluru.png'></div><div style='float:right;'><img src='images/total-sales-bengaluru.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Mandai" )
            {
                //19.070517	72.877055
                latLng = new google.maps.LatLng(1.428433, 103.826689); 
                	  
                map.setCenter({lat:1.428433,lng: 103.826689});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Mandai",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                //infoWindow.setContent("<div><img src='images/sales-mumbai.png'></div><div style='float:right;'><img src='images/total-sales-mumbai.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Sembawang" )
            {
                //13.066886	80.19252 
                latLng = new google.maps.LatLng(1.455161, 103.812711); 
                	  
                map.setCenter({lat:1.455161,lng: 103.812711});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Sembawang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                    //infoWindow.setContent("<div><img src='images/sales-chennai.png'></div><div style='float:right;'><img src='images/total-sales-chennai.png'></div>");
                    infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Woodlands" )
            {
                //18.517116	73.859531
                latLng = new google.maps.LatLng(1.439104, 103.788475); 
                	  
                map.setCenter({lat:1.439104,lng: 103.788475});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Woodlands",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                //infoWindow.setContent("<div><img src='images/sales-pune.png'></div><div style='float:right;'><img src='images/total-sales-pune.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Jurong West" )
            {
                //	
                latLng = new google.maps.LatLng(1.340108, 103.708511); 
                	  
                map.setCenter({lat:1.340108,lng: 103.708511});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Jurong West",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
               // infoWindow.setContent("<div><img src='images/sales-indore.png'></div><div style='float:right;'><img src='images/total-sales-indore.png'></div>");
               infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Queenstown" )
            {	
                latLng = new google.maps.LatLng(1.298289, 103.790768); 
                	  
                map.setCenter({lat:1.298289,lng: 103.790768});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Queenstown",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-ahmedabad.png'></div><div style='float:right;'><img src='images/total-sales-ahmedabad.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Bukit Merah" )
            {	
                latLng = new google.maps.LatLng(1.280749, 103.823730); 	
                	  
                map.setCenter({lat:1.280749,lng: 103.823730});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Bukit Merah",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCityForSales == "Kallang" )
            {	
                latLng = new google.maps.LatLng(1.314328, 103.863643); 	
                	  
                map.setCenter({lat:1.314328,lng: 103.863643});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Kallang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCityForSales == "Geylang" )
            {	
                latLng = new google.maps.LatLng(1.322450, 103.888951); 	
                	  
                map.setCenter({lat:1.322450,lng: 103.888951});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Geylang",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCityForSales == "Bedok" )
            {	
                latLng = new google.maps.LatLng(1.330831, 103.920720); 	
                	  
                map.setCenter({lat:1.330831,lng: 103.920720});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Bedok",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Tampines" )
            {	
                latLng = new google.maps.LatLng(1.352334, 103.945484); 	
                	  
                map.setCenter({lat:1.352334,lng: 103.945484});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Tampines",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                //infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");
                infoWindow.setContent('<div><iframe width="400" height="420" src="https://datastudio.google.com/embed/reporting/1se-9ZRSukdgQUiRqYTSjT8nFLTV0v8Uq/page/y5MR" frameborder="0" style="border:0" allowfullscreen=""></iframe></div>');
                infoWindow.open(map, marker);
                
                });
                cityAndRegionMarkers.push(marker);
                })(marker);
            } 
            
        }

        // if ( value == 0 )
        // {
        //     if( $scope.selectedCity == "Delhi" )
        //     {
        //         latLng = new google.maps.LatLng(28.624982, 77.185231); 
                	  
        //         map.setCenter({lat:28.624982,lng: 77.185231});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/1.png'></div>");
        //         infoWindow.open(map, marker);
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     }
        //     else if( $scope.selectedCity == "Bengaluru" )
        //     {
        //         //12.973054	77.584958
        //         latLng = new google.maps.LatLng(12.973054, 77.584958); 
                	  
        //         map.setCenter({lat:12.973054,lng: 77.584958});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div class='info-window1'><img src='images/2.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Mumbai" )
        //     {
        //         //19.070517	72.877055
        //         latLng = new google.maps.LatLng(19.070517, 72.877055); 
                	  
        //         map.setCenter({lat:19.070517,lng: 72.877055});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/3.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Chennai" )
        //     {
        //         //13.066886	80.19252
        //         latLng = new google.maps.LatLng(13.066886, 80.19252); 
                	  
        //         map.setCenter({lat:13.066886,lng: 80.19252});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/4.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Pune" )
        //     {
        //         //18.517116	73.859531
        //         latLng = new google.maps.LatLng(18.517116, 73.859531); 
                	  
        //         map.setCenter({lat:18.517116,lng: 73.859531});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/5.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Indore" )
        //     {
        //         //	
        //         latLng = new google.maps.LatLng(22.716753, 75.856801); 
                	  
        //         map.setCenter({lat:22.716753,lng: 75.856801});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/6.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Ahmedabad" )
        //     {	
        //         latLng = new google.maps.LatLng(23.049881, 72.605137); 
                	  
        //         map.setCenter({lat:23.049881,lng: 72.605137});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/8.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCity == "Kolkata" )
        //     {	
        //         latLng = new google.maps.LatLng(22.657698, 88.348537); 	
                	  
        //         map.setCenter({lat:22.657698,lng: 88.348537});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Kolkata",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/7.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        // }
        // else if( value == 1 )
        // {
        //     if( $scope.selectedCityForSales == "Delhi" )
        //     {
        //         latLng = new google.maps.LatLng(28.624982, 77.185231); 
                	  
        //         map.setCenter({lat:28.624982,lng: 77.185231});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');

        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/sales-delhi.png'></div><div style='float:right;'><img src='images/total-sales-delhi.png'></div>");
        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     }
        //     else if( $scope.selectedCityForSales == "Bengaluru" )
        //     {
        //         latLng = new google.maps.LatLng(12.973054, 77.584958); 
                	  
        //         map.setCenter({lat:12.973054,lng: 77.584958});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //         infoWindow.setContent("<div><img src='images/sales-bengaluru.png'></div><div style='float:right;'><img src='images/total-sales-bengaluru.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Mumbai" )
        //     {
        //         //19.070517	72.877055
        //         latLng = new google.maps.LatLng(19.070517, 72.877055); 
                	  
        //         map.setCenter({lat:19.070517,lng: 72.877055});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
        //             infoWindow.setContent("<div><img src='images/sales-mumbai.png'></div><div style='float:right;'><img src='images/total-sales-mumbai.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Chennai" )
        //     {
        //         //13.066886	80.19252
        //         latLng = new google.maps.LatLng(13.066886, 80.19252); 
                	  
        //         map.setCenter({lat:13.066886,lng: 80.19252});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
                
        //             infoWindow.setContent("<div><img src='images/sales-chennai.png'></div><div style='float:right;'><img src='images/total-sales-chennai.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Pune" )
        //     {
        //         //18.517116	73.859531
        //         latLng = new google.maps.LatLng(18.517116, 73.859531); 
                	  
        //         map.setCenter({lat:18.517116,lng: 73.859531});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
                
        //         infoWindow.setContent("<div><img src='images/sales-pune.png'></div><div style='float:right;'><img src='images/total-sales-pune.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Indore" )
        //     {
        //         //	
        //         latLng = new google.maps.LatLng(22.716753, 75.856801); 
                	  
        //         map.setCenter({lat:22.716753,lng: 75.856801});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
                
        //         infoWindow.setContent("<div><img src='images/sales-indore.png'></div><div style='float:right;'><img src='images/total-sales-indore.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Ahmedabad" )
        //     {	
        //         latLng = new google.maps.LatLng(23.049881, 72.605137); 
                	  
        //         map.setCenter({lat:23.049881,lng: 72.605137});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Delhi",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
                    
        //         infoWindow.setContent("<div><img src='images/sales-ahmedabad.png'></div><div style='float:right;'><img src='images/total-sales-ahmedabad.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
        //     else if( $scope.selectedCityForSales == "Kolkata" )
        //     {	
        //         latLng = new google.maps.LatLng(22.657698, 88.348537); 	
                	  
        //         map.setCenter({lat:22.657698,lng: 88.348537});
        //         map.setZoom(11);
        //         map.setMapTypeId('roadmap');
        
        //         // Creating a marker and putting it on the map
        //         var marker = new google.maps.Marker({
        //         position: latLng,
        //         map: map,
        //         title: "Kolkata",
        //         icon: 'images/purple.png',
        //         mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //         });

        //         infoWindow = new google.maps.InfoWindow();
        //         (function(marker) {
        //         // Attaching a click event to the current marker
        //         google.maps.event.addListener(marker, "click", function(e) {
                    
        //         infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");

        //         infoWindow.open(map, marker);
                
        //         });
        //         cityAndRegionMarkers.push(marker);
        //         })(marker);
        //     } 
            
        // }
    };

    $scope.getMarketingData = function(event,index){
        
        //clear all the markers and checked categories
        $scope.clearAllPlacesMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearIndiaMarkers();
        //$scope.clearAllHeatMaps();
       
        for (var i = 0, length = $scope.categories.length; i < length; i++) 
        {
            $scope.categories[i].checked = false;
        }

        if(map.getZoom()> 12)
            {
                map.setZoom(12);
            }
        

        if(index!= -1)
            $scope.marketingTypes[index].checked = event.target.checked;
           
        
        for (var i = 0, length = $scope.marketingTypes.length; i < length; i++) 
        {
            if($scope.marketingTypes[i].checked)
            {
                var typeName = $scope.marketingTypes[i].name;
                
                if( typeName == "Outdoor" )
                {
                    //if (heatmap.getMap() == null )
                    $scope.initHeatMap();
                }
            }
            else
            {
                var typeName = $scope.marketingTypes[i].name;
                
                if( typeName == "Outdoor" )
                {
                    heatmap.setMap(heatmap.getMap() ? null : map);
                }
            }
        }
    };

    $scope.getData = function(placetype,event, index,isFromDropDownSelection) 
    {
        var jsonObject = JSON.parse($scope.selectedStore);

        if(isFromDropDownSelection)
        {
            //$scope.poisFromMarkerSelection = false;
            //clear previous pois selection on store change.
            for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
            {
                $scope.placetypes[i].checked = false;
            }  

            //clear POIs are on store change
            //$scope.googlePOIsArray.length = 0;
            $scope.clearAllPlacesMarkers();
        }

        //$scope.clearAllPlacesMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearIndiaMarkers();
        $scope.clearAllHeatMaps();
        $scope.clearFusionLayer();
        $scope.clearCityAndRegionMarker();
        
        if (jsonObject.category == "pos")
        {
            $scope.showStorePlaceTypes = true;
            latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.name,
            icon: 'images/purple.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            /*var GLOBE_WIDTH = 256; // a constant in Google's map projection
            var west = sw.lng();
            var east = ne.lng();
            var angle = east - west;
            if (angle < 0) {
            angle += 360;
            }
            var zoom = Math.round(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);*/

            map.fitBounds(bounds);      
            map.panToBounds(bounds); 

            if(map.getZoom()> 14)
            {
                map.setZoom(14);
            }

            infoWindow = new google.maps.InfoWindow({maxWidth:290});
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div style='float:left'><img src='images/"+ jsonObject.imagename + "'>" 
                + '<h3>' + jsonObject.name + '</h3>'
                + "<br/>" + "Address: " + jsonObject.address 
                + "<br/>" + "Contact No: " + jsonObject.contact 
                + "<br/>" + "Operating Hours: " +jsonObject.timing
                + "<br/>" + "Available Products: " +jsonObject.productclassification);
            infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
        }
        else if (jsonObject.category == "productioncentres")
        {
            
            $scope.showStorePlaceTypes = true;
            latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.name,
            icon: 'images/pink.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            map.fitBounds(bounds);      
            map.panToBounds(bounds); 

            if(map.getZoom()> 14)
            {
                map.setZoom(14);
            }

            infoWindow = new google.maps.InfoWindow({maxWidth:290});
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div style='float:left'><img src='images/"+ jsonObject.imagename + "'>" 
                + '<h3>' + jsonObject.name + '</h3>'
                + "<br/>" + "Address: " + jsonObject.address 
                + "<br/>" + "Contact No: " + jsonObject.contact 
                + "<br/>" + "Operating Hours: " +jsonObject.timing
                + "<br/>" + "Available Products: " +jsonObject.productclassification);
            infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
        }
        if (jsonObject.category == "warehouses")
        {
            
            $scope.showStorePlaceTypes = true;
            latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.name,
            icon: 'images/green.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            map.fitBounds(bounds);      
            map.panToBounds(bounds); 

            if(map.getZoom()> 14)
            {
                map.setZoom(14);
            }

            infoWindow = new google.maps.InfoWindow({maxWidth:290});
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div style='float:left'><img src='images/"+ jsonObject.imagename + "'>" 
                + '<h3>' + jsonObject.name + '</h3>'
                + "<br/>" + "Address: " + jsonObject.address 
                + "<br/>" + "Contact No: " + jsonObject.contact 
                + "<br/>" + "Operating Hours: " +jsonObject.timing
                + "<br/>" + "Available Products: " +jsonObject.productclassification);
            infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
        }
        if (jsonObject.category == "distributioncentre")
        {
            
            $scope.showStorePlaceTypes = true;
            latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.name,
            icon: 'images/blue.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            map.fitBounds(bounds);      
            map.panToBounds(bounds); 

            if(map.getZoom()> 14)
            {
                map.setZoom(14);
            }

            infoWindow = new google.maps.InfoWindow({maxWidth:290});
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div style='float:left'><img src='images/"+ jsonObject.imagename + "'>" 
                + '<h3>' + jsonObject.name + '</h3>'
                + "<br/>" + "Address: " + jsonObject.address 
                + "<br/>" + "Contact No: " + jsonObject.contact 
                + "<br/>" + "Operating Hours: " +jsonObject.timing
                + "<br/>" + "Available Products: " +jsonObject.productclassification);
                infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
        }


        	
        var storeLatLng = { lat : jsonObject.latitude , lng : jsonObject.longitude};
        //var storeLatLng = { lat : 39.923845 , lng : 116.452412};

        //checking and assiging values got from callback( index nad event )
        if(index!= -1)
            $scope.placetypes[index].checked = event.target.checked;
        
        for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
        {
            if($scope.placetypes[i].checked)
            {
                var typeName = $scope.placetypes[i].name;
                if( typeName == "Google - Restaurants" && placetype == "Google - Restaurants" )
                {
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location : storeLatLng,
                        //rankBy : google.maps.places.RankBy.DISTANCE,
                        radius : 2000,
                        componentRestrictions: {'country': 'SG'},
                        type : [ 'restaurant']
                    },$scope.restaurantCallback);
                }
                if( typeName == "Facebook - Restaurants" && placetype == "Facebook - Restaurants" )
                {
                    $http({ method: 'GET', url: 'https://graph.facebook.com/search?type=place&fields=name,checkins,hours,location,engagement,is_verified,link,overall_star_rating,payment_options,price_range,restaurant_specialties&q=restaurants&center='+ jsonObject.latitude + ',' +jsonObject.longitude +'&distance=2000&access_token=1837470493045321|SdcUiYX-RcYgghJWMtc07ph0O6I' }).
                    success(function (data, status, headers, config) {

                      console.log("---Facebook Restaurants---:",data);
                      console.log("---Facebook Restaurants length---:",data.data.length);

                      for (var i = 0; i < data.data.length; i++) 
                      {
                        var place = data.data[i];
                        var object = {
                                    "Name": place.name,
                                    "Rating": place.overall_star_rating,
                                    "Address": place.location.street,
                                    "Latitude": place.location.latitude,
                                    "Longitude": place.location.longitude,
                        };
                        //restaurants.push(object);

                        $scope.createPlacesMarkerForFacebookRestaurant(place);
                      }
                      
                    }).
                    error(function (data, status, headers, config) {
                        console.log("---Error---:",status);
                });
                }
                if( typeName == "Zomato - Restaurants" && placetype == "Zomato - Restaurants" )
                {
                    $http({
                        method: 'GET',
                        url: 'https://developers.zomato.com/api/v2.1/geocode?',
                        headers: {'user-key' : '1b6ddcb47426d068e923e86a6046a39b'},
                        params: {
                            lat: jsonObject.latitude, 
                            lon: jsonObject.longitude
                        }
                    }).success(function(data) {

                      //console.log("---success---:",data);
                      console.log("---data.nearby_restaurants.length---:",data.nearby_restaurants.length);
                      for (var i = 0; i < data.nearby_restaurants.length; i++) 
                      {
                        var place = data.nearby_restaurants[i].restaurant;
                        $scope.createPlacesMarkerForZomatoRestaurant(place);
                      }
                  
                    }).error(function(error) {
                      console.log("---error---:",error);
                    });
                }
                else if(typeName == "Airport" && placetype == "Airport")
                {
                    var service1 = new google.maps.places.PlacesService(map);
                    service1.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'SG'},
                        type : [ 'airport']
                    }, $scope.airportCallback);   
                }
                else if(typeName == "Bar" && placetype == "Bar")
                {
                    var service2 = new google.maps.places.PlacesService(map);
                            service2.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'bar']
                            }, $scope.barCallback);   
                }
                else if(typeName == "Bus Station" && placetype == "Bus Station")
                {
                    var service3 = new google.maps.places.PlacesService(map);
                            service3.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'bus_station']
                            }, $scope.busStationCallback);
                }
                else if(typeName == "Cafe" && placetype == "Cafe")
                {
                    var service4 = new google.maps.places.PlacesService(map);
                            service4.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'cafe']
                            }, $scope.cafeCallback);
                }
                else if(typeName == "Casino" && placetype == "Casino")
                {
                    var service5 = new google.maps.places.PlacesService(map);
                            service5.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'casino']
                            }, $scope.casinoCallback);
                }
                else if(typeName == "Liquor Store" && placetype == "Liquor Store")
                {
                    var service6 = new google.maps.places.PlacesService(map);
                            service6.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'liquor_store']
                            }, $scope.liquorStoreCallback);
                }
                else if(typeName == "Night Clubs" && placetype == "Night Clubs")
                {
                    var service9 = new google.maps.places.PlacesService(map);
                            service9.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'night_club']
                            }, $scope.nightClubCallback);
                }
                else if(typeName == "Park" && placetype == "Park")
                {
                    var service10 = new google.maps.places.PlacesService(map);
                            service10.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'park']
                            }, $scope.parkCallback);
                }
                else if(typeName == "Super Market" && placetype == "Super Market")
                {
                    var service11 = new google.maps.places.PlacesService(map);
                            service11.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'supermarket']
                            }, $scope.supermarketCallback);
                }
                else if(typeName == "Subway" && placetype == "Subway")
                {   
                    var service12 = new google.maps.places.PlacesService(map);
                            service12.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'subway_station']
                            }, $scope.subwayCallback);
                }
                else if(typeName == "Shopping Mall" && placetype == "Shopping Mall")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'shopping_mall']
                            }, $scope.shoppingmallCallback);
                }
                else if(typeName == "Meal Take Aways" && placetype == "Meal Take Aways")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'meal_takeway']
                            }, $scope.mealTakeawayCallback);
                }
                else if(typeName == "Movie Theaters" && placetype == "Movie Theaters")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'movie_theater']
                            }, $scope.movieTheaterCallback);
                }
                
            }
            else
            {
                var typeName = $scope.placetypes[i].name;
                if( typeName == "Google - Restaurants" )
                {
                    $scope.clearRestaurantsMarker();
                }
                if( typeName == "Facebook - Restaurants" )
                {
                    $scope.clearFacebookRestaurantsMarker();
                }
                if( typeName == "Zomato - Restaurants" )
                {
                    $scope.clearZomatoRestaurantsMarker();
                }
                else if(typeName == "Airport")
                {
                    $scope.clearAirportMarkers();
                }
                else if(typeName == "Bar")
                {
                    $scope.clearBarMarkers();
                }
                else if(typeName == "Bus Station")
                {
                    $scope.clearBusstationMarkers();
                }
                else if(typeName == "Cafe")
                {
                    $scope.clearCafeMarkers();
                }
                else if(typeName == "Casino")
                {
                    $scope.clearCasinoMarkers();
                }
                else if(typeName == "Liquor Store")
                {
                    $scope.clearLiquorStoreMarkers();
                }
                else if(typeName == "Night Clubs")
                {
                    $scope.clearNightClubsMarker();
                }
                else if(typeName == "Park")
                {
                    $scope.clearParkMarkers();
                }
                else if(typeName == "Super Market")
                {
                    $scope.clearSuperMarketsMarker();
                }
                else if(typeName == "Subway")
                { 
                    $scope.clearSubwayMarker();
                }
                else if(typeName == "Shopping Mall")
                {
                    $scope.clearShoppingMallMarker();
                }
                else if(typeName == "Meal Take Aways")
                {
                    $scope.clearMealTakewayMarkers();
                }
                else if(typeName == "Movie Theaters")
                {
                    $scope.clearMovieTheatersMarkers();
                }
            }
        }
    };
    
    $scope.getSouthPointsForSingapore = function()
    {
        return [new google.maps.LatLng(1.29408,103.83171), new google.maps.LatLng(1.29260,103.84364), new google.maps.LatLng(1.29145,103.83423), new google.maps.LatLng(1.30443,103.84643), new google.maps.LatLng(1.30338,103.85167), new google.maps.LatLng(1.28981,103.85766), new google.maps.LatLng(1.29071,103.84551), new google.maps.LatLng(1.30178,103.83657), new google.maps.LatLng(1.28829,103.84330), new google.maps.LatLng(1.30557,103.86284), new google.maps.LatLng(1.29961,103.84379), new google.maps.LatLng(1.28480,103.83667), new google.maps.LatLng(1.28570,103.85200), new google.maps.LatLng(1.30402,103.83937), new google.maps.LatLng(1.28790,103.85247), new google.maps.LatLng(1.28759,103.84292), new google.maps.LatLng(1.30253,103.84460), new google.maps.LatLng(1.28617,103.83931), new google.maps.LatLng(1.29366,103.84499), new google.maps.LatLng(1.30060,103.83131), new google.maps.LatLng(1.28244,103.84086), new google.maps.LatLng(1.30223,103.84321), new google.maps.LatLng(1.30774,103.83880), new google.maps.LatLng(1.28658,103.86119), new google.maps.LatLng(1.30542,103.84020), new google.maps.LatLng(1.29194,103.83782), new google.maps.LatLng(1.30810,103.85948), new google.maps.LatLng(1.29059,103.83337), new google.maps.LatLng(1.29893,103.84232), new google.maps.LatLng(1.29235,103.83712), new google.maps.LatLng(1.30614,103.85030), new google.maps.LatLng(1.28294,103.85387), new google.maps.LatLng(1.29635,103.84312), new google.maps.LatLng(1.29167,103.83981), new google.maps.LatLng(1.28447,103.85692), new google.maps.LatLng(1.29001,103.85705), new google.maps.LatLng(1.30560,103.83407), new google.maps.LatLng(1.29716,103.83424), new google.maps.LatLng(1.28627,103.84570), new google.maps.LatLng(1.28996,103.83853), new google.maps.LatLng(1.30491,103.84246), new google.maps.LatLng(1.28145,103.84069), new google.maps.LatLng(1.29430,103.83079), new google.maps.LatLng(1.29628,103.85381), new google.maps.LatLng(1.29096,103.86434), new google.maps.LatLng(1.29408,103.85766), new google.maps.LatLng(1.30365,103.84351), new google.maps.LatLng(1.29674,103.86451), new google.maps.LatLng(1.28446,103.85436), new google.maps.LatLng(1.30460,103.83602), new google.maps.LatLng(1.30377,103.86119), new google.maps.LatLng(1.28564,103.84160), new google.maps.LatLng(1.29563,103.85501), new google.maps.LatLng(1.28012,103.84420), new google.maps.LatLng(1.28933,103.83229), new google.maps.LatLng(1.30075,103.83964), new google.maps.LatLng(1.29660,103.83401), new google.maps.LatLng(1.29946,103.83293), new google.maps.LatLng(1.29239,103.83833), new google.maps.LatLng(1.29673,103.84389), new google.maps.LatLng(1.31311,103.85494), new google.maps.LatLng(1.29463,103.84082), new google.maps.LatLng(1.30100,103.86108), new google.maps.LatLng(1.30199,103.83945), new google.maps.LatLng(1.28991,103.84228), new google.maps.LatLng(1.29243,103.85610), new google.maps.LatLng(1.29281,103.85332), new google.maps.LatLng(1.29280,103.83907), new google.maps.LatLng(1.29755,103.85778), new google.maps.LatLng(1.30501,103.83930), new google.maps.LatLng(1.29831,103.85667), new google.maps.LatLng(1.29607,103.83521), new google.maps.LatLng(1.30286,103.84525), new google.maps.LatLng(1.29047,103.84773), new google.maps.LatLng(1.29784,103.85309), new google.maps.LatLng(1.29840,103.83516), new google.maps.LatLng(1.31200,103.84006), new google.maps.LatLng(1.29383,103.85440), new google.maps.LatLng(1.30207,103.83207), new google.maps.LatLng(1.30004,103.83134), new google.maps.LatLng(1.28514,103.83284), new google.maps.LatLng(1.28030,103.83888), new google.maps.LatLng(1.29020,103.80951), new google.maps.LatLng(1.29254,103.82599), new google.maps.LatLng(1.28244,103.82134), new google.maps.LatLng(1.28826,103.81486), new google.maps.LatLng(1.29035,103.83295), new google.maps.LatLng(1.29564,103.81794), new google.maps.LatLng(1.26906,103.82623), new google.maps.LatLng(1.28932,103.81879), new google.maps.LatLng(1.28494,103.82103), new google.maps.LatLng(1.26823,103.83218), new google.maps.LatLng(1.27806,103.82932), new google.maps.LatLng(1.28367,103.82722), new google.maps.LatLng(1.29201,103.81886), new google.maps.LatLng(1.27960,103.81712), new google.maps.LatLng(1.28840,103.82901), new google.maps.LatLng(1.27406,103.82552), new google.maps.LatLng(1.28906,103.81543), new google.maps.LatLng(1.29573,103.82297), new google.maps.LatLng(1.27540,103.81379), new google.maps.LatLng(1.28313,103.82635), new google.maps.LatLng(1.27472,103.82105), new google.maps.LatLng(1.29311,103.83793), new google.maps.LatLng(1.30047,103.82800), new google.maps.LatLng(1.29410,103.83733), new google.maps.LatLng(1.29295,103.83692), new google.maps.LatLng(1.29237,103.82173), new google.maps.LatLng(1.27206,103.83040), new google.maps.LatLng(1.30080,103.81896), new google.maps.LatLng(1.28842,103.81106), new google.maps.LatLng(1.28120,103.80895), new google.maps.LatLng(1.27380,103.82250), new google.maps.LatLng(1.27511,103.83493), new google.maps.LatLng(1.27818,103.83016), new google.maps.LatLng(1.27168,103.81476), new google.maps.LatLng(1.28482,103.82259), new google.maps.LatLng(1.29237,103.82728), new google.maps.LatLng(1.29513,103.82979), new google.maps.LatLng(1.28852,103.81069), new google.maps.LatLng(1.30108,103.82973), new google.maps.LatLng(1.27189,103.83461), new google.maps.LatLng(1.26815,103.82681), new google.maps.LatLng(1.27150,103.81478), new google.maps.LatLng(1.27791,103.82914), new google.maps.LatLng(1.27717,103.82474), new google.maps.LatLng(1.28902,103.82924), new google.maps.LatLng(1.27179,103.83579), new google.maps.LatLng(1.28092,103.81134), new google.maps.LatLng(1.27866,103.81777), new google.maps.LatLng(1.26845,103.81716), new google.maps.LatLng(1.28404,103.81125), new google.maps.LatLng(1.27913,103.81339), new google.maps.LatLng(1.27030,103.82486), new google.maps.LatLng(1.29284,103.83025), new google.maps.LatLng(1.28370,103.83668), new google.maps.LatLng(1.27508,103.82150), new google.maps.LatLng(1.29598,103.81540), new google.maps.LatLng(1.27498,103.82005), new google.maps.LatLng(1.29255,103.81921), new google.maps.LatLng(1.29391,103.83154), new google.maps.LatLng(1.27256,103.81640), new google.maps.LatLng(1.29154,103.81865), new google.maps.LatLng(1.27405,103.81961), new google.maps.LatLng(1.28016,103.82123), new google.maps.LatLng(1.27033,103.82435), new google.maps.LatLng(1.27615,103.83071), new google.maps.LatLng(1.29794,103.82766), new google.maps.LatLng(1.27773,103.84085), new google.maps.LatLng(1.29274,103.81518), new google.maps.LatLng(1.28688,103.82851), new google.maps.LatLng(1.26759,103.82456), new google.maps.LatLng(1.27164,103.81783), new google.maps.LatLng(1.27469,103.81497), new google.maps.LatLng(1.29093,103.82983), new google.maps.LatLng(1.28880,103.82033), new google.maps.LatLng(1.29199,103.81486), new google.maps.LatLng(1.27179,103.82003), new google.maps.LatLng(1.27793,103.83134), new google.maps.LatLng(1.27046,103.83060), new google.maps.LatLng(1.30625,103.79408), new google.maps.LatLng(1.28693,103.78976), new google.maps.LatLng(1.29909,103.80216), new google.maps.LatLng(1.30835,103.78858), new google.maps.LatLng(1.31250,103.79131), new google.maps.LatLng(1.29345,103.81240), new google.maps.LatLng(1.30173,103.78742), new google.maps.LatLng(1.28058,103.80110), new google.maps.LatLng(1.28620,103.79341), new google.maps.LatLng(1.31090,103.80952), new google.maps.LatLng(1.28668,103.79993), new google.maps.LatLng(1.28873,103.80550), new google.maps.LatLng(1.30087,103.80964), new google.maps.LatLng(1.28909,103.80048), new google.maps.LatLng(1.31012,103.79335), new google.maps.LatLng(1.29948,103.81067), new google.maps.LatLng(1.28909,103.80077), new google.maps.LatLng(1.29513,103.81061), new google.maps.LatLng(1.28093,103.79289), new google.maps.LatLng(1.28740,103.79181), new google.maps.LatLng(1.29893,103.81447), new google.maps.LatLng(1.30230,103.80971), new google.maps.LatLng(1.30595,103.81227), new google.maps.LatLng(1.30435,103.78793), new google.maps.LatLng(1.28325,103.80647), new google.maps.LatLng(1.30779,103.79953), new google.maps.LatLng(1.28728,103.78630), new google.maps.LatLng(1.29720,103.80645), new google.maps.LatLng(1.30109,103.80519), new google.maps.LatLng(1.30739,103.81283), new google.maps.LatLng(1.28664,103.78616), new google.maps.LatLng(1.29293,103.80554), new google.maps.LatLng(1.29250,103.78751), new google.maps.LatLng(1.28373,103.80576), new google.maps.LatLng(1.30430,103.79394), new google.maps.LatLng(1.30909,103.78745), new google.maps.LatLng(1.28947,103.80806), new google.maps.LatLng(1.30622,103.80589), new google.maps.LatLng(1.29000,103.79793), new google.maps.LatLng(1.30595,103.79797), new google.maps.LatLng(1.30084,103.80861), new google.maps.LatLng(1.30508,103.79335), new google.maps.LatLng(1.28731,103.80553), new google.maps.LatLng(1.28970,103.80000), new google.maps.LatLng(1.30687,103.78902), new google.maps.LatLng(1.29005,103.80736), new google.maps.LatLng(1.30507,103.78632), new google.maps.LatLng(1.30629,103.79172), new google.maps.LatLng(1.28886,103.79284), new google.maps.LatLng(1.29518,103.80418), new google.maps.LatLng(1.30913,103.78463), new google.maps.LatLng(1.28678,103.80794), new google.maps.LatLng(1.31411,103.80129), new google.maps.LatLng(1.29630,103.81079), new google.maps.LatLng(1.28546,103.78751), new google.maps.LatLng(1.29613,103.79513), new google.maps.LatLng(1.29897,103.80140), new google.maps.LatLng(1.29544,103.78741), new google.maps.LatLng(1.28690,103.78712), new google.maps.LatLng(1.30956,103.80951), new google.maps.LatLng(1.29091,103.80064), new google.maps.LatLng(1.30693,103.80803), new google.maps.LatLng(1.28285,103.79092), new google.maps.LatLng(1.28293,103.80322), new google.maps.LatLng(1.29181,103.78583), new google.maps.LatLng(1.29664,103.78440), new google.maps.LatLng(1.29730,103.79422), new google.maps.LatLng(1.31239,103.79113), new google.maps.LatLng(1.28349,103.78968), new google.maps.LatLng(1.29934,103.81359), new google.maps.LatLng(1.30863,103.80857), new google.maps.LatLng(1.30680,103.79280), new google.maps.LatLng(1.30174,103.79415), new google.maps.LatLng(1.29720,103.78792), new google.maps.LatLng(1.31431,103.79971), new google.maps.LatLng(1.30317,103.80880), new google.maps.LatLng(1.28607,103.80443), new google.maps.LatLng(1.30635,103.80729), new google.maps.LatLng(1.28968,103.78991), new google.maps.LatLng(1.31467,103.79826), new google.maps.LatLng(1.30060,103.78496), new google.maps.LatLng(1.30817,103.75939), new google.maps.LatLng(1.31166,103.78690), new google.maps.LatLng(1.29324,103.78505), new google.maps.LatLng(1.31883,103.77770), new google.maps.LatLng(1.29498,103.77133), new google.maps.LatLng(1.31289,103.76209), new google.maps.LatLng(1.31761,103.78546), new google.maps.LatLng(1.29696,103.77809), new google.maps.LatLng(1.28902,103.77035), new google.maps.LatLng(1.31405,103.78774), new google.maps.LatLng(1.30575,103.76692), new google.maps.LatLng(1.28919,103.77312), new google.maps.LatLng(1.31557,103.78698), new google.maps.LatLng(1.28883,103.78013), new google.maps.LatLng(1.30480,103.76632), new google.maps.LatLng(1.29378,103.77998), new google.maps.LatLng(1.30525,103.77558), new google.maps.LatLng(1.31372,103.77732), new google.maps.LatLng(1.31276,103.76153), new google.maps.LatLng(1.31505,103.78830), new google.maps.LatLng(1.31750,103.77477), new google.maps.LatLng(1.29582,103.77933), new google.maps.LatLng(1.29983,103.76617), new google.maps.LatLng(1.30119,103.77713), new google.maps.LatLng(1.29581,103.76776), new google.maps.LatLng(1.30379,103.76153), new google.maps.LatLng(1.31197,103.78815), new google.maps.LatLng(1.32152,103.77164), new google.maps.LatLng(1.29575,103.77719), new google.maps.LatLng(1.31745,103.77588), new google.maps.LatLng(1.30839,103.77402), new google.maps.LatLng(1.29054,103.78144), new google.maps.LatLng(1.31876,103.77194), new google.maps.LatLng(1.31489,103.77879), new google.maps.LatLng(1.31337,103.77170), new google.maps.LatLng(1.30979,103.76207), new google.maps.LatLng(1.29465,103.77409), new google.maps.LatLng(1.31621,103.78582), new google.maps.LatLng(1.30585,103.76693), new google.maps.LatLng(1.31181,103.79182), new google.maps.LatLng(1.30954,103.78086), new google.maps.LatLng(1.29529,103.77823), new google.maps.LatLng(1.29937,103.78601), new google.maps.LatLng(1.30499,103.75965), new google.maps.LatLng(1.31301,103.79145), new google.maps.LatLng(1.28990,103.78020), new google.maps.LatLng(1.30552,103.77012), new google.maps.LatLng(1.29316,103.78043), new google.maps.LatLng(1.29590,103.77531), new google.maps.LatLng(1.30875,103.77292), new google.maps.LatLng(1.30387,103.75996), new google.maps.LatLng(1.29224,103.78231), new google.maps.LatLng(1.28834,103.77642), new google.maps.LatLng(1.32183,103.77536), new google.maps.LatLng(1.29975,103.76591), new google.maps.LatLng(1.29307,103.76825), new google.maps.LatLng(1.31582,103.77771), new google.maps.LatLng(1.29343,103.76244), new google.maps.LatLng(1.30970,103.78701), new google.maps.LatLng(1.28912,103.77568), new google.maps.LatLng(1.30349,103.77876), new google.maps.LatLng(1.30274,103.75947), new google.maps.LatLng(1.29155,103.76418), new google.maps.LatLng(1.31220,103.78883), new google.maps.LatLng(1.29407,103.78467), new google.maps.LatLng(1.31412,103.77253), new google.maps.LatLng(1.28982,103.78055), new google.maps.LatLng(1.30246,103.78973), new google.maps.LatLng(1.31543,103.79049), new google.maps.LatLng(1.30319,103.75944), new google.maps.LatLng(1.30128,103.76030), new google.maps.LatLng(1.29045,103.76709), new google.maps.LatLng(1.30855,103.76382), new google.maps.LatLng(1.29897,103.78904), new google.maps.LatLng(1.30975,103.78490), new google.maps.LatLng(1.30467,103.76295), new google.maps.LatLng(1.29164,103.76895), new google.maps.LatLng(1.29195,103.78434), new google.maps.LatLng(1.30291,103.77987)]
    };
    
    $scope.getWestPointsForSingapore = function()
    {
        return [new google.maps.LatLng(1.38745,103.68923), new google.maps.LatLng(1.39048,103.70796), new google.maps.LatLng(1.37877,103.68876), new google.maps.LatLng(1.38128,103.69183), new google.maps.LatLng(1.39018,103.71158), new google.maps.LatLng(1.38187,103.68268), new google.maps.LatLng(1.38054,103.70631), new google.maps.LatLng(1.39954,103.69691), new google.maps.LatLng(1.38002,103.71536), new google.maps.LatLng(1.38299,103.69629), new google.maps.LatLng(1.38952,103.69940), new google.maps.LatLng(1.40324,103.69895), new google.maps.LatLng(1.38278,103.69383), new google.maps.LatLng(1.39399,103.70629), new google.maps.LatLng(1.39086,103.70311), new google.maps.LatLng(1.37108,103.69126), new google.maps.LatLng(1.38944,103.69023), new google.maps.LatLng(1.40073,103.69842), new google.maps.LatLng(1.38210,103.68517), new google.maps.LatLng(1.37764,103.70265), new google.maps.LatLng(1.39246,103.69929), new google.maps.LatLng(1.38942,103.70329), new google.maps.LatLng(1.37774,103.69391), new google.maps.LatLng(1.39589,103.69247), new google.maps.LatLng(1.37449,103.68757), new google.maps.LatLng(1.38750,103.69577), new google.maps.LatLng(1.38729,103.70698), new google.maps.LatLng(1.39805,103.70117), new google.maps.LatLng(1.38494,103.70911), new google.maps.LatLng(1.38515,103.68577), new google.maps.LatLng(1.38860,103.70926), new google.maps.LatLng(1.38839,103.70868), new google.maps.LatLng(1.38768,103.68654), new google.maps.LatLng(1.39355,103.69636), new google.maps.LatLng(1.38744,103.70635), new google.maps.LatLng(1.39356,103.68305), new google.maps.LatLng(1.37657,103.68915), new google.maps.LatLng(1.38141,103.69259), new google.maps.LatLng(1.38866,103.68398), new google.maps.LatLng(1.37278,103.69627), new google.maps.LatLng(1.39014,103.70040), new google.maps.LatLng(1.37419,103.68712), new google.maps.LatLng(1.39758,103.68768), new google.maps.LatLng(1.37294,103.70721), new google.maps.LatLng(1.39311,103.69279), new google.maps.LatLng(1.38302,103.69859), new google.maps.LatLng(1.38661,103.70173), new google.maps.LatLng(1.37561,103.68762), new google.maps.LatLng(1.39609,103.70633), new google.maps.LatLng(1.39826,103.69503), new google.maps.LatLng(1.37240,103.69593), new google.maps.LatLng(1.38212,103.70229), new google.maps.LatLng(1.38090,103.68490), new google.maps.LatLng(1.38151,103.69802), new google.maps.LatLng(1.39478,103.69472), new google.maps.LatLng(1.38111,103.70958), new google.maps.LatLng(1.39327,103.71177), new google.maps.LatLng(1.40030,103.69260), new google.maps.LatLng(1.39946,103.68783), new google.maps.LatLng(1.39966,103.71110), new google.maps.LatLng(1.39111,103.70180), new google.maps.LatLng(1.37773,103.69803), new google.maps.LatLng(1.37694,103.71179), new google.maps.LatLng(1.38481,103.70070), new google.maps.LatLng(1.37047,103.69303), new google.maps.LatLng(1.40227,103.70432), new google.maps.LatLng(1.36969,103.69881), new google.maps.LatLng(1.38948,103.68132), new google.maps.LatLng(1.39214,103.70768), new google.maps.LatLng(1.38362,103.69710), new google.maps.LatLng(1.38107,103.71467), new google.maps.LatLng(1.37437,103.70395), new google.maps.LatLng(1.38973,103.68368), new google.maps.LatLng(1.37272,103.69919), new google.maps.LatLng(1.38666,103.70186), new google.maps.LatLng(1.37013,103.70117), new google.maps.LatLng(1.38205,103.69003), new google.maps.LatLng(1.39085,103.70319), new google.maps.LatLng(1.38530,103.71252), new google.maps.LatLng(1.38504,103.69250), new google.maps.LatLng(1.35230,103.71093), new google.maps.LatLng(1.32888,103.70943), new google.maps.LatLng(1.34797,103.71273), new google.maps.LatLng(1.33873,103.69974), new google.maps.LatLng(1.34523,103.72413), new google.maps.LatLng(1.35239,103.71713), new google.maps.LatLng(1.33774,103.71052), new google.maps.LatLng(1.33024,103.71630), new google.maps.LatLng(1.34755,103.70085), new google.maps.LatLng(1.35836,103.71041), new google.maps.LatLng(1.35042,103.70800), new google.maps.LatLng(1.34715,103.72509), new google.maps.LatLng(1.33828,103.71610), new google.maps.LatLng(1.34848,103.72463), new google.maps.LatLng(1.35331,103.70736), new google.maps.LatLng(1.33638,103.70287), new google.maps.LatLng(1.34371,103.71355), new google.maps.LatLng(1.32374,103.71188), new google.maps.LatLng(1.32861,103.71365), new google.maps.LatLng(1.32460,103.70941), new google.maps.LatLng(1.33268,103.71673), new google.maps.LatLng(1.35126,103.69618), new google.maps.LatLng(1.35002,103.71644), new google.maps.LatLng(1.33383,103.71206), new google.maps.LatLng(1.34866,103.72248), new google.maps.LatLng(1.32786,103.69901), new google.maps.LatLng(1.34949,103.72001), new google.maps.LatLng(1.34963,103.71787), new google.maps.LatLng(1.34030,103.69312), new google.maps.LatLng(1.34037,103.72419), new google.maps.LatLng(1.35772,103.70491), new google.maps.LatLng(1.34675,103.69577), new google.maps.LatLng(1.33565,103.70854), new google.maps.LatLng(1.34424,103.69310), new google.maps.LatLng(1.34951,103.71380), new google.maps.LatLng(1.33641,103.70765), new google.maps.LatLng(1.35255,103.70430), new google.maps.LatLng(1.33458,103.69349), new google.maps.LatLng(1.35005,103.70671), new google.maps.LatLng(1.34682,103.69454), new google.maps.LatLng(1.34246,103.70822), new google.maps.LatLng(1.32853,103.71855), new google.maps.LatLng(1.33280,103.71047), new google.maps.LatLng(1.34876,103.69659), new google.maps.LatLng(1.33644,103.70801), new google.maps.LatLng(1.35524,103.71353), new google.maps.LatLng(1.33829,103.70490), new google.maps.LatLng(1.33186,103.71216), new google.maps.LatLng(1.34013,103.72197), new google.maps.LatLng(1.33113,103.69987), new google.maps.LatLng(1.34585,103.72503), new google.maps.LatLng(1.34489,103.70153), new google.maps.LatLng(1.34071,103.72476), new google.maps.LatLng(1.32989,103.71088), new google.maps.LatLng(1.34703,103.71551), new google.maps.LatLng(1.32983,103.70598), new google.maps.LatLng(1.34410,103.71627), new google.maps.LatLng(1.32843,103.70319), new google.maps.LatLng(1.33604,103.70904), new google.maps.LatLng(1.34685,103.72268), new google.maps.LatLng(1.35421,103.70460), new google.maps.LatLng(1.33624,103.71122), new google.maps.LatLng(1.34581,103.69661), new google.maps.LatLng(1.33404,103.71016), new google.maps.LatLng(1.33097,103.71503), new google.maps.LatLng(1.32537,103.71578), new google.maps.LatLng(1.34787,103.69831), new google.maps.LatLng(1.32922,103.71800), new google.maps.LatLng(1.35382,103.70518), new google.maps.LatLng(1.34227,103.72395), new google.maps.LatLng(1.34764,103.69421), new google.maps.LatLng(1.33572,103.71106), new google.maps.LatLng(1.32929,103.70764), new google.maps.LatLng(1.33914,103.69273), new google.maps.LatLng(1.35137,103.69779), new google.maps.LatLng(1.32570,103.71340), new google.maps.LatLng(1.32701,103.71539), new google.maps.LatLng(1.32729,103.70696), new google.maps.LatLng(1.34321,103.71479), new google.maps.LatLng(1.33857,103.70614), new google.maps.LatLng(1.33222,103.77341), new google.maps.LatLng(1.36286,103.76175), new google.maps.LatLng(1.35576,103.76692), new google.maps.LatLng(1.35148,103.77016), new google.maps.LatLng(1.34152,103.75090), new google.maps.LatLng(1.33067,103.76081), new google.maps.LatLng(1.34960,103.76824), new google.maps.LatLng(1.33597,103.77780), new google.maps.LatLng(1.34489,103.75296), new google.maps.LatLng(1.33055,103.77206), new google.maps.LatLng(1.33050,103.76075), new google.maps.LatLng(1.34595,103.75788), new google.maps.LatLng(1.33468,103.75990), new google.maps.LatLng(1.33476,103.76594), new google.maps.LatLng(1.35015,103.74948), new google.maps.LatLng(1.35489,103.76823), new google.maps.LatLng(1.36163,103.76578), new google.maps.LatLng(1.36359,103.76356), new google.maps.LatLng(1.33372,103.76752), new google.maps.LatLng(1.35002,103.75526), new google.maps.LatLng(1.34062,103.75629), new google.maps.LatLng(1.35264,103.77862), new google.maps.LatLng(1.33494,103.77373), new google.maps.LatLng(1.35058,103.76500), new google.maps.LatLng(1.32930,103.76571), new google.maps.LatLng(1.35468,103.77905), new google.maps.LatLng(1.34674,103.77462), new google.maps.LatLng(1.34351,103.76640), new google.maps.LatLng(1.33980,103.75284), new google.maps.LatLng(1.32883,103.76488), new google.maps.LatLng(1.35088,103.74946), new google.maps.LatLng(1.33538,103.76373), new google.maps.LatLng(1.33759,103.76366), new google.maps.LatLng(1.34203,103.76497), new google.maps.LatLng(1.35939,103.75783), new google.maps.LatLng(1.35761,103.76229), new google.maps.LatLng(1.33842,103.75737), new google.maps.LatLng(1.34432,103.77528), new google.maps.LatLng(1.35040,103.75177), new google.maps.LatLng(1.35117,103.77323), new google.maps.LatLng(1.34853,103.75562), new google.maps.LatLng(1.36085,103.77281), new google.maps.LatLng(1.33551,103.75225), new google.maps.LatLng(1.35130,103.76562), new google.maps.LatLng(1.35033,103.75951), new google.maps.LatLng(1.33458,103.76882), new google.maps.LatLng(1.35413,103.75710), new google.maps.LatLng(1.34398,103.77126), new google.maps.LatLng(1.34618,103.77933), new google.maps.LatLng(1.33899,103.76005), new google.maps.LatLng(1.36056,103.76642), new google.maps.LatLng(1.35478,103.75187), new google.maps.LatLng(1.35328,103.77570), new google.maps.LatLng(1.34977,103.76680), new google.maps.LatLng(1.35236,103.76107), new google.maps.LatLng(1.33279,103.76364), new google.maps.LatLng(1.34825,103.78163), new google.maps.LatLng(1.35246,103.77461), new google.maps.LatLng(1.35334,103.74835), new google.maps.LatLng(1.35018,103.76479), new google.maps.LatLng(1.33627,103.77672), new google.maps.LatLng(1.35040,103.77933), new google.maps.LatLng(1.34411,103.77308), new google.maps.LatLng(1.34468,103.77964), new google.maps.LatLng(1.35058,103.74787), new google.maps.LatLng(1.35351,103.75356), new google.maps.LatLng(1.33650,103.77110), new google.maps.LatLng(1.34589,103.76148), new google.maps.LatLng(1.36127,103.75551), new google.maps.LatLng(1.35905,103.75712), new google.maps.LatLng(1.35982,103.76349), new google.maps.LatLng(1.35068,103.76677), new google.maps.LatLng(1.34678,103.74695), new google.maps.LatLng(1.33639,103.75657), new google.maps.LatLng(1.33693,103.75033), new google.maps.LatLng(1.33081,103.77035), new google.maps.LatLng(1.34868,103.76935), new google.maps.LatLng(1.35286,103.76748), new google.maps.LatLng(1.36016,103.76162), new google.maps.LatLng(1.34212,103.77691), new google.maps.LatLng(1.36696,103.70456), new google.maps.LatLng(1.37012,103.70400), new google.maps.LatLng(1.38283,103.69592), new google.maps.LatLng(1.36882,103.69777), new google.maps.LatLng(1.37968,103.69704), new google.maps.LatLng(1.38472,103.71029), new google.maps.LatLng(1.37293,103.71116), new google.maps.LatLng(1.37340,103.68778), new google.maps.LatLng(1.39516,103.69172), new google.maps.LatLng(1.36709,103.69643), new google.maps.LatLng(1.38651,103.70798), new google.maps.LatLng(1.38887,103.71401), new google.maps.LatLng(1.37689,103.68593), new google.maps.LatLng(1.37561,103.69349), new google.maps.LatLng(1.37092,103.71377), new google.maps.LatLng(1.39499,103.69377), new google.maps.LatLng(1.36950,103.68740), new google.maps.LatLng(1.36248,103.69637), new google.maps.LatLng(1.36787,103.70393), new google.maps.LatLng(1.36793,103.70013), new google.maps.LatLng(1.36769,103.69099), new google.maps.LatLng(1.38426,103.69905), new google.maps.LatLng(1.36630,103.70921), new google.maps.LatLng(1.37451,103.68462), new google.maps.LatLng(1.37580,103.70246), new google.maps.LatLng(1.36986,103.71123), new google.maps.LatLng(1.37599,103.69443), new google.maps.LatLng(1.37419,103.71519), new google.maps.LatLng(1.37424,103.69707), new google.maps.LatLng(1.38826,103.68774), new google.maps.LatLng(1.37036,103.69418), new google.maps.LatLng(1.38784,103.68889), new google.maps.LatLng(1.39158,103.69460), new google.maps.LatLng(1.36433,103.69341), new google.maps.LatLng(1.37538,103.69726), new google.maps.LatLng(1.37379,103.70143), new google.maps.LatLng(1.39423,103.70852), new google.maps.LatLng(1.37941,103.71614), new google.maps.LatLng(1.38131,103.71580), new google.maps.LatLng(1.39572,103.69501), new google.maps.LatLng(1.37314,103.69156), new google.maps.LatLng(1.38028,103.71324), new google.maps.LatLng(1.38254,103.71599), new google.maps.LatLng(1.37934,103.68959), new google.maps.LatLng(1.38067,103.69384), new google.maps.LatLng(1.36452,103.69315), new google.maps.LatLng(1.38485,103.70912), new google.maps.LatLng(1.38717,103.71473), new google.maps.LatLng(1.37690,103.68478), new google.maps.LatLng(1.38985,103.70079), new google.maps.LatLng(1.36982,103.69904), new google.maps.LatLng(1.38499,103.71434), new google.maps.LatLng(1.39531,103.70793), new google.maps.LatLng(1.39646,103.69483), new google.maps.LatLng(1.38006,103.70749), new google.maps.LatLng(1.39066,103.69177), new google.maps.LatLng(1.38562,103.71394), new google.maps.LatLng(1.38711,103.71496), new google.maps.LatLng(1.36656,103.70046), new google.maps.LatLng(1.37861,103.69740), new google.maps.LatLng(1.37676,103.69389), new google.maps.LatLng(1.38359,103.69798), new google.maps.LatLng(1.39124,103.69749), new google.maps.LatLng(1.39112,103.71211), new google.maps.LatLng(1.37770,103.68954), new google.maps.LatLng(1.38764,103.70982), new google.maps.LatLng(1.38219,103.68202), new google.maps.LatLng(1.37591,103.70025), new google.maps.LatLng(1.39589,103.69922), new google.maps.LatLng(1.38958,103.70751), new google.maps.LatLng(1.38109,103.68843), new google.maps.LatLng(1.36839,103.69687), new google.maps.LatLng(1.39500,103.70584), new google.maps.LatLng(1.36330,103.70255), new google.maps.LatLng(1.38510,103.68750), new google.maps.LatLng(1.36232,103.70018), new google.maps.LatLng(1.37820,103.68641), new google.maps.LatLng(1.36282,103.69505), new google.maps.LatLng(1.36958,103.69911), new google.maps.LatLng(1.37022,103.69392), new google.maps.LatLng(1.37465,103.68401), new google.maps.LatLng(1.36147,103.67505), new google.maps.LatLng(1.36225,103.68365), new google.maps.LatLng(1.36836,103.67531), new google.maps.LatLng(1.35581,103.66937), new google.maps.LatLng(1.34697,103.66835), new google.maps.LatLng(1.35396,103.69141), new google.maps.LatLng(1.36021,103.67591), new google.maps.LatLng(1.34420,103.68690), new google.maps.LatLng(1.36412,103.69438), new google.maps.LatLng(1.35806,103.67525), new google.maps.LatLng(1.37281,103.67913), new google.maps.LatLng(1.36677,103.66623), new google.maps.LatLng(1.35333,103.68266), new google.maps.LatLng(1.34631,103.67409), new google.maps.LatLng(1.36444,103.67053), new google.maps.LatLng(1.36671,103.66974), new google.maps.LatLng(1.35099,103.68305), new google.maps.LatLng(1.37332,103.67709), new google.maps.LatLng(1.36984,103.67142), new google.maps.LatLng(1.35329,103.66799), new google.maps.LatLng(1.36925,103.66755), new google.maps.LatLng(1.35920,103.69462), new google.maps.LatLng(1.35154,103.67369), new google.maps.LatLng(1.36039,103.67070), new google.maps.LatLng(1.35015,103.69061), new google.maps.LatLng(1.36774,103.68238), new google.maps.LatLng(1.37370,103.68817), new google.maps.LatLng(1.36402,103.68959), new google.maps.LatLng(1.34338,103.68901), new google.maps.LatLng(1.35221,103.66877), new google.maps.LatLng(1.35904,103.69358), new google.maps.LatLng(1.36037,103.68664), new google.maps.LatLng(1.35051,103.67496), new google.maps.LatLng(1.37230,103.68279), new google.maps.LatLng(1.34854,103.67009), new google.maps.LatLng(1.36882,103.67047), new google.maps.LatLng(1.34941,103.67504), new google.maps.LatLng(1.34626,103.68187), new google.maps.LatLng(1.34895,103.68808), new google.maps.LatLng(1.36856,103.67586), new google.maps.LatLng(1.37512,103.67715), new google.maps.LatLng(1.36763,103.68348), new google.maps.LatLng(1.34214,103.67822), new google.maps.LatLng(1.35996,103.68172), new google.maps.LatLng(1.35257,103.69185), new google.maps.LatLng(1.34927,103.67013), new google.maps.LatLng(1.35128,103.67820), new google.maps.LatLng(1.37234,103.69036), new google.maps.LatLng(1.34864,103.66675), new google.maps.LatLng(1.36650,103.69012), new google.maps.LatLng(1.34333,103.68388), new google.maps.LatLng(1.34163,103.67378), new google.maps.LatLng(1.35736,103.68760), new google.maps.LatLng(1.37107,103.69011), new google.maps.LatLng(1.36385,103.68437), new google.maps.LatLng(1.35331,103.68078), new google.maps.LatLng(1.37079,103.67327), new google.maps.LatLng(1.35477,103.68127), new google.maps.LatLng(1.36944,103.69001), new google.maps.LatLng(1.35276,103.69446), new google.maps.LatLng(1.36312,103.68484), new google.maps.LatLng(1.36289,103.69528), new google.maps.LatLng(1.36447,103.66863), new google.maps.LatLng(1.35232,103.67155), new google.maps.LatLng(1.34413,103.68055), new google.maps.LatLng(1.35687,103.69601), new google.maps.LatLng(1.34317,103.67947), new google.maps.LatLng(1.36264,103.67651), new google.maps.LatLng(1.36402,103.66747), new google.maps.LatLng(1.34483,103.67906), new google.maps.LatLng(1.35307,103.67260), new google.maps.LatLng(1.35978,103.67285), new google.maps.LatLng(1.36451,103.69433), new google.maps.LatLng(1.37471,103.68186), new google.maps.LatLng(1.35426,103.67296), new google.maps.LatLng(1.35968,103.68649), new google.maps.LatLng(1.36837,103.67665), new google.maps.LatLng(1.36305,103.67324), new google.maps.LatLng(1.36477,103.66675)]
    };
    
    $scope.getEastPointsForSingapore = function()
    {
        return [new google.maps.LatLng(1.31512,103.90543), new google.maps.LatLng(1.32056,103.89270), new google.maps.LatLng(1.32411,103.91013), new google.maps.LatLng(1.32794,103.90001), new google.maps.LatLng(1.31405,103.89824), new google.maps.LatLng(1.31506,103.89354), new google.maps.LatLng(1.31709,103.90240), new google.maps.LatLng(1.31552,103.89031), new google.maps.LatLng(1.31573,103.91700), new google.maps.LatLng(1.33324,103.90777), new google.maps.LatLng(1.33280,103.89445), new google.maps.LatLng(1.32035,103.92010), new google.maps.LatLng(1.30587,103.89350), new google.maps.LatLng(1.31002,103.91404), new google.maps.LatLng(1.32581,103.91570), new google.maps.LatLng(1.31707,103.90821), new google.maps.LatLng(1.31058,103.90874), new google.maps.LatLng(1.32049,103.89752), new google.maps.LatLng(1.33014,103.89470), new google.maps.LatLng(1.31838,103.89359), new google.maps.LatLng(1.33287,103.90804), new google.maps.LatLng(1.32868,103.89805), new google.maps.LatLng(1.30846,103.89324), new google.maps.LatLng(1.33101,103.90871), new google.maps.LatLng(1.33115,103.90029), new google.maps.LatLng(1.32031,103.88910), new google.maps.LatLng(1.30398,103.91155), new google.maps.LatLng(1.31585,103.88897), new google.maps.LatLng(1.31136,103.89158), new google.maps.LatLng(1.31144,103.90527), new google.maps.LatLng(1.33670,103.90555), new google.maps.LatLng(1.33135,103.91064), new google.maps.LatLng(1.31968,103.89249), new google.maps.LatLng(1.32031,103.91679), new google.maps.LatLng(1.31110,103.90995), new google.maps.LatLng(1.31130,103.89454), new google.maps.LatLng(1.30794,103.89098), new google.maps.LatLng(1.33488,103.91330), new google.maps.LatLng(1.30991,103.91615), new google.maps.LatLng(1.31381,103.88778), new google.maps.LatLng(1.33147,103.91434), new google.maps.LatLng(1.32143,103.92084), new google.maps.LatLng(1.32916,103.88902), new google.maps.LatLng(1.30579,103.90987), new google.maps.LatLng(1.30507,103.91000), new google.maps.LatLng(1.30570,103.89979), new google.maps.LatLng(1.33693,103.90610), new google.maps.LatLng(1.32940,103.91328), new google.maps.LatLng(1.31855,103.90927), new google.maps.LatLng(1.33276,103.89984), new google.maps.LatLng(1.32523,103.91165), new google.maps.LatLng(1.31274,103.89569), new google.maps.LatLng(1.31033,103.90551), new google.maps.LatLng(1.31776,103.91877), new google.maps.LatLng(1.32524,103.89103), new google.maps.LatLng(1.31337,103.91170), new google.maps.LatLng(1.32424,103.90634), new google.maps.LatLng(1.32731,103.90251), new google.maps.LatLng(1.32532,103.91758), new google.maps.LatLng(1.31498,103.89252), new google.maps.LatLng(1.32066,103.90327), new google.maps.LatLng(1.30514,103.89630), new google.maps.LatLng(1.32092,103.90410), new google.maps.LatLng(1.32187,103.89959), new google.maps.LatLng(1.31725,103.91182), new google.maps.LatLng(1.32701,103.89820), new google.maps.LatLng(1.30743,103.89283), new google.maps.LatLng(1.30825,103.89620), new google.maps.LatLng(1.31104,103.91800), new google.maps.LatLng(1.32155,103.89155), new google.maps.LatLng(1.32209,103.92115), new google.maps.LatLng(1.31261,103.89750), new google.maps.LatLng(1.32441,103.91438), new google.maps.LatLng(1.32962,103.90747), new google.maps.LatLng(1.30595,103.91431), new google.maps.LatLng(1.31190,103.91537), new google.maps.LatLng(1.31760,103.90046), new google.maps.LatLng(1.31333,103.91136), new google.maps.LatLng(1.33720,103.89952), new google.maps.LatLng(1.32281,103.91982), new google.maps.LatLng(1.31554,103.93684), new google.maps.LatLng(1.31559,103.94263), new google.maps.LatLng(1.32351,103.93845), new google.maps.LatLng(1.33240,103.94110), new google.maps.LatLng(1.34139,103.95115), new google.maps.LatLng(1.32599,103.93641), new google.maps.LatLng(1.32329,103.95419), new google.maps.LatLng(1.32987,103.93572), new google.maps.LatLng(1.33835,103.95202), new google.maps.LatLng(1.32247,103.94162), new google.maps.LatLng(1.31808,103.95261), new google.maps.LatLng(1.31584,103.94407), new google.maps.LatLng(1.33390,103.95385), new google.maps.LatLng(1.31641,103.94167), new google.maps.LatLng(1.32747,103.95225), new google.maps.LatLng(1.32377,103.94330), new google.maps.LatLng(1.34232,103.93829), new google.maps.LatLng(1.31737,103.95332), new google.maps.LatLng(1.32933,103.93038), new google.maps.LatLng(1.32457,103.94770), new google.maps.LatLng(1.31424,103.93634), new google.maps.LatLng(1.32970,103.95865), new google.maps.LatLng(1.34247,103.93226), new google.maps.LatLng(1.32190,103.93400), new google.maps.LatLng(1.33057,103.94840), new google.maps.LatLng(1.33161,103.95581), new google.maps.LatLng(1.32276,103.96107), new google.maps.LatLng(1.32650,103.94294), new google.maps.LatLng(1.31219,103.94255), new google.maps.LatLng(1.32325,103.95527), new google.maps.LatLng(1.32814,103.94477), new google.maps.LatLng(1.34505,103.94502), new google.maps.LatLng(1.34531,103.94624), new google.maps.LatLng(1.33718,103.93039), new google.maps.LatLng(1.32554,103.94333), new google.maps.LatLng(1.33253,103.93867), new google.maps.LatLng(1.33488,103.94368), new google.maps.LatLng(1.32029,103.94140), new google.maps.LatLng(1.31984,103.93490), new google.maps.LatLng(1.32357,103.95753), new google.maps.LatLng(1.34161,103.93934), new google.maps.LatLng(1.33744,103.92985), new google.maps.LatLng(1.33346,103.93060), new google.maps.LatLng(1.32985,103.96114), new google.maps.LatLng(1.31707,103.94724), new google.maps.LatLng(1.31478,103.94220), new google.maps.LatLng(1.33797,103.95202), new google.maps.LatLng(1.32147,103.93302), new google.maps.LatLng(1.33132,103.95302), new google.maps.LatLng(1.33966,103.95145), new google.maps.LatLng(1.33504,103.95997), new google.maps.LatLng(1.32130,103.95993), new google.maps.LatLng(1.33178,103.93171), new google.maps.LatLng(1.33339,103.92946), new google.maps.LatLng(1.32257,103.94726), new google.maps.LatLng(1.34327,103.93991), new google.maps.LatLng(1.31349,103.94551), new google.maps.LatLng(1.33015,103.95213), new google.maps.LatLng(1.32654,103.94291), new google.maps.LatLng(1.33133,103.93638), new google.maps.LatLng(1.33446,103.94909), new google.maps.LatLng(1.31859,103.94397), new google.maps.LatLng(1.34184,103.94442), new google.maps.LatLng(1.32322,103.95371), new google.maps.LatLng(1.34586,103.94249), new google.maps.LatLng(1.32651,103.92790), new google.maps.LatLng(1.34554,103.93692), new google.maps.LatLng(1.32018,103.93719), new google.maps.LatLng(1.34520,103.95151), new google.maps.LatLng(1.32825,103.93655), new google.maps.LatLng(1.33857,103.94665), new google.maps.LatLng(1.32017,103.94436), new google.maps.LatLng(1.33384,103.95808), new google.maps.LatLng(1.33347,103.93923), new google.maps.LatLng(1.33265,103.94984), new google.maps.LatLng(1.34564,103.94848), new google.maps.LatLng(1.33726,103.94805), new google.maps.LatLng(1.34216,103.95484), new google.maps.LatLng(1.31826,103.94322), new google.maps.LatLng(1.33012,103.94049), new google.maps.LatLng(1.35738,103.94131), new google.maps.LatLng(1.35945,103.95111), new google.maps.LatLng(1.35945,103.95858), new google.maps.LatLng(1.36406,103.94442), new google.maps.LatLng(1.36761,103.94316), new google.maps.LatLng(1.35848,103.94697), new google.maps.LatLng(1.35163,103.95615), new google.maps.LatLng(1.34825,103.94879), new google.maps.LatLng(1.34655,103.94939), new google.maps.LatLng(1.36966,103.96121), new google.maps.LatLng(1.35527,103.95911), new google.maps.LatLng(1.36286,103.94378), new google.maps.LatLng(1.36464,103.95100), new google.maps.LatLng(1.35407,103.95882), new google.maps.LatLng(1.37103,103.95019), new google.maps.LatLng(1.35084,103.94220), new google.maps.LatLng(1.36254,103.93791), new google.maps.LatLng(1.36308,103.96434), new google.maps.LatLng(1.34980,103.95853), new google.maps.LatLng(1.36399,103.95130), new google.maps.LatLng(1.36114,103.94417), new google.maps.LatLng(1.34324,103.95858), new google.maps.LatLng(1.35139,103.96452), new google.maps.LatLng(1.35914,103.94101), new google.maps.LatLng(1.37173,103.94788), new google.maps.LatLng(1.36799,103.94550), new google.maps.LatLng(1.34705,103.95823), new google.maps.LatLng(1.36373,103.94775), new google.maps.LatLng(1.36564,103.93857), new google.maps.LatLng(1.36772,103.95242), new google.maps.LatLng(1.36629,103.95276), new google.maps.LatLng(1.36668,103.95822), new google.maps.LatLng(1.36272,103.94287), new google.maps.LatLng(1.35358,103.96712), new google.maps.LatLng(1.35524,103.95307), new google.maps.LatLng(1.34067,103.95011), new google.maps.LatLng(1.35301,103.94706), new google.maps.LatLng(1.34662,103.93912), new google.maps.LatLng(1.36352,103.93660), new google.maps.LatLng(1.34440,103.93853), new google.maps.LatLng(1.35437,103.94328), new google.maps.LatLng(1.36442,103.96227), new google.maps.LatLng(1.36256,103.96495), new google.maps.LatLng(1.34615,103.94544), new google.maps.LatLng(1.34560,103.95740), new google.maps.LatLng(1.36531,103.94239), new google.maps.LatLng(1.34944,103.95807), new google.maps.LatLng(1.35243,103.93687), new google.maps.LatLng(1.37087,103.95688), new google.maps.LatLng(1.35893,103.94764), new google.maps.LatLng(1.35561,103.94525), new google.maps.LatLng(1.35145,103.94603), new google.maps.LatLng(1.36518,103.96051), new google.maps.LatLng(1.34336,103.96044), new google.maps.LatLng(1.35580,103.93824), new google.maps.LatLng(1.35869,103.96400), new google.maps.LatLng(1.36692,103.93846), new google.maps.LatLng(1.36787,103.95807), new google.maps.LatLng(1.34972,103.96110), new google.maps.LatLng(1.35837,103.93667), new google.maps.LatLng(1.36399,103.93450), new google.maps.LatLng(1.36637,103.94115), new google.maps.LatLng(1.36192,103.96281), new google.maps.LatLng(1.35941,103.96056), new google.maps.LatLng(1.35996,103.93326), new google.maps.LatLng(1.34942,103.93723), new google.maps.LatLng(1.35891,103.93879), new google.maps.LatLng(1.35230,103.95472), new google.maps.LatLng(1.36257,103.94440), new google.maps.LatLng(1.35039,103.94206), new google.maps.LatLng(1.35508,103.95368), new google.maps.LatLng(1.35901,103.94185), new google.maps.LatLng(1.35994,103.96429), new google.maps.LatLng(1.34518,103.93994), new google.maps.LatLng(1.36225,103.96121), new google.maps.LatLng(1.36937,103.95849), new google.maps.LatLng(1.35091,103.95417), new google.maps.LatLng(1.37107,103.94136), new google.maps.LatLng(1.35260,103.96598), new google.maps.LatLng(1.36035,103.94227), new google.maps.LatLng(1.38269,103.94120), new google.maps.LatLng(1.37674,103.93139), new google.maps.LatLng(1.38002,103.93239), new google.maps.LatLng(1.37919,103.91851), new google.maps.LatLng(1.38168,103.91220), new google.maps.LatLng(1.37887,103.92649), new google.maps.LatLng(1.38334,103.93623), new google.maps.LatLng(1.36921,103.91499), new google.maps.LatLng(1.37735,103.92285), new google.maps.LatLng(1.36474,103.92836), new google.maps.LatLng(1.38155,103.94616), new google.maps.LatLng(1.38337,103.91814), new google.maps.LatLng(1.36981,103.91545), new google.maps.LatLng(1.37612,103.92749), new google.maps.LatLng(1.37978,103.93914), new google.maps.LatLng(1.36546,103.92955), new google.maps.LatLng(1.36714,103.91774), new google.maps.LatLng(1.38436,103.91984), new google.maps.LatLng(1.37981,103.91335), new google.maps.LatLng(1.37659,103.92588), new google.maps.LatLng(1.36715,103.93700), new google.maps.LatLng(1.39514,103.92335), new google.maps.LatLng(1.38384,103.91574), new google.maps.LatLng(1.38032,103.92759), new google.maps.LatLng(1.37130,103.93608), new google.maps.LatLng(1.36930,103.93858), new google.maps.LatLng(1.39158,103.92346), new google.maps.LatLng(1.37270,103.93439), new google.maps.LatLng(1.37945,103.94135), new google.maps.LatLng(1.38755,103.91559), new google.maps.LatLng(1.37776,103.91160), new google.maps.LatLng(1.39044,103.92105), new google.maps.LatLng(1.37663,103.92789), new google.maps.LatLng(1.39266,103.93458), new google.maps.LatLng(1.36606,103.92654), new google.maps.LatLng(1.37970,103.92592), new google.maps.LatLng(1.38771,103.94167), new google.maps.LatLng(1.38825,103.91873), new google.maps.LatLng(1.37570,103.94265), new google.maps.LatLng(1.38724,103.92269), new google.maps.LatLng(1.39512,103.93245), new google.maps.LatLng(1.37841,103.94472), new google.maps.LatLng(1.37299,103.91602), new google.maps.LatLng(1.38277,103.94320), new google.maps.LatLng(1.37480,103.93293), new google.maps.LatLng(1.37523,103.93571), new google.maps.LatLng(1.38532,103.93722), new google.maps.LatLng(1.38707,103.91745), new google.maps.LatLng(1.38212,103.93154), new google.maps.LatLng(1.38592,103.93835), new google.maps.LatLng(1.38943,103.93075), new google.maps.LatLng(1.37601,103.94425), new google.maps.LatLng(1.36868,103.93307), new google.maps.LatLng(1.38911,103.92751), new google.maps.LatLng(1.37806,103.91345), new google.maps.LatLng(1.38828,103.94317), new google.maps.LatLng(1.39078,103.93987), new google.maps.LatLng(1.37494,103.93526), new google.maps.LatLng(1.36838,103.92919), new google.maps.LatLng(1.36855,103.91900), new google.maps.LatLng(1.36887,103.92358), new google.maps.LatLng(1.37025,103.92613), new google.maps.LatLng(1.36848,103.93026), new google.maps.LatLng(1.39026,103.91596), new google.maps.LatLng(1.38650,103.92749), new google.maps.LatLng(1.39317,103.93162), new google.maps.LatLng(1.37343,103.92221), new google.maps.LatLng(1.38753,103.92357), new google.maps.LatLng(1.39688,103.93069), new google.maps.LatLng(1.39067,103.93774), new google.maps.LatLng(1.39277,103.91802), new google.maps.LatLng(1.39277,103.91715), new google.maps.LatLng(1.37563,103.94176), new google.maps.LatLng(1.37280,103.91541), new google.maps.LatLng(1.38096,103.92701), new google.maps.LatLng(1.38867,103.91778), new google.maps.LatLng(1.39254,103.93994), new google.maps.LatLng(1.38081,103.91278), new google.maps.LatLng(1.39624,103.92696), new google.maps.LatLng(1.36735,103.92947), new google.maps.LatLng(1.36655,103.97411), new google.maps.LatLng(1.36534,103.98146), new google.maps.LatLng(1.35231,103.97687), new google.maps.LatLng(1.36485,103.98254), new google.maps.LatLng(1.36129,103.95878), new google.maps.LatLng(1.36421,103.95590), new google.maps.LatLng(1.35944,103.96212), new google.maps.LatLng(1.36885,103.98033), new google.maps.LatLng(1.34483,103.98156), new google.maps.LatLng(1.34020,103.96762), new google.maps.LatLng(1.37027,103.97151), new google.maps.LatLng(1.35152,103.95539), new google.maps.LatLng(1.36181,103.97596), new google.maps.LatLng(1.34251,103.97743), new google.maps.LatLng(1.35530,103.98593), new google.maps.LatLng(1.35858,103.96733), new google.maps.LatLng(1.34727,103.96168), new google.maps.LatLng(1.34309,103.97624), new google.maps.LatLng(1.36730,103.96960), new google.maps.LatLng(1.34748,103.97879), new google.maps.LatLng(1.35399,103.95896), new google.maps.LatLng(1.34085,103.96761), new google.maps.LatLng(1.34849,103.98545), new google.maps.LatLng(1.35052,103.96726), new google.maps.LatLng(1.36823,103.97030), new google.maps.LatLng(1.34133,103.96795), new google.maps.LatLng(1.37184,103.97523), new google.maps.LatLng(1.36522,103.97549), new google.maps.LatLng(1.35168,103.97189), new google.maps.LatLng(1.37061,103.98142), new google.maps.LatLng(1.36197,103.98024), new google.maps.LatLng(1.35009,103.98334), new google.maps.LatLng(1.36486,103.96153), new google.maps.LatLng(1.36257,103.98446), new google.maps.LatLng(1.35329,103.96568), new google.maps.LatLng(1.34714,103.97340), new google.maps.LatLng(1.34201,103.96898), new google.maps.LatLng(1.35498,103.97905), new google.maps.LatLng(1.36118,103.98656), new google.maps.LatLng(1.35225,103.96942), new google.maps.LatLng(1.37189,103.97567), new google.maps.LatLng(1.34210,103.97233), new google.maps.LatLng(1.34476,103.96999), new google.maps.LatLng(1.35426,103.96068), new google.maps.LatLng(1.36841,103.97020), new google.maps.LatLng(1.34647,103.98229), new google.maps.LatLng(1.35138,103.97003), new google.maps.LatLng(1.35440,103.98659), new google.maps.LatLng(1.35866,103.98531), new google.maps.LatLng(1.36253,103.96229), new google.maps.LatLng(1.36070,103.96136), new google.maps.LatLng(1.36814,103.96286), new google.maps.LatLng(1.34894,103.98241), new google.maps.LatLng(1.35264,103.98334), new google.maps.LatLng(1.35965,103.97769), new google.maps.LatLng(1.34915,103.97806), new google.maps.LatLng(1.34579,103.97296), new google.maps.LatLng(1.35754,103.98785), new google.maps.LatLng(1.35290,103.95958), new google.maps.LatLng(1.34566,103.96878), new google.maps.LatLng(1.35156,103.97306), new google.maps.LatLng(1.35583,103.96807), new google.maps.LatLng(1.34741,103.97757), new google.maps.LatLng(1.36323,103.98523), new google.maps.LatLng(1.36358,103.96041), new google.maps.LatLng(1.34657,103.97073), new google.maps.LatLng(1.36352,103.95468), new google.maps.LatLng(1.34906,103.98055), new google.maps.LatLng(1.35774,103.97900), new google.maps.LatLng(1.36742,103.98547), new google.maps.LatLng(1.36114,103.97450), new google.maps.LatLng(1.35476,103.95872), new google.maps.LatLng(1.37053,103.97027), new google.maps.LatLng(1.34837,103.95744), new google.maps.LatLng(1.36855,103.97479), new google.maps.LatLng(1.35146,103.96749), new google.maps.LatLng(1.35604,103.98184), new google.maps.LatLng(1.36187,103.95904), new google.maps.LatLng(1.35182,103.97856), new google.maps.LatLng(1.37118,103.96963)];
    };

    $scope.getNorthPointsForSingapore = function()
    {
        return [new google.maps.LatLng(1.41296,103.75703), new google.maps.LatLng(1.43111,103.77150), new google.maps.LatLng(1.40716,103.75709), new google.maps.LatLng(1.41119,103.75372), new google.maps.LatLng(1.41746,103.74401), new google.maps.LatLng(1.40479,103.75316), new google.maps.LatLng(1.42103,103.74409), new google.maps.LatLng(1.42472,103.77458), new google.maps.LatLng(1.43267,103.75142), new google.maps.LatLng(1.40803,103.75357), new google.maps.LatLng(1.40765,103.76009), new google.maps.LatLng(1.41942,103.77081), new google.maps.LatLng(1.41903,103.75541), new google.maps.LatLng(1.40131,103.76298), new google.maps.LatLng(1.43238,103.76024), new google.maps.LatLng(1.41666,103.77820), new google.maps.LatLng(1.40722,103.75021), new google.maps.LatLng(1.41971,103.75558), new google.maps.LatLng(1.41207,103.77356), new google.maps.LatLng(1.42716,103.75738), new google.maps.LatLng(1.42218,103.76440), new google.maps.LatLng(1.42431,103.76352), new google.maps.LatLng(1.42760,103.75451), new google.maps.LatLng(1.40250,103.76628), new google.maps.LatLng(1.40696,103.75603), new google.maps.LatLng(1.40766,103.76675), new google.maps.LatLng(1.42153,103.74789), new google.maps.LatLng(1.43355,103.75375), new google.maps.LatLng(1.41522,103.76215), new google.maps.LatLng(1.42551,103.77351), new google.maps.LatLng(1.42785,103.76464), new google.maps.LatLng(1.41583,103.75463), new google.maps.LatLng(1.41361,103.77360), new google.maps.LatLng(1.42235,103.74980), new google.maps.LatLng(1.42256,103.77509), new google.maps.LatLng(1.43602,103.75698), new google.maps.LatLng(1.42282,103.76383), new google.maps.LatLng(1.42602,103.77351), new google.maps.LatLng(1.42593,103.75090), new google.maps.LatLng(1.42268,103.75094), new google.maps.LatLng(1.41711,103.76406), new google.maps.LatLng(1.42677,103.77381), new google.maps.LatLng(1.40349,103.76286), new google.maps.LatLng(1.42341,103.77193), new google.maps.LatLng(1.40598,103.75053), new google.maps.LatLng(1.41581,103.76010), new google.maps.LatLng(1.41804,103.74496), new google.maps.LatLng(1.41832,103.74456), new google.maps.LatLng(1.42587,103.77113), new google.maps.LatLng(1.41430,103.75298), new google.maps.LatLng(1.41557,103.74785), new google.maps.LatLng(1.43315,103.75272), new google.maps.LatLng(1.42983,103.75257), new google.maps.LatLng(1.42130,103.77065), new google.maps.LatLng(1.42683,103.77421), new google.maps.LatLng(1.41886,103.76843), new google.maps.LatLng(1.42270,103.76613), new google.maps.LatLng(1.41201,103.76317), new google.maps.LatLng(1.40693,103.75177), new google.maps.LatLng(1.42749,103.75625), new google.maps.LatLng(1.42920,103.77134), new google.maps.LatLng(1.42117,103.77198), new google.maps.LatLng(1.42659,103.77192), new google.maps.LatLng(1.41060,103.76636), new google.maps.LatLng(1.41954,103.77304), new google.maps.LatLng(1.40521,103.75422), new google.maps.LatLng(1.40548,103.76813), new google.maps.LatLng(1.43322,103.75079), new google.maps.LatLng(1.41695,103.74861), new google.maps.LatLng(1.42972,103.77025), new google.maps.LatLng(1.42725,103.74976), new google.maps.LatLng(1.42300,103.77688), new google.maps.LatLng(1.40883,103.77079), new google.maps.LatLng(1.41216,103.76435), new google.maps.LatLng(1.41646,103.76086), new google.maps.LatLng(1.41971,103.75000), new google.maps.LatLng(1.43022,103.75260), new google.maps.LatLng(1.43480,103.76085), new google.maps.LatLng(1.40940,103.74980), new google.maps.LatLng(1.41922,103.75458), new google.maps.LatLng(1.43643,103.81909), new google.maps.LatLng(1.45038,103.81728), new google.maps.LatLng(1.45567,103.82154), new google.maps.LatLng(1.43095,103.81524), new google.maps.LatLng(1.45327,103.81790), new google.maps.LatLng(1.45126,103.80612), new google.maps.LatLng(1.44237,103.80383), new google.maps.LatLng(1.45184,103.81614), new google.maps.LatLng(1.43326,103.81406), new google.maps.LatLng(1.45613,103.82637), new google.maps.LatLng(1.43800,103.81327), new google.maps.LatLng(1.44096,103.80229), new google.maps.LatLng(1.44170,103.83251), new google.maps.LatLng(1.44164,103.82096), new google.maps.LatLng(1.43042,103.81161), new google.maps.LatLng(1.42834,103.82051), new google.maps.LatLng(1.45369,103.82387), new google.maps.LatLng(1.44501,103.81056), new google.maps.LatLng(1.43828,103.80533), new google.maps.LatLng(1.46120,103.82118), new google.maps.LatLng(1.42981,103.82565), new google.maps.LatLng(1.44516,103.80751), new google.maps.LatLng(1.43793,103.82839), new google.maps.LatLng(1.46043,103.82190), new google.maps.LatLng(1.45829,103.81384), new google.maps.LatLng(1.43299,103.80407), new google.maps.LatLng(1.44206,103.81540), new google.maps.LatLng(1.43945,103.79937), new google.maps.LatLng(1.43074,103.80458), new google.maps.LatLng(1.43877,103.80643), new google.maps.LatLng(1.43592,103.80851), new google.maps.LatLng(1.44014,103.82862), new google.maps.LatLng(1.46161,103.81408), new google.maps.LatLng(1.45173,103.82284), new google.maps.LatLng(1.45000,103.82475), new google.maps.LatLng(1.44912,103.82328), new google.maps.LatLng(1.43632,103.82895), new google.maps.LatLng(1.44607,103.81776), new google.maps.LatLng(1.44222,103.80816), new google.maps.LatLng(1.44953,103.80786), new google.maps.LatLng(1.44671,103.82941), new google.maps.LatLng(1.43572,103.82431), new google.maps.LatLng(1.44456,103.80260), new google.maps.LatLng(1.45493,103.82465), new google.maps.LatLng(1.46062,103.82196), new google.maps.LatLng(1.43444,103.81340), new google.maps.LatLng(1.44766,103.80051), new google.maps.LatLng(1.45532,103.82090), new google.maps.LatLng(1.45745,103.80452), new google.maps.LatLng(1.42681,103.81196), new google.maps.LatLng(1.45058,103.80719), new google.maps.LatLng(1.43887,103.82501), new google.maps.LatLng(1.45041,103.80841), new google.maps.LatLng(1.43602,103.81449), new google.maps.LatLng(1.45220,103.81076), new google.maps.LatLng(1.45755,103.80861), new google.maps.LatLng(1.42789,103.82063), new google.maps.LatLng(1.43586,103.80435), new google.maps.LatLng(1.44165,103.80783), new google.maps.LatLng(1.45176,103.81273), new google.maps.LatLng(1.44698,103.80785), new google.maps.LatLng(1.43135,103.82405), new google.maps.LatLng(1.45652,103.81101), new google.maps.LatLng(1.43240,103.80327), new google.maps.LatLng(1.44588,103.82935), new google.maps.LatLng(1.44488,103.82604), new google.maps.LatLng(1.44065,103.83063), new google.maps.LatLng(1.44235,103.80471), new google.maps.LatLng(1.46026,103.81319), new google.maps.LatLng(1.43624,103.81147), new google.maps.LatLng(1.44225,103.80994), new google.maps.LatLng(1.43652,103.81416), new google.maps.LatLng(1.45197,103.81518), new google.maps.LatLng(1.44894,103.81476), new google.maps.LatLng(1.43547,103.80760), new google.maps.LatLng(1.44080,103.82242), new google.maps.LatLng(1.43496,103.80312), new google.maps.LatLng(1.43653,103.80652), new google.maps.LatLng(1.44318,103.80109), new google.maps.LatLng(1.44272,103.81427), new google.maps.LatLng(1.42448,103.81984), new google.maps.LatLng(1.44122,103.82793), new google.maps.LatLng(1.42422,103.82415), new google.maps.LatLng(1.43857,103.84656), new google.maps.LatLng(1.44175,103.84463), new google.maps.LatLng(1.43026,103.85199), new google.maps.LatLng(1.42013,103.84014), new google.maps.LatLng(1.44217,103.81944), new google.maps.LatLng(1.42283,103.82648), new google.maps.LatLng(1.42746,103.81803), new google.maps.LatLng(1.44286,103.82734), new google.maps.LatLng(1.44071,103.83007), new google.maps.LatLng(1.42549,103.81870), new google.maps.LatLng(1.41502,103.83810), new google.maps.LatLng(1.42576,103.83798), new google.maps.LatLng(1.41826,103.83265), new google.maps.LatLng(1.43322,103.82451), new google.maps.LatLng(1.44765,103.82751), new google.maps.LatLng(1.42492,103.84483), new google.maps.LatLng(1.44284,103.82532), new google.maps.LatLng(1.43561,103.83791), new google.maps.LatLng(1.44657,103.84365), new google.maps.LatLng(1.41788,103.82462), new google.maps.LatLng(1.44117,103.83059), new google.maps.LatLng(1.43082,103.84428), new google.maps.LatLng(1.44574,103.83296), new google.maps.LatLng(1.41677,103.83186), new google.maps.LatLng(1.43356,103.84757), new google.maps.LatLng(1.41956,103.82607), new google.maps.LatLng(1.42038,103.84772), new google.maps.LatLng(1.41848,103.83978), new google.maps.LatLng(1.41958,103.84690), new google.maps.LatLng(1.43836,103.82229), new google.maps.LatLng(1.44049,103.83911), new google.maps.LatLng(1.44241,103.82198), new google.maps.LatLng(1.44742,103.83600), new google.maps.LatLng(1.44407,103.83597), new google.maps.LatLng(1.44276,103.82555), new google.maps.LatLng(1.44802,103.84009), new google.maps.LatLng(1.42496,103.82961), new google.maps.LatLng(1.41985,103.82191), new google.maps.LatLng(1.43731,103.82129), new google.maps.LatLng(1.44405,103.82958), new google.maps.LatLng(1.41849,103.84457), new google.maps.LatLng(1.42494,103.82473), new google.maps.LatLng(1.43965,103.82490), new google.maps.LatLng(1.44078,103.84850), new google.maps.LatLng(1.44281,103.83545), new google.maps.LatLng(1.44517,103.83096), new google.maps.LatLng(1.42228,103.84740), new google.maps.LatLng(1.43394,103.82000), new google.maps.LatLng(1.43021,103.82907), new google.maps.LatLng(1.42842,103.82034), new google.maps.LatLng(1.43991,103.84877), new google.maps.LatLng(1.43064,103.84806), new google.maps.LatLng(1.43687,103.85069), new google.maps.LatLng(1.42522,103.84532), new google.maps.LatLng(1.41846,103.82583), new google.maps.LatLng(1.42541,103.81822), new google.maps.LatLng(1.41698,103.83252), new google.maps.LatLng(1.42787,103.84099), new google.maps.LatLng(1.44068,103.82762), new google.maps.LatLng(1.44777,103.83883), new google.maps.LatLng(1.41866,103.83957), new google.maps.LatLng(1.43095,103.83834), new google.maps.LatLng(1.43201,103.82054), new google.maps.LatLng(1.41741,103.82986), new google.maps.LatLng(1.43460,103.81823), new google.maps.LatLng(1.44633,103.84232), new google.maps.LatLng(1.43828,103.84368), new google.maps.LatLng(1.42439,103.83375), new google.maps.LatLng(1.43719,103.84504), new google.maps.LatLng(1.44375,103.84079), new google.maps.LatLng(1.42439,103.82727), new google.maps.LatLng(1.43597,103.84517), new google.maps.LatLng(1.44012,103.83681), new google.maps.LatLng(1.44036,103.83187), new google.maps.LatLng(1.44736,103.82669), new google.maps.LatLng(1.42367,103.82787), new google.maps.LatLng(1.44154,103.82041), new google.maps.LatLng(1.42902,103.79737), new google.maps.LatLng(1.44645,103.81407), new google.maps.LatLng(1.42818,103.79187), new google.maps.LatLng(1.42839,103.80384), new google.maps.LatLng(1.43832,103.81345), new google.maps.LatLng(1.44521,103.80081), new google.maps.LatLng(1.44374,103.81956), new google.maps.LatLng(1.42764,103.79540), new google.maps.LatLng(1.43797,103.81667), new google.maps.LatLng(1.43091,103.80344), new google.maps.LatLng(1.42233,103.81421), new google.maps.LatLng(1.44006,103.81251), new google.maps.LatLng(1.43913,103.81533), new google.maps.LatLng(1.41843,103.79886), new google.maps.LatLng(1.41878,103.79645), new google.maps.LatLng(1.43743,103.79657), new google.maps.LatLng(1.41903,103.81413), new google.maps.LatLng(1.41928,103.79743), new google.maps.LatLng(1.41982,103.81517), new google.maps.LatLng(1.44626,103.80142), new google.maps.LatLng(1.42991,103.79964), new google.maps.LatLng(1.43490,103.79593), new google.maps.LatLng(1.42419,103.80615), new google.maps.LatLng(1.42593,103.81521), new google.maps.LatLng(1.42333,103.81908), new google.maps.LatLng(1.43583,103.80567), new google.maps.LatLng(1.43524,103.80473), new google.maps.LatLng(1.42656,103.79872), new google.maps.LatLng(1.43410,103.79982), new google.maps.LatLng(1.42197,103.80913), new google.maps.LatLng(1.44326,103.81126), new google.maps.LatLng(1.43322,103.79022), new google.maps.LatLng(1.42852,103.81886), new google.maps.LatLng(1.44091,103.79043), new google.maps.LatLng(1.43859,103.79697), new google.maps.LatLng(1.43264,103.78774), new google.maps.LatLng(1.43159,103.79148), new google.maps.LatLng(1.44197,103.80141), new google.maps.LatLng(1.43412,103.78809), new google.maps.LatLng(1.43415,103.81480), new google.maps.LatLng(1.43833,103.79835), new google.maps.LatLng(1.44159,103.79769), new google.maps.LatLng(1.43819,103.80004), new google.maps.LatLng(1.44266,103.80675), new google.maps.LatLng(1.44997,103.79964), new google.maps.LatLng(1.43982,103.79368), new google.maps.LatLng(1.43795,103.81780), new google.maps.LatLng(1.42655,103.81261), new google.maps.LatLng(1.43907,103.79890), new google.maps.LatLng(1.42940,103.81903), new google.maps.LatLng(1.44119,103.79778), new google.maps.LatLng(1.42513,103.79207), new google.maps.LatLng(1.41662,103.80351), new google.maps.LatLng(1.43797,103.80488), new google.maps.LatLng(1.42187,103.79651), new google.maps.LatLng(1.44863,103.80255), new google.maps.LatLng(1.45067,103.80462), new google.maps.LatLng(1.42440,103.79570), new google.maps.LatLng(1.42702,103.79317), new google.maps.LatLng(1.45068,103.80588), new google.maps.LatLng(1.44660,103.81084), new google.maps.LatLng(1.44658,103.81274), new google.maps.LatLng(1.42637,103.78867), new google.maps.LatLng(1.42595,103.79979), new google.maps.LatLng(1.41952,103.81278), new google.maps.LatLng(1.44290,103.81352), new google.maps.LatLng(1.42279,103.81751), new google.maps.LatLng(1.44333,103.81937), new google.maps.LatLng(1.43005,103.79349), new google.maps.LatLng(1.43299,103.78899), new google.maps.LatLng(1.43524,103.80625), new google.maps.LatLng(1.42795,103.81153), new google.maps.LatLng(1.43992,103.80219), new google.maps.LatLng(1.43492,103.79452), new google.maps.LatLng(1.43651,103.81365), new google.maps.LatLng(1.43549,103.78780), new google.maps.LatLng(1.44554,103.81683), new google.maps.LatLng(1.43748,103.78800), new google.maps.LatLng(1.44605,103.81568), new google.maps.LatLng(1.43984,103.79140)]
    };

    // Heatmap data: 500 Points
    $scope.getSouthPoints = function() 
    {
        return [
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573)
];
    };

          // Heatmap data: 500 Points
      $scope.getWestPoints = function() {
        return [
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656),
            new google.maps.LatLng(19.075984,72.877656)
          ];
        };

        $scope.getNorthPoints = function() {
            return [
                new google.maps.LatLng(28.542898,77.275086),
new google.maps.LatLng(28.569276,77.19502),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.574652,77.116316),
new google.maps.LatLng(28.23144,76.849754),
new google.maps.LatLng(28.339554,77.220397),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.368177,77.448684),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.460603,77.270687),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.45885,77.019743),
new google.maps.LatLng(28.251486,77.324366),
new google.maps.LatLng(28.33811,77.323986),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.514058,77.338029),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.571937,76.809956),
new google.maps.LatLng(28.394949,77.05046),
new google.maps.LatLng(28.302524,76.923973),
new google.maps.LatLng(28.20862,77.30694),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.34216,77.325596),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(27.940882,77.351099),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.139064,77.330522),
new google.maps.LatLng(28.139064,77.330522),
new google.maps.LatLng(28.460319,76.984403),
new google.maps.LatLng(28.472412,76.956187),
new google.maps.LatLng(28.361179,76.865493),
new google.maps.LatLng(28.293059,76.800459),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.394245,76.908124),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.350955,77.061483),
new google.maps.LatLng(28.309562,76.846316),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.288279,76.870148),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.524081,77.192903),
new google.maps.LatLng(28.487251,76.935498),
new google.maps.LatLng(28.507333,77.039362),
new google.maps.LatLng(28.475479,77.086761),
new google.maps.LatLng(28.323529,77.463027),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.346422,77.320697),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.270747,77.467329),
new google.maps.LatLng(28.270747,77.467329),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.155604,77.40421),
new google.maps.LatLng(28.311507,77.129866),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.280782,76.730766),
new google.maps.LatLng(28.30221,77.388425),
new google.maps.LatLng(28.260819,77.345364),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.472932,76.957825),
new google.maps.LatLng(28.192852,77.249137),
new google.maps.LatLng(28.362496,77.187377),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.487667,77.088103),
new google.maps.LatLng(28.491681,77.094897),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.208789,77.008945),
new google.maps.LatLng(28.512821,77.077726),
new google.maps.LatLng(28.197737,76.71813),
new google.maps.LatLng(28.362496,77.187377),
new google.maps.LatLng(28.432131,77.307379),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.384764,77.303723),
new google.maps.LatLng(28.383467,77.323487),
new google.maps.LatLng(28.395273,77.323827),
new google.maps.LatLng(28.413805,77.322391),
new google.maps.LatLng(28.406691,77.317829),
new google.maps.LatLng(28.411504,77.307493),
new google.maps.LatLng(28.365419,77.296542),
new google.maps.LatLng(28.433905,77.322391),
new google.maps.LatLng(28.352098,77.33538),
new google.maps.LatLng(28.362377,77.325263),
new google.maps.LatLng(28.361885,77.335314),
new google.maps.LatLng(28.373375,77.335314),
new google.maps.LatLng(28.381589,77.376944),
new google.maps.LatLng(28.44899,76.822792),
new google.maps.LatLng(28.257487,77.371203),
new google.maps.LatLng(28.332298,77.234767),
new google.maps.LatLng(28.416093,77.042221),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.379753,77.281153),
new google.maps.LatLng(28.252452,77.277837),
new google.maps.LatLng(28.467755,77.077104),
new google.maps.LatLng(28.449691,76.932617),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.322619,77.057886),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.136247,77.076593),
new google.maps.LatLng(28.149009,77.449401),
new google.maps.LatLng(28.251737,77.203149),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.479161,77.059325),
new google.maps.LatLng(28.44529,77.065081),
new google.maps.LatLng(28.426217,77.096765),
new google.maps.LatLng(28.417572,77.052848),
new google.maps.LatLng(28.417572,77.052848),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.474759,77.291128),
new google.maps.LatLng(28.433621,77.146782),
new google.maps.LatLng(28.346733,76.759622),
new google.maps.LatLng(28.384159,77.003906),
new google.maps.LatLng(28.133461,77.339607),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(27.940882,77.351099),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.375457,76.906683),
new google.maps.LatLng(28.311644,76.721687),
new google.maps.LatLng(28.187473,77.094949),
new google.maps.LatLng(28.411504,77.307493),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.621899,77.087838),
new google.maps.LatLng(28.203479,77.204237),
new google.maps.LatLng(28.419889,76.600833),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.373519,76.835337),
new google.maps.LatLng(28.340381,76.802173),
new google.maps.LatLng(28.186338,77.348235),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.237737,77.313776),
new google.maps.LatLng(28.33176,76.646111),
new google.maps.LatLng(28.366975,77.284735),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.233755,77.394165),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.236263,76.929015),
new google.maps.LatLng(28.416413,76.988788),
new google.maps.LatLng(28.451165,76.999587),
new google.maps.LatLng(28.253485,76.650665),
new google.maps.LatLng(28.269601,76.917489),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.407986,76.726437),
new google.maps.LatLng(28.356107,76.899478),
new google.maps.LatLng(28.283677,76.701904),
new google.maps.LatLng(28.488832,77.29594),
new google.maps.LatLng(28.382562,76.770304),
new google.maps.LatLng(28.422273,76.99993),
new google.maps.LatLng(28.434806,77.003215),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.4043,77.374073),
new google.maps.LatLng(28.402186,76.983632),
new google.maps.LatLng(28.315857,77.114718),
new google.maps.LatLng(28.290258,77.170085),
new google.maps.LatLng(28.295192,76.744325),
new google.maps.LatLng(28.190025,77.188775),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.326844,77.177274),
new google.maps.LatLng(28.322667,77.422863),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.379145,76.952063),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.285733,76.785749),
new google.maps.LatLng(28.311479,77.372388),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.354285,76.93982),
new google.maps.LatLng(28.370311,77.471631),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.50931,77.230928),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.35969,77.079922),
new google.maps.LatLng(28.411504,77.307493),
new google.maps.LatLng(28.392129,76.747359),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.243947,76.6918),
new google.maps.LatLng(28.276702,76.968627),
new google.maps.LatLng(28.22261,77.444381),
new google.maps.LatLng(28.331469,76.882185),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.376739,77.325263),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.489369,77.010925),
new google.maps.LatLng(31.381038,76.381092),
new google.maps.LatLng(28.271733,76.740867),
new google.maps.LatLng(28.339459,76.831733),
new google.maps.LatLng(28.411453,76.996733),
new google.maps.LatLng(28.487926,77.099567),
new google.maps.LatLng(28.3547,77.381249),
new google.maps.LatLng(28.465743,77.016863),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.411504,77.307493),
new google.maps.LatLng(28.392967,77.294721),
new google.maps.LatLng(28.392967,77.294721),
new google.maps.LatLng(28.470195,77.288642),
new google.maps.LatLng(28.358597,76.679394),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.138823,77.208427),
new google.maps.LatLng(28.183869,76.988788),
new google.maps.LatLng(28.306473,76.714893),
new google.maps.LatLng(28.507822,77.04413),
new google.maps.LatLng(28.512783,77.036893),
new google.maps.LatLng(28.390824,77.246263),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.26879,77.399905),
new google.maps.LatLng(28.325505,76.778212),
new google.maps.LatLng(30.414604,77.030539),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.458918,77.080443),
new google.maps.LatLng(28.245293,77.29278),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.466231,77.033058),
new google.maps.LatLng(28.296651,77.034138),
new google.maps.LatLng(28.387948,77.065941),
new google.maps.LatLng(28.261583,76.849754),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.171285,77.082348),
new google.maps.LatLng(28.353376,77.09932),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.276258,77.32993),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.476121,77.056881),
new google.maps.LatLng(28.466445,77.329481),
new google.maps.LatLng(28.416569,77.290797),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.275545,77.287924),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.339602,76.716336),
new google.maps.LatLng(28.448996,77.0291),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.263273,76.830291),
new google.maps.LatLng(28.142698,77.395642),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.479422,77.106806),
new google.maps.LatLng(28.367355,76.985908),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.578582,76.909932),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.248699,77.063512),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.49926,77.161368),
new google.maps.LatLng(28.483611,77.315833),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.342466,76.863217),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.211967,76.951204),
new google.maps.LatLng(28.355769,77.030026),
new google.maps.LatLng(28.408912,77.317789),
new google.maps.LatLng(28.351624,77.396597),
new google.maps.LatLng(28.463698,77.333878),
new google.maps.LatLng(28.232753,76.694687),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.459497,77.026638),
new google.maps.LatLng(28.312226,76.817314),
new google.maps.LatLng(28.489369,77.010925),
new google.maps.LatLng(27.985849,77.1879),
new google.maps.LatLng(28.42349,76.913887),
new google.maps.LatLng(28.434821,77.083953),
new google.maps.LatLng(28.50931,77.230928),
new google.maps.LatLng(28.737677,76.995873),
new google.maps.LatLng(28.577798,77.224398),
new google.maps.LatLng(28.513449,77.075484),
new google.maps.LatLng(28.664129,77.089542),
new google.maps.LatLng(28.640446,77.104918),
new google.maps.LatLng(28.635369,77.12166),
new google.maps.LatLng(28.690132,77.173679),
new google.maps.LatLng(28.54717,77.200274),
new google.maps.LatLng(28.565935,77.246903),
new google.maps.LatLng(28.510286,77.281999),
new google.maps.LatLng(28.733622,77.219023),
new google.maps.LatLng(28.611665,76.978678),
new google.maps.LatLng(28.50489,77.253447),
new google.maps.LatLng(28.498691,77.161215),
new google.maps.LatLng(28.599508,77.148235),
new google.maps.LatLng(28.59293,77.12182),
new google.maps.LatLng(28.674965,77.13045),
new google.maps.LatLng(28.6619,77.2846),
new google.maps.LatLng(28.557017,77.276286),
new google.maps.LatLng(28.559131,77.250586),
new google.maps.LatLng(28.53576,77.208543),
new google.maps.LatLng(28.59293,77.12182),
new google.maps.LatLng(28.53509,77.056552),
new google.maps.LatLng(28.700368,77.220757),
new google.maps.LatLng(28.455017,77.183701),
new google.maps.LatLng(28.575714,77.199008),
new google.maps.LatLng(28.837381,77.171819),
new google.maps.LatLng(28.536165,77.197758),
new google.maps.LatLng(28.528555,77.288373),
new google.maps.LatLng(28.697437,77.315629),
new google.maps.LatLng(28.554178,77.251292),
new google.maps.LatLng(28.656128,77.040683),
new google.maps.LatLng(28.493054,77.232384),
new google.maps.LatLng(28.703924,77.070709),
new google.maps.LatLng(28.697627,77.074623),
new google.maps.LatLng(28.702827,77.071197),
new google.maps.LatLng(28.564719,77.200324),
new google.maps.LatLng(28.664344,77.305294),
new google.maps.LatLng(28.604101,77.097616),
new google.maps.LatLng(28.652679,77.131528),
new google.maps.LatLng(28.645512,77.126731),
new google.maps.LatLng(28.636289,77.126243),
new google.maps.LatLng(28.522965,77.20544),
new google.maps.LatLng(28.564726,76.981441),
new google.maps.LatLng(28.549051,77.213814),
new google.maps.LatLng(28.583708,77.207461),
new google.maps.LatLng(28.854332,77.129403),
new google.maps.LatLng(28.555587,77.225559),
new google.maps.LatLng(28.761916,77.139073),
new google.maps.LatLng(28.523371,76.90164),
new google.maps.LatLng(28.649225,77.216216),
new google.maps.LatLng(28.672904,77.146269),
new google.maps.LatLng(28.709152,77.252728),
new google.maps.LatLng(28.670048,77.181856),
new google.maps.LatLng(28.51322,77.109319),
new google.maps.LatLng(28.73242,77.266511),
new google.maps.LatLng(28.712596,77.166328),
new google.maps.LatLng(28.577032,77.078032),
new google.maps.LatLng(28.724155,77.154987),
new google.maps.LatLng(28.695493,77.108996),
new google.maps.LatLng(28.687595,77.097946),
new google.maps.LatLng(28.689266,77.146),
new google.maps.LatLng(28.565935,77.246903),
new google.maps.LatLng(28.564058,77.173697),
new google.maps.LatLng(28.569177,77.167928),
new google.maps.LatLng(28.664946,77.230035),
new google.maps.LatLng(28.564058,77.173697),
new google.maps.LatLng(28.571344,77.170811),
new google.maps.LatLng(28.564058,77.173697),
new google.maps.LatLng(28.564058,77.173697),
new google.maps.LatLng(28.478465,77.128281),
new google.maps.LatLng(28.625596,77.11053),
new google.maps.LatLng(28.564058,77.173697),
new google.maps.LatLng(28.628659,77.320784),
new google.maps.LatLng(28.680107,77.196526),
new google.maps.LatLng(28.688368,77.185181),
new google.maps.LatLng(28.679745,77.092689),
new google.maps.LatLng(28.663104,77.186978),
new google.maps.LatLng(28.696497,77.125048),
new google.maps.LatLng(28.523642,77.222522),
new google.maps.LatLng(28.52784,77.233106),
new google.maps.LatLng(28.659069,77.092779),
new google.maps.LatLng(28.669879,77.106916),
new google.maps.LatLng(28.499396,77.291839),
new google.maps.LatLng(28.751067,77.147868),
new google.maps.LatLng(28.59293,77.12182),
new google.maps.LatLng(28.586935,77.233819),
new google.maps.LatLng(28.556457,77.174577),
new google.maps.LatLng(28.747702,77.251292),
new google.maps.LatLng(28.57099,77.071841),
new google.maps.LatLng(28.730784,77.059526),
new google.maps.LatLng(28.736786,77.104183),
new google.maps.LatLng(28.730795,77.058821),
new google.maps.LatLng(28.716304,77.10321),
new google.maps.LatLng(28.733517,77.133445),
new google.maps.LatLng(28.517806,77.203753),
new google.maps.LatLng(28.720844,77.107121),
new google.maps.LatLng(28.589565,76.977987),
new google.maps.LatLng(28.656841,77.226552),
new google.maps.LatLng(28.685583,77.200993),
new google.maps.LatLng(28.677684,77.205145),
new google.maps.LatLng(28.565785,76.962861),
new google.maps.LatLng(28.704015,77.013264),
new google.maps.LatLng(28.690563,77.133416),
new google.maps.LatLng(28.673248,77.152651),
new google.maps.LatLng(28.651182,77.059325),
new google.maps.LatLng(28.590064,77.088783),
new google.maps.LatLng(28.542109,77.114601),
new google.maps.LatLng(28.54482,77.228301),
new google.maps.LatLng(28.680413,77.185559),
new google.maps.LatLng(28.800838,76.960561),
new google.maps.LatLng(28.684015,77.060585),
new google.maps.LatLng(28.682407,77.064631),
new google.maps.LatLng(28.682407,77.064631),
new google.maps.LatLng(28.776601,76.963003),
new google.maps.LatLng(28.455017,77.183701),
new google.maps.LatLng(28.588363,77.185907),
new google.maps.LatLng(28.624598,77.296001),
new google.maps.LatLng(28.575888,77.243202),
new google.maps.LatLng(28.665879,77.21804),
new google.maps.LatLng(28.744831,77.117674),
new google.maps.LatLng(28.589314,77.236204),
new google.maps.LatLng(28.538848,77.275373),
new google.maps.LatLng(28.716678,77.264141),
new google.maps.LatLng(28.507442,77.300216),
new google.maps.LatLng(28.511485,77.239797),
new google.maps.LatLng(28.586813,77.082176),
new google.maps.LatLng(28.658708,77.216893),
new google.maps.LatLng(28.688592,77.209945),
new google.maps.LatLng(28.655073,77.23372),
new google.maps.LatLng(28.676973,77.224975),
new google.maps.LatLng(28.627477,77.09756),
new google.maps.LatLng(28.666501,77.016371),
new google.maps.LatLng(28.753335,77.00819),
new google.maps.LatLng(28.542804,77.049144),
new google.maps.LatLng(28.649407,77.226324),
new google.maps.LatLng(28.639783,77.008001),
new google.maps.LatLng(28.656442,77.229218),
new google.maps.LatLng(28.716994,77.088103),
new google.maps.LatLng(28.753521,77.194824),
new google.maps.LatLng(28.678583,77.191584),
new google.maps.LatLng(28.671429,77.152844),
new google.maps.LatLng(28.639459,77.104928),
new google.maps.LatLng(28.571529,77.072995),
new google.maps.LatLng(28.529595,76.986468),
new google.maps.LatLng(28.828447,77.093139),
new google.maps.LatLng(28.471758,77.131532),
new google.maps.LatLng(28.737533,77.165891),
new google.maps.LatLng(28.493161,77.302915),
new google.maps.LatLng(28.479735,77.126441),
new google.maps.LatLng(28.675686,77.259634),
new google.maps.LatLng(28.574917,77.141671),
new google.maps.LatLng(28.574057,77.209056),
new google.maps.LatLng(28.588363,77.185907),
new google.maps.LatLng(28.703924,77.070709),
new google.maps.LatLng(28.578231,77.04961),
new google.maps.LatLng(28.805465,77.046301),
new google.maps.LatLng(28.761886,77.063642),
new google.maps.LatLng(28.56268,77.227582),
new google.maps.LatLng(28.844456,77.073715),
new google.maps.LatLng(28.561732,77.242679),
new google.maps.LatLng(28.576217,77.222881),
new google.maps.LatLng(28.516608,77.309083),
new google.maps.LatLng(28.578516,77.21008),
new google.maps.LatLng(28.51322,77.109319),
new google.maps.LatLng(28.603062,77.100533),
new google.maps.LatLng(28.530441,77.250573),
new google.maps.LatLng(28.661078,77.234588),
new google.maps.LatLng(28.511652,77.255967),
new google.maps.LatLng(28.823335,77.173679),
new google.maps.LatLng(28.814193,77.14564),
new google.maps.LatLng(28.559238,77.29331),
new google.maps.LatLng(28.743797,77.150699),
new google.maps.LatLng(28.699448,77.269411),
new google.maps.LatLng(28.822737,76.992679),
new google.maps.LatLng(28.688455,77.17575),
new google.maps.LatLng(28.715345,77.108801),
new google.maps.LatLng(28.697557,77.225067),
new google.maps.LatLng(28.688706,77.147001),
new google.maps.LatLng(28.774838,77.160739),
new google.maps.LatLng(28.716547,77.1704),
new google.maps.LatLng(28.546186,76.990187),
new google.maps.LatLng(28.681329,77.079346),
new google.maps.LatLng(28.619925,77.073217),
new google.maps.LatLng(28.607667,77.016863),
new google.maps.LatLng(28.668724,77.103108),
new google.maps.LatLng(28.623547,76.918015),
new google.maps.LatLng(28.639767,77.122988),
new google.maps.LatLng(28.626026,77.087439),
new google.maps.LatLng(28.62514,77.089752),
new google.maps.LatLng(28.621016,77.092574),
new google.maps.LatLng(28.53742,77.259727),
new google.maps.LatLng(28.613196,77.104243),
new google.maps.LatLng(28.769663,77.115841),
new google.maps.LatLng(28.77806,77.09882),
new google.maps.LatLng(28.555392,77.241907),
new google.maps.LatLng(28.542059,77.176923),
new google.maps.LatLng(28.520905,76.964011),
new google.maps.LatLng(28.683778,76.970928),
new google.maps.LatLng(28.824144,77.133775),
new google.maps.LatLng(28.583287,77.239605),
new google.maps.LatLng(28.469764,77.147146),
new google.maps.LatLng(28.682214,77.160694),
new google.maps.LatLng(28.673136,76.998405),
new google.maps.LatLng(28.57622,77.261668),
new google.maps.LatLng(28.637713,77.049026),
new google.maps.LatLng(28.595015,76.915254),
new google.maps.LatLng(28.803822,76.976992),
new google.maps.LatLng(28.54717,77.200274),
new google.maps.LatLng(28.629134,77.120471),
new google.maps.LatLng(28.623913,77.107166),
new google.maps.LatLng(28.621545,77.10485),
new google.maps.LatLng(28.624598,77.296001),
new google.maps.LatLng(28.576306,76.865269),
new google.maps.LatLng(28.553853,77.295553),
new google.maps.LatLng(28.595988,77.099973),
new google.maps.LatLng(28.501786,77.332617),
new google.maps.LatLng(28.594027,77.17756),
new google.maps.LatLng(28.586813,77.082176),
new google.maps.LatLng(28.834898,77.089878),
new google.maps.LatLng(28.731552,77.031983),
new google.maps.LatLng(28.508966,77.320281),
new google.maps.LatLng(28.734729,77.004176),
new google.maps.LatLng(28.574057,77.209056),
new google.maps.LatLng(28.551403,77.208209),
new google.maps.LatLng(28.58939,77.246512),
new google.maps.LatLng(28.680556,77.203611),
new google.maps.LatLng(28.610225,77.030059),
new google.maps.LatLng(28.603062,77.100533),
new google.maps.LatLng(28.573625,77.255961),
new google.maps.LatLng(28.773544,77.162177),
new google.maps.LatLng(28.515309,77.249855),
new google.maps.LatLng(28.54717,77.200274),
new google.maps.LatLng(28.55721,77.212789),
new google.maps.LatLng(28.749783,76.968627),
new google.maps.LatLng(28.787561,76.974387),
new google.maps.LatLng(28.666515,77.166491),
new google.maps.LatLng(28.536302,76.914092),
new google.maps.LatLng(28.542824,77.239548),
new google.maps.LatLng(28.630374,77.10057),
new google.maps.LatLng(28.660871,77.14745),
new google.maps.LatLng(28.498691,77.161215),
new google.maps.LatLng(28.727686,77.206743),
new google.maps.LatLng(28.59952,77.230786),
new google.maps.LatLng(28.678583,77.191584),
new google.maps.LatLng(28.651935,77.094072),
new google.maps.LatLng(28.638753,77.073803),
new google.maps.LatLng(28.703747,77.187481),
new google.maps.LatLng(28.703747,77.187481),
new google.maps.LatLng(28.724652,77.163492),
new google.maps.LatLng(28.570931,76.905829),
new google.maps.LatLng(28.562097,77.213929),
new google.maps.LatLng(28.498691,77.161215),
new google.maps.LatLng(28.724416,77.217526),
new google.maps.LatLng(28.455017,77.183701),
new google.maps.LatLng(28.80134,77.1024),
new google.maps.LatLng(28.798822,77.179366),
new google.maps.LatLng(28.59407,77.069151),
new google.maps.LatLng(28.636944,77.052848),
new google.maps.LatLng(28.569139,77.278631),
new google.maps.LatLng(28.623417,77.100152),
new google.maps.LatLng(28.659718,77.147223),
new google.maps.LatLng(28.578354,77.264222),
new google.maps.LatLng(28.558346,77.253083),
new google.maps.LatLng(28.592536,76.993827),
new google.maps.LatLng(28.580678,77.059565),
new google.maps.LatLng(28.56164,77.155884),
new google.maps.LatLng(28.56164,77.155884),
new google.maps.LatLng(28.603062,77.100533),
new google.maps.LatLng(28.603062,77.100533),
new google.maps.LatLng(28.558129,77.054827),
new google.maps.LatLng(28.641361,76.984018),
new google.maps.LatLng(28.722497,77.144698),
new google.maps.LatLng(28.691145,77.110931),
new google.maps.LatLng(28.499452,77.209438),
new google.maps.LatLng(28.59293,77.12182),
new google.maps.LatLng(28.570931,76.905829),
new google.maps.LatLng(28.698441,77.186094),
new google.maps.LatLng(28.641098,77.089876),
new google.maps.LatLng(28.640598,77.083827),
new google.maps.LatLng(28.625717,77.081269),
new google.maps.LatLng(28.633888,77.035615),
new google.maps.LatLng(28.614796,76.972227),
new google.maps.LatLng(28.626375,77.098438),
new google.maps.LatLng(28.672424,77.19196),
new google.maps.LatLng(28.562685,76.915328),
new google.maps.LatLng(28.646327,77.168591),
new google.maps.LatLng(28.546858,76.95977),
new google.maps.LatLng(28.694809,76.999587),
new google.maps.LatLng(28.83167,77.048891),
new google.maps.LatLng(28.50207,77.22862),
new google.maps.LatLng(28.609675,77.089542),
new google.maps.LatLng(28.646628,77.025715),
new google.maps.LatLng(28.572003,77.227739),
new google.maps.LatLng(28.683778,76.970928),
new google.maps.LatLng(28.677565,77.162177),
new google.maps.LatLng(28.651189,77.233905),
new google.maps.LatLng(28.59293,77.12182),
new google.maps.LatLng(28.534692,77.260174),
new google.maps.LatLng(28.506237,77.289769),
new google.maps.LatLng(28.647213,77.09242),
new google.maps.LatLng(28.643895,77.11283),
new google.maps.LatLng(28.523862,77.23881),
new google.maps.LatLng(28.523862,77.23881),
new google.maps.LatLng(28.526411,77.234359),
new google.maps.LatLng(28.697667,77.206788),
new google.maps.LatLng(28.648553,77.098894),
new google.maps.LatLng(28.562109,77.002304),
new google.maps.LatLng(28.535291,77.250937),
new google.maps.LatLng(28.702381,77.195103),
new google.maps.LatLng(28.498691,77.161215),
new google.maps.LatLng(28.678583,77.191584),
new google.maps.LatLng(28.715741,77.135145),
new google.maps.LatLng(28.672598,77.147034),
new google.maps.LatLng(28.54717,77.200274),
new google.maps.LatLng(28.574812,77.199129),
new google.maps.LatLng(28.769081,77.04925),
new google.maps.LatLng(28.701985,77.078869),
new google.maps.LatLng(28.7117,77.07796),
new google.maps.LatLng(28.529024,77.280906),
new google.maps.LatLng(28.551765,77.268978),
new google.maps.LatLng(28.659718,77.147223),
new google.maps.LatLng(28.601075,77.089542),
new google.maps.LatLng(28.566234,77.21795),
new google.maps.LatLng(28.567462,77.269133),
new google.maps.LatLng(28.682499,77.030449),
new google.maps.LatLng(28.632142,77.138852),
new google.maps.LatLng(28.630135,77.141975),
new google.maps.LatLng(28.544148,77.115981),
new google.maps.LatLng(28.54843,77.249245),
new google.maps.LatLng(28.563867,77.26081),
new google.maps.LatLng(28.608748,77.109683),
new google.maps.LatLng(28.752218,77.082573),
new google.maps.LatLng(28.648475,77.167144),
new google.maps.LatLng(28.609013,76.985453),
new google.maps.LatLng(28.608204,77.035101),
new google.maps.LatLng(28.551426,77.17909),
new google.maps.LatLng(28.700368,77.220757),
new google.maps.LatLng(28.61102,76.89267),
new google.maps.LatLng(28.84362,77.184961),
new google.maps.LatLng(28.646327,77.168591),
new google.maps.LatLng(28.61197,77.047489),
new google.maps.LatLng(28.605614,76.944141),
new google.maps.LatLng(28.642492,77.132697),
new google.maps.LatLng(28.674562,77.160739),
new google.maps.LatLng(28.498691,77.161215),
new google.maps.LatLng(28.50491,77.31203),
new google.maps.LatLng(28.716151,76.961426),
new google.maps.LatLng(28.716548,77.206383),
new google.maps.LatLng(28.666525,77.187157),
new google.maps.LatLng(28.534333,77.201614),
new google.maps.LatLng(28.629365,77.126691),
new google.maps.LatLng(28.631003,77.122136),
new google.maps.LatLng(28.688546,77.167427),
new google.maps.LatLng(28.512439,77.137011),
new google.maps.LatLng(28.634269,77.084506),
new google.maps.LatLng(28.663564,77.117106),
new google.maps.LatLng(28.667643,77.099973),
new google.maps.LatLng(28.785502,77.093139),
new google.maps.LatLng(28.846251,77.085567),
new google.maps.LatLng(28.624598,77.296001),
new google.maps.LatLng(28.543694,77.239078),
new google.maps.LatLng(28.645,77.103142),
new google.maps.LatLng(28.771557,77.146085),
new google.maps.LatLng(28.808471,77.005346),
new google.maps.LatLng(28.552198,76.900496),
new google.maps.LatLng(28.540495,77.212853),
new google.maps.LatLng(28.482016,77.217073),
new google.maps.LatLng(28.603062,77.100533),
new google.maps.LatLng(28.544874,77.19759),
new google.maps.LatLng(28.53576,77.208543),
new google.maps.LatLng(28.657254,77.148324),
new google.maps.LatLng(28.8222,77.171813),
new google.maps.LatLng(28.713603,77.045652),
new google.maps.LatLng(28.574057,77.209056),
new google.maps.LatLng(28.530882,77.314742),
new google.maps.LatLng(28.709763,77.189156),
new google.maps.LatLng(28.70833,77.185559),
new google.maps.LatLng(28.495684,77.166495),
new google.maps.LatLng(28.582109,77.228301),
new google.maps.LatLng(28.493673,77.277814),
new google.maps.LatLng(28.579051,77.244197),
new google.maps.LatLng(28.700044,77.144954),
new google.maps.LatLng(28.655347,77.105053),
new google.maps.LatLng(28.643608,77.086984),
new google.maps.LatLng(28.695324,77.089902),
new google.maps.LatLng(28.697473,77.089902),
new google.maps.LatLng(28.692526,77.088445),
new google.maps.LatLng(28.702829,77.088687),
new google.maps.LatLng(28.697437,77.315629),
new google.maps.LatLng(28.575273,77.24194),
new google.maps.LatLng(28.770013,76.99712),
new google.maps.LatLng(28.60456,77.128866),
new google.maps.LatLng(28.574812,77.199129),
new google.maps.LatLng(28.570833,77.205777),
new google.maps.LatLng(28.676739,77.208653),
new google.maps.LatLng(28.582634,76.936218),
new google.maps.LatLng(28.850381,77.064721),
new google.maps.LatLng(28.596868,76.971464),
new google.maps.LatLng(28.664721,77.147797),
new google.maps.LatLng(28.610225,77.030059),
new google.maps.LatLng(28.529376,77.214519),
new google.maps.LatLng(28.632743,77.219597)
              ];
            };


            $scope.getEastPoints = function() {
                return [
                    new google.maps.LatLng(22.541388,88.353646),
                    new google.maps.LatLng(22.541424,88.377215),
                    new google.maps.LatLng(22.594351,88.354896),
                    new google.maps.LatLng(22.649547,88.363392),
                    new google.maps.LatLng(22.537489,88.329397),
                    new google.maps.LatLng(22.523746,88.332737),
                    new google.maps.LatLng(22.517985,88.395901),
                    new google.maps.LatLng(22.524847,88.331219),
                    new google.maps.LatLng(22.5507,88.362801),
                    new google.maps.LatLng(22.728346,88.473659),
                    new google.maps.LatLng(22.644401,88.370066),
                    new google.maps.LatLng(22.556528,88.363351),
                    new google.maps.LatLng(22.557542,88.247936),
                    new google.maps.LatLng(22.4833,88.378682),
                    new google.maps.LatLng(22.602609,88.365899),
                    new google.maps.LatLng(22.653641,88.386129),
                    new google.maps.LatLng(22.521803,88.370343),
                    new google.maps.LatLng(22.527905,88.362486),
                    new google.maps.LatLng(22.516028,88.367887),
                    new google.maps.LatLng(22.553151,88.364247),
                    new google.maps.LatLng(22.86033,88.368853),
                    new google.maps.LatLng(22.632235,88.368423),
                    new google.maps.LatLng(22.485295,88.320666),
                    new google.maps.LatLng(22.541662,88.265889),
                    new google.maps.LatLng(22.587917,88.372004),
                    new google.maps.LatLng(22.631276,88.397966),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.49814,88.310838),
                    new google.maps.LatLng(22.566016,88.378059),
                    new google.maps.LatLng(22.610125,88.319014),
                    new google.maps.LatLng(22.604134,88.385271),
                    new google.maps.LatLng(22.580948,88.401121),
                    new google.maps.LatLng(22.635545,88.372279),
                    new google.maps.LatLng(22.533236,88.345936),
                    new google.maps.LatLng(22.588978,88.368772),
                    new google.maps.LatLng(22.52597,88.267392),
                    new google.maps.LatLng(22.48823,88.365664),
                    new google.maps.LatLng(22.649365,88.380509),
                    new google.maps.LatLng(22.520065,88.386888),
                    new google.maps.LatLng(22.566824,88.361476),
                    new google.maps.LatLng(22.51771,88.301498),
                    new google.maps.LatLng(22.499879,88.309725),
                    new google.maps.LatLng(22.515431,88.334941),
                    new google.maps.LatLng(22.577799,88.360374),
                    new google.maps.LatLng(22.540939,88.341334),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.574311,88.361571),
                    new google.maps.LatLng(22.55709,88.352468),
                    new google.maps.LatLng(22.622251,88.372179),
                    new google.maps.LatLng(22.617046,88.371358),
                    new google.maps.LatLng(22.5701,88.34711),
                    new google.maps.LatLng(22.574219,88.345849),
                    new google.maps.LatLng(22.646828,88.367381),
                    new google.maps.LatLng(22.510417,88.371098),
                    new google.maps.LatLng(22.560069,88.352468),
                    new google.maps.LatLng(22.522651,88.361783),
                    new google.maps.LatLng(22.713696,88.49426),
                    new google.maps.LatLng(22.647051,88.431683),
                    new google.maps.LatLng(22.65085,88.419434),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.551816,88.357741),
                    new google.maps.LatLng(22.562687,88.350861),
                    new google.maps.LatLng(22.555573,88.344329),
                    new google.maps.LatLng(22.478887,88.373121),
                    new google.maps.LatLng(22.525685,88.36352),
                    new google.maps.LatLng(22.531944,88.303889),
                    new google.maps.LatLng(22.504342,88.376721),
                    new google.maps.LatLng(22.524671,88.369455),
                    new google.maps.LatLng(22.519511,88.366071),
                    new google.maps.LatLng(22.618961,88.395238),
                    new google.maps.LatLng(22.601808,88.367289),
                    new google.maps.LatLng(22.555295,88.383566),
                    new google.maps.LatLng(22.540631,88.345183),
                    new google.maps.LatLng(22.492778,88.361389),
                    new google.maps.LatLng(22.625534,88.419789),
                    new google.maps.LatLng(22.505583,88.390421),
                    new google.maps.LatLng(22.479414,88.335573),
                    new google.maps.LatLng(22.54873,88.336076),
                    new google.maps.LatLng(22.599654,88.360853),
                    new google.maps.LatLng(22.639415,88.412013),
                    new google.maps.LatLng(22.566558,88.353772),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.566543,88.351729),
                    new google.maps.LatLng(22.574545,88.433354),
                    new google.maps.LatLng(22.490018,88.384626),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.507084,88.378863),
                    new google.maps.LatLng(22.499682,88.371398),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.618001,88.401381),
                    new google.maps.LatLng(22.486647,88.27501),
                    new google.maps.LatLng(22.640128,88.429578),
                    new google.maps.LatLng(22.540015,88.365474),
                    new google.maps.LatLng(22.505818,88.363999),
                    new google.maps.LatLng(22.613169,88.429717),
                    new google.maps.LatLng(22.5855,88.3568),
                    new google.maps.LatLng(22.616217,88.418336),
                    new google.maps.LatLng(22.472866,88.164726),
                    new google.maps.LatLng(22.571365,88.384661),
                    new google.maps.LatLng(22.539479,88.341844),
                    new google.maps.LatLng(22.601533,88.383867),
                    new google.maps.LatLng(22.504111,88.379469),
                    new google.maps.LatLng(22.495895,88.340327),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.583835,88.354527),
                    new google.maps.LatLng(22.516951,88.34587),
                    new google.maps.LatLng(22.500913,88.394934),
                    new google.maps.LatLng(22.570045,88.390173),
                    new google.maps.LatLng(22.611187,88.399785),
                    new google.maps.LatLng(22.639561,88.426303),
                    new google.maps.LatLng(22.578025,88.390217),
                    new google.maps.LatLng(22.517618,88.38405),
                    new google.maps.LatLng(22.483525,88.276515),
                    new google.maps.LatLng(22.630478,88.430393),
                    new google.maps.LatLng(22.516529,88.341055),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.549383,88.338605),
                    new google.maps.LatLng(22.578818,88.426187),
                    new google.maps.LatLng(22.601533,88.383867),
                    new google.maps.LatLng(22.588832,88.390864),
                    new google.maps.LatLng(22.514417,88.322873),
                    new google.maps.LatLng(22.57455,88.363015),
                    new google.maps.LatLng(22.643032,88.419486),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.590362,88.383867),
                    new google.maps.LatLng(22.508223,88.353302),
                    new google.maps.LatLng(22.515358,88.35004),
                    new google.maps.LatLng(22.571985,88.352468),
                    new google.maps.LatLng(22.528573,88.352813),
                    new google.maps.LatLng(22.591108,88.387578),
                    new google.maps.LatLng(22.550069,88.369066),
                    new google.maps.LatLng(22.547306,88.350217),
                    new google.maps.LatLng(22.568014,88.501391),
                    new google.maps.LatLng(22.500246,88.298857),
                    new google.maps.LatLng(22.632163,88.422898),
                    new google.maps.LatLng(22.585,88.375),
                    new google.maps.LatLng(22.538467,88.3259),
                    new google.maps.LatLng(22.55171,88.352481),
                    new google.maps.LatLng(22.528652,88.319903),
                    new google.maps.LatLng(22.62321,88.410697),
                    new google.maps.LatLng(22.492357,88.408649),
                    new google.maps.LatLng(22.491244,88.383039),
                    new google.maps.LatLng(22.621792,88.417971),
                    new google.maps.LatLng(22.473095,88.368853),
                    new google.maps.LatLng(22.577486,88.380986),
                    new google.maps.LatLng(22.533205,88.329164),
                    new google.maps.LatLng(22.636301,88.379166),
                    new google.maps.LatLng(22.480163,88.354797),
                    new google.maps.LatLng(22.508971,88.332977),
                    new google.maps.LatLng(22.560078,88.350795),
                    new google.maps.LatLng(22.569813,88.342768),
                    new google.maps.LatLng(22.63985,88.394094),
                    new google.maps.LatLng(22.614156,88.386864),
                    new google.maps.LatLng(22.50591,88.319517),
                    new google.maps.LatLng(22.549858,88.279896),
                    new google.maps.LatLng(22.613223,88.380498),
                    new google.maps.LatLng(22.616909,88.402769),
                    new google.maps.LatLng(22.463637,88.391296),
                    new google.maps.LatLng(22.537886,88.368246),
                    new google.maps.LatLng(22.547843,88.359322),
                    new google.maps.LatLng(22.506248,88.30184),
                    new google.maps.LatLng(22.579413,88.372925),
                    new google.maps.LatLng(22.47508,88.303279),
                    new google.maps.LatLng(22.477231,88.336076),
                    new google.maps.LatLng(22.58848,88.356422),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.479551,88.381289),
                    new google.maps.LatLng(22.575823,88.352545),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.568083,88.354143),
                    new google.maps.LatLng(22.627559,88.398573),
                    new google.maps.LatLng(22.603455,88.378253),
                    new google.maps.LatLng(22.413861,88.433359),
                    new google.maps.LatLng(22.571167,88.351038),
                    new google.maps.LatLng(22.532265,88.257677),
                    new google.maps.LatLng(22.532265,88.257677),
                    new google.maps.LatLng(22.573639,88.351903),
                    new google.maps.LatLng(22.481719,88.370163),
                    new google.maps.LatLng(22.560601,88.351744),
                    new google.maps.LatLng(22.576935,88.368833),
                    new google.maps.LatLng(22.551823,88.275922),
                    new google.maps.LatLng(22.553274,88.272274),
                    new google.maps.LatLng(22.578185,88.390115),
                    new google.maps.LatLng(22.455226,88.383146),
                    new google.maps.LatLng(22.518673,88.359497),
                    new google.maps.LatLng(22.486712,88.368441),
                    new google.maps.LatLng(22.487436,88.35494),
                    new google.maps.LatLng(22.522438,88.362651),
                    new google.maps.LatLng(22.500017,88.345259),
                    new google.maps.LatLng(22.551624,88.350612),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.514533,88.342148),
                    new google.maps.LatLng(22.52,88.17),
                    new google.maps.LatLng(22.587125,88.37674),
                    new google.maps.LatLng(22.566005,88.379927),
                    new google.maps.LatLng(22.563343,88.36601),
                    new google.maps.LatLng(22.491244,88.383039),
                    new google.maps.LatLng(22.489687,88.389477),
                    new google.maps.LatLng(22.528532,88.352827),
                    new google.maps.LatLng(22.482632,88.28261),
                    new google.maps.LatLng(22.626577,88.37492),
                    new google.maps.LatLng(22.555131,88.379773),
                    new google.maps.LatLng(22.567725,88.3731),
                    new google.maps.LatLng(22.497259,88.328182),
                    new google.maps.LatLng(22.614051,88.39412),
                    new google.maps.LatLng(22.544743,88.364006),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.584048,88.367033),
                    new google.maps.LatLng(22.624582,88.387664),
                    new google.maps.LatLng(22.49289,88.337898),
                    new google.maps.LatLng(22.48158,88.346897),
                    new google.maps.LatLng(22.567549,88.353578),
                    new google.maps.LatLng(22.748929,88.383407),
                    new google.maps.LatLng(22.624582,88.387664),
                    new google.maps.LatLng(22.51294,88.351052),
                    new google.maps.LatLng(22.573671,88.345558),
                    new google.maps.LatLng(22.754135,88.439341),
                    new google.maps.LatLng(22.567241,88.399179),
                    new google.maps.LatLng(22.699538,88.372793),
                    new google.maps.LatLng(22.699538,88.372793),
                    new google.maps.LatLng(22.60982,88.386153),
                    new google.maps.LatLng(22.561227,88.358272),
                    new google.maps.LatLng(22.557717,88.386659),
                    new google.maps.LatLng(22.516536,88.303356),
                    new google.maps.LatLng(22.572646,88.363895),
                    new google.maps.LatLng(22.570711,88.34861),
                    new google.maps.LatLng(22.461627,88.306165),
                    new google.maps.LatLng(22.575186,88.356058),
                    new google.maps.LatLng(22.498636,88.345391),
                    new google.maps.LatLng(22.567957,88.345812),
                    new google.maps.LatLng(22.601533,88.383867),
                    new google.maps.LatLng(22.594817,88.386859),
                    new google.maps.LatLng(22.579589,88.357531),
                    new google.maps.LatLng(22.49923,88.375526),
                    new google.maps.LatLng(22.619567,88.351734),
                    new google.maps.LatLng(22.565965,88.346398),
                    new google.maps.LatLng(22.545163,88.323166),
                    new google.maps.LatLng(22.575124,88.349965),
                    new google.maps.LatLng(22.568649,88.3576),
                    new google.maps.LatLng(22.572646,88.363895),
                  ];
                };

});
