angular.module('angularjs_with_Nodejs').controller('biController', function ($scope, $timeout, $filter, $http) {

    var map,geocoder,radius_circle,places;;
    var infoWindow;
    var markers = []; 
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

    $scope.countries =
    [
        {"name":"India", "selected":false}
    ]

    $scope.cities =
    [
        {"name":"Delhi", "selected":false},
        {"name":"Mumbai", "selected":false},
        {"name":"Bengaluru", "selected":false},
        {"name":"Kolkata", "selected":false},
        {"name":"Chennai", "selected":false},
        {"name":"Indore", "selected":false},
        {"name":"Ahmedabad", "selected":false},
        {"name":"Pune", "selected":false}
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
        {"name":"Restaurants", "checked":false},
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

    $scope.SelectedCountry = "Singapore";

    setTimeout(function ()
    {
        $scope.initMap();
       // $scope.showAllLocations();
    }, 100);

    $scope.initMap = function ()
    {
        map = new google.maps.Map(document.getElementById("mymap"), {
            center: new google.maps.LatLng(23.492690, 78.680398),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            });

        trafficLayer = new google.maps.TrafficLayer();
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

    $scope.showCatergorisedLocations = function (event,index) 
    {
        $.getJSON('/getBIData', {}, function (data) {

        $scope.clearIndiaMarkers();
        $scope.storeNames.length = 0;  

        //checking and assiging values got from callback( index and event )
        if(index!= -1)
        $scope.categories[index].checked = event.target.checked;


        //Set Center - When user returns from store details, need to set this.
        map.setCenter({lat:23.492690,lng: 78.680398});
        map.setZoom(5);
        map.setMapTypeId('roadmap');

        for (var i = 0, length = data.length; i < length; i++) 
        {
            var cocacolaStoreData = data[i];
            var typeName = cocacolaStoreData.category;
            //console.log("---Category---:",typeName);
            for (var j = 0, categoryArraylength = $scope.categories.length; j < categoryArraylength; j++) 
            {
                selectedCategoryName = $scope.categories[j].name;

                if($scope.categories[j].checked)
                {        
                    if( selectedCategoryName == "POS" && typeName == "pos" )
                    {
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

$scope.showSubCatergorisedLocations = function (event,index) 
{
    $.getJSON('/getBIData', {}, function (data) {
  
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent('<h3>' + cocacolaStoreData.name + '</h3>'
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

                        infoWindow = new google.maps.InfoWindow();
                        (function(marker, cocacolaStoreData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                            infoWindow.setContent('<h3>' +cocacolaStoreData.name + '</h3>'
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
    if( $scope.SelectedCountry == "India" )
    {
        $scope.clearIndiaMarkers();
        $scope.showAllLocations();
    }
}

    $scope.showAllLocations = function () 
    {
        $.getJSON('/getBIData', {}, function (data) {
                                
            //$scope.storeNames.length = 0;  commented to display , POS related data.
            //$scope.storeNames.push(allOption);
            //$scope.clearAllCategoryMarkers();add this later.

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

    $scope.clearIndiaMarkers = function()
    {
        for (var key in markers) 
        {
            markers[key].setMap(null);
        };

        if( countryMarkerCluster != null )
        {
            countryMarkerCluster.length = 0;
            countryMarkerCluster.clearMarkers();
        }
        
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

        //if (countryMarkerCluster!=null)
        //countryMarkerCluster.clearMarkers();
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

    $scope.regionChange = function () {
 
        $scope.clearIndiaMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearAllSubcategoryMarkers();
        $scope.clearAllPlacesMarkers();

        if( $scope.selectedRegion == "East" )
        {
            map.setCenter({lat:22.551296,lng: 88.385557});
            map.setZoom(10);
            
            heatmapEast = new google.maps.visualization.HeatmapLayer({
            data: $scope.getEastPoints(),
            map: map
            });

            heatmapEast.set('radius', heatmapEast.get('radius') ? null : 20);
        }
        else if( $scope.selectedRegion == "West" )
        {   	
            map.setCenter({lat:18.517116,lng: 73.859531});
            map.setZoom(10);
            
            heatmapWest = new google.maps.visualization.HeatmapLayer({
            data: $scope.getWestPoints(),
            map: map
            });
            heatmapWest.set('radius', heatmapWest.get('radius') ? null : 20);
        } 
        else if( $scope.selectedRegion == "South" )
        {
            map.setCenter({lat:12.973054,lng: 77.584958});
            map.setZoom(10);
            
            heatmapSouth = new google.maps.visualization.HeatmapLayer({
            data: $scope.getSouthPoints(),
            map: map
            });
            heatmapSouth.set('radius', heatmapSouth.get('radius') ? null : 20);
        } 
        else if( $scope.selectedRegion == "North" )
        {
            map.setCenter({lat:28.624982,lng: 77.185231});
            map.setZoom(8);
            
            heatmapNorth = new google.maps.visualization.HeatmapLayer({
            data: $scope.getNorthPoints(),
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

        if ( value == 0 )
        {
            if( $scope.selectedCity == "Delhi" )
            {
                latLng = new google.maps.LatLng(28.624982, 77.185231); 
                	  
                map.setCenter({lat:28.624982,lng: 77.185231});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/1.png'></div>");
                infoWindow.open(map, marker);
                });
                markers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCity == "Bengaluru" )
            {
                //12.973054	77.584958
                latLng = new google.maps.LatLng(12.973054, 77.584958); 
                	  
                map.setCenter({lat:12.973054,lng: 77.584958});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div class='info-window1'><img src='images/2.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Mumbai" )
            {
                //19.070517	72.877055
                latLng = new google.maps.LatLng(19.070517, 72.877055); 
                	  
                map.setCenter({lat:19.070517,lng: 72.877055});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/3.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Chennai" )
            {
                //13.066886	80.19252
                latLng = new google.maps.LatLng(13.066886, 80.19252); 
                	  
                map.setCenter({lat:13.066886,lng: 80.19252});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/4.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Pune" )
            {
                //18.517116	73.859531
                latLng = new google.maps.LatLng(18.517116, 73.859531); 
                	  
                map.setCenter({lat:18.517116,lng: 73.859531});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/5.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Indore" )
            {
                //	
                latLng = new google.maps.LatLng(22.716753, 75.856801); 
                	  
                map.setCenter({lat:22.716753,lng: 75.856801});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/6.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Ahmedabad" )
            {	
                latLng = new google.maps.LatLng(23.049881, 72.605137); 
                	  
                map.setCenter({lat:23.049881,lng: 72.605137});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/8.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCity == "Kolkata" )
            {	
                latLng = new google.maps.LatLng(22.657698, 88.348537); 	
                	  
                map.setCenter({lat:22.657698,lng: 88.348537});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Kolkata",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/7.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
        }
        else if( value == 1 )
        {
            if( $scope.selectedCityForSales == "Delhi" )
            {
                latLng = new google.maps.LatLng(28.624982, 77.185231); 
                	  
                map.setCenter({lat:28.624982,lng: 77.185231});
                map.setZoom(11);
                map.setMapTypeId('roadmap');

                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/sales-delhi.png'></div><div style='float:right;'><img src='images/total-sales-delhi.png'></div>");
                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            }
            else if( $scope.selectedCityForSales == "Bengaluru" )
            {
                latLng = new google.maps.LatLng(12.973054, 77.584958); 
                	  
                map.setCenter({lat:12.973054,lng: 77.584958});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                infoWindow.setContent("<div><img src='images/sales-bengaluru.png'></div><div style='float:right;'><img src='images/total-sales-bengaluru.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Mumbai" )
            {
                //19.070517	72.877055
                latLng = new google.maps.LatLng(19.070517, 72.877055); 
                	  
                map.setCenter({lat:19.070517,lng: 72.877055});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent("<div><img src='images/sales-mumbai.png'></div><div style='float:right;'><img src='images/total-sales-mumbai.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Chennai" )
            {
                //13.066886	80.19252
                latLng = new google.maps.LatLng(13.066886, 80.19252); 
                	  
                map.setCenter({lat:13.066886,lng: 80.19252});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                    infoWindow.setContent("<div><img src='images/sales-chennai.png'></div><div style='float:right;'><img src='images/total-sales-chennai.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Pune" )
            {
                //18.517116	73.859531
                latLng = new google.maps.LatLng(18.517116, 73.859531); 
                	  
                map.setCenter({lat:18.517116,lng: 73.859531});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                infoWindow.setContent("<div><img src='images/sales-pune.png'></div><div style='float:right;'><img src='images/total-sales-pune.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Indore" )
            {
                //	
                latLng = new google.maps.LatLng(22.716753, 75.856801); 
                	  
                map.setCenter({lat:22.716753,lng: 75.856801});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                infoWindow.setContent("<div><img src='images/sales-indore.png'></div><div style='float:right;'><img src='images/total-sales-indore.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Ahmedabad" )
            {	
                latLng = new google.maps.LatLng(23.049881, 72.605137); 
                	  
                map.setCenter({lat:23.049881,lng: 72.605137});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Delhi",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                infoWindow.setContent("<div><img src='images/sales-ahmedabad.png'></div><div style='float:right;'><img src='images/total-sales-ahmedabad.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            else if( $scope.selectedCityForSales == "Kolkata" )
            {	
                latLng = new google.maps.LatLng(22.657698, 88.348537); 	
                	  
                map.setCenter({lat:22.657698,lng: 88.348537});
                map.setZoom(11);
                map.setMapTypeId('roadmap');
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: "Kolkata",
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow();
                (function(marker) {
                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                    
                infoWindow.setContent("<div><img src='images/sales-kolkata.png'></div><div style='float:right;'><img src='images/total-sales-kolkata.png'></div>");

                infoWindow.open(map, marker);
                
                });
                markers.push(marker);
                })(marker);
            } 
            
        }
    };

    $scope.getMarketingData = function(event,index){
        
        //clear all the markers and checked categories
        $scope.clearAllPlacesMarkers();
        $scope.clearAllCategoryMarkers();
        $scope.clearIndiaMarkers();
       
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
        $scope.clearAllCategoryMarkers();
        $scope.clearIndiaMarkers();
        
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
        else if (jsonObject.category == "productionsentres")
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
new google.maps.LatLng(13.100841,77.594573),
new google.maps.LatLng(13.100841,77.594573)
];
}

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
