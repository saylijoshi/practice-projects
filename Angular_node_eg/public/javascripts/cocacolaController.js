angular.module('angularjs_with_Nodejs').controller('cocacolaController', function ($scope, $timeout, $filter, $http) {

    var map,geocoder,radius_circle,places;;
    var infoWindow;
    var markers = []; 
    var indonesiaMarkers = []; 
    var restaurantsMarkers = [];
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
    var cocacolaSupermarketsmarker = [];
    var cocacolaLocalshopsmarker = [];
    var cocacolaBarsmarker = [];
    var cocacolaDrinksmachinesmarker = [];
    var jsonObject;
    var infoWindow,infowindow2,infoWindownRadius,infowindowplacesmarker;
    var directionsDisplayCollection = [],infowindowsCollection = [];
    var directionsDisplay, directionsService;
    $scope.selectedStore = {};
    var restaurantMarkerCluster;
    var airportMarkersCluster,barMarkersCluster,busstationMarkersCluster,cafeMarkersCluster,casinoMarkersCluster,liquorStoreMarkersCluster,nightClubsMarkersCluster,parkMarkersCluster,superMarketMarkersCluster,subwayMarkersCluster,shoppingMallMarkersCluster,MealTakeAwayMarkersCluster,movietheatermarkersCluster;
    var allOption = {"name": "All Stores","latitude":0,"longitude":0};
    $scope.storeNames = [];
    $scope.showStorePlaceTypes = false;
    var heatmap;
    var trafficLayer;
    $scope.countries =
    [
        {"name":"Singapore", "selected":false},
        {"name":"Indonesia", "selected":false}
    ]

    $scope.placetypes = 
    [
        {"name":"Restaurants", "checked":false},
        {"name":"Bar", "checked":false},
        {"name":"Bus Station", "checked":false},
        {"name":"Cafe", "checked":false},
        {"name":"Casino", "checked":false},
        {"name":"Liquor Store", "checked":false},
        {"name":"Night Clubs", "checked":false},
        {"name":"Park", "checked":false},
        {"name":"Super Market", "checked":false},
        {"name":"Subway", "checked":false},
        {"name":"Shopping Mall", "checked":false},
        {"name":"Meal Take Aways", "checked":false},
        {"name":"Movie Theatres", "checked":false},
        {"name":"Airport", "checked":false}
    ]

    $scope.categories = 
    [
        {"name":"Super Markets", "checked":false},
        {"name":"Localshop", "checked":false},
        {"name":"Bars", "checked":false},
        {"name":"Drinks Machines", "checked":false}
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
        {"name":"Pepsi", "checked":false},
        {"name":"F&N", "checked":false},
        {"name":"Schweppes", "checked":false},
        {"name":"Singha soda water", "checked":false}
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

    $scope.productstypes = 
    [
        {"name":"Diet Coke", "checked":false},
        {"name":"Fanta", "checked":false},
        {"name":"Coffee", "checked":false},
        {"name":"Dasani", "checked":false},
        {"name":"Sprite", "checked":false}
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

    //$scope.Country = "Singapore";
    $scope.SelectedCountry = "Singapore";

    


    setTimeout(function ()
    {
        $scope.initMap();
        //$scope.getUserLocation();
        $scope.showAllLocations();

        //ipMiddleware();

        
        
    }, 100);

    var ipMiddleware = function(req, res, next) {
        //var clientIp = requestIp.getClientIp(req); // on localhost > 127.0.0.1
        //console.log("---Client IP--- :", clientIp);

        var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log("---Client IP--- :", ip);
        next();
    };

    // var getIP = require('ipware')().get_ip;
    // app.use(function(req, res, next) {
    //     var ipInfo = getIP(req);
    //     console.log("-------IP-----:",ipInfo);
    //     // { clientIp: '127.0.0.1', clientIpRoutable: false }
    //     next();
    // });

    $scope.initMap = function ()
    {
        map = new google.maps.Map(document.getElementById("mymap"), {
            //center: new google.maps.LatLng(1.328178, 103.845055),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            });
    }

    $scope.initHeatMap = function()
    {
        heatmap = new google.maps.visualization.HeatmapLayer({
            data: $scope.getPoints(),
            map: map
            });
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

    $scope.showCocacolaLocations = function (event,index) 
    {
        $.getJSON('/getcocacolastorelocations', {}, function (data) {

        $scope.clearSingaporeMarker();
        $scope.clearIndonesiaMarker();  
        $scope.storeNames.length = 0;  

        //checking and assiging values got from callback( index and event )
        if(index!= -1)
        $scope.categories[index].checked = event.target.checked;

        for (var i = 0, length = data.length; i < length; i++) 
        {
            var cocacolaStoreData = data[i];
            var typeName = cocacolaStoreData.category;

           for (var j = 0, categoryArraylength = $scope.categories.length; j < categoryArraylength; j++) 
            {

                var selectedCategoryName = $scope.categories[j].name;

                if($scope.categories[j].checked)
                {
                    var selectedCategoryName = $scope.categories[j].name;
                
                    if( selectedCategoryName == "Super Markets" && typeName == "supermarket" )
                    {
                        $scope.storeNames.push(cocacolaStoreData);

                        latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: cocacolaStoreData.name,
                        icon: 'images/cocacola-map-marker-yellow.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'+ "<br/>" + cocacolaStoreData.address + "<br/>" + cocacolaStoreData.contact);
                        infoWindow.open(map, marker);
                        //$scope.clearDirection();
                        dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                        //$scope.showDirections(myLatLng,dirLatLng,storeData );

                        });

                        cocacolaSupermarketsmarker.push(marker);
                        })(marker, cocacolaStoreData);
                    }
                    else if(selectedCategoryName == "Localshop" && typeName == "localshop" )
                    {

                        $scope.storeNames.push(cocacolaStoreData);

                        latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: cocacolaStoreData.name,
                        icon: 'images/cocacola-map-marker-blue.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'+ "<br/>" + cocacolaStoreData.address + "<br/>" + cocacolaStoreData.contact);
                        infoWindow.open(map, marker);
                        //$scope.clearDirection();
                        dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                        //$scope.showDirections(myLatLng,dirLatLng,storeData );

                        });

                        cocacolaLocalshopsmarker.push(marker);
                        })(marker, cocacolaStoreData);
                    }
                    else if(selectedCategoryName == "Bars" && typeName == "bars")
                    {

                        $scope.storeNames.push(cocacolaStoreData);

                        latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: cocacolaStoreData.name,
                        icon: 'images/cocacola-map-marker-red.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'+ "<br/>" + cocacolaStoreData.address + "<br/>" + cocacolaStoreData.contact);
                        infoWindow.open(map, marker);
                        //$scope.clearDirection();
                        dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                        //$scope.showDirections(myLatLng,dirLatLng,storeData );

                        });

                        cocacolaBarsmarker.push(marker);
                        })(marker, cocacolaStoreData);
                    }
                    else if(selectedCategoryName == "Drinks Machines" && typeName == "drinksmachines")
                    {
                        $scope.storeNames.push(cocacolaStoreData);

                        latLng = new google.maps.LatLng(cocacolaStoreData.latitude, cocacolaStoreData.longitude); 
                    
                        map.setCenter({lat:1.328178,lng: 103.845055});
                        map.setZoom(11);
                        map.setMapTypeId('roadmap');
                
                        // Creating a marker and putting it on the map
                        var marker = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: cocacolaStoreData.name,
                        icon: 'images/cocacola-map-marker-green.png',
                        mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                        });

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'+ "<br/>" + cocacolaStoreData.address + "<br/>" + cocacolaStoreData.contact);
                        infoWindow.open(map, marker);
                        //$scope.clearDirection();
                        dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                        //$scope.showDirections(myLatLng,dirLatLng,storeData );

                        });

                        cocacolaDrinksmachinesmarker.push(marker);
                        })(marker, cocacolaStoreData);
                    }
                }
                else
                {
                    var selectedCategoryName = $scope.categories[j].name;
                    if( selectedCategoryName == "Super Markets" && typeName == "supermarket" )
                    {
                        $scope.clearCocacolaSuperMarketsMarkers();
                    }
                    else if(selectedCategoryName == "Localshop" && typeName == "localshop")
                    {
                        $scope.clearCocacolaLocalShopMarkers();
                    }
                    else if(selectedCategoryName == "Bars" && typeName == "bars")
                    {
                        $scope.clearCocacolaBarsMarkers();
                    }
                    else if(selectedCategoryName == "Drinks Machines" && typeName == "drinksmachines")
                    {
                        $scope.clearCocacolaDrinksMachinesMarkers();
                    }
                }
            }  
        }   
        $scope.$apply();
    });
};

    $scope.showAllLocations = function () 
    {
        $.getJSON('/getstorelocations', {}, function (data) {
            
            //console.log("---$scope.SelectedCountry ----:", $scope.SelectedCountry );

            //CLEAR trafficLayer
            //if( trafficLayer.getMap() !=null )
            //trafficLayer.setMap(null);
            
            
            //$scope.storeNames.length = 0;  commented to display , POS related data.
            //$scope.storeNames.push(allOption);
            
            
            $scope.clearCocacolaStoreMarkers();
            for (var i = 0, length = data.length - 1; i < length; i++) 
            { 
                var storeData = data[i];
                
                if ($scope.SelectedCountry == "Singapore" && storeData.country == "Singapore")
                {
                    //$scope.storeNames.push(data[i]);
                    $scope.clearIndonesiaMarker();
                    
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                    
                    map.setCenter({lat:1.328178,lng: 103.845055});
                    map.setZoom(11);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/cocacola-map-marker.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow();
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + storeData.name + '</h3>'+ "<br/>" + storeData.address + "<br/>" + storeData.contact);
                    infoWindow.open(map, marker);
                    //$scope.clearDirection();
                    dirLatLng = { lat : storeData.latitude , lng : storeData.longitude};
                    //$scope.showDirections(myLatLng,dirLatLng,storeData );

                    });

                    markers.push(marker);

                    })(marker, storeData);
                }
                else if ( $scope.SelectedCountry == "Indonesia" && storeData.country == "Indonesia" )
                {
                    //$scope.storeNames.push(data[i]);
                    $scope.clearSingaporeMarker();
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 

                    map.setCenter({lat:2.989762,lng: 107.758269});
                    map.setZoom(5);
                    map.setMapTypeId('roadmap');
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.name,
                    icon: 'images/cocacola-map-marker.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow();
                    (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + storeData.name + '</h3>'+ "<br/>" + storeData.address + "<br/>" + storeData.contact);
                    infoWindow.open(map, marker);
                    //$scope.clearDirection();
                    dirLatLng = { lat : storeData.latitude , lng : storeData.longitude};
                    //$scope.showDirections(myLatLng,dirLatLng,storeData );

                    });

                    indonesiaMarkers.push(marker);

                    })(marker, storeData);
                }
                
            }
            $scope.$apply();
        });
    };

          // Heatmap data: 500 Points
      $scope.getPoints = function() {
        return [
            new google.maps.LatLng(1.3282551, 103.855368),
            new google.maps.LatLng(1.3282745, 103.854586),
            new google.maps.LatLng(1.3282842, 103.853688),
            new google.maps.LatLng(1.3282919, 103.852815),
            new google.maps.LatLng(1.3282992, 103.852112),
            new google.maps.LatLng(1.3283100, 103.851461),
            new google.maps.LatLng(1.3283206, 103.850829),
            new google.maps.LatLng(1.3283273, 103.850324),
            new google.maps.LatLng(1.3283316, 103.850023),
            new google.maps.LatLng(1.3283357, 103.869794),
            new google.maps.LatLng(1.3283371, 103.869687),
            new google.maps.LatLng(1.3283368, 103.869666),
            new google.maps.LatLng(1.3283383, 103.869594),
            new google.maps.LatLng(1.3283508, 103.869525),
            new google.maps.LatLng(1.3283842, 103.869591),
            new google.maps.LatLng(1.3284147, 103.869668),
            new google.maps.LatLng(1.3284206, 103.869686),
            new google.maps.LatLng(1.3284386, 103.869790),
            new google.maps.LatLng(1.3284701, 103.869902),
            new google.maps.LatLng(1.3284965, 103.869938),
            new google.maps.LatLng(1.3285010, 103.869947),
            new google.maps.LatLng(1.3285360, 103.869952),
            new google.maps.LatLng(1.3285715, 103.850030),
            new google.maps.LatLng(1.3286117, 103.850119),
            new google.maps.LatLng(1.3286564, 103.850209),
            new google.maps.LatLng(1.3286905, 103.850270),
            new google.maps.LatLng(1.3286956, 103.850279),
            new google.maps.LatLng(1.3400224, 103.863520),
            new google.maps.LatLng(1.3400155, 103.864101),
            new google.maps.LatLng(1.3400160, 103.864430),
            new google.maps.LatLng(1.3400378, 103.864527),
            new google.maps.LatLng(1.3400738, 103.864598),
            new google.maps.LatLng(1.3400938, 103.864650),
            new google.maps.LatLng(1.3401024, 103.864889),
            new google.maps.LatLng(1.3400955, 103.865392),
            new google.maps.LatLng(1.3400886, 103.865959),
            new google.maps.LatLng(1.3400811, 103.866275),
            new google.maps.LatLng(1.3400788, 103.866299),
            new google.maps.LatLng(1.3400719, 103.866302),
            new google.maps.LatLng(1.3400702, 103.866298),
            new google.maps.LatLng(1.3400661, 103.866273),
            new google.maps.LatLng(1.3400395, 103.866172),
            new google.maps.LatLng(1.3400228, 103.866116),
            new google.maps.LatLng(1.3400169, 103.866130),
            new google.maps.LatLng(1.3400066, 103.866167),
            new google.maps.LatLng(1.3284345, 103.652922),
            new google.maps.LatLng(1.3284389, 103.652926),
            new google.maps.LatLng(1.3284437, 103.652924),
            new google.maps.LatLng(1.3284746, 103.652818),
            new google.maps.LatLng(1.3285436, 103.652959),
            new google.maps.LatLng(1.3286120, 103.653112),
            new google.maps.LatLng(1.3286433, 103.653029),
            new google.maps.LatLng(1.3286631, 103.651213),
            new google.maps.LatLng(1.3286660, 103.651033),
            new google.maps.LatLng(1.3286801, 103.650141),
            new google.maps.LatLng(1.3286823, 103.650034),
            new google.maps.LatLng(1.3286831, 103.789916),
            new google.maps.LatLng(1.3287034, 103.788208),
            new google.maps.LatLng(1.3287056, 103.788034),
            new google.maps.LatLng(1.3287169, 103.787145),
            new google.maps.LatLng(1.3287217, 103.786715),
            new google.maps.LatLng(1.3286144, 103.786403),
            new google.maps.LatLng(1.3285292, 103.786257),
            new google.maps.LatLng(1.3280666, 103.800374),
            new google.maps.LatLng(1.3280501, 103.801281),
            new google.maps.LatLng(1.3280148, 103.802052),
            new google.maps.LatLng(1.3280173, 103.801148),
            new google.maps.LatLng(1.3280693, 103.800592),
            new google.maps.LatLng(1.3281261, 103.801142),
            new google.maps.LatLng(1.3281808, 103.801730),
            new google.maps.LatLng(1.3282340, 103.802341),
            new google.maps.LatLng(1.3282812, 103.803022),
            new google.maps.LatLng(1.3283300, 103.803672),
            new google.maps.LatLng(1.3283809, 103.804275),
            new google.maps.LatLng(1.3284246, 103.804979),
            new google.maps.LatLng(1.3284791, 103.805958),
            new google.maps.LatLng(1.3285675, 103.806746),
            new google.maps.LatLng(1.3286262, 103.805780),
            new google.maps.LatLng(1.3286776, 103.805093),
            new google.maps.LatLng(1.3287282, 103.804426),
            new google.maps.LatLng(1.3287783, 103.803767),
            new google.maps.LatLng(1.3288343, 103.803184),
            new google.maps.LatLng(1.3288895, 103.802506),
            new google.maps.LatLng(1.3289371, 103.801701),
            new google.maps.LatLng(1.3289722, 103.800952),
            new google.maps.LatLng(1.3290315, 103.800305),
            new google.maps.LatLng(1.3290738, 103.808961),
            new google.maps.LatLng(1.349448, 103.868702),
            new google.maps.LatLng(1.349023, 103.868585),
            new google.maps.LatLng(1.348542, 103.868492),
            new google.maps.LatLng(1.348100, 103.868411),
            new google.maps.LatLng(1.347986, 103.868376),
            new google.maps.LatLng(1.347680, 103.868313),
            new google.maps.LatLng(1.347316, 103.868273),
            new google.maps.LatLng(1.347135, 103.868254),
            new google.maps.LatLng(1.346987, 103.868303),
            new google.maps.LatLng(1.346946, 103.868404),
            new google.maps.LatLng(1.346944, 103.868467),
            new google.maps.LatLng(1.346892, 103.868459),
            new google.maps.LatLng(1.346842, 103.868442),
            new google.maps.LatLng(1.346822, 103.868391),
            new google.maps.LatLng(1.346814, 103.868412),
            new google.maps.LatLng(1.346787, 103.868628),
            new google.maps.LatLng(1.346729, 103.868650),
            new google.maps.LatLng(1.346759, 103.868677),
            new google.maps.LatLng(1.346772, 103.868498),
            new google.maps.LatLng(1.346787, 103.868389),
            new google.maps.LatLng(1.346848, 103.868283),
            new google.maps.LatLng(1.346870, 103.868239),
            new google.maps.LatLng(1.347015, 103.868198),
            new google.maps.LatLng(1.347333, 103.868256),
            new google.maps.LatLng(1.347595, 103.868308),
            new google.maps.LatLng(1.347797, 103.868344),
            new google.maps.LatLng(1.348160, 103.868442),
            new google.maps.LatLng(1.348414, 103.868508),
            new google.maps.LatLng(1.348445, 103.868516),
            new google.maps.LatLng(1.348503, 103.868529),
            new google.maps.LatLng(1.348607, 103.868549),
            new google.maps.LatLng(1.348670, 103.868644),
            new google.maps.LatLng(1.348847, 103.868706),
            new google.maps.LatLng(1.349240, 103.868744),
            new google.maps.LatLng(1.349738, 103.868822),
            new google.maps.LatLng(1.3976809, 103.780836),
          new google.maps.LatLng(1.3976240, 103.781514),
          new google.maps.LatLng(1.3975725, 103.782145),
          new google.maps.LatLng(1.3975190, 103.782805),
          new google.maps.LatLng(1.3974672, 103.783464),
          new google.maps.LatLng(1.3974084, 103.784186),
          new google.maps.LatLng(1.3973533, 103.783636),
          new google.maps.LatLng(1.3973021, 103.783009),
          new google.maps.LatLng(1.3972501, 103.782371),
          new google.maps.LatLng(1.3971964, 103.781681),
          new google.maps.LatLng(1.3971479, 103.781078),
          new google.maps.LatLng(1.3970992, 103.780477),
          new google.maps.LatLng(1.3970467, 103.769801),
          new google.maps.LatLng(1.3970090, 103.768904),
          new google.maps.LatLng(1.3969657, 103.768103),
          new google.maps.LatLng(1.3969132, 103.767276),
          new google.maps.LatLng(1.3968564, 103.766469),
          new google.maps.LatLng(1.3967980, 103.765745),
          new google.maps.LatLng(1.3967380, 103.765299),
          new google.maps.LatLng(1.3966604, 103.765297),
          new google.maps.LatLng(1.3965838, 103.765200),
          new google.maps.LatLng(1.3965139, 103.765139),
          new google.maps.LatLng(1.3964457, 103.765094),
          new google.maps.LatLng(1.3963716, 103.765142),
          new google.maps.LatLng(1.3962932, 103.765398),
          new google.maps.LatLng(1.3962126, 103.765813),
          new google.maps.LatLng(1.3961344, 103.766215),
          new google.maps.LatLng(1.3960556, 103.766495),
          new google.maps.LatLng(1.3959732, 103.766484),
          new google.maps.LatLng(1.3958910, 103.766228),
          new google.maps.LatLng(1.3958182, 103.765695),
          new google.maps.LatLng(1.3957676, 103.765118),
          new google.maps.LatLng(1.3957039, 103.764346),
          new google.maps.LatLng(1.3956335, 103.763719),
          new google.maps.LatLng(1.3955503, 103.763406),
          new google.maps.LatLng(1.3954665, 103.763242),
          new google.maps.LatLng(1.3953837, 103.763172),
            new google.maps.LatLng(1.3280201, 103.868882),
            new google.maps.LatLng(1.3280400, 103.868905),
            new google.maps.LatLng(1.3280501, 103.868921),
            new google.maps.LatLng(1.3280892, 103.868986),
            new google.maps.LatLng(1.3281446, 103.869087),
            new google.maps.LatLng(1.3281985, 103.869199),
            new google.maps.LatLng(1.3282239, 103.869249),
            new google.maps.LatLng(1.3282286, 103.869266),
            new google.maps.LatLng(1.3297847, 103.659388),
            new google.maps.LatLng(1.3297874, 103.659180),
            new google.maps.LatLng(1.3297885, 103.659069),
            new google.maps.LatLng(1.3297887, 103.659050),
            new google.maps.LatLng(1.3297933, 103.658954),
            new google.maps.LatLng(1.3298242, 103.658990),
            new google.maps.LatLng(1.3298617, 103.659075),
            new google.maps.LatLng(1.3298719, 103.659092),
            new google.maps.LatLng(1.3298944, 103.659145),
            new google.maps.LatLng(1.3299320, 103.659251),
            new google.maps.LatLng(1.3299590, 103.659309),
            new google.maps.LatLng(1.3299677, 103.659324),
            new google.maps.LatLng(1.3299966, 103.659360),
            new google.maps.LatLng(1.3400288, 103.659430),
            new google.maps.LatLng(1.3400443, 103.659461),
            new google.maps.LatLng(1.3400465, 103.659474),
            new google.maps.LatLng(1.3400644, 103.659540),
            new google.maps.LatLng(1.3400948, 103.659620),
            new google.maps.LatLng(1.3401242, 103.659685),
            new google.maps.LatLng(1.3401375, 103.659702),
            new google.maps.LatLng(1.3401400, 103.659703),
            new google.maps.LatLng(1.3401453, 103.659707),
            new google.maps.LatLng(1.3401473, 103.659709),
            new google.maps.LatLng(1.3401532, 103.659707),
            new google.maps.LatLng(1.3401852, 103.659729),
            new google.maps.LatLng(1.3402173, 103.659789),
            new google.maps.LatLng(1.3402459, 103.659847),
            new google.maps.LatLng(1.3402554, 103.659825),
            new google.maps.LatLng(1.3402647, 103.659549),
            new google.maps.LatLng(1.3402693, 103.659179),
            new google.maps.LatLng(1.3402729, 103.658751),
            new google.maps.LatLng(1.3266104, 104.609291),
            new google.maps.LatLng(1.3266103, 104.609268),
            new google.maps.LatLng(1.3266138, 104.609229),
            new google.maps.LatLng(1.3266183, 104.609231),
            new google.maps.LatLng(1.3266153, 104.609276),
            new google.maps.LatLng(1.3266005, 104.609365),
            new google.maps.LatLng(1.3265897, 104.609570),
            new google.maps.LatLng(1.3265767, 104.609739),
            new google.maps.LatLng(1.3265693, 103.780389),
            new google.maps.LatLng(1.3265615, 103.781201),
            new google.maps.LatLng(1.3265533, 103.782121),
            new google.maps.LatLng(1.3265467, 103.782939),
            new google.maps.LatLng(1.3265444, 103.784821),
            new google.maps.LatLng(1.3265444, 103.784964),
            new google.maps.LatLng(1.3265318, 103.785424),
            new google.maps.LatLng(1.3263961, 103.785296),
            new google.maps.LatLng(1.3263115, 103.785196),
            new google.maps.LatLng(1.3262967, 103.785183),
            new google.maps.LatLng(1.3262278, 103.785127),
            new google.maps.LatLng(1.3261675, 103.785055),
            new google.maps.LatLng(1.3260932, 103.784988),
            new google.maps.LatLng(1.3259337, 103.784862),
            new google.maps.LatLng(1.343187, 103.651922),
            new google.maps.LatLng(1.343043, 103.652118),
            new google.maps.LatLng(1.343007, 103.652165),
            new google.maps.LatLng(1.342979, 103.652219),
            new google.maps.LatLng(1.342865, 103.652394),
            new google.maps.LatLng(1.342779, 103.652503),
            new google.maps.LatLng(1.342676, 103.652701),
            new google.maps.LatLng(1.342606, 103.652806),
            new google.maps.LatLng(1.342566, 103.652840),
            new google.maps.LatLng(1.342508, 103.652852),
            new google.maps.LatLng(1.342387, 103.653011),
            new google.maps.LatLng(1.342099, 103.653328),
            new google.maps.LatLng(1.341704, 103.653783),
            new google.maps.LatLng(1.341481, 103.654081),
            new google.maps.LatLng(1.341400, 103.654179),
            new google.maps.LatLng(1.341352, 103.654220),
            new google.maps.LatLng(1.341248, 103.654327),
            new google.maps.LatLng(1.340904, 103.654781),
            new google.maps.LatLng(1.340520, 103.655283),
            new google.maps.LatLng(1.340337, 103.655553),
            new google.maps.LatLng(1.340128, 103.655832),
            new google.maps.LatLng(1.3269756, 103.656331),
            new google.maps.LatLng(1.3269300, 103.656902),
            new google.maps.LatLng(1.3269132, 103.657065),
            new google.maps.LatLng(1.3269092, 103.657103),
            new google.maps.LatLng(1.3268979, 103.657172),
            new google.maps.LatLng(1.3268595, 103.657634),
            new google.maps.LatLng(1.3268372, 103.657913),
            new google.maps.LatLng(1.3268337, 103.657961),
            new google.maps.LatLng(1.3268244, 103.658138),
            new google.maps.LatLng(1.3267942, 103.658581),
            new google.maps.LatLng(1.3267482, 103.659094),
            new google.maps.LatLng(1.3267031, 103.659606),
            new google.maps.LatLng(1.3266732, 103.659986),
            new google.maps.LatLng(1.3266680, 103.860058),
            new google.maps.LatLng(1.3266633, 103.860109),
            new google.maps.LatLng(1.3266580, 103.860211),
            new google.maps.LatLng(1.3266367, 103.860594),
            new google.maps.LatLng(1.3265910, 103.861137),
            new google.maps.LatLng(1.3265353, 103.861806),
            new google.maps.LatLng(1.3264962, 103.862298),
            new google.maps.LatLng(1.3264868, 103.862486),
            new google.maps.LatLng(1.3264518, 103.862913),
            new google.maps.LatLng(1.3263435, 103.864173),
            new google.maps.LatLng(1.3262847, 103.864953),
            new google.maps.LatLng(1.3262291, 103.865935),
            new google.maps.LatLng(1.3262224, 103.866074),
            new google.maps.LatLng(1.3261957, 103.866892),
            new google.maps.LatLng(1.3261652, 103.868886),
            new google.maps.LatLng(1.3261284, 103.869955),
            new google.maps.LatLng(1.3261210, 103.850068),
            new google.maps.LatLng(1.3261064, 103.850720),
            new google.maps.LatLng(1.3261040, 103.851411),
            new google.maps.LatLng(1.3261048, 103.852324),
            new google.maps.LatLng(1.3260851, 103.853118),
            new google.maps.LatLng(1.3259977, 103.854591),
            new google.maps.LatLng(1.3259913, 103.854698),
            new google.maps.LatLng(1.3259623, 103.855065),
            new google.maps.LatLng(1.3258902, 103.855158),
            new google.maps.LatLng(1.3258428, 103.854570),
            new google.maps.LatLng(1.3257687, 103.853340),
            new google.maps.LatLng(1.3257583, 103.853240),
            new google.maps.LatLng(1.3257019, 103.852787),
            new google.maps.LatLng(1.3256603, 103.852322),
            new google.maps.LatLng(1.3256380, 103.851602),
            new google.maps.LatLng(1.3255790, 103.851382),
            new google.maps.LatLng(1.3254493, 103.852133),
            new google.maps.LatLng(1.3254361, 103.852206),
            new google.maps.LatLng(1.3253719, 103.852650),
            new google.maps.LatLng(1.3253096, 103.852915),
            new google.maps.LatLng(1.3251617, 103.853211),
            new google.maps.LatLng(1.3251496, 103.853246),
            new google.maps.LatLng(1.3250733, 103.853428),
            new google.maps.LatLng(1.3250126, 103.853536),
            new google.maps.LatLng(1.3250103, 103.853784),
            new google.maps.LatLng(1.3250390, 103.854010),
            new google.maps.LatLng(1.3250448, 103.854013),
            new google.maps.LatLng(1.3250536, 103.854040),
            new google.maps.LatLng(1.3250493, 103.854141),
            new google.maps.LatLng(1.3290859, 104.602808),
            new google.maps.LatLng(1.3290864, 104.602768),
            new google.maps.LatLng(1.3290995, 104.602539),
            new google.maps.LatLng(1.3291148, 104.602172),
            new google.maps.LatLng(1.3291385, 104.601312),
            new google.maps.LatLng(1.3291405, 104.600776),
            new google.maps.LatLng(1.3291288, 104.600528),
            new google.maps.LatLng(1.3291113, 104.600441),
            new google.maps.LatLng(1.3291027, 104.600395),
            new google.maps.LatLng(1.3291094, 104.600311),
            new google.maps.LatLng(1.3291211, 104.600183),
            new google.maps.LatLng(1.3291060, 103.809334),
            new google.maps.LatLng(1.3290538, 103.808718),
            new google.maps.LatLng(1.3290095, 103.808086),
            new google.maps.LatLng(1.3289644, 103.807360),
            new google.maps.LatLng(1.3289254, 103.806844),
            new google.maps.LatLng(1.3288855, 103.806397),
            new google.maps.LatLng(1.3288483, 103.805963),
            new google.maps.LatLng(1.3288015, 103.805365),
            new google.maps.LatLng(1.3287558, 103.804735),
            new google.maps.LatLng(1.3287472, 103.804323),
            new google.maps.LatLng(1.3287630, 103.804025),
            new google.maps.LatLng(1.3287767, 103.803987),
            new google.maps.LatLng(1.3287486, 103.804452),
            new google.maps.LatLng(1.3286977, 103.805043),
            new google.maps.LatLng(1.3286583, 103.805552),
            new google.maps.LatLng(1.3286540, 103.805610),
            new google.maps.LatLng(1.3286516, 103.805659),
            new google.maps.LatLng(1.3286378, 103.805707),
            new google.maps.LatLng(1.3286044, 103.805362),
            new google.maps.LatLng(1.3285598, 103.804715),
            new google.maps.LatLng(1.3285321, 103.804361),
            new google.maps.LatLng(1.3285207, 103.804236),
            new google.maps.LatLng(1.3285751, 103.804062),
            new google.maps.LatLng(1.3285996, 103.803881),
            new google.maps.LatLng(1.3286092, 103.803830),
            new google.maps.LatLng(1.3285998, 103.803899),
            new google.maps.LatLng(1.3285114, 103.804365),
            new google.maps.LatLng(1.3285022, 103.804441),
            new google.maps.LatLng(1.3284823, 103.804635),
            new google.maps.LatLng(1.3284719, 103.804629),
            new google.maps.LatLng(1.3285069, 103.804176),
            new google.maps.LatLng(1.3285500, 103.803650),
            new google.maps.LatLng(1.3285770, 103.803291),
            new google.maps.LatLng(1.3285839, 103.803159),
            new google.maps.LatLng(1.3282651, 104.600628),
            new google.maps.LatLng(1.3282616, 104.600599),
            new google.maps.LatLng(1.3282702, 104.600470),
            new google.maps.LatLng(1.3282915, 104.600192),
            new google.maps.LatLng(1.3283137, 103.809887),
            new google.maps.LatLng(1.3283414, 103.809519),
            new google.maps.LatLng(1.3283629, 103.809237),
            new google.maps.LatLng(1.3283688, 103.809157),
            new google.maps.LatLng(1.3283716, 103.809106),
            new google.maps.LatLng(1.3283798, 103.809072),
            new google.maps.LatLng(1.3283997, 103.809186),
            new google.maps.LatLng(1.3284271, 103.809538),
            new google.maps.LatLng(1.3284577, 103.809948),
            new google.maps.LatLng(1.3284828, 104.600260),
            new google.maps.LatLng(1.3284999, 104.600477),
            new google.maps.LatLng(1.3285113, 104.600651),
            new google.maps.LatLng(1.3285155, 104.600703),
            new google.maps.LatLng(1.3285192, 104.600749),
            new google.maps.LatLng(1.3285278, 104.600839),
            new google.maps.LatLng(1.3285387, 104.600857),
            new google.maps.LatLng(1.3285478, 104.600890),
            new google.maps.LatLng(1.3285526, 104.601022),
            new google.maps.LatLng(1.3285598, 104.601148),
            new google.maps.LatLng(1.3285631, 104.601202),
            new google.maps.LatLng(1.3285660, 104.601267),
            new google.maps.LatLng(1.3403986, 103.656035),
            new google.maps.LatLng(1.3404102, 103.655089),
            new google.maps.LatLng(1.3404211, 103.654156),
            new google.maps.LatLng(1.3403861, 103.653385),
            new google.maps.LatLng(1.3403151, 103.653214),
            new google.maps.LatLng(1.3402439, 103.653077),
            new google.maps.LatLng(1.3401740, 103.652905),
            new google.maps.LatLng(1.3401069, 103.652785),
            new google.maps.LatLng(1.3400345, 103.652649),
            new google.maps.LatLng(1.3299633, 103.652603),
            new google.maps.LatLng(1.3299750, 103.651700),
            new google.maps.LatLng(1.3299885, 103.650854),
            new google.maps.LatLng(1.3299209, 103.650607),
            new google.maps.LatLng(1.3295656, 104.600395),
            new google.maps.LatLng(1.3295203, 104.600304),
            new google.maps.LatLng(1.348738, 103.785584),
            new google.maps.LatLng(1.348812, 103.785189),
            new google.maps.LatLng(1.348824, 103.785092),
            new google.maps.LatLng(1.348833, 103.784932),
            new google.maps.LatLng(1.348834, 103.784898),
            new google.maps.LatLng(1.348740, 103.784757),
            new google.maps.LatLng(1.348501, 103.784433),
            new google.maps.LatLng(1.348182, 103.784026),
            new google.maps.LatLng(1.347851, 103.783623),
            new google.maps.LatLng(1.347486, 103.783166),
            new google.maps.LatLng(1.347109, 103.782674),
            new google.maps.LatLng(1.346743, 103.782186),
            new google.maps.LatLng(1.346440, 103.781800),
            new google.maps.LatLng(1.346295, 103.781614),
            new google.maps.LatLng(1.346158, 103.781440),
            new google.maps.LatLng(1.345806, 103.780997),
            new google.maps.LatLng(1.345422, 103.780484),
            new google.maps.LatLng(1.345126, 103.780087),
            new google.maps.LatLng(1.345012, 104.609854),
            new google.maps.LatLng(1.345164, 104.609573),
            new google.maps.LatLng(1.345498, 104.609180),
            new google.maps.LatLng(1.345868, 104.608730),
            new google.maps.LatLng(1.346256, 104.608240),
            new google.maps.LatLng(1.346519, 104.607928),
            new google.maps.LatLng(1.346539, 104.607904),
            new google.maps.LatLng(1.346595, 104.607854),
            new google.maps.LatLng(1.346853, 104.607547),
            new google.maps.LatLng(1.347234, 104.607087),
            new google.maps.LatLng(1.347644, 104.606558),
            new google.maps.LatLng(1.348066, 104.606017),
            new google.maps.LatLng(1.348468, 104.605499),
            new google.maps.LatLng(1.348866, 104.604995),
            new google.maps.LatLng(1.349295, 104.604455),
            new google.maps.LatLng(1.349695, 104.603950),
            new google.maps.LatLng(1.3265802, 104.607755),
            new google.maps.LatLng(1.3265791, 104.608219),
            new google.maps.LatLng(1.3265763, 104.608759),
            new google.maps.LatLng(1.3265726, 104.609348),
            new google.maps.LatLng(1.3265716, 104.609882),
            new google.maps.LatLng(1.3265708, 103.780202),
            new google.maps.LatLng(1.3265705, 103.780253),
            new google.maps.LatLng(1.3265707, 103.780369),
            new google.maps.LatLng(1.3265692, 103.780720),
            new google.maps.LatLng(1.3265699, 103.781215),
            new google.maps.LatLng(1.3265687, 103.781789),
            new google.maps.LatLng(1.3265666, 103.782373),
            new google.maps.LatLng(1.3265598, 103.782883),
            new google.maps.LatLng(1.3265543, 103.783039),
            new google.maps.LatLng(1.3265532, 103.783125),
            new google.maps.LatLng(1.3265500, 103.783553),
            new google.maps.LatLng(1.3265448, 103.784053),
            new google.maps.LatLng(1.3265388, 103.784645),
            new google.maps.LatLng(1.3265323, 103.785250),
            new google.maps.LatLng(1.3265303, 103.785847),
            new google.maps.LatLng(1.3265251, 103.786439),
            new google.maps.LatLng(1.3265204, 103.787020),
            new google.maps.LatLng(1.3265172, 103.787556),
            new google.maps.LatLng(1.3265164, 103.788075),
            new google.maps.LatLng(1.3265153, 103.788618),
            new google.maps.LatLng(1.3265136, 103.789112),
            new google.maps.LatLng(1.3265129, 103.789378),
            new google.maps.LatLng(1.3265119, 103.789481),
            new google.maps.LatLng(1.3265100, 103.789852),
            new google.maps.LatLng(1.3265083, 103.650349),
            new google.maps.LatLng(1.3265045, 103.650930),
            new google.maps.LatLng(1.3264992, 103.651481),
            new google.maps.LatLng(1.3264980, 103.651695),
            new google.maps.LatLng(1.3264993, 103.651843),
            new google.maps.LatLng(1.3264986, 103.652255),
            new google.maps.LatLng(1.3264975, 103.652823),
            new google.maps.LatLng(1.3264939, 103.653411),
            new google.maps.LatLng(1.3264902, 103.654014),
            new google.maps.LatLng(1.3264853, 103.654576),
            new google.maps.LatLng(1.3264826, 103.654922),
            new google.maps.LatLng(1.3264796, 103.655375),
            new google.maps.LatLng(1.3264782, 103.655869),
            new google.maps.LatLng(1.3264768, 103.656089),
            new google.maps.LatLng(1.3264766, 103.656117),
            new google.maps.LatLng(1.3264723, 103.656276),
            new google.maps.LatLng(1.3264681, 103.656649),
            new google.maps.LatLng(1.3282012, 104.604200),
            new google.maps.LatLng(1.3281574, 104.604911),
            new google.maps.LatLng(1.3281055, 104.605597),
            new google.maps.LatLng(1.3280479, 104.606341),
            new google.maps.LatLng(1.349996, 104.606939),
            new google.maps.LatLng(1.349459, 104.607613),
            new google.maps.LatLng(1.348953, 104.608228),
            new google.maps.LatLng(1.348409, 104.608839),
            new google.maps.LatLng(1.347842, 104.609501),
            new google.maps.LatLng(1.347334, 103.780181),
            new google.maps.LatLng(1.346809, 103.780836),
            new google.maps.LatLng(1.346240, 103.781514),
            new google.maps.LatLng(1.345725, 103.782145),
            new google.maps.LatLng(1.345190, 103.782805),
            new google.maps.LatLng(1.344672, 103.783464),
            new google.maps.LatLng(1.344084, 103.784186),
            new google.maps.LatLng(1.343533, 103.783636),
            new google.maps.LatLng(1.343021, 103.783009),
            new google.maps.LatLng(1.342501, 103.782371),
            new google.maps.LatLng(1.341964, 103.781681),
            new google.maps.LatLng(1.341479, 103.781078),
            new google.maps.LatLng(1.340992, 103.780477),
            new google.maps.LatLng(1.340467, 104.609801),
            new google.maps.LatLng(1.340090, 104.608904),
            new google.maps.LatLng(1.3269657, 104.608103),
            new google.maps.LatLng(1.3269132, 104.607276),
            new google.maps.LatLng(1.3268564, 104.606469),
            new google.maps.LatLng(1.3267980, 104.605745),
            new google.maps.LatLng(1.3267380, 104.605299),
            new google.maps.LatLng(1.3266604, 104.605297),
            new google.maps.LatLng(1.3265838, 104.605200),
            new google.maps.LatLng(1.3265139, 104.605139),
            new google.maps.LatLng(1.3264457, 104.605094),
            new google.maps.LatLng(1.3263716, 104.605142),
            new google.maps.LatLng(1.3262932, 104.605398),
            new google.maps.LatLng(1.3262126, 104.605813),
            new google.maps.LatLng(1.3261344, 104.606215),
            new google.maps.LatLng(1.3260556, 104.606495),
            new google.maps.LatLng(1.3259732, 104.606484),
            new google.maps.LatLng(1.3258910, 104.606228),
            new google.maps.LatLng(1.3258182, 104.605695),
            new google.maps.LatLng(1.3266604, 104.605297),
            new google.maps.LatLng(1.3265838, 104.605200),
            new google.maps.LatLng(1.3265139, 104.605139),
            new google.maps.LatLng(1.3264457, 104.605094),
            new google.maps.LatLng(1.3263716, 104.605142),
            new google.maps.LatLng(1.3262932, 104.605398),
            new google.maps.LatLng(1.3262126, 104.605813),
            new google.maps.LatLng(1.3261344, 104.606215),
            new google.maps.LatLng(1.3260556, 104.606495),
            new google.maps.LatLng(1.3259732, 104.606484),
            new google.maps.LatLng(1.3258910, 104.606228),
            new google.maps.LatLng(1.3258182, 104.605695),
            new google.maps.LatLng(1.3257676, 104.605118),
            new google.maps.LatLng(1.3257039, 104.604346),
            new google.maps.LatLng(1.3256335, 104.603719),
            new google.maps.LatLng(1.3255503, 104.603406),
            new google.maps.LatLng(1.3254665, 104.603242),
            new google.maps.LatLng(1.3253837, 104.603172),
            new google.maps.LatLng(1.3252986, 104.603112),
            new google.maps.LatLng(1.3251266, 104.603355)
          ];
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

    $scope.clearSingaporeMarker = function()
    {
        for (var key in markers) 
        {
            markers[key].setMap(null);
        };
    };

    $scope.clearIndonesiaMarker = function()
    {
        for (var key in indonesiaMarkers) 
        {
            indonesiaMarkers[key].setMap(null);
        };
    };

    $scope.clearAllPlacesMarkers = function()
    {
        $scope.clearRestaurantsMarker();
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

    $scope.clearRestaurantsMarker = function()
    {
        for (var key in restaurantsMarkers) 
        {
            restaurantsMarkers[key].setMap(null);
        };
        //restaurantsMarkers.length = 0;

        //if (restaurantMarkerCluster!=null)
        //restaurantMarkerCluster.clearMarkers();
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

    $scope.clearCocacolaStoreMarkers = function()
    {
        $scope.clearCocacolaSuperMarketsMarkers();
        $scope.clearCocacolaLocalShopMarkers();
        $scope.clearCocacolaBarsMarkers();
        $scope.clearCocacolaDrinksMachinesMarkers();
    }

    $scope.clearCocacolaSuperMarketsMarkers = function()
    {
        for (var key in cocacolaSupermarketsmarker) 
        {
            cocacolaSupermarketsmarker[key].setMap(null);
        };
    };

    $scope.clearCocacolaLocalShopMarkers = function()
    {
        for (var key in cocacolaLocalshopsmarker) 
        {
            cocacolaLocalshopsmarker[key].setMap(null);
        };
    };

    $scope.clearCocacolaBarsMarkers = function()
    {
        for (var key in cocacolaBarsmarker) 
        {
            cocacolaBarsmarker[key].setMap(null);
        };
    };

    $scope.clearCocacolaDrinksMachinesMarkers = function()
    {
        for (var key in cocacolaDrinksmachinesmarker) 
        {
            cocacolaDrinksmachinesmarker[key].setMap(null);
        };
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
       
        // restaurantMarkerCluster = new MarkerClusterer(map, restaurantsMarkers,
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


    $scope.RadioChange = function () {
 
        $scope.selectedStore = {};//TO remove selected store, if user clicked places types without selecting store then it was ppulationg on last store.
        //$scope.SelectedCountry = s;
        $scope.clearAllPlacesMarkers();
        $scope.showAllLocations();
        for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
        {
            $scope.placetypes[i].checked = false;
        }
        
    };

    $scope.getMarketingData = function(event,index){
        
        //clear all the markers and checked categories
        $scope.clearAllPlacesMarkers();
        $scope.clearCocacolaStoreMarkers();
        $scope.clearSingaporeMarker();
        $scope.clearIndonesiaMarker();
        for (var i = 0, length = $scope.categories.length; i < length; i++) 
        {
            $scope.categories[i].checked = false;
        }

        //trafficLayer.setMap(null);


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

    $scope.getData = function(event, index) 
    {
        var jsonObject = JSON.parse($scope.selectedStore);

        $scope.clearAllPlacesMarkers();
        $scope.clearCocacolaStoreMarkers();
        $scope.clearSingaporeMarker();
        $scope.clearIndonesiaMarker();
        
        if (jsonObject.category == "supermarket")
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
            icon: 'images/cocacola-map-marker-yellow.png',
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

            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            infoWindow = new google.maps.InfoWindow();
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
            infoWindow.open(map, marker);

            });

            markers.push(marker);

            })(marker, jsonObject);
        }
        else if (jsonObject.category == "localshop")
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
            icon: 'images/cocacola-map-marker-blue.png',
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

            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            infoWindow = new google.maps.InfoWindow();
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
            infoWindow.open(map, marker);

            });

            markers.push(marker);

            })(marker, jsonObject);
        }
        if (jsonObject.category == "bars")
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
            icon: 'images/cocacola-map-marker-red.png',
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

            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            infoWindow = new google.maps.InfoWindow();
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
            infoWindow.open(map, marker);

            });

            markers.push(marker);

            })(marker, jsonObject);
        }
        if (jsonObject.category == "drinksmachines")
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
            icon: 'images/cocacola-map-marker-green.png',
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

            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            infoWindow = new google.maps.InfoWindow();
            (function(marker, storeData) {

            // Attaching a click event to the current marker
            google.maps.event.addListener(marker, "click", function(e) {
            infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
            infoWindow.open(map, marker);

            });

            markers.push(marker);

            })(marker, jsonObject);
        }


        // if( jsonObject.name == "All Stores" )
        // {
        //     $scope.showStorePlaceTypes = true;
        //     $scope.clearAllPlacesMarkers();
        //     $scope.showAllLocations();
        // }
        // else if ($scope.SelectedCountry == "Singapore" && jsonObject.country == "Singapore")
        // {

        //     $scope.showStorePlaceTypes = true;
        //     $scope.clearSingaporeMarker();
        //     latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
        //     bounds  = new google.maps.LatLngBounds();
        //     bounds.extend(latLng);
    
        //     // Creating a marker and putting it on the map
        //     var marker = new google.maps.Marker({
        //     position: latLng,
        //     map: map,
        //     title: jsonObject.name,
        //     icon: 'images/cocacola-map-marker.png',
        //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //     });

        //     /*var GLOBE_WIDTH = 256; // a constant in Google's map projection
        //     var west = sw.lng();
        //     var east = ne.lng();
        //     var angle = east - west;
        //     if (angle < 0) {
        //     angle += 360;
        //     }
        //     var zoom = Math.round(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);*/

        //     map.fitBounds(bounds);      
        //     map.panToBounds(bounds); 

        //     if(map.getZoom()> 14)
        //     {
        //         map.setZoom(14);
        //     }

        //     var trafficLayer = new google.maps.TrafficLayer();
        //     trafficLayer.setMap(map);

        //     infoWindow = new google.maps.InfoWindow();
        //     (function(marker, storeData) {

        //     // Attaching a click event to the current marker
        //     google.maps.event.addListener(marker, "click", function(e) {
        //     infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
        //     infoWindow.open(map, marker);

        //     });

        //     markers.push(marker);

        //     })(marker, jsonObject);
            
        // }
        // else if ($scope.SelectedCountry == "Indonesia" && jsonObject.country == "Indonesia")
        // {
        //     $scope.showStorePlaceTypes = true;
        //     $scope.clearIndonesiaMarker();
        //     latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            
        //     //map.setCenter({lat:2.989762,lng: 107.758269});
        //     //map.setZoom(5);

        //     bounds  = new google.maps.LatLngBounds();
        //     //loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        //     bounds.extend(latLng);
    
        //     // Creating a marker and putting it on the map
        //     var marker = new google.maps.Marker({
        //     position: latLng,
        //     map: map,
        //     title: jsonObject.name,
        //     icon: 'images/cocacola-map-marker.png',
        //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
        //     });

        //     map.fitBounds(bounds);      
        //     map.panToBounds(bounds); 

        //     if(map.getZoom()> 14)
        //     {
        //         map.setZoom(14);
        //     }

        //     var trafficLayer = new google.maps.TrafficLayer();
        //     trafficLayer.setMap(map);

        //     infoWindow = new google.maps.InfoWindow();
        //     (function(marker, storeData) {

        //     // Attaching a click event to the current marker
        //     google.maps.event.addListener(marker, "click", function(e) {
        //     infoWindow.setContent('<h3>' + jsonObject.name + '</h3>'+ "<br/>" + jsonObject.address + "<br/>" + jsonObject.contact);
        //     infoWindow.open(map, marker);

        //     });

        //     indonesiaMarkers.push(marker);

        //     })(marker, jsonObject);

        // }


        var storeLatLng = { lat : jsonObject.latitude , lng : jsonObject.longitude};

        //checking and assiging values got from callback( index nad event )
        if(index!= -1)
            $scope.placetypes[index].checked = event.target.checked;
        
        for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
        {
            if($scope.placetypes[i].checked)
            {
                var typeName = $scope.placetypes[i].name;
                if( typeName == "Restaurants" )
                {
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'SG'},
                        type : [ 'restaurant']
                    },$scope.restaurantCallback);
                }
                else if(typeName == "Airport")
                {
                    var service1 = new google.maps.places.PlacesService(map);
                    service1.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'SG'},
                        type : [ 'airport']
                    }, $scope.airportCallback);   
                }
                else if(typeName == "Bar")
                {
                    var service2 = new google.maps.places.PlacesService(map);
                            service2.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'bar']
                            }, $scope.barCallback);   
                }
                else if(typeName == "Bus Station")
                {
                    var service3 = new google.maps.places.PlacesService(map);
                            service3.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'bus_station']
                            }, $scope.busStationCallback);
                }
                else if(typeName == "Cafe")
                {
                    var service4 = new google.maps.places.PlacesService(map);
                            service4.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'cafe']
                            }, $scope.cafeCallback);
                }
                else if(typeName == "Casino")
                {
                    var service5 = new google.maps.places.PlacesService(map);
                            service5.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'casino']
                            }, $scope.casinoCallback);
                }
                else if(typeName == "Liquor Store")
                {
                    var service6 = new google.maps.places.PlacesService(map);
                            service6.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'liquor_store']
                            }, $scope.liquorStoreCallback);
                }
                else if(typeName == "Night Clubs")
                {
                    var service9 = new google.maps.places.PlacesService(map);
                            service9.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'night_club']
                            }, $scope.nightClubCallback);
                }
                else if(typeName == "Park")
                {
                    var service10 = new google.maps.places.PlacesService(map);
                            service10.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'park']
                            }, $scope.parkCallback);
                }
                else if(typeName == "Super Market")
                {
                    var service11 = new google.maps.places.PlacesService(map);
                            service11.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'supermarket']
                            }, $scope.supermarketCallback);
                }
                else if(typeName == "Subway")
                {   
                    var service12 = new google.maps.places.PlacesService(map);
                            service12.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'subway_station']
                            }, $scope.subwayCallback);
                }
                else if(typeName == "Shopping Mall")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'shopping_mall']
                            }, $scope.shoppingmallCallback);
                }
                else if(typeName == "Meal Take Aways")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'SG'},
                                type : [ 'meal_takeway']
                            }, $scope.mealTakeawayCallback);
                }
                else if(typeName == "Movie Theaters")
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
                if( typeName == "Restaurants" )
                {
                    $scope.clearRestaurantsMarker();
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
});
