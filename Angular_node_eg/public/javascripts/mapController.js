angular.module('angularjs_with_Nodejs').controller('mapController', function ($scope, $timeout, $filter, $http) {
    var CSS_COLOR_NAMES = ["BlueViolet", "Darkorange", "DeepPink", "Cyan", "Gold", "LawnGreen", "DarkKhaki", "AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "Brown",
        "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "DarkBlue", "DarkCyan", "DarkGoldenRod",
        "DarkGray", "DarkGrey", "DarkGreen", "DarkMagenta", "DarkOliveGreen", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen",
        "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick",
        "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink",
        "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
    var colours = {
        "cyan": "00ffff",
        "aliceblue": "f0f8ff",
        "forestgreen": "228b22",
        "magenta": "ff00ff",
        "darkorange": "ff8c00",
        "violet": "ee82ee",
        "darkkhaki": "bdb76b",
        "deeppink": "ff1493",
        "azure": "f0ffff",
        "beige": "f5f5dc",
        "bisque": "ffe4c4",
        "blanchedalmond": "ffebcd",
        "blue": "0000ff",
        "blueviolet": "8a2be2",
        "burlywood": "deb887",
        "cadetblue": "5f9ea0",
        "chartreuse": "7fff00",
        "chocolate": "d2691e",
        "coral": "ff7f50",
        "cornflowerblue": "6495ed",
        "cornsilk": "fff8dc",
        "crimson": "dc143c",
        "aqua": "00ffff",
        "darkblue": "00008b",
        "darkcyan": "008b8b",
        "darkgoldenrod": "b8860b",
        "darkgray": "a9a9a9",
        "darkgreen": "006400",
        "aquamarine": "7fffd4",
        "darkmagenta": "8b008b",
        "darkolivegreen": "556b2f",
        "darkorchid": "9932cc",
        "darkred": "8b0000",
        "darksalmon": "e9967a",
        "darkseagreen": "8fbc8f",
        "darkslateblue": "483d8b",
        "darkslategray": "2f4f4f",
        "darkturquoise": "00ced1",
        "darkviolet": "9400d3",
        "deepskyblue": "00bfff",
        "dimgray": "696969",
        "dodgerblue": "1e90ff",
        "firebrick": "b22222",
        "floralwhite": "fffaf0",
        "fuchsia": "ff00ff",
        "gainsboro": "dcdcdc",
        "ghostwhite": "f8f8ff",
        "gold": "ffd700",
        "goldenrod": "daa520",
        "gray": "808080",
        "green": "008000",
        "greenyellow": "adff2f",
        "honeydew": "f0fff0",
        "hotpink": "ff69b4",
        "indianred ": "cd5c5c",
        "indigo": "4b0082",
        "ivory": "fffff0",
        "khaki": "f0e68c",
        "lavender": "e6e6fa",
        "lavenderblush": "fff0f5",
        "lawngreen": "7cfc00",
        "lemonchiffon": "fffacd",
        "lightblue": "add8e6",
        "lightcoral": "f08080",
        "lightcyan": "e0ffff",
        "lightgoldenrodyellow": "fafad2",
        "lightgrey": "d3d3d3",
        "lightgreen": "90ee90",
        "lightpink": "ffb6c1",
        "lightsalmon": "ffa07a",
        "lightseagreen": "20b2aa",
        "lightskyblue": "87cefa",
        "lightslategray": "778899",
        "lightsteelblue": "b0c4de",
        "lightyellow": "ffffe0",
        "lime": "00ff00",
        "limegreen": "32cd32",
        "linen": "faf0e6",
        "maroon": "800000",
        "mediumaquamarine": "66cdaa",
        "mediumblue": "0000cd",
        "mediumorchid": "ba55d3",
        "mediumpurple": "9370d8",
        "mediumseagreen": "3cb371",
        "mediumslateblue": "7b68ee",
        "mediumspringgreen": "00fa9a",
        "mediumturquoise": "48d1cc",
        "mediumvioletred": "c71585",
        "midnightblue": "191970",
        "mintcream": "f5fffa",
        "mistyrose": "ffe4e1",
        "moccasin": "ffe4b5",
        "navajowhite": "ffdead",
        "navy": "000080",
        "oldlace": "fdf5e6",
        "olive": "808000",
        "olivedrab": "6b8e23",
        "orange": "ffa500",
        "orangered": "ff4500",
        "orchid": "da70d6",
        "palegoldenrod": "eee8aa",
        "palegreen": "98fb98",
        "paleturquoise": "afeeee",
        "palevioletred": "d87093",
        "papayawhip": "ffefd5",
        "peachpuff": "ffdab9",
        "peru": "cd853f",
        "pink": "ffc0cb",
        "plum": "dda0dd",
        "powderblue": "b0e0e6",
        "purple": "800080",
        "rebeccapurple": "663399",
        "red": "ff0000",
        "rosybrown": "bc8f8f",
        "royalblue": "4169e1",
        "saddlebrown": "8b4513",
        "salmon": "fa8072",
        "sandybrown": "f4a460",
        "seagreen": "2e8b57",
        "seashell": "fff5ee",
        "sienna": "a0522d",
        "silver": "c0c0c0",
        "skyblue": "87ceeb",
        "slateblue": "6a5acd",
        "slategray": "708090",
        "snow": "fffafa",
        "springgreen": "00ff7f",
        "steelblue": "4682b4",
        "tan": "d2b48c",
        "teal": "008080",
        "thistle": "d8bfd8",
        "tomato": "ff6347",
        "turquoise": "40e0d0",
        "wheat": "f5deb3",
        "white": "ffffff",
        "whitesmoke": "f5f5f5",
        "yellow": "ffff00",
        "yellowgreen": "9acd32",
        "antiquewhite": "faebd7",
        "black": "000000"
    };

    $scope.loading = false;
    $scope.locationGodrej = {
        "from": null,
        "to": null
    };


    var apiKey = 'AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo';
    var drawingManager;
    var placeIdArray = [];
    var polylines = [];
    var snappedCoordinates = [];

    $scope.geo = {};
    $scope.geo.addressesToGetGeolocations = "";
    $scope.geo.geolocatedAddresses = [];

    $scope.weightagePOI = [];
    $scope.establishments = ['night_club','cafe','restaurant','bar'];
    $scope.establishmentsResult = [];

    $scope.TotalWeightage = 0;
    $scope.categorizedWeightage = {};


    $scope.routeSearch = {
        'searchRouteBy': "",
        "showRoute": "",
        "routeTitle": "",
        "riderName": "",
        "showDirectionPanel": false,
        "showSearchRouteCombo": false
    };
    $scope.routeSearchKeywords = "";
    $scope.routeSearchKeywords1 = "qubix";
    $scope.searchRouteBy = "";
    $scope.showNavigationSaveConfirmation = false;


    $scope.routeSelected = {};
    $scope.routeSelected.routeWaypoints = [];
    $scope.routeSelected.selectedrouteWaypoints = [];
    $scope.selectedrouteWaypoints = [];

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


    $scope.establishmentsData = {
        'selectedStates': [],
        'selectedZipcodes': [],
        'selectedTalukas': [],
        'selectedDistricts': [],
        'selectedCity': [],
        'states': [],
        'talukas': [],
        'districts': [],
        'zipCodes': [],
        'allCities': ['Delhi',
            'Mumbai',
            'Kolkata',
            'Chennai',
            'Hyderabad',
            'Bangalore','Pune','Solapur']
    };
    $scope.addresses = [
        {"lat": 22.4846, "lng": 88.13232, status: "0"}//,
//        {"lat":23.11254, "lng":85.61646},
//        {"lat":23.858459,"lng":84.356532},
//        {"lat":23.4846, "lng":88.13232}
    ];

    $scope.zipCodesToShow = [
        {"zipCode": ""}
    ];


    $scope.wayPoints = [
        {'origin': {}, 'destination': {}}
    ];

    $scope.wayPointsNav = [
        {
            'origin': {}, 'destination': {},
            'originName': {}, 'destinationName': {}
        }
    ];

    $scope.wayPointsPOI = [
        {
            'location': {},
            'locationName': {},
            'POI': ""
        }
    ];

    $scope.zipCodesData = null;
    var geoCodes = {};

    $scope.title = "Dashboard";
    $scope.logoFileName = "images/VLCC.png";
    $scope.showPersonAnalysis = false;
    var map;
    var myLatLng, arrMarkers = [], arrUserMarkers = [], arrUserMarkersGodrej = [], arrInfowindows = [], arrInfowindowsAssetTrackingMarkers = [];
    var trafficLayer;
    $scope.filter = {
        "filterFields": [],
        "filterCategories": [],
        "selectedCategory": "",
        "categoryData": []
    };

    $scope.IsVisible = false;
    $scope.ShowHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = $scope.IsVisible ? false : true;
    }
    $scope.divHide = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.IsVisible = false;
    }
    $scope.whichOverlayToShow = "filter1";
//    $scope.filterFields = [];
//    $scope.filterCategories = [];"
//    $scope.categoryData = [];
    var wareHouses, selectedCategory, objMarkersFilterQuery = {};
    var arrdirectionsDisplay = [];
    var arrPolylines = [];
    var arrdirectionsService = [];//= new google.maps.DirectionsService();
    var flgShowAllMarkers = true;
    $scope.showDialog = false;
    var arrLatLongTruck = [];
    var arrLatLongBike = [];

    var k = 0;

    function setMapStyle(styleType) {
        var stylez = [];
        switch (styleType) {
            case 'default':
                stylez = [];
                break;
            case 'businessGeography':
                stylez
                    = [
                    {
                        featureType: "all",
                        elementType: "all",
                        stylers: [
                            {
                                color: "#ffffff"} // <-- THIS
                        ]
                    },

                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d1c6c6"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#d1c6c6"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#b8cad2"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ];
                break;


        }
        var mapType = new google.maps.StyledMapType(stylez, { name: "Grayscale" });
        map.mapTypes.set('applyThisStyle', mapType);
        map.setMapTypeId('applyThisStyle');
    }

    /**
     * To initaliza the map
     */
    $scope.initMap = function () {
        myLatLng = new google.maps.LatLng(18.580085, -73.738125);

        // Empty content string
        var tableContent = '';
        directionsDisplay = new google.maps.DirectionsRenderer();

        var mapOpts = {
            center: myLatLng,
            zoom: 5,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'applyThisStyle']
            }
        };
        map = new google.maps.Map(document.getElementById('mymap'), mapOpts);

        trafficLayer = new google.maps.TrafficLayer();

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
                map.setCenter(new google.maps.LatLng(28.7041, 77.1025));
            });
        }

//
        google.maps.event.addListener(map, 'click', function (event) {
            if ($scope.whichOverlayToShow == 'zipCodes') {
                var polygon = $scope.zipCodesData[0].geometry.coordinates;
                isPointInPoly([ event.latLng.lat(), event.latLng.lng() ], polygon); // true
            }
            if ($scope.whichOverlayToShow == 'filter1') {
                flgShowAllMarkers = false;
                $scope.placeMarkesrs(null);
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
                arrMarkers.push(marker);
                objMarkersFilterQuery = {};
                $scope.placeNearestLocations(latitude, longitude);
            }
        });

        // Enables the polyline drawing control. Click on the map to start drawing a
        // polyline. Each click will add a new vertice. Double-click to stop drawing.
//        drawingManager = new google.maps.drawing.DrawingManager({
//            drawingMode: google.maps.drawing.OverlayType.POLYLINE,
//            drawingControl: true,
//            drawingControlOptions: {
//                position: google.maps.ControlPosition.TOP_CENTER,
//                drawingModes: [
//                    google.maps.drawing.OverlayType.POLYLINE
//                ]
//            },
//            polylineOptions: {
//                strokeColor: '#696969',
//                strokeWeight: 2
//            }
//        });
//        drawingManager.setMap(map);

        // Snap-to-road when the polyline is completed.
//        drawingManager.addListener('polylinecomplete', function(poly) {
//            var path = poly.getPath();
//            polylines.push(poly);
//            placeIdArray = [];
//            runSnapToRoad(path);
//        });


        // NOTE: This uses cross-domain XHR, and may not work on older browsers.
//        map.data.loadGeoJson('mapdata/districtCensus/uttarakhand_district.json');
//                'https://storage.googleapis.com/mapsdevsite/json/google.json');


//        map.data.loadGeoJson('images/gj.geojson.json');
//        map.data.loadGeoJson('images/ka.geojson.json');

//        map.data.setStyle({
////            fillColor: 'green',
//            strokeWeight: 1
//        });
        $scope.getTemplates();
    };

    /**
     * To get all templates of metadata to be shown on map or to use in filter
     */
    $scope.getTemplates = function () {
        $scope.calulateMapDistancebyArrayLatLng();
        flgShowAllMarkers = true;
        // jQuery AJAX call for JSON
        $.getJSON('/templates', function (data) {
            $scope.filter.filterCategories = data;
            $scope.$apply();
            console.log($scope.filter.filterCategories);
            $scope.showMarkersforAllCategories();
        });


        // parse a pbf file from disk in Node
//        var pbf = new Pbf(fs.readFileSync('data.pbf'));
//        pbf.readFields(function (tag) {
//            if (tag === 1) pbf.readVarint();
//            else if (tag === 2) pbf.readString();
//            else var numbers = pbf.readPackedVarint();
//        })

//        var parser = new OSMParser();
//
//        parser.on('node', function(data) {
//            console.log(data);
//        });
//
//        parser.on('way', function(data) {
//            console.log(data);
//        });
//
//        parser.on('relation', function(data) {
//            console.log(data);
//        });
//
//        parser.on('error', function(err) {
//            console.error(err);
//        });
//
//        parser.on('end', function(err) {
//            console.log('done!');
//        });
//
//        parser.filterNode = function(node, callback) {
//            if (node.tags['place']) callback(null, node);
//            else callback(null, null);
//        }
//
//        parser.filterWay = function(way, callback) {
//            callback(null, null);
//        }
//
//        parser.filterRelation = function(relation, callback) {
//            if (node.tags['water']) callback(null, node);
//            else callback(null, null);
//        }
//
//        parser.parse('/images/pbf/india-latest.osm (1).pbf');
    };

    /**
     * Show all markers on load or on All category select
     */
    $scope.showMarkersforAllCategories = function () {
        $scope.placeMarkesrs(null);
        flgShowAllMarkers = true;
        for (i = 0; i < $scope.filter.filterCategories.length; i++) {
            $.getJSON('/getData', {"docType": $scope.filter.filterCategories[i]}, function (data) {
                $scope.placeMarkesrs(data);
            });
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
        if (flgShowAllMarkers == false) {
            if ($scope.whichOverlayToShow != "routeOptimization") {
                for (i = 0; i < arrUserMarkersGodrej.length; i++) {
                    arrUserMarkersGodrej[i].setMap(null);
                }
                arrUserMarkersGodrej = [];
            }
            for (i = 0; i < arrMarkers.length; i++) {
                arrMarkers[i].setMap(null);
            }
            arrMarkers = [];
            for (i = 0; i < arrInfowindows.length; i++) {
                arrInfowindows[i].close();
            }
            arrInfowindows = [];
            for (i = 0; i < arrInfowindowsAssetTrackingMarkers.length; i++) {
                arrInfowindowsAssetTrackingMarkers[i].close();
            }
            arrInfowindowsAssetTrackingMarkers = [];
            if (arrdirectionsDisplay != null) {
                for (i = 0; i < arrdirectionsDisplay.length; i++) {
                    arrdirectionsDisplay[i].setMap(null);
                    arrdirectionsDisplay[i] = null;
                }
                arrdirectionsDisplay = [];
            }

            if (map) {
                if (map.data) {
                    map.data.forEach(function (feature) {
                        // If you want, check here for some constraints.
                        map.data.remove(feature);
                    });
                }
            }
        }
        if (data != null) {
            var markerImage = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            $.each(data, function (index, item) {
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
                        '<label>Manager Name - ' + this['Manager Name'] + '</label> <br>' +
                        '<label>City -  ' + this['City'] + '</label> <br>' +
                        '<label>State -  ' + this['State'] + '</label> <br>' +
                        '<label>Capacity Utilization - ' + this['Capacity Utilization'] + '</label> <br>' +
                        '<label>Area (SQ FT) - ' + this['Area'] + '</label> <br>' +
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
                        '<label>FY 15-16 MT - ' + this['FY15-16MT'] + '</label> <br>' +
                        '<label>Type  - ' + this['Type'] + '</label> <br>' +
                        '<label>State -  ' + this['State'] + '</label> <br>' +
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
                        '<label>State -  ' + this['State'] + '</label> <br>' +
                        '<label>Net Profit - ' + this['Net Profit'] + '</label> <br>' +
                        '<label>Total Assets - ' + this['Total Assets'] + '</label> <br>' +
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
                        '<label>Manager Name - ' + this['Manager Name'] + '</label> <br>' +
                        '<label>Sales Rep  - ' + this['Sales Rep First Name'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
                        '<label>Average Monthly Billing -  ' + this['Average Monthly Billing'] + ' ' + this['Sales Rep Last Name'] + '</label> <br>' +
                        '<label>City -  ' + this['City'] + '</label> <br>' +
                        '<label>State -  ' + this['State'] + '</label> <br>' +
                        '</p></big>' +
                        '</div>' +
                        '</div>'
                } else if (this.docType == 'Top Perforrming Sales Executives') {
                    markerImage = this['Ranking'] >= 8 ? 'images/icon/user_red.png' : this['Ranking'] >= 5 ? 'images/icon/user_blue.png' : 'images/icon/user_green.png';
//                    console.log(this['Latitude']+','+this['Longitude']);
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
                } else if (this.docType == 'Distributors') {
                    infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + this['Manager Name'] + '</h1>' +
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
                        '<h1 id="firstHeading" class="firstHeading">' + this['Manager Name'] + '</h1>' +
                        '<div id="bodyContent" class="infowindow_warehouse">' +
                        '<big> <p>' +

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


//        marker = new google.maps.Marker({
//            position: myLatLng, map: map,
//            icon: 'http://maps.google.com/mapfiles/ms/icons/pink-pushpin.png'
//        });
//        marker.setMap(map);
//        marker = new google.maps.Marker({
//            position: myLatLng, map: map,
//            icon: 'http://maps.google.com/mapfiles/ms/icons/orange-pushpin.png'
//        });
//        marker.setMap(map);
    };

    /**
     * Load filter fields and its select options
     */
    $scope.loadFilter = function (selectedCategory) {
        flgShowAllMarkers = false;
        console.log($scope.filter.selectedCategory);
        if (selectedCategory == 'all' || selectedCategory == 'All') {
            $scope.filter.filterFields = [];
            $scope.showMarkersforAllCategories();
        }
        else {
            $.getJSON('/templatesFields', {'docType': selectedCategory}, function (data) {
                $scope.filter.filterFields = data[0].fields;
                console.log($scope.filterFields);
                console.log(selectedCategory);
                objMarkersFilterQuery = {};
                objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
                objMarkersFilterQuery['docType'] = selectedCategory;
                $scope.getData(selectedCategory);
            });
        }
    };

    $scope.getData = function (dbName) {
        if (dbName == 'all' || dbName == 'All') {
            $scope.filter.filterFields = [];
            $scope.showMarkersforAllCategories();
        }
        else {
            $.getJSON('/getData', {"docType": dbName}, function (data) {
                $scope.filter.categoryData = data;
//                $.each($scope.filter.filterFields, function (a, b) {
//                    var unique = $scope.filter.categoryData.filter((set => f => !set.has(f[b.key]) && set.add(f[b.key]))(new Set));
//                    console.log(unique);
//                });

                $scope.$apply();
                $scope.placeMarkesrs(data);
            });
        }
    };

    $scope.filterMarkerData = function (templateCategory, keyName, value) {
        flgShowAllMarkers = false;

        objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
        objMarkersFilterQuery['docType'] = templateCategory;

        delete objMarkersFilterQuery['$and'];
        delete objMarkersFilterQuery['Latitude1'];
        delete objMarkersFilterQuery['Latitude'];
        delete objMarkersFilterQuery['Longitude1'];
        delete objMarkersFilterQuery['Longitude'];
        var value1 = angular.copy(value);
        if (value == "" || value == undefined) {
            delete objMarkersFilterQuery[keyName];
            if (Object.keys(objMarkersFilterQuery).length > 2) {
                angular.forEach(Object.keys(objMarkersFilterQuery), function (item) {
                    if (["dbToSearchFor", "docType"].indexOf(item) == -1) {
                        keyName = item;
                        value = objMarkersFilterQuery[keyName]['$in'] ? objMarkersFilterQuery[keyName]['$in'] : objMarkersFilterQuery[keyName];
                    }
                });
            }
        }
        else {
            if (angular.isArray(value)) {

                for (var m = 0; m < value1.length; m++) {
                    value1[m] = value1[m].replace(/\n/g, '').trim()
                }
                objMarkersFilterQuery[keyName] = { '$in': value1};
            }
            else {
                objMarkersFilterQuery[keyName] = value;
            }
        }


        $.getJSON('/filter', objMarkersFilterQuery, function (data) {
            $scope.placeMarkesrs(data, true, value1, keyName);
            if (templateCategory == 'Top Perforrming Sales Executives') {
                $scope.top20 = 0;
                $scope.middle2080 = 0;
                $scope.bottom20 = 0;
//                markerImage = this['Ranking'] >= 8 ? 'images/icon/user_red.png' : this['Ranking'] >= 5 ? 'images/icon/user_blue.png' : 'images/icon/user_green.png';

                angular.forEach(data, function (item, index) {
                    if (item.Ranking < 5) {
                        $scope.top20++;
                    }
                    else if (item.Ranking >= 5 && item.Ranking < 8) {
                        $scope.middle2080++;
                    }
                    else {
                        $scope.bottom20++;
                    }
                });
                $scope.salesPersonData = data;
                $scope.$apply();

            }
        }, function () {
            $scope.placeMarkesrs(null);
        });

    };

    $scope.placeNearestLocations = function (latitude, longitude) {
        flgShowAllMarkers = true;
        objMarkersFilterQuery['dbToSearchFor'] = 'metadata';// templateCategory;
        if ($scope.filter.selectedCategory != "" && $scope.filter.selectedCategory != undefined) {
            objMarkersFilterQuery = {"docType": $scope.filter.selectedCategory,
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

            var assetOriginDestDetails = [];
            angular.forEach(data, function (item, index) {
                assetOriginDestDetails.push({"destination": {"Latitude": item.Latitude, "Longitude": item.Longitude}, "origin": {"Latitude": latitude, "Longitude": longitude}})
            });


            calcRoute(assetOriginDestDetails, true, false);
//            calcRoute(data, latitude, longitude, true, false);

        }, function () {
            $scope.placeMarkesrs(null);
        });
    };
    $scope.showFilters = function (filterName) {
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
        map.setZoom(5);
        trafficLayer.setMap(null);
        map.setCenter(myLatLng);

        flgShowAllMarkers = false;
        $scope.placeMarkesrs(null);
//        setMapStyle('default');

        if (filterName == "filter1") {
            $scope.title = "Dashboard";
            $scope.showPersonAnalysis = false;
            flgShowAllMarkers = true;
            $scope.showMarkersforAllCategories();
        }
        else if (filterName == "salesPerson") {
            $scope.title = "Sales Tracking";
            // alert("hi all" + filterName);
            //$("#salerPersonPics").show();
            $scope.filter.selectedCategory = "Top Perforrming Sales Executives";
            $scope.showPersonAnalysis = false;
            flgShowAllMarkers = false;
            $scope.getData('Top Perforrming Sales Executives');
            $scope.placeMarkesrs();

        }
        else if (filterName == "navigation") {
            $scope.title = "Route Navigation";
            $scope.getRoutes();
        }
        else {
            if (filterName == "assetTracking") {
                $scope.title = "Asset Tracking";
                $scope.placeMarkesrs(null);
            }
            else if (filterName == "reports") {
                $scope.title = "Reports";
                $scope.placeMarkesrs(null);
            }
            else if (filterName == "wayPoints") {
                $scope.title = "Way Points";
                $scope.placeMarkesrs(null);
            }
            else if (filterName == "zipCodes") {
                $scope.title = "Business Geography";
                $scope.placeMarkesrs(null);
//                setMapStyle('businessGeography');
            }
            else if (filterName == "routeOptimization") {
                $scope.title = "Route Optimization";
                godrejLocations();
            }
            else if (filterName == "navigation") {
                $scope.title = "Route Navigation";
            }
            else if (filterName == "geolocations") {
                $scope.title = "Geolocations";
            }
            else if (filterName == "reverseGeocode") {
                $scope.title = "Reverse Geocode";
                load_all_India_States_Shape_FileData();
            }
            flgShowAllMarkers = false;
            $scope.showPersonAnalysis = false;
            $scope.placeMarkesrs(null);
        }
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
//        k = -1;
    };
    $scope.assetTracking = function () {
        flgShowAllMarkers = false;
        $scope.placeMarkesrs(null);


//        k = arrLatLongTruck.length - 1;
        k = 0;
        var assetOriginDestDetails = [
            {"destination": {"Latitude": 26.8467, "Longitude": 80.9462}, "origin": {"Latitude": 22.58608, "Longitude": 88.37402}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Ankush Jain </h6><br>' + '<h7> Vehicle# -  MH 12 JX 1634 </h7><br>' + '<h7> Mobile# -  9673990425 </h7><br>' + '<h7> Goods Type -  Food Product </h7><br>' + '<h7> Speed -  40 km/h </h7><br>' + '<h7> Battery -  67% </h7><br>' + '</div>'},
            {"destination": {"Latitude": 21.1702, "Longitude": 72.8311}, "origin": {"Latitude": 21.1458, "Longitude": 79.0882}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akhilesh Aggarwal </h6><br>' + '<h7> Vehicle# -  MH 12 BQ 5454 </h7><br>' + '<h7> Mobile# -  8551089000 </h7><br>' + '<h7> Goods Type -  Electronics Items </h7><br>' + '<h7> Speed -  50 km/h </h7><br>' + '<h7> Battery -  43% </h7><br>' + '</div>'},
            {"destination": {"Latitude": 24.5854, "Longitude": 73.7125}, "origin": {"Latitude": 28.7041, "Longitude": 77.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Abhishek Jha </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Cement </h7><br>' + '<h7> Speed -  30 km/h </h7><br>' + '<h7> Battery -  87% </h7><br>' + '</div>'},
            {"destination": {"Latitude": 24.5854, "Longitude": 74.7125}, "origin": {"Latitude": 26.7041, "Longitude": 80.1025}, "markerContent": '<div id="content"  class="infowindow_warehouse">' + '<div id="siteNotice">' + '<h6 >Driver Name - Akash Joshi </h6><br>' + '<h7> Vehicle# -  DL 2C AS 2935 </h7><br>' + '<h7> Mobile# -  7838757968 </h7><br>' + '<h7> Goods Type -  Furniture </h7><br>' + '<h7> Speed -  65 km/h </h7><br>' + '<h7> Battery -  10% </h7><br>' + '</div>'}
        ];
        calcRoute(assetOriginDestDetails, false, true);


    };

    function godrejLocations() {
        //        Show different markers . 3 red + 3 green
//        user will click any 2 to get From and To locations, show route, distnace, time taken
        var redLocations = [
            {"lat": 17.893305, "lng": 73.995474, "address": "Satara,Maharashtra"},
            {"lat": 13.375257, "lng": 77.568529, "address": "Bangalore Rural, Karnataka"},
            {"lat": 15.309332, "lng": 75.237023, "address": "Dharwad, Karnataka"},
            {"lat": 9.943584, "lng": 76.388548, "address": "Ernakulam,Kerala"}
//            {"lat": 26.8467, "lng": 80.9462, "address":""}
        ];
        var greenLocations = [
            {"lat": 12.043287, "lng": 79.011515, "address": "Villupuram,Tamil Nadu"},
            {"lat": 17.438795, "lng": 75.073924, "address": "Solapur,Maharashtra"},
            {"lat": 13.967824, "lng": 78.320157, "address": "Anantapuram,Andhra Pradesh"},
            {"lat": 9.491820, "lng": 77.670352, "address": "Virudhunagar,Tamil Nadu"}
//            {"lat": 26.8467, "lng": 80.9462, "address":""},
//            {"lat": 26.8467, "lng": 80.9462, "address":""}
        ];
        var markerRed;
        for (var l = 0; l < greenLocations.length; l++) {
            var locationLatLngRed = new google.maps.LatLng(parseFloat(redLocations[l].lat), parseFloat(redLocations[l].lng));
            var FromTo = l % 2 == 0 ? "From" : "To";
            markerRed = new google.maps.Marker({
                position: locationLatLngRed, map: map,
                icon: 'images/icon/redMarker.png'
            });
            markerRed.setMap(map);
            arrUserMarkersGodrej.push(markerRed);


            markerRed.addListener('click', function (e, locationLatLngRed) {
                var m = this;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': this.position }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var infoWindowRed = new google.maps.InfoWindow({
                                content: results[1].formatted_address
                            });
//                            for (var i = 0; i < arrInfowindows.length; i++) {
//                                arrInfowindows[i].close();
//                            }
//                            arrInfowindows = [];
                            infoWindowRed.open(map, m);
//                            arrInfowindows.push(infoWindowRed);
                        }
                    }
                });
                if ($scope.locationGodrej.from == null && $scope.locationGodrej.to == null)
                    $scope.locationGodrej.from = new google.maps.LatLng(parseFloat(this.position.lat()), parseFloat(this.position.lng()));
                else if ($scope.locationGodrej.from != null && $scope.locationGodrej.to != null) {
                    $scope.locationGodrej.from = new google.maps.LatLng(parseFloat(this.position.lat()), parseFloat(this.position.lng()));
                    $scope.locationGodrej.to = null;
                }
                else {
                    $scope.locationGodrej.to = new google.maps.LatLng(parseFloat(this.position.lat()), parseFloat(this.position.lng()));
                    var start = $scope.locationGodrej.from;
                    var end = $scope.locationGodrej.to;
                    var infowindow2 = new google.maps.InfoWindow();
                    var request = {
                        origin: start,
                        destination: end,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    var directionsService1 = new google.maps.DirectionsService();

                    directionsService1.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            var directionsDisplay1 = new google.maps.DirectionsRenderer(
                                {
                                    suppressMarkers: true
                                }
                            );
                            directionsDisplay1.setMap(map);
                            directionsDisplay1.setOptions({ preserveViewport: true });
                            directionsDisplay1.setDirections(response);
                            arrdirectionsDisplay.push(directionsDisplay1);
                            infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                            var index = parseInt(response.routes[0].overview_path.length / 2);
                            var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());

                            infowindow2.setPosition(infoposition ? infoposition : end);
                            infowindow2.open(map);
                            arrInfowindows.push(infowindow2);
                        }
                    });
                }

//
            });
//            arrUserMarkers.push(markerRed);

            var locationLatLngGreen = new google.maps.LatLng(greenLocations[l].lat, greenLocations[l].lng);
            var markerGreen = new google.maps.Marker({
                position: locationLatLngGreen, map: map,
                icon: 'images/icon/greenMarker.png'
            });
            markerGreen.setMap(map);
            arrUserMarkersGodrej.push(markerGreen);


            markerGreen.addListener('click', function () {
                var m = this;
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': this.position }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var infoWindowGreen = new google.maps.InfoWindow({
                                content: results[1].formatted_address
                            });
//                            for (i = 0; i < arrInfowindows.length; i++) {
//                                arrInfowindows[i].close();
//                            }
//                            arrInfowindows = [];
                            infoWindowGreen.open(map, m);
//                            arrInfowindows.push(infoWindowGreen);
                        }
                    }
                });


                if ($scope.locationGodrej.from == null && $scope.locationGodrej.to == null)
                    $scope.locationGodrej.from = this.position;
                else if ($scope.locationGodrej.from != null && $scope.locationGodrej.to != null) {
                    $scope.locationGodrej.from = this.position;
                    $scope.locationGodrej.to = null;
                }
                else {
                    $scope.locationGodrej.to = new google.maps.LatLng(parseFloat(this.position.lat()), parseFloat(this.position.lng()));

                    var start = $scope.locationGodrej.from;
                    var end = $scope.locationGodrej.to;
                    var infowindow2 = new google.maps.InfoWindow();
                    var request = {
                        origin: start,
                        destination: end,
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    var directionsService1 = new google.maps.DirectionsService();

                    directionsService1.route(request, function (response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            var directionsDisplay1 = new google.maps.DirectionsRenderer(
                                {
                                    suppressMarkers: true
                                }
                            );
                            directionsDisplay1.setMap(map);
                            directionsDisplay1.setOptions({ preserveViewport: true });
                            directionsDisplay1.setDirections(response);
                            arrdirectionsDisplay.push(directionsDisplay1);
                            infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                            var index = parseInt(response.routes[0].overview_path.length / 2);
                            var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());

                            infowindow2.setPosition(infoposition ? infoposition : end);
                            infowindow2.open(map);
                            arrInfowindows.push(infowindow2);
                        }
                    });
                }
//                for (i = 0; i < arrInfowindows.length; i++) {
//                    arrInfowindows[i].close();
//                }
//                arrInfowindows = [];
//                infoWindowGreen.open(map, markerGreen);
//                arrInfowindows.push(infoWindowGreen);
            });
//            arrUserMarkers.push(markerGreen);
        }
//        flgShowAllMarkers = true;
//        $scope.placeMarkesrs(arrMarkers);
    }

    function calcRoute(assetOriginDestDetails, supressMarkers, isAssetTracking) {
        flgShowAllMarkers = false;
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
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
                if (status == google.maps.DirectionsStatus.OK) {
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
                    arrInfowindows.push(infowindow2);
                    if (isAssetTracking) {
                        var markerTruck = new google.maps.Marker({position: start, map: map, icon: 'images/icon/truck3.png'});
                        markerTruck.setMap(map);
                        markerTruck.addListener('click', function () {
//                            for (i = 0; i < arrInfowindows.length; i++) {
//                                arrInfowindows[i].close();
//                            }
//                            arrInfowindows = [];
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

//                        if (index == assetOriginDestDetails.length -1 ) {
//                        removing it from asset traking , moving to route optimization
//                        as per Pravin's request
//                        godrejLocations();
//                        }

                    }
                    else if ($scope.whichOverlayToShow == "wayPoints") {
                        checkWaypointsExist();
//                        showWaypoints(arrLatLongTruck);
                    }
                }
            });


        });


    };
    $scope.moveTruck = function (map, markerTruck, markerIndex, latLngindex, countDotMarker) {
//        console.log(markerTruck.position);
        setTimeout(function () {
            if (countDotMarker == 3 && $scope.whichOverlayToShow == 'assetTracking') {
                countDotMarker = 0;

                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': markerTruck.position }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var markerDot = new google.maps.Marker({position: markerTruck.position, map: map, icon: 'images/marker-dot.png'});

                            markerDot.setMap(map);
                            markerDot.setPosition(markerTruck.position);
                            markerDot.addListener('click', function () {
                                for (i = 0; i < arrInfowindowsAssetTrackingMarkers.length; i++) {
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
                });
            }
            else {
                countDotMarker++;
            }
            markerTruck.setPosition(new google.maps.LatLng(arrLatLongTruck[markerIndex][latLngindex].lat(), arrLatLongTruck[markerIndex][latLngindex].lng()));
            latLngindex++;

            if (latLngindex <= arrLatLongTruck[markerIndex].length) {
//            if (k >= 0) {
                $scope.moveTruck(map, markerTruck, markerIndex, latLngindex, countDotMarker);
            }
//            k++;
        }, 3000)
    };

    $scope.showReport = function (showToUser, fileName, heading) {
//        $("#dialog").dialog({width: 800, height: 500});
        $scope.showDialog = showToUser;
        $scope.report_dialog_head = heading;
        if (showToUser)
//        $scope.$apply();
//            $("#frame").attr("src", "images/Report - VW.pdf");
            $("#frame").attr("src", "images/" + fileName);
    };

    $scope.showModal = function (showToUser, img) {
        $scope.showPersonAnalysis = showToUser;
        $scope.salePersonImage = img;
    };

    $scope.listWaypoints = function () {
        flgShowAllMarkers = false;
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = "";
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        $scope.placeMarkesrs(null);

        var start = new google.maps.LatLng($scope.wayPoints[0].origin.Latitude, $scope.wayPoints[0].origin.Longitude);
        var end = new google.maps.LatLng($scope.wayPoints[0].destination.Latitude, $scope.wayPoints[0].destination.Longitude);

        var directionsService = new google.maps.DirectionsService();
        directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
//                directionsDisplay.setDirections(response);
//                var route = response.routes[0];
//                var summaryPanel = document.getElementById('directions-panel');
//                summaryPanel.innerHTML = '';

                showWaypoints(response.routes[0].overview_path);
//                // For each route, display summary information.
//                for (var i = 0; i < route.legs.length; i++) {
//                    var routeSegment = i + 1;
//                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
//                        '</b><br>';
//                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
//                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
//                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
//                }
            } else {
//                window.alert('Directions request failed due to ' + status);
            }
        });
    }

    $scope.findWaypoints = function () {

//        $scope.routeSelected.selectedrouteWaypoints = [];
//        for (var i = 0; i < $scope.selectedrouteWaypoints.length; i++) {
//            if ($scope.selectedrouteWaypoints[i].selected) {
//                $scope.routeSelected.selectedrouteWaypoints.push({
//                    location: $scope.routeSelected.selectedrouteWaypoints[i].value,
//                    stopover: true
//                });
//            }
//        }
        calcRoute($scope.wayPoints, false, false);


    };
    /**
     * reset route displayed on end point selection change
     */

    $scope.resetRouting = function () {
        flgShowAllMarkers = false;
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        $scope.placeMarkesrs(null);
    };

    $scope.optimizeRoute = function () {
        flgShowAllMarkers = false;
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        $scope.placeMarkesrs(null);
        map.setZoom(6);
        map.setCenter({lat: 19.864011, lng: 75.396782});
        var waypts = [];
        var checkboxArray = document.getElementById('waypoints');
        $scope.routeSelected.selectedrouteWaypoints = [];
        for (var i = 0; i < checkboxArray.length; i++) {
            if (checkboxArray.options[i].selected) {
                waypts.push({
                    location: checkboxArray[i].value,
                    stopover: true
                });
            }
        }
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        directionsDisplay.setMap(map);


//        trafficLayer.setMap(map);

        directionsService.route({
            origin: document.getElementById('start').value,
            destination: document.getElementById('end').value,
            waypoints: waypts,
            optimizeWaypoints: true,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
                arrdirectionsDisplay.push(directionsDisplay);
                var route = response.routes[0];
                var summaryPanel = document.getElementById('directions-panel');
                summaryPanel.innerHTML = '';
                // For each route, display summary information.
                for (var i = 0; i < route.legs.length; i++) {
                    var routeSegment = i + 1;
                    summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                        '</b><br>';
                    summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
                    summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
                    summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
                }
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };

    function codeLatLng(latlng, callback) {  ///<<-------CHANGE HERE
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'latLng': latlng}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {

                    callback(results[0].formatted_address);   ///<<-------CHANGE HERE
                    //return results[0].formatted_address;   ///<<------- CAN'T DO THIS..
                } else {
//                    alert('No results found');
                }
            } else {
//                alert('Geocoder failed due to: ' + status);
            }
        });
    }

    function showWaypoints(routeLatLngs) {
        var modVal = 10;
//        for (var k = 0; k < routeLatLngs.length; k++)
//        {
        modVal = parseInt(routeLatLngs.length / 10);
        console.log(routeLatLngs.length + " , " + modVal);
        for (var i = 0; i < routeLatLngs.length; i++) {
            if (i % modVal == 0) {
                console.log(i);
                codeLatLng(routeLatLngs[i], function (address) {   ///<<-------CHANGE HERE
                    $scope.routeSelected.routeWaypoints.push(address);
                    $scope.$apply();
                });
            }
        }

//        }

    }

    /**
     * check if given lat long exists on route found
     */
    function checkWaypointsExist() {
        var latLng, latLngForArray, flgFound;
        angular.forEach($scope.addresses, function (item, index) {
            if (index < $scope.addresses.length - 1) {
                flgFound = false;
                angular.forEach(arrLatLongTruck[0], function (latlngItem, latLngIndex) {
                    var addrLat = parseFloat(item.lat);
                    var addrLng = parseFloat(item.lng);
                    var routeLat = parseFloat(latlngItem.lat());
                    var routeLng = parseFloat(latlngItem.lng());
//                    if (index == 1)
//                        console.log(routeLat, ",", routeLng);

                    if (addrLat && addrLng && routeLat && routeLng) {
                        try {
                            if (addrLat.toFixed(4) == routeLat.toFixed(4) && addrLng.toFixed(4) == routeLng.toFixed(4)) {
//                            console.log('found');
                                latLng = new google.maps.LatLng(addrLat, addrLng),
                                    latLngForArray = [addrLat, addrLng];
                                var marker = new google.maps.Marker({
                                    position: latLng, map: map,
                                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                                });
                                marker.setMap(map);
                                flgFound = true;
//                            $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?location='+latLng+'&sensor=false', null, function (data) {
//                                var p = data.results[0].geometry.location;
//                                var latlng = new google.maps.LatLng(p.lat, p.lng);
//                                new google.maps.Marker({
//                                    position: latLng,
//                                    map: map,
//                                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                                });
//
//                            });
//                            if (geoCodes[latLng] == null){
//                                var geocoder = new google.maps.Geocoder();
//                                // Get LatLng information by name
//                                geocoder.geocode({
////                                address: formatted_address,
//                                    location: latLng
//                                }, function (results, status) {
//                                    if (status === 'OK') {
//                                        for (var i = 0; i < results.length; i++) {
//                                            console.log(results[i].types + " - " + results[i].formatted_address);
//                                        }
//                                        geoCodes[latLng] = {'formatted_address':results[1].formatted_address};
//                                        if (results[1]) {
////                                        map.setZoom(11);
//                                            var marker = new google.maps.Marker({
//                                                position: latLng, map: map,
//                                                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                                            });
//                                            marker.setMap(map);
//
//                                            var infoWindow = new google.maps.InfoWindow({
//                                                content: results[1].formatted_address
//                                            });
//                                            marker.addListener('click', function () {
//                                                for (i = 0; i < arrInfowindows.length; i++) {
//                                                    arrInfowindows[i].close();
//                                                }
//                                                arrInfowindows = [];
//                                                infoWindow.open(map, marker);
//                                                arrInfowindows.push(infoWindow);
//                                            });
//                                            arrMarkers.push(marker);
//
//                                        } else {
//                                            console.log('No results found');
//                                        }
//                                    } else {
//                                        console.log('Geocoder failed due to: ' + status);
//                                    }
//
//
//
//
//                                });
//                            }
//                            else {
//                                var marker = new google.maps.Marker({
//                                    position: latLng,
//                                    map: map,
//                                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                                });
//                                marker.setMap(map);
//
//                                var infoWindow = new google.maps.InfoWindow({
//                                    content: geoCodes[latLng].formatted_address
//                                });
//                                marker.addListener('click', function () {
//                                    for (i = 0; i < arrInfowindows.length; i++) {
//                                        arrInfowindows[i].close();
//                                    }
//                                    arrInfowindows = [];
//                                    infoWindow.open(map, marker);
//                                    arrInfowindows.push(infoWindow);
//                                });
//                                arrMarkers.push(marker);
//                            }

                            }
                            else {

                            }
                        }
                        catch (err) {
//                        console.log("error - " + err.message + " - " + index + " - " + addrLat + " - " + addrLng)
                        }
                    }

                });
                if (flgFound == true) {
                    item.status = 1;
                }
                else
                    item.status = 0;
            }
        });

    }

    $scope.listDistrictNames = function () {
        $.getJSON('/stateNames', {}, function (data) {
            $scope.statesData.states = data;
            $scope.$apply();
            $scope.statesData.selectedStates = data[0];
        });
    };
    $scope.listStateData = function (selectedStates) {
        if (selectedStates != null && selectedStates != undefined && selectedStates != "") {
            var query = {
                'properties.STATE': selectedStates.trim()
            };
            $.getJSON('/stateData', query, function (data) {
                $scope.statesData.zipCodes = data.zipCodes;
                $scope.statesData.talukas = data.talukas;
                $scope.statesData.districts = data.districts;
                $scope.$apply();
            });
        }
    };

    $scope.resetOtherData = function (selectedCategory) {
        $scope.selectedFilterCategory = selectedCategory;
//        switch (selectedCategory) {
//            case 'zipcode':
//                $scope.statesData.selectedTalukas = [];
//                $scope.statesData.selectedDistricts = [];
//                break;
//            case 'taluka':
//                $scope.statesData.selectedDistricts = [];
//                $scope.statesData.selectedZipcodes = [];
//                break;
//            case 'district':
//                $scope.statesData.selectedTalukas = [];
//                $scope.statesData.selectedZipcodes = [];
//                break;
//
//        }
    };

    $scope.placeZipcodesBoundries = function () {
        var mapDataToload = {"type": "FeatureCollection", "features": []};
        var value1 = "";
        var query = {};
        var queryMetadata = {};
        var queryParam = "";
        var queryParamMetadata = "";

        switch ($scope.selectedFilterCategory) {
            case 'zipcode':
                value1 = angular.copy($scope.statesData.selectedZipcodes);
                for (var m = 0; m < value1.length; m++) {
                    value1[m] = parseInt(value1[m])
                }
                queryParam = "properties.PINCODE";
                queryParamMetadata = "PINCODE";
                break;
            case 'taluka':
                value1 = angular.copy($scope.statesData.selectedTalukas);
                queryParam = "properties.SUB_DISTRICT";
                queryParamMetadata = "SUB_DISTRICT";
                break;
            case 'district':
                value1 = angular.copy($scope.statesData.selectedDistricts);
                queryParam = "properties.DISTRICT";
                queryParamMetadata = "DISTRICT";
                break;

        }
        if (angular.isArray(value1)) {
            for (var m = 0; m < value1.length; m++) {
                if (typeof(value1[m]) == "string")
                    value1[m] = value1[m].replace(/\n/g, '').trim();
            }
            query[queryParam] = { '$in': value1};
            queryMetadata[queryParamMetadata] = { '$in': value1};
        }
        else {
            query[queryParam] = value1.trim();
            queryMetadata[queryParamMetadata] = value1.trim();
        }
        $scope.placeMarkesrs(null);
        $.getJSON('/zipcodBoundries', query, function (data) {
            $scope.zipCodesData = data.shapeFile;


            angular.forEach($scope.zipCodesData, function (item, index) {
                if (index == 0) {
                    var geocoder = new google.maps.Geocoder();
                    var addressToSearch = "";
                    if (item.properties.NAME != undefined && item.properties.NAME != null)
                        addressToSearch = addressToSearch + item.properties.NAME
                    if (item.properties.DISTRICT != undefined && item.properties.DISTRICT != null)
                        addressToSearch = addressToSearch + item.properties.DISTRICT
                    if (item.properties.PINCODE != undefined && item.properties.PINCODE != null)
                        addressToSearch = addressToSearch + item.properties.PINCODE
                    // Get LatLng information by name
                    if (addressToSearch != "") {
                        geocoder.geocode({
                            address: addressToSearch
//                                    location: item.properties.PINCODE
                        }, function (results, status) {
                            if (status === 'OK') {
                                map.setCenter(results[0].geometry.location);
                            }
                        });
                    }
                }
                mapDataToload['features'].push(item);
            });
            loadMapShapePolygonJSON(mapDataToload)


        }, function (error) {

        });

        $.getJSON('/zipcodMetadata', queryMetadata, function (data) {
            $scope.placeMarkesrs(data.metaData);
        }, function (error) {

        });
    };

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

    var places = [];

    /**
     * function will log places on console
     * @param places
     * @param fileName
     */
    function writePlaces(places, fileName) {
//        angular.forEach(places, function (place, index) {
//            try
//            {
//                console.log(place.name + " : " + place.formatted_address + " : " + place.geometry.location.lat + " : " + place.geometry.location.lng);
//            }
//            catch (err) {
//                        console.log("error - " + err.message + " - " + index )
//            }
//
////            var txtFile = new File(fileName+ '.json');
////            var txtFile = new File([""], "/tmp/"+fileName + ".json", {type: "text/plain"});
////            txtFile.open("w"); // open file with write access
////            txtFile.writeln(place);
////            txtFile.close();
//
////            var txtFile1 = new File(fileName + '.txt');
////            txtFile1.writeln(place);
////            txtFile1.close();
//        });
    }

    function addPlaces(data) {
        angular.forEach(data, function (item, index) {
            places.push(item)
        });
    }

    $scope.placeType1 = "bus";
    $scope.placeName = "kadappa";
    $scope.findPlaces = function () {
//        https://maps.googleapis.com/maps/api/place/textsearch/xml?query=jalgaon&key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo
        var arrplaces = [$scope.placeName];
//        var searchPlacesTypes = ['bus','government office','railway', 'hospital', 'restaurant'];
        var searchPlacesTypes = [$scope.placeType1];
        var counter = 1;
        var next_page_token = false, next_page_tokenval = "";
        var queryToSend = {};

        var proceed;

        for (var l = 0; l < arrplaces.length; l++) {
            for (var j = 0; j < searchPlacesTypes.length; j++) {
                var fileName = arrplaces[l] + '_' + searchPlacesTypes[j] + '_' + counter;
                queryToSend = {
                    'query': arrplaces[l] + " " + searchPlacesTypes[j],
                    'key': 'AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo'
                };
                $.getJSON('/searchText', queryToSend, function (data) {
                    console.log(data);
                    addPlaces(data.results);
                    if (data.next_page_token) {
                        next_page_token = true;
                        next_page_tokenval = data.next_page_token;
                        queryToSend = {
                            'next_page_token': next_page_tokenval
                        };
                        setTimeout(function () {
                            $.getJSON('/searchText', queryToSend, function (data) {
                                console.log(data);
                                places.push(data.results);
                                if (data.next_page_token) {
                                    next_page_token = true;
                                    next_page_tokenval = data.next_page_token;
                                    queryToSend = {
                                        'next_page_token': next_page_tokenval
                                    };
                                    setTimeout(function () {
                                        $.getJSON('/searchText', queryToSend, function (data) {
                                            console.log(data);
                                            places.push(data.results);
                                            if (data.next_page_token) {
                                                next_page_token = true;
                                                next_page_tokenval = data.next_page_token;
                                            }
                                            else {
                                                next_page_token = false;
                                                writePlaces(places, fileName);
                                            }


                                        }, function (error) {
                                            console.log(error);
                                        });
                                    }, 1500);
                                }

                                else {
                                    next_page_token = false;
                                    writePlaces(places, fileName);
                                }


                            }, function (error) {
                                console.log(error);
                            });
                        }, 1500);


                    }
                    else {
                        next_page_token = false;
                        writePlaces(places, fileName);
                    }


//                    while (next_page_token && proceed) {
//
//                    }
                }, function (error) {
                    console.log(error);
                });


            }
        }
//        for (var i = 0; i < arrplaces.length; i++) {
//            for (var j = 0; j < searchPlacesTypes.length; j++) {
//                $http.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + arrplaces[i] + ' ' + searchPlacesTypes[j] + '&key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo')
//                    .then(function(response) {
////                        $scope.myWelcome = response.data;
////                    });
////                $.getJSON('https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + arrplaces[i] + ' ' + searchPlacesTypes[j] + '&key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo',  function (data) {
//                    counter = 1;
//                    if (data.status == 'OK') {
//                        angular.forEach(data.results, function (place, index) {
//                            console.log(place.name + " : " + place.formatted_address + " : " + place.geometry.location.lat + " : " + place.geometry.location.lng);
//                            var txtFile = new File(arrplaces[i] + '_' + searchPlacesTypes[j] + '_' + counter + '.json');
//                            txtFile.writeln(place);
//                            txtFile.close();
//
//                            var txtFile1 = new File(arrplaces[i] + '_' + searchPlacesTypes[j] + '_' + counter + '.txt');
//                            txtFile1.writeln(place);
//                            txtFile1.close();
//                        });
//                        if (data.next_page_token)
//                            next_page_token = true;
//
//                        else
//                            next_page_token= false;
//
//                        while (next_page_token) {
//                            counter++;
//                            $.getJSON('https://maps.googleapis.com/maps/api/place/textsearch/json?pagetoken=' + data.next_page_token + 'query=' + arrplaces[i] + ' ' + searchPlacesTypes[j] + '&key=AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo',  function (data) {
//                                counter = 1;
//                                if (data.status == 'OK') {
//                                    angular.forEach(data.results, function (place, index) {
//                                        console.log(place.name + " : " + place.formatted_address + " : " + place.geometry.location.lat() + " : " + place.geometry.location.lng());
//                                        var txtFile = new File(arrplaces[i] + '_' + searchPlacesTypes[j] + '_' + counter + '.json');
//                                        txtFile.writeln(place);
//                                        txtFile.close();
//
//                                        var txtFile1 = new File(arrplaces[i] + '_' + searchPlacesTypes[j] + '_' + counter + '.txt');
//                                        txtFile1.writeln(place);
//                                        txtFile1.close();
//                                    });
//                                    if (data.next_page_token)
//                                        next_page_token = true;
//
//                                    else
//                                        next_page_token= false;
//                                }
//                            }, function (error) {
//
//                            });
//                        }
//                    }
//                }, function (error) {
//
//                });
//            }
//        }

    };
    var markerBike;

    /**
     * display route and distance from user location to selected store
     * @param start
     * @param end
     */
    $scope.showDirections = function () {
        $scope.placeMarkesrs(null);
        $scope.routeSearch.showSearchRouteCombo = false;
        $scope.routeSearch.searchRouteBy = "";
        routeTakenBreadcrums = [];
        routeDetails = {};

        var start = new google.maps.LatLng($scope.wayPointsNav[0].origin.Latitude, $scope.wayPointsNav[0].origin.Longitude);
        var end = new google.maps.LatLng($scope.wayPointsNav[0].destination.Latitude, $scope.wayPointsNav[0].destination.Longitude);
        var directionsDisplay, directionsService;
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();

        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        if (arrPolylines != null) {
            for (i = 0; i < arrPolylines.length; i++) {
                arrPolylines[i].setMap(null);
                arrPolylines[i] = null;
            }
            arrPolylines = [];
        }


        var infowindow2 = new google.maps.InfoWindow();
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };


        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {

                directionsDisplay.setMap(map);
                directionsDisplay.setOptions({ preserveViewport: true });
                directionsDisplay.setDirections(response);
                arrdirectionsDisplay.push(directionsDisplay);
                $scope.routeSearch.showDirectionPanel = true;
                directionsDisplay.setPanel(document.getElementById('right-panel'));

//                $scope.directionsPanel.showList = true;
                $scope.$apply();

                arrLatLongBike = response.routes[0].overview_path;
                routeDetails = response.routes[0];

                infowindow2.setContent(response.routes[0].legs[0].distance.text + "<br>" + response.routes[0].legs[0].duration.text + " ");
                if (response.routes) {
                    if (response.routes[0].overview_path) {
                        var index = parseInt(response.routes[0].overview_path.length / 2);
                        var infoposition = new google.maps.LatLng(response.routes[0].overview_path[index].lat(), response.routes[0].overview_path[index].lng());
                    }
                }
                infowindow2.setPosition(infoposition ? infoposition : end);
                infowindow2.open(map);
                arrInfowindows.push(infowindow2);

                map.setZoom(8);
                map.setCenter({lat: response.routes[0].overview_path[0].lat(), lng: response.routes[0].overview_path[0].lng()});
//                console.log('lat: ' + response.routes[0].overview_path[0].lat() + 'lng: ' + response.routes[0].overview_path[0].lng());
//                console.log('lat: ' + response.routes[0].overview_path[response.routes[0].overview_path.length - 1].lat() + 'lng: ' + response.routes[0].overview_path[response.routes[0].overview_path.length - 1].lng());
//                var bounds = new google.maps.LatLngBounds();
//                for (var i = 0; i < routeDetails.overview_polyline.getPath().getLength(); i++) {
//                    bounds.extend(routeDetails.overview_polyline.getPath().getAt(i));
//                }
//                map.fitBounds(bounds);

                markerBike = new google.maps.Marker({position: start, map: map, icon: 'images/map_marker_animated_orange.gif', optimized: false});
                markerBike.setMap(map);
                markerBike.addListener('click', function () {
//                            for (i = 0; i < arrInfowindows.length; i++) {
//                                arrInfowindows[i].close();
//                            }
//                            arrInfowindows = [];
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
                    infoWindow.open(map, markerBike);
                    arrInfowindows.push(infoWindow);
                });
                arrMarkers.push(markerBike);
                routeTakenBreadcrums = [];

                countPOI = 0;
                arrPOI = [];
                clearTimeout(callPlacesapi);
                clearTimeout(callPlacesapi);
                getAllPointOfInterests();
//                moveBiker(map, markerBike, 0, 0);


            }
        });
    };

    $scope.startBikerNavigation = function () {
        moveBiker(map, markerBike, 0, 0);
    };

    var routeTakenBreadcrums = [];
    var callPlacesapi, resultPlacesapi;
    var routeDetails = {};
    var countPOI = 0;
    var arrPOI = [];
    var arrPOISelected = [];

    function getAllPointOfInterests() {
        for (var l = 0; l < arrLatLongBike.length; l += 30) {
//        var l = 0, interval = 1;
//            (function (ind) {
//            callPlacesapi = setTimeout(function () {
//                if ((ind < arrLatLongBike.length) && (ind % 5 == 0)) {
            var service = new google.maps.places.PlacesService(map);
            service.textSearch({
                location: arrLatLongBike[l],
                radius: 500,
                type: ['restaurant']
//                query:' jalgaon'

            }, callbackForAllPOI);
//                    l += 5;
//                }
//                else {
//                    clearTimeout(callPlacesapi);
//                }
////                interval += 1;
//            }, 1000); // With each iteration, the delay increases
//            })(l);
        }
    }


    function callbackForAllPOI(results, status, next_page_token) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
//                    for (var i = 0; i <= 10; i++) {
//                (function (ind) {
//                    setTimeout(function () {
                var place = results[i];
//                        console.log(place.name + " : " + place.vicinity + " : " + place.geometry.location.lat() + " : " + place.geometry.location.lng());
//                        console.log(place.name + " : " + place.formatted_address + " : " + place.geometry.location.lat + " : " + place.geometry.location.lng);
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location,
                    icon: "images/icon/restaurant.png"
                });
                arrMarkers.push(marker);

                google.maps.event.addListener(marker, 'click', function () {
                    arrPOISelected.push(this);
                    for (i = 0; i < arrInfowindows.length; i++) {
                        arrInfowindows[i].close();
                    }
                    this.setIcon('images/icon/hotspring.png');
                    arrInfowindows = [];
                    var infowindow = new google.maps.InfoWindow();
                    infowindow.setContent(place.name);
                    infowindow.open(map, this);
                    arrInfowindows.push(infowindow);
                });

                arrPOI.push(place);
//                    }, 500);
//                })(i);
            }
//                }
        }
    }

    function checkPOIinRange(bikePosition) {
        for (i = 0; i < arrPOISelected.length; i++) {
            var marker = arrPOISelected[i];
//            var targetLat = marker.getPosition().lat();
//            var targetLng = marker.getPosition().lng();
//
//            var targetLoc = new google.maps.LatLng(targetLat, targetLng);

//        var center= new GLatLng(centerLat, centerLng);

            var distanceInkm = google.maps.geometry.spherical.computeDistanceBetween(bikePosition, marker.getPosition()) / 1000;
            var distanceInmeters = google.maps.geometry.spherical.computeDistanceBetween(bikePosition, marker.getPosition());

            if (distanceInmeters < 500) {
// To add the marker to the map, call setMap();
                marker.setAnimation(google.maps.Animation.BOUNCE);
//                marker.setIcon('images/icon/graphics-food-burger_round.gif')
            }
            else {
//                marker.setIcon('images/icon/restaurant.png')
                marker.setAnimation(null);
            }
        }
    }

    /**
     *
     * @param map
     * @param markerBike
     * @param latLngindex
     * @param countDotMarker
     * $param routes
     */
    function moveBiker(map, markerBike, latLngindex, countDotMarker) {
        setTimeout(function () {
            if ($scope.whichOverlayToShow == 'navigation') {
                countDotMarker = 0;
                routeTakenBreadcrums.push({"latitude": arrLatLongBike[latLngindex].lat(), "longitude": arrLatLongBike[latLngindex].lng()});
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': markerBike.position }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var markerDot = new google.maps.Marker({position: markerBike.position, map: map, icon: 'images/marker-dot.png'});

                            markerDot.setMap(map);
                            markerDot.setPosition(markerBike.position);
                            markerDot.addListener('click', function () {
                                for (i = 0; i < arrInfowindowsAssetTrackingMarkers.length; i++) {
                                    arrInfowindowsAssetTrackingMarkers[i].close();
                                }
                                arrInfowindowsAssetTrackingMarkers = [];

                                var infoWindowContent = '<div id="content"  class="infowindow_warehouse">' +
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
                            });
                            arrMarkers.push(markerDot);


                            if (countPOI > 5) {
//                                getPointOfInterests(markerBike.position);
                                checkPOIinRange(markerBike.position);
                                countPOI = 0;
                            }
                            else {
                                countPOI++;
                            }

                        }
                    }
                });
            }
            else {
                countDotMarker++;
            }
            markerBike.setPosition(new google.maps.LatLng(arrLatLongBike[latLngindex].lat(), arrLatLongBike[latLngindex].lng()));
            latLngindex++;

            if (latLngindex < arrLatLongBike.length) {
//            if (k >= 0) {
                moveBiker(map, markerBike, latLngindex, countDotMarker);
            }
            else {
                clearTimeout(callPlacesapi);
                clearTimeout(callPlacesapi);
                $scope.showNavigationSaveConfirmation = true;
                $scope.$apply();
//                $scope.saveRoute($scope.wayPointsNav[0].originName, $scope.wayPointsNav[0].destinationName, "trialRoute", "PAllavi",routes );
            }
//            k++;
        }, 500)
    }

    /**
     *
     * @param origin
     * @param destination
     * @param routeName
     * @param userName
     * This function will save the route to DB for further suggestions to other users
     */
    $scope.saveRoute = function () {
        $scope.showNavigationSaveConfirmation = false;
        $scope.$apply();
        var route1 = {
//          "legs" : routeDetails.legs,
            "overview_path": routeTakenBreadcrums,
            "overview_polyline": routeDetails.overview_polyline,
            "summary": routeDetails.summary
        };
        var objToSave = {
            "origin": $scope.wayPointsNav[0].originName,
            "destination": $scope.wayPointsNav[0].destinationName,
            "routeName": $scope.routeSearch.routeTitle ? $scope.routeSearch.routeTitle : $scope.wayPointsNav[0].originName + "_" + $scope.wayPointsNav[0].destinationName + "_" + $filter("date")(new Date(), "dd-MMM-yyyy"),
            "userName": $scope.routeSearch.riderName ? $scope.routeSearch.riderName : "Vineet",
            "routeDetails": route1,
            "routeSaveDate": new Date()
        };
        var query = {"routeInfo": objToSave};
        $.getJSON('/saveRoute', query, function (data) {
                console.log(data);
                alert('Route saved successfully');
                $scope.getRoutes();
            },
            function (error) {
                alert('Route saved unsuccessful.');
                console.log(error);
                $scope.getRoutes();
            });
    };

    function getPointOfInterests(currentLocation) {
        var service = new google.maps.places.PlacesService(map);
        service.textSearch({
            location: currentLocation,
            radius: 2000,
            type: ['restaurant']
//                query:' jalgaon'

        }, callback);


    }

    function callback(results, status, next_page_token) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {


//                    for (var i = 0; i <= 10; i++) {
                (function (ind) {
                    setTimeout(function () {
                        var place = results[ind];
//                        console.log(place.name + " : " + place.vicinity + " : " + place.geometry.location.lat() + " : " + place.geometry.location.lng());
//                        console.log(place.name + " : " + place.formatted_address + " : " + place.geometry.location.lat + " : " + place.geometry.location.lng);
                        var placeLoc = place.geometry.location;
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location,
                            icon: "images/icon/restaurant.png"
                        });
                        arrMarkers.push(marker);

                        google.maps.event.addListener(marker, 'click', function () {
                            for (i = 0; i < arrInfowindows.length; i++) {
                                arrInfowindows[i].close();
                            }
                            arrInfowindows = [];

                            var infowindow = new google.maps.InfoWindow();
                            infowindow.setContent(place.name);
                            infowindow.open(map, this);
                            arrInfowindows.push(infowindow);
                        });
                    }, 2500);
                })(i);
            }
//                }
        }
    }

    $scope.getRoutes = function () {
        var query = {};

        $scope.placeMarkesrs(null);
        if (arrdirectionsDisplay != null) {
            for (i = 0; i < arrdirectionsDisplay.length; i++) {
                arrdirectionsDisplay[i].setMap(null);
                arrdirectionsDisplay[i] = null;
            }
            arrdirectionsDisplay = [];
        }
        $scope.routeSearch.showDirectionPanel = false;

//        if ($scope.wayPointsNav[0].originName != {}) {
//            query['origin'] ={ '$regex': "^" + $scope.wayPointsNav[0].originName, '$options': '-i'};
//        }
//
//        if ($scope.wayPointsNav[0].destinationName != {}) {
//            query['destination'] ={ '$regex': "^" + $scope.wayPointsNav[0].destinationName, '$options': '-i'};
//        }

//        if ($scope.routeSearch.searchRouteBy) {
//
//            query['search'] = $scope.routeSearch.searchRouteBy;
//
//        }
        $.getJSON('/getRoute', query, function (data) {
                $scope.showRoute = {};
                $scope.routeSearch.routesSearched = data;
                $scope.routeSearch.showSearchRouteCombo = true;
                $scope.$apply();
            },
            function (error) {
                $scope.showRoute = {};
                $scope.routeSearch.routesSearched = [];
                $scope.routeSearch.showSearchRouteCombo = false;
                console.log(error);
            });
    };

    $scope.showSelectedRoute = function (routeName) {
        $scope.routeSearch.showDirectionPanel = false;
        routeName = JSON.parse(routeName);
        var polyline = new google.maps.Polyline({
            path: google.maps.geometry.encoding.decodePath(routeName.routeDetails.overview_polyline),
            map: map,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 4
        });

        arrPolylines.push(polyline);
        var latitude = polyline.getPath().b[0].lat();
        var longitude = polyline.getPath().b[0].lng();
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
        marker.addListener('click', function () {
            var infoWindow = new google.maps.InfoWindow({
                content: routeName.origin
            });
            for (i = 0; i < arrInfowindows.length; i++) {
                arrInfowindows[i].close();
            }
            arrInfowindows = [];
            infoWindow.open(map, marker);
            arrInfowindows.push(infoWindow);
        });
        arrMarkers.push(marker);

        var latitude1 = polyline.getPath().b[polyline.getPath().b.length - 1].lat();
        var longitude1 = polyline.getPath().b[polyline.getPath().b.length - 1].lng();
        var marker1 = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(parseFloat(latitude1), parseFloat(longitude1)),
            icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
        });
        marker1.addListener('click', function () {
            var infoWindow1 = new google.maps.InfoWindow({
                content: routeName.destination
            });
            for (i = 0; i < arrInfowindows.length; i++) {
                arrInfowindows[i].close();
            }
            arrInfowindows = [];
            infoWindow1.open(map, marker);
            arrInfowindows.push(infoWindow1);
        });
        arrMarkers.push(marker1);


        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < polyline.getPath().getLength(); i++) {
            bounds.extend(polyline.getPath().getAt(i));
        }
        map.fitBounds(bounds);
    };


///////////////////////////////SPEED LIMIT/////////////////////////////////////////

//    function initialize() {
//
//
//        // Clear button. Click to remove all polylines.
//        $('#clear').click(function(ev) {
//            for (var i = 0; i < polylines.length; ++i) {
//                polylines[i].setMap(null);
//            }
//            polylines = [];
//            ev.preventDefault();
//            return false;
//        });
//    }

// Snap a user-created polyline to roads and draw the snapped path
    function runSnapToRoad(path) {
        var pathValues = [];
        for (var i = 0; i < path.getLength(); i++) {
            pathValues.push(path.getAt(i).toUrlValue());
        }

        $.get('https://roads.googleapis.com/v1/snapToRoads', {
            interpolate: true,
            key: apiKey,
            path: pathValues.join('|')
        }, function (data) {
            processSnapToRoadResponse(data);
            drawSnappedPolyline();
            getAndDrawSpeedLimits();
        });
    }

// Store snapped polyline returned by the snap-to-road service.
    function processSnapToRoadResponse(data) {
        snappedCoordinates = [];
        placeIdArray = [];
        for (var i = 0; i < data.snappedPoints.length; i++) {
            var latlng = new google.maps.LatLng(
                data.snappedPoints[i].location.latitude,
                data.snappedPoints[i].location.longitude);
            snappedCoordinates.push(latlng);
            placeIdArray.push(data.snappedPoints[i].placeId);
        }
    }

// Draws the snapped polyline (after processing snap-to-road response).
    function drawSnappedPolyline() {
        var snappedPolyline = new google.maps.Polyline({
            path: snappedCoordinates,
            strokeColor: 'black',
            strokeWeight: 3
        });

        snappedPolyline.setMap(map);
        polylines.push(snappedPolyline);
    }

// Gets speed limits (for 100 segments at a time) and draws a polyline
// color-coded by speed limit. Must be called after processing snap-to-road
// response.
    function getAndDrawSpeedLimits() {
        for (var i = 0; i <= placeIdArray.length / 100; i++) {
            // Ensure that no query exceeds the max 100 placeID limit.
            var start = i * 100;
            var end = Math.min((i + 1) * 100 - 1, placeIdArray.length);

            drawSpeedLimits(start, end);
        }
    }

// Gets speed limits for a 100-segment path and draws a polyline color-coded by
// speed limit. Must be called after processing snap-to-road response.
    function drawSpeedLimits(start, end) {
        var placeIdQuery = '';
        for (var i = start; i < end; i++) {
            placeIdQuery += '&placeId=' + placeIdArray[i];
        }

        $.get('https://roads.googleapis.com/v1/speedLimits',
                'key=' + apiKey + placeIdQuery,
            function (speedData) {
                processSpeedLimitResponse(speedData, start);
            }
        );
    }

// Draw a polyline segment (up to 100 road segments) color-coded by speed limit.
    function processSpeedLimitResponse(speedData, start) {
        var end = start + speedData.speedLimits.length;
        for (var i = 0; i < speedData.speedLimits.length - 1; i++) {
            var speedLimit = speedData.speedLimits[i].speedLimit;
            var color = getColorForSpeed(speedLimit);

            // Take two points for a single-segment polyline.
            var coords = snappedCoordinates.slice(start + i, start + i + 2);

            var snappedPolyline = new google.maps.Polyline({
                path: coords,
                strokeColor: color,
                strokeWeight: 6
            });
            snappedPolyline.setMap(map);
            polylines.push(snappedPolyline);
        }
    }

    function getColorForSpeed(speed_kph) {
        if (speed_kph <= 40) {
            return 'purple';
        }
        if (speed_kph <= 50) {
            return 'blue';
        }
        if (speed_kph <= 60) {
            return 'green';
        }
        if (speed_kph <= 80) {
            return 'yellow';
        }
        if (speed_kph <= 100) {
            return 'orange';
        }
        return 'red';
    }


    $scope.getGeolocationandAddresses = function () {
        console.log($scope.geo.addressesToGetGeolocations);
        var query = {
            'addresses': $scope.geo.addressesToGetGeolocations
        };

        $.getJSON('/getGeolocation', query, function (data) {
                $scope.geo.geolocatedAddresses = data;
                $scope.$apply();
            },
            function (error) {
                $scope.geo.geolocatedAddresses = [];
                console.log(error);
            });
    };


    $scope.calulateMapDistancebyArrayLatLng = function () {
//        var arrLatLng = [
//            {"lat": "17.405078", "lng": "78.486421"},
//            {"lat": "17.405084", "lng": "78.486341"},
//            {"lat": "17.405111", "lng": "78.486225"},
//            {"lat": "17.405194", "lng": "78.486054"},
//            {"lat": "17.405243", "lng": "78.486014"},
//            {"lat": "17.40529", "lng": "78.485984"},
//            {"lat": "17.40534", "lng": "78.485981"},
//            {"lat": "17.405905", "lng": "78.486105"},
//            {"lat": "17.405959", "lng": "78.486109"},
//            {"lat": "17.406004", "lng": "78.486101"},
//            {"lat": "17.40603", "lng": "78.486048"},
//            {"lat": "17.406132", "lng": "78.48575"},
//            {"lat": "17.406253", "lng": "78.48547"},
//            {"lat": "17.406306", "lng": "78.485195"},
//            {"lat": "17.406376", "lng": "78.484905"},
//            {"lat": "17.40641", "lng": "78.484823"},
//            {"lat": "17.407345", "lng": "78.485022"},
//            {"lat": "17.40819", "lng": "78.48524"},
//            {"lat": "17.409175", "lng": "78.485439"},
//            {"lat": "17.409547", "lng": "78.485512"},
//            {"lat": "17.409649", "lng": "78.485535"},
//            {"lat": "17.409728", "lng": "78.485525"},
//            {"lat": "17.40977", "lng": "78.48551"},
//            {"lat": "17.409796", "lng": "78.485469"},
//            {"lat": "17.409805", "lng": "78.485415"},
//            {"lat": "17.409897", "lng": "78.485125"},
//            {"lat": "17.410077", "lng": "78.484853"},
//            {"lat": "17.410188", "lng": "78.484577"},
//            {"lat": "17.410316", "lng": "78.484459"},
//            {"lat": "17.41039", "lng": "78.484469"},
//            {"lat": "17.410783", "lng": "78.484554"},
//            {"lat": "17.410782", "lng": "78.484709"},
//            {"lat": "17.410612", "lng": "78.485098"},
//            {"lat": "17.410494", "lng": "78.485473"},
//            {"lat": "17.410383", "lng": "78.485828"},
//            {"lat": "17.41028", "lng": "78.486148"},
//            {"lat": "17.410177", "lng": "78.486495"},
//            {"lat": "17.410125", "lng": "78.486793"},
//            {"lat": "17.410043", "lng": "78.487109"},
//            {"lat": "17.409857", "lng": "78.487503"},
//            {"lat": "17.409669", "lng": "78.487923"},
//            {"lat": "17.409554", "lng": "78.488289"},
//            {"lat": "17.409477", "lng": "78.488569"},
//            {"lat": "17.409424", "lng": "78.48886"},
//            {"lat": "17.409323", "lng": "78.489173"},
//            {"lat": "17.409184", "lng": "78.489493"},
//            {"lat": "17.40911", "lng": "78.48977"},
//            {"lat": "17.409019", "lng": "78.490077"},
//            {"lat": "17.408912", "lng": "78.490377"},
//            {"lat": "17.408802", "lng": "78.490652"},
//            {"lat": "17.408674", "lng": "78.491055"},
//            {"lat": "17.408559", "lng": "78.491438"},
//            {"lat": "17.408457", "lng": "78.491748"},
//            {"lat": "17.408333", "lng": "78.49214"},
//            {"lat": "17.40823", "lng": "78.492527"},
//            {"lat": "17.40812", "lng": "78.492875"},
//            {"lat": "17.407976", "lng": "78.493285"},
//            {"lat": "17.407837", "lng": "78.493679"},
//            {"lat": "17.407739", "lng": "78.493993"},
//            {"lat": "17.407625", "lng": "78.494333"},
//            {"lat": "17.407474", "lng": "78.494755"},
//            {"lat": "17.407301", "lng": "78.495235"},
//            {"lat": "17.407137", "lng": "78.495649"},
//            {"lat": "17.407009", "lng": "78.495962"},
//            {"lat": "17.406927", "lng": "78.496293"},
//            {"lat": "17.406938", "lng": "78.496423"},
//            {"lat": "17.407055", "lng": "78.496614"},
//            {"lat": "17.407609", "lng": "78.496888"},
//            {"lat": "17.407827", "lng": "78.49701"},
//            {"lat": "17.407776", "lng": "78.497107"},
//            {"lat": "17.407325", "lng": "78.496963"},
//            {"lat": "17.406998", "lng": "78.49688"},
//            {"lat": "17.406794", "lng": "78.497152"},
//            {"lat": "17.406649", "lng": "78.497545"},
//            {"lat": "17.406494", "lng": "78.497934"},
//            {"lat": "17.406307", "lng": "78.498418"},
//            {"lat": "17.40612", "lng": "78.498902"},
//            {"lat": "17.405989", "lng": "78.499243"},
//            {"lat": "17.405874", "lng": "78.499539"},
//            {"lat": "17.405737", "lng": "78.49988"},
//            {"lat": "17.405522", "lng": "78.500381"},
//            {"lat": "17.405322", "lng": "78.500945"},
//            {"lat": "17.405147", "lng": "78.50145"},
//            {"lat": "17.405008", "lng": "78.501798"},
//            {"lat": "17.404863", "lng": "78.502135"},
//            {"lat": "17.40472", "lng": "78.50248"},
//            {"lat": "17.40457", "lng": "78.502878"},
//            {"lat": "17.404419", "lng": "78.503364"},
//            {"lat": "17.404199", "lng": "78.503914"},
//            {"lat": "17.40406", "lng": "78.504286"},
//            {"lat": "17.403937", "lng": "78.5046"},
//            {"lat": "17.403788", "lng": "78.505047"},
//            {"lat": "17.403664", "lng": "78.505487"},
//            {"lat": "17.40354", "lng": "78.505889"},
//            {"lat": "17.403394", "lng": "78.506327"},
//            {"lat": "17.403265", "lng": "78.506737"},
//            {"lat": "17.403136", "lng": "78.507106"},
//            {"lat": "17.402992", "lng": "78.507375"},
//            {"lat": "17.402805", "lng": "78.507687"},
//            {"lat": "17.402571", "lng": "78.507958"},
//            {"lat": "17.402263", "lng": "78.508267"},
//            {"lat": "17.401936", "lng": "78.508577"},
//            {"lat": "17.401653", "lng": "78.508849"},
//            {"lat": "17.401633", "lng": "78.508869"},
//            {"lat": "17.401599", "lng": "78.508912"},
//            {"lat": "17.401627", "lng": "78.508984"},
//            {"lat": "17.401918", "lng": "78.509276"},
//            {"lat": "17.402277", "lng": "78.509612"},
//            {"lat": "17.402619", "lng": "78.509919"},
//            {"lat": "17.402933", "lng": "78.510195"},
//            {"lat": "17.403238", "lng": "78.510467"},
//            {"lat": "17.403542", "lng": "78.51075"},
//            {"lat": "17.403883", "lng": "78.511052"},
//            {"lat": "17.404195", "lng": "78.511354"},
//            {"lat": "17.404534", "lng": "78.511734"},
//            {"lat": "17.404749", "lng": "78.512032"},
//            {"lat": "17.404919", "lng": "78.512305"},
//            {"lat": "17.405115", "lng": "78.512604"},
//            {"lat": "17.405313", "lng": "78.512905"},
//            {"lat": "17.405457", "lng": "78.51318"},
//            {"lat": "17.405543", "lng": "78.513484"},
//            {"lat": "17.405408", "lng": "78.514045"},
//            {"lat": "17.405303", "lng": "78.514345"},
//            {"lat": "17.405258", "lng": "78.514667"},
//            {"lat": "17.405297", "lng": "78.514952"},
//            {"lat": "17.405342", "lng": "78.515245"},
//            {"lat": "17.405444", "lng": "78.515564"},
//            {"lat": "17.405563", "lng": "78.515865"},
//            {"lat": "17.405672", "lng": "78.516138"},
//            {"lat": "17.405823", "lng": "78.516439"},
//            {"lat": "17.406021", "lng": "78.516711"},
//            {"lat": "17.406263", "lng": "78.517"},
//            {"lat": "17.406542", "lng": "78.517314"},
//            {"lat": "17.406788", "lng": "78.517605"},
//            {"lat": "17.407082", "lng": "78.517939"},
//            {"lat": "17.407394", "lng": "78.518325"},
//            {"lat": "17.407689", "lng": "78.518673"},
//            {"lat": "17.407967", "lng": "78.518963"},
//            {"lat": "17.408304", "lng": "78.51924"},
//            {"lat": "17.408638", "lng": "78.519515"},
//            {"lat": "17.408988", "lng": "78.519814"},
//            {"lat": "17.409376", "lng": "78.52013"},
//            {"lat": "17.409721", "lng": "78.52041"},
//            {"lat": "17.410061", "lng": "78.520683"},
//            {"lat": "17.410389", "lng": "78.520964"},
//            {"lat": "17.410735", "lng": "78.521243"},
//            {"lat": "17.411115", "lng": "78.521542"},
//            {"lat": "17.411518", "lng": "78.521827"},
//            {"lat": "17.411898", "lng": "78.522092"},
//            {"lat": "17.412335", "lng": "78.522394"},
//            {"lat": "17.41268", "lng": "78.522667"},
//            {"lat": "17.413109", "lng": "78.522959"},
//            {"lat": "17.41354", "lng": "78.523275"},
//            {"lat": "17.413999", "lng": "78.523637"},
//            {"lat": "17.414412", "lng": "78.523983"},
//            {"lat": "17.414724", "lng": "78.524372"},
//            {"lat": "17.414903", "lng": "78.524752"},
//            {"lat": "17.41499", "lng": "78.525075"},
//            {"lat": "17.415116", "lng": "78.525508"},
//            {"lat": "17.41525", "lng": "78.525848"},
//            {"lat": "17.415423", "lng": "78.52612"},
//            {"lat": "17.415687", "lng": "78.526447"},
//            {"lat": "17.415959", "lng": "78.52672"},
//            {"lat": "17.416376", "lng": "78.527007"},
//            {"lat": "17.417125", "lng": "78.527245"},
//            {"lat": "17.417397", "lng": "78.527285"},
//            {"lat": "17.417551", "lng": "78.527298"},
//            {"lat": "17.417713", "lng": "78.527297"},
//            {"lat": "17.417867", "lng": "78.527307"},
//            {"lat": "17.418027", "lng": "78.527307"},
//            {"lat": "17.418187", "lng": "78.527314"},
//            {"lat": "17.41888", "lng": "78.527302"},
//            {"lat": "17.418928", "lng": "78.527301"},
//            {"lat": "17.419003", "lng": "78.527307"},
//            {"lat": "17.420082", "lng": "78.527278"},
//            {"lat": "17.420482", "lng": "78.527012"},
//            {"lat": "17.420764", "lng": "78.526729"},
//            {"lat": "17.421025", "lng": "78.526437"},
//            {"lat": "17.42133", "lng": "78.526165"},
//            {"lat": "17.421773", "lng": "78.525919"},
//            {"lat": "17.421839", "lng": "78.525918"},
//            {"lat": "17.421891", "lng": "78.52593"},
//            {"lat": "17.422457", "lng": "78.526023"},
//            {"lat": "17.422904", "lng": "78.526352"},
//            {"lat": "17.423073", "lng": "78.526631"},
//            {"lat": "17.42324", "lng": "78.52695"},
//            {"lat": "17.42345", "lng": "78.527262"},
//            {"lat": "17.423668", "lng": "78.527533"},
//            {"lat": "17.423944", "lng": "78.527814"},
//            {"lat": "17.424232", "lng": "78.528092"},
//            {"lat": "17.424473", "lng": "78.528365"},
//            {"lat": "17.424748", "lng": "78.528665"},
//            {"lat": "17.42503", "lng": "78.528976"},
//            {"lat": "17.425302", "lng": "78.529273"},
//            {"lat": "17.42557", "lng": "78.529567"},
//            {"lat": "17.425832", "lng": "78.52986"},
//            {"lat": "17.42608", "lng": "78.530153"},
//            {"lat": "17.426269", "lng": "78.530375"},
//            {"lat": "17.426503", "lng": "78.530668"},
//            {"lat": "17.426626", "lng": "78.530769"},
//            {"lat": "17.426838", "lng": "78.530769"},
//            {"lat": "17.42711", "lng": "78.530469"},
//            {"lat": "17.427307", "lng": "78.530181"},
//            {"lat": "17.427491", "lng": "78.529863"},
//            {"lat": "17.427655", "lng": "78.529577"},
//            {"lat": "17.427833", "lng": "78.529278"},
//            {"lat": "17.42795", "lng": "78.528994"},
//            {"lat": "17.428006", "lng": "78.528717"},
//            {"lat": "17.428066", "lng": "78.528445"},
//            {"lat": "17.428058", "lng": "78.528317"},
//            {"lat": "17.428354", "lng": "78.528016"},
//            {"lat": "17.428553", "lng": "78.527668"},
//            {"lat": "17.428786", "lng": "78.527278"},
//            {"lat": "17.428969", "lng": "78.527005"},
//            {"lat": "17.429213", "lng": "78.526715"},
//            {"lat": "17.429482", "lng": "78.526493"},
//            {"lat": "17.429203", "lng": "78.526757"},
//            {"lat": "17.42898", "lng": "78.52708"},
//            {"lat": "17.428805", "lng": "78.527401"},
//            {"lat": "17.428663", "lng": "78.527724"},
//            {"lat": "17.428487", "lng": "78.528117"},
//            {"lat": "17.428308", "lng": "78.528517"},
//            {"lat": "17.428142", "lng": "78.52891"},
//            {"lat": "17.427974", "lng": "78.529267"},
//            {"lat": "17.427817", "lng": "78.52959"},
//            {"lat": "17.427593", "lng": "78.529977"},
//            {"lat": "17.427338", "lng": "78.530397"},
//            {"lat": "17.42702", "lng": "78.530819"},
//            {"lat": "17.426679", "lng": "78.531224"},
//            {"lat": "17.426335", "lng": "78.531669"},
//            {"lat": "17.426042", "lng": "78.53213"},
//            {"lat": "17.425805", "lng": "78.532588"},
//            {"lat": "17.425593", "lng": "78.533075"},
//            {"lat": "17.425405", "lng": "78.533565"},
//            {"lat": "17.425265", "lng": "78.534008"},
//            {"lat": "17.425174", "lng": "78.534388"},
//            {"lat": "17.425083", "lng": "78.534789"},
//            {"lat": "17.424973", "lng": "78.535273"},
//            {"lat": "17.424843", "lng": "78.535719"},
//            {"lat": "17.424679", "lng": "78.536077"},
//            {"lat": "17.424425", "lng": "78.536396"},
//            {"lat": "17.424159", "lng": "78.536663"},
//            {"lat": "17.423785", "lng": "78.536989"},
//            {"lat": "17.423308", "lng": "78.537383"},
//            {"lat": "17.422793", "lng": "78.537819"},
//            {"lat": "17.422363", "lng": "78.538274"},
//            {"lat": "17.422012", "lng": "78.538747"},
//            {"lat": "17.421709", "lng": "78.539172"},
//            {"lat": "17.421402", "lng": "78.539581"},
//            {"lat": "17.421119", "lng": "78.539932"},
//            {"lat": "17.420847", "lng": "78.540228"},
//            {"lat": "17.42059", "lng": "78.540504"},
//            {"lat": "17.420025", "lng": "78.54077"},
//            {"lat": "17.419644", "lng": "78.541071"},
//            {"lat": "17.419397", "lng": "78.541355"},
//            {"lat": "17.419324", "lng": "78.541592"},
//            {"lat": "17.419482", "lng": "78.54186"},
//            {"lat": "17.419712", "lng": "78.542144"},
//            {"lat": "17.419982", "lng": "78.542439"},
//            {"lat": "17.420225", "lng": "78.542707"},
//            {"lat": "17.420485", "lng": "78.543021"},
//            {"lat": "17.420744", "lng": "78.543322"},
//            {"lat": "17.420985", "lng": "78.543611"},
//            {"lat": "17.421237", "lng": "78.543901"},
//            {"lat": "17.421514", "lng": "78.544201"},
//            {"lat": "17.421835", "lng": "78.544565"},
//            {"lat": "17.422146", "lng": "78.544904"},
//            {"lat": "17.422424", "lng": "78.545202"},
//            {"lat": "17.42267", "lng": "78.545508"},
//            {"lat": "17.422924", "lng": "78.545773"},
//            {"lat": "17.4232", "lng": "78.546054"},
//            {"lat": "17.423466", "lng": "78.546322"},
//            {"lat": "17.423693", "lng": "78.546594"},
//            {"lat": "17.423933", "lng": "78.546869"},
//            {"lat": "17.424177", "lng": "78.547139"},
//            {"lat": "17.424482", "lng": "78.547439"},
//            {"lat": "17.424769", "lng": "78.547723"},
//            {"lat": "17.425049", "lng": "78.547993"},
//            {"lat": "17.425295", "lng": "78.548259"},
//            {"lat": "17.425561", "lng": "78.548544"},
//            {"lat": "17.425848", "lng": "78.548841"},
//            {"lat": "17.426112", "lng": "78.54912"},
//            {"lat": "17.426277", "lng": "78.549338"},
//            {"lat": "17.42651", "lng": "78.549613"},
//            {"lat": "17.426769", "lng": "78.54988"},
//            {"lat": "17.427035", "lng": "78.55015"},
//            {"lat": "17.427332", "lng": "78.550426"},
//            {"lat": "17.427668", "lng": "78.550696"},
//            {"lat": "17.427989", "lng": "78.550991"},
//            {"lat": "17.428353", "lng": "78.551273"},
//            {"lat": "17.428756", "lng": "78.551565"},
//            {"lat": "17.429087", "lng": "78.551835"},
//            {"lat": "17.429412", "lng": "78.552101"},
//            {"lat": "17.429771", "lng": "78.552393"},
//            {"lat": "17.430109", "lng": "78.552675"},
//            {"lat": "17.430447", "lng": "78.552974"},
//            {"lat": "17.430774", "lng": "78.553252"},
//            {"lat": "17.431103", "lng": "78.55352"},
//            {"lat": "17.431434", "lng": "78.553784"},
//            {"lat": "17.431998", "lng": "78.554131"},
//            {"lat": "17.432813", "lng": "78.554347"},
//            {"lat": "17.43398", "lng": "78.554504"},
//            {"lat": "17.435328", "lng": "78.55463"},
//            {"lat": "17.436108", "lng": "78.554884"},
//            {"lat": "17.436557", "lng": "78.555156"},
//            {"lat": "17.436864", "lng": "78.555432"},
//            {"lat": "17.437152", "lng": "78.555752"},
//            {"lat": "17.43735", "lng": "78.55611"},
//            {"lat": "17.437531", "lng": "78.556532"},
//            {"lat": "17.437734", "lng": "78.55703"},
//            {"lat": "17.437907", "lng": "78.557449"},
//            {"lat": "17.438068", "lng": "78.557831"},
//            {"lat": "17.438225", "lng": "78.558205"},
//            {"lat": "17.438343", "lng": "78.558498"},
//            {"lat": "17.43839", "lng": "78.558625"},
//            {"lat": "17.438308", "lng": "78.558708"},
//            {"lat": "17.437853", "lng": "78.558967"},
//            {"lat": "17.437292", "lng": "78.55922"},
//            {"lat": "17.436749", "lng": "78.55948"},
//            {"lat": "17.436588", "lng": "78.559592"},
//            {"lat": "17.436568", "lng": "78.559654"},
//            {"lat": "17.436597", "lng": "78.559743"},
//            {"lat": "17.436423", "lng": "78.559936"}
//        ];

        //        ] // Vineet request 9.02 path
//        var arrLatLng = [{'lat':17.367604,'lng':78.539952},
//            {'lat':17.367023,'lng':78.540904},
//            {'lat':17.366286,'lng':78.541789},
//            {'lat':17.365364,'lng':78.542582},
//            {'lat':17.364361,'lng':78.543173},
//            {'lat':17.363243,'lng':78.54362},
//            {'lat':17.362099,'lng':78.543912},
//            {'lat':17.36099,'lng':78.544192},
//            {'lat':17.360014,'lng':78.544444},
//            {'lat':17.358959,'lng':78.54471},
//            {'lat':17.357921,'lng':78.544962},
//            {'lat':17.356869,'lng':78.545244},
//            {'lat':17.35596,'lng':78.545467},
//            {'lat':17.354934,'lng':78.545737},
//            {'lat':17.353859,'lng':78.546022},
//            {'lat':17.352787,'lng':78.546294},
//            {'lat':17.351815,'lng':78.546578},
//            {'lat':17.350952,'lng':78.547057},
//            {'lat':17.35019,'lng':78.547665},
//            {'lat':17.349616,'lng':78.548127},
//            {'lat':17.348933,'lng':78.548667},
//            {'lat':17.34818,'lng':78.549319},
//            {'lat':17.347582,'lng':78.549942},
//            {'lat':17.347125,'lng':78.550403},
//            {'lat':17.346434,'lng':78.551233},
//            {'lat':17.346167,'lng':78.551508},
//            {'lat':17.345815,'lng':78.552002},
//            {'lat':17.345495,'lng':78.552482},
//            {'lat':17.345073,'lng':78.55313},
//            {'lat':17.344614,'lng':78.553842},
//            {'lat':17.344106,'lng':78.554589},
//            {'lat':17.343593,'lng':78.555328},
//            {'lat':17.343179,'lng':78.555959},
//            {'lat':17.342665,'lng':78.556715},
//            {'lat':17.342313,'lng':78.557323},
//            {'lat':17.341885,'lng':78.557939},
//            {'lat':17.341527,'lng':78.558622},
//            {'lat':17.341338,'lng':78.559328},
//            {'lat':17.341139,'lng':78.560082},
//            {'lat':17.341001,'lng':78.560989},
//            {'lat':17.340859,'lng':78.562},
//            {'lat':17.340714,'lng':78.563108},
//            {'lat':17.34049,'lng':78.564211},
//            {'lat':17.340021,'lng':78.565281},
//            {'lat':17.339494,'lng':78.566302},
//            {'lat':17.339028,'lng':78.567124},
//            {'lat':17.338578,'lng':78.567978},
//            {'lat':17.338229,'lng':78.568884},
//            {'lat':17.337957,'lng':78.569805},
//            {'lat':17.33763,'lng':78.570814},
//            {'lat':17.337324,'lng':78.571769},
//            {'lat':17.336988,'lng':78.572859},
//            {'lat':17.336752,'lng':78.573802},
//            {'lat':17.336629,'lng':78.574851},
//            {'lat':17.336499,'lng':78.575899},
//            {'lat':17.336368,'lng':78.57696},
//            {'lat':17.336243,'lng':78.578046},
//            {'lat':17.336122,'lng':78.579115},
//            {'lat':17.336005,'lng':78.580063},
//            {'lat':17.335871,'lng':78.581214},
//            {'lat':17.335684,'lng':78.582618},
//            {'lat':17.335459,'lng':78.583925},
//            {'lat':17.334919,'lng':78.58516},
//            {'lat':17.334315,'lng':78.586413},
//            {'lat':17.333722,'lng':78.587663},
//            {'lat':17.333073,'lng':78.588833},
//            {'lat':17.332445,'lng':78.589899},
//            {'lat':17.331818,'lng':78.590955},
//            {'lat':17.331156,'lng':78.592034},
//            {'lat':17.330555,'lng':78.59307},
//            {'lat':17.330103,'lng':78.594075},
//            {'lat':17.329645,'lng':78.59522},
//            {'lat':17.329279,'lng':78.596413},
//            {'lat':17.328892,'lng':78.597585},
//            {'lat':17.328523,'lng':78.59873},
//            {'lat':17.328152,'lng':78.599874},
//            {'lat':17.327762,'lng':78.601092},
//            {'lat':17.327471,'lng':78.602347},
//            {'lat':17.32725,'lng':78.60356},
//            {'lat':17.327078,'lng':78.604543},
//            {'lat':17.326975,'lng':78.605123},
//            {'lat':17.326766,'lng':78.605952},
//            {'lat':17.3262,'lng':78.606959},
//            {'lat':17.325485,'lng':78.607927},
//            {'lat':17.324661,'lng':78.608938},
//            {'lat':17.323828,'lng':78.610029},
//            {'lat':17.322987,'lng':78.611123},
//            {'lat':17.322152,'lng':78.612212},
//            {'lat':17.322152,'lng':78.612212},
//            {'lat':17.321319,'lng':78.613297},
//            {'lat':17.321319,'lng':78.613297},
//            {'lat':17.320546,'lng':78.614457},
//            {'lat':17.320546,'lng':78.614457},
//            {'lat':17.320174,'lng':78.615958},
//            {'lat':17.320174,'lng':78.615958},
//            {'lat':17.319959,'lng':78.617414},
//            {'lat':17.319959,'lng':78.617414},
//            {'lat':17.319932,'lng':78.618767},
//            {'lat':17.319932,'lng':78.618767},
//            {'lat':17.320083,'lng':78.620137},
//            {'lat':17.320224,'lng':78.621462},
//            {'lat':17.320347,'lng':78.622797},
//            {'lat':17.320362,'lng':78.622935},
//            {'lat':17.320498,'lng':78.624194},
//            {'lat':17.320607,'lng':78.625625},
//            {'lat':17.320719,'lng':78.627129},
//            {'lat':17.32103,'lng':78.628569},
//            {'lat':17.321369,'lng':78.629931},
//            {'lat':17.321718,'lng':78.631308},
//            {'lat':17.322032,'lng':78.632595},
//            {'lat':17.32223,'lng':78.633879},
//            {'lat':17.322255,'lng':78.635072},
//            {'lat':17.322172,'lng':78.636273},
//            {'lat':17.321907,'lng':78.637586},
//            {'lat':17.32153,'lng':78.638855},
//            {'lat':17.321087,'lng':78.640164},
//            {'lat':17.320655,'lng':78.641461},
//            {'lat':17.320219,'lng':78.642742},
//            {'lat':17.319839,'lng':78.643928},
//            {'lat':17.319683,'lng':78.645304},
//            {'lat':17.319632,'lng':78.646665},
//            {'lat':17.319676,'lng':78.648144},
//            {'lat':17.319724,'lng':78.649585},
//            {'lat':17.319596,'lng':78.650959},
//            {'lat':17.31914,'lng':78.652267},
//            {'lat':17.31866,'lng':78.653594},
//            {'lat':17.318211,'lng':78.654852},
//            {'lat':17.317787,'lng':78.656053},
//            {'lat':17.317403,'lng':78.657354},
//            {'lat':17.317269,'lng':78.658747},
//            {'lat':17.31732,'lng':78.660108},
//            {'lat':17.317417,'lng':78.661383},
//            {'lat':17.317468,'lng':78.662601},
//            {'lat':17.317463,'lng':78.663654},
//            {'lat':17.317445,'lng':78.664708},
//            {'lat':17.317285,'lng':78.665857},
//            {'lat':17.31702,'lng':78.666996},
//            {'lat':17.316678,'lng':78.668118},
//            {'lat':17.316335,'lng':78.669229},
//            {'lat':17.316068,'lng':78.67021},
//            {'lat':17.315822,'lng':78.671195},
//            {'lat':17.31556,'lng':78.672292},
//            {'lat':17.315218,'lng':78.673389},
//            {'lat':17.314783,'lng':78.674573},
//            {'lat':17.314297,'lng':78.675877},
//            {'lat':17.313823,'lng':78.67716},
//            {'lat':17.313357,'lng':78.678429},
//            {'lat':17.312855,'lng':78.679757},
//            {'lat':17.312303,'lng':78.681159},
//            {'lat':17.311896,'lng':78.682164},
//            {'lat':17.311727,'lng':78.682439},
//            {'lat':17.311538,'lng':78.682499},
//            {'lat':17.3108,'lng':78.682257},
//            {'lat':17.310119,'lng':78.682019},
//            {'lat':17.309415,'lng':78.681774},
//            {'lat':17.309415,'lng':78.681774},
//            {'lat':17.309282,'lng':78.681752},
//            {'lat':17.3092,'lng':78.681798},
//            {'lat':17.309115,'lng':78.682184},
//            {'lat':17.308971,'lng':78.682302},
//            {'lat':17.308921,'lng':78.682277},
//            {'lat':17.308897,'lng':78.682258},
//            {'lat':17.308874,'lng':78.682182},
//            {'lat':17.308887,'lng':78.682123},
//            {'lat':17.308965,'lng':78.68183},
//            {'lat':17.308992,'lng':78.681729},
//            {'lat':17.309037,'lng':78.681667},
//            {'lat':17.309128,'lng':78.681659},
//            {'lat':17.309185,'lng':78.681682},
//            {'lat':17.309245,'lng':78.681685},
//            {'lat':17.309341,'lng':78.681646},
//            {'lat':17.30941,'lng':78.681657},
//            {'lat':17.309807,'lng':78.681788},
//            {'lat':17.31003,'lng':78.681872},
//            {'lat':17.310126,'lng':78.682034},
//            {'lat':17.310218,'lng':78.682065},
//            {'lat':17.310696,'lng':78.682225},
//            {'lat':17.311162,'lng':78.682384},
//            {'lat':17.311757,'lng':78.682238},
//            {'lat':17.311861,'lng':78.68202},
//            {'lat':17.311995,'lng':78.681713},
//            {'lat':17.31212,'lng':78.681415},
//            {'lat':17.312271,'lng':78.681058},
//            {'lat':17.312415,'lng':78.680695},
//            {'lat':17.312645,'lng':78.680134},
//            {'lat':17.312947,'lng':78.679339},
//            {'lat':17.313324,'lng':78.678343},
//            {'lat':17.313739,'lng':78.677282},
//            {'lat':17.314162,'lng':78.676171},
//            {'lat':17.314575,'lng':78.675054},
//            {'lat':17.314768,'lng':78.674564},
//            {'lat':17.314929,'lng':78.674127},
//            {'lat':17.31514,'lng':78.673465},
//            {'lat':17.315381,'lng':78.672726},
//            {'lat':17.315623,'lng':78.671812},
//            {'lat':17.315847,'lng':78.670857},
//            {'lat':17.316089,'lng':78.669915},
//            {'lat':17.316372,'lng':78.668895},
//            {'lat':17.316729,'lng':78.667675},
//            {'lat':17.317088,'lng':78.666452},
//            {'lat':17.317287,'lng':78.665276},
//            {'lat':17.317407,'lng':78.66416},
//            {'lat':17.31742,'lng':78.662927},
//            {'lat':17.317358,'lng':78.661728},
//            {'lat':17.317229,'lng':78.660396},
//            {'lat':17.317152,'lng':78.658751},
//            {'lat':17.317352,'lng':78.657104},
//            {'lat':17.317829,'lng':78.655554},
//            {'lat':17.318346,'lng':78.654045},
//            {'lat':17.318865,'lng':78.652717},
//            {'lat':17.31934,'lng':78.651462},
//            {'lat':17.31963,'lng':78.650122},
//            {'lat':17.319586,'lng':78.648725},
//            {'lat':17.319537,'lng':78.647354},
//            {'lat':17.319552,'lng':78.645949},
//            {'lat':17.319703,'lng':78.644434},
//            {'lat':17.320092,'lng':78.642956},
//            {'lat':17.320521,'lng':78.641647},
//            {'lat':17.32093,'lng':78.640374},
//            {'lat':17.321397,'lng':78.638958},
//            {'lat':17.321797,'lng':78.637758},
//            {'lat':17.322099,'lng':78.636377},
//            {'lat':17.322206,'lng':78.634868},
//            {'lat':17.322089,'lng':78.633292},
//            {'lat':17.321762,'lng':78.631877},
//            {'lat':17.321394,'lng':78.63043},
//            {'lat':17.321033,'lng':78.629017},
//            {'lat':17.320698,'lng':78.627625},
//            {'lat':17.320548,'lng':78.626238},
//            {'lat':17.320473,'lng':78.624915},
//            {'lat':17.320363,'lng':78.623674},
//            {'lat':17.320245,'lng':78.622328},
//            {'lat':17.320067,'lng':78.620857},
//            {'lat':17.319894,'lng':78.61935},
//            {'lat':17.319837,'lng':78.617852},
//            {'lat':17.320068,'lng':78.616279},
//            {'lat':17.320334,'lng':78.614817},
//            {'lat':17.32103,'lng':78.613593},
//            {'lat':17.321903,'lng':78.612425},
//            {'lat':17.322802,'lng':78.611242},
//            {'lat':17.323684,'lng':78.610095},
//            {'lat':17.324579,'lng':78.608929},
//            {'lat':17.325459,'lng':78.607785},
//            {'lat':17.326238,'lng':78.606782},
//            {'lat':17.326825,'lng':78.605622},
//            {'lat':17.327049,'lng':78.60456},
//            {'lat':17.327182,'lng':78.603742},
//            {'lat':17.327296,'lng':78.602902},
//            {'lat':17.327491,'lng':78.601872},
//            {'lat':17.327797,'lng':78.600765},
//            {'lat':17.32816,'lng':78.599629},
//            {'lat':17.328528,'lng':78.598475},
//            {'lat':17.328904,'lng':78.597289},
//            {'lat':17.3293,'lng':78.596048},
//            {'lat':17.32969,'lng':78.594871},
//            {'lat':17.330142,'lng':78.593785},
//            {'lat':17.330681,'lng':78.592678},
//            {'lat':17.331382,'lng':78.591542},
//            {'lat':17.332074,'lng':78.590385},
//            {'lat':17.33275,'lng':78.58923},
//            {'lat':17.333427,'lng':78.588079},
//            {'lat':17.334019,'lng':78.58685},
//            {'lat':17.33461,'lng':78.585623},
//            {'lat':17.335217,'lng':78.58436},
//            {'lat':17.335562,'lng':78.582927},
//            {'lat':17.335749,'lng':78.581603},
//            {'lat':17.335885,'lng':78.580302},
//            {'lat':17.336022,'lng':78.57911},
//            {'lat':17.336045,'lng':78.578743},
//            {'lat':17.33611,'lng':78.578141},
//            {'lat':17.33623,'lng':78.577198},
//            {'lat':17.336388,'lng':78.575935},
//            {'lat':17.336572,'lng':78.574494},
//            {'lat':17.33687,'lng':78.57295},
//            {'lat':17.337213,'lng':78.571877},
//            {'lat':17.337568,'lng':78.570724},
//            {'lat':17.337737,'lng':78.570133},
//            {'lat':17.337834,'lng':78.569861},
//            {'lat':17.33808,'lng':78.569155},
//            {'lat':17.338417,'lng':78.568164},
//            {'lat':17.338983,'lng':78.567052},
//            {'lat':17.339574,'lng':78.56605},
//            {'lat':17.340101,'lng':78.564979},
//            {'lat':17.340554,'lng':78.563665},
//            {'lat':17.340755,'lng':78.562239},
//            {'lat':17.340942,'lng':78.560782},
//            {'lat':17.341172,'lng':78.559284},
//            {'lat':17.341619,'lng':78.55797},
//            {'lat':17.342099,'lng':78.55711},
//            {'lat':17.342434,'lng':78.55671},
//            {'lat':17.342822,'lng':78.556179},
//            {'lat':17.343377,'lng':78.555425},
//            {'lat':17.343972,'lng':78.554549},
//            {'lat':17.3447,'lng':78.553503},
//            {'lat':17.345441,'lng':78.552382},
//            {'lat':17.345847,'lng':78.551739},
//            {'lat':17.34603,'lng':78.551448},
//            {'lat':17.346262,'lng':78.551068},
//            {'lat':17.34648,'lng':78.550768},
//            {'lat':17.346745,'lng':78.550504},
//            {'lat':17.347014,'lng':78.550182},
//            {'lat':17.347568,'lng':78.549629},
//            {'lat':17.348378,'lng':78.549019},
//            {'lat':17.349172,'lng':78.5484},
//            {'lat':17.349974,'lng':78.54774},
//            {'lat':17.350906,'lng':78.546993},
//            {'lat':17.351929,'lng':78.546422},
//            {'lat':17.353243,'lng':78.546055},
//            {'lat':17.354588,'lng':78.545724},
//            {'lat':17.355909,'lng':78.545392},
//            {'lat':17.357163,'lng':78.545075},
//            {'lat':17.35803,'lng':78.544838},
//            {'lat':17.358903,'lng':78.544625},
//            {'lat':17.360118,'lng':78.54431},
//            {'lat':17.361358,'lng':78.543989},
//            {'lat':17.362782,'lng':78.543577},
//            {'lat':17.364369,'lng':78.54297},
//            {'lat':17.365743,'lng':78.542099},
//            {'lat':17.366695,'lng':78.541075},
//            {'lat':17.367378,'lng':78.540042},
//            {'lat':17.367792,'lng':78.53919},
//            {'lat':17.368104,'lng':78.538108},
//            {'lat':17.368219,'lng':78.536919},
//            {'lat':17.36827,'lng':78.535636},
//            {'lat':17.368304,'lng':78.534393},
//            {'lat':17.368318,'lng':78.533109},
//            {'lat':17.368353,'lng':78.531978},
//            {'lat':17.368384,'lng':78.530675},
//            {'lat':17.368417,'lng':78.529458},
//            {'lat':17.368454,'lng':78.528264},
//            {'lat':17.368479,'lng':78.527164},
//            {'lat':17.368513,'lng':78.526005},
//            {'lat':17.368552,'lng':78.525113},
//            {'lat':17.36852,'lng':78.52452},
//            {'lat':17.368533,'lng':78.5238},
//            {'lat':17.368564,'lng':78.522932},
//            {'lat':17.368594,'lng':78.522042},
//            {'lat':17.368595,'lng':78.521143},
//            {'lat':17.368608,'lng':78.520282},
//            {'lat':17.368625,'lng':78.520073},
//            {'lat':17.368765,'lng':78.520039},
//            {'lat':17.368783,'lng':78.520479},
//            {'lat':17.368773,'lng':78.520979},
//            {'lat':17.36876,'lng':78.521544},
//            {'lat':17.368766,'lng':78.522682},
//            {'lat':17.368751,'lng':78.522849},
//            {'lat':17.368718,'lng':78.523236},
//            {'lat':17.368679,'lng':78.524256},
//            {'lat':17.368668,'lng':78.52529},
//            {'lat':17.36866,'lng':78.526352},
//            {'lat':17.368631,'lng':78.527431},
//            {'lat':17.368642,'lng':78.528235},
//            {'lat':17.368627,'lng':78.528534},
//            {'lat':17.368601,'lng':78.52927},
//            {'lat':17.368577,'lng':78.530321},
//            {'lat':17.368551,'lng':78.531514},
//            {'lat':17.36853,'lng':78.532549},
//            {'lat':17.368537,'lng':78.533235},
//            {'lat':17.368499,'lng':78.53383},
//            {'lat':17.368445,'lng':78.53476},
//            {'lat':17.368425,'lng':78.535849},
//            {'lat':17.368387,'lng':78.537051},
//            {'lat':17.368235,'lng':78.538179},
//            {'lat':17.367898,'lng':78.539428},
//            {'lat':17.367572,'lng':78.540119},
//            {'lat':17.367082,'lng':78.540884},
//            {'lat':17.366305,'lng':78.541799},
//            {'lat':17.365334,'lng':78.542653},
//            {'lat':17.364264,'lng':78.543294},
//            {'lat':17.363133,'lng':78.543693},
//            {'lat':17.362105,'lng':78.543904},
//            {'lat':17.36123,'lng':78.544159},
//            {'lat':17.360272,'lng':78.544427},
//            {'lat':17.359208,'lng':78.544677},
//            {'lat':17.35824,'lng':78.54491},
//            {'lat':17.357134,'lng':78.5452},
//            {'lat':17.355944,'lng':78.545527},
//            {'lat':17.35501,'lng':78.545792},
//            {'lat':17.354019,'lng':78.546044},
//            {'lat':17.352882,'lng':78.546337},
//            {'lat':17.351567,'lng':78.546737},
//            {'lat':17.350793,'lng':78.547253},
//            {'lat':17.350026,'lng':78.547837},
//            {'lat':17.349142,'lng':78.548551},
//            {'lat':17.348046,'lng':78.549392},
//            {'lat':17.347226,'lng':78.550088},
//            {'lat':17.346705,'lng':78.550766},
//            {'lat':17.346257,'lng':78.551375},
//            {'lat':17.345855,'lng':78.551969},
//            {'lat':17.345338,'lng':78.55276},
//            {'lat':17.345042,'lng':78.553264},
//            {'lat':17.344765,'lng':78.553666},
//            {'lat':17.344377,'lng':78.554267},
//            {'lat':17.343825,'lng':78.555102},
//            {'lat':17.343169,'lng':78.556059},
//            {'lat':17.342561,'lng':78.556923},
//            {'lat':17.342155,'lng':78.55759},
//            {'lat':17.34171,'lng':78.558267},
//            {'lat':17.341414,'lng':78.559123},
//            {'lat':17.341235,'lng':78.559797},
//            {'lat':17.341108,'lng':78.560622},
//            {'lat':17.340969,'lng':78.561565},
//            {'lat':17.340807,'lng':78.562702},
//            {'lat':17.340578,'lng':78.563918},
//            {'lat':17.340235,'lng':78.564945},
//            {'lat':17.339969,'lng':78.56554},
//            {'lat':17.339712,'lng':78.566009},
//            {'lat':17.339388,'lng':78.566629},
//            {'lat':17.338806,'lng':78.567627},
//            {'lat':17.338514,'lng':78.568274},
//            {'lat':17.338133,'lng':78.569384},
//            {'lat':17.337918,'lng':78.570178},
//            {'lat':17.337582,'lng':78.571133},
//            {'lat':17.337228,'lng':78.572201},
//            {'lat':17.336929,'lng':78.573194},
//            {'lat':17.3368,'lng':78.573967},
//            {'lat':17.336691,'lng':78.57479},
//            {'lat':17.336532,'lng':78.57562},
//            {'lat':17.336419,'lng':78.576549},
//            {'lat':17.336305,'lng':78.577545},
//            {'lat':17.336174,'lng':78.578677},
//            {'lat':17.336044,'lng':78.57988},
//            {'lat':17.336035,'lng':78.580367},
//            {'lat':17.335945,'lng':78.581018},
//            {'lat':17.335814,'lng':78.582037},
//            {'lat':17.335633,'lng':78.583259},
//            {'lat':17.335255,'lng':78.58453},
//            {'lat':17.334675,'lng':78.58575},
//            {'lat':17.334018,'lng':78.587102},
//            {'lat':17.33338,'lng':78.588383},
//            {'lat':17.332779,'lng':78.589442},
//            {'lat':17.332552,'lng':78.589893},
//            {'lat':17.332384,'lng':78.590176},
//            {'lat':17.331996,'lng':78.590817},
//            {'lat':17.331438,'lng':78.591679},
//            {'lat':17.330844,'lng':78.592659},
//            {'lat':17.33028,'lng':78.593797},
//            {'lat':17.32972,'lng':78.595085},
//            {'lat':17.329274,'lng':78.596458},
//            {'lat':17.328794,'lng':78.597979},
//            {'lat':17.328315,'lng':78.599505},
//            {'lat':17.327825,'lng':78.601025},
//            {'lat':17.327444,'lng':78.602625},
//            {'lat':17.327167,'lng':78.604155},
//            {'lat':17.326932,'lng':78.605424},
//            {'lat':17.326463,'lng':78.606601},
//            {'lat':17.325695,'lng':78.60765},
//            {'lat':17.324849,'lng':78.60869},
//            {'lat':17.324074,'lng':78.6097},
//            {'lat':17.323324,'lng':78.610672},
//            {'lat':17.322543,'lng':78.611684},
//            {'lat':17.321659,'lng':78.61283},
//            {'lat':17.320741,'lng':78.614075},
//            {'lat':17.320232,'lng':78.615532},
//            {'lat':17.320008,'lng':78.617065},
//            {'lat':17.319897,'lng':78.618422},
//            {'lat':17.320035,'lng':78.619869},
//            {'lat':17.320223,'lng':78.621535},
//            {'lat':17.320408,'lng':78.623222},
//            {'lat':17.320574,'lng':78.624953},
//            {'lat':17.320574,'lng':78.624953},
//            {'lat':17.320678,'lng':78.626717},
//            {'lat':17.321006,'lng':78.628506},
//            {'lat':17.321423,'lng':78.630179},
//            {'lat':17.321465,'lng':78.630347},
//            {'lat':17.321842,'lng':78.631874},
//            {'lat':17.32219,'lng':78.633476},
//            {'lat':17.322256,'lng':78.635143},
//            {'lat':17.322091,'lng':78.636762},
//            {'lat':17.32167,'lng':78.63834},
//            {'lat':17.321127,'lng':78.63996},
//            {'lat':17.320681,'lng':78.641347},
//            {'lat':17.320283,'lng':78.642563},
//            {'lat':17.319838,'lng':78.644008},
//            {'lat':17.319652,'lng':78.645717},
//            {'lat':17.319619,'lng':78.647284},
//            {'lat':17.319675,'lng':78.648792},
//            {'lat':17.319734,'lng':78.650333},
//            {'lat':17.319317,'lng':78.6518},
//            {'lat':17.318783,'lng':78.653258},
//            {'lat':17.318255,'lng':78.654724},
//            {'lat':17.317745,'lng':78.656216},
//            {'lat':17.317367,'lng':78.657797},
//            {'lat':17.317284,'lng':78.659395},
//            {'lat':17.317392,'lng':78.660943},
//            {'lat':17.317463,'lng':78.662378},
//            {'lat':17.317467,'lng':78.6637},
//            {'lat':17.317382,'lng':78.665045},
//            {'lat':17.31715,'lng':78.666531},
//            {'lat':17.31675,'lng':78.667972},
//            {'lat':17.316329,'lng':78.669379},
//            {'lat':17.315945,'lng':78.67085},
//            {'lat':17.315609,'lng':78.672239},
//            {'lat':17.31519,'lng':78.673581},
//            {'lat':17.314671,'lng':78.674968},
//            {'lat':17.314114,'lng':78.676475},
//            {'lat':17.313571,'lng':78.677925},
//            {'lat':17.313,'lng':78.679455},
//            {'lat':17.312416,'lng':78.680962},
//            {'lat':17.311906,'lng':78.682231},
//            {'lat':17.311779,'lng':78.682434},
//            {'lat':17.311458,'lng':78.682475},
//            {'lat':17.31043,'lng':78.682114},
//            {'lat':17.309763,'lng':78.681877},
//            {'lat':17.30891,'lng':78.681572},
//            {'lat':17.30782,'lng':78.681189},
//            {'lat':17.306674,'lng':78.680785},
//            {'lat':17.305454,'lng':78.680399},
//            {'lat':17.304082,'lng':78.680435},
//            {'lat':17.303113,'lng':78.680775},
//            {'lat':17.302199,'lng':78.681109},
//            {'lat':17.300892,'lng':78.681219},
//            {'lat':17.299928,'lng':78.680987},
//            {'lat':17.298998,'lng':78.680727},
//            {'lat':17.29806,'lng':78.680453},
//            {'lat':17.297182,'lng':78.680227},
//            {'lat':17.295839,'lng':78.680138},
//            {'lat':17.29445,'lng':78.680109},
//            {'lat':17.292975,'lng':78.680069},
//            {'lat':17.291502,'lng':78.680044},
//            {'lat':17.290088,'lng':78.680013},
//            {'lat':17.288717,'lng':78.679989},
//            {'lat':17.287728,'lng':78.680243},
//            {'lat':17.286702,'lng':78.680859},
//            {'lat':17.286103,'lng':78.681186},
//            {'lat':17.285364,'lng':78.681113},
//            {'lat':17.284187,'lng':78.68011},
//            {'lat':17.282969,'lng':78.679795},
//            {'lat':17.281755,'lng':78.679669},
//            {'lat':17.280468,'lng':78.679542},
//            {'lat':17.279112,'lng':78.679403},
//            {'lat':17.277838,'lng':78.679257},
//            {'lat':17.277064,'lng':78.678982},
//            {'lat':17.276155,'lng':78.678677},
//            {'lat':17.275704,'lng':78.678595},
//            {'lat':17.274204,'lng':78.678967},
//            {'lat':17.272825,'lng':78.678911},
//            {'lat':17.271926,'lng':78.678582},
//            {'lat':17.271678,'lng':78.678301},
//            {'lat':17.271558,'lng':78.678105},
//            {'lat':17.271444,'lng':78.678032},
//            {'lat':17.271328,'lng':78.678099},
//            {'lat':17.271317,'lng':78.678203},
//            {'lat':17.271658,'lng':78.678797},
//            {'lat':17.272048,'lng':78.67959},
//            {'lat':17.272174,'lng':78.680807},
//            {'lat':17.271905,'lng':78.6816},
//            {'lat':17.271887,'lng':78.682277},
//            {'lat':17.272202,'lng':78.682995},
//            {'lat':17.272756,'lng':78.683884},
//            {'lat':17.27287,'lng':78.684843},
//            {'lat':17.272713,'lng':78.685761},
//            {'lat':17.272518,'lng':78.68619},
//            {'lat':17.271282,'lng':78.686905},
//            {'lat':17.270878,'lng':78.686868},
//            {'lat':17.270425,'lng':78.686588},
//            {'lat':17.269884,'lng':78.686238},
//            {'lat':17.26917,'lng':78.685787},
//            {'lat':17.268467,'lng':78.685345},
//            {'lat':17.267872,'lng':78.684927},
//            {'lat':17.267022,'lng':78.684266},
//            {'lat':17.266299,'lng':78.683812},
//            {'lat':17.265954,'lng':78.683777},
//            {'lat':17.265578,'lng':78.683944},
//            {'lat':17.265347,'lng':78.683994},
//            {'lat':17.26514,'lng':78.68389},
//            {'lat':17.2651,'lng':78.683734},
//            {'lat':17.265291,'lng':78.683073},
//            {'lat':17.26518,'lng':78.682437},
//            {'lat':17.264677,'lng':78.681982},
//            {'lat':17.264108,'lng':78.68198},
//            {'lat':17.263273,'lng':78.682969},
//            {'lat':17.262418,'lng':78.683405},
//            {'lat':17.262269,'lng':78.683505},
//            {'lat':17.262019,'lng':78.683612},
//            {'lat':17.261092,'lng':78.683607},
//            {'lat':17.260062,'lng':78.683596},
//            {'lat':17.259095,'lng':78.683587},
//            {'lat':17.258336,'lng':78.683445},
//            {'lat':17.257787,'lng':78.682973},
//            {'lat':17.256479,'lng':78.683087},
//            {'lat':17.255057,'lng':78.683107},
//            {'lat':17.253639,'lng':78.683215},
//            {'lat':17.2523,'lng':78.683494},
//            {'lat':17.2513,'lng':78.683678},
//            {'lat':17.250739,'lng':78.683922},
//            {'lat':17.249996,'lng':78.683899},
//            {'lat':17.25007,'lng':78.683784},
//            {'lat':17.251014,'lng':78.683758},
//            {'lat':17.251639,'lng':78.683618},
//            {'lat':17.252369,'lng':78.68349},
//            {'lat':17.253012,'lng':78.683349},
//            {'lat':17.253769,'lng':78.683208},
//            {'lat':17.255283,'lng':78.683113},
//            {'lat':17.255833,'lng':78.683105},
//            {'lat':17.256242,'lng':78.683102},
//            {'lat':17.256511,'lng':78.683059},
//            {'lat':17.256771,'lng':78.682983},
//            {'lat':17.257165,'lng':78.682869},
//            {'lat':17.257406,'lng':78.682848},
//            {'lat':17.257855,'lng':78.683017},
//            {'lat':17.258403,'lng':78.683519},
//            {'lat':17.259175,'lng':78.683599},
//            {'lat':17.25961,'lng':78.683608},
//            {'lat':17.259917,'lng':78.683609},
//            {'lat':17.260072,'lng':78.683609},
//            {'lat':17.260538,'lng':78.683617},
//            {'lat':17.260852,'lng':78.683613},
//            {'lat':17.262196,'lng':78.683486},
//            {'lat':17.262263,'lng':78.683407},
//            {'lat':17.2624,'lng':78.683181},
//            {'lat':17.262517,'lng':78.683129},
//            {'lat':17.262808,'lng':78.683369},
//            {'lat':17.263349,'lng':78.682739},
//            {'lat':17.263932,'lng':78.681795},
//            {'lat':17.263982,'lng':78.681727},
//            {'lat':17.26418,'lng':78.681659},
//            {'lat':17.26433,'lng':78.681714},
//            {'lat':17.26504,'lng':78.682184},
//            {'lat':17.265361,'lng':78.682864},
//            {'lat':17.265185,'lng':78.683621},
//            {'lat':17.265221,'lng':78.683872},
//            {'lat':17.265434,'lng':78.683919},
//            {'lat':17.265576,'lng':78.683864},
//            {'lat':17.265878,'lng':78.683737},
//            {'lat':17.266436,'lng':78.683824},
//            {'lat':17.267493,'lng':78.684543},
//            {'lat':17.268257,'lng':78.685133},
//            {'lat':17.269362,'lng':78.685841},
//            {'lat':17.270704,'lng':78.686675},
//            {'lat':17.270825,'lng':78.686749},
//            {'lat':17.271174,'lng':78.686855},
//            {'lat':17.27141,'lng':78.686807},
//            {'lat':17.272129,'lng':78.686525},
//            {'lat':17.272644,'lng':78.685922},
//            {'lat':17.272852,'lng':78.684334},
//            {'lat':17.272697,'lng':78.683752},
//            {'lat':17.271964,'lng':78.682524},
//            {'lat':17.271873,'lng':78.681759},
//            {'lat':17.27214,'lng':78.680993},
//            {'lat':17.272114,'lng':78.679905},
//            {'lat':17.271725,'lng':78.678915},
//            {'lat':17.271317,'lng':78.678173},
//            {'lat':17.271259,'lng':78.677906},
//            {'lat':17.270973,'lng':78.67733},
//            {'lat':17.270902,'lng':78.676869},
//            {'lat':17.270948,'lng':78.676635},
//            {'lat':17.271022,'lng':78.676419},
//            {'lat':17.271116,'lng':78.676352},
//            {'lat':17.271174,'lng':78.676352},
//            {'lat':17.271256,'lng':78.676489},
//            {'lat':17.271219,'lng':78.676622},
//            {'lat':17.271112,'lng':78.677044},
//            {'lat':17.271259,'lng':78.677434},
//            {'lat':17.271922,'lng':78.6779},
//            {'lat':17.272479,'lng':78.678228},
//            {'lat':17.273163,'lng':78.678493},
//            {'lat':17.273238,'lng':78.678502},
//            {'lat':17.273464,'lng':78.678504},
//            {'lat':17.273614,'lng':78.678497},
//            {'lat':17.27489,'lng':78.67835},
//            {'lat':17.275641,'lng':78.67812},
//            {'lat':17.275732,'lng':78.678112},
//            {'lat':17.276018,'lng':78.678115},
//            {'lat':17.276215,'lng':78.678162},
//            {'lat':17.276605,'lng':78.678367},
//            {'lat':17.277086,'lng':78.678812},
//            {'lat':17.279004,'lng':78.679224},
//            {'lat':17.280828,'lng':78.679399},
//            {'lat':17.282597,'lng':78.679568},
//            {'lat':17.284352,'lng':78.679773},
//            {'lat':17.284877,'lng':78.680155},
//            {'lat':17.28541,'lng':78.680955},
//            {'lat':17.286284,'lng':78.680997},
//            {'lat':17.287963,'lng':78.680034},
//            {'lat':17.288114,'lng':78.679986},
//            {'lat':17.288599,'lng':78.679908},
//            {'lat':17.288948,'lng':78.679903},
//            {'lat':17.290789,'lng':78.679945},
//            {'lat':17.292642,'lng':78.67998},
//            {'lat':17.294335,'lng':78.680009},
//            {'lat':17.295779,'lng':78.680033},
//            {'lat':17.297234,'lng':78.680122},
//            {'lat':17.298738,'lng':78.680539},
//            {'lat':17.300392,'lng':78.681019},
//            {'lat':17.300562,'lng':78.68106},
//            {'lat':17.301076,'lng':78.681137},
//            {'lat':17.301424,'lng':78.681148},
//            {'lat':17.303138,'lng':78.68068},
//            {'lat':17.304853,'lng':78.680262},
//            {'lat':17.306596,'lng':78.680663},
//            {'lat':17.30825,'lng':78.681263},
//            {'lat':17.309615,'lng':78.681747},
//            {'lat':17.310286,'lng':78.681984},
//            {'lat':17.31095,'lng':78.68222},
//            {'lat':17.311494,'lng':78.68241},
//            {'lat':17.311694,'lng':78.682378},
//            {'lat':17.312011,'lng':78.681667},
//            {'lat':17.312362,'lng':78.680804},
//            {'lat':17.312759,'lng':78.679832},
//            {'lat':17.313161,'lng':78.678744},
//            {'lat':17.313547,'lng':78.677625},
//            {'lat':17.313965,'lng':78.67657},
//            {'lat':17.314437,'lng':78.675411},
//            {'lat':17.314837,'lng':78.674268},
//            {'lat':17.315253,'lng':78.673223},
//            {'lat':17.31557,'lng':78.672169},
//            {'lat':17.315838,'lng':78.671019},
//            {'lat':17.316137,'lng':78.669743},
//            {'lat':17.316588,'lng':78.668275},
//            {'lat':17.317094,'lng':78.666577},
//            {'lat':17.317342,'lng':78.664845},
//            {'lat':17.317419,'lng':78.663079},
//            {'lat':17.317342,'lng':78.661255},
//            {'lat':17.317203,'lng':78.659375},
//            {'lat':17.317254,'lng':78.657665},
//            {'lat':17.317678,'lng':78.656047},
//            {'lat':17.318195,'lng':78.654448},
//            {'lat':17.318799,'lng':78.652935},
//            {'lat':17.31939,'lng':78.65135},
//            {'lat':17.31965,'lng':78.649843},
//            {'lat':17.319605,'lng':78.64808},
//            {'lat':17.319568,'lng':78.646287},
//            {'lat':17.31971,'lng':78.644502},
//            {'lat':17.320125,'lng':78.642853},
//            {'lat':17.320628,'lng':78.641342},
//            {'lat':17.321128,'lng':78.639834},
//            {'lat':17.321649,'lng':78.63828},
//            {'lat':17.32208,'lng':78.636637},
//            {'lat':17.322232,'lng':78.634932},
//            {'lat':17.3221,'lng':78.633148},
//            {'lat':17.321678,'lng':78.631395},
//            {'lat':17.321229,'lng':78.629683},
//            {'lat':17.320827,'lng':78.627987},
//            {'lat':17.320585,'lng':78.626295},
//            {'lat':17.320478,'lng':78.624537},
//            {'lat':17.320287,'lng':78.622778},
//            {'lat':17.320107,'lng':78.621063},
//            {'lat':17.319927,'lng':78.619393},
//            {'lat':17.319872,'lng':78.617717},
//            {'lat':17.320119,'lng':78.616007},
//            {'lat':17.320492,'lng':78.614422},
//            {'lat':17.321252,'lng':78.613299},
//            {'lat':17.321927,'lng':78.612428},
//            {'lat':17.322578,'lng':78.61153},
//            {'lat':17.323418,'lng':78.610477},
//            {'lat':17.324417,'lng':78.609175},
//            {'lat':17.325287,'lng':78.608018},
//            {'lat':17.325887,'lng':78.60726},
//            {'lat':17.326482,'lng':78.60645},
//            {'lat':17.326849,'lng':78.605505},
//            {'lat':17.327014,'lng':78.60467},
//            {'lat':17.327176,'lng':78.603767},
//            {'lat':17.327324,'lng':78.602789},
//            {'lat':17.327517,'lng':78.601628},
//            {'lat':17.327848,'lng':78.600455},
//            {'lat':17.328092,'lng':78.599577},
//            {'lat':17.328211,'lng':78.599273},
//            {'lat':17.328431,'lng':78.598615},
//            {'lat':17.328752,'lng':78.597647},
//            {'lat':17.329159,'lng':78.596442},
//            {'lat':17.329497,'lng':78.595327},
//            {'lat':17.329734,'lng':78.594575},
//            {'lat':17.330033,'lng':78.593938},
//            {'lat':17.330385,'lng':78.59321},
//            {'lat':17.33095,'lng':78.592275},
//            {'lat':17.331657,'lng':78.591053},
//            {'lat':17.332283,'lng':78.589903},
//            {'lat':17.332992,'lng':78.588709},
//            {'lat':17.333506,'lng':78.587815},
//            {'lat':17.33385,'lng':78.586995},
//            {'lat':17.334218,'lng':78.586375},
//            {'lat':17.334327,'lng':78.586133},
//            {'lat':17.334503,'lng':78.585762},
//            {'lat':17.3347,'lng':78.58536},
//            {'lat':17.334892,'lng':78.584978},
//            {'lat':17.335004,'lng':78.584978},
//            {'lat':17.33502,'lng':78.584992},
//            {'lat':17.335045,'lng':78.585029},
//            {'lat':17.335048,'lng':78.585077},
//            {'lat':17.334865,'lng':78.585485},
//            {'lat':17.334504,'lng':78.586237},
//            {'lat':17.334052,'lng':78.587177},
//            {'lat':17.333578,'lng':78.588169},
//            {'lat':17.333234,'lng':78.588795},
//            {'lat':17.332869,'lng':78.58939},
//            {'lat':17.332698,'lng':78.589723},
//            {'lat':17.332592,'lng':78.589857},
//            {'lat':17.332422,'lng':78.590129},
//            {'lat':17.332158,'lng':78.590557},
//            {'lat':17.331822,'lng':78.591077},
//            {'lat':17.33129,'lng':78.591916},
//            {'lat':17.3307,'lng':78.592915},
//            {'lat':17.330399,'lng':78.593591},
//            {'lat':17.330245,'lng':78.593933},
//            {'lat':17.330125,'lng':78.594315},
//            {'lat':17.329995,'lng':78.594634},
//            {'lat':17.329693,'lng':78.595404},
//            {'lat':17.32937,'lng':78.596355},
//            {'lat':17.329,'lng':78.597514},
//            {'lat':17.328703,'lng':78.598497},
//            {'lat':17.328343,'lng':78.599567},
//            {'lat':17.328053,'lng':78.600453},
//            {'lat':17.327708,'lng':78.60159},
//            {'lat':17.32749,'lng':78.602745},
//            {'lat':17.327243,'lng':78.603983},
//            {'lat':17.327138,'lng':78.604603},
//            {'lat':17.327029,'lng':78.605041},
//            {'lat':17.326958,'lng':78.605379},
//            {'lat':17.326888,'lng':78.605678},
//            {'lat':17.326797,'lng':78.605998},
//            {'lat':17.326418,'lng':78.606714},
//            {'lat':17.32575,'lng':78.607619},
//            {'lat':17.325229,'lng':78.608244},
//            {'lat':17.324685,'lng':78.608942},
//            {'lat':17.324081,'lng':78.60972},
//            {'lat':17.32344,'lng':78.610553},
//            {'lat':17.322752,'lng':78.611443},
//            {'lat':17.321977,'lng':78.612448},
//            {'lat':17.321125,'lng':78.613589},
//            {'lat':17.320469,'lng':78.614684},
//            {'lat':17.320248,'lng':78.615714},
//            {'lat':17.32007,'lng':78.61697},
//            {'lat':17.31992,'lng':78.618348},
//            {'lat':17.320064,'lng':78.619811},
//            {'lat':17.320237,'lng':78.621506},
//            {'lat':17.320418,'lng':78.623324},
//            {'lat':17.320578,'lng':78.624955},
//            {'lat':17.32068,'lng':78.626653},
//            {'lat':17.32098,'lng':78.628363},
//            {'lat':17.321396,'lng':78.630026},
//            {'lat':17.321829,'lng':78.631755},
//            {'lat':17.32223,'lng':78.633478},
//            {'lat':17.32231,'lng':78.635181},
//            {'lat':17.322304,'lng':78.63534},
//            {'lat':17.322132,'lng':78.636782},
//            {'lat':17.321691,'lng':78.638416},
//            {'lat':17.321186,'lng':78.639932},
//            {'lat':17.320725,'lng':78.641307},
//            {'lat':17.320346,'lng':78.642398},
//            {'lat':17.319946,'lng':78.643715},
//            {'lat':17.319727,'lng':78.645355},
//            {'lat':17.319646,'lng':78.647191},
//            {'lat':17.3197,'lng':78.649078},
//            {'lat':17.319702,'lng':78.65054},
//            {'lat':17.319095,'lng':78.652405},
//            {'lat':17.318592,'lng':78.653819},
//            {'lat':17.31806,'lng':78.655265},
//            {'lat':17.317542,'lng':78.65677},
//            {'lat':17.317305,'lng':78.658439},
//            {'lat':17.317353,'lng':78.66015},
//            {'lat':17.317466,'lng':78.661587},
//            {'lat':17.317486,'lng':78.662815},
//            {'lat':17.317483,'lng':78.663777},
//            {'lat':17.317396,'lng':78.664908},
//            {'lat':17.317218,'lng':78.666228},
//            {'lat':17.316831,'lng':78.667645},
//            {'lat':17.316389,'lng':78.66913},
//            {'lat':17.315965,'lng':78.670732},
//            {'lat':17.315554,'lng':78.672442},
//            {'lat':17.315,'lng':78.674115},
//            {'lat':17.314383,'lng':78.675803},
//            {'lat':17.313777,'lng':78.677358},
//            {'lat':17.313147,'lng':78.679117},
//            {'lat':17.312429,'lng':78.680955},
//            {'lat':17.311876,'lng':78.682262},
//            {'lat':17.311738,'lng':78.682444},
//            {'lat':17.310765,'lng':78.682227},
//            {'lat':17.310082,'lng':78.681982},
//            {'lat':17.309382,'lng':78.681732},
//            {'lat':17.308305,'lng':78.68136},
//            {'lat':17.306852,'lng':78.680838},
//            {'lat':17.30525,'lng':78.680367},
//            {'lat':17.303713,'lng':78.68055},
//            {'lat':17.302359,'lng':78.68106},
//            {'lat':17.301059,'lng':78.681207},
//            {'lat':17.299875,'lng':78.680944},
//            {'lat':17.29871,'lng':78.680603},
//            {'lat':17.297559,'lng':78.680273},
//            {'lat':17.296363,'lng':78.680123},
//            {'lat':17.294839,'lng':78.680102},
//            {'lat':17.293152,'lng':78.680083},
//            {'lat':17.291584,'lng':78.680042},
//            {'lat':17.290139,'lng':78.680019},
//            {'lat':17.288737,'lng':78.680006},
//            {'lat':17.28774,'lng':78.680239},
//            {'lat':17.286684,'lng':78.680864},
//            {'lat':17.286198,'lng':78.681154},
//            {'lat':17.285408,'lng':78.681134},
//            {'lat':17.284133,'lng':78.680078},
//            {'lat':17.282827,'lng':78.679788},
//            {'lat':17.281517,'lng':78.679666},
//            {'lat':17.280109,'lng':78.679529},
//            {'lat':17.278682,'lng':78.679386},
//            {'lat':17.277526,'lng':78.679185},
//            {'lat':17.276609,'lng':78.678803},
//            {'lat':17.275753,'lng':78.67861},
//            {'lat':17.274185,'lng':78.678975},
//            {'lat':17.272858,'lng':78.678903},
//            {'lat':17.271965,'lng':78.67858},
//            {'lat':17.271695,'lng':78.678299},
//            {'lat':17.271552,'lng':78.678089},
//            {'lat':17.271459,'lng':78.678023},
//            {'lat':17.27137,'lng':78.678058},
//            {'lat':17.271338,'lng':78.678133},
//            {'lat':17.271419,'lng':78.678332},
//            {'lat':17.271915,'lng':78.679186},
//            {'lat':17.272174,'lng':78.680273},
//            {'lat':17.272198,'lng':78.680827},
//            {'lat':17.271901,'lng':78.681665},
//            {'lat':17.271932,'lng':78.682395},
//            {'lat':17.272325,'lng':78.683133},
//            {'lat':17.272741,'lng':78.683805},
//            {'lat':17.272882,'lng':78.685018},
//            {'lat':17.272685,'lng':78.68589},
//            {'lat':17.272464,'lng':78.686264},
//            {'lat':17.271217,'lng':78.686913},
//            {'lat':17.270814,'lng':78.686805},
//            {'lat':17.269694,'lng':78.686107},
//            {'lat':17.268715,'lng':78.6855},
//            {'lat':17.267833,'lng':78.684888},
//            {'lat':17.26671,'lng':78.684049},
//            {'lat':17.266239,'lng':78.683786},
//            {'lat':17.265585,'lng':78.683934},
//            {'lat':17.2653,'lng':78.68398},
//            {'lat':17.265122,'lng':78.683837},
//            {'lat':17.26512,'lng':78.683675},
//            {'lat':17.265297,'lng':78.683115},
//            {'lat':17.265213,'lng':78.682485},
//            {'lat':17.264629,'lng':78.681954},
//            {'lat':17.2641,'lng':78.681974},
//            {'lat':17.26332,'lng':78.682877},
//            {'lat':17.262215,'lng':78.683585},
//            {'lat':17.261974,'lng':78.683619},
//            {'lat':17.260982,'lng':78.683618},
//            {'lat':17.25995,'lng':78.683622},
//            {'lat':17.258849,'lng':78.683613},
//            {'lat':17.258149,'lng':78.68332},
//            {'lat':17.257592,'lng':78.682888},
//            {'lat':17.256528,'lng':78.683085},
//            {'lat':17.255153,'lng':78.683129},
//            {'lat':17.253747,'lng':78.683211},
//            {'lat':17.252483,'lng':78.68347},
//            {'lat':17.251457,'lng':78.68366},
//            {'lat':17.250693,'lng':78.683919},
//            {'lat':17.250365,'lng':78.683805},
//            {'lat':17.250674,'lng':78.683815},
//            {'lat':17.251244,'lng':78.68366},
//            {'lat':17.252037,'lng':78.683556},
//            {'lat':17.25268,'lng':78.683415},
//            {'lat':17.253369,'lng':78.683272},
//            {'lat':17.254183,'lng':78.683173},
//            {'lat':17.255627,'lng':78.683093},
//            {'lat':17.255765,'lng':78.683095},
//            {'lat':17.256169,'lng':78.683092},
//            {'lat':17.256422,'lng':78.683062},
//            {'lat':17.256903,'lng':78.682929},
//            {'lat':17.257255,'lng':78.682835},
//            {'lat':17.25748,'lng':78.682827},
//            {'lat':17.257899,'lng':78.683015},
//            {'lat':17.258424,'lng':78.6835},
//            {'lat':17.259799,'lng':78.683574},
//            {'lat':17.260045,'lng':78.683577},
//            {'lat':17.260404,'lng':78.683576},
//            {'lat':17.260635,'lng':78.683581},
//            {'lat':17.260973,'lng':78.683592},
//            {'lat':17.261308,'lng':78.683588},
//            {'lat':17.261526,'lng':78.68359},
//            {'lat':17.261847,'lng':78.683597},
//            {'lat':17.262135,'lng':78.683542},
//            {'lat':17.26227,'lng':78.683428},
//            {'lat':17.262317,'lng':78.683352},
//            {'lat':17.262444,'lng':78.683154},
//            {'lat':17.262545,'lng':78.683115},
//            {'lat':17.262792,'lng':78.683315},
//            {'lat':17.26306,'lng':78.683292},
//            {'lat':17.263625,'lng':78.682356},
//            {'lat':17.263967,'lng':78.6818},
//            {'lat':17.264119,'lng':78.68166},
//            {'lat':17.264317,'lng':78.681693},
//            {'lat':17.26446,'lng':78.681771},
//            {'lat':17.265049,'lng':78.682189},
//            {'lat':17.265379,'lng':78.682842},
//            {'lat':17.265219,'lng':78.683585},
//            {'lat':17.26521,'lng':78.68385},
//            {'lat':17.265394,'lng':78.68394},
//            {'lat':17.265536,'lng':78.683898},
//            {'lat':17.265827,'lng':78.683757},
//            {'lat':17.266379,'lng':78.683783},
//            {'lat':17.267458,'lng':78.684517},
//            {'lat':17.268244,'lng':78.685117},
//            {'lat':17.269302,'lng':78.68579},
//            {'lat':17.270474,'lng':78.686536},
//            {'lat':17.270922,'lng':78.686799},
//            {'lat':17.272077,'lng':78.686539},
//            {'lat':17.272603,'lng':78.686003},
//            {'lat':17.272871,'lng':78.68449},
//            {'lat':17.272778,'lng':78.683923},
//            {'lat':17.271944,'lng':78.682472},
//            {'lat':17.271954,'lng':78.681462},
//            {'lat':17.272156,'lng':78.681014},
//            {'lat':17.272144,'lng':78.679972},
//            {'lat':17.271829,'lng':78.679074},
//            {'lat':17.271328,'lng':78.678082},
//            {'lat':17.271035,'lng':78.677434},
//            {'lat':17.270923,'lng':78.676849},
//            {'lat':17.270987,'lng':78.676565},
//            {'lat':17.271088,'lng':78.676383},
//            {'lat':17.271201,'lng':78.676376},
//            {'lat':17.271245,'lng':78.676406},
//            {'lat':17.271268,'lng':78.676578},
//            {'lat':17.271225,'lng':78.676718},
//            {'lat':17.271148,'lng':78.677007},
//            {'lat':17.271268,'lng':78.677417},
//            {'lat':17.271918,'lng':78.677899},
//            {'lat':17.272503,'lng':78.678242},
//            {'lat':17.273144,'lng':78.678491},
//            {'lat':17.273213,'lng':78.678501},
//            {'lat':17.273426,'lng':78.67851},
//            {'lat':17.27357,'lng':78.678503},
//            {'lat':17.274772,'lng':78.678372},
//            {'lat':17.275473,'lng':78.678134},
//            {'lat':17.275553,'lng':78.678116},
//            {'lat':17.275819,'lng':78.678089},
//            {'lat':17.276008,'lng':78.678103},
//            {'lat':17.276388,'lng':78.678221},
//            {'lat':17.277055,'lng':78.678784},
//            {'lat':17.278897,'lng':78.679194},
//            {'lat':17.280638,'lng':78.679365},
//            {'lat':17.28227,'lng':78.67951},
//            {'lat':17.283874,'lng':78.67967},
//            {'lat':17.284449,'lng':78.679803},
//            {'lat':17.285163,'lng':78.680692},
//            {'lat':17.285464,'lng':78.681004},
//            {'lat':17.285868,'lng':78.681124},
//            {'lat':17.286155,'lng':78.681063},
//            {'lat':17.287457,'lng':78.680289},
//            {'lat':17.287967,'lng':78.680032},
//            {'lat':17.288399,'lng':78.67993},
//            {'lat':17.288872,'lng':78.679902},
//            {'lat':17.2892,'lng':78.679907},
//            {'lat':17.290897,'lng':78.679944},
//            {'lat':17.292603,'lng':78.679987},
//            {'lat':17.293092,'lng':78.680005},
//            {'lat':17.293564,'lng':78.680023},
//            {'lat':17.293868,'lng':78.680027},
//            {'lat':17.295253,'lng':78.680027},
//            {'lat':17.296715,'lng':78.680062},
//            {'lat':17.298033,'lng':78.680337},
//            {'lat':17.299563,'lng':78.6808},
//            {'lat':17.301043,'lng':78.681155},
//            {'lat':17.302537,'lng':78.680924},
//            {'lat':17.303953,'lng':78.680391},
//            {'lat':17.304242,'lng':78.680322},
//            {'lat':17.304692,'lng':78.680275},
//            {'lat':17.305,'lng':78.680277},
//            {'lat':17.30646,'lng':78.680629},
//            {'lat':17.307812,'lng':78.681112},
//            {'lat':17.309039,'lng':78.68155},
//            {'lat':17.309833,'lng':78.681815},
//            {'lat':17.310542,'lng':78.682072},
//            {'lat':17.311208,'lng':78.682315},
//            {'lat':17.311444,'lng':78.682394},
//            {'lat':17.311696,'lng':78.682318},
//            {'lat':17.312072,'lng':78.681542},
//            {'lat':17.312455,'lng':78.680614},
//            {'lat':17.312867,'lng':78.679574},
//            {'lat':17.313301,'lng':78.678452},
//            {'lat':17.313727,'lng':78.677322},
//            {'lat':17.31417,'lng':78.676181},
//            {'lat':17.314644,'lng':78.674934},
//            {'lat':17.315102,'lng':78.67381},
//            {'lat':17.315474,'lng':78.672685},
//            {'lat':17.315769,'lng':78.671499},
//            {'lat':17.316067,'lng':78.6702},
//            {'lat':17.316472,'lng':78.668757},
//            {'lat':17.316914,'lng':78.667265},
//            {'lat':17.317254,'lng':78.665768},
//            {'lat':17.317417,'lng':78.66428},
//            {'lat':17.317425,'lng':78.662818},
//            {'lat':17.317352,'lng':78.661567},
//            {'lat':17.31724,'lng':78.660199},
//            {'lat':17.317211,'lng':78.658622},
//            {'lat':17.317388,'lng':78.657115},
//            {'lat':17.317824,'lng':78.65569},
//            {'lat':17.318278,'lng':78.654287},
//            {'lat':17.318786,'lng':78.652961},
//            {'lat':17.31937,'lng':78.65146},
//            {'lat':17.319662,'lng':78.650528},
//            {'lat':17.319638,'lng':78.648593},
//            {'lat':17.31955,'lng':78.646927},
//            {'lat':17.319653,'lng':78.645243},
//            {'lat':17.319899,'lng':78.643629},
//            {'lat':17.320393,'lng':78.642117},
//            {'lat':17.320886,'lng':78.640645},
//            {'lat':17.32139,'lng':78.63913},
//            {'lat':17.321885,'lng':78.637627},
//            {'lat':17.322168,'lng':78.636009},
//            {'lat':17.322234,'lng':78.634432},
//            {'lat':17.32208,'lng':78.632996},
//            {'lat':17.321688,'lng':78.63138},
//            {'lat':17.321289,'lng':78.629829},
//            {'lat':17.320936,'lng':78.628337},
//            {'lat':17.320627,'lng':78.626895},
//            {'lat':17.320539,'lng':78.625725},
//            {'lat':17.320427,'lng':78.624352},
//            {'lat':17.320305,'lng':78.622833},
//            {'lat':17.320147,'lng':78.621259},
//            {'lat':17.319981,'lng':78.619707},
//            {'lat':17.319838,'lng':78.618294},
//            {'lat':17.320039,'lng':78.61671},
//            {'lat':17.32028,'lng':78.615142},
//            {'lat':17.320817,'lng':78.613927},
//            {'lat':17.321567,'lng':78.612923},
//            {'lat':17.322442,'lng':78.611787},
//            {'lat':17.323373,'lng':78.610568},
//            {'lat':17.324277,'lng':78.609382},
//            {'lat':17.325102,'lng':78.608305},
//            {'lat':17.325511,'lng':78.607777},
//            {'lat':17.325993,'lng':78.607163},
//            {'lat':17.326537,'lng':78.60641},
//            {'lat':17.326875,'lng':78.605537},
//            {'lat':17.327011,'lng':78.604814},
//            {'lat':17.32715,'lng':78.604019},
//            {'lat':17.327303,'lng':78.603048},
//            {'lat':17.327513,'lng':78.601903},
//            {'lat':17.327874,'lng':78.600639},
//            {'lat':17.328294,'lng':78.599313},
//            {'lat':17.328748,'lng':78.597895},
//            {'lat':17.329197,'lng':78.596469},
//            {'lat':17.329599,'lng':78.595219},
//            {'lat':17.330079,'lng':78.594032},
//            {'lat':17.330562,'lng':78.593004},
//            {'lat':17.331202,'lng':78.59193},
//            {'lat':17.331937,'lng':78.590728},
//            {'lat':17.332613,'lng':78.589569},
//            {'lat':17.333257,'lng':78.588458},
//            {'lat':17.333892,'lng':78.587186},
//            {'lat':17.334557,'lng':78.585798},
//            {'lat':17.335191,'lng':78.584485},
//            {'lat':17.335575,'lng':78.583043},
//            {'lat':17.335795,'lng':78.581508},
//            {'lat':17.335987,'lng':78.580045},
//            {'lat':17.336086,'lng':78.578786},
//            {'lat':17.336179,'lng':78.577786},
//            {'lat':17.336374,'lng':78.576572},
//            {'lat':17.336543,'lng':78.575158},
//            {'lat':17.336645,'lng':78.574277},
//            {'lat':17.336617,'lng':78.574123},
//            {'lat':17.336844,'lng':78.573195},
//            {'lat':17.33718,'lng':78.572108},
//            {'lat':17.337492,'lng':78.571071},
//            {'lat':17.337718,'lng':78.570374},
//            {'lat':17.33782,'lng':78.570025},
//            {'lat':17.338054,'lng':78.569359},
//            {'lat':17.338293,'lng':78.568555},
//            {'lat':17.3387,'lng':78.567604},
//            {'lat':17.339237,'lng':78.566614},
//            {'lat':17.339753,'lng':78.565692},
//            {'lat':17.340324,'lng':78.564537},
//            {'lat':17.34062,'lng':78.563266},
//            {'lat':17.340787,'lng':78.562022},
//            {'lat':17.340907,'lng':78.561089},
//            {'lat':17.341057,'lng':78.560084},
//            {'lat':17.341262,'lng':78.558887},
//            {'lat':17.341603,'lng':78.557927},
//            {'lat':17.342011,'lng':78.557177},
//            {'lat':17.342338,'lng':78.556777},
//            {'lat':17.342818,'lng':78.556239},
//            {'lat':17.34335,'lng':78.555482},
//            {'lat':17.343849,'lng':78.554803},
//            {'lat':17.344389,'lng':78.554007},
//            {'lat':17.345062,'lng':78.552989},
//            {'lat':17.345669,'lng':78.55203},
//            {'lat':17.345985,'lng':78.5515},
//            {'lat':17.346402,'lng':78.55088},
//            {'lat':17.346705,'lng':78.550582},
//            {'lat':17.34701,'lng':78.550235},
//            {'lat':17.347355,'lng':78.549878},
//            {'lat':17.347902,'lng':78.54941},
//            {'lat':17.348528,'lng':78.548924},
//            {'lat':17.349112,'lng':78.548488},
//            {'lat':17.349603,'lng':78.548082},
//            {'lat':17.350258,'lng':78.547502},
//            {'lat':17.350844,'lng':78.547077},
//            {'lat':17.351478,'lng':78.54669},
//            {'lat':17.3525,'lng':78.54631},
//            {'lat':17.353749,'lng':78.545973},
//            {'lat':17.354955,'lng':78.545644},
//            {'lat':17.356045,'lng':78.545354},
//            {'lat':17.357184,'lng':78.545079},
//            {'lat':17.358415,'lng':78.544765},
//            {'lat':17.359582,'lng':78.544467},
//            {'lat':17.360589,'lng':78.544199},
//            {'lat':17.361536,'lng':78.543965},
//            {'lat':17.362295,'lng':78.543727},
//            {'lat':17.363295,'lng':78.543443},
//            {'lat':17.364345,'lng':78.543051},
//            {'lat':17.365179,'lng':78.542589},
//            {'lat':17.366014,'lng':78.541912},
//            {'lat':17.366795,'lng':78.54107},
//            {'lat':17.367358,'lng':78.540262},
//            {'lat':17.367924,'lng':78.538984},
//            {'lat':17.368193,'lng':78.537775},
//            {'lat':17.36828,'lng':78.536558},
//            {'lat':17.368314,'lng':78.535493},
//            {'lat':17.368343,'lng':78.534355},
//            {'lat':17.368354,'lng':78.533334},
//            {'lat':17.368371,'lng':78.53256},
//            {'lat':17.368379,'lng':78.531956},
//            {'lat':17.36839,'lng':78.531234},
//            {'lat':17.36838,'lng':78.53049},
//            {'lat':17.368387,'lng':78.529666},
//            {'lat':17.368413,'lng':78.528924},
//            {'lat':17.368445,'lng':78.52853},
//            {'lat':17.368469,'lng':78.528145},
//            {'lat':17.368484,'lng':78.527716},
//            {'lat':17.368487,'lng':78.5274},
//            {'lat':17.36851,'lng':78.526902},
//            {'lat':17.368509,'lng':78.526262},
//            {'lat':17.368497,'lng':78.525873},
//            {'lat':17.368468,'lng':78.524797},
//            {'lat':17.368495,'lng':78.524233},
//            {'lat':17.368535,'lng':78.523594},
//            {'lat':17.368546,'lng':78.523097},
//            {'lat':17.36855,'lng':78.522665},
//            {'lat':17.368565,'lng':78.522077},
//            {'lat':17.368581,'lng':78.521409},
//            {'lat':17.368589,'lng':78.520933},
//            {'lat':17.36861,'lng':78.520278},
//            {'lat':17.368782,'lng':78.520168},
//            {'lat':17.368746,'lng':78.520595},
//            {'lat':17.368749,'lng':78.520872},
//            {'lat':17.36873,'lng':78.521877},
//            {'lat':17.368727,'lng':78.522049},
//            {'lat':17.368725,'lng':78.522339},
//            {'lat':17.368688,'lng':78.52304},
//            {'lat':17.368656,'lng':78.523838},
//            {'lat':17.368639,'lng':78.524614},
//            {'lat':17.368604,'lng':78.525076},
//            {'lat':17.368614,'lng':78.525819},
//            {'lat':17.368613,'lng':78.525954},
//            {'lat':17.36863,'lng':78.526019},
//            {'lat':17.368627,'lng':78.526058},
//            {'lat':17.368613,'lng':78.526954},
//            {'lat':17.3686,'lng':78.527795},
//            {'lat':17.36859,'lng':78.528452},
//            {'lat':17.368559,'lng':78.529185},
//            {'lat':17.368515,'lng':78.530184},
//            {'lat':17.368488,'lng':78.531191},
//            {'lat':17.368499,'lng':78.532094},
//            {'lat':17.368515,'lng':78.532449},
//            {'lat':17.36852,'lng':78.533019},
//            {'lat':17.368493,'lng':78.53333},
//            {'lat':17.368447,'lng':78.533996},
//            {'lat':17.368392,'lng':78.534886},
//            {'lat':17.368392,'lng':78.535856},
//            {'lat':17.368354,'lng':78.536689},
//            {'lat':17.368277,'lng':78.537555},
//            {'lat':17.368234,'lng':78.537877},
//            {'lat':17.368157,'lng':78.538423},
//            {'lat':17.368038,'lng':78.53895},
//            {'lat':17.367878,'lng':78.539529},
//            {'lat':17.367712,'lng':78.539988},
//            {'lat':17.367323,'lng':78.540543},
//            {'lat':17.366718,'lng':78.541373},
//            {'lat':17.365865,'lng':78.542235},
//            {'lat':17.365008,'lng':78.542864},
//            {'lat':17.364059,'lng':78.543374},
//            {'lat':17.362922,'lng':78.543747},
//            {'lat':17.361691,'lng':78.544074},
//            {'lat':17.360673,'lng':78.544384},
//            {'lat':17.359704,'lng':78.544599},
//            {'lat':17.358739,'lng':78.544813},
//            {'lat':17.357694,'lng':78.545084},
//            {'lat':17.35653,'lng':78.545375},
//            {'lat':17.355649,'lng':78.545589},
//            {'lat':17.354934,'lng':78.545746},
//            {'lat':17.354044,'lng':78.545984},
//            {'lat':17.35299,'lng':78.546263},
//            {'lat':17.351752,'lng':78.546626},
//            {'lat':17.350883,'lng':78.547205},
//            {'lat':17.350278,'lng':78.547622},
//            {'lat':17.349602,'lng':78.548124},
//            {'lat':17.349087,'lng':78.548626},
//            {'lat':17.348414,'lng':78.549214},
//            {'lat':17.348125,'lng':78.549501},
//            {'lat':17.348073,'lng':78.5496},
//            {'lat':17.347771,'lng':78.549864},
//            {'lat':17.347447,'lng':78.550127},
//            {'lat':17.347185,'lng':78.550409},
//            {'lat':17.346614,'lng':78.551014},
//            {'lat':17.346307,'lng':78.551353},
//            {'lat':17.345984,'lng':78.551787},
//            {'lat':17.345529,'lng':78.552498},
//            {'lat':17.345252,'lng':78.552907},
//            {'lat':17.345137,'lng':78.553177},
//            {'lat':17.344542,'lng':78.554033},
//            {'lat':17.34406,'lng':78.554758},
//            {'lat':17.34357,'lng':78.555522},
//            {'lat':17.343059,'lng':78.556249},
//            {'lat':17.342623,'lng':78.556886},
//            {'lat':17.342436,'lng':78.557232},
//            {'lat':17.34227,'lng':78.557517},
//            {'lat':17.341995,'lng':78.557922},
//            {'lat':17.341745,'lng':78.558295},
//            {'lat':17.341539,'lng':78.558763},
//            {'lat':17.341393,'lng':78.559302},
//            {'lat':17.341265,'lng':78.559759},
//            {'lat':17.341205,'lng':78.560039},
//            {'lat':17.341106,'lng':78.560689},
//            {'lat':17.340951,'lng':78.561551},
//            {'lat':17.340781,'lng':78.562731},
//            {'lat':17.340552,'lng':78.564116},
//            {'lat':17.340151,'lng':78.565184},
//            {'lat':17.340022,'lng':78.565478},
//            {'lat':17.339758,'lng':78.565967},
//            {'lat':17.339427,'lng':78.566519},
//            {'lat':17.339216,'lng':78.566978},
//            {'lat':17.338998,'lng':78.567255},
//            {'lat':17.338697,'lng':78.567884},
//            {'lat':17.338408,'lng':78.56865},
//            {'lat':17.33811,'lng':78.569379},
//            {'lat':17.337902,'lng':78.570016},
//            {'lat':17.337658,'lng':78.570815},
//            {'lat':17.337332,'lng':78.571832},
//            {'lat':17.336981,'lng':78.572958},
//            {'lat':17.336824,'lng':78.57387},
//            {'lat':17.336731,'lng':78.574775},
//            {'lat':17.336615,'lng':78.575721},
//            {'lat':17.336515,'lng':78.576437},
//            {'lat':17.336412,'lng':78.577238},
//            {'lat':17.336315,'lng':78.578143},
//            {'lat':17.336254,'lng':78.578466},
//            {'lat':17.336172,'lng':78.579131},
//            {'lat':17.336102,'lng':78.579872},
//            {'lat':17.336074,'lng':78.580229},
//            {'lat':17.335976,'lng':78.580907},
//            {'lat':17.335823,'lng':78.581918},
//            {'lat':17.335638,'lng':78.583151},
//            {'lat':17.335316,'lng':78.584413},
//            {'lat':17.33502,'lng':78.585202},
//            {'lat':17.334899,'lng':78.585483},
//            {'lat':17.33457,'lng':78.586102},
//            {'lat':17.334074,'lng':78.587012},
//            {'lat':17.333503,'lng':78.58815},
//            {'lat':17.332894,'lng':78.589219},
//            {'lat':17.332354,'lng':78.59013},
//            {'lat':17.331723,'lng':78.591175},
//            {'lat':17.331152,'lng':78.592169},
//            {'lat':17.33055,'lng':78.593189},
//            {'lat':17.330045,'lng':78.594289},
//            {'lat':17.329572,'lng':78.595529},
//            {'lat':17.329264,'lng':78.596464},
//            {'lat':17.328917,'lng':78.597558},
//            {'lat':17.328531,'lng':78.598805},
//            {'lat':17.328205,'lng':78.59992},
//            {'lat':17.32776,'lng':78.601167},
//            {'lat':17.327452,'lng':78.602608},
//            {'lat':17.327216,'lng':78.60389},
//            {'lat':17.327129,'lng':78.604361},
//            {'lat':17.327018,'lng':78.604945},
//            {'lat':17.326912,'lng':78.605506},
//            {'lat':17.326587,'lng':78.60638},
//            {'lat':17.326014,'lng':78.607218},
//            {'lat':17.32555,'lng':78.607923},
//            {'lat':17.325074,'lng':78.608439},
//            {'lat':17.324502,'lng':78.609177},
//            {'lat':17.323883,'lng':78.609988},
//            {'lat':17.323221,'lng':78.610847},
//            {'lat':17.322577,'lng':78.611688},
//            {'lat':17.321877,'lng':78.612606},
//            {'lat':17.321037,'lng':78.61371},
//            {'lat':17.320344,'lng':78.615139},
//            {'lat':17.320065,'lng':78.616832},
//            {'lat':17.320065,'lng':78.616832},
//            {'lat':17.31992,'lng':78.618553},
//            {'lat':17.31992,'lng':78.618553},
//            {'lat':17.320092,'lng':78.620278},
//            {'lat':17.320275,'lng':78.621925},
//            {'lat':17.320464,'lng':78.623609},
//            {'lat':17.320604,'lng':78.625307},
//            {'lat':17.320712,'lng':78.626956},
//            {'lat':17.321062,'lng':78.628649},
//            {'lat':17.321405,'lng':78.63002},
//            {'lat':17.321437,'lng':78.630155},
//            {'lat':17.32176,'lng':78.631427},
//            {'lat':17.322119,'lng':78.632928},
//            {'lat':17.322279,'lng':78.634422},
//            {'lat':17.322272,'lng':78.635779},
//            {'lat':17.322074,'lng':78.637051},
//            {'lat':17.32165,'lng':78.638423},
//            {'lat':17.321182,'lng':78.639831},
//            {'lat':17.320707,'lng':78.641248},
//            {'lat':17.320254,'lng':78.642631},
//            {'lat':17.319827,'lng':78.644033},
//            {'lat':17.319664,'lng':78.645574},
//            {'lat':17.319619,'lng':78.647074},
//            {'lat':17.319666,'lng':78.648567},
//            {'lat':17.31971,'lng':78.649915},
//            {'lat':17.31955,'lng':78.651089},
//            {'lat':17.319203,'lng':78.652079},
//            {'lat':17.318909,'lng':78.65293},
//            {'lat':17.318603,'lng':78.653787},
//            {'lat':17.318259,'lng':78.654701},
//            {'lat':17.317938,'lng':78.655673},
//            {'lat':17.317558,'lng':78.65683},
//            {'lat':17.317335,'lng':78.658233},
//            {'lat':17.317334,'lng':78.659785},
//            {'lat':17.317412,'lng':78.661318},
//            {'lat':17.317481,'lng':78.662372},
//            {'lat':17.317505,'lng':78.662875},
//            {'lat':17.317519,'lng':78.663451},
//            {'lat':17.31746,'lng':78.664256},
//            {'lat':17.317365,'lng':78.66528},
//            {'lat':17.31716,'lng':78.666505},
//            {'lat':17.316788,'lng':78.66782},
//            {'lat':17.316375,'lng':78.66918},
//            {'lat':17.315985,'lng':78.670664},
//            {'lat':17.315584,'lng':78.672346},
//            {'lat':17.315028,'lng':78.674044},
//            {'lat':17.314407,'lng':78.675728},
//            {'lat':17.313825,'lng':78.677257},
//            {'lat':17.31326,'lng':78.678734},
//            {'lat':17.3127,'lng':78.680246},
//            {'lat':17.31218,'lng':78.681547},
//            {'lat':17.311925,'lng':78.682179},
//            {'lat':17.31165,'lng':78.682465},
//            {'lat':17.310823,'lng':78.682249},
//            {'lat':17.309589,'lng':78.681798},
//            {'lat':17.308557,'lng':78.681439},
//            {'lat':17.307144,'lng':78.680943},
//            {'lat':17.305533,'lng':78.680424},
//            {'lat':17.303934,'lng':78.680502},
//            {'lat':17.302577,'lng':78.681005},
//            {'lat':17.301323,'lng':78.681233},
//            {'lat':17.300154,'lng':78.681047},
//            {'lat':17.299,'lng':78.680705},
//            {'lat':17.297865,'lng':78.680377},
//            {'lat':17.296764,'lng':78.680158},
//            {'lat':17.295312,'lng':78.680126},
//            {'lat':17.293903,'lng':78.680099},
//            {'lat':17.292348,'lng':78.680064},
//            {'lat':17.290749,'lng':78.680035},
//            {'lat':17.289318,'lng':78.680007},
//            {'lat':17.288014,'lng':78.680132},
//            {'lat':17.286977,'lng':78.680712},
//            {'lat':17.286237,'lng':78.681146},
//            {'lat':17.285439,'lng':78.681157},
//            {'lat':17.284182,'lng':78.680115},
//            {'lat':17.282904,'lng':78.679811},
//            {'lat':17.281643,'lng':78.679688},
//            {'lat':17.280317,'lng':78.679554},
//            {'lat':17.27895,'lng':78.679421},
//            {'lat':17.277725,'lng':78.679273},
//            {'lat':17.276933,'lng':78.678954},
//            {'lat':17.275817,'lng':78.678636},
//            {'lat':17.274515,'lng':78.678938},
//            {'lat':17.27314,'lng':78.678976},
//            {'lat':17.272159,'lng':78.678716},
//            {'lat':17.271774,'lng':78.67841},
//            {'lat':17.271573,'lng':78.678109},
//            {'lat':17.271441,'lng':78.67804},
//            {'lat':17.271358,'lng':78.678115},
//            {'lat':17.271356,'lng':78.678219},
//            {'lat':17.271557,'lng':78.678533},
//            {'lat':17.271886,'lng':78.679127},
//            {'lat':17.272105,'lng':78.679652},
//            {'lat':17.272204,'lng':78.680724},
//            {'lat':17.271893,'lng':78.681725},
//            {'lat':17.271944,'lng':78.682453},
//            {'lat':17.272342,'lng':78.683165},
//            {'lat':17.272748,'lng':78.683808},
//            {'lat':17.272882,'lng':78.684947},
//            {'lat':17.272687,'lng':78.685843},
//            {'lat':17.272465,'lng':78.686268},
//            {'lat':17.271364,'lng':78.686885},
//            {'lat':17.27013,'lng':78.686392},
//            {'lat':17.269117,'lng':78.685743},
//            {'lat':17.268164,'lng':78.685149},
//            {'lat':17.267208,'lng':78.684388},
//            {'lat':17.266486,'lng':78.68391},
//            {'lat':17.265778,'lng':78.683859},
//            {'lat':17.265468,'lng':78.683991},
//            {'lat':17.265209,'lng':78.683952},
//            {'lat':17.265128,'lng':78.683817},
//            {'lat':17.26529,'lng':78.683165},
//            {'lat':17.265228,'lng':78.68251},
//            {'lat':17.264647,'lng':78.681965},
//            {'lat':17.264108,'lng':78.681987},
//            {'lat':17.26332,'lng':78.682915},
//            {'lat':17.262957,'lng':78.683435},
//            {'lat':17.262907,'lng':78.683415},
//            {'lat':17.262645,'lng':78.683289},
//            {'lat':17.262397,'lng':78.68346},
//            {'lat':17.262279,'lng':78.683561},
//            {'lat':17.26205,'lng':78.683623},
//            {'lat':17.261085,'lng':78.683635},
//            {'lat':17.260095,'lng':78.683633},
//            {'lat':17.259162,'lng':78.683623},
//            {'lat':17.258412,'lng':78.683512},
//            {'lat':17.257883,'lng':78.683044},
//            {'lat':17.257252,'lng':78.682886},
//            {'lat':17.256417,'lng':78.683111},
//            {'lat':17.254942,'lng':78.68313},
//            {'lat':17.253538,'lng':78.683238},
//            {'lat':17.252405,'lng':78.683477},
//            {'lat':17.251274,'lng':78.683663},
//            {'lat':17.250767,'lng':78.68391},
//            {'lat':17.250019,'lng':78.684039},
//            {'lat':17.249943,'lng':78.683939},
//            {'lat':17.250752,'lng':78.683842},
//            {'lat':17.251351,'lng':78.683679},
//            {'lat':17.252075,'lng':78.683556},
//            {'lat':17.252792,'lng':78.683402},
//            {'lat':17.25346,'lng':78.683256},
//            {'lat':17.25508,'lng':78.683113},
//            {'lat':17.256477,'lng':78.683059},
//            {'lat':17.256968,'lng':78.68293},
//            {'lat':17.25733,'lng':78.682847},
//            {'lat':17.257566,'lng':78.682849},
//            {'lat':17.25798,'lng':78.683097},
//            {'lat':17.258521,'lng':78.683543},
//            {'lat':17.260047,'lng':78.68359},
//            {'lat':17.260575,'lng':78.683592},
//            {'lat':17.260969,'lng':78.683599},
//            {'lat':17.261228,'lng':78.683598},
//            {'lat':17.262071,'lng':78.683562},
//            {'lat':17.262312,'lng':78.683365},
//            {'lat':17.26246,'lng':78.683152},
//            {'lat':17.262543,'lng':78.683114},
//            {'lat':17.262686,'lng':78.683184},
//            {'lat':17.262795,'lng':78.683313},
//            {'lat':17.262927,'lng':78.683393},
//            {'lat':17.263022,'lng':78.683357},
//            {'lat':17.263455,'lng':78.682632},
//            {'lat':17.264014,'lng':78.681749},
//            {'lat':17.264059,'lng':78.681699},
//            {'lat':17.264231,'lng':78.681673},
//            {'lat':17.264367,'lng':78.681728},
//            {'lat':17.265032,'lng':78.682155},
//            {'lat':17.265383,'lng':78.682777},
//            {'lat':17.26521,'lng':78.683643},
//            {'lat':17.265249,'lng':78.683889},
//            {'lat':17.265459,'lng':78.683929},
//            {'lat':17.265585,'lng':78.683877},
//            {'lat':17.265852,'lng':78.683762},
//            {'lat':17.266373,'lng':78.683785},
//            {'lat':17.267484,'lng':78.684519},
//            {'lat':17.268287,'lng':78.68513},
//            {'lat':17.268589,'lng':78.685325},
//            {'lat':17.268922,'lng':78.685427},
//            {'lat':17.269025,'lng':78.685578},
//            {'lat':17.269375,'lng':78.685808},
//            {'lat':17.269853,'lng':78.686119},
//            {'lat':17.270418,'lng':78.686473},
//            {'lat':17.270913,'lng':78.686775},
//            {'lat':17.27209,'lng':78.686541},
//            {'lat':17.272468,'lng':78.686262},
//            {'lat':17.27288,'lng':78.684887},
//            {'lat':17.272809,'lng':78.68404},
//            {'lat':17.27208,'lng':78.682754},
//            {'lat':17.271931,'lng':78.682332},
//            {'lat':17.271906,'lng':78.681637},
//            {'lat':17.272147,'lng':78.681022},
//            {'lat':17.272127,'lng':78.67996},
//            {'lat':17.271771,'lng':78.678981},
//            {'lat':17.271274,'lng':78.677953},
//            {'lat':17.271019,'lng':78.677469},
//            {'lat':17.270921,'lng':78.676818},
//            {'lat':17.270995,'lng':78.676508},
//            {'lat':17.271157,'lng':78.676377},
//            {'lat':17.271254,'lng':78.676437},
//            {'lat':17.271149,'lng':78.677053},
//            {'lat':17.27117,'lng':78.677238},
//            {'lat':17.271391,'lng':78.677547},
//            {'lat':17.272033,'lng':78.677969},
//            {'lat':17.272619,'lng':78.678289},
//            {'lat':17.273071,'lng':78.678467},
//            {'lat':17.273279,'lng':78.678492},
//            {'lat':17.273416,'lng':78.678493},
//            {'lat':17.274733,'lng':78.678367},
//            {'lat':17.275535,'lng':78.678125},
//            {'lat':17.275613,'lng':78.67811},
//            {'lat':17.275865,'lng':78.678093},
//            {'lat':17.276034,'lng':78.678106},
//            {'lat':17.276394,'lng':78.678218},
//            {'lat':17.27714,'lng':78.678837},
//            {'lat':17.278907,'lng':78.6792},
//            {'lat':17.2806,'lng':78.679378},
//            {'lat':17.282214,'lng':78.679533},
//            {'lat':17.283783,'lng':78.679689},
//            {'lat':17.284355,'lng':78.679767},
//            {'lat':17.285187,'lng':78.680729},
//            {'lat':17.285519,'lng':78.681028},
//            {'lat':17.285945,'lng':78.681115},
//            {'lat':17.286227,'lng':78.681039},
//            {'lat':17.287497,'lng':78.680285},
//            {'lat':17.288913,'lng':78.679921},
//            {'lat':17.290594,'lng':78.679943},
//            {'lat':17.292274,'lng':78.679969},
//            {'lat':17.292921,'lng':78.679988},
//            {'lat':17.293388,'lng':78.680009},
//            {'lat':17.293688,'lng':78.680012},
//            {'lat':17.293979,'lng':78.680002},
//            {'lat':17.294401,'lng':78.679993},
//            {'lat':17.294672,'lng':78.679999},
//            {'lat':17.296128,'lng':78.680029},
//            {'lat':17.297415,'lng':78.680153},
//            {'lat':17.298858,'lng':78.680567},
//            {'lat':17.30046,'lng':78.681036},
//            {'lat':17.300621,'lng':78.681074},
//            {'lat':17.301112,'lng':78.681144},
//            {'lat':17.301444,'lng':78.681151},
//            {'lat':17.303068,'lng':78.68073},
//            {'lat':17.304664,'lng':78.68027},
//            {'lat':17.306303,'lng':78.68055},
//            {'lat':17.307796,'lng':78.681078},
//            {'lat':17.30915,'lng':78.681564},
//            {'lat':17.309914,'lng':78.681816},
//            {'lat':17.310613,'lng':78.682057},
//            {'lat':17.311271,'lng':78.682299},
//            {'lat':17.311329,'lng':78.682322},
//            {'lat':17.31151,'lng':78.682382},
//            {'lat':17.311623,'lng':78.682378},
//            {'lat':17.311785,'lng':78.682209},
//            {'lat':17.31221,'lng':78.681234},
//            {'lat':17.31267,'lng':78.680218},
//            {'lat':17.313089,'lng':78.6791},
//            {'lat':17.313523,'lng':78.677924},
//            {'lat':17.313947,'lng':78.676783},
//            {'lat':17.314415,'lng':78.675537},
//            {'lat':17.314869,'lng':78.6743},
//            {'lat':17.315293,'lng':78.673127},
//            {'lat':17.315644,'lng':78.671924},
//            {'lat':17.315957,'lng':78.670619},
//            {'lat':17.316335,'lng':78.669214},
//            {'lat':17.316769,'lng':78.667752},
//            {'lat':17.317182,'lng':78.666285},
//            {'lat':17.317369,'lng':78.664834},
//            {'lat':17.317448,'lng':78.663396},
//            {'lat':17.317417,'lng':78.661868},
//            {'lat':17.317288,'lng':78.660235},
//            {'lat':17.31722,'lng':78.658624},
//            {'lat':17.317385,'lng':78.657089},
//            {'lat':17.317842,'lng':78.65563},
//            {'lat':17.318244,'lng':78.654434},
//            {'lat':17.31869,'lng':78.653354},
//            {'lat':17.319149,'lng':78.652097},
//            {'lat':17.319583,'lng':78.650865},
//            {'lat':17.319668,'lng':78.649508},
//            {'lat':17.319624,'lng':78.647973},
//            {'lat':17.319582,'lng':78.646381},
//            {'lat':17.319697,'lng':78.644766},
//            {'lat':17.31997,'lng':78.643397},
//            {'lat':17.320352,'lng':78.642244},
//            {'lat':17.320639,'lng':78.641387},
//            {'lat':17.320996,'lng':78.640307},
//            {'lat':17.321439,'lng':78.638964},
//            {'lat':17.321882,'lng':78.637547},
//            {'lat':17.322117,'lng':78.63612},
//            {'lat':17.322215,'lng':78.63477},
//            {'lat':17.32215,'lng':78.633584},
//            {'lat':17.321913,'lng':78.632223},
//            {'lat':17.321579,'lng':78.6309},
//            {'lat':17.321246,'lng':78.62958},
//            {'lat':17.32091,'lng':78.628188},
//            {'lat':17.320639,'lng':78.626776},
//            {'lat':17.320559,'lng':78.62536},
//            {'lat':17.320442,'lng':78.623789},
//            {'lat':17.320252,'lng':78.622209},
//            {'lat':17.320087,'lng':78.62068},
//            {'lat':17.319913,'lng':78.619099},
//            {'lat':17.319932,'lng':78.617438},
//            {'lat':17.320169,'lng':78.615795},
//            {'lat':17.320464,'lng':78.614509},
//            {'lat':17.321077,'lng':78.613532},
//            {'lat':17.32186,'lng':78.612509},
//            {'lat':17.322505,'lng':78.611636},
//            {'lat':17.322771,'lng':78.611191},
//            {'lat':17.322901,'lng':78.61104},
//            {'lat':17.323053,'lng':78.610865},
//            {'lat':17.323297,'lng':78.610563},
//            {'lat':17.323596,'lng':78.610192},
//            {'lat':17.324456,'lng':78.6091},
//            {'lat':17.32511,'lng':78.608277},
//            {'lat':17.325455,'lng':78.607807},
//            {'lat':17.32576,'lng':78.607407},
//            {'lat':17.326025,'lng':78.607061},
//            {'lat':17.32612,'lng':78.60692},
//            {'lat':17.326349,'lng':78.606652},
//            {'lat':17.32652,'lng':78.606412},
//            {'lat':17.326713,'lng':78.606009},
//            {'lat':17.326845,'lng':78.605587},
//            {'lat':17.326994,'lng':78.604819},
//            {'lat':17.32708,'lng':78.604362},
//            {'lat':17.327238,'lng':78.603549},
//            {'lat':17.327315,'lng':78.60302},
//            {'lat':17.327413,'lng':78.602382},
//            {'lat':17.327548,'lng':78.601667},
//            {'lat':17.327746,'lng':78.60095},
//            {'lat':17.327974,'lng':78.600205},
//            {'lat':17.32819,'lng':78.599499},
//            {'lat':17.3284,'lng':78.598868},
//            {'lat':17.328633,'lng':78.598139},
//            {'lat':17.328867,'lng':78.597358},
//            {'lat':17.329096,'lng':78.596638},
//            {'lat':17.329319,'lng':78.595921},
//            {'lat':17.329464,'lng':78.595503},
//            {'lat':17.329662,'lng':78.594909},
//            {'lat':17.329912,'lng':78.594306},
//            {'lat':17.330162,'lng':78.593774},
//            {'lat':17.33038,'lng':78.593258},
//            {'lat':17.330644,'lng':78.592744},
//            {'lat':17.330967,'lng':78.592204},
//            {'lat':17.331289,'lng':78.591667},
//            {'lat':17.331599,'lng':78.591138},
//            {'lat':17.33188,'lng':78.59064},
//            {'lat':17.332187,'lng':78.590135},
//            {'lat':17.332524,'lng':78.589543},
//            {'lat':17.332857,'lng':78.588986},
//            {'lat':17.333151,'lng':78.588472},
//            {'lat':17.333452,'lng':78.58794},
//            {'lat':17.33372,'lng':78.587397},
//            {'lat':17.333945,'lng':78.586938},
//            {'lat':17.334131,'lng':78.586517},
//            {'lat':17.334315,'lng':78.586112},
//            {'lat':17.334482,'lng':78.585782},
//            {'lat':17.334662,'lng':78.585429},
//            {'lat':17.3348,'lng':78.585104},
//            {'lat':17.335069,'lng':78.585037},
//            {'lat':17.335062,'lng':78.585168},
//            {'lat':17.334969,'lng':78.585355},
//            {'lat':17.334836,'lng':78.58561},
//            {'lat':17.334677,'lng':78.585935},
//            {'lat':17.334505,'lng':78.586287},
//            {'lat':17.334244,'lng':78.586832},
//            {'lat':17.333957,'lng':78.587425},
//            {'lat':17.333692,'lng':78.587992},
//            {'lat':17.333417,'lng':78.588483},
//            {'lat':17.333209,'lng':78.588881},
//            {'lat':17.332929,'lng':78.589309},
//            {'lat':17.332798,'lng':78.589513},
//            {'lat':17.331773,'lng':78.591131},
//            {'lat':17.331257,'lng':78.591907},
//            {'lat':17.330772,'lng':78.592772},
//            {'lat':17.330352,'lng':78.593699},
//            {'lat':17.329955,'lng':78.594628},
//            {'lat':17.329706,'lng':78.595297},
//            {'lat':17.329437,'lng':78.596112},
//            {'lat':17.32916,'lng':78.596944},
//            {'lat':17.328915,'lng':78.597747},
//            {'lat':17.328698,'lng':78.598433},
//            {'lat':17.3285,'lng':78.599053},
//            {'lat':17.328235,'lng':78.599749},
//            {'lat':17.327931,'lng':78.600657},
//            {'lat':17.327605,'lng':78.601809},
//            {'lat':17.327445,'lng':78.602755},
//            {'lat':17.327242,'lng':78.603752},
//            {'lat':17.327095,'lng':78.604574},
//            {'lat':17.32702,'lng':78.605015},
//            {'lat':17.326957,'lng':78.605297},
//            {'lat':17.326856,'lng':78.605739},
//            {'lat':17.326569,'lng':78.606457},
//            {'lat':17.32605,'lng':78.607219},
//            {'lat':17.325662,'lng':78.607799},
//            {'lat':17.325323,'lng':78.608169},
//            {'lat':17.324844,'lng':78.608727},
//            {'lat':17.324348,'lng':78.609368},
//            {'lat':17.323828,'lng':78.610055},
//            {'lat':17.323272,'lng':78.610783},
//            {'lat':17.32263,'lng':78.611623},
//            {'lat':17.321896,'lng':78.612576},
//            {'lat':17.321059,'lng':78.613674},
//            {'lat':17.320425,'lng':78.614815},
//            {'lat':17.32015,'lng':78.616232},
//            {'lat':17.319935,'lng':78.617758},
//            {'lat':17.319935,'lng':78.617758},
//            {'lat':17.319985,'lng':78.619314},
//            {'lat':17.319985,'lng':78.619314},
//            {'lat':17.32015,'lng':78.620819},
//            {'lat':17.320351,'lng':78.622648},
//            {'lat':17.320394,'lng':78.622987},
//            {'lat':17.320599,'lng':78.624724},
//            {'lat':17.320693,'lng':78.626522},
//            {'lat':17.320985,'lng':78.628357},
//            {'lat':17.321414,'lng':78.630082},
//            {'lat':17.321848,'lng':78.631732},
//            {'lat':17.322192,'lng':78.633279},
//            {'lat':17.322282,'lng':78.634662},
//            {'lat':17.322198,'lng':78.636204},
//            {'lat':17.321848,'lng':78.637832},
//            {'lat':17.321329,'lng':78.639414},
//            {'lat':17.320804,'lng':78.640992},
//            {'lat':17.320314,'lng':78.642458},
//            {'lat':17.319854,'lng':78.643979},
//            {'lat':17.31967,'lng':78.645636},
//            {'lat':17.319628,'lng':78.647148},
//            {'lat':17.319668,'lng':78.648523},
//            {'lat':17.319716,'lng':78.64999},
//            {'lat':17.319452,'lng':78.651412},
//            {'lat':17.319035,'lng':78.65256},
//            {'lat':17.318613,'lng':78.653739},
//            {'lat':17.318178,'lng':78.654949},
//            {'lat':17.317729,'lng':78.656189},
//            {'lat':17.317389,'lng':78.657566},
//            {'lat':17.317284,'lng':78.659099},
//            {'lat':17.317379,'lng':78.660652},
//            {'lat':17.31747,'lng':78.662079},
//            {'lat':17.317484,'lng':78.663353},
//            {'lat':17.317429,'lng':78.664567},
//            {'lat':17.317299,'lng':78.665886},
//            {'lat':17.317021,'lng':78.667188},
//            {'lat':17.316848,'lng':78.667786},
//            {'lat':17.316683,'lng':78.668327},
//            {'lat':17.316459,'lng':78.669086},
//            {'lat':17.316169,'lng':78.670054},
//            {'lat':17.315859,'lng':78.671183},
//            {'lat':17.31552,'lng':78.672567},
//            {'lat':17.31503,'lng':78.674107},
//            {'lat':17.314389,'lng':78.67574},
//            {'lat':17.313757,'lng':78.677418},
//            {'lat':17.313087,'lng':78.679216},
//            {'lat':17.312377,'lng':78.681024},
//            {'lat':17.311929,'lng':78.682187},
//            {'lat':17.311773,'lng':78.682424},
//            {'lat':17.311498,'lng':78.682493},
//            {'lat':17.310554,'lng':78.682172},
//            {'lat':17.309888,'lng':78.681927},
//            {'lat':17.30911,'lng':78.681634},
//            {'lat':17.307936,'lng':78.681227},
//            {'lat':17.306463,'lng':78.680712},
//            {'lat':17.304875,'lng':78.680365},
//            {'lat':17.30346,'lng':78.680654},
//            {'lat':17.302229,'lng':78.681123},
//            {'lat':17.300883,'lng':78.681225},
//            {'lat':17.299827,'lng':78.680964},
//            {'lat':17.298755,'lng':78.680643},
//            {'lat':17.297717,'lng':78.680338},
//            {'lat':17.296609,'lng':78.680154},
//            {'lat':17.295234,'lng':78.680122},
//            {'lat':17.293623,'lng':78.680112},
//            {'lat':17.291959,'lng':78.680094},
//            {'lat':17.290334,'lng':78.680058},
//            {'lat':17.288914,'lng':78.680029},
//            {'lat':17.287802,'lng':78.680241},
//            {'lat':17.286717,'lng':78.68088},
//            {'lat':17.286229,'lng':78.681173},
//            {'lat':17.285434,'lng':78.681173},
//            {'lat':17.284222,'lng':78.68015},
//            {'lat':17.283003,'lng':78.679821},
//            {'lat':17.281704,'lng':78.679688},
//            {'lat':17.280358,'lng':78.679554},
//            {'lat':17.279088,'lng':78.679432},
//            {'lat':17.277845,'lng':78.679299},
//            {'lat':17.27715,'lng':78.679051},
//            {'lat':17.276267,'lng':78.678721},
//            {'lat':17.275779,'lng':78.678625},
//            {'lat':17.274267,'lng':78.678973},
//            {'lat':17.272888,'lng':78.678919},
//            {'lat':17.271907,'lng':78.678553},
//            {'lat':17.271682,'lng':78.678264},
//            {'lat':17.271534,'lng':78.678066},
//            {'lat':17.271389,'lng':78.678045},
//            {'lat':17.271337,'lng':78.678152},
//            {'lat':17.271363,'lng':78.678238},
//            {'lat':17.271721,'lng':78.678823},
//            {'lat':17.272119,'lng':78.679697},
//            {'lat':17.27219,'lng':78.680902},
//            {'lat':17.271922,'lng':78.681609},
//            {'lat':17.271915,'lng':78.682244},
//            {'lat':17.272169,'lng':78.682889},
//            {'lat':17.272693,'lng':78.683689},
//            {'lat':17.272847,'lng':78.684098},
//            {'lat':17.272865,'lng':78.685142},
//            {'lat':17.272624,'lng':78.68605},
//            {'lat':17.272325,'lng':78.686434},
//            {'lat':17.271415,'lng':78.686867},
//            {'lat':17.270205,'lng':78.686455},
//            {'lat':17.26923,'lng':78.685847},
//            {'lat':17.268395,'lng':78.685327},
//            {'lat':17.267463,'lng':78.684602},
//            {'lat':17.26642,'lng':78.683882},
//            {'lat':17.265954,'lng':78.683788},
//            {'lat':17.26564,'lng':78.683919},
//            {'lat':17.265355,'lng':78.684002},
//            {'lat':17.265196,'lng':78.683952},
//            {'lat':17.26512,'lng':78.683655},
//            {'lat':17.265298,'lng':78.683091},
//            {'lat':17.265193,'lng':78.682463},
//            {'lat':17.264612,'lng':78.681953},
//            {'lat':17.264083,'lng':78.682009},
//            {'lat':17.263315,'lng':78.682947},
//            {'lat':17.263124,'lng':78.683357},
//            {'lat':17.262792,'lng':78.683351},
//            {'lat':17.262677,'lng':78.683307},
//            {'lat':17.262544,'lng':78.683272},
//            {'lat':17.262459,'lng':78.683309},
//            {'lat':17.262116,'lng':78.683605},
//            {'lat':17.261797,'lng':78.683635},
//            {'lat':17.260794,'lng':78.683662},
//            {'lat':17.259757,'lng':78.68365},
//            {'lat':17.258828,'lng':78.683629},
//            {'lat':17.258168,'lng':78.683353},
//            {'lat':17.257648,'lng':78.682919},
//            {'lat':17.25722,'lng':78.682891},
//            {'lat':17.256416,'lng':78.683117},
//            {'lat':17.25501,'lng':78.683135},
//            {'lat':17.253686,'lng':78.683208},
//            {'lat':17.25248,'lng':78.683453},
//            {'lat':17.251282,'lng':78.683667},
//            {'lat':17.250761,'lng':78.683896},
//            {'lat':17.250071,'lng':78.683964},
//            {'lat':17.25009,'lng':78.683826},
//            {'lat':17.250945,'lng':78.683752},
//            {'lat':17.251615,'lng':78.68361},
//            {'lat':17.252357,'lng':78.683483},
//            {'lat':17.253037,'lng':78.683342},
//            {'lat':17.253755,'lng':78.683225},
//            {'lat':17.255143,'lng':78.683085},
//            {'lat':17.255634,'lng':78.683073},
//            {'lat':17.256,'lng':78.683074},
//            {'lat':17.256244,'lng':78.683062},
//            {'lat':17.256861,'lng':78.682912},
//            {'lat':17.257224,'lng':78.682819},
//            {'lat':17.257462,'lng':78.682812},
//            {'lat':17.257922,'lng':78.683039},
//            {'lat':17.25832,'lng':78.683424},
//            {'lat':17.258684,'lng':78.683557},
//            {'lat':17.258947,'lng':78.683562},
//            {'lat':17.259214,'lng':78.683563},
//            {'lat':17.259637,'lng':78.683564},
//            {'lat':17.259933,'lng':78.683567},
//            {'lat':17.260678,'lng':78.683575},
//            {'lat':17.261126,'lng':78.683577},
//            {'lat':17.261414,'lng':78.683585},
//            {'lat':17.261414,'lng':78.683585},
//            {'lat':17.261817,'lng':78.683598},
//            {'lat':17.262052,'lng':78.683553},
//            {'lat':17.262355,'lng':78.683227},
//            {'lat':17.262459,'lng':78.683128},
//            {'lat':17.262585,'lng':78.683124},
//            {'lat':17.262667,'lng':78.683189},
//            {'lat':17.262703,'lng':78.683231},
//            {'lat':17.262815,'lng':78.683355},
//            {'lat':17.262907,'lng':78.68339},
//            {'lat':17.26307,'lng':78.68323},
//            {'lat':17.26364,'lng':78.682299},
//            {'lat':17.263944,'lng':78.681805},
//            {'lat':17.264082,'lng':78.68167},
//            {'lat':17.264264,'lng':78.681674},
//            {'lat':17.264399,'lng':78.681729},
//            {'lat':17.265179,'lng':78.682312},
//            {'lat':17.265364,'lng':78.68273},
//            {'lat':17.265219,'lng':78.683543},
//            {'lat':17.265197,'lng':78.683789},
//            {'lat':17.265345,'lng':78.683919},
//            {'lat':17.265463,'lng':78.6839},
//            {'lat':17.26591,'lng':78.683709},
//            {'lat':17.266349,'lng':78.68375},
//            {'lat':17.267275,'lng':78.684343},
//            {'lat':17.267954,'lng':78.68488},
//            {'lat':17.268629,'lng':78.685339},
//            {'lat':17.26906,'lng':78.685612},
//            {'lat':17.269819,'lng':78.686095},
//            {'lat':17.270794,'lng':78.68672},
//            {'lat':17.270895,'lng':78.686775},
//            {'lat':17.271218,'lng':78.686835},
//            {'lat':17.271436,'lng':78.686778},
//            {'lat':17.272293,'lng':78.686415},
//            {'lat':17.272544,'lng':78.686131},
//            {'lat':17.272842,'lng':78.685106},
//            {'lat':17.272785,'lng':78.683943},
//            {'lat':17.27205,'lng':78.68274},
//            {'lat':17.271894,'lng':78.682262},
//            {'lat':17.272042,'lng':78.681233},
//            {'lat':17.272155,'lng':78.680952},
//            {'lat':17.272135,'lng':78.67998},
//            {'lat':17.27208,'lng':78.679637},
//            {'lat':17.271632,'lng':78.678704},
//            {'lat':17.271337,'lng':78.678154},
//            {'lat':17.271007,'lng':78.677387},
//            {'lat':17.270929,'lng':78.676817},
//            {'lat':17.270991,'lng':78.676542},
//            {'lat':17.271107,'lng':78.676378},
//            {'lat':17.271205,'lng':78.676377},
//            {'lat':17.271247,'lng':78.676405},
//            {'lat':17.271255,'lng':78.676538},
//            {'lat':17.27121,'lng':78.676659},
//            {'lat':17.271149,'lng':78.676903},
//            {'lat':17.271184,'lng':78.677237},
//            {'lat':17.271343,'lng':78.677485},
//            {'lat':17.27174,'lng':78.677758},
//            {'lat':17.272163,'lng':78.678039},
//            {'lat':17.272671,'lng':78.678295},
//            {'lat':17.273199,'lng':78.678471},
//            {'lat':17.273317,'lng':78.67848},
//            {'lat':17.273399,'lng':78.678479},
//            {'lat':17.275461,'lng':78.678147},
//            {'lat':17.275564,'lng':78.678117},
//            {'lat':17.275758,'lng':78.678082},
//            {'lat':17.275897,'lng':78.678082},
//            {'lat':17.276354,'lng':78.678207},
//            {'lat':17.277122,'lng':78.678825},
//            {'lat':17.278917,'lng':78.679218},
//            {'lat':17.280645,'lng':78.679388},
//            {'lat':17.282272,'lng':78.679544},
//            {'lat':17.28391,'lng':78.679687},
//            {'lat':17.284488,'lng':78.67982},
//            {'lat':17.285192,'lng':78.68074},
//            {'lat':17.285382,'lng':78.680938},
//            {'lat':17.28573,'lng':78.681094},
//            {'lat':17.285995,'lng':78.681099},
//            {'lat':17.287308,'lng':78.680394},
//            {'lat':17.287808,'lng':78.680085},
//            {'lat':17.288216,'lng':78.679949},
//            {'lat':17.288683,'lng':78.679894},
//            {'lat':17.289015,'lng':78.679894},
//            {'lat':17.290747,'lng':78.679937},
//            {'lat':17.292519,'lng':78.679976},
//            {'lat':17.293208,'lng':78.679998},
//            {'lat':17.293699,'lng':78.68001},
//            {'lat':17.294013,'lng':78.680012},
//            {'lat':17.295393,'lng':78.680012},
//            {'lat':17.295755,'lng':78.680017},
//            {'lat':17.296102,'lng':78.680024},
//            {'lat':17.296329,'lng':78.680023},
//            {'lat':17.297583,'lng':78.68018},
//            {'lat':17.298998,'lng':78.680628},
//            {'lat':17.300655,'lng':78.681101},
//            {'lat':17.300832,'lng':78.681132},
//            {'lat':17.301366,'lng':78.681166},
//            {'lat':17.301724,'lng':78.681144},
//            {'lat':17.303429,'lng':78.680572},
//            {'lat':17.304269,'lng':78.68031},
//            {'lat':17.304793,'lng':78.680259},
//            {'lat':17.30515,'lng':78.68027},
//            {'lat':17.306827,'lng':78.680748},
//            {'lat':17.308337,'lng':78.681291},
//            {'lat':17.309619,'lng':78.681742},
//            {'lat':17.309955,'lng':78.681857},
//            {'lat':17.310348,'lng':78.681998},
//            {'lat':17.311027,'lng':78.682233},
//            {'lat':17.311359,'lng':78.68236},
//            {'lat':17.311493,'lng':78.682415},
//            {'lat':17.31158,'lng':78.682424},
//            {'lat':17.311748,'lng':78.682284},
//            {'lat':17.312114,'lng':78.681402},
//            {'lat':17.312458,'lng':78.680565},
//            {'lat':17.312796,'lng':78.6797},
//            {'lat':17.313163,'lng':78.678721},
//            {'lat':17.31356,'lng':78.67767},
//            {'lat':17.313948,'lng':78.676633},
//            {'lat':17.314382,'lng':78.675487},
//            {'lat':17.314824,'lng':78.674412},
//            {'lat':17.31521,'lng':78.673389},
//            {'lat':17.31554,'lng':78.672338},
//            {'lat':17.31582,'lng':78.671188},
//            {'lat':17.31611,'lng':78.670013},
//            {'lat':17.316482,'lng':78.66872},
//            {'lat':17.316804,'lng':78.66763},
//            {'lat':17.317143,'lng':78.666452},
//            {'lat':17.317354,'lng':78.665056},
//            {'lat':17.317448,'lng':78.663604},
//            {'lat':17.317432,'lng':78.662112},
//            {'lat':17.317313,'lng':78.660564},
//            {'lat':17.317218,'lng':78.658984},
//            {'lat':17.317322,'lng':78.657533},
//            {'lat':17.317708,'lng':78.656078},
//            {'lat':17.318184,'lng':78.654588},
//            {'lat':17.31866,'lng':78.653428},
//            {'lat':17.319155,'lng':78.652059},
//            {'lat':17.319617,'lng':78.650695},
//            {'lat':17.319657,'lng':78.649122},
//            {'lat':17.319603,'lng':78.647455},
//            {'lat':17.319621,'lng':78.645809},
//            {'lat':17.31974,'lng':78.644482},
//            {'lat':17.320048,'lng':78.643197},
//            {'lat':17.320428,'lng':78.641987},
//            {'lat':17.320772,'lng':78.640969},
//            {'lat':17.32115,'lng':78.63982},
//            {'lat':17.321587,'lng':78.638503},
//            {'lat':17.321984,'lng':78.637058},
//            {'lat':17.32222,'lng':78.635541},
//            {'lat':17.32222,'lng':78.633909},
//            {'lat':17.32191,'lng':78.632195},
//            {'lat':17.321486,'lng':78.630514},
//            {'lat':17.321087,'lng':78.628945},
//            {'lat':17.32071,'lng':78.62739},
//            {'lat':17.320557,'lng':78.625839},
//            {'lat':17.320457,'lng':78.62421},
//            {'lat':17.320282,'lng':78.622681},
//            {'lat':17.32011,'lng':78.621166},
//            {'lat':17.319937,'lng':78.619618},
//            {'lat':17.319847,'lng':78.618044},
//            {'lat':17.320095,'lng':78.616368},
//            {'lat':17.320385,'lng':78.614765},
//            {'lat':17.321155,'lng':78.613465},
//            {'lat':17.322072,'lng':78.612265},
//            {'lat':17.323009,'lng':78.611043},
//            {'lat':17.323978,'lng':78.609767},
//            {'lat':17.324818,'lng':78.608632},
//            {'lat':17.325245,'lng':78.608076},
//            {'lat':17.325474,'lng':78.607802},
//            {'lat':17.325787,'lng':78.607405},
//            {'lat':17.326279,'lng':78.606776},
//            {'lat':17.326739,'lng':78.605952},
//            {'lat':17.326909,'lng':78.605305},
//            {'lat':17.327013,'lng':78.604734},
//            {'lat':17.327155,'lng':78.603955},
//            {'lat':17.327294,'lng':78.603069},
//            {'lat':17.327341,'lng':78.602497},
//            {'lat':17.327439,'lng':78.601965},
//            {'lat':17.327621,'lng':78.601271},
//            {'lat':17.327832,'lng':78.600558},
//            {'lat':17.32801,'lng':78.599902},
//            {'lat':17.328158,'lng':78.599438},
//            {'lat':17.328288,'lng':78.599152},
//            {'lat':17.328506,'lng':78.59848},
//            {'lat':17.328815,'lng':78.597582},
//            {'lat':17.329167,'lng':78.596534},
//            {'lat':17.329449,'lng':78.595584},
//            {'lat':17.329744,'lng':78.594654},
//            {'lat':17.330019,'lng':78.593976},
//            {'lat':17.330169,'lng':78.593667},
//            {'lat':17.330445,'lng':78.593098},
//            {'lat':17.330878,'lng':78.592342},
//            {'lat':17.331407,'lng':78.591512},
//            {'lat':17.331881,'lng':78.590694},
//            {'lat':17.332215,'lng':78.590077},
//            {'lat':17.332509,'lng':78.589509},
//            {'lat':17.332487,'lng':78.589955},
//            {'lat':17.332321,'lng':78.590243},
//            {'lat':17.332079,'lng':78.590684},
//            {'lat':17.331877,'lng':78.591027},
//            {'lat':17.331587,'lng':78.591489},
//            {'lat':17.331242,'lng':78.59201},
//            {'lat':17.330834,'lng':78.592683},
//            {'lat':17.330459,'lng':78.59342},
//            {'lat':17.330113,'lng':78.594171},
//            {'lat':17.329736,'lng':78.595089},
//            {'lat':17.329419,'lng':78.596065},
//            {'lat':17.32904,'lng':78.597261},
//            {'lat':17.328624,'lng':78.598573},
//            {'lat':17.328242,'lng':78.599737},
//            {'lat':17.327827,'lng':78.601017},
//            {'lat':17.327513,'lng':78.602307},
//            {'lat':17.327316,'lng':78.603424},
//            {'lat':17.327195,'lng':78.604086},
//            {'lat':17.327092,'lng':78.604687},
//            {'lat':17.327028,'lng':78.605041},
//            {'lat':17.326967,'lng':78.60536},
//            {'lat':17.326793,'lng':78.605993},
//            {'lat':17.326397,'lng':78.606735},
//            {'lat':17.325822,'lng':78.607502},
//            {'lat':17.325464,'lng':78.607955},
//            {'lat':17.32498,'lng':78.608544},
//            {'lat':17.324332,'lng':78.60938},
//            {'lat':17.323609,'lng':78.610319},
//            {'lat':17.322849,'lng':78.61131},
//            {'lat':17.321957,'lng':78.612474},
//            {'lat':17.321194,'lng':78.613509},
//            {'lat':17.320649,'lng':78.614257},
//            {'lat':17.320274,'lng':78.615453},
//            {'lat':17.320055,'lng':78.616932},
//            {'lat':17.319925,'lng':78.618442},
//            {'lat':17.320062,'lng':78.61985},
//            {'lat':17.320062,'lng':78.61985},
//            {'lat':17.320204,'lng':78.621153},
//            {'lat':17.320204,'lng':78.621153},
//            {'lat':17.320347,'lng':78.622457},
//            {'lat':17.320347,'lng':78.622457},
//            {'lat':17.320485,'lng':78.623653},
//            {'lat':17.320594,'lng':78.624917},
//            {'lat':17.320687,'lng':78.626273},
//            {'lat':17.320825,'lng':78.627571},
//            {'lat':17.321105,'lng':78.628796},
//            {'lat':17.32131,'lng':78.629665},
//            {'lat':17.321498,'lng':78.630383},
//            {'lat':17.321784,'lng':78.631515},
//            {'lat':17.322112,'lng':78.63278},
//            {'lat':17.32231,'lng':78.634278},
//            {'lat':17.32228,'lng':78.635597},
//            {'lat':17.3221,'lng':78.636851},
//            {'lat':17.32173,'lng':78.638232},
//            {'lat':17.321485,'lng':78.638982},
//            {'lat':17.321142,'lng':78.640003},
//            {'lat':17.320744,'lng':78.641222},
//            {'lat':17.32031,'lng':78.642534},
//            {'lat':17.319863,'lng':78.643983},
//            {'lat':17.319682,'lng':78.645611},
//            {'lat':17.319638,'lng':78.647236},
//            {'lat':17.319693,'lng':78.648872},
//            {'lat':17.319707,'lng':78.650525},
//            {'lat':17.319227,'lng':78.65206},
//            {'lat':17.318698,'lng':78.653547},
//            {'lat':17.31818,'lng':78.654976},
//            {'lat':17.317666,'lng':78.656437},
//            {'lat':17.317355,'lng':78.657999},
//            {'lat':17.317304,'lng':78.659585},
//            {'lat':17.317411,'lng':78.660991},
//            {'lat':17.317487,'lng':78.662249},
//            {'lat':17.317494,'lng':78.663392},
//            {'lat':17.317454,'lng':78.664477},
//            {'lat':17.317332,'lng':78.665594},
//            {'lat':17.317069,'lng':78.666895},
//            {'lat':17.316729,'lng':78.668128},
//            {'lat':17.316349,'lng':78.669437},
//            {'lat':17.315964,'lng':78.670937},
//            {'lat':17.315554,'lng':78.672549},
//            {'lat':17.315017,'lng':78.674119},
//            {'lat':17.314439,'lng':78.675719},
//            {'lat':17.313852,'lng':78.677263},
//            {'lat':17.313272,'lng':78.678752},
//            {'lat':17.312724,'lng':78.680216},
//            {'lat':17.31218,'lng':78.681587},
//            {'lat':17.311933,'lng':78.682199},
//            {'lat':17.311632,'lng':78.682478},
//            {'lat':17.310657,'lng':78.682204},
//            {'lat':17.310004,'lng':78.681962},
//            {'lat':17.309466,'lng':78.681757},
//            {'lat':17.309324,'lng':78.681738},
//            {'lat':17.309205,'lng':78.681835},
//            {'lat':17.309169,'lng':78.681927},
//            {'lat':17.309164,'lng':78.682208},
//            {'lat':17.309135,'lng':78.682324},
//            {'lat':17.309057,'lng':78.682372},
//            {'lat':17.309007,'lng':78.68236},
//            {'lat':17.308937,'lng':78.682302},
//            {'lat':17.308899,'lng':78.682155},
//            {'lat':17.308983,'lng':78.681951},
//            {'lat':17.309024,'lng':78.68172},
//            {'lat':17.308884,'lng':78.681538},
//            {'lat':17.308389,'lng':78.681355},
//            {'lat':17.307091,'lng':78.680897},
//            {'lat':17.305901,'lng':78.680473},
//            {'lat':17.30459,'lng':78.680329},
//            {'lat':17.303423,'lng':78.680639},
//            {'lat':17.302285,'lng':78.681082},
//            {'lat':17.301029,'lng':78.681192},
//            {'lat':17.299869,'lng':78.680934},
//            {'lat':17.298644,'lng':78.680572},
//            {'lat':17.297407,'lng':78.68022},
//            {'lat':17.29606,'lng':78.680102},
//            {'lat':17.294507,'lng':78.680086},
//            {'lat':17.292818,'lng':78.680055},
//            {'lat':17.291242,'lng':78.680015},
//            {'lat':17.289849,'lng':78.67999},
//            {'lat':17.288442,'lng':78.679995},
//            {'lat':17.287357,'lng':78.680443},
//            {'lat':17.286166,'lng':78.681161},
//            {'lat':17.285649,'lng':78.681215},
//            {'lat':17.284403,'lng':78.680199},
//            {'lat':17.283119,'lng':78.679781},
//            {'lat':17.281772,'lng':78.679645},
//            {'lat':17.280393,'lng':78.679498},
//            {'lat':17.279022,'lng':78.679363},
//            {'lat':17.277714,'lng':78.679213},
//            {'lat':17.276793,'lng':78.678852},
//            {'lat':17.275691,'lng':78.678595},
//            {'lat':17.274456,'lng':78.678926},
//            {'lat':17.273048,'lng':78.678953},
//            {'lat':17.272136,'lng':78.678689},
//            {'lat':17.271818,'lng':78.67842},
//            {'lat':17.271553,'lng':78.678062},
//            {'lat':17.271375,'lng':78.678082},
//            {'lat':17.271364,'lng':78.678145},
//            {'lat':17.271385,'lng':78.678218},
//            {'lat':17.271705,'lng':78.678759},
//            {'lat':17.272108,'lng':78.679602},
//            {'lat':17.272209,'lng':78.680477},
//            {'lat':17.272223,'lng':78.680847},
//            {'lat':17.271936,'lng':78.68161},
//            {'lat':17.271904,'lng':78.68193},
//            {'lat':17.271921,'lng':78.68234},
//            {'lat':17.272487,'lng':78.683348},
//            {'lat':17.272732,'lng':78.683729},
//            {'lat':17.27291,'lng':78.684885},
//            {'lat':17.272653,'lng':78.685993},
//            {'lat':17.272361,'lng':78.6864},
//            {'lat':17.271348,'lng':78.686889},
//            {'lat':17.27041,'lng':78.686548},
//            {'lat':17.269568,'lng':78.686019},
//            {'lat':17.268659,'lng':78.685456},
//            {'lat':17.267798,'lng':78.68485},
//            {'lat':17.266805,'lng':78.684104},
//            {'lat':17.266392,'lng':78.683848},
//            {'lat':17.265785,'lng':78.683835},
//            {'lat':17.265523,'lng':78.683956},
//            {'lat':17.26526,'lng':78.683957},
//            {'lat':17.265137,'lng':78.683845},
//            {'lat':17.2653,'lng':78.683131},
//            {'lat':17.265238,'lng':78.682488},
//            {'lat':17.264613,'lng':78.681922},
//            {'lat':17.264089,'lng':78.681972},
//            {'lat':17.263341,'lng':78.682908},
//            {'lat':17.263158,'lng':78.683314},
//            {'lat':17.262668,'lng':78.683279},
//            {'lat':17.262219,'lng':78.683497},
//            {'lat':17.262087,'lng':78.683564},
//            {'lat':17.260975,'lng':78.683616},
//            {'lat':17.259569,'lng':78.683612},
//            {'lat':17.258655,'lng':78.683582},
//            {'lat':17.257954,'lng':78.683078},
//            {'lat':17.257327,'lng':78.682858},
//            {'lat':17.256391,'lng':78.683092},
//            {'lat':17.254968,'lng':78.683107},
//            {'lat':17.25362,'lng':78.683201},
//            {'lat':17.252527,'lng':78.683434},
//            {'lat':17.251432,'lng':78.683625},
//            {'lat':17.251125,'lng':78.683709},
//            {'lat':17.250754,'lng':78.683917},
//            {'lat':17.250428,'lng':78.683784},
//            {'lat':17.250692,'lng':78.683814},
//            {'lat':17.251266,'lng':78.683647},
//            {'lat':17.252043,'lng':78.683544},
//            {'lat':17.252719,'lng':78.683389},
//            {'lat':17.253369,'lng':78.683255},
//            {'lat':17.25423,'lng':78.683169},
//            {'lat':17.255565,'lng':78.683084},
//            {'lat':17.256902,'lng':78.682898},
//            {'lat':17.257025,'lng':78.682864},
//            {'lat':17.25738,'lng':78.682809},
//            {'lat':17.257623,'lng':78.682856},
//            {'lat':17.258255,'lng':78.68337},
//            {'lat':17.258628,'lng':78.683545},
//            {'lat':17.259047,'lng':78.683565},
//            {'lat':17.259334,'lng':78.683568},
//            {'lat':17.260844,'lng':78.683587},
//            {'lat':17.261292,'lng':78.683588},
//            {'lat':17.26171,'lng':78.6836},
//            {'lat':17.26196,'lng':78.683588},
//            {'lat':17.262269,'lng':78.683405},
//            {'lat':17.262427,'lng':78.683159},
//            {'lat':17.262655,'lng':78.68316},
//            {'lat':17.262867,'lng':78.683364},
//            {'lat':17.263183,'lng':78.683065},
//            {'lat':17.263601,'lng':78.682364},
//            {'lat':17.263998,'lng':78.681747},
//            {'lat':17.264127,'lng':78.681658},
//            {'lat':17.264302,'lng':78.681682},
//            {'lat':17.264437,'lng':78.681747},
//            {'lat':17.265092,'lng':78.682204},
//            {'lat':17.26539,'lng':78.682852},
//            {'lat':17.265206,'lng':78.683637},
//            {'lat':17.265243,'lng':78.683863},
//            {'lat':17.265422,'lng':78.683922},
//            {'lat':17.265536,'lng':78.683889},
//            {'lat':17.265878,'lng':78.683741},
//            {'lat':17.266324,'lng':78.683753},
//            {'lat':17.267266,'lng':78.684345},
//            {'lat':17.267965,'lng':78.684883},
//            {'lat':17.268584,'lng':78.6853},
//            {'lat':17.269073,'lng':78.685639},
//            {'lat':17.269817,'lng':78.686094},
//            {'lat':17.270747,'lng':78.686675},
//            {'lat':17.271047,'lng':78.686825},
//            {'lat':17.272003,'lng':78.68659},
//            {'lat':17.272368,'lng':78.686374},
//            {'lat':17.272839,'lng':78.685282},
//            {'lat':17.272869,'lng':78.684996},
//            {'lat':17.2729,'lng':78.684684},
//            {'lat':17.272827,'lng':78.684079},
//            {'lat':17.272045,'lng':78.682705},
//            {'lat':17.271893,'lng':78.682208},
//            {'lat':17.272063,'lng':78.681217},
//            {'lat':17.272163,'lng':78.680968},
//            {'lat':17.272134,'lng':78.680119},
//            {'lat':17.271953,'lng':78.679364},
//            {'lat':17.27153,'lng':78.678569},
//            {'lat':17.271378,'lng':78.678292},
//            {'lat':17.271267,'lng':78.677907},
//            {'lat':17.270939,'lng':78.677133},
//            {'lat':17.270926,'lng':78.67685},
//            {'lat':17.270964,'lng':78.676642},
//            {'lat':17.271022,'lng':78.676451},
//            {'lat':17.271117,'lng':78.676377},
//            {'lat':17.271179,'lng':78.676378},
//            {'lat':17.271274,'lng':78.676511},
//            {'lat':17.27124,'lng':78.676634},
//            {'lat':17.271147,'lng':78.676993},
//            {'lat':17.271214,'lng':78.677318},
//            {'lat':17.271624,'lng':78.677683},
//            {'lat':17.272012,'lng':78.677942},
//            {'lat':17.27248,'lng':78.678214},
//            {'lat':17.273106,'lng':78.678465},
//            {'lat':17.273145,'lng':78.678472},
//            {'lat':17.273268,'lng':78.678484},
//            {'lat':17.273352,'lng':78.67848},
//            {'lat':17.275428,'lng':78.678154},
//            {'lat':17.275535,'lng':78.678128},
//            {'lat':17.275724,'lng':78.678088},
//            {'lat':17.275874,'lng':78.678088},
//            {'lat':17.276184,'lng':78.678138},
//            {'lat':17.277256,'lng':78.678914},
//            {'lat':17.278811,'lng':78.679183},
//            {'lat':17.280586,'lng':78.679364},
//            {'lat':17.282234,'lng':78.679529},
//            {'lat':17.283933,'lng':78.679703},
//            {'lat':17.284537,'lng':78.679865},
//            {'lat':17.285175,'lng':78.680699},
//            {'lat':17.285499,'lng':78.680999},
//            {'lat':17.285927,'lng':78.681098},
//            {'lat':17.28622,'lng':78.681024},
//            {'lat':17.287601,'lng':78.680237},
//            {'lat':17.288147,'lng':78.680007},
//            {'lat':17.28862,'lng':78.679933},
//            {'lat':17.289114,'lng':78.679935},
//            {'lat':17.289452,'lng':78.679947},
//            {'lat':17.291174,'lng':78.679981},
//            {'lat':17.29288,'lng':78.680016},
//            {'lat':17.293197,'lng':78.68002},
//            {'lat':17.293652,'lng':78.680022},
//            {'lat':17.293941,'lng':78.680013},
//            {'lat':17.295325,'lng':78.680019},
//            {'lat':17.296739,'lng':78.680045},
//            {'lat':17.29777,'lng':78.680245},
//            {'lat':17.299132,'lng':78.680651},
//            {'lat':17.30057,'lng':78.681072},
//            {'lat':17.300717,'lng':78.6811},
//            {'lat':17.301167,'lng':78.681151},
//            {'lat':17.301468,'lng':78.681151},
//            {'lat':17.302974,'lng':78.68076},
//            {'lat':17.304469,'lng':78.680277},
//            {'lat':17.304627,'lng':78.680262},
//            {'lat':17.305112,'lng':78.68026},
//            {'lat':17.305435,'lng':78.680299},
//            {'lat':17.306967,'lng':78.680795},
//            {'lat':17.308407,'lng':78.68131},
//            {'lat':17.309483,'lng':78.681692},
//            {'lat':17.309925,'lng':78.68185},
//            {'lat':17.310349,'lng':78.682006},
//            {'lat':17.311092,'lng':78.682259},
//            {'lat':17.311367,'lng':78.68236},
//            {'lat':17.311514,'lng':78.682418},
//            {'lat':17.311609,'lng':78.682415},
//            {'lat':17.311755,'lng':78.682264},
//            {'lat':17.312112,'lng':78.681411},
//            {'lat':17.31245,'lng':78.680592},
//            {'lat':17.312779,'lng':78.679752},
//            {'lat':17.31314,'lng':78.678797},
//            {'lat':17.313519,'lng':78.677759},
//            {'lat':17.313937,'lng':78.676764},
//            {'lat':17.314357,'lng':78.675644},
//            {'lat':17.314777,'lng':78.674532},
//            {'lat':17.315161,'lng':78.673503},
//            {'lat':17.31549,'lng':78.672465},
//            {'lat':17.315764,'lng':78.671336},
//            {'lat':17.316063,'lng':78.670105},
//            {'lat':17.316427,'lng':78.66882},
//            {'lat':17.316833,'lng':78.667449},
//            {'lat':17.317205,'lng':78.66601},
//            {'lat':17.317383,'lng':78.664499},
//            {'lat':17.317433,'lng':78.663063},
//            {'lat':17.317402,'lng':78.661893},
//            {'lat':17.317298,'lng':78.660566},
//            {'lat':17.317207,'lng':78.658995},
//            {'lat':17.31734,'lng':78.657371},
//            {'lat':17.317759,'lng':78.655823},
//            {'lat':17.318211,'lng':78.654463},
//            {'lat':17.318626,'lng':78.653281},
//            {'lat':17.319092,'lng':78.652084},
//            {'lat':17.319504,'lng':78.650953},
//            {'lat':17.319642,'lng':78.649612},
//            {'lat':17.319605,'lng':78.648149},
//            {'lat':17.319562,'lng':78.646665},
//            {'lat':17.319653,'lng':78.645163},
//            {'lat':17.31987,'lng':78.643682},
//            {'lat':17.320289,'lng':78.642362},
//            {'lat':17.320519,'lng':78.641663},
//            {'lat':17.320772,'lng':78.640914},
//            {'lat':17.321092,'lng':78.639943},
//            {'lat':17.32144,'lng':78.638898},
//            {'lat':17.3218,'lng':78.637824},
//            {'lat':17.322079,'lng':78.63659},
//            {'lat':17.322217,'lng':78.635374},
//            {'lat':17.322205,'lng':78.634045},
//            {'lat':17.321991,'lng':78.63264},
//            {'lat':17.321655,'lng':78.631283},
//            {'lat':17.321346,'lng':78.630067},
//            {'lat':17.321065,'lng':78.628947},
//            {'lat':17.320785,'lng':78.627882},
//            {'lat':17.320608,'lng':78.626813},
//            {'lat':17.32053,'lng':78.625669},
//            {'lat':17.320453,'lng':78.624367},
//            {'lat':17.320337,'lng':78.623026},
//            {'lat':17.320198,'lng':78.621872},
//            {'lat':17.320105,'lng':78.620921},
//            {'lat':17.319989,'lng':78.619817},
//            {'lat':17.319863,'lng':78.618628},
//            {'lat':17.319941,'lng':78.617293},
//            {'lat':17.320162,'lng':78.615788},
//            {'lat':17.320436,'lng':78.614573},
//            {'lat':17.32099,'lng':78.613657},
//            {'lat':17.321685,'lng':78.612742},
//            {'lat':17.322431,'lng':78.611773},
//            {'lat':17.323113,'lng':78.610867},
//            {'lat':17.323902,'lng':78.609813},
//            {'lat':17.324667,'lng':78.608824},
//            {'lat':17.324994,'lng':78.608379},
//            {'lat':17.325229,'lng':78.608092},
//            {'lat':17.325527,'lng':78.607679},
//            {'lat':17.32592,'lng':78.607179},
//            {'lat':17.326198,'lng':78.606788},
//            {'lat':17.326607,'lng':78.606193},
//            {'lat':17.326737,'lng':78.605862},
//            {'lat':17.326817,'lng':78.605583},
//            {'lat':17.326887,'lng':78.605292},
//            {'lat':17.326943,'lng':78.604977},
//            {'lat':17.32704,'lng':78.604467},
//            {'lat':17.327168,'lng':78.603784},
//            {'lat':17.327313,'lng':78.602895},
//            {'lat':17.327468,'lng':78.60185},
//            {'lat':17.327755,'lng':78.600807},
//            {'lat':17.327961,'lng':78.600097},
//            {'lat':17.328162,'lng':78.599504},
//            {'lat':17.32831,'lng':78.599045},
//            {'lat':17.328398,'lng':78.598772},
//            {'lat':17.328638,'lng':78.598032},
//            {'lat':17.328961,'lng':78.597014},
//            {'lat':17.329254,'lng':78.596053},
//            {'lat':17.329414,'lng':78.595571},
//            {'lat':17.329593,'lng':78.595048},
//            {'lat':17.329778,'lng':78.594492},
//            {'lat':17.329891,'lng':78.594219},
//            {'lat':17.330036,'lng':78.593937},
//            {'lat':17.330228,'lng':78.59357},
//            {'lat':17.330537,'lng':78.592957},
//            {'lat':17.331007,'lng':78.592193},
//            {'lat':17.33157,'lng':78.591272},
//            {'lat':17.332052,'lng':78.590387},
//            {'lat':17.33234,'lng':78.589831},
//            {'lat':17.332785,'lng':78.589405},
//            {'lat':17.332709,'lng':78.589588},
//            {'lat':17.332529,'lng':78.589895},
//            {'lat':17.332242,'lng':78.590355},
//            {'lat':17.331432,'lng':78.591641},
//            {'lat':17.330849,'lng':78.59259},
//            {'lat':17.330413,'lng':78.593413},
//            {'lat':17.330237,'lng':78.593787},
//            {'lat':17.329998,'lng':78.594336},
//            {'lat':17.329644,'lng':78.595257},
//            {'lat':17.329231,'lng':78.596455},
//            {'lat':17.328815,'lng':78.597779},
//            {'lat':17.328483,'lng':78.598869},
//            {'lat':17.328244,'lng':78.599585},
//            {'lat':17.327989,'lng':78.600398},
//            {'lat':17.327679,'lng':78.601437},
//            {'lat':17.327452,'lng':78.602622},
//            {'lat':17.327264,'lng':78.60358},
//            {'lat':17.327104,'lng':78.60445},
//            {'lat':17.327013,'lng':78.604966},
//            {'lat':17.326957,'lng':78.605296},
//            {'lat':17.326858,'lng':78.605738},
//            {'lat':17.326545,'lng':78.60647},
//            {'lat':17.325958,'lng':78.607297},
//            {'lat':17.325664,'lng':78.607723},
//            {'lat':17.325465,'lng':78.607996},
//            {'lat':17.324976,'lng':78.608572},
//            {'lat':17.324358,'lng':78.609352},
//            {'lat':17.323674,'lng':78.610263},
//            {'lat':17.322904,'lng':78.611217},
//            {'lat':17.322196,'lng':78.612133},
//            {'lat':17.321454,'lng':78.613094},
//            {'lat':17.320864,'lng':78.613879},
//            {'lat':17.32044,'lng':78.614649},
//            {'lat':17.320186,'lng':78.615785},
//            {'lat':17.320009,'lng':78.617082},
//            {'lat':17.320009,'lng':78.617082},
//            {'lat':17.319903,'lng':78.618491},
//            {'lat':17.319903,'lng':78.618491},
//            {'lat':17.320056,'lng':78.619971},
//            {'lat':17.320204,'lng':78.621182},
//            {'lat':17.320321,'lng':78.622211},
//            {'lat':17.320471,'lng':78.623535},
//            {'lat':17.320573,'lng':78.62496},
//            {'lat':17.320654,'lng':78.626334},
//            {'lat':17.320835,'lng':78.627778},
//            {'lat':17.32119,'lng':78.629253},
//            {'lat':17.321548,'lng':78.630693},
//            {'lat':17.321922,'lng':78.632193},
//            {'lat':17.322216,'lng':78.633714},
//            {'lat':17.322258,'lng':78.63521},
//            {'lat':17.322138,'lng':78.636533},
//            {'lat':17.321782,'lng':78.638024},
//            {'lat':17.321289,'lng':78.63948},
//            {'lat':17.320839,'lng':78.640818},
//            {'lat':17.320569,'lng':78.64167},
//            {'lat':17.320408,'lng':78.642111},
//            {'lat':17.320169,'lng':78.64284},
//            {'lat':17.31984,'lng':78.643913},
//            {'lat':17.319684,'lng':78.645279},
//            {'lat':17.319605,'lng':78.646739},
//            {'lat':17.319662,'lng':78.648287},
//            {'lat':17.319715,'lng':78.649873},
//            {'lat':17.319455,'lng':78.651375},
//            {'lat':17.318927,'lng':78.652825},
//            {'lat':17.318403,'lng':78.654263},
//            {'lat':17.317878,'lng':78.655709},
//            {'lat':17.317411,'lng':78.657237},
//            {'lat':17.31727,'lng':78.65871},
//            {'lat':17.317338,'lng':78.660259},
//            {'lat':17.317418,'lng':78.661398},
//            {'lat':17.317472,'lng':78.662507},
//            {'lat':17.317475,'lng':78.663477},
//            {'lat':17.317453,'lng':78.66407},
//            {'lat':17.31738,'lng':78.665034},
//            {'lat':17.317212,'lng':78.666244},
//            {'lat':17.316829,'lng':78.667625},
//            {'lat':17.316409,'lng':78.669034},
//            {'lat':17.316069,'lng':78.67042},
//            {'lat':17.315673,'lng':78.671955},
//            {'lat':17.315194,'lng':78.673547},
//            {'lat':17.314595,'lng':78.67512},
//            {'lat':17.313994,'lng':78.676694},
//            {'lat':17.313439,'lng':78.678174},
//            {'lat':17.312883,'lng':78.679681},
//            {'lat':17.312312,'lng':78.681102},
//            {'lat':17.311895,'lng':78.68218},
//            {'lat':17.311764,'lng':78.682392},
//            {'lat':17.311494,'lng':78.682484},
//            {'lat':17.310844,'lng':78.682246},
//            {'lat':17.310182,'lng':78.682006},
//            {'lat':17.309483,'lng':78.681757},
//            {'lat':17.308725,'lng':78.681488},
//            {'lat':17.307562,'lng':78.681073},
//            {'lat':17.30623,'lng':78.680596},
//            {'lat':17.304867,'lng':78.680323},
//            {'lat':17.303613,'lng':78.68056},
//            {'lat':17.302429,'lng':78.681046},
//            {'lat':17.301233,'lng':78.681218},
//            {'lat':17.300028,'lng':78.680993},
//            {'lat':17.298754,'lng':78.680624},
//            {'lat':17.29746,'lng':78.68026},
//            {'lat':17.296052,'lng':78.680127},
//            {'lat':17.294437,'lng':78.680092},
//            {'lat':17.292719,'lng':78.680061},
//            {'lat':17.291115,'lng':78.680032},
//            {'lat':17.289672,'lng':78.679993},
//            {'lat':17.288233,'lng':78.680059},
//            {'lat':17.287079,'lng':78.680634},
//            {'lat':17.286193,'lng':78.681159},
//            {'lat':17.285414,'lng':78.681151},
//            {'lat':17.284151,'lng':78.680097},
//            {'lat':17.282852,'lng':78.679795},
//            {'lat':17.281508,'lng':78.679665},
//            {'lat':17.28012,'lng':78.679531},
//            {'lat':17.278762,'lng':78.679398},
//            {'lat':17.277599,'lng':78.679217},
//            {'lat':17.276635,'lng':78.678812},
//            {'lat':17.27581,'lng':78.678612},
//            {'lat':17.274264,'lng':78.67897},
//            {'lat':17.27282,'lng':78.678919},
//            {'lat':17.27226,'lng':78.678778},
//            {'lat':17.271805,'lng':78.678422},
//            {'lat':17.27154,'lng':78.678066},
//            {'lat':17.271333,'lng':78.67808},
//            {'lat':17.271308,'lng':78.678171},
//            {'lat':17.271345,'lng':78.678259},
//            {'lat':17.271737,'lng':78.67888},
//            {'lat':17.272084,'lng':78.679604},
//            {'lat':17.27219,'lng':78.680748},
//            {'lat':17.272187,'lng':78.680853},
//            {'lat':17.271905,'lng':78.681626},
//            {'lat':17.271913,'lng':78.682363},
//            {'lat':17.272328,'lng':78.683143},
//            {'lat':17.272724,'lng':78.683751},
//            {'lat':17.272883,'lng':78.684917},
//            {'lat':17.272646,'lng':78.685963},
//            {'lat':17.272394,'lng':78.686365},
//            {'lat':17.271336,'lng':78.686897},
//            {'lat':17.270984,'lng':78.686922},
//            {'lat':17.270038,'lng':78.68633},
//            {'lat':17.26917,'lng':78.685789},
//            {'lat':17.268319,'lng':78.68525},
//            {'lat':17.267505,'lng':78.684627},
//            {'lat':17.266534,'lng':78.683943},
//            {'lat':17.266135,'lng':78.683774},
//            {'lat':17.26558,'lng':78.683957},
//            {'lat':17.265323,'lng':78.684004},
//            {'lat':17.265122,'lng':78.683875},
//            {'lat':17.265093,'lng':78.683719},
//            {'lat':17.265268,'lng':78.683183},
//            {'lat':17.265224,'lng':78.682547},
//            {'lat':17.264616,'lng':78.681949},
//            {'lat':17.264089,'lng':78.681967},
//            {'lat':17.263327,'lng':78.682912},
//            {'lat':17.263127,'lng':78.683324},
//            {'lat':17.262901,'lng':78.683403},
//            {'lat':17.262644,'lng':78.683288},
//            {'lat':17.26231,'lng':78.68349},
//            {'lat':17.26108,'lng':78.68363},
//            {'lat':17.259596,'lng':78.683616},
//            {'lat':17.258694,'lng':78.683582},
//            {'lat':17.257919,'lng':78.683056},
//            {'lat':17.257405,'lng':78.682844},
//            {'lat':17.256593,'lng':78.683076},
//            {'lat':17.255235,'lng':78.683135},
//            {'lat':17.253861,'lng':78.683199},
//            {'lat':17.252792,'lng':78.683412},
//            {'lat':17.251833,'lng':78.683614},
//            {'lat':17.251303,'lng':78.683678},
//            {'lat':17.250504,'lng':78.684015},
//            {'lat':17.250032,'lng':78.683825},
//            {'lat':17.250174,'lng':78.683797},
//            {'lat':17.251054,'lng':78.683722},
//            {'lat':17.251732,'lng':78.683596},
//            {'lat':17.252469,'lng':78.683459},
//            {'lat':17.253118,'lng':78.683321},
//            {'lat':17.254863,'lng':78.683117},
//            {'lat':17.254988,'lng':78.68311},
//            {'lat':17.255366,'lng':78.683093},
//            {'lat':17.255617,'lng':78.683097},
//            {'lat':17.256843,'lng':78.682943},
//            {'lat':17.256967,'lng':78.682905},
//            {'lat':17.257328,'lng':78.682827},
//            {'lat':17.257575,'lng':78.682854},
//            {'lat':17.258227,'lng':78.683334},
//            {'lat':17.259016,'lng':78.683559},
//            {'lat':17.259439,'lng':78.683562},
//            {'lat':17.259726,'lng':78.683567},
//            {'lat':17.260288,'lng':78.683574},
//            {'lat':17.260698,'lng':78.683581},
//            {'lat':17.260968,'lng':78.683587},
//            {'lat':17.261234,'lng':78.683593},
//            {'lat':17.261613,'lng':78.683608},
//            {'lat':17.261847,'lng':78.683605},
//            {'lat':17.262222,'lng':78.683459},
//            {'lat':17.262365,'lng':78.68325},
//            {'lat':17.262521,'lng':78.683131},
//            {'lat':17.262629,'lng':78.683159},
//            {'lat':17.262788,'lng':78.683326},
//            {'lat':17.262914,'lng':78.683396},
//            {'lat':17.263048,'lng':78.683317},
//            {'lat':17.263104,'lng':78.683208},
//            {'lat':17.263544,'lng':78.682446},
//            {'lat':17.26396,'lng':78.68181},
//            {'lat':17.264114,'lng':78.681675},
//            {'lat':17.264317,'lng':78.681699},
//            {'lat':17.264463,'lng':78.681768},
//            {'lat':17.265102,'lng':78.682217},
//            {'lat':17.265387,'lng':78.682811},
//            {'lat':17.265207,'lng':78.683593},
//            {'lat':17.26522,'lng':78.683842},
//            {'lat':17.265396,'lng':78.683929},
//            {'lat':17.265513,'lng':78.683894},
//            {'lat':17.265911,'lng':78.683729},
//            {'lat':17.26634,'lng':78.683758},
//            {'lat':17.267227,'lng':78.684333},
//            {'lat':17.26785,'lng':78.684819},
//            {'lat':17.26848,'lng':78.68526},
//            {'lat':17.269425,'lng':78.685857},
//            {'lat':17.270519,'lng':78.686545},
//            {'lat':17.270934,'lng':78.686793},
//            {'lat':17.272246,'lng':78.686462},
//            {'lat':17.27258,'lng':78.68609},
//            {'lat':17.272889,'lng':78.684722},
//            {'lat':17.272857,'lng':78.684205},
//            {'lat':17.272113,'lng':78.682819},
//            {'lat':17.271938,'lng':78.682457},
//            {'lat':17.271899,'lng':78.681687},
//            {'lat':17.272139,'lng':78.681043},
//            {'lat':17.272145,'lng':78.680217},
//            {'lat':17.272023,'lng':78.679505},
//            {'lat':17.271659,'lng':78.678791},
//            {'lat':17.271262,'lng':78.67792},
//            {'lat':17.271027,'lng':78.677444},
//            {'lat':17.270922,'lng':78.676922},
//            {'lat':17.271025,'lng':78.67645},
//            {'lat':17.271143,'lng':78.676377},
//            {'lat':17.271253,'lng':78.676449},
//            {'lat':17.271252,'lng':78.676565},
//            {'lat':17.271138,'lng':78.676933},
//            {'lat':17.271175,'lng':78.677242},
//            {'lat':17.271417,'lng':78.677548},
//            {'lat':17.271828,'lng':78.67781},
//            {'lat':17.272263,'lng':78.67808},
//            {'lat':17.272789,'lng':78.678341},
//            {'lat':17.273227,'lng':78.678479},
//            {'lat':17.273339,'lng':78.678492},
//            {'lat':17.273412,'lng':78.67849},
//            {'lat':17.27415,'lng':78.678435},
//            {'lat':17.274263,'lng':78.678432},
//            {'lat':17.274337,'lng':78.678435},
//            {'lat':17.275222,'lng':78.678222},
//            {'lat':17.275667,'lng':78.678107},
//            {'lat':17.275868,'lng':78.678095},
//            {'lat':17.276003,'lng':78.678105},
//            {'lat':17.276297,'lng':78.678178},
//            {'lat':17.27708,'lng':78.678798},
//            {'lat':17.278756,'lng':78.67918},
//            {'lat':17.280447,'lng':78.679349},
//            {'lat':17.282,'lng':78.6795},
//            {'lat':17.283519,'lng':78.679654},
//            {'lat':17.284248,'lng':78.679751},
//            {'lat':17.284909,'lng':78.680224},
//            {'lat':17.285398,'lng':78.680947},
//            {'lat':17.286239,'lng':78.68104},
//            {'lat':17.287731,'lng':78.680192},
//            {'lat':17.28823,'lng':78.680004},
//            {'lat':17.288668,'lng':78.679946},
//            {'lat':17.288977,'lng':78.679948},
//            {'lat':17.29059,'lng':78.679976},
//            {'lat':17.292273,'lng':78.679999},
//            {'lat':17.293779,'lng':78.680026},
//            {'lat':17.293914,'lng':78.680027},
//            {'lat':17.2943,'lng':78.680013},
//            {'lat':17.294543,'lng':78.680017},
//            {'lat':17.295915,'lng':78.680055},
//            {'lat':17.297295,'lng':78.680142},
//            {'lat':17.298263,'lng':78.680416},
//            {'lat':17.299579,'lng':78.680802},
//            {'lat':17.301127,'lng':78.681162},
//            {'lat':17.302577,'lng':78.680927},
//            {'lat':17.30413,'lng':78.680348},
//            {'lat':17.304291,'lng':78.680317},
//            {'lat':17.304785,'lng':78.680273},
//            {'lat':17.305124,'lng':78.680284},
//            {'lat':17.30674,'lng':78.680725},
//            {'lat':17.308149,'lng':78.681232},
//            {'lat':17.309395,'lng':78.681673},
//            {'lat':17.309947,'lng':78.681862},
//            {'lat':17.310339,'lng':78.682004},
//            {'lat':17.311029,'lng':78.682248},
//            {'lat':17.311367,'lng':78.682372},
//            {'lat':17.311497,'lng':78.682421},
//            {'lat':17.311579,'lng':78.682427},
//            {'lat':17.311751,'lng':78.68233},
//            {'lat':17.311999,'lng':78.681733},
//            {'lat':17.312251,'lng':78.681094},
//            {'lat':17.312522,'lng':78.680453},
//            {'lat':17.312759,'lng':78.679835},
//            {'lat':17.313015,'lng':78.679141},
//            {'lat':17.313313,'lng':78.67835},
//            {'lat':17.313617,'lng':78.677566},
//            {'lat':17.313894,'lng':78.676815},
//            {'lat':17.314222,'lng':78.67595},
//            {'lat':17.314587,'lng':78.674987},
//            {'lat':17.314927,'lng':78.674152},
//            {'lat':17.315199,'lng':78.673342},
//            {'lat':17.315474,'lng':78.672573},
//            {'lat':17.315693,'lng':78.671732},
//            {'lat':17.315921,'lng':78.670772},
//            {'lat':17.316194,'lng':78.6697},
//            {'lat':17.316549,'lng':78.668533},
//            {'lat':17.316952,'lng':78.667203},
//            {'lat':17.317266,'lng':78.665811},
//            {'lat':17.317415,'lng':78.664419},
//            {'lat':17.317459,'lng':78.663082},
//            {'lat':17.317409,'lng':78.661714},
//            {'lat':17.317286,'lng':78.660225},
//            {'lat':17.317223,'lng':78.658637},
//            {'lat':17.317409,'lng':78.65712},
//            {'lat':17.317849,'lng':78.655653},
//            {'lat':17.318267,'lng':78.65436},
//            {'lat':17.318829,'lng':78.65298},
//            {'lat':17.319372,'lng':78.651541},
//            {'lat':17.319688,'lng':78.65005},
//            {'lat':17.319642,'lng':78.648552},
//            {'lat':17.319592,'lng':78.647072},
//            {'lat':17.319635,'lng':78.645592},
//            {'lat':17.319783,'lng':78.644108},
//            {'lat':17.320189,'lng':78.642763},
//            {'lat':17.320587,'lng':78.641585},
//            {'lat':17.32099,'lng':78.640372},
//            {'lat':17.321428,'lng':78.639063},
//            {'lat':17.321877,'lng':78.637697},
//            {'lat':17.32217,'lng':78.636244},
//            {'lat':17.322256,'lng':78.634774},
//            {'lat':17.322152,'lng':78.633284},
//            {'lat':17.321815,'lng':78.631815},
//            {'lat':17.321449,'lng':78.630367},
//            {'lat':17.321103,'lng':78.628985},
//            {'lat':17.32077,'lng':78.627614},
//            {'lat':17.320627,'lng':78.626319},
//            {'lat':17.320543,'lng':78.625071},
//            {'lat':17.320462,'lng':78.623919},
//            {'lat':17.32033,'lng':78.622752},
//            {'lat':17.320187,'lng':78.621531},
//            {'lat':17.320033,'lng':78.620278},
//            {'lat':17.319892,'lng':78.619039},
//            {'lat':17.319899,'lng':78.617727},
//            {'lat':17.320124,'lng':78.616235},
//            {'lat':17.32039,'lng':78.614805},
//            {'lat':17.321044,'lng':78.613633},
//            {'lat':17.32187,'lng':78.61254},
//            {'lat':17.322748,'lng':78.611398},
//            {'lat':17.323628,'lng':78.610227},
//            {'lat':17.324465,'lng':78.609089},
//            {'lat':17.325087,'lng':78.608254},
//            {'lat':17.325397,'lng':78.607886},
//            {'lat':17.325729,'lng':78.607492},
//            {'lat':17.326222,'lng':78.606852},
//            {'lat':17.326724,'lng':78.60597},
//            {'lat':17.326962,'lng':78.605003},
//            {'lat':17.327134,'lng':78.604059},
//            {'lat':17.327302,'lng':78.603065},
//            {'lat':17.327482,'lng':78.602096},
//            {'lat':17.327767,'lng':78.600974},
//            {'lat':17.328133,'lng':78.599811},
//            {'lat':17.328475,'lng':78.598767},
//            {'lat':17.328835,'lng':78.597618},
//            {'lat':17.329219,'lng':78.596399},
//            {'lat':17.329555,'lng':78.595319},
//            {'lat':17.329969,'lng':78.594293},
//            {'lat':17.330391,'lng':78.593385},
//            {'lat':17.330911,'lng':78.59244},
//            {'lat':17.331567,'lng':78.591372},
//            {'lat':17.332234,'lng':78.590239},
//            {'lat':17.332862,'lng':78.589126},
//            {'lat':17.333508,'lng':78.587979},
//            {'lat':17.334034,'lng':78.586809},
//            {'lat':17.334527,'lng':78.585739},
//            {'lat':17.334797,'lng':78.58511},
//            {'lat':17.334982,'lng':78.584735},
//            {'lat':17.335242,'lng':78.584189},
//            {'lat':17.335472,'lng':78.583436},
//            {'lat':17.335639,'lng':78.582449},
//            {'lat':17.335799,'lng':78.581383},
//            {'lat':17.335913,'lng':78.580274},
//            {'lat':17.335949,'lng':78.579623},
//            {'lat':17.336013,'lng':78.579348},
//            {'lat':17.336088,'lng':78.578748},
//            {'lat':17.336187,'lng':78.577959},
//            {'lat':17.3363,'lng':78.57701},
//            {'lat':17.336435,'lng':78.575938},
//            {'lat':17.336555,'lng':78.574869},
//            {'lat':17.33662,'lng':78.574198},
//            {'lat':17.33677,'lng':78.573416},
//            {'lat':17.33697,'lng':78.57268},
//            {'lat':17.337242,'lng':78.571784},
//            {'lat':17.337513,'lng':78.570871},
//            {'lat':17.337774,'lng':78.569977},
//            {'lat':17.337904,'lng':78.569518},
//            {'lat':17.338043,'lng':78.569234},
//            {'lat':17.338241,'lng':78.568588},
//            {'lat':17.338548,'lng':78.567834},
//            {'lat':17.338763,'lng':78.567309},
//            {'lat':17.338927,'lng':78.567028},
//            {'lat':17.339239,'lng':78.566525},
//            {'lat':17.339582,'lng':78.565902},
//            {'lat':17.339771,'lng':78.565478},
//            {'lat':17.339958,'lng':78.565089},
//            {'lat':17.340286,'lng':78.564497},
//            {'lat':17.340542,'lng':78.563542},
//            {'lat':17.340705,'lng':78.5625},
//            {'lat':17.340838,'lng':78.561433},
//            {'lat':17.340961,'lng':78.560516},
//            {'lat':17.341037,'lng':78.559792},
//            {'lat':17.34111,'lng':78.559376},
//            {'lat':17.341247,'lng':78.55879},
//            {'lat':17.341558,'lng':78.558059},
//            {'lat':17.34198,'lng':78.557305},
//            {'lat':17.342789,'lng':78.556278},
//            {'lat':17.343193,'lng':78.555692},
//            {'lat':17.343547,'lng':78.555226},
//            {'lat':17.343853,'lng':78.554787},
//            {'lat':17.344197,'lng':78.55427},
//            {'lat':17.344557,'lng':78.553736},
//            {'lat':17.34502,'lng':78.553014},
//            {'lat':17.345523,'lng':78.552277},
//            {'lat':17.345998,'lng':78.551533},
//            {'lat':17.346549,'lng':78.550848},
//            {'lat':17.34685,'lng':78.55047},
//            {'lat':17.347134,'lng':78.550125},
//            {'lat':17.347537,'lng':78.549711},
//            {'lat':17.348111,'lng':78.549225},
//            {'lat':17.348724,'lng':78.548747},
//            {'lat':17.349251,'lng':78.548305},
//            {'lat':17.349617,'lng':78.547939},
//            {'lat':17.350242,'lng':78.547439},
//            {'lat':17.350909,'lng':78.546975},
//            {'lat':17.351839,'lng':78.546495},
//            {'lat':17.353005,'lng':78.546167},
//            {'lat':17.354183,'lng':78.545864},
//            {'lat':17.355342,'lng':78.545558},
//            {'lat':17.356443,'lng':78.545267},
//            {'lat':17.357595,'lng':78.544961},
//            {'lat':17.358668,'lng':78.544677},
//            {'lat':17.359738,'lng':78.544363},
//            {'lat':17.360628,'lng':78.544124},
//            {'lat':17.361374,'lng':78.543888},
//            {'lat':17.362099,'lng':78.543636},
//            {'lat':17.363005,'lng':78.543434},
//            {'lat':17.363754,'lng':78.543215},
//            {'lat':17.364364,'lng':78.542948},
//            {'lat':17.365294,'lng':78.542399},
//            {'lat':17.366205,'lng':78.541625},
//            {'lat':17.366952,'lng':78.540743},
//            {'lat':17.367321,'lng':78.540189},
//            {'lat':17.367874,'lng':78.53914},
//            {'lat':17.368157,'lng':78.538114},
//            {'lat':17.36831,'lng':78.536887},
//            {'lat':17.368316,'lng':78.535662},
//            {'lat':17.36833,'lng':78.534625},
//            {'lat':17.368313,'lng':78.53368},
//            {'lat':17.368283,'lng':78.532977},
//            {'lat':17.368343,'lng':78.532298},
//            {'lat':17.368378,'lng':78.531404},
//            {'lat':17.368394,'lng':78.530392},
//            {'lat':17.368418,'lng':78.529392},
//            {'lat':17.368449,'lng':78.528665},
//            {'lat':17.368462,'lng':78.528354},
//            {'lat':17.368472,'lng':78.52777},
//            {'lat':17.368483,'lng':78.527384},
//            {'lat':17.368516,'lng':78.526779},
//            {'lat':17.368524,'lng':78.526169},
//            {'lat':17.368562,'lng':78.52567},
//            {'lat':17.368554,'lng':78.5246},
//            {'lat':17.368561,'lng':78.524053},
//            {'lat':17.368569,'lng':78.523565},
//            {'lat':17.368578,'lng':78.523121},
//            {'lat':17.368609,'lng':78.522849},
//            {'lat':17.368587,'lng':78.522579},
//            {'lat':17.368599,'lng':78.522112},
//            {'lat':17.368604,'lng':78.52161},
//            {'lat':17.368615,'lng':78.521184},
//            {'lat':17.368649,'lng':78.520557},
//            {'lat':17.368682,'lng':78.520115},
//            {'lat':17.368742,'lng':78.520094},
//            {'lat':17.368792,'lng':78.520124},
//            {'lat':17.368795,'lng':78.520172},
//            {'lat':17.368796,'lng':78.52045},
//            {'lat':17.368735,'lng':78.520897},
//            {'lat':17.368747,'lng':78.521124},
//            {'lat':17.368746,'lng':78.52144},
//            {'lat':17.368734,'lng':78.521757},
//            {'lat':17.368774,'lng':78.522078},
//            {'lat':17.368718,'lng':78.522517},
//            {'lat':17.368673,'lng':78.523052},
//            {'lat':17.368656,'lng':78.52371},
//            {'lat':17.368629,'lng':78.524485},
//            {'lat':17.368633,'lng':78.525103},
//            {'lat':17.36868,'lng':78.525575},
//            {'lat':17.368683,'lng':78.526025},
//            {'lat':17.368647,'lng':78.526719},
//            {'lat':17.368628,'lng':78.527311},
//            {'lat':17.368622,'lng':78.527922},
//            {'lat':17.368587,'lng':78.528725},
//            {'lat':17.368568,'lng':78.529294},
//            {'lat':17.368555,'lng':78.530133},
//            {'lat':17.368529,'lng':78.53109},
//            {'lat':17.368515,'lng':78.53192},
//            {'lat':17.368525,'lng':78.532547},
//            {'lat':17.368542,'lng':78.533008},
//            {'lat':17.368515,'lng':78.533297},
//            {'lat':17.368455,'lng':78.533915},
//            {'lat':17.368419,'lng':78.534642},
//            {'lat':17.368387,'lng':78.535338},
//            {'lat':17.368404,'lng':78.535617},
//            {'lat':17.368382,'lng':78.536642},
//            {'lat':17.368289,'lng':78.537532},
//            {'lat':17.368141,'lng':78.538398},
//            {'lat':17.367959,'lng':78.53918},
//            {'lat':17.367755,'lng':78.539718},
//            {'lat':17.367438,'lng':78.540302},
//            {'lat':17.366938,'lng':78.54103},
//            {'lat':17.36623,'lng':78.5418},
//            {'lat':17.365389,'lng':78.542533},
//            {'lat':17.364479,'lng':78.543125},
//            {'lat':17.363548,'lng':78.543518},
//            {'lat':17.362607,'lng':78.543755},
//            {'lat':17.361722,'lng':78.544067},
//            {'lat':17.360755,'lng':78.544292},
//            {'lat':17.359763,'lng':78.544493},
//            {'lat':17.358781,'lng':78.544738},
//            {'lat':17.357795,'lng':78.544992},
//            {'lat':17.356803,'lng':78.545247},
//            {'lat':17.355933,'lng':78.545468},
//            {'lat':17.355077,'lng':78.545678},
//            {'lat':17.35425,'lng':78.545897},
//            {'lat':17.353365,'lng':78.546128},
//            {'lat':17.352395,'lng':78.546391},
//            {'lat':17.351475,'lng':78.546742},
//            {'lat':17.350781,'lng':78.547229},
//            {'lat':17.350398,'lng':78.547528},
//            {'lat':17.34981,'lng':78.548002},
//            {'lat':17.349117,'lng':78.548612},
//            {'lat':17.348368,'lng':78.549225},
//            {'lat':17.34788,'lng':78.54975},
//            {'lat':17.347562,'lng':78.550033},
//            {'lat':17.347175,'lng':78.550397},
//            {'lat':17.346887,'lng':78.550714},
//            {'lat':17.346223,'lng':78.551356},
//            {'lat':17.345932,'lng':78.551802},
//            {'lat':17.34555,'lng':78.552394},
//            {'lat':17.345208,'lng':78.55295},
//            {'lat':17.344731,'lng':78.553669},
//            {'lat':17.344575,'lng':78.553942},
//            {'lat':17.344308,'lng':78.554383},
//            {'lat':17.343921,'lng':78.554962},
//            {'lat':17.343482,'lng':78.555602},
//            {'lat':17.343094,'lng':78.556135},
//            {'lat':17.342717,'lng':78.556682},
//            {'lat':17.342538,'lng':78.556963},
//            {'lat':17.342339,'lng':78.557282},
//            {'lat':17.342153,'lng':78.557579},
//            {'lat':17.341865,'lng':78.558006},
//            {'lat':17.34154,'lng':78.558597},
//            {'lat':17.341365,'lng':78.559212},
//            {'lat':17.34122,'lng':78.559838},
//            {'lat':17.341084,'lng':78.560604},
//            {'lat':17.340983,'lng':78.561326},
//            {'lat':17.340859,'lng':78.562123},
//            {'lat':17.340735,'lng':78.563013},
//            {'lat':17.340559,'lng':78.564044},
//            {'lat':17.340227,'lng':78.564975},
//            {'lat':17.339865,'lng':78.565719},
//            {'lat':17.339508,'lng':78.566413},
//            {'lat':17.339143,'lng':78.567052},
//            {'lat':17.33897,'lng':78.567355},
//            {'lat':17.338678,'lng':78.567906},
//            {'lat':17.338407,'lng':78.568571},
//            {'lat':17.338308,'lng':78.56884},
//            {'lat':17.338177,'lng':78.569267},
//            {'lat':17.338053,'lng':78.569773},
//            {'lat':17.337854,'lng':78.570413},
//            {'lat':17.337618,'lng':78.571078},
//            {'lat':17.33735,'lng':78.571852},
//            {'lat':17.337053,'lng':78.572735},
//            {'lat':17.336855,'lng':78.57348},
//            {'lat':17.336779,'lng':78.574104},
//            {'lat':17.336705,'lng':78.574677},
//            {'lat':17.33662,'lng':78.575376},
//            {'lat':17.336524,'lng':78.576178},
//            {'lat':17.336439,'lng':78.576789},
//            {'lat':17.336351,'lng':78.577513},
//            {'lat':17.336258,'lng':78.578295},
//            {'lat':17.336165,'lng':78.579007},
//            {'lat':17.336083,'lng':78.579618},
//            {'lat':17.336062,'lng':78.580064},
//            {'lat':17.336025,'lng':78.580347},
//            {'lat':17.33593,'lng':78.581079},
//            {'lat':17.335804,'lng':78.582054},
//            {'lat':17.335652,'lng':78.583169},
//            {'lat':17.335392,'lng':78.584259},
//            {'lat':17.334991,'lng':78.585195},
//            {'lat':17.33485,'lng':78.585478},
//            {'lat':17.334548,'lng':78.586068},
//            {'lat':17.334152,'lng':78.586885},
//            {'lat':17.333679,'lng':78.58785},
//            {'lat':17.33317,'lng':78.588759},
//            {'lat':17.332587,'lng':78.589722},
//            {'lat':17.331955,'lng':78.590779},
//            {'lat':17.331318,'lng':78.591791},
//            {'lat':17.330688,'lng':78.592814},
//            {'lat':17.33021,'lng':78.593802},
//            {'lat':17.329809,'lng':78.594684},
//            {'lat':17.329414,'lng':78.595845},
//            {'lat':17.329017,'lng':78.597069},
//            {'lat':17.32865,'lng':78.598238},
//            {'lat':17.328309,'lng':78.599357},
//            {'lat':17.327929,'lng':78.60052},
//            {'lat':17.327559,'lng':78.601819},
//            {'lat':17.327327,'lng':78.603105},
//            {'lat':17.327125,'lng':78.604204},
//            {'lat':17.326992,'lng':78.604948},
//            {'lat':17.326839,'lng':78.605689},
//            {'lat':17.326589,'lng':78.606345},
//            {'lat':17.326157,'lng':78.60703},
//            {'lat':17.325817,'lng':78.607495},
//            {'lat':17.325579,'lng':78.607809},
//            {'lat':17.325338,'lng':78.608123},
//            {'lat':17.324885,'lng':78.608687},
//            {'lat':17.324328,'lng':78.609403},
//            {'lat':17.3237,'lng':78.61022},
//            {'lat':17.323059,'lng':78.611057},
//            {'lat':17.322323,'lng':78.612013},
//            {'lat':17.321465,'lng':78.613137},
//            {'lat':17.321465,'lng':78.613137},
//            {'lat':17.320596,'lng':78.614365},
//            {'lat':17.320596,'lng':78.614365},
//            {'lat':17.320189,'lng':78.615802},
//            {'lat':17.319968,'lng':78.617309},
//            {'lat':17.319903,'lng':78.618753},
//            {'lat':17.319915,'lng':78.618894},
//            {'lat':17.320056,'lng':78.620182},
//            {'lat':17.320214,'lng':78.621562},
//            {'lat':17.320378,'lng':78.623055},
//            {'lat':17.320537,'lng':78.624627},
//            {'lat':17.320634,'lng':78.626261},
//            {'lat':17.320864,'lng':78.627917},
//            {'lat':17.32125,'lng':78.629497},
//            {'lat':17.321632,'lng':78.631036},
//            {'lat':17.322025,'lng':78.632597},
//            {'lat':17.322246,'lng':78.634076},
//            {'lat':17.322237,'lng':78.635467},
//            {'lat':17.322077,'lng':78.636806},
//            {'lat':17.321692,'lng':78.638234},
//            {'lat':17.321202,'lng':78.639712},
//            {'lat':17.320723,'lng':78.641172},
//            {'lat':17.320309,'lng':78.642432},
//            {'lat':17.319882,'lng':78.6438},
//            {'lat':17.319711,'lng':78.645238},
//            {'lat':17.319613,'lng':78.646699},
//            {'lat':17.319638,'lng':78.648203},
//            {'lat':17.319681,'lng':78.649775},
//            {'lat':17.319458,'lng':78.651282},
//            {'lat':17.318937,'lng':78.652718},
//            {'lat':17.31842,'lng':78.654158},
//            {'lat':17.317964,'lng':78.655459},
//            {'lat':17.317444,'lng':78.657147},
//            {'lat':17.317278,'lng':78.658779},
//            {'lat':17.317317,'lng':78.660221},
//            {'lat':17.317439,'lng':78.661717},
//            {'lat':17.317497,'lng':78.663004},
//            {'lat':17.317431,'lng':78.664251},
//            {'lat':17.317298,'lng':78.665595},
//            {'lat':17.317014,'lng':78.66693},
//            {'lat':17.316647,'lng':78.668167},
//            {'lat':17.316327,'lng':78.669398},
//            {'lat':17.315933,'lng':78.670755},
//            {'lat':17.315593,'lng':78.672165},
//            {'lat':17.315182,'lng':78.673512},
//            {'lat':17.314657,'lng':78.674917},
//            {'lat':17.314089,'lng':78.676414},
//            {'lat':17.31356,'lng':78.677837},
//            {'lat':17.313018,'lng':78.679313},
//            {'lat':17.312475,'lng':78.680745},
//            {'lat':17.311963,'lng':78.682007},
//            {'lat':17.311804,'lng':78.68232},
//            {'lat':17.311493,'lng':78.682457},
//            {'lat':17.310674,'lng':78.682228},
//            {'lat':17.309969,'lng':78.681988},
//            {'lat':17.30925,'lng':78.681735},
//            {'lat':17.308362,'lng':78.681407},
//            {'lat':17.3072,'lng':78.681003},
//            {'lat':17.305929,'lng':78.680559},
//            {'lat':17.304612,'lng':78.680389},
//            {'lat':17.303437,'lng':78.680666},
//            {'lat':17.302333,'lng':78.681098},
//            {'lat':17.301045,'lng':78.68122},
//            {'lat':17.299971,'lng':78.680994},
//            {'lat':17.298837,'lng':78.680664},
//            {'lat':17.297691,'lng':78.680328},
//            {'lat':17.296515,'lng':78.680147},
//            {'lat':17.295077,'lng':78.680115},
//            {'lat':17.293451,'lng':78.680102},
//            {'lat':17.291772,'lng':78.680062},
//            {'lat':17.290335,'lng':78.680049},
//            {'lat':17.288923,'lng':78.680033},
//            {'lat':17.287849,'lng':78.680235},
//            {'lat':17.286804,'lng':78.680824},
//            {'lat':17.286132,'lng':78.681208},
//            {'lat':17.285422,'lng':78.681179},
//            {'lat':17.284268,'lng':78.680186},
//            {'lat':17.283082,'lng':78.67984},
//            {'lat':17.281876,'lng':78.679705},
//            {'lat':17.280611,'lng':78.679581},
//            {'lat':17.279288,'lng':78.679458},
//            {'lat':17.278075,'lng':78.679323},
//            {'lat':17.277194,'lng':78.679059},
//            {'lat':17.27622,'lng':78.678714},
//            {'lat':17.275728,'lng':78.678635},
//            {'lat':17.274125,'lng':78.679006},
//            {'lat':17.272631,'lng':78.678882},
//            {'lat':17.272081,'lng':78.67868},
//            {'lat':17.271759,'lng':78.678393},
//            {'lat':17.271544,'lng':78.678115},
//            {'lat':17.271487,'lng':78.678062},
//            {'lat':17.27141,'lng':78.678029},
//            {'lat':17.271318,'lng':78.678064},
//            {'lat':17.27129,'lng':78.678134},
//            {'lat':17.271366,'lng':78.678318},
//            {'lat':17.271839,'lng':78.679107},
//            {'lat':17.272079,'lng':78.679657},
//            {'lat':17.272174,'lng':78.680763},
//            {'lat':17.271908,'lng':78.681555},
//            {'lat':17.271874,'lng':78.682226},
//            {'lat':17.272222,'lng':78.683003},
//            {'lat':17.272698,'lng':78.683735},
//            {'lat':17.27287,'lng':78.684948},
//            {'lat':17.272608,'lng':78.686003},
//            {'lat':17.272324,'lng':78.686398},
//            {'lat':17.271366,'lng':78.686875},
//            {'lat':17.270245,'lng':78.686465},
//            {'lat':17.26927,'lng':78.68586},
//            {'lat':17.268294,'lng':78.685252},
//            {'lat':17.267357,'lng':78.684521},
//            {'lat':17.266368,'lng':78.683877},
//            {'lat':17.265927,'lng':78.683809},
//            {'lat':17.265634,'lng':78.683939},
//            {'lat':17.265369,'lng':78.684019},
//            {'lat':17.265212,'lng':78.683977},
//            {'lat':17.265145,'lng':78.683925},
//            {'lat':17.265095,'lng':78.683687},
//            {'lat':17.265157,'lng':78.683515},
//            {'lat':17.265279,'lng':78.68313},
//            {'lat':17.265189,'lng':78.682489},
//            {'lat':17.26471,'lng':78.682017},
//            {'lat':17.26416,'lng':78.681932},
//            {'lat':17.26335,'lng':78.682867},
//            {'lat':17.262573,'lng':78.683287},
//            {'lat':17.262191,'lng':78.68363},
//            {'lat':17.261464,'lng':78.68364},
//            {'lat':17.26004,'lng':78.683633},
//            {'lat':17.258558,'lng':78.683577},
//            {'lat':17.25816,'lng':78.683354},
//            {'lat':17.257654,'lng':78.682928},
//            {'lat':17.256543,'lng':78.683097},
//            {'lat':17.255148,'lng':78.68312},
//            {'lat':17.253766,'lng':78.683189},
//            {'lat':17.252648,'lng':78.683417},
//            {'lat':17.25157,'lng':78.683629},
//            {'lat':17.251203,'lng':78.683704},
//            {'lat':17.250459,'lng':78.683981},
//            {'lat':17.250147,'lng':78.683966},
//            {'lat':17.250411,'lng':78.683797},
//            {'lat':17.250728,'lng':78.683808},
//            {'lat':17.251369,'lng':78.683666},
//            {'lat':17.252128,'lng':78.683535},
//            {'lat':17.252774,'lng':78.683391},
//            {'lat':17.253432,'lng':78.683253},
//            {'lat':17.25487,'lng':78.683134},
//            {'lat':17.256305,'lng':78.683083},
//            {'lat':17.256824,'lng':78.682958},
//            {'lat':17.257208,'lng':78.682849},
//            {'lat':17.257463,'lng':78.682833},
//            {'lat':17.257922,'lng':78.683052},
//            {'lat':17.258516,'lng':78.683547},
//            {'lat':17.258777,'lng':78.683575},
//            {'lat':17.259188,'lng':78.683576},
//            {'lat':17.259475,'lng':78.683583},
//            {'lat':17.260194,'lng':78.683588},
//            {'lat':17.26061,'lng':78.683597},
//            {'lat':17.260884,'lng':78.6836},
//            {'lat':17.261152,'lng':78.683599},
//            {'lat':17.26153,'lng':78.683604},
//            {'lat':17.261763,'lng':78.68361},
//            {'lat':17.261872,'lng':78.68361},
//            {'lat':17.262158,'lng':78.683523},
//            {'lat':17.262274,'lng':78.683391},
//            {'lat':17.262314,'lng':78.683315},
//            {'lat':17.262437,'lng':78.683137},
//            {'lat':17.262559,'lng':78.683129},
//            {'lat':17.26276,'lng':78.683304},
//            {'lat':17.263059,'lng':78.683236},
//            {'lat':17.263653,'lng':78.682258},
//            {'lat':17.263933,'lng':78.68181},
//            {'lat':17.264083,'lng':78.68166},
//            {'lat':17.264283,'lng':78.681682},
//            {'lat':17.264425,'lng':78.681749},
//            {'lat':17.265004,'lng':78.682131},
//            {'lat':17.265359,'lng':78.682715},
//            {'lat':17.2652,'lng':78.683552},
//            {'lat':17.265186,'lng':78.683831},
//            {'lat':17.265373,'lng':78.683929},
//            {'lat':17.265507,'lng':78.683886},
//            {'lat':17.265842,'lng':78.683726},
//            {'lat':17.266338,'lng':78.683758},
//            {'lat':17.267348,'lng':78.684418},
//            {'lat':17.268102,'lng':78.685012},
//            {'lat':17.269019,'lng':78.685605},
//            {'lat':17.270169,'lng':78.68634},
//            {'lat':17.270839,'lng':78.686764},
//            {'lat':17.272269,'lng':78.686435},
//            {'lat':17.272595,'lng':78.686003},
//            {'lat':17.272849,'lng':78.684434},
//            {'lat':17.272727,'lng':78.683842},
//            {'lat':17.271979,'lng':78.682623},
//            {'lat':17.271854,'lng':78.681738},
//            {'lat':17.272102,'lng':78.681073},
//            {'lat':17.272115,'lng':78.679996},
//            {'lat':17.27181,'lng':78.679076},
//            {'lat':17.271298,'lng':78.67811},
//            {'lat':17.270996,'lng':78.677416},
//            {'lat':17.270903,'lng':78.676807},
//            {'lat':17.270964,'lng':78.676524},
//            {'lat':17.271099,'lng':78.676359},
//            {'lat':17.271228,'lng':78.676398},
//            {'lat':17.271224,'lng':78.676645},
//            {'lat':17.271127,'lng':78.677007},
//            {'lat':17.271189,'lng':78.677333},
//            {'lat':17.271616,'lng':78.677707},
//            {'lat':17.272033,'lng':78.677983},
//            {'lat':17.272485,'lng':78.678237},
//            {'lat':17.273164,'lng':78.67848},
//            {'lat':17.273214,'lng':78.678486},
//            {'lat':17.273372,'lng':78.678492},
//            {'lat':17.273482,'lng':78.678486},
//            {'lat':17.274753,'lng':78.678354},
//            {'lat':17.275545,'lng':78.678114},
//            {'lat':17.275619,'lng':78.678103},
//            {'lat':17.275869,'lng':78.678099},
//            {'lat':17.276048,'lng':78.678127},
//            {'lat':17.276438,'lng':78.678268},
//            {'lat':17.277074,'lng':78.678814},
//            {'lat':17.278921,'lng':78.679199},
//            {'lat':17.280666,'lng':78.679372},
//            {'lat':17.282314,'lng':78.679523},
//            {'lat':17.283962,'lng':78.679679},
//            {'lat':17.284542,'lng':78.679835},
//            {'lat':17.285155,'lng':78.680687},
//            {'lat':17.28549,'lng':78.680994},
//            {'lat':17.285931,'lng':78.681093},
//            {'lat':17.286224,'lng':78.681021},
//            {'lat':17.28754,'lng':78.680248},
//            {'lat':17.288059,'lng':78.680009},
//            {'lat':17.288503,'lng':78.679925},
//            {'lat':17.288983,'lng':78.679917},
//            {'lat':17.289322,'lng':78.679923},
//            {'lat':17.291116,'lng':78.679957},
//            {'lat':17.292884,'lng':78.679985},
//            {'lat':17.294412,'lng':78.68},
//            {'lat':17.294815,'lng':78.680007},
//            {'lat':17.295192,'lng':78.680012},
//            {'lat':17.295429,'lng':78.680015},
//            {'lat':17.295884,'lng':78.680018},
//            {'lat':17.296205,'lng':78.680022},
//            {'lat':17.296418,'lng':78.68002},
//            {'lat':17.297611,'lng':78.680191},
//            {'lat':17.298977,'lng':78.680602},
//            {'lat':17.300537,'lng':78.681065},
//            {'lat':17.300694,'lng':78.681099},
//            {'lat':17.301168,'lng':78.681156},
//            {'lat':17.301487,'lng':78.681153},
//            {'lat':17.303031,'lng':78.680741},
//            {'lat':17.304547,'lng':78.680286},
//            {'lat':17.304713,'lng':78.680275},
//            {'lat':17.305225,'lng':78.680288},
//            {'lat':17.305565,'lng':78.68034},
//            {'lat':17.307145,'lng':78.68086},
//            {'lat':17.308593,'lng':78.681373},
//            {'lat':17.309708,'lng':78.681764},
//            {'lat':17.31018,'lng':78.682037},
//            {'lat':17.310882,'lng':78.682282},
//            {'lat':17.311281,'lng':78.682413},
//            {'lat':17.311428,'lng':78.682452},
//            {'lat':17.311539,'lng':78.682457},
//            {'lat':17.311727,'lng':78.6823},
//            {'lat':17.312117,'lng':78.681365},
//            {'lat':17.312483,'lng':78.680484},
//            {'lat':17.31284,'lng':78.679593},
//            {'lat':17.313222,'lng':78.678588},
//            {'lat':17.313613,'lng':78.677546},
//            {'lat':17.314013,'lng':78.676509},
//            {'lat':17.314461,'lng':78.675381},
//            {'lat':17.314854,'lng':78.67434},
//            {'lat':17.315228,'lng':78.673345},
//            {'lat':17.315531,'lng':78.672323},
//            {'lat':17.315787,'lng':78.67122},
//            {'lat':17.316057,'lng':78.670083},
//            {'lat':17.316398,'lng':78.668792},
//            {'lat':17.316834,'lng':78.667328},
//            {'lat':17.317197,'lng':78.665805},
//            {'lat':17.317372,'lng':78.664286},
//            {'lat':17.31741,'lng':78.662825},
//            {'lat':17.317308,'lng':78.661209},
//            {'lat':17.317168,'lng':78.659538},
//            {'lat':17.317217,'lng':78.657956},
//            {'lat':17.317536,'lng':78.65636},
//            {'lat':17.318075,'lng':78.654858},
//            {'lat':17.318583,'lng':78.653505},
//            {'lat':17.319122,'lng':78.652049},
//            {'lat':17.319607,'lng':78.650509},
//            {'lat':17.31959,'lng':78.648819},
//            {'lat':17.319554,'lng':78.647133},
//            {'lat':17.319603,'lng':78.645477},
//            {'lat':17.319793,'lng':78.64387},
//            {'lat':17.320223,'lng':78.64253},
//            {'lat':17.320682,'lng':78.641101},
//            {'lat':17.321172,'lng':78.639603},
//            {'lat':17.321685,'lng':78.638043},
//            {'lat':17.32207,'lng':78.63642},
//            {'lat':17.322184,'lng':78.634823},
//            {'lat':17.32208,'lng':78.633227},
//            {'lat':17.321749,'lng':78.631706},
//            {'lat':17.321393,'lng':78.630375},
//            {'lat':17.321149,'lng':78.62945},
//            {'lat':17.320941,'lng':78.628652},
//            {'lat':17.32072,'lng':78.627685},
//            {'lat':17.320577,'lng':78.626635},
//            {'lat':17.320505,'lng':78.62548},
//            {'lat':17.320416,'lng':78.624164},
//            {'lat':17.320259,'lng':78.622735},
//            {'lat':17.320102,'lng':78.62124},
//            {'lat':17.319939,'lng':78.619719},
//            {'lat':17.319824,'lng':78.618183},
//            {'lat':17.32004,'lng':78.616468},
//            {'lat':17.320301,'lng':78.614874},
//            {'lat':17.320999,'lng':78.613629},
//            {'lat':17.321884,'lng':78.612479},
//            {'lat':17.322788,'lng':78.611289},
//            {'lat':17.323779,'lng':78.609993},
//            {'lat':17.324766,'lng':78.6087},
//            {'lat':17.325637,'lng':78.607573},
//            {'lat':17.326442,'lng':78.606517},
//            {'lat':17.32675,'lng':78.60587},
//            {'lat':17.326931,'lng':78.605129},
//            {'lat':17.327101,'lng':78.604175},
//            {'lat':17.327295,'lng':78.603054},
//            {'lat':17.327502,'lng':78.601831},
//            {'lat':17.327862,'lng':78.600537},
//            {'lat':17.328289,'lng':78.59918},
//            {'lat':17.328745,'lng':78.597733},
//            {'lat':17.329178,'lng':78.596328},
//            {'lat':17.329616,'lng':78.594988},
//            {'lat':17.330169,'lng':78.593739},
//            {'lat':17.330805,'lng':78.592514},
//            {'lat':17.331585,'lng':78.591243},
//            {'lat':17.33232,'lng':78.589992},
//            {'lat':17.333032,'lng':78.588823},
//            {'lat':17.333715,'lng':78.587572},
//            {'lat':17.334327,'lng':78.586256},
//            {'lat':17.334953,'lng':78.584865},
//            {'lat':17.335452,'lng':78.583535},
//            {'lat':17.335653,'lng':78.582333},
//            {'lat':17.335838,'lng':78.581032},
//            {'lat':17.335995,'lng':78.579693},
//            {'lat':17.33608,'lng':78.57853},
//            {'lat':17.336237,'lng':78.577394},
//            {'lat':17.336404,'lng':78.576027},
//            {'lat':17.336563,'lng':78.574547},
//            {'lat':17.336855,'lng':78.573039},
//            {'lat':17.337165,'lng':78.572032},
//            {'lat':17.337492,'lng':78.570936},
//            {'lat':17.337746,'lng':78.570118},
//            {'lat':17.337983,'lng':78.569394},
//            {'lat':17.3381,'lng':78.569074},
//            {'lat':17.338345,'lng':78.568319},
//            {'lat':17.338741,'lng':78.567382},
//            {'lat':17.338986,'lng':78.56692},
//            {'lat':17.339342,'lng':78.5663},
//            {'lat':17.339802,'lng':78.565397},
//            {'lat':17.340301,'lng':78.564382},
//            {'lat':17.340609,'lng':78.563019},
//            {'lat':17.340811,'lng':78.561588},
//            {'lat':17.341005,'lng':78.560268},
//            {'lat':17.341147,'lng':78.559139},
//            {'lat':17.341222,'lng':78.558849},
//            {'lat':17.341455,'lng':78.558193},
//            {'lat':17.341947,'lng':78.557354},
//            {'lat':17.342356,'lng':78.55676},
//            {'lat':17.342858,'lng':78.556142},
//            {'lat':17.343407,'lng':78.555375},
//            {'lat':17.343948,'lng':78.554593},
//            {'lat':17.344474,'lng':78.55379},
//            {'lat':17.345053,'lng':78.552866},
//            {'lat':17.345504,'lng':78.5522},
//            {'lat':17.346015,'lng':78.55136},
//            {'lat':17.34666,'lng':78.55062},
//            {'lat':17.347132,'lng':78.550025},
//            {'lat':17.347799,'lng':78.549424},
//            {'lat':17.34855,'lng':78.548862},
//            {'lat':17.349445,'lng':78.548179},
//            {'lat':17.350443,'lng':78.547383},
//            {'lat':17.35161,'lng':78.546567},
//            {'lat':17.352994,'lng':78.546129},
//            {'lat':17.354432,'lng':78.545756},
//            {'lat':17.355832,'lng':78.545394},
//            {'lat':17.357251,'lng':78.545037},
//            {'lat':17.358717,'lng':78.544677},
//            {'lat':17.360158,'lng':78.544289},
//            {'lat':17.361591,'lng':78.543895},
//            {'lat':17.362553,'lng':78.543584},
//            {'lat':17.363238,'lng':78.543323},
//            {'lat':17.36392,'lng':78.543088},
//            {'lat':17.364963,'lng':78.542552},
//            {'lat':17.36605,'lng':78.541764},
//            {'lat':17.366924,'lng':78.540729},
//            {'lat':17.367402,'lng':78.539957},
//            {'lat':17.367732,'lng':78.53931},
//            {'lat':17.368104,'lng':78.538223},
//            {'lat':17.368284,'lng':78.536802},
//            {'lat':17.368352,'lng':78.535327},
//            {'lat':17.368295,'lng':78.53413},
//            {'lat':17.36828,'lng':78.533279},
//            {'lat':17.368284,'lng':78.532983},
//            {'lat':17.368322,'lng':78.532191},
//            {'lat':17.368386,'lng':78.53111},
//            {'lat':17.368407,'lng':78.529899},
//            {'lat':17.368425,'lng':78.528675},
//            {'lat':17.368476,'lng':78.527662},
//            {'lat':17.368505,'lng':78.52668},
//            {'lat':17.368489,'lng':78.525888},
//            {'lat':17.368477,'lng':78.524819},
//            {'lat':17.368537,'lng':78.524215},
//            {'lat':17.368546,'lng':78.523554},
//            {'lat':17.368572,'lng':78.52236},
//            {'lat':17.368607,'lng':78.521732},
//            {'lat':17.368611,'lng':78.521011},
//            {'lat':17.368648,'lng':78.520229},
//            {'lat':17.36865,'lng':78.520163},
//            {'lat':17.368692,'lng':78.520044},
//            {'lat':17.36874,'lng':78.520018},
//            {'lat':17.368771,'lng':78.520025},
//            {'lat':17.368823,'lng':78.520074},
//            {'lat':17.368829,'lng':78.520151},
//            {'lat':17.368772,'lng':78.521134},
//            {'lat':17.368742,'lng':78.521737},
//            {'lat':17.368717,'lng':78.522423},
//            {'lat':17.368707,'lng':78.52299},
//            {'lat':17.368675,'lng':78.52373},
//            {'lat':17.368667,'lng':78.524552},
//            {'lat':17.368639,'lng':78.525167},
//            {'lat':17.368572,'lng':78.525687},
//            {'lat':17.368617,'lng':78.526487},
//            {'lat':17.368579,'lng':78.527432},
//            {'lat':17.368547,'lng':78.528198},
//            {'lat':17.368529,'lng':78.5292},
//            {'lat':17.368489,'lng':78.530343},
//            {'lat':17.368452,'lng':78.531525},
//            {'lat':17.36842,'lng':78.532647},
//            {'lat':17.368399,'lng':78.533817},
//            {'lat':17.368362,'lng':78.535002},
//            {'lat':17.368315,'lng':78.536233},
//            {'lat':17.3683,'lng':78.5373},
//            {'lat':17.368142,'lng':78.53834},
//            {'lat':17.367822,'lng':78.539387},
//            {'lat':17.367314,'lng':78.540417},
//            {'lat':17.366667,'lng':78.541335},
//            {'lat':17.36585,'lng':78.542183},
//            {'lat':17.364869,'lng':78.542913},
//            {'lat':17.363716,'lng':78.543451},
//            {'lat':17.362494,'lng':78.543816},
//            {'lat':17.361283,'lng':78.544154},
//            {'lat':17.360074,'lng':78.54445},
//            {'lat':17.35897,'lng':78.544732},
//            {'lat':17.357876,'lng':78.545018},
//            {'lat':17.356657,'lng':78.54532},
//            {'lat':17.355475,'lng':78.545614},
//            {'lat':17.354319,'lng':78.545919}
        
        
        var arrLatLng =[{'lat':17.346959,'lng':78.550697},
            {'lat':17.346634,'lng':78.55098},
            {'lat':17.346293,'lng':78.551212},
            {'lat':17.345865,'lng':78.551841},
            {'lat':17.345653,'lng':78.552165},
            {'lat':17.345043,'lng':78.553064},
            {'lat':17.344433,'lng':78.553959},
            {'lat':17.343968,'lng':78.554673},
            {'lat':17.343863,'lng':78.554925},
            {'lat':17.34385,'lng':78.555006},
            {'lat':17.343616,'lng':78.555274},
            {'lat':17.343429,'lng':78.555545},
            {'lat':17.343121,'lng':78.556004},
            {'lat':17.342575,'lng':78.556817},
            {'lat':17.34217,'lng':78.557519},
            {'lat':17.341697,'lng':78.558216},
            {'lat':17.341381,'lng':78.559085},
            {'lat':17.341182,'lng':78.559965},
            {'lat':17.341018,'lng':78.561022},
            {'lat':17.34081,'lng':78.562167},
            {'lat':17.340618,'lng':78.563527},
            {'lat':17.340234,'lng':78.56484},
            {'lat':17.33961,'lng':78.566058},
            {'lat':17.338973,'lng':78.567162},
            {'lat':17.338464,'lng':78.568185},
            {'lat':17.338228,'lng':78.568904},
            {'lat':17.338068,'lng':78.569437},
            {'lat':17.337854,'lng':78.5702},
            {'lat':17.337534,'lng':78.571274},
            {'lat':17.337112,'lng':78.572531},
            {'lat':17.336841,'lng':78.573448},
            {'lat':17.336769,'lng':78.574173},
            {'lat':17.336615,'lng':78.574999},
            {'lat':17.336476,'lng':78.576078},
            {'lat':17.336364,'lng':78.577222},
            {'lat':17.336256,'lng':78.57794},
            {'lat':17.336131,'lng':78.578932},
            {'lat':17.336091,'lng':78.579252},
            {'lat':17.335961,'lng':78.580408},
            {'lat':17.335793,'lng':78.581775},
            {'lat':17.335635,'lng':78.583026},
            {'lat':17.335254,'lng':78.584419},
            {'lat':17.334627,'lng':78.585759},
            {'lat':17.333965,'lng':78.587144},
            {'lat':17.333235,'lng':78.588547},
            {'lat':17.332449,'lng':78.589885},
            {'lat':17.331642,'lng':78.591237},
            {'lat':17.330825,'lng':78.592564},
            {'lat':17.330185,'lng':78.593899},
            {'lat':17.32964,'lng':78.595333},
            {'lat':17.329205,'lng':78.596668},
            {'lat':17.328734,'lng':78.598137},
            {'lat':17.328227,'lng':78.599705},
            {'lat':17.327742,'lng':78.601268},
            {'lat':17.327405,'lng':78.602809},
            {'lat':17.327154,'lng':78.604188},
            {'lat':17.327003,'lng':78.605014},
            {'lat':17.326867,'lng':78.605678},
            {'lat':17.326524,'lng':78.606476},
            {'lat':17.325873,'lng':78.607424},
            {'lat':17.325059,'lng':78.608502},
            {'lat':17.324198,'lng':78.609632},
            {'lat':17.323338,'lng':78.610732},
            {'lat':17.322473,'lng':78.611852},
            {'lat':17.321576,'lng':78.613005},
            {'lat':17.321576,'lng':78.613005},
            {'lat':17.320714,'lng':78.61419},
            {'lat':17.320714,'lng':78.61419},
            {'lat':17.320274,'lng':78.615549},
            {'lat':17.320274,'lng':78.615549},
            {'lat':17.320062,'lng':78.61697},
            {'lat':17.320062,'lng':78.61697},
            {'lat':17.319929,'lng':78.61842},
            {'lat':17.320045,'lng':78.619935},
            {'lat':17.320235,'lng':78.621518},
            {'lat':17.32041,'lng':78.623105},
            {'lat':17.320556,'lng':78.624603},
            {'lat':17.320639,'lng':78.6261},
            {'lat':17.320794,'lng':78.62756},
            {'lat':17.321152,'lng':78.629068},
            {'lat':17.321547,'lng':78.630534},
            {'lat':17.321905,'lng':78.631878},
            {'lat':17.322164,'lng':78.632733},
            {'lat':17.322278,'lng':78.633736},
            {'lat':17.32227,'lng':78.634787},
            {'lat':17.322198,'lng':78.636047},
            {'lat':17.321924,'lng':78.637485},
            {'lat':17.321485,'lng':78.638886},
            {'lat':17.321028,'lng':78.640275},
            {'lat':17.320575,'lng':78.641642},
            {'lat':17.320112,'lng':78.643052},
            {'lat':17.319755,'lng':78.644578},
            {'lat':17.319613,'lng':78.646127},
            {'lat':17.319637,'lng':78.647627},
            {'lat':17.319692,'lng':78.649121},
            {'lat':17.319694,'lng':78.650475},
            {'lat':17.319268,'lng':78.651875},
            {'lat':17.31913,'lng':78.652252},
            {'lat':17.318735,'lng':78.653358},
            {'lat':17.318355,'lng':78.654505},
            {'lat':17.317896,'lng':78.655792},
            {'lat':17.317428,'lng':78.657263},
            {'lat':17.317267,'lng':78.658985},
            {'lat':17.317369,'lng':78.660729},
            {'lat':17.317443,'lng':78.661884},
            {'lat':17.317471,'lng':78.662622},
            {'lat':17.317479,'lng':78.663108},
            {'lat':17.317475,'lng':78.663703},
            {'lat':17.317462,'lng':78.664577},
            {'lat':17.317294,'lng':78.665752},
            {'lat':17.317002,'lng':78.667083},
            {'lat':17.316619,'lng':78.668404},
            {'lat':17.316209,'lng':78.669689},
            {'lat':17.315886,'lng':78.671153},
            {'lat':17.315457,'lng':78.672837},
            {'lat':17.314804,'lng':78.674567},
            {'lat':17.314133,'lng':78.676301},
            {'lat':17.313506,'lng':78.677974},
            {'lat':17.312882,'lng':78.679639},
            {'lat':17.312275,'lng':78.681202},
            {'lat':17.311882,'lng':78.68218},
            {'lat':17.311695,'lng':78.682398},
            {'lat':17.310665,'lng':78.682197},
            {'lat':17.309954,'lng':78.681953},
            {'lat':17.309592,'lng':78.681844},
            {'lat':17.309528,'lng':78.681767},
            {'lat':17.309573,'lng':78.681681},
            {'lat':17.309629,'lng':78.681669},
            {'lat':17.30995,'lng':78.68183},
            {'lat':17.310075,'lng':78.681925},
            {'lat':17.310405,'lng':78.682096},
            {'lat':17.310879,'lng':78.682262},
            {'lat':17.311758,'lng':78.682222},
            {'lat':17.311924,'lng':78.681839},
            {'lat':17.312113,'lng':78.681379},
            {'lat':17.312318,'lng':78.680889},
            {'lat':17.31277,'lng':78.679712},
            {'lat':17.313104,'lng':78.67884},
            {'lat':17.313455,'lng':78.677935},
            {'lat':17.313762,'lng':78.6771},
            {'lat':17.314072,'lng':78.676265},
            {'lat':17.314438,'lng':78.675294},
            {'lat':17.314777,'lng':78.674392},
            {'lat':17.315079,'lng':78.673583},
            {'lat':17.315403,'lng':78.672658},
            {'lat':17.315677,'lng':78.671678},
            {'lat':17.315935,'lng':78.670591},
            {'lat':17.316258,'lng':78.669369},
            {'lat':17.316659,'lng':78.668},
            {'lat':17.317069,'lng':78.666603},
            {'lat':17.317311,'lng':78.665238},
            {'lat':17.317422,'lng':78.663871},
            {'lat':17.317425,'lng':78.662464},
            {'lat':17.317341,'lng':78.660967},
            {'lat':17.317219,'lng':78.659435},
            {'lat':17.317262,'lng':78.657984},
            {'lat':17.317499,'lng':78.656704},
            {'lat':17.31788,'lng':78.655457},
            {'lat':17.318312,'lng':78.654194},
            {'lat':17.318775,'lng':78.652942},
            {'lat':17.319246,'lng':78.651641},
            {'lat':17.319634,'lng':78.650313},
            {'lat':17.319622,'lng':78.648917},
            {'lat':17.319583,'lng':78.64753},
            {'lat':17.319575,'lng':78.646122},
            {'lat':17.319698,'lng':78.644677},
            {'lat':17.319983,'lng':78.643285},
            {'lat':17.320409,'lng':78.641984},
            {'lat':17.32082,'lng':78.640729},
            {'lat':17.321255,'lng':78.639412},
            {'lat':17.321669,'lng':78.638155},
            {'lat':17.32198,'lng':78.636887},
            {'lat':17.322165,'lng':78.635528},
            {'lat':17.322169,'lng':78.634064},
            {'lat':17.321937,'lng':78.632502},
            {'lat':17.321537,'lng':78.630934},
            {'lat':17.321132,'lng':78.629377},
            {'lat':17.320774,'lng':78.627837},
            {'lat':17.320598,'lng':78.626347},
            {'lat':17.320515,'lng':78.624807},
            {'lat':17.320366,'lng':78.623264},
            {'lat':17.3202,'lng':78.62175},
            {'lat':17.320039,'lng':78.620259},
            {'lat':17.31988,'lng':78.618756},
            {'lat':17.319935,'lng':78.61732},
            {'lat':17.320149,'lng':78.615845},
            {'lat':17.320456,'lng':78.6145},
            {'lat':17.321145,'lng':78.613423},
            {'lat':17.321989,'lng':78.61233},
            {'lat':17.322869,'lng':78.611185},
            {'lat':17.32377,'lng':78.610006},
            {'lat':17.324704,'lng':78.60879},
            {'lat':17.325617,'lng':78.607595},
            {'lat':17.326473,'lng':78.606466},
            {'lat':17.326925,'lng':78.605135},
            {'lat':17.327103,'lng':78.604149},
            {'lat':17.327267,'lng':78.603232},
            {'lat':17.327448,'lng':78.602123},
            {'lat':17.327697,'lng':78.601004},
            {'lat':17.328096,'lng':78.599709},
            {'lat':17.32851,'lng':78.598402},
            {'lat':17.328943,'lng':78.59705},
            {'lat':17.329365,'lng':78.595684},
            {'lat':17.329829,'lng':78.594395},
            {'lat':17.330397,'lng':78.593152},
            {'lat':17.331103,'lng':78.591987},
            {'lat':17.331897,'lng':78.590732},
            {'lat':17.332632,'lng':78.589452},
            {'lat':17.333318,'lng':78.588205},
            {'lat':17.333935,'lng':78.586958},
            {'lat':17.334486,'lng':78.585758},
            {'lat':17.334894,'lng':78.58483},
            {'lat':17.334978,'lng':78.584514},
            {'lat':17.335163,'lng':78.584303},
            {'lat':17.335292,'lng':78.58404},
            {'lat':17.335433,'lng':78.583605},
            {'lat':17.335539,'lng':78.583059},
            {'lat':17.335681,'lng':78.582113},
            {'lat':17.33585,'lng':78.580894},
            {'lat':17.336002,'lng':78.579638},
            {'lat':17.336142,'lng':78.57839},
            {'lat':17.336304,'lng':78.577075},
            {'lat':17.336486,'lng':78.57568},
            {'lat':17.33667,'lng':78.57425},
            {'lat':17.336764,'lng':78.573444},
            {'lat':17.337023,'lng':78.5725},
            {'lat':17.337382,'lng':78.571465},
            {'lat':17.337694,'lng':78.570454},
            {'lat':17.337895,'lng':78.569883},
            {'lat':17.338073,'lng':78.569347},
            {'lat':17.338325,'lng':78.568508},
            {'lat':17.338769,'lng':78.567434},
            {'lat':17.339494,'lng':78.56614},
            {'lat':17.340243,'lng':78.564706},
            {'lat':17.34064,'lng':78.563134},
            {'lat':17.340849,'lng':78.561536},
            {'lat':17.34108,'lng':78.55994},
            {'lat':17.341416,'lng':78.558395},
            {'lat':17.342075,'lng':78.55718},
            {'lat':17.34249,'lng':78.55663},
            {'lat':17.343,'lng':78.555989},
            {'lat':17.343648,'lng':78.555111},
            {'lat':17.34439,'lng':78.554},
            {'lat':17.345187,'lng':78.552794},
            {'lat':17.345899,'lng':78.551713},
            {'lat':17.346398,'lng':78.550899},
            {'lat':17.346687,'lng':78.550585},
            {'lat':17.347107,'lng':78.550083},
            {'lat':17.347772,'lng':78.549419},
            {'lat':17.348624,'lng':78.548777},
            {'lat':17.349145,'lng':78.548413},
            {'lat':17.349518,'lng':78.548065},
            {'lat':17.350349,'lng':78.54737},
            {'lat':17.350905,'lng':78.546995},
            {'lat':17.351735,'lng':78.546536},
            {'lat':17.352934,'lng':78.546182},
            {'lat':17.35427,'lng':78.545832},
            {'lat':17.355649,'lng':78.545475},
            {'lat':17.356985,'lng':78.545138},
            {'lat':17.358264,'lng':78.5448},
            {'lat':17.3592,'lng':78.54456},
            {'lat':17.359949,'lng':78.544369},
            {'lat':17.360337,'lng':78.544261},
            {'lat':17.36119,'lng':78.544029},
            {'lat':17.362378,'lng':78.543685},
            {'lat':17.363567,'lng':78.54331},
            {'lat':17.364576,'lng':78.542895},
            {'lat':17.365556,'lng':78.542285},
            {'lat':17.366442,'lng':78.541436},
            {'lat':17.367155,'lng':78.540469},
            {'lat':17.367568,'lng':78.539699},
            {'lat':17.367971,'lng':78.538669},
            {'lat':17.368232,'lng':78.53733},
            {'lat':17.368297,'lng':78.535915},
            {'lat':17.368328,'lng':78.534559},
            {'lat':17.368356,'lng':78.533253},
            {'lat':17.368376,'lng':78.532032},
            {'lat':17.368422,'lng':78.53065},
            {'lat':17.368449,'lng':78.529279},
            {'lat':17.368475,'lng':78.527969},
            {'lat':17.368498,'lng':78.5268},
            {'lat':17.368545,'lng':78.525565},
            {'lat':17.368526,'lng':78.524868},
            {'lat':17.368507,'lng':78.524245},
            {'lat':17.368514,'lng':78.523353},
            {'lat':17.368517,'lng':78.52254},
            {'lat':17.368544,'lng':78.521874},
            {'lat':17.368538,'lng':78.521112},
            {'lat':17.36859,'lng':78.520266},
            {'lat':17.368604,'lng':78.520103},
            {'lat':17.368711,'lng':78.520053},
            {'lat':17.368765,'lng':78.520107},
            {'lat':17.368776,'lng':78.520158},
            {'lat':17.36878,'lng':78.520622},
            {'lat':17.368748,'lng':78.520892},
            {'lat':17.368742,'lng':78.521228},
            {'lat':17.368729,'lng':78.52167},
            {'lat':17.368729,'lng':78.52214},
            {'lat':17.368781,'lng':78.522568},
            {'lat':17.368747,'lng':78.523059},
            {'lat':17.368713,'lng':78.523839},
            {'lat':17.3687,'lng':78.524704},
            {'lat':17.368703,'lng':78.525608},
            {'lat':17.368632,'lng':78.526663},
            {'lat':17.368605,'lng':78.527774},
            {'lat':17.368611,'lng':78.528339},
            {'lat':17.368599,'lng':78.52881},
            {'lat':17.368558,'lng':78.529667},
            {'lat':17.368512,'lng':78.530692},
            {'lat':17.368498,'lng':78.531853},
            {'lat':17.368503,'lng':78.53271},
            {'lat':17.368515,'lng':78.533195},
            {'lat':17.368476,'lng':78.533787},
            {'lat':17.368439,'lng':78.534627},
            {'lat':17.368385,'lng':78.535431},
            {'lat':17.368384,'lng':78.536392},
            {'lat':17.368323,'lng':78.537482},
            {'lat':17.368101,'lng':78.538637},
            {'lat':17.367822,'lng':78.539597},
            {'lat':17.367655,'lng':78.539936},
            {'lat':17.367302,'lng':78.540539},
            {'lat':17.36672,'lng':78.541348},
            {'lat':17.365832,'lng':78.542254},
            {'lat':17.364769,'lng':78.543008},
            {'lat':17.363605,'lng':78.543538},
            {'lat':17.362392,'lng':78.543887},
            {'lat':17.361187,'lng':78.544198},
            {'lat':17.360043,'lng':78.544502},
            {'lat':17.358912,'lng':78.544791},
            {'lat':17.357815,'lng':78.545069},
            {'lat':17.356662,'lng':78.545358},
            {'lat':17.355467,'lng':78.545646},
            {'lat':17.35426,'lng':78.545953},
            {'lat':17.352978,'lng':78.546284},
            {'lat':17.351707,'lng':78.546674},
            {'lat':17.350832,'lng':78.547244},
            {'lat':17.35013,'lng':78.547776},
            {'lat':17.349313,'lng':78.548408},
            {'lat':17.348338,'lng':78.549209},
            {'lat':17.347782,'lng':78.549804},
            {'lat':17.347164,'lng':78.550407},
            {'lat':17.346961,'lng':78.550676},
            {'lat':17.346235,'lng':78.551422},
            {'lat':17.345755,'lng':78.552093},
            {'lat':17.345256,'lng':78.552895},
            {'lat':17.344966,'lng':78.553285},
            {'lat':17.344674,'lng':78.553732},
            {'lat':17.344237,'lng':78.554436},
            {'lat':17.343642,'lng':78.555355},
            {'lat':17.342901,'lng':78.556377},
            {'lat':17.342387,'lng':78.557173},
            {'lat':17.34214,'lng':78.557639},
            {'lat':17.341672,'lng':78.558317},
            {'lat':17.341374,'lng':78.559161},
            {'lat':17.341182,'lng':78.559994},
            {'lat':17.341057,'lng':78.560933},
            {'lat':17.3409,'lng':78.562055},
            {'lat':17.340709,'lng':78.563395},
            {'lat':17.340432,'lng':78.564505},
            {'lat':17.340063,'lng':78.565359},
            {'lat':17.339887,'lng':78.565654},
            {'lat':17.339608,'lng':78.56621},
            {'lat':17.339243,'lng':78.566907},
            {'lat':17.339098,'lng':78.567158},
            {'lat':17.33899,'lng':78.567319},
            {'lat':17.338828,'lng':78.567588},
            {'lat':17.33863,'lng':78.567975},
            {'lat':17.33844,'lng':78.568444},
            {'lat':17.33803,'lng':78.569665},
            {'lat':17.337742,'lng':78.570482},
            {'lat':17.337399,'lng':78.57155},
            {'lat':17.337045,'lng':78.572769},
            {'lat':17.336755,'lng':78.573797},
            {'lat':17.336628,'lng':78.574802},
            {'lat':17.336497,'lng':78.57591},
            {'lat':17.336358,'lng':78.577067},
            {'lat':17.336218,'lng':78.578291},
            {'lat':17.336069,'lng':78.579563},
            {'lat':17.335925,'lng':78.580802},
            {'lat':17.335785,'lng':78.582182},
            {'lat':17.33553,'lng':78.583644},
            {'lat':17.334995,'lng':78.584997},
            {'lat':17.334377,'lng':78.586293},
            {'lat':17.333764,'lng':78.58759},
            {'lat':17.333169,'lng':78.588705},
            {'lat':17.332715,'lng':78.589563},
            {'lat':17.332541,'lng':78.58985},
            {'lat':17.332124,'lng':78.59053},
            {'lat':17.331556,'lng':78.591417},
            {'lat':17.330924,'lng':78.592438},
            {'lat':17.330344,'lng':78.593572},
            {'lat':17.329813,'lng':78.594742},
            {'lat':17.329339,'lng':78.596148},
            {'lat':17.328872,'lng':78.597608},
            {'lat':17.328424,'lng':78.599046},
            {'lat':17.327968,'lng':78.600449},
            {'lat':17.327563,'lng':78.601885},
            {'lat':17.327306,'lng':78.603334},
            {'lat':17.327052,'lng':78.60475},
            {'lat':17.32677,'lng':78.605983},
            {'lat':17.326105,'lng':78.607088},
            {'lat':17.325318,'lng':78.608128},
            {'lat':17.324466,'lng':78.609187},
            {'lat':17.32365,'lng':78.610244},
            {'lat':17.322832,'lng':78.611309},
            {'lat':17.321927,'lng':78.61249},
            {'lat':17.321927,'lng':78.61249},
            {'lat':17.320979,'lng':78.613753},
            {'lat':17.320979,'lng':78.613753},
            {'lat':17.3203,'lng':78.615192},
            {'lat':17.3203,'lng':78.615192},
            {'lat':17.320071,'lng':78.616714},
            {'lat':17.320071,'lng':78.616714},
            {'lat':17.319894,'lng':78.618231},
            {'lat':17.319894,'lng':78.618231},
            {'lat':17.320045,'lng':78.619783},
            {'lat':17.320045,'lng':78.619783},
            {'lat':17.320255,'lng':78.621498},
            {'lat':17.32044,'lng':78.623164},
            {'lat':17.320569,'lng':78.624855},
            {'lat':17.320673,'lng':78.626582},
            {'lat':17.320686,'lng':78.626751},
            {'lat':17.320985,'lng':78.628266},
            {'lat':17.321329,'lng':78.629777},
            {'lat':17.321789,'lng':78.631573},
            {'lat':17.322196,'lng':78.633372},
            {'lat':17.322276,'lng':78.635173},
            {'lat':17.32207,'lng':78.636942},
            {'lat':17.321568,'lng':78.638674},
            {'lat':17.321009,'lng':78.640361},
            {'lat':17.320534,'lng':78.641797},
            {'lat':17.320106,'lng':78.643084},
            {'lat':17.319751,'lng':78.644427},
            {'lat':17.319664,'lng':78.646002},
            {'lat':17.319652,'lng':78.647699},
            {'lat':17.319703,'lng':78.649477},
            {'lat':17.319699,'lng':78.650511},
            {'lat':17.319097,'lng':78.652373},
            {'lat':17.318565,'lng':78.653855},
            {'lat':17.318022,'lng':78.655335},
            {'lat':17.317495,'lng':78.656901},
            {'lat':17.317268,'lng':78.658686},
            {'lat':17.317355,'lng':78.660544},
            {'lat':17.317461,'lng':78.662303},
            {'lat':17.317462,'lng':78.663937},
            {'lat':17.317309,'lng':78.665609},
            {'lat':17.316928,'lng':78.667302},
            {'lat':17.316477,'lng':78.668895},
            {'lat':17.31603,'lng':78.670458},
            {'lat':17.315631,'lng':78.672186},
            {'lat':17.315144,'lng':78.67376},
            {'lat':17.314575,'lng':78.675222},
            {'lat':17.313941,'lng':78.676874},
            {'lat':17.313321,'lng':78.678529},
            {'lat':17.312649,'lng':78.68031},
            {'lat':17.311982,'lng':78.681985},
            {'lat':17.311793,'lng':78.682353},
            {'lat':17.311347,'lng':78.682434},
            {'lat':17.310222,'lng':78.682018},
            {'lat':17.309483,'lng':78.681758},
            {'lat':17.308465,'lng':78.6814},
            {'lat':17.307082,'lng':78.680919},
            {'lat':17.305537,'lng':78.680416},
            {'lat':17.303983,'lng':78.680464},
            {'lat':17.302633,'lng':78.680959},
            {'lat':17.30134,'lng':78.681225},
            {'lat':17.30009,'lng':78.68103},
            {'lat':17.298829,'lng':78.68066},
            {'lat':17.297585,'lng':78.680299},
            {'lat':17.296293,'lng':78.680142},
            {'lat':17.294754,'lng':78.68012},
            {'lat':17.293123,'lng':78.680102},
            {'lat':17.291471,'lng':78.680065},
            {'lat':17.289898,'lng':78.680043},
            {'lat':17.288498,'lng':78.680026},
            {'lat':17.287366,'lng':78.680453},
            {'lat':17.286132,'lng':78.681177},
            {'lat':17.285604,'lng':78.681218},
            {'lat':17.28435,'lng':78.680209},
            {'lat':17.28322,'lng':78.679827},
            {'lat':17.281924,'lng':78.679687},
            {'lat':17.280579,'lng':78.679564},
            {'lat':17.279147,'lng':78.679423},
            {'lat':17.277882,'lng':78.679285},
            {'lat':17.276971,'lng':78.678959},
            {'lat':17.275847,'lng':78.678623},
            {'lat':17.274559,'lng':78.678903},
            {'lat':17.273209,'lng':78.67898},
            {'lat':17.272072,'lng':78.678649},
            {'lat':17.271752,'lng':78.678355},
            {'lat':17.271588,'lng':78.678101},
            {'lat':17.271447,'lng':78.678004},
            {'lat':17.271332,'lng':78.678077},
            {'lat':17.271347,'lng':78.678194},
            {'lat':17.271737,'lng':78.678882},
            {'lat':17.272084,'lng':78.679624},
            {'lat':17.272179,'lng':78.680817},
            {'lat':17.271882,'lng':78.681698},
            {'lat':17.271932,'lng':78.682406},
            {'lat':17.272336,'lng':78.683163},
            {'lat':17.272705,'lng':78.683713},
            {'lat':17.272872,'lng':78.68493},
            {'lat':17.272632,'lng':78.685973},
            {'lat':17.272323,'lng':78.686402},
            {'lat':17.271315,'lng':78.686883},
            {'lat':17.270154,'lng':78.686392},
            {'lat':17.269261,'lng':78.685834},
            {'lat':17.268519,'lng':78.685371},
            {'lat':17.26781,'lng':78.684884},
            {'lat':17.266834,'lng':78.684138},
            {'lat':17.266375,'lng':78.683852},
            {'lat':17.265515,'lng':78.683957},
            {'lat':17.265249,'lng':78.68397},
            {'lat':17.265093,'lng':78.683817},
            {'lat':17.265105,'lng':78.683669},
            {'lat':17.265279,'lng':78.683132},
            {'lat':17.265218,'lng':78.682508},
            {'lat':17.264655,'lng':78.681979},
            {'lat':17.264132,'lng':78.681952},
            {'lat':17.263351,'lng':78.682835},
            {'lat':17.262357,'lng':78.682661},
            {'lat':17.26237,'lng':78.68236},
            {'lat':17.262434,'lng':78.681607},
            {'lat':17.262635,'lng':78.680738},
            {'lat':17.26265,'lng':78.680653},
            {'lat':17.262644,'lng':78.680422},
            {'lat':17.262569,'lng':78.680293},
            {'lat':17.26196,'lng':78.67977},
            {'lat':17.26146,'lng':78.679409},
            {'lat':17.261102,'lng':78.679332},
            {'lat':17.260714,'lng':78.679507},
            {'lat':17.260378,'lng':78.679509},
            {'lat':17.259636,'lng':78.679008},
            {'lat':17.259021,'lng':78.678585},
            {'lat':17.258462,'lng':78.678239},
            {'lat':17.258157,'lng':78.678064},
            {'lat':17.25777,'lng':78.678038},
            {'lat':17.257253,'lng':78.678185},
            {'lat':17.256895,'lng':78.678413},
            {'lat':17.256002,'lng':78.679054},
            {'lat':17.255379,'lng':78.679609},
            {'lat':17.253989,'lng':78.680072},
            {'lat':17.252901,'lng':78.680393},
            {'lat':17.252594,'lng':78.680645},
            {'lat':17.252362,'lng':78.681594},
            {'lat':17.252216,'lng':78.68232},
            {'lat':17.251998,'lng':78.683358},
            {'lat':17.251973,'lng':78.683433},
            {'lat':17.251843,'lng':78.68358},
            {'lat':17.251702,'lng':78.683611},
            {'lat':17.251213,'lng':78.683695},
            {'lat':17.25069,'lng':78.683944},
            {'lat':17.249964,'lng':78.683835},
            {'lat':17.250112,'lng':78.683774},
            {'lat':17.251013,'lng':78.683741},
            {'lat':17.25174,'lng':78.68361},
            {'lat':17.251972,'lng':78.683305},
            {'lat':17.252057,'lng':78.68288},
            {'lat':17.252163,'lng':78.682336},
            {'lat':17.25223,'lng':78.682008},
            {'lat':17.25236,'lng':78.681349},
            {'lat':17.252469,'lng':78.6808},
            {'lat':17.252455,'lng':78.680598},
            {'lat':17.252442,'lng':78.680423},
            {'lat':17.252525,'lng':78.680348},
            {'lat':17.252586,'lng':78.68034},
            {'lat':17.252769,'lng':78.680401},
            {'lat':17.252918,'lng':78.68039},
            {'lat':17.253809,'lng':78.680124},
            {'lat':17.254806,'lng':78.679808},
            {'lat':17.255243,'lng':78.679667},
            {'lat':17.256346,'lng':78.678744},
            {'lat':17.256644,'lng':78.678477},
            {'lat':17.256744,'lng':78.678289},
            {'lat':17.256815,'lng':78.678129},
            {'lat':17.256923,'lng':78.678089},
            {'lat':17.256981,'lng':78.678102},
            {'lat':17.257152,'lng':78.678159},
            {'lat':17.257279,'lng':78.678133},
            {'lat':17.257671,'lng':78.678009},
            {'lat':17.25785,'lng':78.677974},
            {'lat':17.257987,'lng':78.677985},
            {'lat':17.258796,'lng':78.67843},
            {'lat':17.259875,'lng':78.679125},
            {'lat':17.260361,'lng':78.679442},
            {'lat':17.260845,'lng':78.679335},
            {'lat':17.261501,'lng':78.679362},
            {'lat':17.262664,'lng':78.680287},
            {'lat':17.262727,'lng':78.680577},
            {'lat':17.262449,'lng':78.681693},
            {'lat':17.262359,'lng':78.682637},
            {'lat':17.262808,'lng':78.68333},
            {'lat':17.263016,'lng':78.683297},
            {'lat':17.263234,'lng':78.682931},
            {'lat':17.263682,'lng':78.682237},
            {'lat':17.263972,'lng':78.681773},
            {'lat':17.264361,'lng':78.681728},
            {'lat':17.265027,'lng':78.682174},
            {'lat':17.265364,'lng':78.682783},
            {'lat':17.265193,'lng':78.68361},
            {'lat':17.26523,'lng':78.683871},
            {'lat':17.265449,'lng':78.683913},
            {'lat':17.26558,'lng':78.683858},
            {'lat':17.265847,'lng':78.683735},
            {'lat':17.266345,'lng':78.683763},
            {'lat':17.267289,'lng':78.684362},
            {'lat':17.267677,'lng':78.684664},
            {'lat':17.268467,'lng':78.685237},
            {'lat':17.269525,'lng':78.685917},
            {'lat':17.270778,'lng':78.686707},
            {'lat':17.270894,'lng':78.686772},
            {'lat':17.271262,'lng':78.686838},
            {'lat':17.271514,'lng':78.686758},
            {'lat':17.27215,'lng':78.686503},
            {'lat':17.272662,'lng':78.685858},
            {'lat':17.272852,'lng':78.684251},
            {'lat':17.272694,'lng':78.683712},
            {'lat':17.272009,'lng':78.682657},
            {'lat':17.27194,'lng':78.681467},
            {'lat':17.272129,'lng':78.681012},
            {'lat':17.272138,'lng':78.680094},
            {'lat':17.272079,'lng':78.679675},
            {'lat':17.27158,'lng':78.678676},
            {'lat':17.271286,'lng':78.678157},
            {'lat':17.271214,'lng':78.677834},
            {'lat':17.270914,'lng':78.677126},
            {'lat':17.270896,'lng':78.676964},
            {'lat':17.27098,'lng':78.676517},
            {'lat':17.2711,'lng':78.676375},
            {'lat':17.271249,'lng':78.676462},
            {'lat':17.271242,'lng':78.676589},
            {'lat':17.271121,'lng':78.677117},
            {'lat':17.271167,'lng':78.677298},
            {'lat':17.271511,'lng':78.677641},
            {'lat':17.271937,'lng':78.677917},
            {'lat':17.272404,'lng':78.678173},
            {'lat':17.272977,'lng':78.678422},
            {'lat':17.273117,'lng':78.678469},
            {'lat':17.273272,'lng':78.678488},
            {'lat':17.273373,'lng':78.678493},
            {'lat':17.274698,'lng':78.678382},
            {'lat':17.275477,'lng':78.678138},
            {'lat':17.275542,'lng':78.678123},
            {'lat':17.275755,'lng':78.678097},
            {'lat':17.275913,'lng':78.678099},
            {'lat':17.276252,'lng':78.678165},
            {'lat':17.277116,'lng':78.678805},
            {'lat':17.278967,'lng':78.679209},
            {'lat':17.280723,'lng':78.679386},
            {'lat':17.282446,'lng':78.679544},
            {'lat':17.284083,'lng':78.679708},
            {'lat':17.284637,'lng':78.67994},
            {'lat':17.285137,'lng':78.680694},
            {'lat':17.285438,'lng':78.68099},
            {'lat':17.28584,'lng':78.681114},
            {'lat':17.286128,'lng':78.681065},
            {'lat':17.28748,'lng':78.680294},
            {'lat':17.288008,'lng':78.680031},
            {'lat':17.288457,'lng':78.67994},
            {'lat':17.28896,'lng':78.679923},
            {'lat':17.289315,'lng':78.67993},
            {'lat':17.291148,'lng':78.679963},
            {'lat':17.292992,'lng':78.679999},
            {'lat':17.294653,'lng':78.680017},
            {'lat':17.296139,'lng':78.680042},
            {'lat':17.297499,'lng':78.680191},
            {'lat':17.298966,'lng':78.68061},
            {'lat':17.30059,'lng':78.681071},
            {'lat':17.300754,'lng':78.6811},
            {'lat':17.301249,'lng':78.681145},
            {'lat':17.301596,'lng':78.681131},
            {'lat':17.303299,'lng':78.680602},
            {'lat':17.304119,'lng':78.68033},
            {'lat':17.304629,'lng':78.680265},
            {'lat':17.304976,'lng':78.680263},
            {'lat':17.306673,'lng':78.680699},
            {'lat':17.30836,'lng':78.681288},
            {'lat':17.309623,'lng':78.68173},
            {'lat':17.310387,'lng':78.682002},
            {'lat':17.311066,'lng':78.682249},
            {'lat':17.311315,'lng':78.682338},
            {'lat':17.31148,'lng':78.682407},
            {'lat':17.311595,'lng':78.682412},
            {'lat':17.31178,'lng':78.682252},
            {'lat':17.312165,'lng':78.681327},
            {'lat':17.312494,'lng':78.680531},
            {'lat':17.312842,'lng':78.679619},
            {'lat':17.313222,'lng':78.678595},
            {'lat':17.313625,'lng':78.677529},
            {'lat':17.314028,'lng':78.676467},
            {'lat':17.314504,'lng':78.675281},
            {'lat':17.314908,'lng':78.67414},
            {'lat':17.31527,'lng':78.673151},
            {'lat':17.315532,'lng':78.67223},
            {'lat':17.315745,'lng':78.671293},
            {'lat':17.315986,'lng':78.670314},
            {'lat':17.316293,'lng':78.669231},
            {'lat':17.316679,'lng':78.667962},
            {'lat':17.317112,'lng':78.666485},
            {'lat':17.317355,'lng':78.664847},
            {'lat':17.317433,'lng':78.663267},
            {'lat':17.31738,'lng':78.661727},
            {'lat':17.317244,'lng':78.660028},
            {'lat':17.317227,'lng':78.658281},
            {'lat':17.317514,'lng':78.656569},
            {'lat':17.318059,'lng':78.65497},
            {'lat':17.318603,'lng':78.653432},
            {'lat':17.319237,'lng':78.651794},
            {'lat':17.319634,'lng':78.650037},
            {'lat':17.319594,'lng':78.648229},
            {'lat':17.319535,'lng':78.646455},
            {'lat':17.319668,'lng':78.64466},
            {'lat':17.320047,'lng':78.643039},
            {'lat':17.320473,'lng':78.641694},
            {'lat':17.320713,'lng':78.640893},
            {'lat':17.32081,'lng':78.640613},
            {'lat':17.321025,'lng':78.640034},
            {'lat':17.321332,'lng':78.639133},
            {'lat':17.321717,'lng':78.638017},
            {'lat':17.322025,'lng':78.636723},
            {'lat':17.322177,'lng':78.635354},
            {'lat':17.322153,'lng':78.633896},
            {'lat':17.321874,'lng':78.63231},
            {'lat':17.321454,'lng':78.630682},
            {'lat':17.321062,'lng':78.629033},
            {'lat':17.320694,'lng':78.62741},
            {'lat':17.32057,'lng':78.625807},
            {'lat':17.320459,'lng':78.624128},
            {'lat':17.320261,'lng':78.622402},
            {'lat':17.320082,'lng':78.620662},
            {'lat':17.319894,'lng':78.618955},
            {'lat':17.319935,'lng':78.617318},
            {'lat':17.320188,'lng':78.61559},
            {'lat':17.320451,'lng':78.614475},
            {'lat':17.321528,'lng':78.612932},
            {'lat':17.32251,'lng':78.61165},
            {'lat':17.323506,'lng':78.610333},
            {'lat':17.324507,'lng':78.60902},
            {'lat':17.325484,'lng':78.607749},
            {'lat':17.326402,'lng':78.606534},
            {'lat':17.326815,'lng':78.605485},
            {'lat':17.326923,'lng':78.605033},
            {'lat':17.327052,'lng':78.604399},
            {'lat':17.327216,'lng':78.60357},
            {'lat':17.327387,'lng':78.602501},
            {'lat':17.32762,'lng':78.601355},
            {'lat':17.327982,'lng':78.60011},
            {'lat':17.328185,'lng':78.599304},
            {'lat':17.328345,'lng':78.598849},
            {'lat':17.328618,'lng':78.598054},
            {'lat':17.328962,'lng':78.597011},
            {'lat':17.329344,'lng':78.595829},
            {'lat':17.329678,'lng':78.594705},
            {'lat':17.330059,'lng':78.593827},
            {'lat':17.330394,'lng':78.593164},
            {'lat':17.330882,'lng':78.592327},
            {'lat':17.331494,'lng':78.591361},
            {'lat':17.332018,'lng':78.590442},
            {'lat':17.332448,'lng':78.589584},
            {'lat':17.332928,'lng':78.588824},
            {'lat':17.333412,'lng':78.588022},
            {'lat':17.333945,'lng':78.586956},
            {'lat':17.334458,'lng':78.585867},
            {'lat':17.334812,'lng':78.58499},
            {'lat':17.334951,'lng':78.584717},
            {'lat':17.335235,'lng':78.584167},
            {'lat':17.335479,'lng':78.583291},
            {'lat':17.335642,'lng':78.582237},
            {'lat':17.335838,'lng':78.580874},
            {'lat':17.335876,'lng':78.580543},
            {'lat':17.335916,'lng':78.579612},
            {'lat':17.335942,'lng':78.579334},
            {'lat':17.336021,'lng':78.578785},
            {'lat':17.336125,'lng':78.577933},
            {'lat':17.336228,'lng':78.577068},
            {'lat':17.336358,'lng':78.576015},
            {'lat':17.336485,'lng':78.57485},
            {'lat':17.336779,'lng':78.573197},
            {'lat':17.337085,'lng':78.572187},
            {'lat':17.337416,'lng':78.571072},
            {'lat':17.337683,'lng':78.570201},
            {'lat':17.337924,'lng':78.569535},
            {'lat':17.338254,'lng':78.568504},
            {'lat':17.338655,'lng':78.567486},
            {'lat':17.338867,'lng':78.567075},
            {'lat':17.339165,'lng':78.566572},
            {'lat':17.339618,'lng':78.565734},
            {'lat':17.340122,'lng':78.564786},
            {'lat':17.340464,'lng':78.563882},
            {'lat':17.340667,'lng':78.562625},
            {'lat':17.340864,'lng':78.561259},
            {'lat':17.340993,'lng':78.560085},
            {'lat':17.341073,'lng':78.559559},
            {'lat':17.341203,'lng':78.55892},
            {'lat':17.341598,'lng':78.557974},
            {'lat':17.342201,'lng':78.556972},
            {'lat':17.342752,'lng':78.556323},
            {'lat':17.343316,'lng':78.555543},
            {'lat':17.343895,'lng':78.554664},
            {'lat':17.344494,'lng':78.553713},
            {'lat':17.344932,'lng':78.553025},
            {'lat':17.345131,'lng':78.552729},
            {'lat':17.345474,'lng':78.552233},
            {'lat':17.345857,'lng':78.551644},
            {'lat':17.346022,'lng':78.551369},
            {'lat':17.346498,'lng':78.550766},
            {'lat':17.346804,'lng':78.550417},
            {'lat':17.347297,'lng':78.549865},
            {'lat':17.347985,'lng':78.549273},
            {'lat':17.348669,'lng':78.548743},
            {'lat':17.34926,'lng':78.548303},
            {'lat':17.349835,'lng':78.547823},
            {'lat':17.350572,'lng':78.547234},
            {'lat':17.351477,'lng':78.546645},
            {'lat':17.352745,'lng':78.546228},
            {'lat':17.354104,'lng':78.545858},
            {'lat':17.355281,'lng':78.545556},
            {'lat':17.356543,'lng':78.545227},
            {'lat':17.357891,'lng':78.544872},
            {'lat':17.359185,'lng':78.544528},
            {'lat':17.360454,'lng':78.544194},
            {'lat':17.361332,'lng':78.543972},
            {'lat':17.362267,'lng':78.543672},
            {'lat':17.363434,'lng':78.543414},
            {'lat':17.36471,'lng':78.542852},
            {'lat':17.365854,'lng':78.542018},
            {'lat':17.366761,'lng':78.541045},
            {'lat':17.367268,'lng':78.540223},
            {'lat':17.367729,'lng':78.539247},
            {'lat':17.368045,'lng':78.538257},
            {'lat':17.368208,'lng':78.537186},
            {'lat':17.368281,'lng':78.536109},
            {'lat':17.368263,'lng':78.535008},
            {'lat':17.368274,'lng':78.533849},
            {'lat':17.368234,'lng':78.533094},
            {'lat':17.368278,'lng':78.53275},
            {'lat':17.368311,'lng':78.532154},
            {'lat':17.368352,'lng':78.531305},
            {'lat':17.368369,'lng':78.530964},
            {'lat':17.368406,'lng':78.530105},
            {'lat':17.368422,'lng':78.529197},
            {'lat':17.368432,'lng':78.528595},
            {'lat':17.36847,'lng':78.527805},
            {'lat':17.36849,'lng':78.527028},
            {'lat':17.368528,'lng':78.526137},
            {'lat':17.368549,'lng':78.52527},
            {'lat':17.368484,'lng':78.524802},
            {'lat':17.368501,'lng':78.524303},
            {'lat':17.368525,'lng':78.523555},
            {'lat':17.368555,'lng':78.522785},
            {'lat':17.368538,'lng':78.522369},
            {'lat':17.368558,'lng':78.521973},
            {'lat':17.36858,'lng':78.521515},
            {'lat':17.368504,'lng':78.521229},
            {'lat':17.368716,'lng':78.521688},
            {'lat':17.368711,'lng':78.522141},
            {'lat':17.368702,'lng':78.522458},
            {'lat':17.36868,'lng':78.522878},
            {'lat':17.368661,'lng':78.523552},
            {'lat':17.368632,'lng':78.524284},
            {'lat':17.368642,'lng':78.524842},
            {'lat':17.368651,'lng':78.525291},
            {'lat':17.368614,'lng':78.525834},
            {'lat':17.368593,'lng':78.526605},
            {'lat':17.368613,'lng':78.527364},
            {'lat':17.368599,'lng':78.528085},
            {'lat':17.368593,'lng':78.528464},
            {'lat':17.368568,'lng':78.529149},
            {'lat':17.368528,'lng':78.530104},
            {'lat':17.368499,'lng':78.531057},
            {'lat':17.368506,'lng':78.531765},
            {'lat':17.368504,'lng':78.532195},
            {'lat':17.368494,'lng':78.532777},
            {'lat':17.368503,'lng':78.533142},
            {'lat':17.368467,'lng':78.53362},
            {'lat':17.368421,'lng':78.534435},
            {'lat':17.368385,'lng':78.535464},
            {'lat':17.368393,'lng':78.536527},
            {'lat':17.368306,'lng':78.53729},
            {'lat':17.368191,'lng':78.538149},
            {'lat':17.368072,'lng':78.538855},
            {'lat':17.367867,'lng':78.539515},
            {'lat':17.367707,'lng':78.539922},
            {'lat':17.367492,'lng':78.540347},
            {'lat':17.367277,'lng':78.540658},
            {'lat':17.366797,'lng':78.541289},
            {'lat':17.365989,'lng':78.542094},
            {'lat':17.365078,'lng':78.542848},
            {'lat':17.364002,'lng':78.543405},
            {'lat':17.362797,'lng':78.543779},
            {'lat':17.361667,'lng':78.544082},
            {'lat':17.360768,'lng':78.544293},
            {'lat':17.36,'lng':78.54453},
            {'lat':17.359061,'lng':78.544735},
            {'lat':17.358148,'lng':78.544969},
            {'lat':17.357049,'lng':78.545212},
            {'lat':17.35587,'lng':78.545508},
            {'lat':17.354613,'lng':78.545824},
            {'lat':17.353308,'lng':78.546153},
            {'lat':17.35197,'lng':78.54652},
            {'lat':17.351088,'lng':78.54704},
            {'lat':17.350558,'lng':78.547439},
            {'lat':17.349983,'lng':78.547892},
            {'lat':17.349184,'lng':78.548552},
            {'lat':17.348202,'lng':78.549299},
            {'lat':17.347358,'lng':78.54997},
            {'lat':17.346719,'lng':78.55067},
            {'lat':17.346663,'lng':78.5509},
            {'lat':17.346332,'lng':78.551271},
            {'lat':17.34612,'lng':78.551577},
            {'lat':17.3458,'lng':78.55207},
            {'lat':17.34538,'lng':78.552707},
            {'lat':17.345163,'lng':78.553033},
            {'lat':17.344961,'lng':78.55333},
            {'lat':17.3448,'lng':78.553612},
            {'lat':17.344607,'lng':78.553939},
            {'lat':17.344385,'lng':78.554272},
            {'lat':17.34394,'lng':78.554947},
            {'lat':17.343371,'lng':78.555785},
            {'lat':17.342712,'lng':78.556716},
            {'lat':17.3423,'lng':78.557396},
            {'lat':17.341845,'lng':78.558045},
            {'lat':17.341487,'lng':78.558882},
            {'lat':17.341317,'lng':78.559628},
            {'lat':17.341202,'lng':78.56016},
            {'lat':17.341072,'lng':78.560943},
            {'lat':17.340905,'lng':78.562014},
            {'lat':17.34071,'lng':78.563337},
            {'lat':17.340412,'lng':78.564603},
            {'lat':17.340074,'lng':78.565351},
            {'lat':17.339912,'lng':78.565635},
            {'lat':17.339604,'lng':78.566231},
            {'lat':17.339325,'lng':78.566747},
            {'lat':17.339126,'lng':78.567089},
            {'lat':17.338832,'lng':78.567605},
            {'lat':17.33853,'lng':78.568346},
            {'lat':17.338296,'lng':78.569065},
            {'lat':17.338197,'lng':78.56936},
            {'lat':17.33801,'lng':78.570008},
            {'lat':17.337695,'lng':78.570909},
            {'lat':17.337315,'lng':78.571995},
            {'lat':17.336923,'lng':78.573211},
            {'lat':17.336812,'lng':78.57411},
            {'lat':17.336734,'lng':78.574684},
            {'lat':17.336684,'lng':78.575224},
            {'lat':17.336597,'lng':78.575742},
            {'lat':17.336484,'lng':78.576461},
            {'lat':17.33636,'lng':78.577373},
            {'lat':17.336231,'lng':78.578409},
            {'lat':17.336098,'lng':78.579509},
            {'lat':17.336023,'lng':78.580435},
            {'lat':17.335917,'lng':78.581232},
            {'lat':17.335762,'lng':78.582393},
            {'lat':17.335525,'lng':78.583778},
            {'lat':17.33506,'lng':78.585051},
            {'lat':17.334884,'lng':78.585437},
            {'lat':17.334564,'lng':78.586037},
            {'lat':17.334114,'lng':78.586982},
            {'lat':17.333535,'lng':78.588166},
            {'lat':17.332915,'lng':78.589267},
            {'lat':17.332484,'lng':78.59002},
            {'lat':17.332081,'lng':78.590682},
            {'lat':17.331529,'lng':78.59153},
            {'lat':17.331467,'lng':78.591623},
            {'lat':17.330928,'lng':78.592514},
            {'lat':17.330484,'lng':78.593387},
            {'lat':17.330164,'lng':78.594107},
            {'lat':17.329957,'lng':78.594633},
            {'lat':17.329657,'lng':78.595386},
            {'lat':17.329292,'lng':78.596494},
            {'lat':17.328931,'lng':78.59772},
            {'lat':17.328673,'lng':78.598604},
            {'lat':17.328564,'lng':78.598875},
            {'lat':17.32838,'lng':78.599371},
            {'lat':17.328143,'lng':78.600105},
            {'lat':17.327777,'lng':78.601213},
            {'lat':17.327488,'lng':78.602497},
            {'lat':17.327273,'lng':78.603683},
            {'lat':17.327065,'lng':78.604722},
            {'lat':17.326922,'lng':78.605437},
            {'lat':17.326855,'lng':78.605728},
            {'lat':17.326668,'lng':78.606274},
            {'lat':17.326282,'lng':78.606959},
            {'lat':17.325905,'lng':78.607439},
            {'lat':17.32549,'lng':78.607999},
            {'lat':17.324916,'lng':78.608694},
            {'lat':17.324292,'lng':78.609482},
            {'lat':17.323692,'lng':78.610267},
            {'lat':17.323067,'lng':78.61108},
            {'lat':17.322359,'lng':78.612015},
            {'lat':17.321677,'lng':78.612922},
            {'lat':17.321677,'lng':78.612922},
            {'lat':17.321049,'lng':78.613742},
            {'lat':17.321049,'lng':78.613742},
            {'lat':17.320494,'lng':78.61468},
            {'lat':17.320494,'lng':78.61468},
            {'lat':17.320204,'lng':78.615849},
            {'lat':17.320204,'lng':78.615849},
            {'lat':17.319993,'lng':78.61724},
            {'lat':17.319993,'lng':78.61724},
            {'lat':17.319923,'lng':78.618739},
            {'lat':17.319923,'lng':78.618739},
            {'lat':17.320086,'lng':78.620327},
            {'lat':17.320262,'lng':78.621913},
            {'lat':17.32044,'lng':78.623537},
            {'lat':17.32059,'lng':78.625181},
            {'lat':17.320599,'lng':78.625351},
            {'lat':17.320697,'lng':78.626854},
            {'lat':17.32104,'lng':78.628567},
            {'lat':17.321467,'lng':78.63028},
            {'lat':17.321901,'lng':78.632009},
            {'lat':17.322233,'lng':78.633718},
            {'lat':17.322268,'lng':78.635327},
            {'lat':17.322101,'lng':78.636795},
            {'lat':17.321773,'lng':78.638117},
            {'lat':17.321405,'lng':78.639227},
            {'lat':17.321098,'lng':78.640214},
            {'lat':17.320881,'lng':78.640875},
            {'lat':17.320588,'lng':78.641704},
            {'lat':17.320242,'lng':78.642777},
            {'lat':17.319845,'lng':78.64413},
            {'lat':17.319682,'lng':78.645723},
            {'lat':17.319647,'lng':78.647324},
            {'lat':17.319683,'lng':78.649004},
            {'lat':17.319666,'lng':78.650637},
            {'lat':17.319226,'lng':78.652009},
            {'lat':17.318745,'lng':78.653461},
            {'lat':17.318222,'lng':78.654888},
            {'lat':17.317697,'lng':78.656285},
            {'lat':17.317362,'lng':78.657877},
            {'lat':17.317297,'lng':78.659565},
            {'lat':17.317406,'lng':78.66122},
            {'lat':17.317458,'lng':78.66269},
            {'lat':17.317452,'lng':78.663854},
            {'lat':17.317384,'lng':78.66492},
            {'lat':17.317252,'lng':78.666119},
            {'lat':17.316942,'lng':78.667345},
            {'lat':17.316647,'lng':78.668302},
            {'lat':17.316346,'lng':78.669322},
            {'lat':17.31605,'lng':78.67055},
            {'lat':17.315691,'lng':78.671985},
            {'lat':17.315237,'lng':78.673455},
            {'lat':17.314682,'lng':78.674949},
            {'lat':17.314069,'lng':78.676565},
            {'lat':17.31349,'lng':78.678113},
            {'lat':17.312905,'lng':78.679698},
            {'lat':17.312327,'lng':78.681195},
            {'lat':17.311852,'lng':78.682315},
            {'lat':17.311652,'lng':78.682561},
            {'lat':17.311587,'lng':78.68254},
            {'lat':17.310878,'lng':78.682295},
            {'lat':17.31018,'lng':78.682044},
            {'lat':17.309606,'lng':78.681814},
            {'lat':17.308883,'lng':78.681565},
            {'lat':17.307659,'lng':78.68114},
            {'lat':17.306139,'lng':78.680616},
            {'lat':17.30449,'lng':78.680404},
            {'lat':17.303042,'lng':78.680833},
            {'lat':17.301699,'lng':78.681225},
            {'lat':17.300408,'lng':78.681123},
            {'lat':17.29912,'lng':78.680742},
            {'lat':17.297833,'lng':78.680363},
            {'lat':17.296545,'lng':78.680154},
            {'lat':17.29502,'lng':78.680119},
            {'lat':17.293293,'lng':78.680083},
            {'lat':17.291492,'lng':78.680044},
            {'lat':17.289815,'lng':78.680024},
            {'lat':17.288344,'lng':78.680064},
            {'lat':17.287102,'lng':78.680633},
            {'lat':17.2863,'lng':78.681114},
            {'lat':17.285461,'lng':78.681171},
            {'lat':17.284135,'lng':78.680099},
            {'lat':17.282912,'lng':78.679813},
            {'lat':17.281561,'lng':78.679669},
            {'lat':17.280127,'lng':78.679527},
            {'lat':17.27867,'lng':78.679384},
            {'lat':17.277687,'lng':78.679252},
            {'lat':17.276507,'lng':78.678773},
            {'lat':17.27588,'lng':78.67862},
            {'lat':17.274228,'lng':78.678964},
            {'lat':17.272788,'lng':78.67889},
            {'lat':17.272124,'lng':78.678697},
            {'lat':17.271752,'lng':78.678393},
            {'lat':17.271594,'lng':78.678139},
            {'lat':17.27144,'lng':78.678035},
            {'lat':17.271326,'lng':78.678107},
            {'lat':17.271336,'lng':78.67822},
            {'lat':17.271724,'lng':78.67886},
            {'lat':17.272091,'lng':78.679634},
            {'lat':17.272189,'lng':78.6808},
            {'lat':17.271927,'lng':78.681517},
            {'lat':17.27199,'lng':78.682592},
            {'lat':17.272479,'lng':78.6834},
            {'lat':17.27272,'lng':78.683788},
            {'lat':17.272862,'lng':78.685032},
            {'lat':17.272596,'lng':78.686053},
            {'lat':17.272303,'lng':78.686424},
            {'lat':17.271413,'lng':78.686869},
            {'lat':17.270222,'lng':78.686454},
            {'lat':17.26981,'lng':78.686193},
            {'lat':17.269332,'lng':78.685884},
            {'lat':17.268748,'lng':78.685522},
            {'lat':17.268111,'lng':78.685145},
            {'lat':17.267345,'lng':78.684527},
            {'lat':17.266262,'lng':78.683823},
            {'lat':17.265823,'lng':78.683805},
            {'lat':17.265535,'lng':78.683936},
            {'lat':17.265246,'lng':78.68396},
            {'lat':17.265118,'lng':78.683858},
            {'lat':17.265302,'lng':78.682935},
            {'lat':17.265207,'lng':78.682499},
            {'lat':17.264595,'lng':78.681949},
            {'lat':17.264062,'lng':78.682025},
            {'lat':17.263303,'lng':78.682966},
            {'lat':17.262611,'lng':78.683291},
            {'lat':17.262374,'lng':78.682544},
            {'lat':17.262395,'lng':78.68223},
            {'lat':17.262491,'lng':78.681345},
            {'lat':17.262661,'lng':78.680627},
            {'lat':17.262544,'lng':78.680269},
            {'lat':17.261874,'lng':78.679709},
            {'lat':17.261388,'lng':78.679387},
            {'lat':17.261213,'lng':78.679348},
            {'lat':17.260909,'lng':78.679407},
            {'lat':17.260714,'lng':78.679525},
            {'lat':17.260435,'lng':78.679527},
            {'lat':17.259753,'lng':78.679089},
            {'lat':17.259313,'lng':78.678817},
            {'lat':17.25888,'lng':78.678538},
            {'lat':17.258491,'lng':78.678245},
            {'lat':17.258076,'lng':78.678061},
            {'lat':17.257264,'lng':78.678188},
            {'lat':17.256945,'lng':78.678423},
            {'lat':17.25659,'lng':78.67855},
            {'lat':17.255702,'lng':78.679365},
            {'lat':17.255343,'lng':78.679642},
            {'lat':17.254184,'lng':78.680025},
            {'lat':17.2534,'lng':78.680255},
            {'lat':17.252835,'lng':78.680425},
            {'lat':17.252547,'lng':78.680733},
            {'lat':17.252415,'lng':78.681392},
            {'lat':17.252262,'lng':78.682153},
            {'lat':17.25205,'lng':78.683139},
            {'lat':17.251953,'lng':78.683484},
            {'lat':17.251241,'lng':78.683695},
            {'lat':17.250593,'lng':78.683967},
            {'lat':17.249979,'lng':78.683904},
            {'lat':17.249999,'lng':78.683848},
            {'lat':17.250021,'lng':78.683827},
            {'lat':17.250128,'lng':78.683799},
            {'lat':17.250232,'lng':78.68381},
            {'lat':17.25054,'lng':78.68384},
            {'lat':17.250724,'lng':78.683877},
            {'lat':17.250835,'lng':78.683886},
            {'lat':17.250889,'lng':78.68387},
            {'lat':17.250967,'lng':78.683749},
            {'lat':17.250934,'lng':78.683671},
            {'lat':17.250288,'lng':78.683641},
            {'lat':17.248893,'lng':78.683558},
            {'lat':17.247991,'lng':78.683275},
            {'lat':17.246895,'lng':78.682972},
            {'lat':17.245705,'lng':78.682685},
            {'lat':17.244782,'lng':78.682454},
            {'lat':17.244495,'lng':78.682287},
            {'lat':17.244127,'lng':78.681932},
            {'lat':17.243955,'lng':78.681564},
            {'lat':17.243363,'lng':78.680896},
            {'lat':17.24287,'lng':78.680418},
            {'lat':17.242828,'lng':78.68038},
            {'lat':17.242735,'lng':78.680272},
            {'lat':17.242734,'lng':78.680177},
            {'lat':17.243065,'lng':78.679627},
            {'lat':17.243197,'lng':78.679404},
            {'lat':17.243242,'lng':78.679269},
            {'lat':17.243194,'lng':78.679164},
            {'lat':17.243104,'lng':78.67912},
            {'lat':17.242505,'lng':78.678846},
            {'lat':17.242438,'lng':78.678815},
            {'lat':17.242275,'lng':78.678714},
            {'lat':17.242228,'lng':78.678621},
            {'lat':17.242491,'lng':78.678055},
            {'lat':17.242855,'lng':78.67731},
            {'lat':17.243028,'lng':78.676997},
            {'lat':17.243307,'lng':78.676839},
            {'lat':17.243418,'lng':78.676915},
            {'lat':17.243398,'lng':78.677125},
            {'lat':17.243363,'lng':78.677309},
            {'lat':17.243337,'lng':78.677502},
            {'lat':17.243299,'lng':78.677701},
            {'lat':17.243251,'lng':78.677886},
            {'lat':17.24307,'lng':78.678398},
            {'lat':17.24289,'lng':78.678849},
            {'lat':17.243005,'lng':78.679121},
            {'lat':17.24394,'lng':78.679528},
            {'lat':17.244862,'lng':78.679828},
            {'lat':17.244909,'lng':78.679849},
            {'lat':17.244959,'lng':78.679946},
            {'lat':17.244932,'lng':78.680006},
            {'lat':17.244593,'lng':78.680554},
            {'lat':17.244177,'lng':78.681392},
            {'lat':17.244107,'lng':78.68176},
            {'lat':17.244704,'lng':78.682414},
            {'lat':17.245587,'lng':78.682658},
            {'lat':17.246628,'lng':78.682897},
            {'lat':17.247651,'lng':78.68315},
            {'lat':17.248647,'lng':78.683522},
            {'lat':17.248747,'lng':78.683542},
            {'lat':17.24904,'lng':78.683545},
            {'lat':17.249225,'lng':78.683536},
            {'lat':17.249309,'lng':78.683531},
            {'lat':17.249532,'lng':78.683531},
            {'lat':17.249684,'lng':78.683561},
            {'lat':17.24993,'lng':78.683599},
            {'lat':17.250189,'lng':78.683601},
            {'lat':17.250371,'lng':78.683607},
            {'lat':17.250848,'lng':78.683627},
            {'lat':17.250979,'lng':78.683699},
            {'lat':17.250964,'lng':78.683831},
            {'lat':17.25089,'lng':78.68389},
            {'lat':17.250685,'lng':78.683934},
            {'lat':17.250078,'lng':78.683963},
            {'lat':17.25001,'lng':78.683838},
            {'lat':17.250928,'lng':78.68377},
            {'lat':17.251527,'lng':78.683619},
            {'lat':17.25195,'lng':78.683439},
            {'lat':17.252023,'lng':78.683055},
            {'lat':17.252087,'lng':78.682752},
            {'lat':17.252173,'lng':78.68232},
            {'lat':17.252275,'lng':78.68181},
            {'lat':17.25246,'lng':78.680954},
            {'lat':17.2525,'lng':78.680708},
            {'lat':17.252483,'lng':78.680618},
            {'lat':17.252453,'lng':78.680465},
            {'lat':17.252502,'lng':78.680368},
            {'lat':17.252614,'lng':78.680332},
            {'lat':17.252809,'lng':78.680379},
            {'lat':17.252968,'lng':78.680363},
            {'lat':17.253888,'lng':78.680078},
            {'lat':17.254972,'lng':78.679758},
            {'lat':17.255409,'lng':78.679565},
            {'lat':17.256497,'lng':78.678614},
            {'lat':17.256739,'lng':78.678359},
            {'lat':17.256789,'lng':78.678184},
            {'lat':17.256904,'lng':78.678084},
            {'lat':17.257009,'lng':78.678102},
            {'lat':17.25706,'lng':78.678128},
            {'lat':17.25724,'lng':78.678147},
            {'lat':17.257357,'lng':78.678107},
            {'lat':17.257613,'lng':78.678029},
            {'lat':17.25782,'lng':78.677975},
            {'lat':17.257977,'lng':78.677969},
            {'lat':17.25882,'lng':78.678435},
            {'lat':17.2598,'lng':78.679081},
            {'lat':17.260372,'lng':78.679442},
            {'lat':17.260867,'lng':78.679329},
            {'lat':17.261452,'lng':78.679326},
            {'lat':17.262434,'lng':78.680049},
            {'lat':17.262517,'lng':78.680121},
            {'lat':17.262715,'lng':78.680327},
            {'lat':17.262756,'lng':78.680474},
            {'lat':17.262494,'lng':78.681401},
            {'lat':17.262378,'lng':78.682468},
            {'lat':17.262398,'lng':78.68288},
            {'lat':17.262863,'lng':78.683379},
            {'lat':17.262897,'lng':78.683393},
            {'lat':17.263022,'lng':78.683338},
            {'lat':17.263083,'lng':78.683224},
            {'lat':17.263559,'lng':78.682452},
            {'lat':17.263988,'lng':78.681759},
            {'lat':17.264375,'lng':78.681705},
            {'lat':17.26505,'lng':78.682153},
            {'lat':17.265383,'lng':78.682773},
            {'lat':17.265212,'lng':78.683601},
            {'lat':17.265251,'lng':78.683875},
            {'lat':17.265486,'lng':78.683917},
            {'lat':17.26563,'lng':78.68385},
            {'lat':17.26593,'lng':78.68372},
            {'lat':17.266447,'lng':78.683803},
            {'lat':17.267431,'lng':78.684464},
            {'lat':17.268106,'lng':78.684996},
            {'lat':17.268933,'lng':78.685533},
            {'lat':17.269944,'lng':78.686175},
            {'lat':17.270954,'lng':78.6868},
            {'lat':17.271054,'lng':78.686839},
            {'lat':17.271375,'lng':78.686817},
            {'lat':17.271595,'lng':78.686734},
            {'lat':17.27215,'lng':78.686522},
            {'lat':17.272637,'lng':78.685966},
            {'lat':17.272882,'lng':78.68458},
            {'lat':17.272828,'lng':78.684075},
            {'lat':17.272064,'lng':78.682765},
            {'lat':17.271896,'lng':78.682344},
            {'lat':17.271891,'lng':78.681667},
            {'lat':17.272119,'lng':78.681071},
            {'lat':17.272157,'lng':78.680032},
            {'lat':17.271884,'lng':78.679192},
            {'lat':17.271379,'lng':78.678274},
            {'lat':17.271227,'lng':78.677827},
            {'lat':17.270973,'lng':78.677347},
            {'lat':17.270923,'lng':78.676793},
            {'lat':17.270987,'lng':78.676535},
            {'lat':17.271118,'lng':78.676372},
            {'lat':17.271237,'lng':78.676397},
            {'lat':17.271235,'lng':78.676628},
            {'lat':17.271138,'lng':78.677057},
            {'lat':17.271216,'lng':78.677349},
            {'lat':17.271734,'lng':78.677768},
            {'lat':17.272219,'lng':78.67807},
            {'lat':17.272742,'lng':78.678331},
            {'lat':17.273126,'lng':78.678477},
            {'lat':17.273304,'lng':78.678505},
            {'lat':17.273423,'lng':78.678504},
            {'lat':17.274718,'lng':78.678394},
            {'lat':17.275412,'lng':78.678151},
            {'lat':17.275476,'lng':78.678133},
            {'lat':17.275695,'lng':78.678094},
            {'lat':17.275865,'lng':78.678087},
            {'lat':17.276239,'lng':78.678158},
            {'lat':17.277166,'lng':78.678855},
            {'lat':17.278937,'lng':78.679207},
            {'lat':17.280534,'lng':78.679368},
            {'lat':17.282042,'lng':78.679508},
            {'lat':17.283493,'lng':78.679649},
            {'lat':17.284203,'lng':78.67972},
            {'lat':17.284868,'lng':78.680129},
            {'lat':17.285304,'lng':78.680864},
            {'lat':17.285663,'lng':78.681081},
            {'lat':17.286086,'lng':78.681084},
            {'lat':17.286359,'lng':78.680969},
            {'lat':17.287622,'lng':78.680212},
            {'lat':17.288985,'lng':78.679912},
            {'lat':17.290569,'lng':78.679932},
            {'lat':17.292135,'lng':78.679962},
            {'lat':17.29229,'lng':78.679967},
            {'lat':17.292757,'lng':78.679974},
            {'lat':17.293064,'lng':78.679981},
            {'lat':17.29447,'lng':78.679995},
            {'lat':17.295879,'lng':78.680019},
            {'lat':17.297303,'lng':78.680114},
            {'lat':17.29856,'lng':78.680472},
            {'lat':17.300029,'lng':78.680909},
            {'lat':17.300612,'lng':78.681061},
            {'lat':17.301065,'lng':78.681128},
            {'lat':17.301375,'lng':78.681139},
            {'lat':17.30291,'lng':78.680769},
            {'lat':17.304243,'lng':78.680312},
            {'lat':17.304395,'lng':78.680289},
            {'lat':17.30486,'lng':78.680258},
            {'lat':17.305177,'lng':78.680272},
            {'lat':17.306684,'lng':78.68068},
            {'lat':17.308119,'lng':78.681184},
            {'lat':17.309337,'lng':78.68162},
            {'lat':17.310012,'lng':78.681859},
            {'lat':17.310709,'lng':78.682109},
            {'lat':17.311748,'lng':78.682314},
            {'lat':17.312065,'lng':78.681574},
            {'lat':17.31221,'lng':78.681225},
            {'lat':17.312606,'lng':78.680274},
            {'lat':17.312995,'lng':78.679259},
            {'lat':17.313405,'lng':78.67818},
            {'lat':17.313794,'lng':78.677175},
            {'lat':17.314214,'lng':78.676157},
            {'lat':17.314644,'lng':78.675017},
            {'lat':17.315033,'lng':78.673984},
            {'lat':17.315379,'lng':78.672996},
            {'lat':17.315655,'lng':78.671994},
            {'lat':17.315908,'lng':78.670893},
            {'lat':17.316212,'lng':78.669684},
            {'lat':17.31657,'lng':78.668389},
            {'lat':17.316953,'lng':78.667127},
            {'lat':17.317263,'lng':78.665741},
            {'lat':17.317409,'lng':78.664263},
            {'lat':17.317444,'lng':78.662785},
            {'lat':17.317373,'lng':78.661434},
            {'lat':17.317218,'lng':78.659848},
            {'lat':17.317204,'lng':78.658337},
            {'lat':17.317435,'lng':78.656831},
            {'lat':17.317928,'lng':78.655394},
            {'lat':17.318408,'lng':78.654037},
            {'lat':17.318898,'lng':78.652739},
            {'lat':17.319353,'lng':78.651523},
            {'lat':17.31962,'lng':78.650482},
            {'lat':17.319599,'lng':78.649436},
            {'lat':17.319553,'lng':78.648593},
            {'lat':17.319518,'lng':78.647522},
            {'lat':17.319498,'lng':78.646539},
            {'lat':17.319588,'lng':78.645369},
            {'lat':17.319725,'lng':78.644084},
            {'lat':17.320089,'lng':78.642887},
            {'lat':17.320447,'lng':78.641828},
            {'lat':17.32079,'lng':78.640823},
            {'lat':17.32115,'lng':78.63976},
            {'lat':17.32154,'lng':78.638607},
            {'lat':17.321904,'lng':78.637424},
            {'lat':17.322128,'lng':78.636264},
            {'lat':17.322222,'lng':78.634945},
            {'lat':17.32215,'lng':78.6335},
            {'lat':17.321843,'lng':78.632037},
            {'lat':17.321487,'lng':78.630623},
            {'lat':17.32115,'lng':78.629332},
            {'lat':17.320855,'lng':78.628126},
            {'lat':17.320657,'lng':78.627115},
            {'lat':17.32058,'lng':78.626104},
            {'lat':17.320505,'lng':78.624831},
            {'lat':17.320365,'lng':78.62338},
            {'lat':17.320214,'lng':78.621984},
            {'lat':17.320072,'lng':78.620705},
            {'lat':17.319903,'lng':78.619326},
            {'lat':17.319828,'lng':78.617886},
            {'lat':17.31999,'lng':78.616685},
            {'lat':17.320182,'lng':78.615399},
            {'lat':17.320485,'lng':78.614392},
            {'lat':17.32103,'lng':78.613612},
            {'lat':17.321718,'lng':78.612714},
            {'lat':17.322499,'lng':78.611702},
            {'lat':17.323329,'lng':78.610619},
            {'lat':17.324218,'lng':78.609468},
            {'lat':17.325023,'lng':78.608389},
            {'lat':17.325513,'lng':78.607705},
            {'lat':17.326072,'lng':78.607012},
            {'lat':17.326573,'lng':78.606332},
            {'lat':17.326879,'lng':78.605503},
            {'lat':17.327012,'lng':78.604843},
            {'lat':17.327138,'lng':78.6041},
            {'lat':17.327243,'lng':78.603315},
            {'lat':17.327269,'lng':78.60301},
            {'lat':17.327366,'lng':78.60242},
            {'lat':17.327569,'lng':78.601528},
            {'lat':17.32792,'lng':78.600427},
            {'lat':17.328255,'lng':78.599375},
            {'lat':17.32865,'lng':78.598212},
            {'lat':17.329063,'lng':78.596938},
            {'lat':17.329391,'lng':78.595905},
            {'lat':17.329621,'lng':78.595162},
            {'lat':17.329977,'lng':78.594277},
            {'lat':17.330414,'lng':78.593319},
            {'lat':17.331015,'lng':78.592244},
            {'lat':17.331698,'lng':78.591145},
            {'lat':17.332378,'lng':78.590003},
            {'lat':17.333034,'lng':78.588877},
            {'lat':17.333703,'lng':78.587668},
            {'lat':17.334292,'lng':78.586422},
            {'lat':17.33486,'lng':78.585218},
            {'lat':17.33536,'lng':78.584119},
            {'lat':17.335573,'lng':78.583093},
            {'lat':17.335733,'lng':78.581952},
            {'lat':17.335901,'lng':78.580748},
            {'lat':17.336003,'lng':78.57973},
            {'lat':17.336079,'lng':78.57882},
            {'lat':17.336112,'lng':78.578426},
            {'lat':17.336183,'lng':78.577866},
            {'lat':17.336302,'lng':78.576952},
            {'lat':17.336449,'lng':78.575807},
            {'lat':17.336544,'lng':78.574796},
            {'lat':17.336593,'lng':78.574175},
            {'lat':17.336673,'lng':78.57367},
            {'lat':17.336777,'lng':78.573246},
            {'lat':17.336883,'lng':78.5729},
            {'lat':17.337063,'lng':78.572398},
            {'lat':17.337322,'lng':78.571652},
            {'lat':17.337561,'lng':78.57089},
            {'lat':17.337648,'lng':78.570534},
            {'lat':17.33771,'lng':78.570225},
            {'lat':17.337897,'lng':78.569709},
            {'lat':17.338175,'lng':78.568971},
            {'lat':17.338508,'lng':78.568004},
            {'lat':17.338967,'lng':78.567082},
            {'lat':17.339483,'lng':78.566213},
            {'lat':17.340021,'lng':78.565194},
            {'lat':17.340077,'lng':78.565085},
            {'lat':17.340492,'lng':78.564105},
            {'lat':17.340695,'lng':78.562927},
            {'lat':17.340869,'lng':78.561662},
            {'lat':17.341015,'lng':78.56057},
            {'lat':17.341176,'lng':78.559425},
            {'lat':17.341454,'lng':78.558337},
            {'lat':17.341857,'lng':78.557583},
            {'lat':17.34204,'lng':78.557252},
            {'lat':17.3422,'lng':78.556982},
            {'lat':17.34254,'lng':78.556684},
            {'lat':17.342934,'lng':78.556139},
            {'lat':17.343306,'lng':78.555609},
            {'lat':17.343678,'lng':78.555107},
            {'lat':17.344104,'lng':78.554469},
            {'lat':17.344552,'lng':78.553789},
            {'lat':17.345139,'lng':78.552908},
            {'lat':17.345649,'lng':78.552114},
            {'lat':17.34594,'lng':78.551648},
            {'lat':17.346142,'lng':78.551315},
            {'lat':17.346356,'lng':78.551039},
            {'lat':17.34658,'lng':78.550758},
            {'lat':17.346873,'lng':78.550406},
            {'lat':17.347115,'lng':78.550119},
            {'lat':17.347399,'lng':78.549841},
            {'lat':17.347903,'lng':78.549417},
            {'lat':17.348465,'lng':78.548984},
            {'lat':17.348894,'lng':78.548654},
            {'lat':17.34922,'lng':78.548389},
            {'lat':17.349379,'lng':78.548272},
            {'lat':17.349769,'lng':78.547905},
            {'lat':17.350079,'lng':78.547642},
            {'lat':17.35053,'lng':78.547229},
            {'lat':17.351197,'lng':78.546782},
            {'lat':17.352247,'lng':78.546353},
            {'lat':17.353351,'lng':78.546069},
            {'lat':17.35421,'lng':78.54583},
            {'lat':17.355011,'lng':78.545608},
            {'lat':17.355817,'lng':78.54539},
            {'lat':17.356734,'lng':78.545189},
            {'lat':17.357738,'lng':78.544944},
            {'lat':17.358836,'lng':78.544655},
            {'lat':17.360062,'lng':78.544335},
            {'lat':17.360938,'lng':78.544117},
            {'lat':17.361872,'lng':78.543887},
            {'lat':17.363013,'lng':78.543582},
            {'lat':17.364184,'lng':78.543155},
            {'lat':17.3651,'lng':78.54262},
            {'lat':17.365967,'lng':78.541905},
            {'lat':17.366658,'lng':78.541166},
            {'lat':17.367173,'lng':78.540435},
            {'lat':17.367471,'lng':78.539916},
            {'lat':17.367752,'lng':78.539315},
            {'lat':17.367976,'lng':78.538701},
            {'lat':17.368139,'lng':78.538012},
            {'lat':17.368243,'lng':78.537114},
            {'lat':17.368264,'lng':78.536127},
            {'lat':17.368254,'lng':78.535306},
            {'lat':17.368256,'lng':78.534768},
            {'lat':17.368255,'lng':78.534014},
            {'lat':17.36828,'lng':78.533181},
            {'lat':17.368299,'lng':78.532655},
            {'lat':17.36832,'lng':78.532142},
            {'lat':17.368364,'lng':78.531456},
            {'lat':17.368392,'lng':78.53064},
            {'lat':17.368394,'lng':78.530053},
            {'lat':17.368405,'lng':78.529302},
            {'lat':17.368417,'lng':78.528893},
            {'lat':17.368428,'lng':78.528741},
            {'lat':17.368432,'lng':78.527968},
            {'lat':17.368483,'lng':78.527219},
            {'lat':17.368498,'lng':78.526764},
            {'lat':17.36852,'lng':78.526068},
            {'lat':17.368559,'lng':78.525538},
            {'lat':17.368546,'lng':78.52429},
            {'lat':17.368575,'lng':78.52344},
            {'lat':17.368587,'lng':78.522783},
            {'lat':17.368603,'lng':78.522222},
            {'lat':17.368609,'lng':78.52187},
            {'lat':17.368623,'lng':78.521438},
            {'lat':17.368629,'lng':78.521292},
            {'lat':17.368749,'lng':78.521901},
            {'lat':17.368755,'lng':78.522117},
            {'lat':17.36874,'lng':78.522531},
            {'lat':17.368732,'lng':78.522979},
            {'lat':17.368717,'lng':78.523542},
            {'lat':17.368713,'lng':78.524111},
            {'lat':17.368715,'lng':78.524395},
            {'lat':17.368709,'lng':78.524695},
            {'lat':17.368713,'lng':78.525057},
            {'lat':17.36872,'lng':78.525517},
            {'lat':17.3687,'lng':78.525949},
            {'lat':17.368672,'lng':78.526526},
            {'lat':17.368668,'lng':78.526904},
            {'lat':17.368655,'lng':78.527222},
            {'lat':17.368654,'lng':78.52766},
            {'lat':17.368661,'lng':78.528275},
            {'lat':17.368647,'lng':78.528586},
            {'lat':17.368612,'lng':78.52919},
            {'lat':17.368582,'lng':78.529945},
            {'lat':17.368562,'lng':78.530966},
            {'lat':17.368557,'lng':78.531884},
            {'lat':17.368575,'lng':78.532441},
            {'lat':17.368588,'lng':78.533005},
            {'lat':17.368569,'lng':78.533312},
            {'lat':17.368523,'lng':78.533908},
            {'lat':17.368494,'lng':78.53477},
            {'lat':17.368478,'lng':78.535753},
            {'lat':17.368458,'lng':78.536699},
            {'lat':17.368375,'lng':78.537599},
            {'lat':17.368202,'lng':78.53843},
            {'lat':17.36808,'lng':78.538952},
            {'lat':17.367933,'lng':78.539406},
            {'lat':17.367812,'lng':78.539775},
            {'lat':17.367612,'lng':78.54014},
            {'lat':17.367299,'lng':78.540612},
            {'lat':17.36672,'lng':78.541384},
            {'lat':17.365944,'lng':78.542153},
            {'lat':17.365147,'lng':78.542772},
            {'lat':17.36461,'lng':78.543114},
            {'lat':17.363929,'lng':78.543429},
            {'lat':17.362946,'lng':78.543725},
            {'lat':17.361912,'lng':78.543995},
            {'lat':17.361037,'lng':78.544277},
            {'lat':17.360227,'lng':78.544453},
            {'lat':17.359272,'lng':78.544662},
            {'lat':17.358362,'lng':78.544893},
            {'lat':17.357285,'lng':78.545174},
            {'lat':17.35627,'lng':78.545431},
            {'lat':17.355415,'lng':78.54565},
            {'lat':17.354571,'lng':78.545862},
            {'lat':17.353683,'lng':78.546094},
            {'lat':17.352625,'lng':78.546367},
            {'lat':17.351729,'lng':78.546678},
            {'lat':17.351184,'lng':78.547008},
            {'lat':17.350542,'lng':78.547513},
            {'lat':17.350085,'lng':78.547867},
            {'lat':17.349803,'lng':78.548137},
            {'lat':17.349023,'lng':78.548811},
            {'lat':17.348944,'lng':78.548914},
            {'lat':17.348615,'lng':78.549178},
            {'lat':17.346847,'lng':78.550807},
            {'lat':17.346729,'lng':78.550951},
            {'lat':17.346405,'lng':78.551272},
            {'lat':17.346154,'lng':78.551548},
            {'lat':17.345759,'lng':78.552145},
            {'lat':17.345449,'lng':78.552599},
            {'lat':17.345188,'lng':78.552987},
            {'lat':17.345047,'lng':78.553264},
            {'lat':17.344943,'lng':78.553408},
            {'lat':17.344442,'lng':78.554178},
            {'lat':17.343982,'lng':78.554883},
            {'lat':17.343459,'lng':78.555675},
            {'lat':17.342989,'lng':78.556369},
            {'lat':17.342618,'lng':78.55696},
            {'lat':17.342399,'lng':78.557292},
            {'lat':17.342208,'lng':78.557568},
            {'lat':17.341888,'lng':78.55804},
            {'lat':17.341552,'lng':78.55874},
            {'lat':17.341385,'lng':78.559447},
            {'lat':17.341261,'lng':78.559882},
            {'lat':17.341142,'lng':78.560558},
            {'lat':17.341001,'lng':78.561496},
            {'lat':17.340823,'lng':78.562694},
            {'lat':17.34063,'lng':78.563831},
            {'lat':17.340278,'lng':78.564913},
            {'lat':17.340058,'lng':78.565434},
            {'lat':17.339904,'lng':78.565718},
            {'lat':17.339603,'lng':78.566289},
            {'lat':17.33926,'lng':78.566914},
            {'lat':17.338828,'lng':78.567663},
            {'lat':17.33852,'lng':78.568388},
            {'lat':17.338247,'lng':78.569147},
            {'lat':17.338148,'lng':78.569463},
            {'lat':17.338035,'lng':78.569783},
            {'lat':17.337829,'lng':78.570354},
            {'lat':17.337562,'lng':78.571195},
            {'lat':17.33723,'lng':78.572253},
            {'lat':17.336916,'lng':78.573309},
            {'lat':17.336835,'lng':78.573992},
            {'lat':17.336757,'lng':78.574543},
            {'lat':17.336657,'lng':78.57521},
            {'lat':17.33655,'lng':78.576},
            {'lat':17.336436,'lng':78.576882},
            {'lat':17.336322,'lng':78.577848},
            {'lat':17.336188,'lng':78.578683},
            {'lat':17.336083,'lng':78.579598},
            {'lat':17.335967,'lng':78.580609},
            {'lat':17.335824,'lng':78.58175},
            {'lat':17.335688,'lng':78.582842},
            {'lat':17.335479,'lng':78.583967},
            {'lat':17.335117,'lng':78.584859},
            {'lat':17.334765,'lng':78.585628},
            {'lat':17.334337,'lng':78.58649},
            {'lat':17.333883,'lng':78.587394},
            {'lat':17.333412,'lng':78.588305},
            {'lat':17.332817,'lng':78.589365},
            {'lat':17.332085,'lng':78.590577},
            {'lat':17.332008,'lng':78.590707},
            {'lat':17.331294,'lng':78.591885},
            {'lat':17.330562,'lng':78.59314},
            {'lat':17.330229,'lng':78.593888},
            {'lat':17.329886,'lng':78.594722},
            {'lat':17.329547,'lng':78.595685},
            {'lat':17.32916,'lng':78.596795},
            {'lat':17.328778,'lng':78.598012},
            {'lat':17.328403,'lng':78.599209},
            {'lat':17.327989,'lng':78.600478},
            {'lat':17.327603,'lng':78.601879},
            {'lat':17.327348,'lng':78.603313},
            {'lat':17.327128,'lng':78.604507},
            {'lat':17.32697,'lng':78.605325},
            {'lat':17.326762,'lng':78.606075},
            {'lat':17.326294,'lng':78.606893},
            {'lat':17.325802,'lng':78.607587},
            {'lat':17.325512,'lng':78.607967},
            {'lat':17.32505,'lng':78.608519},
            {'lat':17.324497,'lng':78.60919},
            {'lat':17.323898,'lng':78.609963},
            {'lat':17.323241,'lng':78.610819},
            {'lat':17.322528,'lng':78.611753},
            {'lat':17.321704,'lng':78.612844},
            {'lat':17.320791,'lng':78.614088},
            {'lat':17.320282,'lng':78.615574},
            {'lat':17.320033,'lng':78.617079},
            {'lat':17.320033,'lng':78.617079},
            {'lat':17.319917,'lng':78.618659},
            {'lat':17.319917,'lng':78.618659},
            {'lat':17.320085,'lng':78.620279},
            {'lat':17.320085,'lng':78.620279},
            {'lat':17.320249,'lng':78.621765},
            {'lat':17.32043,'lng':78.623369},
            {'lat':17.320586,'lng':78.625043},
            {'lat':17.320693,'lng':78.626702},
            {'lat':17.320977,'lng':78.628306},
            {'lat':17.321363,'lng':78.62989},
            {'lat':17.321746,'lng':78.631422},
            {'lat':17.322123,'lng':78.632947},
            {'lat':17.322272,'lng':78.634445},
            {'lat':17.322228,'lng':78.635958},
            {'lat':17.321921,'lng':78.637554},
            {'lat':17.32149,'lng':78.638903},
            {'lat':17.321037,'lng':78.640273},
            {'lat':17.320637,'lng':78.641529},
            {'lat':17.320326,'lng':78.642462},
            {'lat':17.319955,'lng':78.643588},
            {'lat':17.319719,'lng':78.645007},
            {'lat':17.319625,'lng':78.64666},
            {'lat':17.319665,'lng':78.648345},
            {'lat':17.319718,'lng':78.650038},
            {'lat':17.319367,'lng':78.651625},
            {'lat':17.318863,'lng':78.653045},
            {'lat':17.318369,'lng':78.65446},
            {'lat':17.317865,'lng':78.655864},
            {'lat':17.317416,'lng':78.657382},
            {'lat':17.317238,'lng':78.658925},
            {'lat':17.317339,'lng':78.660327},
            {'lat':17.317438,'lng':78.661537},
            {'lat':17.317482,'lng':78.662635},
            {'lat':17.317478,'lng':78.663659},
            {'lat':17.317417,'lng':78.664699},
            {'lat':17.317291,'lng':78.665771},
            {'lat':17.317058,'lng':78.666864},
            {'lat':17.31667,'lng':78.66818},
            {'lat':17.316259,'lng':78.669574},
            {'lat':17.315895,'lng':78.671033},
            {'lat':17.315506,'lng':78.672594},
            {'lat':17.314965,'lng':78.67417},
            {'lat':17.314384,'lng':78.675713},
            {'lat':17.313789,'lng':78.677297},
            {'lat':17.313218,'lng':78.678835},
            {'lat':17.31267,'lng':78.680303},
            {'lat':17.312178,'lng':78.681549},
            {'lat':17.311825,'lng':78.68236},
            {'lat':17.311795,'lng':78.682405},
            {'lat':17.31171,'lng':78.682497},
            {'lat':17.311617,'lng':78.682519},
            {'lat':17.310904,'lng':78.682277},
            {'lat':17.310176,'lng':78.682018},
            {'lat':17.309548,'lng':78.681768},
            {'lat':17.308522,'lng':78.681426},
            {'lat':17.307095,'lng':78.680917},
            {'lat':17.305461,'lng':78.680386},
            {'lat':17.303849,'lng':78.680505},
            {'lat':17.302448,'lng':78.681053},
            {'lat':17.301101,'lng':78.681237},
            {'lat':17.299807,'lng':78.680945},
            {'lat':17.298499,'lng':78.680565},
            {'lat':17.297229,'lng':78.680213},
            {'lat':17.295838,'lng':78.680115},
            {'lat':17.29413,'lng':78.680076},
            {'lat':17.292233,'lng':78.680054},
            {'lat':17.2904,'lng':78.680015},
            {'lat':17.288763,'lng':78.68},
            {'lat':17.28805,'lng':78.680123},
            {'lat':17.286447,'lng':78.681035},
            {'lat':17.28588,'lng':78.681258},
            {'lat':17.284503,'lng':78.680329},
            {'lat':17.283218,'lng':78.679836},
            {'lat':17.281879,'lng':78.679682},
            {'lat':17.280491,'lng':78.679544},
            {'lat':17.279037,'lng':78.679407},
            {'lat':17.27779,'lng':78.679269},
            {'lat':17.276893,'lng':78.678908},
            {'lat':17.275705,'lng':78.678598},
            {'lat':17.274342,'lng':78.67895},
            {'lat':17.272899,'lng':78.678939},
            {'lat':17.27216,'lng':78.678722},
            {'lat':17.271783,'lng':78.678404},
            {'lat':17.271604,'lng':78.678121},
            {'lat':17.271445,'lng':78.678037},
            {'lat':17.271342,'lng':78.678155},
            {'lat':17.27138,'lng':78.678268},
            {'lat':17.271791,'lng':78.678932},
            {'lat':17.272098,'lng':78.679595},
            {'lat':17.272201,'lng':78.680719},
            {'lat':17.271924,'lng':78.681559},
            {'lat':17.271921,'lng':78.682315},
            {'lat':17.272307,'lng':78.68309},
            {'lat':17.272742,'lng':78.683762},
            {'lat':17.272889,'lng':78.684975},
            {'lat':17.272634,'lng':78.686011},
            {'lat':17.272316,'lng':78.686423},
            {'lat':17.27137,'lng':78.686889},
            {'lat':17.270186,'lng':78.68643},
            {'lat':17.269195,'lng':78.68581},
            {'lat':17.268251,'lng':78.685206},
            {'lat':17.267308,'lng':78.684478},
            {'lat':17.266459,'lng':78.683898},
            {'lat':17.265522,'lng':78.683967},
            {'lat':17.265245,'lng':78.683965},
            {'lat':17.265114,'lng':78.683763},
            {'lat':17.265142,'lng':78.683584},
            {'lat':17.2653,'lng':78.683104},
            {'lat':17.265202,'lng':78.682456},
            {'lat':17.264695,'lng':78.681995},
            {'lat':17.264091,'lng':78.682013},
            {'lat':17.263254,'lng':78.683089},
            {'lat':17.262993,'lng':78.683471},
            {'lat':17.262943,'lng':78.683448},
            {'lat':17.262815,'lng':78.68336},
            {'lat':17.262375,'lng':78.683187},
            {'lat':17.26234,'lng':78.683039},
            {'lat':17.262338,'lng':78.68277},
            {'lat':17.262367,'lng':78.682332},
            {'lat':17.262403,'lng':78.681864},
            {'lat':17.262565,'lng':78.681046},
            {'lat':17.262653,'lng':78.680647},
            {'lat':17.262027,'lng':78.679837},
            {'lat':17.261467,'lng':78.679424},
            {'lat':17.261048,'lng':78.679357},
            {'lat':17.260717,'lng':78.679532},
            {'lat':17.260382,'lng':78.679493},
            {'lat':17.259622,'lng':78.679015},
            {'lat':17.259029,'lng':78.678625},
            {'lat':17.258549,'lng':78.678317},
            {'lat':17.258133,'lng':78.678087},
            {'lat':17.257296,'lng':78.678185},
            {'lat':17.256913,'lng':78.678439},
            {'lat':17.255924,'lng':78.679189},
            {'lat':17.255504,'lng':78.67955},
            {'lat':17.253866,'lng':78.68013},
            {'lat':17.252948,'lng':78.680385},
            {'lat':17.252536,'lng':78.680779},
            {'lat':17.252327,'lng':78.681833},
            {'lat':17.252169,'lng':78.682586},
            {'lat':17.252004,'lng':78.683372},
            {'lat':17.251164,'lng':78.683717},
            {'lat':17.250805,'lng':78.683903},
            {'lat':17.250759,'lng':78.683801},
            {'lat':17.25138,'lng':78.683654},
            {'lat':17.251935,'lng':78.683452},
            {'lat':17.252005,'lng':78.683068},
            {'lat':17.252085,'lng':78.68271},
            {'lat':17.252187,'lng':78.682178},
            {'lat':17.252301,'lng':78.681665},
            {'lat':17.252487,'lng':78.680842},
            {'lat':17.252503,'lng':78.680686},
            {'lat':17.252458,'lng':78.680498},
            {'lat':17.252493,'lng':78.680384},
            {'lat':17.252545,'lng':78.680348},
            {'lat':17.252726,'lng':78.68037},
            {'lat':17.252855,'lng':78.680393},
            {'lat':17.253716,'lng':78.680147},
            {'lat':17.254724,'lng':78.679849},
            {'lat':17.255315,'lng':78.679636},
            {'lat':17.256212,'lng':78.678867},
            {'lat':17.256644,'lng':78.67849},
            {'lat':17.256754,'lng':78.678327},
            {'lat':17.2568,'lng':78.678152},
            {'lat':17.256896,'lng':78.67809},
            {'lat':17.256949,'lng':78.678092},
            {'lat':17.257125,'lng':78.678153},
            {'lat':17.257255,'lng':78.678142},
            {'lat':17.257622,'lng':78.678033},
            {'lat':17.257814,'lng':78.677989},
            {'lat':17.257955,'lng':78.677988},
            {'lat':17.258261,'lng':78.678087},
            {'lat':17.259361,'lng':78.678822},
            {'lat':17.260425,'lng':78.679476},
            {'lat':17.26084,'lng':78.679332},
            {'lat':17.261412,'lng':78.679315},
            {'lat':17.262478,'lng':78.680107},
            {'lat':17.262559,'lng':78.68018},
            {'lat':17.262739,'lng':78.680377},
            {'lat':17.262754,'lng':78.680531},
            {'lat':17.262494,'lng':78.681424},
            {'lat':17.262368,'lng':78.682565},
            {'lat':17.26242,'lng':78.682922},
            {'lat':17.262742,'lng':78.68329},
            {'lat':17.262824,'lng':78.683373},
            {'lat':17.263183,'lng':78.683098},
            {'lat':17.263611,'lng':78.682369},
            {'lat':17.263972,'lng':78.681778},
            {'lat':17.264377,'lng':78.681724},
            {'lat':17.265064,'lng':78.682177},
            {'lat':17.265388,'lng':78.682809},
            {'lat':17.265233,'lng':78.683549},
            {'lat':17.265211,'lng':78.683828},
            {'lat':17.26539,'lng':78.683927},
            {'lat':17.26552,'lng':78.68389},
            {'lat':17.265837,'lng':78.683747},
            {'lat':17.266305,'lng':78.683745},
            {'lat':17.267216,'lng':78.684314},
            {'lat':17.267598,'lng':78.684611},
            {'lat':17.268351,'lng':78.685182},
            {'lat':17.269379,'lng':78.685833},
            {'lat':17.27058,'lng':78.686589},
            {'lat':17.270693,'lng':78.68666},
            {'lat':17.271012,'lng':78.686835},
            {'lat':17.27124,'lng':78.686854},
            {'lat':17.272208,'lng':78.686499},
            {'lat':17.272535,'lng':78.68616},
            {'lat':17.272885,'lng':78.684837},
            {'lat':17.272828,'lng':78.684049},
            {'lat':17.272003,'lng':78.682603},
            {'lat':17.271919,'lng':78.68164},
            {'lat':17.272157,'lng':78.681035},
            {'lat':17.272172,'lng':78.680339},
            {'lat':17.272068,'lng':78.679556},
            {'lat':17.271659,'lng':78.678735},
            {'lat':17.271364,'lng':78.678214},
            {'lat':17.270999,'lng':78.677312},
            {'lat':17.270957,'lng':78.676716},
            {'lat':17.27103,'lng':78.676463},
            {'lat':17.271185,'lng':78.676366},
            {'lat':17.271269,'lng':78.676436},
            {'lat':17.271147,'lng':78.676935},
            {'lat':17.271189,'lng':78.677282},
            {'lat':17.271623,'lng':78.677682},
            {'lat':17.272005,'lng':78.677943},
            {'lat':17.272442,'lng':78.6782},
            {'lat':17.273005,'lng':78.678447},
            {'lat':17.27315,'lng':78.678483},
            {'lat':17.273302,'lng':78.678501},
            {'lat':17.273404,'lng':78.678501},
            {'lat':17.274709,'lng':78.678389},
            {'lat':17.275465,'lng':78.678142},
            {'lat':17.275537,'lng':78.678125},
            {'lat':17.275766,'lng':78.678098},
            {'lat':17.27593,'lng':78.678099},
            {'lat':17.276292,'lng':78.678187},
            {'lat':17.277115,'lng':78.678832},
            {'lat':17.278968,'lng':78.679213},
            {'lat':17.280722,'lng':78.679388},
            {'lat':17.282392,'lng':78.679552},
            {'lat':17.284098,'lng':78.679722},
            {'lat':17.28467,'lng':78.679954},
            {'lat':17.285184,'lng':78.680738},
            {'lat':17.285404,'lng':78.680967},
            {'lat':17.285839,'lng':78.681118},
            {'lat':17.286145,'lng':78.681067},
            {'lat':17.287688,'lng':78.680172},
            {'lat':17.288263,'lng':78.679957},
            {'lat':17.290379,'lng':78.679933},
            {'lat':17.292196,'lng':78.679972},
            {'lat':17.293907,'lng':78.679993},
            {'lat':17.29533,'lng':78.680018},
            {'lat':17.296749,'lng':78.680051},
            {'lat':17.297956,'lng':78.680304},
            {'lat':17.299453,'lng':78.680744},
            {'lat':17.301031,'lng':78.68113},
            {'lat':17.302713,'lng':78.680853},
            {'lat':17.304303,'lng':78.680313},
            {'lat':17.304466,'lng':78.680288},
            {'lat':17.304964,'lng':78.680265},
            {'lat':17.305299,'lng':78.680294},
            {'lat':17.30693,'lng':78.680774},
            {'lat':17.308482,'lng':78.681326},
            {'lat':17.309679,'lng':78.681754},
            {'lat':17.310357,'lng':78.681993},
            {'lat':17.311081,'lng':78.682249},
            {'lat':17.31141,'lng':78.68238},
            {'lat':17.311547,'lng':78.682428},
            {'lat':17.311618,'lng':78.68243},
            {'lat':17.311705,'lng':78.682391},
            {'lat':17.31193,'lng':78.681878},
            {'lat':17.312232,'lng':78.681167},
            {'lat':17.31255,'lng':78.680405},
            {'lat':17.312861,'lng':78.679599},
            {'lat':17.313198,'lng':78.678682},
            {'lat':17.31356,'lng':78.677701},
            {'lat':17.313932,'lng':78.676722},
            {'lat':17.314343,'lng':78.675632},
            {'lat':17.314745,'lng':78.674564},
            {'lat':17.315127,'lng':78.673565},
            {'lat':17.31546,'lng':78.672551},
            {'lat':17.315732,'lng':78.671443},
            {'lat':17.316009,'lng':78.670257},
            {'lat':17.316373,'lng':78.668972},
            {'lat':17.316817,'lng':78.667518},
            {'lat':17.317221,'lng':78.665903},
            {'lat':17.317409,'lng':78.664214},
            {'lat':17.317435,'lng':78.662542},
            {'lat':17.317312,'lng':78.660852},
            {'lat':17.317209,'lng':78.659169},
            {'lat':17.317325,'lng':78.657534},
            {'lat':17.317705,'lng':78.656019},
            {'lat':17.318223,'lng':78.654495},
            {'lat':17.318762,'lng':78.653114},
            {'lat':17.319303,'lng':78.651678},
            {'lat':17.319685,'lng':78.650188},
            {'lat':17.31965,'lng':78.648596},
            {'lat':17.319601,'lng':78.647017},
            {'lat':17.319652,'lng':78.64547},
            {'lat':17.319839,'lng':78.643885},
            {'lat':17.320292,'lng':78.642433},
            {'lat':17.320667,'lng':78.641305},
            {'lat':17.321013,'lng':78.640241},
            {'lat':17.321416,'lng':78.638997},
            {'lat':17.32177,'lng':78.637857},
            {'lat':17.322065,'lng':78.636594},
            {'lat':17.322206,'lng':78.635202},
            {'lat':17.322169,'lng':78.633686},
            {'lat':17.321857,'lng':78.632127},
            {'lat':17.321462,'lng':78.630562},
            {'lat':17.321072,'lng':78.628996},
            {'lat':17.320716,'lng':78.627439},
            {'lat':17.320572,'lng':78.626075},
            {'lat':17.320489,'lng':78.624759},
            {'lat':17.320348,'lng':78.623308},
            {'lat':17.32019,'lng':78.621847},
            {'lat':17.320059,'lng':78.620486},
            {'lat':17.319915,'lng':78.619105},
            {'lat':17.319895,'lng':78.617654},
            {'lat':17.320105,'lng':78.616195},
            {'lat':17.320312,'lng':78.614951},
            {'lat':17.320788,'lng':78.613919},
            {'lat':17.32148,'lng':78.612983},
            {'lat':17.322239,'lng':78.611997},
            {'lat':17.323095,'lng':78.61093},
            {'lat':17.324043,'lng':78.609695},
            {'lat':17.325021,'lng':78.608405},
            {'lat':17.325756,'lng':78.607463},
            {'lat':17.32652,'lng':78.606425},
            {'lat':17.326921,'lng':78.605287},
            {'lat':17.327091,'lng':78.604392},
            {'lat':17.327265,'lng':78.603411},
            {'lat':17.327442,'lng':78.602409},
            {'lat':17.327683,'lng':78.601308},
            {'lat':17.328035,'lng':78.600098},
            {'lat':17.328403,'lng':78.598884},
            {'lat':17.328829,'lng':78.597601},
            {'lat':17.329266,'lng':78.596242},
            {'lat':17.329678,'lng':78.594992},
            {'lat':17.330108,'lng':78.593941},
            {'lat':17.330458,'lng':78.593202},
            {'lat':17.331007,'lng':78.592258},
            {'lat':17.331691,'lng':78.591137},
            {'lat':17.332434,'lng':78.589875},
            {'lat':17.333138,'lng':78.588686},
            {'lat':17.333833,'lng':78.587385},
            {'lat':17.3345,'lng':78.585978},
            {'lat':17.33516,'lng':78.584558},
            {'lat':17.33557,'lng':78.583029},
            {'lat':17.335805,'lng':78.581432},
            {'lat':17.335975,'lng':78.580018},
            {'lat':17.3361,'lng':78.578855},
            {'lat':17.3362,'lng':78.578052},
            {'lat':17.33631,'lng':78.577069},
            {'lat':17.336463,'lng':78.57581},
            {'lat':17.336615,'lng':78.574517},
            {'lat':17.336754,'lng':78.573584},
            {'lat':17.337024,'lng':78.572582},
            {'lat':17.33733,'lng':78.57161},
            {'lat':17.337584,'lng':78.570742},
            {'lat':17.337702,'lng':78.570363},
            {'lat':17.337839,'lng':78.569872},
            {'lat':17.337985,'lng':78.569383},
            {'lat':17.338326,'lng':78.56837},
            {'lat':17.338638,'lng':78.567574},
            {'lat':17.338909,'lng':78.567066},
            {'lat':17.339235,'lng':78.566551},
            {'lat':17.339638,'lng':78.565778},
            {'lat':17.340093,'lng':78.564928},
            {'lat':17.340398,'lng':78.564238},
            {'lat':17.34063,'lng':78.563177},
            {'lat':17.340809,'lng':78.561908},
            {'lat':17.340982,'lng':78.560785},
            {'lat':17.341174,'lng':78.559502},
            {'lat':17.34154,'lng':78.55818},
            {'lat':17.341988,'lng':78.557373},
            {'lat':17.342211,'lng':78.556982},
            {'lat':17.342585,'lng':78.556629},
            {'lat':17.342778,'lng':78.556339},
            {'lat':17.343109,'lng':78.555832},
            {'lat':17.343359,'lng':78.555498},
            {'lat':17.343675,'lng':78.555079},
            {'lat':17.343894,'lng':78.554711},
            {'lat':17.344293,'lng':78.554092},
            {'lat':17.344723,'lng':78.553394},
            {'lat':17.345018,'lng':78.552934},
            {'lat':17.345406,'lng':78.552387},
            {'lat':17.345852,'lng':78.551685},
            {'lat':17.346627,'lng':78.550665},
            {'lat':17.346957,'lng':78.550257},
            {'lat':17.347365,'lng':78.549837},
            {'lat':17.347921,'lng':78.54936},
            {'lat':17.348547,'lng':78.548877},
            {'lat':17.349158,'lng':78.548405},
            {'lat':17.349674,'lng':78.547908},
            {'lat':17.350127,'lng':78.54754},
            {'lat':17.350666,'lng':78.547129},
            {'lat':17.351412,'lng':78.546662},
            {'lat':17.3524,'lng':78.546299},
            {'lat':17.353585,'lng':78.546007},
            {'lat':17.354788,'lng':78.545692},
            {'lat':17.355899,'lng':78.545398},
            {'lat':17.356734,'lng':78.545185},
            {'lat':17.357802,'lng':78.544905},
            {'lat':17.359005,'lng':78.544597},
            {'lat':17.360291,'lng':78.544282},
            {'lat':17.361515,'lng':78.543952},
            {'lat':17.362746,'lng':78.543622},
            {'lat':17.363945,'lng':78.543248},
            {'lat':17.365011,'lng':78.542656},
            {'lat':17.365654,'lng':78.542134},
            {'lat':17.366005,'lng':78.541832},
            {'lat':17.366574,'lng':78.541256},
            {'lat':17.367113,'lng':78.540529},
            {'lat':17.367513,'lng':78.539772},
            {'lat':17.367858,'lng':78.538871},
            {'lat':17.367898,'lng':78.53873},
            {'lat':17.368071,'lng':78.538014},
            {'lat':17.36823,'lng':78.536945},
            {'lat':17.36829,'lng':78.535965},
            {'lat':17.368323,'lng':78.534977},
            {'lat':17.368325,'lng':78.534303},
            {'lat':17.368287,'lng':78.533757},
            {'lat':17.368303,'lng':78.533195},
            {'lat':17.368337,'lng':78.532449},
            {'lat':17.368341,'lng':78.531837},
            {'lat':17.368387,'lng':78.531037},
            {'lat':17.36839,'lng':78.530178},
            {'lat':17.368414,'lng':78.529481},
            {'lat':17.368417,'lng':78.52876},
            {'lat':17.368447,'lng':78.528004},
            {'lat':17.368453,'lng':78.527342},
            {'lat':17.368478,'lng':78.526753},
            {'lat':17.368486,'lng':78.526322},
            {'lat':17.36852,'lng':78.525737},
            {'lat':17.368427,'lng':78.52511},
            {'lat':17.368497,'lng':78.524617},
            {'lat':17.368524,'lng':78.524346},
            {'lat':17.368533,'lng':78.52361},
            {'lat':17.368525,'lng':78.523132},
            {'lat':17.368503,'lng':78.522141},
            {'lat':17.368545,'lng':78.521565},
            {'lat':17.368539,'lng':78.520992},
            {'lat':17.368572,'lng':78.520318},
            {'lat':17.368692,'lng':78.52003},
            {'lat':17.368784,'lng':78.520117},
            {'lat':17.368765,'lng':78.520554},
            {'lat':17.368772,'lng':78.520966},
            {'lat':17.368738,'lng':78.521554},
            {'lat':17.368712,'lng':78.522275},
            {'lat':17.368697,'lng':78.522934},
            {'lat':17.3687,'lng':78.52361},
            {'lat':17.368699,'lng':78.524342},
            {'lat':17.368627,'lng':78.525914},
            {'lat':17.368614,'lng':78.526887},
            {'lat':17.368615,'lng':78.527972},
            {'lat':17.368592,'lng':78.529122},
            {'lat':17.368561,'lng':78.530244},
            {'lat':17.368547,'lng':78.531371},
            {'lat':17.36854,'lng':78.532219},
            {'lat':17.368527,'lng':78.532853},
            {'lat':17.36851,'lng':78.533763},
            {'lat':17.368484,'lng':78.534622},
            {'lat':17.368478,'lng':78.535259},
            {'lat':17.368483,'lng':78.53591},
            {'lat':17.368456,'lng':78.536524},
            {'lat':17.368384,'lng':78.537391},
            {'lat':17.368234,'lng':78.53821},
            {'lat':17.368045,'lng':78.538939},
            {'lat':17.36783,'lng':78.539599},
            {'lat':17.367569,'lng':78.540124},
            {'lat':17.367114,'lng':78.540838},
            {'lat':17.366463,'lng':78.541627},
            {'lat':17.365637,'lng':78.542379},
            {'lat':17.364705,'lng':78.543014},
            {'lat':17.363631,'lng':78.543478},
            {'lat':17.362495,'lng':78.543798},
            {'lat':17.36142,'lng':78.544084},
            {'lat':17.360407,'lng':78.544354},
            {'lat':17.359383,'lng':78.544607},
            {'lat':17.358337,'lng':78.54488},
            {'lat':17.357204,'lng':78.545165},
            {'lat':17.356138,'lng':78.545459},
            {'lat':17.355199,'lng':78.545696},
            {'lat':17.354273,'lng':78.545939},
            {'lat':17.353344,'lng':78.546169},
            {'lat':17.352307,'lng':78.546443},
            {'lat':17.351332,'lng':78.546883},
            {'lat':17.350583,'lng':78.547452},
            {'lat':17.350073,'lng':78.547842},
            {'lat':17.349543,'lng':78.548223},
            {'lat':17.348954,'lng':78.54871},
            {'lat':17.348451,'lng':78.549115},
            {'lat':17.348049,'lng':78.549464},
            {'lat':17.347945,'lng':78.549636},
            {'lat':17.346994,'lng':78.550572},
            {'lat':17.346798,'lng':78.55083},
            {'lat':17.346681,'lng':78.550944},
            {'lat':17.346523,'lng':78.551101},
            {'lat':17.346347,'lng':78.551278},
            {'lat':17.346163,'lng':78.551489},
            {'lat':17.345968,'lng':78.551774},
            {'lat':17.345432,'lng':78.552587},
            {'lat':17.345057,'lng':78.553155},
            {'lat':17.344823,'lng':78.553504},
            {'lat':17.344507,'lng':78.554015},
            {'lat':17.344035,'lng':78.554798},
            {'lat':17.343473,'lng':78.555628},
            {'lat':17.342865,'lng':78.556486},
            {'lat':17.342515,'lng':78.557009},
            {'lat':17.342233,'lng':78.557538},
            {'lat':17.341822,'lng':78.558127},
            {'lat':17.341538,'lng':78.558808},
            {'lat':17.341289,'lng':78.559692},
            {'lat':17.341099,'lng':78.560707},
            {'lat':17.340923,'lng':78.561842},
            {'lat':17.340739,'lng':78.563153},
            {'lat':17.340478,'lng':78.564369},
            {'lat':17.339978,'lng':78.565467},
            {'lat':17.339434,'lng':78.566511},
            {'lat':17.338854,'lng':78.567509},
            {'lat':17.33839,'lng':78.568609},
            {'lat':17.338113,'lng':78.569582},
            {'lat':17.337897,'lng':78.57035},
            {'lat':17.337639,'lng':78.57111},
            {'lat':17.337372,'lng':78.571939},
            {'lat':17.33705,'lng':78.57287},
            {'lat':17.336907,'lng':78.573447},
            {'lat':17.336831,'lng':78.573939},
            {'lat':17.33676,'lng':78.574462},
            {'lat':17.336633,'lng':78.575175},
            {'lat':17.336528,'lng':78.575947},
            {'lat':17.336397,'lng':78.576898},
            {'lat':17.336268,'lng':78.578027},
            {'lat':17.336168,'lng':78.578882},
            {'lat':17.336056,'lng':78.579867},
            {'lat':17.335964,'lng':78.580677},
            {'lat':17.335846,'lng':78.581663},
            {'lat':17.335693,'lng':78.582807},
            {'lat':17.335436,'lng':78.584071},
            {'lat':17.334931,'lng':78.585239},
            {'lat':17.33436,'lng':78.586429},
            {'lat':17.333816,'lng':78.587622},
            {'lat':17.33317,'lng':78.58882},
            {'lat':17.33251,'lng':78.58992},
            {'lat':17.331818,'lng':78.591091},
            {'lat':17.331159,'lng':78.592149},
            {'lat':17.33054,'lng':78.593235},
            {'lat':17.330038,'lng':78.594374},
            {'lat':17.329594,'lng':78.595589},
            {'lat':17.32925,'lng':78.596659},
            {'lat':17.328859,'lng':78.597879},
            {'lat':17.328512,'lng':78.598983},
            {'lat':17.328173,'lng':78.599954},
            {'lat':17.327838,'lng':78.601094},
            {'lat':17.327539,'lng':78.602349},
            {'lat':17.327347,'lng':78.603447},
            {'lat':17.327137,'lng':78.604442},
            {'lat':17.326988,'lng':78.605248},
            {'lat':17.326849,'lng':78.605824},
            {'lat':17.326484,'lng':78.606598},
            {'lat':17.325912,'lng':78.607395},
            {'lat':17.325499,'lng':78.607994},
            {'lat':17.3249,'lng':78.60872},
            {'lat':17.32426,'lng':78.609544},
            {'lat':17.323575,'lng':78.610427},
            {'lat':17.322812,'lng':78.611405},
            {'lat':17.32203,'lng':78.612415},
            {'lat':17.321224,'lng':78.613461},
            {'lat':17.320518,'lng':78.614623},
            {'lat':17.320229,'lng':78.615919},
            {'lat':17.320229,'lng':78.615919},
            {'lat':17.32004,'lng':78.617232},
            {'lat':17.32004,'lng':78.617232},
            {'lat':17.31995,'lng':78.61854},
            {'lat':17.31995,'lng':78.61854},
            {'lat':17.320067,'lng':78.61987},
            {'lat':17.320067,'lng':78.61987},
            {'lat':17.3202,'lng':78.621103},
            {'lat':17.320319,'lng':78.622196},
            {'lat':17.320472,'lng':78.623532},
            {'lat':17.320613,'lng':78.625035},
            {'lat':17.320695,'lng':78.626467},
            {'lat':17.320904,'lng':78.627911},
            {'lat':17.321272,'lng':78.629425},
            {'lat':17.321637,'lng':78.630845},
            {'lat':17.321999,'lng':78.632305},
            {'lat':17.322267,'lng':78.633753},
            {'lat':17.322311,'lng':78.635133},
            {'lat':17.322192,'lng':78.636453},
            {'lat':17.321868,'lng':78.637841},
            {'lat':17.321465,'lng':78.639087},
            {'lat':17.321078,'lng':78.640307},
            {'lat':17.320732,'lng':78.641351},
            {'lat':17.320519,'lng':78.642008},
            {'lat':17.320279,'lng':78.642747},
            {'lat':17.32008,'lng':78.643339},
            {'lat':17.31987,'lng':78.644128},
            {'lat':17.319742,'lng':78.645304},
            {'lat':17.319652,'lng':78.64655},
            {'lat':17.319695,'lng':78.64783},
            {'lat':17.319731,'lng':78.64919},
            {'lat':17.319748,'lng':78.650491},
            {'lat':17.319394,'lng':78.651712},
            {'lat':17.318971,'lng':78.652905},
            {'lat':17.31858,'lng':78.653937},
            {'lat':17.318181,'lng':78.655038},
            {'lat':17.317747,'lng':78.656239},
            {'lat':17.317418,'lng':78.657527},
            {'lat':17.317283,'lng':78.658911},
            {'lat':17.317387,'lng':78.660315},
            {'lat':17.317471,'lng':78.661433},
            {'lat':17.317507,'lng':78.66253},
            {'lat':17.317497,'lng':78.663619},
            {'lat':17.317447,'lng':78.664727},
            {'lat':17.317305,'lng':78.665941},
            {'lat':17.317019,'lng':78.667174},
            {'lat':17.316703,'lng':78.668243},
            {'lat':17.316354,'lng':78.669317},
            {'lat':17.316022,'lng':78.670626},
            {'lat':17.31571,'lng':78.671952},
            {'lat':17.315379,'lng':78.673185},
            {'lat':17.315079,'lng':78.674099},
            {'lat':17.314939,'lng':78.674454},
            {'lat':17.314827,'lng':78.674717},
            {'lat':17.314645,'lng':78.675191},
            {'lat':17.314405,'lng':78.675825},
            {'lat':17.314027,'lng':78.676822},
            {'lat':17.313617,'lng':78.677878},
            {'lat':17.313134,'lng':78.679147},
            {'lat':17.312701,'lng':78.680325},
            {'lat':17.312244,'lng':78.681389},
            {'lat':17.311931,'lng':78.682184},
            {'lat':17.311708,'lng':78.682468},
            {'lat':17.311606,'lng':78.68249},
            {'lat':17.310835,'lng':78.682248},
            {'lat':17.310176,'lng':78.682008},
            {'lat':17.309503,'lng':78.681763},
            {'lat':17.308197,'lng':78.681318},
            {'lat':17.307198,'lng':78.680952},
            {'lat':17.306008,'lng':78.680522},
            {'lat':17.304685,'lng':78.680339},
            {'lat':17.303464,'lng':78.680623},
            {'lat':17.302289,'lng':78.681088},
            {'lat':17.300969,'lng':78.681208},
            {'lat':17.300042,'lng':78.681002},
            {'lat':17.299158,'lng':78.680742},
            {'lat':17.298279,'lng':78.680495},
            {'lat':17.297364,'lng':78.680235},
            {'lat':17.29602,'lng':78.680129},
            {'lat':17.294505,'lng':78.680102},
            {'lat':17.292836,'lng':78.680073},
            {'lat':17.29126,'lng':78.680057},
            {'lat':17.289812,'lng':78.680029},
            {'lat':17.288402,'lng':78.680042},
            {'lat':17.287474,'lng':78.68041},
            {'lat':17.286346,'lng':78.681087},
            {'lat':17.285988,'lng':78.681239},
            {'lat':17.28527,'lng':78.681035},
            {'lat':17.284043,'lng':78.680033},
            {'lat':17.28277,'lng':78.679779},
            {'lat':17.281462,'lng':78.679653},
            {'lat':17.280114,'lng':78.67952},
            {'lat':17.2788,'lng':78.679387},
            {'lat':17.277575,'lng':78.679203},
            {'lat':17.276668,'lng':78.678818},
            {'lat':17.275769,'lng':78.678594},
            {'lat':17.274282,'lng':78.67895},
            {'lat':17.27284,'lng':78.678909},
            {'lat':17.272073,'lng':78.678657},
            {'lat':17.27173,'lng':78.678334},
            {'lat':17.271601,'lng':78.678108},
            {'lat':17.271649,'lng':78.678697},
            {'lat':17.271823,'lng':78.679019},
            {'lat':17.272155,'lng':78.680032},
            {'lat':17.272197,'lng':78.68084},
            {'lat':17.271905,'lng':78.681678},
            {'lat':17.271906,'lng':78.682341},
            {'lat':17.272479,'lng':78.683387},
            {'lat':17.272735,'lng':78.683773},
            {'lat':17.272891,'lng':78.684939},
            {'lat':17.27266,'lng':78.685957},
            {'lat':17.272405,'lng':78.686359},
            {'lat':17.27128,'lng':78.686923},
            {'lat':17.270902,'lng':78.686883},
            {'lat':17.269928,'lng':78.686275},
            {'lat':17.26953,'lng':78.686017},
            {'lat':17.268885,'lng':78.685613},
            {'lat':17.268125,'lng':78.685126},
            {'lat':17.267302,'lng':78.684463},
            {'lat':17.266263,'lng':78.6838},
            {'lat':17.265817,'lng':78.683842},
            {'lat':17.26553,'lng':78.683978},
            {'lat':17.265258,'lng':78.683967},
            {'lat':17.265137,'lng':78.683855},
            {'lat':17.26529,'lng':78.683104},
            {'lat':17.265189,'lng':78.682449},
            {'lat':17.264598,'lng':78.681937},
            {'lat':17.264042,'lng':78.68205},
            {'lat':17.263278,'lng':78.68298},
            {'lat':17.262996,'lng':78.68343},
            {'lat':17.26252,'lng':78.68323},
            {'lat':17.262358,'lng':78.682994},
            {'lat':17.262378,'lng':78.68213},
            {'lat':17.262404,'lng':78.681824},
            {'lat':17.262625,'lng':78.680779},
            {'lat':17.262644,'lng':78.680687},
            {'lat':17.262649,'lng':78.680442},
            {'lat':17.262564,'lng':78.680303},
            {'lat':17.261919,'lng':78.67974},
            {'lat':17.2615,'lng':78.67943},
            {'lat':17.26102,'lng':78.679362},
            {'lat':17.260637,'lng':78.679563},
            {'lat':17.259757,'lng':78.679097},
            {'lat':17.258943,'lng':78.678553},
            {'lat':17.258265,'lng':78.678091},
            {'lat':17.257952,'lng':78.67801},
            {'lat':17.257278,'lng':78.67818},
            {'lat':17.256914,'lng':78.67842},
            {'lat':17.256009,'lng':78.679113},
            {'lat':17.255276,'lng':78.679705},
            {'lat':17.2543,'lng':78.679998},
            {'lat':17.253241,'lng':78.680288},
            {'lat':17.252859,'lng':78.680402},
            {'lat':17.252544,'lng':78.6808},
            {'lat':17.252338,'lng':78.681813},
            {'lat':17.252157,'lng':78.682658},
            {'lat':17.251997,'lng':78.683395},
            {'lat':17.251744,'lng':78.683642},
            {'lat':17.250952,'lng':78.683866},
            {'lat':17.250739,'lng':78.683955},
            {'lat':17.250325,'lng':78.683927},
            {'lat':17.250909,'lng':78.683764},
            {'lat':17.251142,'lng':78.683692},
            {'lat':17.251872,'lng':78.683578},
            {'lat':17.25251,'lng':78.683446},
            {'lat':17.253144,'lng':78.683307},
            {'lat':17.253914,'lng':78.683177},
            {'lat':17.255235,'lng':78.683087},
            {'lat':17.256592,'lng':78.683013},
            {'lat':17.256926,'lng':78.682928},
            {'lat':17.257257,'lng':78.682835},
            {'lat':17.257472,'lng':78.682826},
            {'lat':17.257889,'lng':78.683008},
            {'lat':17.258424,'lng':78.68349},
            {'lat':17.259763,'lng':78.683583},
            {'lat':17.261228,'lng':78.683604},
            {'lat':17.261342,'lng':78.683603},
            {'lat':17.261672,'lng':78.683612},
            {'lat':17.26188,'lng':78.68361},
            {'lat':17.262218,'lng':78.683473},
            {'lat':17.262338,'lng':78.683274},
            {'lat':17.262447,'lng':78.683136},
            {'lat':17.262545,'lng':78.68312},
            {'lat':17.262828,'lng':78.683368},
            {'lat':17.263246,'lng':78.682938},
            {'lat':17.263667,'lng':78.682252},
            {'lat':17.263977,'lng':78.681742},
            {'lat':17.26437,'lng':78.681713},
            {'lat':17.265083,'lng':78.682203},
            {'lat':17.265223,'lng':78.682368},
            {'lat':17.265377,'lng':78.682793},
            {'lat':17.265212,'lng':78.683577},
            {'lat':17.265195,'lng':78.68383},
            {'lat':17.265359,'lng':78.683928},
            {'lat':17.265476,'lng':78.683902},
            {'lat':17.265868,'lng':78.683721},
            {'lat':17.266295,'lng':78.683735},
            {'lat':17.267203,'lng':78.684288},
            {'lat':17.267847,'lng':78.684801},
            {'lat':17.268517,'lng':78.685274},
            {'lat':17.269378,'lng':78.685824},
            {'lat':17.270213,'lng':78.686348},
            {'lat':17.270901,'lng':78.68677},
            {'lat':17.272028,'lng':78.686559},
            {'lat':17.272424,'lng':78.686297},
            {'lat':17.272872,'lng':78.684979},
            {'lat':17.272849,'lng':78.684159},
            {'lat':17.272269,'lng':78.683043},
            {'lat':17.271941,'lng':78.682449},
            {'lat':17.271867,'lng':78.6818},
            {'lat':17.272148,'lng':78.680942},
            {'lat':17.272129,'lng':78.680199},
            {'lat':17.271965,'lng':78.679438},
            {'lat':17.27157,'lng':78.67865},
            {'lat':17.271296,'lng':78.678179},
            {'lat':17.271215,'lng':78.677859},
            {'lat':17.270968,'lng':78.67735},
            {'lat':17.270897,'lng':78.676915},
            {'lat':17.270984,'lng':78.676484},
            {'lat':17.27111,'lng':78.676364},
            {'lat':17.271246,'lng':78.676452},
            {'lat':17.271233,'lng':78.676584},
            {'lat':17.271131,'lng':78.676967},
            {'lat':17.271183,'lng':78.677294},
            {'lat':17.271528,'lng':78.67764},
            {'lat':17.271955,'lng':78.677901},
            {'lat':17.272415,'lng':78.678171},
            {'lat':17.272964,'lng':78.67842},
            {'lat':17.273201,'lng':78.678474},
            {'lat':17.273319,'lng':78.678487},
            {'lat':17.273391,'lng':78.678488},
            {'lat':17.275389,'lng':78.678138},
            {'lat':17.275514,'lng':78.678104},
            {'lat':17.275725,'lng':78.678079},
            {'lat':17.275871,'lng':78.678084},
            {'lat':17.276195,'lng':78.67814},
            {'lat':17.277253,'lng':78.678907},
            {'lat':17.277638,'lng':78.679048},
            {'lat':17.279572,'lng':78.67927},
            {'lat':17.281218,'lng':78.679428},
            {'lat':17.282829,'lng':78.679598},
            {'lat':17.284354,'lng':78.679767},
            {'lat':17.284809,'lng':78.680075},
            {'lat':17.28524,'lng':78.680828},
            {'lat':17.285587,'lng':78.681057},
            {'lat':17.286004,'lng':78.6811},
            {'lat':17.286275,'lng':78.681007},
            {'lat':17.287549,'lng':78.680244},
            {'lat':17.288184,'lng':78.679974},
            {'lat':17.28863,'lng':78.679914},
            {'lat':17.288942,'lng':78.679912},
            {'lat':17.290584,'lng':78.679936},
            {'lat':17.29228,'lng':78.67997},
            {'lat':17.293837,'lng':78.680014},
            {'lat':17.295223,'lng':78.680032},
            {'lat':17.296021,'lng':78.680045},
            {'lat':17.296294,'lng':78.680052},
            {'lat':17.296471,'lng':78.680052},
            {'lat':17.297655,'lng':78.680235},
            {'lat':17.298892,'lng':78.680588},
            {'lat':17.300342,'lng':78.681015},
            {'lat':17.300775,'lng':78.681113},
            {'lat':17.30122,'lng':78.681157},
            {'lat':17.30152,'lng':78.681155},
            {'lat':17.303025,'lng':78.680735},
            {'lat':17.304518,'lng':78.680282},
            {'lat':17.304674,'lng':78.68027},
            {'lat':17.305154,'lng':78.680273},
            {'lat':17.305475,'lng':78.680314},
            {'lat':17.306995,'lng':78.680795},
            {'lat':17.308418,'lng':78.681298},
            {'lat':17.309587,'lng':78.681703},
            {'lat':17.31033,'lng':78.68196},
            {'lat':17.311005,'lng':78.682198},
            {'lat':17.311369,'lng':78.682338},
            {'lat':17.311489,'lng':78.682387},
            {'lat':17.311569,'lng':78.682394},
            {'lat':17.311691,'lng':78.682336},
            {'lat':17.311883,'lng':78.681904},
            {'lat':17.312164,'lng':78.68122},
            {'lat':17.312466,'lng':78.680509},
            {'lat':17.312747,'lng':78.6798},
            {'lat':17.313052,'lng':78.679003},
            {'lat':17.313402,'lng':78.678114},
            {'lat':17.313709,'lng':78.67726},
            {'lat':17.314026,'lng':78.676377},
            {'lat':17.314404,'lng':78.675362},
            {'lat':17.314772,'lng':78.674404},
            {'lat':17.315128,'lng':78.673536},
            {'lat':17.315415,'lng':78.672662},
            {'lat':17.315663,'lng':78.671725},
            {'lat':17.315918,'lng':78.670687},
            {'lat':17.316193,'lng':78.669603},
            {'lat':17.316552,'lng':78.668372},
            {'lat':17.316953,'lng':78.667017},
            {'lat':17.317262,'lng':78.66554},
            {'lat':17.317392,'lng':78.664047},
            {'lat':17.317407,'lng':78.662549},
            {'lat':17.317318,'lng':78.661075},
            {'lat':17.317184,'lng':78.659477},
            {'lat':17.317237,'lng':78.657929},
            {'lat':17.317544,'lng':78.656465},
            {'lat':17.318014,'lng':78.655056},
            {'lat':17.318449,'lng':78.653813},
            {'lat':17.318815,'lng':78.652775},
            {'lat':17.319278,'lng':78.651599},
            {'lat':17.319619,'lng':78.650239},
            {'lat':17.319592,'lng':78.648795},
            {'lat':17.319558,'lng':78.647378},
            {'lat':17.319563,'lng':78.645994},
            {'lat':17.319684,'lng':78.644647},
            {'lat':17.319962,'lng':78.643327},
            {'lat':17.32035,'lng':78.642146},
            {'lat':17.32064,'lng':78.641255},
            {'lat':17.320959,'lng':78.640263},
            {'lat':17.32133,'lng':78.639133},
            {'lat':17.321693,'lng':78.638069},
            {'lat':17.322028,'lng':78.636757},
            {'lat':17.322191,'lng':78.635447},
            {'lat':17.322193,'lng':78.63407},
            {'lat':17.321939,'lng':78.632582},
            {'lat':17.321554,'lng':78.631039},
            {'lat':17.321207,'lng':78.629639},
            {'lat':17.32089,'lng':78.628265},
            {'lat':17.320628,'lng':78.626924},
            {'lat':17.320546,'lng':78.625556},
            {'lat':17.320448,'lng':78.62411},
            {'lat':17.320272,'lng':78.622609},
            {'lat':17.320117,'lng':78.621155},
            {'lat':17.319962,'lng':78.619712},
            {'lat':17.31983,'lng':78.618279},
            {'lat':17.319984,'lng':78.616849},
            {'lat':17.320164,'lng':78.615562},
            {'lat':17.32042,'lng':78.614595},
            {'lat':17.320898,'lng':78.613744},
            {'lat':17.321491,'lng':78.612929},
            {'lat':17.322132,'lng':78.612077},
            {'lat':17.322854,'lng':78.611154},
            {'lat':17.323655,'lng':78.610095},
            {'lat':17.324475,'lng':78.609024},
            {'lat':17.325108,'lng':78.608217},
            {'lat':17.32564,'lng':78.607503},
            {'lat':17.326252,'lng':78.606705},
            {'lat':17.32663,'lng':78.606},
            {'lat':17.326753,'lng':78.605687},
            {'lat':17.326875,'lng':78.605217},
            {'lat':17.327,'lng':78.60454},
            {'lat':17.327146,'lng':78.603721},
            {'lat':17.327303,'lng':78.602765},
            {'lat':17.327495,'lng':78.601745},
            {'lat':17.327768,'lng':78.600755},
            {'lat':17.328023,'lng':78.599882},
            {'lat':17.328264,'lng':78.59921},
            {'lat':17.328494,'lng':78.59857},
            {'lat':17.328791,'lng':78.597689},
            {'lat':17.329127,'lng':78.59664},
            {'lat':17.329466,'lng':78.595502},
            {'lat':17.329795,'lng':78.594505},
            {'lat':17.329951,'lng':78.594121},
            {'lat':17.330192,'lng':78.59357},
            {'lat':17.330578,'lng':78.59281},
            {'lat':17.331094,'lng':78.591932},
            {'lat':17.331666,'lng':78.590991},
            {'lat':17.332172,'lng':78.590088},
            {'lat':17.333034,'lng':78.58861},
            {'lat':17.333513,'lng':78.587767},
            {'lat':17.333998,'lng':78.58677},
            {'lat':17.334044,'lng':78.58667},
            {'lat':17.33447,'lng':78.585759},
            {'lat':17.334769,'lng':78.585067},
            {'lat':17.334957,'lng':78.58475},
            {'lat':17.335247,'lng':78.584209},
            {'lat':17.335474,'lng':78.583353},
            {'lat':17.335642,'lng':78.582256},
            {'lat':17.33581,'lng':78.58106},
            {'lat':17.335898,'lng':78.580077},
            {'lat':17.335931,'lng':78.579645},
            {'lat':17.336024,'lng':78.579095},
            {'lat':17.336144,'lng':78.578277},
            {'lat':17.336274,'lng':78.57723},
            {'lat':17.336427,'lng':78.576025},
            {'lat':17.336517,'lng':78.574947},
            {'lat':17.33658,'lng':78.574224},
            {'lat':17.336784,'lng':78.573307},
            {'lat':17.337047,'lng':78.572456},
            {'lat':17.337382,'lng':78.571419},
            {'lat':17.337677,'lng':78.570413},
            {'lat':17.338053,'lng':78.569304},
            {'lat':17.338339,'lng':78.568381},
            {'lat':17.338679,'lng':78.567525},
            {'lat':17.33888,'lng':78.567047},
            {'lat':17.339149,'lng':78.566568},
            {'lat':17.339482,'lng':78.565984},
            {'lat':17.339732,'lng':78.565511},
            {'lat':17.339942,'lng':78.565071},
            {'lat':17.340284,'lng':78.564432},
            {'lat':17.340538,'lng':78.563423},
            {'lat':17.340733,'lng':78.562156},
            {'lat':17.340913,'lng':78.560893},
            {'lat':17.341072,'lng':78.55971},
            {'lat':17.341179,'lng':78.558954},
            {'lat':17.341267,'lng':78.558681},
            {'lat':17.341535,'lng':78.55805},
            {'lat':17.341955,'lng':78.557298},
            {'lat':17.342271,'lng':78.556831},
            {'lat':17.34261,'lng':78.55647},
            {'lat':17.343004,'lng':78.555887},
            {'lat':17.34355,'lng':78.555119},
            {'lat':17.344056,'lng':78.554365},
            {'lat':17.34453,'lng':78.553638},
            {'lat':17.344963,'lng':78.553007},
            {'lat':17.345422,'lng':78.552301},
            {'lat':17.345858,'lng':78.551594},
            {'lat':17.346268,'lng':78.550977},
            {'lat':17.346558,'lng':78.550665},
            {'lat':17.346933,'lng':78.550192},
            {'lat':17.347328,'lng':78.549765},
            {'lat':17.347909,'lng':78.54929},
            {'lat':17.348562,'lng':78.548759},
            {'lat':17.349225,'lng':78.548266},
            {'lat':17.349607,'lng':78.547959},
            {'lat':17.35017,'lng':78.547433},
            {'lat':17.350518,'lng':78.547152},
            {'lat':17.351433,'lng':78.546588},
            {'lat':17.352668,'lng':78.546196},
            {'lat':17.35388,'lng':78.545885},
            {'lat':17.354889,'lng':78.54564},
            {'lat':17.355718,'lng':78.545406},
            {'lat':17.35667,'lng':78.545159},
            {'lat':17.357866,'lng':78.54485},
            {'lat':17.359213,'lng':78.544498},
            {'lat':17.36049,'lng':78.54417},
            {'lat':17.361432,'lng':78.543914},
            {'lat':17.362737,'lng':78.543547},
            {'lat':17.364011,'lng':78.543134},
            {'lat':17.365047,'lng':78.542593},
            {'lat':17.366112,'lng':78.541726},
            {'lat':17.366949,'lng':78.540692},
            {'lat':17.367268,'lng':78.54015},
            {'lat':17.36739,'lng':78.539854},
            {'lat':17.367637,'lng':78.539361},
            {'lat':17.367937,'lng':78.53864},
            {'lat':17.368165,'lng':78.53761},
            {'lat':17.368259,'lng':78.536565},
            {'lat':17.368309,'lng':78.535644},
            {'lat':17.368288,'lng':78.53458},
            {'lat':17.36829,'lng':78.533577},
            {'lat':17.368305,'lng':78.533191},
            {'lat':17.368339,'lng':78.532564},
            {'lat':17.368412,'lng':78.531688},
            {'lat':17.368439,'lng':78.530652},
            {'lat':17.368442,'lng':78.529667},
            {'lat':17.368457,'lng':78.529002},
            {'lat':17.36847,'lng':78.528269},
            {'lat':17.368488,'lng':78.52774},
            {'lat':17.368475,'lng':78.527422},
            {'lat':17.368508,'lng':78.526972},
            {'lat':17.368522,'lng':78.52625},
            {'lat':17.368571,'lng':78.52546},
            {'lat':17.368569,'lng':78.524653},
            {'lat':17.368555,'lng':78.523797},
            {'lat':17.368585,'lng':78.523108},
            {'lat':17.368603,'lng':78.52266},
            {'lat':17.36861,'lng':78.522142},
            {'lat':17.36863,'lng':78.52145},
            {'lat':17.368645,'lng':78.520714},
            {'lat':17.368682,'lng':78.520117},
            {'lat':17.368813,'lng':78.520411},
            {'lat':17.368741,'lng':78.52084},
            {'lat':17.368728,'lng':78.521052},
            {'lat':17.368712,'lng':78.521374},
            {'lat':17.36871,'lng':78.521713},
            {'lat':17.368725,'lng':78.522011},
            {'lat':17.36872,'lng':78.522289},
            {'lat':17.368689,'lng':78.522814},
            {'lat':17.368658,'lng':78.523471},
            {'lat':17.368635,'lng':78.524223},
            {'lat':17.368617,'lng':78.524929},
            {'lat':17.368608,'lng':78.525443},
            {'lat':17.368615,'lng':78.526067},
            {'lat':17.3686,'lng':78.526768},
            {'lat':17.36861,'lng':78.527223},
            {'lat':17.368618,'lng':78.527915},
            {'lat':17.36859,'lng':78.528585},
            {'lat':17.368554,'lng':78.529504},
            {'lat':17.368534,'lng':78.530588},
            {'lat':17.368525,'lng':78.531675},
            {'lat':17.368522,'lng':78.532458},
            {'lat':17.368519,'lng':78.533052},
            {'lat':17.368503,'lng':78.533324},
            {'lat':17.368482,'lng':78.533868},
            {'lat':17.368425,'lng':78.534488},
            {'lat':17.368368,'lng':78.535198},
            {'lat':17.368373,'lng':78.535932},
            {'lat':17.368333,'lng':78.536767},
            {'lat':17.368289,'lng':78.537483},
            {'lat':17.368168,'lng':78.538285},
            {'lat':17.368109,'lng':78.538568},
            {'lat':17.367951,'lng':78.539282},
            {'lat':17.367803,'lng':78.539721},
            {'lat':17.367654,'lng':78.539996},
            {'lat':17.367352,'lng':78.540526},
            {'lat':17.366907,'lng':78.541137},
            {'lat':17.366286,'lng':78.541803},
            {'lat':17.365442,'lng':78.542539},
            {'lat':17.364619,'lng':78.543083},
            {'lat':17.363614,'lng':78.543471},
            {'lat':17.362463,'lng':78.54378},
            {'lat':17.361448,'lng':78.54406},
            {'lat':17.360614,'lng':78.544292},
            {'lat':17.359698,'lng':78.544511},
            {'lat':17.358732,'lng':78.544754},
            {'lat':17.35774,'lng':78.545032},
            {'lat':17.356585,'lng':78.545334},
            {'lat':17.355403,'lng':78.545645},
            {'lat':17.354169,'lng':78.545947},
            {'lat':17.35303,'lng':78.546244},
            {'lat':17.351805,'lng':78.546581},
            {'lat':17.350915,'lng':78.54711},
            {'lat':17.35041,'lng':78.547534},
            {'lat':17.349817,'lng':78.548034},
            {'lat':17.349226,'lng':78.548592},
            {'lat':17.348498,'lng':78.549232},
            {'lat':17.348057,'lng':78.549582},
            {'lat':17.347678,'lng':78.549935},
            {'lat':17.347353,'lng':78.550215},
            {'lat':17.3471,'lng':78.550498},
            {'lat':17.346258,'lng':78.55136},
            {'lat':17.345983,'lng':78.55175},
            {'lat':17.345612,'lng':78.552338},
            {'lat':17.345243,'lng':78.552935},
            {'lat':17.345029,'lng':78.553317},
            {'lat':17.34476,'lng':78.553682},
            {'lat':17.344407,'lng':78.554213},
            {'lat':17.34397,'lng':78.554874},
            {'lat':17.34347,'lng':78.555596},
            {'lat':17.342934,'lng':78.556349},
            {'lat':17.342488,'lng':78.557054},
            {'lat':17.342158,'lng':78.557602},
            {'lat':17.341763,'lng':78.558187},
            {'lat':17.341459,'lng':78.558897},
            {'lat':17.341329,'lng':78.559538},
            {'lat':17.341253,'lng':78.55983},
            {'lat':17.341147,'lng':78.560394},
            {'lat':17.34104,'lng':78.561188},
            {'lat':17.340886,'lng':78.562195},
            {'lat':17.340729,'lng':78.5633},
            {'lat':17.340497,'lng':78.564318},
            {'lat':17.340176,'lng':78.565115},
            {'lat':17.339883,'lng':78.565713},
            {'lat':17.339502,'lng':78.566442},
            {'lat':17.33917,'lng':78.567064},
            {'lat':17.338967,'lng':78.567369},
            {'lat':17.338635,'lng':78.567982},
            {'lat':17.338386,'lng':78.568655},
            {'lat':17.338284,'lng':78.568934},
            {'lat':17.33812,'lng':78.56951},
            {'lat':17.337945,'lng':78.570158},
            {'lat':17.337648,'lng':78.57088},
            {'lat':17.337343,'lng':78.571846},
            {'lat':17.337024,'lng':78.572889},
            {'lat':17.336862,'lng':78.573573},
            {'lat':17.336777,'lng':78.574329},
            {'lat':17.336692,'lng':78.574972},
            {'lat':17.336657,'lng':78.575256},
            {'lat':17.336561,'lng':78.575845},
            {'lat':17.336464,'lng':78.576579},
            {'lat':17.336338,'lng':78.577493},
            {'lat':17.336228,'lng':78.578458},
            {'lat':17.336104,'lng':78.579379},
            {'lat':17.336098,'lng':78.58005},
            {'lat':17.336052,'lng':78.580348},
            {'lat':17.335941,'lng':78.581058},
            {'lat':17.3358,'lng':78.58209},
            {'lat':17.335645,'lng':78.583291},
            {'lat':17.335328,'lng':78.584428},
            {'lat':17.334999,'lng':78.58521},
            {'lat':17.334853,'lng':78.585492},
            {'lat':17.334534,'lng':78.586139},
            {'lat':17.334088,'lng':78.587057},
            {'lat':17.333602,'lng':78.588052},
            {'lat':17.333105,'lng':78.588933},
            {'lat':17.332768,'lng':78.589535},
            {'lat':17.332202,'lng':78.590454},
            {'lat':17.331669,'lng':78.591302},
            {'lat':17.331081,'lng':78.59224},
            {'lat':17.330555,'lng':78.593199},
            {'lat':17.330202,'lng':78.59397},
            {'lat':17.329994,'lng':78.594452},
            {'lat':17.32975,'lng':78.595019},
            {'lat':17.329455,'lng':78.595921},
            {'lat':17.329137,'lng':78.59697},
            {'lat':17.328818,'lng':78.598027},
            {'lat':17.328597,'lng':78.598811},
            {'lat':17.328492,'lng':78.599084},
            {'lat':17.328253,'lng':78.599745},
            {'lat':17.327939,'lng':78.600684},
            {'lat':17.327614,'lng':78.601854},
            {'lat':17.32738,'lng':78.603069},
            {'lat':17.327178,'lng':78.604176},
            {'lat':17.327038,'lng':78.604927},
            {'lat':17.326925,'lng':78.605535},
            {'lat':17.326742,'lng':78.606182},
            {'lat':17.326528,'lng':78.606558},
            {'lat':17.326072,'lng':78.607161},
            {'lat':17.325593,'lng':78.607824},
            {'lat':17.325134,'lng':78.608413},
            {'lat':17.32457,'lng':78.609139},
            {'lat':17.323947,'lng':78.609949},
            {'lat':17.323319,'lng':78.610762},
            {'lat':17.322648,'lng':78.611638},
            {'lat':17.321869,'lng':78.612635},
            {'lat':17.321072,'lng':78.6137},
            {'lat':17.32041,'lng':78.614877},
            {'lat':17.320149,'lng':78.616278},
            {'lat':17.319951,'lng':78.617718},
            {'lat':17.319989,'lng':78.619124},
            {'lat':17.320144,'lng':78.620619},
            {'lat':17.320305,'lng':78.62208},
            {'lat':17.320305,'lng':78.62208},
            {'lat':17.320449,'lng':78.623482},
            {'lat':17.320449,'lng':78.623482},
            {'lat':17.320577,'lng':78.624903},
            {'lat':17.320653,'lng':78.626403},
            {'lat':17.320873,'lng':78.627937},
            {'lat':17.321239,'lng':78.629424},
            {'lat':17.321589,'lng':78.630809},
            {'lat':17.321975,'lng':78.632248},
            {'lat':17.322256,'lng':78.633692},
            {'lat':17.322308,'lng':78.635065},
            {'lat':17.322304,'lng':78.635202},
            {'lat':17.322185,'lng':78.63644},
            {'lat':17.321871,'lng':78.637845},
            {'lat':17.321439,'lng':78.639165},
            {'lat':17.321088,'lng':78.640242},
            {'lat':17.320905,'lng':78.64085},
            {'lat':17.320675,'lng':78.641426},
            {'lat':17.320402,'lng':78.642187},
            {'lat':17.320049,'lng':78.643254},
            {'lat':17.319748,'lng':78.644606},
            {'lat':17.319629,'lng':78.646113},
            {'lat':17.31964,'lng':78.647705},
            {'lat':17.319685,'lng':78.649244},
            {'lat':17.319662,'lng':78.650653},
            {'lat':17.319225,'lng':78.65203},
            {'lat':17.318782,'lng':78.653274},
            {'lat':17.318652,'lng':78.653632},
            {'lat':17.318528,'lng':78.653988},
            {'lat':17.318295,'lng':78.654655},
            {'lat':17.317983,'lng':78.655518},
            {'lat':17.31763,'lng':78.656519},
            {'lat':17.317374,'lng':78.657743},
            {'lat':17.317288,'lng':78.659087},
            {'lat':17.317381,'lng':78.660483},
            {'lat':17.317474,'lng':78.661806},
            {'lat':17.317485,'lng':78.663037},
            {'lat':17.317454,'lng':78.664205},
            {'lat':17.317336,'lng':78.665412},
            {'lat':17.317095,'lng':78.666734},
            {'lat':17.316777,'lng':78.66789},
            {'lat':17.31643,'lng':78.669004},
            {'lat':17.316077,'lng':78.670262},
            {'lat':17.315733,'lng':78.671707},
            {'lat':17.31532,'lng':78.673198},
            {'lat':17.314793,'lng':78.67461},
            {'lat':17.314238,'lng':78.67606},
            {'lat':17.313696,'lng':78.677488},
            {'lat':17.313149,'lng':78.678953},
            {'lat':17.312591,'lng':78.680417},
            {'lat':17.312075,'lng':78.681716},
            {'lat':17.311847,'lng':78.682267},
            {'lat':17.311534,'lng':78.682473},
            {'lat':17.311059,'lng':78.682352},
            {'lat':17.310374,'lng':78.6821},
            {'lat':17.309735,'lng':78.68186},
            {'lat':17.309047,'lng':78.681607},
            {'lat':17.308034,'lng':78.681244},
            {'lat':17.306754,'lng':78.680798},
            {'lat':17.30537,'lng':78.680375},
            {'lat':17.304021,'lng':78.680447},
            {'lat':17.302848,'lng':78.680896},
            {'lat':17.301733,'lng':78.681208},
            {'lat':17.300352,'lng':78.681095},
            {'lat':17.299259,'lng':78.680779},
            {'lat':17.298154,'lng':78.680465},
            {'lat':17.297078,'lng':78.680197},
            {'lat':17.295612,'lng':78.680136},
            {'lat':17.294178,'lng':78.680112},
            {'lat':17.29257,'lng':78.680092},
            {'lat':17.291015,'lng':78.680052},
            {'lat':17.289641,'lng':78.680029},
            {'lat':17.288234,'lng':78.680074},
            {'lat':17.28728,'lng':78.680539},
            {'lat':17.286159,'lng':78.681195},
            {'lat':17.285662,'lng':78.681253},
            {'lat':17.28448,'lng':78.680301},
            {'lat':17.283317,'lng':78.679842},
            {'lat':17.282104,'lng':78.679707},
            {'lat':17.280862,'lng':78.67958},
            {'lat':17.27952,'lng':78.679442},
            {'lat':17.27828,'lng':78.679323},
            {'lat':17.277373,'lng':78.67911},
            {'lat':17.27651,'lng':78.678764},
            {'lat':17.275801,'lng':78.678607},
            {'lat':17.27433,'lng':78.678953},
            {'lat':17.272897,'lng':78.678927},
            {'lat':17.272144,'lng':78.678708},
            {'lat':17.271733,'lng':78.678349},
            {'lat':17.271577,'lng':78.67809},
            {'lat':17.271413,'lng':78.678015},
            {'lat':17.271354,'lng':78.678069},
            {'lat':17.271332,'lng':78.678139},
            {'lat':17.271399,'lng':78.678309},
            {'lat':17.271821,'lng':78.679001},
            {'lat':17.271993,'lng':78.679352},
            {'lat':17.272177,'lng':78.680412},
            {'lat':17.272184,'lng':78.680854},
            {'lat':17.271884,'lng':78.681747},
            {'lat':17.271925,'lng':78.682377},
            {'lat':17.272466,'lng':78.683346},
            {'lat':17.272705,'lng':78.683733},
            {'lat':17.272868,'lng':78.684943},
            {'lat':17.272629,'lng':78.68596},
            {'lat':17.272339,'lng':78.686385},
            {'lat':17.271334,'lng':78.686899},
            {'lat':17.270572,'lng':78.686674},
            {'lat':17.269978,'lng':78.686301},
            {'lat':17.269214,'lng':78.685817},
            {'lat':17.268444,'lng':78.685342},
            {'lat':17.267782,'lng':78.684863},
            {'lat':17.266879,'lng':78.684166},
            {'lat':17.26636,'lng':78.683847},
            {'lat':17.265553,'lng':78.683977},
            {'lat':17.265286,'lng':78.683997},
            {'lat':17.265119,'lng':78.683834},
            {'lat':17.265122,'lng':78.683665},
            {'lat':17.265295,'lng':78.683106},
            {'lat':17.265202,'lng':78.68247},
            {'lat':17.264634,'lng':78.681951},
            {'lat':17.264089,'lng':78.682005},
            {'lat':17.263292,'lng':78.683},
            {'lat':17.263112,'lng':78.683385},
            {'lat':17.262339,'lng':78.683495},
            {'lat':17.262205,'lng':78.683579},
            {'lat':17.26196,'lng':78.683614},
            {'lat':17.260967,'lng':78.683607},
            {'lat':17.259952,'lng':78.683602},
            {'lat':17.259014,'lng':78.683592},
            {'lat':17.258287,'lng':78.683431},
            {'lat':17.257784,'lng':78.682956},
            {'lat':17.257248,'lng':78.682866},
            {'lat':17.256413,'lng':78.683102},
            {'lat':17.254998,'lng':78.683142},
            {'lat':17.253655,'lng':78.683222},
            {'lat':17.25249,'lng':78.683472},
            {'lat':17.251408,'lng':78.683649},
            {'lat':17.25082,'lng':78.683911},
            {'lat':17.250171,'lng':78.683969},
            {'lat':17.249989,'lng':78.683819},
            {'lat':17.250184,'lng':78.683792},
            {'lat':17.251091,'lng':78.683727},
            {'lat':17.251767,'lng':78.683605},
            {'lat':17.252513,'lng':78.68346},
            {'lat':17.25312,'lng':78.683318},
            {'lat':17.253818,'lng':78.683196},
            {'lat':17.255132,'lng':78.683105},
            {'lat':17.256597,'lng':78.683017},
            {'lat':17.257083,'lng':78.682864},
            {'lat':17.257824,'lng':78.682964},
            {'lat':17.258424,'lng':78.683497},
            {'lat':17.260004,'lng':78.683575},
            {'lat':17.260287,'lng':78.68358},
            {'lat':17.260708,'lng':78.683592},
            {'lat':17.26099,'lng':78.683597},
            {'lat':17.261128,'lng':78.683597},
            {'lat':17.261528,'lng':78.6836},
            {'lat':17.261777,'lng':78.683608},
            {'lat':17.261893,'lng':78.683605},
            {'lat':17.262192,'lng':78.683502},
            {'lat':17.262305,'lng':78.683351},
            {'lat':17.262348,'lng':78.683272},
            {'lat':17.262499,'lng':78.683127},
            {'lat':17.262616,'lng':78.683152},
            {'lat':17.262805,'lng':78.683338},
            {'lat':17.26307,'lng':78.683247},
            {'lat':17.263656,'lng':78.682288},
            {'lat':17.263928,'lng':78.681827},
            {'lat':17.264085,'lng':78.681677},
            {'lat':17.264304,'lng':78.681692},
            {'lat':17.264455,'lng':78.68177},
            {'lat':17.265057,'lng':78.682181},
            {'lat':17.265386,'lng':78.682811},
            {'lat':17.265199,'lng':78.683669},
            {'lat':17.265249,'lng':78.683904},
            {'lat':17.265446,'lng':78.683925},
            {'lat':17.265571,'lng':78.683875},
            {'lat':17.265828,'lng':78.683755},
            {'lat':17.266332,'lng':78.68376},
            {'lat':17.267375,'lng':78.68443},
            {'lat':17.268165,'lng':78.685052},
            {'lat':17.269163,'lng':78.685688},
            {'lat':17.270434,'lng':78.686484},
            {'lat':17.27091,'lng':78.686775},
            {'lat':17.272089,'lng':78.686542},
            {'lat':17.272624,'lng':78.685982},
            {'lat':17.272869,'lng':78.684448},
            {'lat':17.272752,'lng':78.683859},
            {'lat':17.27199,'lng':78.682597},
            {'lat':17.271874,'lng':78.681805},
            {'lat':17.272132,'lng':78.681031},
            {'lat':17.272135,'lng':78.679997},
            {'lat':17.272068,'lng':78.679624},
            {'lat':17.271531,'lng':78.67854},
            {'lat':17.271334,'lng':78.678164},
            {'lat':17.271031,'lng':78.677442},
            {'lat':17.270915,'lng':78.676887},
            {'lat':17.27097,'lng':78.676594},
            {'lat':17.271054,'lng':78.676371},
            {'lat':17.271164,'lng':78.676338},
            {'lat':17.271216,'lng':78.67636},
            {'lat':17.271264,'lng':78.676534},
            {'lat':17.271222,'lng':78.676669},
            {'lat':17.271143,'lng':78.677001},
            {'lat':17.271237,'lng':78.677387},
            {'lat':17.271782,'lng':78.677795},
            {'lat':17.272229,'lng':78.678074},
            {'lat':17.272757,'lng':78.678328},
            {'lat':17.273089,'lng':78.67845},
            {'lat':17.273278,'lng':78.67848},
            {'lat':17.273403,'lng':78.678482},
            {'lat':17.274765,'lng':78.678378},
            {'lat':17.275523,'lng':78.678132},
            {'lat':17.275598,'lng':78.678118},
            {'lat':17.27585,'lng':78.678099},
            {'lat':17.276034,'lng':78.67811},
            {'lat':17.276407,'lng':78.678222},
            {'lat':17.277124,'lng':78.678815},
            {'lat':17.27891,'lng':78.679179},
            {'lat':17.28061,'lng':78.679349},
            {'lat':17.28223,'lng':78.679508},
            {'lat':17.283808,'lng':78.679659},
            {'lat':17.284407,'lng':78.679752},
            {'lat':17.285148,'lng':78.680617},
            {'lat':17.285447,'lng':78.680953},
            {'lat':17.285862,'lng':78.68109},
            {'lat':17.28615,'lng':78.681054},
            {'lat':17.28745,'lng':78.680313},
            {'lat':17.288096,'lng':78.679998},
            {'lat':17.290044,'lng':78.679924},
            {'lat':17.291797,'lng':78.679953},
            {'lat':17.293551,'lng':78.68001},
            {'lat':17.295058,'lng':78.680012},
            {'lat':17.29645,'lng':78.680037},
            {'lat':17.297695,'lng':78.680219},
            {'lat':17.299229,'lng':78.680672},
            {'lat':17.300925,'lng':78.681114},
            {'lat':17.3011,'lng':78.68113},
            {'lat':17.301629,'lng':78.681122},
            {'lat':17.301985,'lng':78.681072},
            {'lat':17.303702,'lng':78.680464},
            {'lat':17.304222,'lng':78.680317},
            {'lat':17.30477,'lng':78.680255},
            {'lat':17.305143,'lng':78.680265},
            {'lat':17.306884,'lng':78.68074},
            {'lat':17.308467,'lng':78.681305},
            {'lat':17.309684,'lng':78.68174},
            {'lat':17.310158,'lng':78.682005},
            {'lat':17.310265,'lng':78.682059},
            {'lat':17.310989,'lng':78.682295},
            {'lat':17.311364,'lng':78.682422},
            {'lat':17.311553,'lng':78.682435},
            {'lat':17.311733,'lng':78.682331},
            {'lat':17.31181,'lng':78.682199},
            {'lat':17.312166,'lng':78.681326},
            {'lat':17.312566,'lng':78.680347},
            {'lat':17.312947,'lng':78.679327},
            {'lat':17.31333,'lng':78.678281},
            {'lat':17.313688,'lng':78.67732},
            {'lat':17.314072,'lng':78.676329},
            {'lat':17.314539,'lng':78.675173},
            {'lat':17.314966,'lng':78.674039},
            {'lat':17.315362,'lng':78.672892},
            {'lat':17.31568,'lng':78.671715},
            {'lat':17.315969,'lng':78.670503},
            {'lat':17.316323,'lng':78.669193},
            {'lat':17.316763,'lng':78.667708},
            {'lat':17.317192,'lng':78.666104},
            {'lat':17.317375,'lng':78.664579},
            {'lat':17.317429,'lng':78.663167},
            {'lat':17.317379,'lng':78.661613},
            {'lat':17.317238,'lng':78.660038},
            {'lat':17.317203,'lng':78.658577},
            {'lat':17.31739,'lng':78.656922},
            {'lat':17.317925,'lng':78.655324},
            {'lat':17.318485,'lng':78.653736},
            {'lat':17.319099,'lng':78.652127},
            {'lat':17.319621,'lng':78.650494},
            {'lat':17.319615,'lng':78.6488},
            {'lat':17.319569,'lng':78.64709},
            {'lat':17.319633,'lng':78.645381},
            {'lat':17.319837,'lng':78.643793},
            {'lat':17.320317,'lng':78.642291},
            {'lat':17.320824,'lng':78.64073},
            {'lat':17.321369,'lng':78.639111},
            {'lat':17.321879,'lng':78.637524},
            {'lat':17.322164,'lng':78.635869},
            {'lat':17.322196,'lng':78.634125},
            {'lat':17.321921,'lng':78.632362},
            {'lat':17.321466,'lng':78.630607},
            {'lat':17.321019,'lng':78.628822},
            {'lat':17.320627,'lng':78.627052},
            {'lat':17.320548,'lng':78.625275},
            {'lat':17.320393,'lng':78.623425},
            {'lat':17.320203,'lng':78.621649},
            {'lat':17.320012,'lng':78.619909},
            {'lat':17.319858,'lng':78.618207},
            {'lat':17.320067,'lng':78.616466},
            {'lat':17.320361,'lng':78.614769},
            {'lat':17.321144,'lng':78.613454},
            {'lat':17.322013,'lng':78.612317},
            {'lat':17.322722,'lng':78.611364},
            {'lat':17.323532,'lng':78.610326},
            {'lat':17.324491,'lng':78.609054},
            {'lat':17.325492,'lng':78.60778},
            {'lat':17.326397,'lng':78.606611},
            {'lat':17.32692,'lng':78.605247},
            {'lat':17.327172,'lng':78.603866},
            {'lat':17.327417,'lng':78.60241},
            {'lat':17.32779,'lng':78.600899},
            {'lat':17.328281,'lng':78.599343},
            {'lat':17.328799,'lng':78.597741},
            {'lat':17.329315,'lng':78.596119},
            {'lat':17.329799,'lng':78.594675},
            {'lat':17.330427,'lng':78.593268},
            {'lat':17.331216,'lng':78.591853},
            {'lat':17.332152,'lng':78.590334},
            {'lat':17.333033,'lng':78.588829},
            {'lat':17.333856,'lng':78.587287},
            {'lat':17.334608,'lng':78.585695},
            {'lat':17.335324,'lng':78.584134},
            {'lat':17.335621,'lng':78.582591},
            {'lat':17.33585,'lng':78.58108},
            {'lat':17.336029,'lng':78.579542},
            {'lat':17.336189,'lng':78.578042},
            {'lat':17.336401,'lng':78.576533},
            {'lat':17.336574,'lng':78.575032},
            {'lat':17.336694,'lng':78.574063},
            {'lat':17.336734,'lng':78.573714},
            {'lat':17.336934,'lng':78.572878},
            {'lat':17.337268,'lng':78.571777},
            {'lat':17.337583,'lng':78.570737},
            {'lat':17.337889,'lng':78.56969},
            {'lat':17.338065,'lng':78.569085},
            {'lat':17.338334,'lng':78.568304},
            {'lat':17.338736,'lng':78.567351},
            {'lat':17.33897,'lng':78.566988},
            {'lat':17.339326,'lng':78.566364},
            {'lat':17.339748,'lng':78.565487},
            {'lat':17.339958,'lng':78.565065},
            {'lat':17.340297,'lng':78.564436},
            {'lat':17.340557,'lng':78.56336},
            {'lat':17.340759,'lng':78.562027},
            {'lat':17.340899,'lng':78.560884},
            {'lat':17.341084,'lng':78.559755},
            {'lat':17.341415,'lng':78.558406},
            {'lat':17.342012,'lng':78.55727},
            {'lat':17.342158,'lng':78.557017},
            {'lat':17.342528,'lng':78.556664},
            {'lat':17.34273,'lng':78.556372},
            {'lat':17.343249,'lng':78.555584},
            {'lat':17.343897,'lng':78.554662},
            {'lat':17.344585,'lng':78.553573},
            {'lat':17.344893,'lng':78.553114},
            {'lat':17.345341,'lng':78.552466},
            {'lat':17.345919,'lng':78.551597},
            {'lat':17.346712,'lng':78.550575},
            {'lat':17.347349,'lng':78.549863},
            {'lat':17.348215,'lng':78.549157},
            {'lat':17.349093,'lng':78.54845},
            {'lat':17.349955,'lng':78.547791},
            {'lat':17.350958,'lng':78.547028},
            {'lat':17.352159,'lng':78.546412},
            {'lat':17.35353,'lng':78.546038},
            {'lat':17.355001,'lng':78.54565},
            {'lat':17.356346,'lng':78.545313},
            {'lat':17.357734,'lng':78.544964},
            {'lat':17.359112,'lng':78.544605},
            {'lat':17.360542,'lng':78.544239},
            {'lat':17.36197,'lng':78.543865},
            {'lat':17.363413,'lng':78.543462},
            {'lat':17.364734,'lng':78.542871},
            {'lat':17.365896,'lng':78.542023},
            {'lat':17.366844,'lng':78.540937},
            {'lat':17.367457,'lng':78.539837},
            {'lat':17.367633,'lng':78.5395},
            {'lat':17.367908,'lng':78.5388},
            {'lat':17.368195,'lng':78.537699},
            {'lat':17.368283,'lng':78.536381},
            {'lat':17.368289,'lng':78.535144},
            {'lat':17.368296,'lng':78.533949},
            {'lat':17.368292,'lng':78.533137},
            {'lat':17.368292,'lng':78.53282},
            {'lat':17.368348,'lng':78.532002},
            {'lat':17.36838,'lng':78.530813},
            {'lat':17.368417,'lng':78.529562},
            {'lat':17.368479,'lng':78.528302},
            {'lat':17.368497,'lng':78.527458},
            {'lat':17.368519,'lng':78.526654},
            {'lat':17.368534,'lng':78.525709},
            {'lat':17.368473,'lng':78.525097},
            {'lat':17.368502,'lng':78.524267},
            {'lat':17.36853,'lng':78.523271},
            {'lat':17.368511,'lng':78.522732},
            {'lat':17.368578,'lng':78.522137},
            {'lat':17.368619,'lng':78.521475},
            {'lat':17.368619,'lng':78.521259},
            {'lat':17.36873,'lng':78.52129},
            {'lat':17.368689,'lng':78.521895},
            {'lat':17.368682,'lng':78.522187},
            {'lat':17.368684,'lng':78.522885},
            {'lat':17.368669,'lng':78.523671},
            {'lat':17.368623,'lng':78.524647},
            {'lat':17.368554,'lng':78.525759},
            {'lat':17.368577,'lng':78.52679},
            {'lat':17.368563,'lng':78.527893},
            {'lat':17.368538,'lng':78.529102},
            {'lat':17.368514,'lng':78.53035},
            {'lat':17.368475,'lng':78.531585},
            {'lat':17.368472,'lng':78.532496},
            {'lat':17.36845,'lng':78.533445},
            {'lat':17.368403,'lng':78.534584},
            {'lat':17.368363,'lng':78.535777},
            {'lat':17.368288,'lng':78.537132},
            {'lat':17.36812,'lng':78.538478},
            {'lat':17.367718,'lng':78.539724},
            {'lat':17.367098,'lng':78.540763},
            {'lat':17.366329,'lng':78.541728},
            {'lat':17.365383,'lng':78.542558},
            {'lat':17.364466,'lng':78.543128},
            {'lat':17.363334,'lng':78.543563},
            {'lat':17.361968,'lng':78.543914},
            {'lat':17.360587,'lng':78.54429},
            {'lat':17.35924,'lng':78.544614},
            {'lat':17.357916,'lng':78.544954},
            {'lat':17.356515,'lng':78.545315},
            {'lat':17.355062,'lng':78.545674},
            {'lat':17.353632,'lng':78.546043},
            {'lat':17.352138,'lng':78.546454},
            {'lat':17.350962,'lng':78.54711},
            {'lat':17.35037,'lng':78.547527},
            {'lat':17.349865,'lng':78.547882},
            {'lat':17.34899,'lng':78.548585},
            {'lat':17.348148,'lng':78.549354},
            {'lat':17.347559,'lng':78.549954},
            {'lat':17.347063,'lng':78.550467},
            {'lat':17.346429,'lng':78.551148},
            {'lat':17.346175,'lng':78.551334},
            {'lat':17.345738,'lng':78.55201},
            {'lat':17.345531,'lng':78.552334},
            {'lat':17.344965,'lng':78.553189},
            {'lat':17.344443,'lng':78.553973},
            {'lat':17.343938,'lng':78.554731},
            {'lat':17.34364,'lng':78.555303},
            {'lat':17.343211,'lng':78.555911},
            {'lat':17.342647,'lng':78.556738},
            {'lat':17.342331,'lng':78.557283},
            {'lat':17.341977,'lng':78.557794},
            {'lat':17.341577,'lng':78.558505},
            {'lat':17.341348,'lng':78.55933},
            {'lat':17.341117,'lng':78.56018},
            {'lat':17.340965,'lng':78.561183},
            {'lat':17.34079,'lng':78.562388},
            {'lat':17.340574,'lng':78.563857},
            {'lat':17.340055,'lng':78.565213},
            {'lat':17.339438,'lng':78.566432},
            {'lat':17.338744,'lng':78.567592},
            {'lat':17.338275,'lng':78.568774},
            {'lat':17.337934,'lng':78.569915},
            {'lat':17.337631,'lng':78.570883},
            {'lat':17.337378,'lng':78.571652},
            {'lat':17.337063,'lng':78.572632},
            {'lat':17.336775,'lng':78.573797},
            {'lat':17.336615,'lng':78.575028},
        ]

        var arr1 = ["17.405078,78.486421",
            "17.405084,78.486341",
            "17.405111,78.486225",
            "17.405194,78.486054",
            "17.405243,78.486014",
            "17.40529,78.485984",
            "17.40534,78.485981",
            "17.405905,78.486105",
            "17.405959,78.486109",
            "17.406004,78.486101",
            "17.40603,78.486048",
            "17.406132,78.48575",
            "17.406253,78.48547",
            "17.406306,78.485195",
            "17.406376,78.484905",
            "17.40641,78.484823",
            "17.407345,78.485022",
            "17.40819,78.48524",
            "17.409175,78.485439",
            "17.409547,78.485512",
            "17.409649,78.485535",
            "17.409728,78.485525",
            "17.40977,78.48551",
            "17.409796,78.485469",
            "17.409805,78.485415",
            "17.409897,78.485125",
            "17.410077,78.484853",
            "17.410188,78.484577",
            "17.410316,78.484459",
            "17.41039,78.484469",
            "17.410783,78.484554",
            "17.410782,78.484709",
            "17.410612,78.485098",
            "17.410494,78.485473",
            "17.410383,78.485828",
            "17.41028,78.486148",
            "17.410177,78.486495",
            "17.410125,78.486793",
            "17.410043,78.487109",
            "17.409857,78.487503",
            "17.409669,78.487923",
            "17.409554,78.488289",
            "17.409477,78.488569",
            "17.409424,78.48886",
            "17.409323,78.489173",
            "17.409184,78.489493",
            "17.40911,78.48977",
            "17.409019,78.490077",
            "17.408912,78.490377",
            "17.408802,78.490652",
            "17.408674,78.491055",
            "17.408559,78.491438",
            "17.408457,78.491748",
            "17.408333,78.49214",
            "17.40823,78.492527",
            "17.40812,78.492875",
            "17.407976,78.493285",
            "17.407837,78.493679",
            "17.407739,78.493993",
            "17.407625,78.494333",
            "17.407474,78.494755",
            "17.407301,78.495235",
            "17.407137,78.495649",
            "17.407009,78.495962",
            "17.406927,78.496293",
            "17.406938,78.496423",
            "17.407055,78.496614",
            "17.407609,78.496888",
            "17.407827,78.49701",
            "17.407776,78.497107",
            "17.407325,78.496963",
            "17.406998,78.49688",
            "17.406794,78.497152",
            "17.406649,78.497545",
            "17.406494,78.497934",
            "17.406307,78.498418",
            "17.40612,78.498902",
            "17.405989,78.499243",
            "17.405874,78.499539",
            "17.405737,78.49988",
            "17.405522,78.500381",
            "17.405322,78.500945",
            "17.405147,78.50145",
            "17.405008,78.501798",
            "17.404863,78.502135",
            "17.40472,78.50248",
            "17.40457,78.502878",
            "17.404419,78.503364",
            "17.404199,78.503914",
            "17.40406,78.504286",
            "17.403937,78.5046",
            "17.403788,78.505047",
            "17.403664,78.505487",
            "17.40354,78.505889",
            "17.403394,78.506327",
            "17.403265,78.506737",
            "17.403136,78.507106",
            "17.402992,78.507375",
            "17.402805,78.507687",
            "17.402571,78.507958",
            "17.402263,78.508267",
            "17.401936,78.508577",
            "17.401653,78.508849",
            "17.401633,78.508869",
            "17.401599,78.508912",
            "17.401627,78.508984",
            "17.401918,78.509276",
            "17.402277,78.509612",
            "17.402619,78.509919",
            "17.402933,78.510195",
            "17.403238,78.510467",
            "17.403542,78.51075",
            "17.403883,78.511052",
            "17.404195,78.511354",
            "17.404534,78.511734",
            "17.404749,78.512032",
            "17.404919,78.512305",
            "17.405115,78.512604",
            "17.405313,78.512905",
            "17.405457,78.51318",
            "17.405543,78.513484",
            "17.405408,78.514045",
            "17.405303,78.514345",
            "17.405258,78.514667",
            "17.405297,78.514952",
            "17.405342,78.515245",
            "17.405444,78.515564",
            "17.405563,78.515865",
            "17.405672,78.516138",
            "17.405823,78.516439",
            "17.406021,78.516711",
            "17.406263,78.517",
            "17.406542,78.517314",
            "17.406788,78.517605",
            "17.407082,78.517939",
            "17.407394,78.518325",
            "17.407689,78.518673",
            "17.407967,78.518963",
            "17.408304,78.51924",
            "17.408638,78.519515",
            "17.408988,78.519814",
            "17.409376,78.52013",
            "17.409721,78.52041",
            "17.410061,78.520683",
            "17.410389,78.520964",
            "17.410735,78.521243",
            "17.411115,78.521542",
            "17.411518,78.521827",
            "17.411898,78.522092",
            "17.412335,78.522394",
            "17.41268,78.522667",
            "17.413109,78.522959",
            "17.41354,78.523275",
            "17.413999,78.523637",
            "17.414412,78.523983",
            "17.414724,78.524372",
            "17.414903,78.524752",
            "17.41499,78.525075",
            "17.415116,78.525508",
            "17.41525,78.525848",
            "17.415423,78.52612",
            "17.415687,78.526447",
            "17.415959,78.52672",
            "17.416376,78.527007",
            "17.417125,78.527245",
            "17.417397,78.527285",
            "17.417551,78.527298",
            "17.417713,78.527297",
            "17.417867,78.527307",
            "17.418027,78.527307",
            "17.418187,78.527314",
            "17.41888,78.527302",
            "17.418928,78.527301",
            "17.419003,78.527307",
            "17.420082,78.527278",
            "17.420482,78.527012",
            "17.420764,78.526729",
            "17.421025,78.526437",
            "17.42133,78.526165",
            "17.421773,78.525919",
            "17.421839,78.525918",
            "17.421891,78.52593",
            "17.422457,78.526023",
            "17.422904,78.526352",
            "17.423073,78.526631",
            "17.42324,78.52695",
            "17.42345,78.527262",
            "17.423668,78.527533",
            "17.423944,78.527814",
            "17.424232,78.528092",
            "17.424473,78.528365",
            "17.424748,78.528665",
            "17.42503,78.528976",
            "17.425302,78.529273",
            "17.42557,78.529567",
            "17.425832,78.52986",
            "17.42608,78.530153",
            "17.426269,78.530375",
            "17.426503,78.530668",
            "17.426626,78.530769",
            "17.426838,78.530769",
            "17.42711,78.530469",
            "17.427307,78.530181",
            "17.427491,78.529863",
            "17.427655,78.529577",
            "17.427833,78.529278",
            "17.42795,78.528994",
            "17.428006,78.528717",
            "17.428066,78.528445",
            "17.428058,78.528317",
            "17.428354,78.528016",
            "17.428553,78.527668",
            "17.428786,78.527278",
            "17.428969,78.527005",
            "17.429213,78.526715",
            "17.429482,78.526493",
            "17.429203,78.526757",
            "17.42898,78.52708",
            "17.428805,78.527401",
            "17.428663,78.527724",
            "17.428487,78.528117",
            "17.428308,78.528517",
            "17.428142,78.52891",
            "17.427974,78.529267",
            "17.427817,78.52959",
            "17.427593,78.529977",
            "17.427338,78.530397",
            "17.42702,78.530819",
            "17.426679,78.531224",
            "17.426335,78.531669",
            "17.426042,78.53213",
            "17.425805,78.532588",
            "17.425593,78.533075",
            "17.425405,78.533565",
            "17.425265,78.534008",
            "17.425174,78.534388",
            "17.425083,78.534789",
            "17.424973,78.535273",
            "17.424843,78.535719",
            "17.424679,78.536077",
            "17.424425,78.536396",
            "17.424159,78.536663",
            "17.423785,78.536989",
            "17.423308,78.537383",
            "17.422793,78.537819",
            "17.422363,78.538274",
            "17.422012,78.538747",
            "17.421709,78.539172",
            "17.421402,78.539581",
            "17.421119,78.539932",
            "17.420847,78.540228",
            "17.42059,78.540504",
            "17.420025,78.54077",
            "17.419644,78.541071",
            "17.419397,78.541355",
            "17.419324,78.541592",
            "17.419482,78.54186",
            "17.419712,78.542144",
            "17.419982,78.542439",
            "17.420225,78.542707",
            "17.420485,78.543021",
            "17.420744,78.543322",
            "17.420985,78.543611",
            "17.421237,78.543901",
            "17.421514,78.544201",
            "17.421835,78.544565",
            "17.422146,78.544904",
            "17.422424,78.545202",
            "17.42267,78.545508",
            "17.422924,78.545773",
            "17.4232,78.546054",
            "17.423466,78.546322",
            "17.423693,78.546594",
            "17.423933,78.546869",
            "17.424177,78.547139",
            "17.424482,78.547439",
            "17.424769,78.547723",
            "17.425049,78.547993",
            "17.425295,78.548259",
            "17.425561,78.548544",
            "17.425848,78.548841",
            "17.426112,78.54912",
            "17.426277,78.549338",
            "17.42651,78.549613",
            "17.426769,78.54988",
            "17.427035,78.55015",
            "17.427332,78.550426",
            "17.427668,78.550696",
            "17.427989,78.550991",
            "17.428353,78.551273",
            "17.428756,78.551565",
            "17.429087,78.551835",
            "17.429412,78.552101",
            "17.429771,78.552393",
            "17.430109,78.552675",
            "17.430447,78.552974",
            "17.430774,78.553252",
            "17.431103,78.55352",
            "17.431434,78.553784",
            "17.431998,78.554131",
            "17.432813,78.554347",
            "17.43398,78.554504",
            "17.435328,78.55463",
            "17.436108,78.554884",
            "17.436557,78.555156",
            "17.436864,78.555432",
            "17.437152,78.555752",
            "17.43735,78.55611",
            "17.437531,78.556532",
            "17.437734,78.55703",
            "17.437907,78.557449",
            "17.438068,78.557831",
            "17.438225,78.558205",
            "17.438343,78.558498",
            "17.43839,78.558625",
            "17.438308,78.558708",
            "17.437853,78.558967",
            "17.437292,78.55922",
            "17.436749,78.55948",
            "17.436588,78.559592",
            "17.436568,78.559654",
            "17.436597,78.559743",
            "17.436423,78.559936"];

        console.log(arrLatLng.length);

//        var cnty = 0;
//        var p_cnty = 0;
//        var temparr = [];
//        temparr[cnty] = [];
//        for (var f = 0; f < arr1.length; f++) {
//            if (f % 100 != 0)
//                temparr[cnty].push(arr1[f]);
//            else {
//                if (f == 0)
//                    continue
//                p_cnty = angular.copy(cnty);
//                console.log(p_cnty)
//                $.get('https://roads.googleapis.com/v1/snapToRoads', {
//                    interpolate: true,
//                    key: apiKey,
//                    path: temparr[p_cnty].join('|')
//                }, function (data) {
////            console.log('===========================================================');
//                    console.log('yoooooooooo');
//                    if (data.snappedPoints) {
//                        console.log(p_cnty)
//                        console.log('----------')
//                        for (var h = 0; h < data.snappedPoints.length; h++) {
//                            if (data.snappedPoints[h].originalIndex && data.snappedPoints[h].location.latitude && data.snappedPoints[h].location.longitude) {
//                                arrLatLng[h + (p_cnty * 100)] = {"lat": data.snappedPoints[h].location.latitude, "lng": data.snappedPoints[h].location.longitude}
//                            }
//                        }
//                    }
//
//                }(p_cnty));
//                cnty = cnty + 1;
//                temparr[cnty] = []
//
//            }
//        }


//        $.get('https://roads.googleapis.com/v1/snapToRoads', {
//            interpolate: true,
//            key: apiKey,
//            path: arr2.join('|')
//        }, function (data) {
//
//            if (data.snappedPoints) {
//                for (var h =0; h<data.snappedPoints.length;h++){
//                    if(data.snappedPoints[h].originalIndex && data.snappedPoints[h].location.latitude && data.snappedPoints[h].location.longitude) {
//                        arrLatLng[h+100] = {"lat" : data.snappedPoints[h].location.latitude,"lng" : data.snappedPoints[h].location.longitude}
//                    }
//                }
//            }
//
//        });
//        $.get('https://roads.googleapis.com/v1/snapToRoads', {
//            interpolate: true,
//            key: apiKey,
//            path: arr3.join('|')
//        }, function (data) {
//
//            if (data.snappedPoints) {
//                for (var h =0; h<data.snappedPoints.length;h++){
//                    if(data.snappedPoints[h].originalIndex && data.snappedPoints[h].location.latitude && data.snappedPoints[h].location.longitude) {
//                        arrLatLng[h+200] = {"lat" : data.snappedPoints[h].location.latitude,"lng" : data.snappedPoints[h].location.longitude}
//                    }
//                }
//            }
//
//        });
//        $.get('https://roads.googleapis.com/v1/snapToRoads', {
//            interpolate: true,
//            key: apiKey,
//            path: arr4.join('|')
//        }, function (data) {
//            console.log(arrLatLng.length);
//            if (data.snappedPoints) {
//                for (var h =0; h<data.snappedPoints.length;h++){
//                    if(data.snappedPoints[h].originalIndex && data.snappedPoints[h].location.latitude && data.snappedPoints[h].location.longitude) {
//                        arrLatLng[h+300] = {"lat" : data.snappedPoints[h].location.latitude,"lng" : data.snappedPoints[h].location.longitude}
//                    }
//                }
//
//
//            }
//
//        });
        setTimeout(function () {


            console.log('heeeeeeeeeeeeeeeeeeeee')
            var totalDist1 = calcPathLength(arrLatLng);
            var totalDist2 = 0;
            var totalDist3 = 0;

            for (i = 0; i < arrLatLng.length - 1; i++) {
                if (arrLatLng[i] == undefined) {
                    i = i + 1;
                }
                if (arrLatLng[i + 1] == undefined) {
//                        arrLatLng[i + 1] = arrLatLng[i + 2];
                    arrLatLng.splice(i + 1, 1)
                }
                if (arrLatLng[i] && arrLatLng[i + 1]) {
                    totalDist2 = totalDist2 + distance(arrLatLng[i].lat, arrLatLng[i].lng, arrLatLng[i + 1].lat, arrLatLng[i + 1].lng, "K");
                    totalDist3 = totalDist2 + getDistanceFromLatLonInKm(arrLatLng[i].lat, arrLatLng[i].lng, arrLatLng[i + 1].lat, arrLatLng[i + 1].lng);
                }
            }


            console.log("------------Total distance is 2---------------");
            console.log(totalDist1);
            console.log(totalDist2);
            console.log(totalDist3);
            console.log("----------------------------s---------------");
        }, 2500);

    };

    function calcPathLength(path) {
        var total = 0;
        for (var i = 0; i < path.length - 1; i++) {
            if (path[i] == undefined) {
                i = i + 1;
            }
            if (path[i + 1] == undefined) {
                path.splice(i + 1, 1)
            }
            if (path[i] && path[i + 1]) {
                var pos1 = new google.maps.LatLng(path[i].lat, path[i].lng);
                var pos2 = new google.maps.LatLng(path[i + 1].lat, path[i + 1].lng);
                total += google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2);
            }
        }
        ;
        return total;
    };

    function distance(lat1, lon1, lat2, lon2, unit) {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        ;
        if (unit == "N") {
            dist = dist * 0.8684
        }
        ;
        return dist
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }


    $scope.locatePointsInsideCityorOutside = function () {

        var inside = false;
        var polygon = $scope.zipCodesData[0].geometry.coordinates;
        for (var i = 0; i < arrUserMarkers.length; i++) {
            arrUserMarkers[i].setMap(null);
        }
        arrUserMarkers = [];


        angular.forEach($scope.addresses, function (item, indx) {
            if (indx < $scope.addresses.length - 1) {
                inside = isPointInPoly([ item.lat, item.lng ], polygon);
//                item.status = inside == true ? 'Inside' : 'Outside';
                item.status = inside == true ? $scope.zipCodesData[0].properties.st_nm : '';

                var latitude = item.lat;
                var longitude = item.lng;

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
                    icon: inside == true ? 'images/icon/greenMarker.png' : 'images/icon/redMarker.png',
                    map: map
                });

                marker.setMap(map);
                var infoWindow = new google.maps.InfoWindow({
                    content: item.lat + ',' + item.lng
                });
                marker.addListener('click', function () {
                    for (i = 0; i < arrInfowindows.length; i++) {
                        arrInfowindows[i].close();
                    }
                    arrInfowindows = [];
                    infoWindow.open(map, marker);
                    arrInfowindows.push(infoWindow);
                });
                arrUserMarkers.push(marker);
                arrMarkers.push(marker);
            }
        });
    };


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

    $scope.searchPOI = function () {
        for (var i = 0; i < arrMarkers.length; i++) {
            arrMarkers[i].setMap(null);
        }
        arrMarkers = [];

        var location = new google.maps.LatLng($scope.wayPointsPOI[0].location.geometry.location.lat(), $scope.wayPointsPOI[0].location.geometry.location.lng());
// Specify location, radius and place types for your Places API search.
        var request = {
            location: location,
            name: $scope.wayPointsPOI.POI,
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: []
        };

        // Create the PlaceService and send the request.
        // Handle the callback with an anonymous function.
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, placePOIs);
    };

    function placePOIs(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            map.setZoom(13);
            map.setCenter($scope.wayPointsPOI[0].location.geometry.location);
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place, infoWindowContent) {
        var placeLoc = place.geometry ? place.geometry.location : place;
        var marker = new google.maps.Marker({
            map: map,
            position: placeLoc
//            icon : place.icon
        });
        var infoWindow = new google.maps.InfoWindow();

        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(infoWindowContent ? infoWindowContent : place.name);
            infoWindow.open(map, this);
        });

        arrMarkers.push(marker);
    }

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
//    var boundsPOI = new google.maps.LatLngBounds();

    $scope.calulateWeightageforPOI = function (selectedCity) {
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

    function getZoomByBounds(map, bounds) {
        var MAX_ZOOM = map.mapTypes.get(map.getMapTypeId()).maxZoom || 21;
        var MIN_ZOOM = map.mapTypes.get(map.getMapTypeId()).minZoom || 0;

        var ne = map.getProjection().fromLatLngToPoint(bounds.getNorthEast());
        var sw = map.getProjection().fromLatLngToPoint(bounds.getSouthWest());

        var worldCoordWidth = Math.abs(ne.x - sw.x);
        var worldCoordHeight = Math.abs(ne.y - sw.y);

        //Fit padding in pixels
        var FIT_PAD = 40;

        for (var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom) {
            if (worldCoordWidth * (1 << zoom) + 2 * FIT_PAD < $(map.getDiv()).width() &&
                worldCoordHeight * (1 << zoom) + 2 * FIT_PAD < $(map.getDiv()).height())
                return zoom;
        }
        return 0;
    }

    $scope.TotalWeightage = "";
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

    var cntSearch = 0;

    function calculateWeightage(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
//            console.log(request);
            console.log('-------------' + cntSearch + '-------------------');
            console.log(results[0]);
            cntSearch++;
        }
    }


    $scope.establishmentsCount = function(locationSelected, mapDataToload) {
        $scope.cntApiCalls = 0;
        $scope.cntApiresults = 0;
        $scope.cntresults = 0;

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address': locationSelected}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    angular.forEach($scope.establishments, function (item, index) {
                        if (item != null) {
                            setTimeout(function () {
                                // Specify location, radius and place types for your Places API search.
                                var request = {
                                    location: results[0].geometry.location,
//                                    name: item['Brand'],
                                    rankBy: google.maps.places.RankBy.DISTANCE,
                                    type: item
                                };

                                // Create the PlaceService and send the request.
                                // Handle the callback with an anonymous function.
                                var service = new google.maps.places.PlacesService(map);
                                service.nearbySearch(request, function (results, status, pagination) {
                                    $scope.cntApiCalls = $scope.cntApiCalls + 1;
                                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                                        $scope.cntApiresults = $scope.cntApiresults + 1;
                                        $scope.cntresults = $scope.cntresults + results.length;

                                        $scope.$apply();
//                                        console.log('-------------' + index + '--------' + $scope.weightagePOI[index]['Brand'] + '  -----  ' + pagination.hasNextPage + '------' + results.length + '-------------------');
                                        for (var g = 0; g < results.length; g++)
                                        {
//                                            console.log(results[g].name);
                                            $scope.establishmentsResult.push({
                                                'name' : results[g].name,
                                                'vicinity' : results[g].vicinity,
                                                'type' : item,
                                                'rating' : results[g].rating
                                            })
                                        }

                                        if (pagination.hasNextPage) {
                                            setTimeout(function () {
                                                pagination.nextPage();
                                            }, 2000)

                                        }
                                    }
                                    else {
                                        console.log('error');
//                                        console.log(status + '   ----' + $scope.weightagePOI[index]['Brand']);
                                    }
                                });
                            }, 200 * index);
                        }
                    });


                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });



    }


//    Reverse geocode Times Internet
    $scope.reverse_geocode_addresses = [
        {"lat": 86.458396, "lng": 24.369628, "state": "", "district":""},
        {"lat":23.11254, "lng":85.61646, "state": "", "district":""},
        {"lat":17.570695, "lng":78.900028, "state": "", "district":""},
        {"lat":23.858459,"lng":84.356532, "state": "", "district":""},
//        {"lat":23.4846, "lng":88.13232, "state": "", "district":""},
//        {"lat":18.277311, "lng":74.014570, "state": "", "district":""},
//        {"lat":26.464260, "lng":84.020541, "state": "", "district":""},
//        {"lat":21.895735, "lng":87.030795, "state": "", "district":""},

//        {"lat":9.473807, "lng":	78.259842, "state": "", "district":""},
//        {"lat":25.427545, "lng":	72.432843}

    ];
    $scope.India_all_States_Shape_data = [];

    function load_all_India_States_Shape_FileData() {
        $.getJSON('/IndiaStatesShapeFile', {}, function (data) {
            $scope.India_all_States_Shape_data = data;
            $scope.$apply();
        });

    }

    function reveseGeocode_UserLocation_using_ShapeFile(point, vs) {
        try {
            var x = point[1], y = point[0];
//        console.log(x);
//        console.log(y);
//        vs = vs[0];
            var poly = vs;
            var pt = point;

//        var aaaa = google.maps.geometry.poly.containsLocation(point, vs);
//            console.log(aaaa)

            var inside = false;

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
        }
        catch(err) {
            console.log(err.message);
        }
        return inside;
    }

    $scope.getUserLocation_reverseGeocode_State = function() {
        //Loop through all user locations given
        var flgBreak = false;
        angular.forEach($scope.reverse_geocode_addresses, function (item, indx) {
//            check if dat is not blank .i.e. last row
            if (indx < $scope.reverse_geocode_addresses.length - 1) {
                flgBreak = false;
//                loop thru all shape files
                for (var shapeIndex = 0; shapeIndex < $scope.India_all_States_Shape_data.length; shapeIndex++) {
                    if (flgBreak)
                        break;
                    var shapeItem = $scope.India_all_States_Shape_data[shapeIndex];
                    if (shapeItem ) {
                        if (shapeItem.features)
                        //loop thru each  shape file
                        {
                            for (var featureIndex = 0; featureIndex < shapeItem.features.length; featureIndex++) {
                                if (flgBreak)
                                    break;

                                //loop thru all feature of a shape file
                                var featureItem = shapeItem.features[featureIndex];

                                if (featureItem) {
                                    try {
                                        if (featureItem.geometry) {
                                            var polygon = featureItem.geometry.coordinates[0];
//                                        console.log(featureItem.properties.district + featureItem.properties.st_nm + featureIndex);

                                            var inside = reveseGeocode_UserLocation_using_ShapeFile([ item.lat, item.lng ], polygon);
                                            if (inside) {
                                                $scope.reverse_geocode_addresses[indx].state = featureItem.properties.st_nm?featureItem.properties.st_nm:featureItem.properties.ST_NAME;
                                                $scope.reverse_geocode_addresses[indx].district = featureItem.properties.district?featureItem.properties.district:featureItem.properties.DIST_NAME;
                                                flgBreak = true;
                                                break;
                                            }
                                        }
                                    }
                                    catch (err) {
                                        console.log(err.message);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

//////////////////////////////////////Default function calling on load////////////////////////////////
    setTimeout(function () {
        $scope.initMap();

//        $scope.placeZipcodesBoundries();
    }, 100);
})
;


angular.module('angularjs_with_Nodejs').directive('googleplace', function () {
    var markers = [];
    return {
        require: 'ngModel',
        scope: true,
        link: function ($scope, element) {

            var autocomplete = new google.maps.places.Autocomplete(element[0]);
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();

                if (element.context.id == "src") {
                    $scope.wayPoints[0]['origin'] = {"Latitude": place.geometry.location.lat(), "Longitude": place.geometry.location.lng()};

                }
                else if (element.context.id == "dest") {
                    $scope.wayPoints[0]['destination'] = {"Latitude": place.geometry.location.lat(), "Longitude": place.geometry.location.lng()};
                }
                else if (element.context.id == "srcNav") {
                    $scope.wayPointsNav[0]['origin'] = {"Latitude": place.geometry.location.lat(), "Longitude": place.geometry.location.lng()};
                    $scope.wayPointsNav[0]['originName'] = place.name;

                }
                else if (element.context.id == "destNav") {
                    $scope.wayPointsNav[0]['destination'] = {"Latitude": place.geometry.location.lat(), "Longitude": place.geometry.location.lng()};
                    $scope.wayPointsNav[0]['destinationName'] = place.name;

                }
                else if (element.context.id == "srcPOI") {
                    $scope.wayPointsPOI[0]['location'] = place;// {"Latitude": place.geometry.location.lat(), "Longitude": place.geometry.location.lng()};
                    $scope.wayPointsPOI[0]['locationName'] = place.name;

                }

            });
            function setMarker(position) {
                markers.push(position); // add marker to array
                return markers;

            };
        }
    };
});