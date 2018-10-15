
angular.module('angularjs_with_Nodejs').controller('accenturev2Controller', function ($templateCache,$window,$route,$rootScope,$scope, $timeout, $filter, $http) {

    var map,geocoder,radius_circle,places;;
    var infoWindow;
    var markers = []; 
    var restaurantsMarkers = [];
    var airportMarkers = [];
    var stationMarkers = [];
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
    var transitStationMarkers = [];
    var lodgingMarkers = [];
    var gymMarkers = [];
    var categorySmallProvisionStoresMarker = [];
    var chineseMedicalHallSmallMarker = [];
    var categoryHypermarketMarker = [];
    var categoryOtherInstitutionalMarker = [];
    var categoryCateringMarker = [];
    var categorySupermarketMarker = [];
    var categoryLargeProvisionStoresMarker = [];
    var categoryPetrolMartStationMarker = [];
    var categoryRestaurantMarker = [];
    var categorySchoolMarker = [];
    var categoryPetShopMarker = [];
    var categoryMediumProvisionStoresMarker = [];
    var categoryChineseMedicalHallMarker = [];
    var categoryChineseMedicalHallLargeMarker = [];
    var categoryOtherConvenienceStoresMarker = [];
    var categoryTraditionalPharmacyMarker = [];
    var categorySpecialistFoodDrinkMarker = [];
    var categoryBakeryMarker = [];
    var activeMarker = [];
    var inactiveMarker = [];
    var categoryQSRMarker = [];
    var categoryWholesaleMarker = [];
    var categoryendingMachineMarker = [];
    var categorySpecialistOtherMarker = [];
    var categoryNewsMagazineStoreMarker = [];
    var categoryHospitalsMarker = [];
    var categoryModernPharmacyMarker = [];
    var categorySpecialityOtherMarker = [];
    var categoryBabyCenterMarker = [];
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
    //$scope.resetMap = true;
    var locationMarker;
    var restaurants = [];
    $scope.poisFromMarkerSelection = false;
    $scope.minValueSalesRevenue = null;
    $scope.maxValueSalesRevenue = null;
    $scope.minValueFrequency = null;
    $scope.maxValueFrequency = null;
    $scope.minValueOrderQuantity = null;
    $scope.maxValueOrderQuantity = null;
    $scope.minValueProductVariety = null;
    $scope.maxValueProductVariety = null;
    $scope.selectedStoreClassifications = [];
    $scope.googlePOIsArray = [];
    var slide1 = 0;
    var slide2 = 0;
    var tempStores = [];

    $scope.countries =
    [
        {"name":"Malaysia", "selected":false}
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

    $scope.ratings =
    [
        {"name":"0-3.0", "selected":false},
        {"name":"3.0-5.0", "selected":false},
    ]

    $scope.visitors =
    [
        {"name":"0-1000", "selected":false},
        {"name":"1000-2000", "selected":false},
        {"name":"2000-3000", "selected":false}
    ]

    $scope.frequency =
    [
        {"name":"0-100", "selected":false},
        {"name":"100-500", "selected":false},
        {"name":"500-1000", "selected":false}
    ]

    $scope.orderquantity =
    [
        {"name":"0-1000", "selected":false},
        {"name":"1000-2000", "selected":false},
        {"name":"2000-3000", "selected":false}
    ]

    $scope.placetypes = 
    [
        {"name":"Restaurants", "checked":false},
        {"name":"MRT Stations", "checked":false},
        {"name":"Bar", "checked":false},
        {"name":"Cafe", "checked":false},
        {"name":"Casino", "checked":false},
        {"name":"Night Clubs", "checked":false},
        {"name":"Park", "checked":false},
        {"name":"Super Market", "checked":false},
        {"name":"Subway", "checked":false},
        {"name":"Shopping Mall", "checked":false},
        {"name":"Meal Take Aways", "checked":false},
        {"name":"Movie Theaters", "checked":false},
        {"name":"Bus Station", "checked":false},
        {"name":"Transit Station", "checked":false},
        {"name":"Lodging", "checked":false},
        {"name":"Gym", "checked":false}
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

    $scope.distributiontypes = 
    [
        {"name":"Main Distribution Centre", "checked":false},
        {"name":"Distribution Centre 1", "checked":false},
        {"name":"Distribution Centre 2", "checked":false},
    ]

    $scope.marketingTypes =
    [
        {"name":"Indoor", "checked":false},
        {"name":"Digital", "checked":false}
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

    $scope.currentNavItem = 'page1';

    var AddressJSON = [];
    var nextAddress = 0;
    var delay = 100;
    var bounds;
    $scope.heatmapArray = [];
    $scope.standardHierarchy = [];
    $scope.AllInOneRestaurants = [];
    $scope.storeNames = [];
    $scope.selectedRatingFilter = 0;
    var selectedRatingFilterArray = [];
  
    $scope.storeTypes = 
    [
        {"name":"Active", "checked":false},
        {"name":"Inactive", "checked":false}
    ]

    var countryMarkerCluster;

  
    $scope.goto = function(page) {
      $scope.status = "Goto " + page;
    };

    setTimeout(function ()
    {
      if( sessionStorage.getItem("token") == 'lzbPt76HhtGKhHRj' )
      {
        $scope.initMap();
        //sessionStorage.setItem("token",'');
      }
      else
      {
        window.location.href = '/accenturedemo';
      }
      //$scope.initMap();
      
    }, 50);

    $scope.initMap = function ()
    {
      //$scope.showLoginPage = true;
        map = new google.maps.Map(document.getElementById("mymap"), {
            //4.465754, 107.501896 Center For Malaysia
        center: new google.maps.LatLng(4.465754, 107.501896),
        zoom: 6, //later on make it 5
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        map.data.loadGeoJson(
            'https://www.jasonbase.com/things/27pn');

        map.data.setStyle(function(feature) {
            var NAME = feature.getProperty('NAME_2');
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
                fillColor: "#d39e17", //#8ac601 , #adbfff , #d39e17
                strokeWeight: 1,
                strokeColor:scolor,
            }
            });


        $scope.storeIPAddress();
        $scope.initialiseData();
        $scope.showStores(); 
    }


    function getVals(){
        // Get slider values
        var parent = this.parentNode;
        var slides = parent.getElementsByTagName("input");
        slide1 = parseFloat( slides[0].value );
        slide2 = parseFloat( slides[1].value );

        // Neither slider will clip the other, so make sure we determine which is larger
        if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
        
        var displayElement = parent.getElementsByClassName("rangeValues")[0];
            displayElement.innerHTML = slide1 +" - " + slide2 ;

        
        console.log("---googlePOIsArray---:",$scope.googlePOIsArray);

        $scope.clearAllPlacesMarkers();

        $scope.clearRestaurantsMarker();
        
        if( $scope.googlePOIsArray != null || $scope.googlePOIsArray.length > 0 )
        {
            for (var i = 0, length = $scope.googlePOIsArray.length; i < length; i++) 
            {
                if( slide1 != null && slide2 != null )
                {
                    if( $scope.googlePOIsArray[i].rating > slide1 && $scope.googlePOIsArray[i].rating < slide2 )
                    {
                        $scope.createPlacesMarkerForRestaurant($scope.googlePOIsArray[i]);
                    }
                    else if( typeof $scope.googlePOIsArray[i].rating == "undefined")
                    {
                        console.log("---rating undefined---");
                        $scope.createPlacesMarkerForRestaurant($scope.googlePOIsArray[i]);
                    }
                }
            }
        }

        
        //empty array returns hashKey key , we checked it for the same.
        if(!( $scope.selectedStore.hasOwnProperty('$$hashKey') ) )
        {
            //$scope.getData(null, null,-1,0);
        }
      }
      
$scope.initialiseData = function()
{

    // window.onload = function()
    // {
    // Initialize Sliders
    var sliderSections = document.getElementsByClassName("range-slider");
    
        for( var x = 0; x < sliderSections.length; x++ ){
            var sliders = sliderSections[x].getElementsByTagName("input");
            
            for( var y = 0; y < sliders.length; y++ ){
            if( sliders[y].type ==="range" ){
                sliders[y].oninput = getVals;
                // Manually trigger event first time to display values
                sliders[y].oninput();
            }
            }
        }
    // }

    var standardHierarchyNames = [];
    var tempArray = [];
    geocoder = new google.maps.Geocoder;
    bounds = new google.maps.LatLngBounds();
    //var infowindow = new google.maps.InfoWindow();
    infowindow = new google.maps.InfoWindow();
    trafficLayer = new google.maps.TrafficLayer();

    heatmap = new google.maps.visualization.HeatmapLayer({
    data: $scope.getPoints(),
    map: map
    });
    heatmap.setMap(null);

    
    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];
        standardHierarchyNames.push({
            name: storeData.CHANNEL_HIERARCHY,
            selected: false,
        });
        //tempArray.push(standardHierarchyNames[i].name);
    }

    // Array to keep track of duplicates
    var dups = [];
    $scope.standardHierarchy = standardHierarchyNames.filter(function(element) {
    // If it is not a duplicate, return true
    if (dups.indexOf(element.name) == -1) 
    {
        dups.push(element.name);
        return true;
    }
    return false;
    });

    //Store Classification Alphabetic Order
    $scope.standardHierarchy = $filter('orderBy')($scope.standardHierarchy, 'name');
    //console.log("---$scope.standardHierarchy---: ",  $scope.standardHierarchy);
    //POI's Alphabetic Order
    $scope.placetypes = $filter('orderBy')($scope.placetypes, 'name');



    

    //setTimeout(function(){ $scope.$apply(); },100);
    if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
        $scope.$apply();
    }
};

// $scope.CountryChanged = function (name)
// {
//   console.log("---name---: ",  $scope.selectedCountry);
//     if( $scope.selectedCountry == "Malaysia" )
//     {
//         $scope.showStores();
//     }
// };

$scope.searchForSalesRevenue = function()
{
    console.log($scope.minValueSalesRevenue);
    console.log($scope.maxValueSalesRevenue);
    $scope.clearMalaysiaMarkers();
    //$scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();
    $scope.storeNames.length = 0;  
    $scope.heatmapArray.length = 0;

    heatmap.setMap(null);


    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];
        if( ($scope.minValueSalesRevenue == null || $scope.minValueSalesRevenue == "" ) 
            && ( $scope.maxValueSalesRevenue == null || $scope.maxValueSalesRevenue == "" ) )
        {
            console.log("---Both Null---");
            if( storeData.latitude != null && storeData.longitude != null  )
            {
                $scope.storeNames.push(storeData);
                var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                $scope.heatmapArray.push(heatmapPoint);
                latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: storeData.OUTLET_CODE,
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow({maxWidth:250});
                (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    
                    $scope.selectedStore = storeData;
                                                
                    infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                    + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                    + "<br/>" + "Address                      :" +storeData.ADDRESS 
                    + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                    + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                    + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                    + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                    + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                    + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                    + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                    + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                    //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                    //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                    infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    })(marker, storeData);
            }
        }
        else if( ( $scope.minValueSalesRevenue == null || $scope.minValueSalesRevenue == "" ) && $scope.maxValueSalesRevenue != null )
        {    
            console.log("---Only Min Null---:");
            if( storeData.AVERAGE_PURCHASE_PER_MONTH < $scope.maxValueSalesRevenue )
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
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
            if(storeData.AVERAGE_PURCHASE_PER_MONTH > $scope.minValueSalesRevenue)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
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
            if(storeData.AVERAGE_PURCHASE_PER_MONTH > $scope.minValueSalesRevenue && storeData.AVERAGE_PURCHASE_PER_MONTH < $scope.maxValueSalesRevenue )
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
    }
    setTimeout(function(){ $scope.$apply(); },100);
};

$scope.searchForFrequency = function()
{
    console.log($scope.minValueFrequency);
    console.log($scope.maxValueFrequency);

    $scope.clearMalaysiaMarkers();
    //$scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();
    $scope.storeNames.length = 0;  
    $scope.heatmapArray.length = 0;
    heatmap.setMap(null);

    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];

        var frequency = storeData.NO_OF_INVOICES/storeData.MONTHS;

        if( ( $scope.minValueFrequency == null || $scope.minValueFrequency == "" ) 
            &&  ( $scope.maxValueFrequency == null || $scope.maxValueFrequency == "" ) )
        {
            console.log("---Both Null---");
            if( storeData.latitude != null && storeData.longitude != null  )
            {
                $scope.storeNames.push(storeData);
                var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                $scope.heatmapArray.push(heatmapPoint);
                latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: storeData.OUTLET_CODE,
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow({maxWidth:250});
                (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    
                    $scope.selectedStore = storeData;
                                                
                    infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                    + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                    + "<br/>" + "Address                      :" +storeData.ADDRESS 
                    + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                    + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                    + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                    + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                    + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                    + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                    + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                    + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                    //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                    //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                    infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    })(marker, storeData);
            }
        }
        else if( ( $scope.minValueFrequency == null || $scope.minValueFrequency == "" ) && $scope.maxValueFrequency != null )
        {
            if( frequency < $scope.maxValueFrequency)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( ( $scope.maxValueFrequency == null || $scope.maxValueFrequency == "" ) && $scope.minValueFrequency != null )
        {
            if( frequency > $scope.minValueFrequency)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( $scope.minValueFrequency != null && $scope.maxValueFrequency != null )
        {
            if( frequency > $scope.minValueFrequency && frequency < $scope.maxValueFrequency )
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
    }
    setTimeout(function(){ $scope.$apply(); },100);
};

$scope.searchForOrderQuantity = function()
{
    console.log($scope.minValueOrderQuantity);
    console.log($scope.maxValueOrderQuantity);

    $scope.clearMalaysiaMarkers();
    //$scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();
    $scope.storeNames.length = 0;  
    $scope.heatmapArray.length = 0;
    heatmap.setMap(null);

    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];


        if( ( $scope.minValueOrderQuantity == null || $scope.minValueOrderQuantity == "" ) 
            && ( $scope.maxValueOrderQuantity == null || $scope.maxValueOrderQuantity == "" ) )
        {
            console.log("---Both Null---");
            if( storeData.latitude != null && storeData.longitude != null  )
            {
                $scope.storeNames.push(storeData);
                var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                $scope.heatmapArray.push(heatmapPoint);
                latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: storeData.OUTLET_CODE,
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow({maxWidth:250});
                (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    
                    $scope.selectedStore = storeData;
                                                
                    infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                    + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                    + "<br/>" + "Address                      :" +storeData.ADDRESS 
                    + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                    + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                    + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                    + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                    + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                    + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                    + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                    + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                    //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                    //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                    infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    })(marker, storeData);
            }
        }
        else if(  ( $scope.minValueOrderQuantity == null || $scope.minValueOrderQuantity == "" ) && $scope.maxValueOrderQuantity != null )
        {
            if(storeData.AVERAGE_PURCHASE_PER_INVOICE < $scope.maxValueOrderQuantity)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( ($scope.maxValueOrderQuantity == null || $scope.maxValueOrderQuantity == "" ) && $scope.minValueOrderQuantity != null )
        {
            if(storeData.AVERAGE_PURCHASE_PER_INVOICE > $scope.minValueOrderQuantity)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( $scope.minValueOrderQuantity != null && $scope.maxValueOrderQuantity != null )
        {
            if(storeData.AVERAGE_PURCHASE_PER_INVOICE > $scope.minValueOrderQuantity && storeData.AVERAGE_PURCHASE_PER_INVOICE < $scope.maxValueOrderQuantity )
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
    }
    setTimeout(function(){ $scope.$apply(); },100);
};

$scope.searchForProductVariety = function()
{
    console.log($scope.minValueProductVariety);
    console.log($scope.maxValueProductVariety);

    $scope.clearMalaysiaMarkers();
    //$scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();
    $scope.storeNames.length = 0;  
    $scope.heatmapArray.length = 0;
    heatmap.setMap(null);


    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];

        if( ( $scope.minValueProductVariety == null || $scope.minValueProductVariety == "" ) 
            && ( $scope.maxValueProductVariety == null || $scope.maxValueProductVariety == "" ) )
        {
            console.log("---Both Null---");
            if( storeData.latitude != null && storeData.longitude != null  )
            {
                $scope.storeNames.push(storeData);
                var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                $scope.heatmapArray.push(heatmapPoint);
                latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
        
                // Creating a marker and putting it on the map
                var marker = new google.maps.Marker({
                position: latLng,
                map: map,
                title: storeData.OUTLET_CODE,
                icon: 'images/purple.png',
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                });

                infoWindow = new google.maps.InfoWindow({maxWidth:250});
                (function(marker, storeData) {

                    // Attaching a click event to the current marker
                    google.maps.event.addListener(marker, "click", function(e) {
                    
                    $scope.selectedStore = storeData;
                                                
                    infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                    + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                    + "<br/>" + "Address                      :" +storeData.ADDRESS 
                    + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                    + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                    + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                    + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                    + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                    + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                    + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                    + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                    //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                    //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                    infoWindow.open(map, marker);
                    });

                    markers.push(marker);
                    })(marker, storeData);
            }
        }
        else if( ( $scope.minValueProductVariety == null || $scope.minValueProductVariety == "" ) 
                 && $scope.maxValueProductVariety != null )
        {
            if(storeData.AVERAGE_LINES_PER_INVOICE < $scope.maxValueProductVariety)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( ( $scope.maxValueProductVariety == null || $scope.maxValueProductVariety == "" ) 
                 && $scope.minValueProductVariety != null )
        {
            if(storeData.AVERAGE_LINES_PER_INVOICE > $scope.minValueProductVariety)
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
        else if( $scope.minValueProductVariety != null && $scope.maxValueProductVariety != null )
        {
            if(storeData.AVERAGE_LINES_PER_INVOICE > $scope.minValueProductVariety && storeData.AVERAGE_LINES_PER_INVOICE < $scope.maxValueProductVariety )
            {
                if( storeData.latitude != null && storeData.longitude != null  )
                {
                    $scope.storeNames.push(storeData);
                    var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
                    $scope.heatmapArray.push(heatmapPoint);
                    latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
            
                    // Creating a marker and putting it on the map
                    var marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    title: storeData.OUTLET_CODE,
                    icon: 'images/purple.png',
                    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                    });

                    infoWindow = new google.maps.InfoWindow({maxWidth:250});
                    (function(marker, storeData) {

                        // Attaching a click event to the current marker
                        google.maps.event.addListener(marker, "click", function(e) {
                        
                        $scope.selectedStore = storeData;
                                                    
                        infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                        + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                        + "<br/>" + "Address                      :" +storeData.ADDRESS 
                        + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                        + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                        + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                        + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                        + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                        + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                        + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                        + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                        //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                        //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                        infoWindow.open(map, marker);
                        });

                        markers.push(marker);
                        })(marker, storeData);
                }
            }
        }
    }
    setTimeout(function(){ $scope.$apply(); },100);
};

$scope.showStores = function()
{

  // for (var i = 0, length = 10; i < length; i++) 
  // {
      // var newstoreData = newStores[67];
      // console.log("---newstoreData.ADDRESS---:",newstoreData.ADDRESS);
      // geocoder.geocode({'address': newstoreData.ADDRESS}, function (results,status)
      // { 
      //   // If that was successful
      //   if (status == google.maps.GeocoderStatus.OK) {
      //     //console.log("---results---:",results);
      //     //console.log("---formatted_address---:",results[0].formatted_address);
      //     // Lets assume that the first marker is the one we want
      //     var p = results[0].geometry.location;
      //     var lat=p.lat();
      //     var lng=p.lng();
      //     // Output the data
      //       var msg = '"geocodeaddress"' + ':"' +results[0].formatted_address+ '",' + '"latitude":'+lat+ ',' + '"longitude":' +lng + ',';
      //       //document.getElementById("messages").innerHTML += msg;
      //       //console.log("---OUTLET CODE---:",newstoreData.OUTLET_CODE);
      //       console.log("---msg---:",msg);
      //     // Create a marker
      //     //$scope.createMarker(search,lat,lng);
      //   }
      //   else {
      //     console.log("---Error---:",status); 
      //   }
      // });
  //}

    tempStores = newStores;
    var storeData;
    console.log("---newStores---:",newStores.length);
    console.log("---tempStores---:",tempStores.length);

    $scope.storeNames.length = 0;  

    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        storeData = newStores[i];

        if( storeData.latitude != null && storeData.longitude != null  )
        {
            $scope.storeNames.push(storeData);
            var heatmapPoint = new google.maps.LatLng(storeData.latitude, storeData.longitude);
            $scope.heatmapArray.push(heatmapPoint);
            latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
      
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: storeData.OUTLET_CODE,
            icon: 'images/purple.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            infoWindow = new google.maps.InfoWindow({maxWidth:250});
            (function(marker, storeData) {

                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                    $scope.selectedStore = storeData;
                    
                   
                    //console.log("---selectedStore---:",$scope.selectedStore);
                //infoWindow.setContent('<h3>' + storeData.name + '</h3>'+ "<br/>" + storeData.address + "<br/>" + storeData.contact);
                
                infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>'
                + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                + "<br/>" + "Address                      :" +storeData.ADDRESS 
                + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                + "<br/>" + '<button onclick="getPOIs();">   POIs   </button>');

                //'<button onclick="getPOIs(\'' + storeData + '\');">POIs</button>'
                //'<div>' + $scope.locations[i].Name + '<button class="btn btn-success" ng-click="addLoc(\'' + $scope.locations[i].Name + '\');">Add</button>' + '</div>'
                infoWindow.open(map, marker);
                });

                markers.push(marker);
                })(marker, storeData);
        }
    }

    setTimeout(function(){ $scope.$apply(); },100);
};

window.getPOIs = function()
{
    $scope.poisFromMarkerSelection = true;
    
    //var resultObject = $scope.search($scope.selectedStore.OUTLET_CODE, $scope.storeNames);

    var index = $scope.searchIndex($scope.selectedStore.OUTLET_CODE, $scope.storeNames);

    document.getElementById('dropdown').selectedIndex = index + 1;
    $('#dropdown').trigger('change');

    $scope.getData(null,null,-1,0);   
}

$scope.search = function(nameKey, storeNames)
{
    for (var i=0; i < storeNames.length; i++) {
        if (storeNames[i].OUTLET_CODE === nameKey) {
            return storeNames[i];
        }
    }
}

$scope.searchIndex = function(nameKey, storeNames)
{
    for (var i=0; i < storeNames.length; i++) {
        if (storeNames[i].OUTLET_CODE === nameKey) {
            return i;
        }
    }
}

$scope.removeStoreClassification = function(name, array)
{
    var i = 0;
    for (i; i < array.length; i++) 
    {
        if (array[i] === name) 
        {
            //return i;
            array.splice(i, 1);
        }
    }
    
    console.log("---array---: ",array);
    
    var uniqueNames = [];
    $.each(array, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    console.log("---uniqueNames---: ",uniqueNames);
};



$scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2,place1,place2) {
  var R = 6371; // Radius of the earth in km
  var dLat = $scope.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = $scope.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos($scope.deg2rad(lat1)) * Math.cos($scope.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  if( d > 0 && d < 0.1000 )
  {
    var placename = place1.Name + "  and  " + place2.Name + " is : "
    console.log("",placename + d);
  }
  
  return d;
};

$scope.deg2rad = function(deg) {
  return deg * (Math.PI/180)
};

$scope.getPoints = function() 
{
    console.log("---$scope.heatmapArray---:",$scope.heatmapArray)
  return $scope.heatmapArray;
};

$scope.showTypes = function (name,event) 
{
    $scope.clearMalaysiaMarkers();
    $scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();

    $scope.storeNames.length = 0;  

    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];
        var type = storeData.CUST_STATUS;

        if( storeData.latitude != null && storeData.longitude != null  )
        {
          if(event.target.checked)
          {  
              map.setCenter({lat:4.465754,lng: 107.501896});
              map.setZoom(6);
      
              if( name == "Active" && type == 1 )
              {
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h3>' 
                              + "<br/>" + "POSTAL_CODE                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE);

                  infoWindow.open(map, marker);
                  });
  
                  activeMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Inactive" && type == 0 )
              {
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/red1.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h4>' + "Customer Name         :" + storeData.CUST_NAME + '</h4>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  inactiveMarker.push(marker);
                  })(marker, storeData);
              }
              
          }
          else
          {
              if( name == "Active" && type == 1 )
              {
                  $scope.clearActiveMarker();
              }
              else if( name == "Inactive" && type == 0 )
              {
                  $scope.clearInactiveMarker();
              }
          }
      }  
    }  
    setTimeout(function(){ $scope.$apply(); },100);
};

$scope.filterRatings = function (name,event)
{  
    if(event.target.checked)
    {
        if( name == "0-3.0" )
        {
            selectedRatingFilterArray.push(3);
        }
        else if ( name == "3.0-5.0" )
        {
            selectedRatingFilterArray.push(5);
        }
    }
    else
    {
      if( name == "0-3.0" )
        {
          selectedRatingFilterArray= selectedRatingFilterArray.filter(function(item) { 
                  return item !== 3
              });
        }
        else if ( name == "3.0-5.0" )
        {
          selectedRatingFilterArray = selectedRatingFilterArray.filter(function(item) { 
                  return item !== 5
              });
        }
    }
    $scope.getData(null,null,-1,0);
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

$scope.resetMap = function()
{
    //$scope.googlePOIsArray.length = 0;
    var currentPageTemplate = $route.current.templateUrl;
    $templateCache.remove(currentPageTemplate);
    $window.location.reload();
};


$scope.toggleHeatmap = function () 
{
    $scope.clearAllPlacesMarkers();
    $scope.clearAllCategoryMarkers();
    $scope.clearMalaysiaMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    $scope.storeNames.length = 0; 
    $scope.showStorePlaceTypes = false;
    for (var i = 0, length = $scope.standardHierarchy.length; i < length; i++) 
    {
        $scope.standardHierarchy[i].checked = false;
    }

    for (var i = 0, length = $scope.storeTypes.length; i < length; i++) 
    {
        $scope.storeTypes[i].checked = false;
    }

    for (var i = 0, length = $scope.ratings.length; i < length; i++) 
    {
        $scope.ratings[i].checked = false;
    }
    
    heatmap.setMap(heatmap.getMap() ? null : map);
};

$scope.filterStoreClassification = function (name,event, index) 
{
    $scope.clearMalaysiaMarkers();
    //$scope.clearAllCategoryMarkers();
    //$scope.clearAllSubcategoryMarkers();
    $scope.clearAllPlacesMarkers();
    $scope.clearActiveMarker();
    $scope.clearInactiveMarker();
    //$scope.clearAllHeatMaps();
    //$scope.clearFusionLayer();
    //$scope.clearCityAndRegionMarker();

    $scope.storeNames.length = 0;  
    //$scope.tempStores.length = 0;  

    for (var i = 0, length = newStores.length; i < length; i++) 
    {
        var storeData = newStores[i];
        var typeName = storeData.CHANNEL_HIERARCHY;

        if( storeData.latitude != null && storeData.longitude != null  )
        {
          if(event.target.checked)
          {  
              map.setCenter({lat:4.465754,lng: 107.501896});
              map.setZoom(6);

              
              //console.log("---$scope.selectedStoreClassifications---:",$scope.selectedStoreClassifications);

              if( name == "Provision Store - Small" && typeName == "Provision Store - Small" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Provision Store - Small";
                  $scope.storeNames.push(storeData);
                  $scope.selectedStoreClassifications.push(storeData.CHANNEL_HIERARCHY);
                  //console.log("---$scope.selectedStoreClassifications---:",$scope.selectedStoreClassifications);
                //   $scope.selectedStoreClassifications = $scope.selectedStoreClassifications.filter(function(item, pos) {
                //     return $scope.selectedStoreClassifications.indexOf(item) == pos;
                    
                // })
                  //$scope.tempStores.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {

                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
  
                  infoWindow.open(map, marker);
                  });
  
                  categorySmallProvisionStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Chinese Medical Hall - Small" && typeName == "Chinese Medical Hall - Small" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Chinese Medical Hall - Small";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  });
  
                  chineseMedicalHallSmallMarker.push(marker);
                  })(marker, storeData);
              }
              // else if( name == "Hypermarket" && typeName == "Hypermarket" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Hypermarket";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryHypermarketMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Other Institutional" && typeName == "Other Institutional" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Other Institutional";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/blue.png',
              //     //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     //$scope.clearDirection();
              //     //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
              //     //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
              //     });
  
              //     categoryOtherInstitutionalMarker.push(marker);
              //     })(marker, storeData);
              // } 
              // else if( name == "Catering" && typeName == "Catering" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Catering";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/purple.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     //infoWindow = new google.maps.InfoWindow();
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" +storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryCateringMarker.push(marker);
              //     })(marker, storeData);
              // }
              else if( name == "Supermarket" && typeName == "Supermarket" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Supermarket";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  });
  
                  categorySupermarketMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Large Provision Stores" && typeName == "Large Provision Stores" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Large Provision Stores";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  });
  
                  categoryLargeProvisionStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Petrol Mart Station" && typeName == "Petrol Mart Station" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Petrol Mart Station";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryPetrolMartStationMarker.push(marker);
                  })(marker, storeData);
              }
              // else if( name == "Restaurant" && typeName == "Restaurant" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Restaurant";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/purple.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     //infoWindow = new google.maps.InfoWindow();
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryRestaurantMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "School" && typeName == "School" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "School";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/pink.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categorySchoolMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Pet Shop" && typeName == "Pet Shop" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Pet Shop";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryPetShopMarker.push(marker);
              //     })(marker, storeData);
              // }
              else if( name == "Medium Provision Stores" && typeName == "Medium Provision Stores" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Medium Provision Stores";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryMediumProvisionStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Chinese Medical Hall" && typeName == "Chinese Medical Hall" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Chinese Medical Hall";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
  
                  infoWindow.open(map, marker);
                  });
  
                  categoryChineseMedicalHallMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Convenience Store" && typeName == "Convenience Store" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Convenience Store";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  });
  
                  categoryOtherConvenienceStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Chinese Medical Hall - Large" && typeName == "Chinese Medical Hall - Large" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Chinese Medical Hall - Large";
                  $scope.storeNames.push(storeData);
                  
  
                  latLng = new google.maps.LatLng(storeData.latitude, storeData.longitude); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.OUTLET_CODE,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 350});
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    $scope.selectedStore = storeData;
                    
                    infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
                              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
                              + "<br/>" + "Address                      :" +storeData.ADDRESS 
                              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
                              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
                              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
                              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
                              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
                              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
                              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
                              + "<br/>" + '<button onclick="getPOIs();">POIs</button>');
                  infoWindow.open(map, marker);
                  });
  
                  categoryChineseMedicalHallLargeMarker.push(marker);
                  })(marker, storeData);
              }
              // else if( name == "Traditional Pharmacy" && typeName == "Traditional Pharmacy" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Traditional Pharmacy";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryTraditionalPharmacyMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Specialist Food & Drink" && typeName == "Specialist Food & Drink" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Specialist Food & Drink";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/blue.png',
              //     //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     //$scope.clearDirection();
              //     //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
              //     //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
              //     });
  
              //     categorySpecialistFoodDrinkMarker.push(marker);
              //     })(marker, storeData);
              // } 
              // else if( name == "Bakery" && typeName == "Bakery" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Bakery";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/purple.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     //infoWindow = new google.maps.InfoWindow();
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryBakeryMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "QSR" && typeName == "QSR" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "QSR";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/pink.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryQSRMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Wholesale" && typeName == "Wholesale" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Wholesale";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryWholesaleMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Vending Machine" && typeName == "Vending Machine" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Vending Machine";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/blue.png',
              //     //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     //$scope.clearDirection();
              //     //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
              //     //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
              //     });
  
              //     categoryendingMachineMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Specialist Other" && typeName == "Specialist Other" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Specialist Other";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/purple.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     //infoWindow = new google.maps.InfoWindow();
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
              //     infoWindow.open(map, marker);
              //     });
  
              //     categorySpecialistOtherMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "News / Magazine Store" && typeName == "News / Magazine Store" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "News / Magazine Store";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/pink.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryNewsMagazineStoreMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Hospitals" && typeName == "Hospitals" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Hospitals";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categoryHospitalsMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Modern Pharmacy" && typeName == "Modern Pharmacy" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Modern Pharmacy";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/blue.png',
              //     //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     //$scope.clearDirection();
              //     //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
              //     //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
              //     });
  
              //     categoryModernPharmacyMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Speciality Other" && typeName == "Speciality Other" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Speciality Other";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/green.png',
              //     mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     });
  
              //     categorySpecialityOtherMarker.push(marker);
              //     })(marker, storeData);
              // }
              // else if( name == "Baby Center" && typeName == "Baby Center" )
              // {
              //     console.log("---typeName---:",typeName);
              //     userSelectedCategoryName = "Baby Center";
              //     $scope.storeNames.push(storeData);
  
              //     latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
              //     // Creating a marker and putting it on the map
              //     var marker = new google.maps.Marker({
              //     position: latLng,
              //     map: map,
              //     title: storeData.CUST_NAME,
              //     icon: 'images/blue.png',
              //     //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
              //     });
  
              //     infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
              //     (function(marker, storeData) {
  
              //     // Attaching a click event to the current marker
              //     google.maps.event.addListener(marker, "click", function(e) {
              //       infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
              //       + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
              //       + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
              //       + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
              //       + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
              //       + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
              //       + "<br/>" + "Latitude           :" +storeData.LATITUDE
              //       + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
              //     infoWindow.open(map, marker);
              //     //$scope.clearDirection();
              //     //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
              //     //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
              //     });
  
              //     categoryBabyCenterMarker.push(marker);
              //     })(marker, storeData);
              // }
              
          }
          else
          {

              if( name == "Provision Store - Small" && typeName == "Provision Store - Small" )
              {
                  $scope.clearCategorySmallProvisionStoresMarker();
                  console.log("---$scope.selectedStoreClassifications111---:",$scope.selectedStoreClassifications);
                  $scope.removeStoreClassification("Provision Store - Small",$scope.selectedStoreClassifications);
                  console.log("---$scope.selectedStoreClassifications222---:",$scope.selectedStoreClassifications);
              }
              else if( name == "Chinese Medical Hall - Small" && typeName == "Chinese Medical Hall - Small" )
              {
                  $scope.clearchineseMedicalHallSmallMarker();
              }
              // else if( name == "Hypermarket" && typeName == "Hypermarket" )
              // {
              //     $scope.clearCategoryHypermarketMarker();
              // }
              // else if( name == "Other Institutional" && typeName == "Other Institutional" )
              // {
              //     $scope.clearCategoryOtherInstitutionalMarker();
              // }
              // else if( name == "Catering" && typeName == "Catering" )
              // {
              //     $scope.clearCategoryCateringMarker();
              // }
              else if( name == "Supermarket" && typeName == "Supermarket" )
              {
                  $scope.clearCategorySupermarketMarker();
              }
              else if( name == "Large Provision Stores" && typeName == "Large Provision Stores" )
              {
                  $scope.clearCategoryLargeProvisionStoresMarker();
              }
              else if( name == "Petrol Mart Station" && typeName == "Petrol Mart Station" )
              {
                  $scope.clearCategoryPetrolMartStationMarker();
              }
              // else if( name == "Restaurant" && typeName == "Restaurant" )
              // {
              //     $scope.clearCategoryRestaurantMarker();
              // }
              // else if( name == "School" && typeName == "School" )
              // {
              //     $scope.clearCategorySchoolMarker();
              // }
              // else if( name == "Pet Shop" && typeName == "Pet Shop" )
              // {
              //     $scope.clearCategoryPetShopMarker();
              // }
              else if( name == "Medium Provision Stores" && typeName == "Medium Provision Stores" )
              {
                  $scope.clearCategoryMediumProvisionStoresMarker();
              }
              else if( name == "Chinese Medical Hall" && typeName == "Chinese Medical Hall" )
              {
                  $scope.clearCategoryChineseMedicalHallMarker();
              }
              else if( name == "Chinese Medical Hall - Large" && typeName == "Chinese Medical Hall - Large" )
              {
                  $scope.clearCategoryChineseMedicalHallLargeMarker();
              }
              else if( name == "Convenience Store" && typeName == "Convenience Store" )
              {
                  $scope.clearCategoryOtherConvenienceStoresMarker();
              }
              // else if( name == "Traditional Pharmacy" && typeName == "Traditional Pharmacy" )
              // {
              //     $scope.clearCategoryTraditionalPharmacyMarker();
              // }
              // else if( name == "Specialist Food & Drink" && typeName == "Specialist Food & Drink" )
              // {
              //     $scope.clearCategorySpecialistFoodDrinkMarker();
              // }
              // else if( name == "Bakery" && typeName == "Bakery" )
              // {
              //     $scope.clearCategoryBakeryMarker();
              // }
              // else if( name == "QSR" && typeName == "QSR" )
              // {
              //     $scope.clearCategoryQSRMarker();
              // }
              // else if( name == "Wholesale" && typeName == "Wholesale" )
              // {
              //     $scope.clearCategoryWholesaleMarker();
              // }
              // else if( name == "Vending Machine" && typeName == "Vending Machine" )
              // {
              //     $scope.clearCategoryendingMachineMarker();
              // }
              // else if( name == "Specialist Other" && typeName == "Specialist Other" )
              // {
              //     $scope.clearCategorySpecialistOtherMarker();
              // }
              // else if( name == "News / Magazine Store" && typeName == "News / Magazine Store" )
              // {
              //     $scope.clearCategoryNewsMagazineStoreMarker();
              // }
              // else if( name == "Hospitals" && typeName == "Hospitals" )
              // {
              //     $scope.clearCategoryHospitalsMarker();
              // }
              // else if( name == "Modern Pharmacy" && typeName == "Modern Pharmacy" )
              // {
              //     $scope.clearCategoryModernPharmacyMarker();
              // }
              // else if( name == "Speciality Other" && typeName == "Speciality Other" )
              // {
              //     $scope.clearCategorySpecialityOtherMarker();
              // }
              // else if( name == "Baby Center" && typeName == "Baby Center" )
              // {
              //     $scope.clearCategoryBabyCenterMarker();
              // }
              
          }
      }  
    }  
    setTimeout(function(){ $scope.$apply(); },100);
    //$scope.$apply();
};

function getAddress(search, theNext) 
 {
    geocoder.geocode({address:search}, function (results,status)
      { 
        // If that was successful
        if (status == google.maps.GeocoderStatus.OK) {
          // Lets assume that the first marker is the one we want
          var p = results[0].geometry.location;
          var lat=p.lat();
          var lng=p.lng();
          // Output the data
            var msg = 'address="' + search + '" lat=' +lat+ ' lng=' +lng+ '(delay='+delay+'ms)<br>';
            //document.getElementById("messages").innerHTML += msg;
            console.log("---msg---:",msg);
          // Create a marker
          $scope.createMarker(search,lat,lng);
        }
        // ====== Decode the error status ======
        else {
          // === if we were sending the requests to fast, try this one again and increase the delay
          if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
            nextAddress--;
            delay++;
            //console.log("---Delay Increased---:",delay + ":" + nextAddress);
          } else {
            var reason="Code "+status;
            var msg = 'address="' + search + '" error=' +reason+ '(delay='+delay+'ms)<br>';
            //document.getElementById("messages").innerHTML += msg;
            console.log("---Error---:",msg);
          }   
        }
        $scope.theNext();
      }
    );
  }

$scope.theNext = function() 
{
    console.log("---nextAddress---:",nextAddress);
    if (nextAddress < 100) 
    {
      setTimeout(getAddress(AddressJSON[nextAddress],"theNext"), delay);
      nextAddress++;
    } else {
      // We're done. Show map bounds
      map.fitBounds(bounds);
    }
}

 // ======= Function to create a marker
  $scope.createMarker = function(add,lat,lng) 
  {
   var contentString = add;
   //infowindow = new google.maps.InfoWindow();
   var marker = new google.maps.Marker({
     position: new google.maps.LatLng(lat,lng),
     icon: 'images/red1.png',
     map: map,
     //zIndex: Math.round(latlng.lat()*-100000)<<5
   });

  google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(contentString); 
     infowindow.open(map,marker);
   });

   bounds.extend(marker.position);
 }

function geocodeLatLng(geocoder, map, infowindow) {
    
    geocoder.geocode({'location': myLatLng}, function(results, status) {
        if (status === 'OK') {
        if (results[0]) {
           // map.setZoom(11);
            locationMarker = new google.maps.Marker({
            position: myLatLng,
            map: map
            });

            // google.maps.event.addListener(marker, 'click', function() {
            //     infowindow.setContent("<div><input type='submit' id='butSubmit' value='Procurar' onclick='addStore()'><div id='bar'></div></div>");
            //     infowindow.open(map, this);
            //   });

            infowindow.setContent(results[0].formatted_address + "<br>"+ "Latittude :" + myLatLng.lat + "<br>"+ "Langitude :" + myLatLng.lng );
            infowindow.setContent('<p>Address   :  ' + results[0].formatted_address + '</p>' +
                                '<p>Latitude  :  ' + myLatLng.lat + '</p>' +
                                '<p>Longitude :  ' + myLatLng.lng + '</p>' +
                                'Select Type : <form><input type="radio" name="type" value="Retailer" checked> Retailer<br><input type="radio" name="type" value="Distributor"> Distributor<br></form> ' +
                                '<button id="addstoreButton" type="buttton" onclick="addStore()">Add Store</button>');
            //infowindow.setContent("<div>" + results[0].formatted_address + "<br><input type='submit' id='butSubmit' value='Procurar' onclick='addStore()'><div id='bar'></div></div>");
            infowindow.open(map, locationMarker);
        } else {
            window.alert('No results found');
        }
        } else {
        window.alert('Geocoder failed due to: ' + status);
        }
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
        $scope.clearMalaysiaMarkers();
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
            // $scope.clearMalaysiaMarkers();
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
        $scope.clearMalaysiaMarkers();
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
        $scope.clearMalaysiaMarkers();
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
    

    // if( $scope.SelectedCountry == "India" )
    // {
        
    //     $scope.clearMalaysiaMarkers();
    //     $scope.showAllLocations();
    // }
    // else if( $scope.SelectedCountry == "Singapore" )
    // {
    //     $scope.clearMalaysiaMarkers();
    //     $scope.showAllLocations();
        
    // }
    // else
    // {
    //     $scope.clearMalaysiaMarkers();
    //     map.setCenter({lat:23.492690,lng: 78.680398});
    //     map.setZoom(5);
    // }
}

    $scope.showAllLocations = function () 
    {
        $.getJSON('/getBIData', {}, function (data) {
                                
            //$scope.storeNames.length = 0;  commented to display , POS related data.
            //$scope.storeNames.push(allOption);
            //$scope.clearAllCategoryMarkers();add this later.
            $scope.clearAllHeatMaps();
            $scope.clearFusionLayer();

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
                    map.setZoom(8);
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

    


    $scope.applyAllInOneFilter = function()
    {
        console.log("---$scope.selectedStoreClassificationse---:",$scope.selectedStoreClassifications);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.minValueSalesRevenue);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.maxValueSalesRevenue);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.minValueFrequency);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.maxValueFrequency);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.minValueOrderQuantity);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.maxValueOrderQuantity);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.minValueProductVariety);
        console.log("---$scope.selectedStoreClassificationse---:",$scope.maxValueProductVariety);
    };

    $scope.getData = function(placetype, event, index,fromDropDownSelection) 
    {
        //console.log("---getData index---:",index);
        //console.log("---getData $scope.selectedStore---:",$scope.selectedStore);
        //console.log("---$scope.poisFromMarkerSelection---:",$scope.poisFromMarkerSelection);


        if(fromDropDownSelection)
        {
            $scope.poisFromMarkerSelection = false;
            //clear previous pois selection on store change.
            for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
            {
                $scope.placetypes[i].checked = false;
            }  

            //clear POIs are on store change
            $scope.googlePOIsArray.length = 0;
            $scope.clearAllPlacesMarkers();
        }

        if($scope.poisFromMarkerSelection)
        {
            var jsonObject = $scope.selectedStore;
            //$scope.poisFromMarkerSelection = false;
        }
        else
        {
            var jsonObject = JSON.parse($scope.selectedStore);

           // $scope.clearAllPlacesMarkers();
            $scope.clearAllCategoryMarkers();
            $scope.clearMalaysiaMarkers();
            if( markers != null )
            {
                for (var key in markers) 
                {
                    //markers[key].setMap(null);
                    markers = [];
                };
            }
            
            //$scope.clearAllHeatMaps();
            $scope.clearFusionLayer();
            $scope.clearCityAndRegionMarker();
        }
        
        
        if (jsonObject.CHANNEL_HIERARCHY == "Chinese Medical Hall - Small" ||
            jsonObject.CHANNEL_HIERARCHY == "Petrol Mart Station" ||
            jsonObject.CHANNEL_HIERARCHY == "Supermarket" ||
            jsonObject.CHANNEL_HIERARCHY == "Medium Provision Stores" ||
            jsonObject.CHANNEL_HIERARCHY == "Large Provision Stores" ||
            jsonObject.CHANNEL_HIERARCHY == "Convenience Store" ||
            jsonObject.CHANNEL_HIERARCHY == "Provision Store - Small" ||
            jsonObject.CHANNEL_HIERARCHY == "Chinese Medical Hall - Large" ||
            jsonObject.CHANNEL_HIERARCHY == "Chinese Medical Hall"
            // jsonObject.CHANNEL_HIERARCHY == "Petrol Mart Station" ||
            // jsonObject.CHANNEL_HIERARCHY == "Restaurant" ||
            // jsonObject.CHANNEL_HIERARCHY == "School" ||
            // jsonObject.CHANNEL_HIERARCHY == "Pet Shop" ||
            // jsonObject.CHANNEL_HIERARCHY == "Medium Provision Stores" ||
            // jsonObject.CHANNEL_HIERARCHY == "Chinese Medical Hall" ||
            // jsonObject.CHANNEL_HIERARCHY == "Other Convenience Stores" ||
            // jsonObject.CHANNEL_HIERARCHY == "Traditional Pharmacy" ||
            // jsonObject.CHANNEL_HIERARCHY == "Specialist Food & Drink" ||
            // jsonObject.CHANNEL_HIERARCHY == "Bakery" ||
            // jsonObject.CHANNEL_HIERARCHY == "QSR" ||
            // jsonObject.CHANNEL_HIERARCHY == "Wholesale" ||
            // jsonObject.CHANNEL_HIERARCHY == "Vending Machine" ||
            // jsonObject.CHANNEL_HIERARCHY == "Specialist Other" ||
            // jsonObject.CHANNEL_HIERARCHY == "News / Magazine Store" ||
            // jsonObject.CHANNEL_HIERARCHY == "Hospitals" ||
            // jsonObject.CHANNEL_HIERARCHY == "Modern Pharmacy" ||
            // jsonObject.CHANNEL_HIERARCHY == "Speciality Other" ||
            // jsonObject.CHANNEL_HIERARCHY == "Baby Center"
            )
        {
            $scope.showStorePlaceTypes = true;
    
            latLng = new google.maps.LatLng(jsonObject.latitude, jsonObject.longitude); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.OUTLET_CODE,
            icon: 'images/red1.png',
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
              infoWindow.setContent('<h4>' + "Outlet Code         :" + storeData.OUTLET_CODE + '</h4>' 
              + "<br/>" + "Postal Code                  :" +storeData.POSTAL_CODE
              + "<br/>" + "Address                      :" +storeData.ADDRESS 
              + "<br/>" + "Channel Hierarchy            :" +storeData.CHANNEL_HIERARCHY
              + "<br/>" + "No of Invoices               :" +storeData.NO_OF_INVOICES 
              + "<br/>" + "Total Invoice Amount         :" +storeData.TOTAL_INVOICE_AMOUNT
              + "<br/>" + "Total Product Line           :" +storeData.TOTAL_PRODUCT_LINES
              + "<br/>" + "Average Purchase Per Month   :" +storeData.AVERAGE_PURCHASE_PER_MONTH 
              + "<br/>" + "Average Purchase Per Invoice :" +storeData.AVERAGE_PURCHASE_PER_INVOICE
              + "<br/>" + "Average Lines Per Invoice    :" +storeData.AVERAGE_LINES_PER_INVOICE
              + '<button onclick="getPOIs()">POIs</button>');

            infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
            setTimeout(function(){ $scope.$apply(); },100);
        }
        

        console.log("---jsonObject.latitude---:",jsonObject.latitude);
        console.log("---jsonObject.longitude---:",jsonObject.longitude);
        var storeLatLng = { lat : jsonObject.latitude , lng : jsonObject.longitude};

        //checking and assiging values got from callback( index and event )
        if(index!= -1)
            $scope.placetypes[index].checked = event.target.checked;
        
        for (var i = 0, length = $scope.placetypes.length; i < length; i++) 
        {
            if($scope.placetypes[i].checked)
            {
                var typeName = $scope.placetypes[i].name;
                if( placetype == "Restaurants" && typeName == "Restaurants" )
                {
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'MY'},
                        type : [ 'restaurant']
                    },$scope.restaurantCallback);

                    //https://developers.zomato.com/api/v2.1/geocode?lat=3.14692831&lon=101.7466792
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
                        if( slide1 != null && slide2 != null )
                        {
                            if( place.user_rating.aggregate_rating > slide1 && place.user_rating.aggregate_rating < slide2 )
                            {
                                $scope.createPlacesMarkerForZomatoRestaurant(place);
                            }
                        }
                        // if( selectedRatingFilterArray.length == 0 || selectedRatingFilterArray.length == 2 )
                        // {
                        //     $scope.createPlacesMarkerForZomatoRestaurant(place);
                        // }
                        // else if(selectedRatingFilterArray.length == 1 )
                        // {
                        //     if( selectedRatingFilterArray[0] == 3 )
                        //     {
                        //         if( typeof place.user_rating.aggregate_rating == "undefined" || place.user_rating.aggregate_rating < 3 )
                        //         {
                        //             $scope.createPlacesMarkerForZomatoRestaurant(place);
                        //         }
                        //     }
                        //     else if( place.user_rating.aggregate_rating > 3 && selectedRatingFilterArray[0] == 5 )
                        //     {
                        //         $scope.createPlacesMarkerForZomatoRestaurant(place);
                        //     }
                        // }
                      }
                  
                    }).error(function(error) {
                      console.log("---Zomato error---:",error);
                    });

                    //&q=cafe
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
                          restaurants.push(object);

                          if( slide1 != null && slide2 != null )
                          {
                              if( place.overall_star_rating > slide1 && place.overall_star_rating < slide2 )
                              {
                                  $scope.createPlacesMarkerForFacebookRestaurant(place);
                              }
                          }

                        //   if( selectedRatingFilterArray.length == 0 || selectedRatingFilterArray.length == 2 )
                        //   {
                        //       $scope.createPlacesMarkerForFacebookRestaurant(place);
                        //   }
                        //   else if(selectedRatingFilterArray.length == 1 )
                        //   {
                        //       if( selectedRatingFilterArray[0] == 3 )
                        //       {
                        //           if( typeof place.overall_star_rating == "undefined" || place.overall_star_rating < 3 )
                        //           {
                        //               $scope.createPlacesMarkerForFacebookRestaurant(place);
                        //           }
                        //       }
                        //       else if( place.overall_star_rating > 3 && selectedRatingFilterArray[0] == 5 )
                        //       {
                        //           $scope.createPlacesMarkerForFacebookRestaurant(place);
                        //       }
                        //   }
                        }


                        //console.log("---restaurantsFb---",restaurants);

                        // // Array to keep track of duplicates
                        // var duplicates = [];
                        // $scope.AllInOneRestaurants = restaurants.filter(function(element) {
                        // // If it is not a duplicate, return true
                        // if (duplicates.indexOf(element.Name) == -1) 
                        // {
                        //   duplicates.push(element.Name);
                        //     return true;
                        // }
                        // return false;
                        // });

                        // console.log("---$scope.AllInOneRestaurants---",$scope.AllInOneRestaurants);


                        // for (var i = 0; i < restaurants.length; i++) 
                        // {
                        //     var latitude1 = restaurants[i].Latitude;
                        //     var longitude1 = restaurants[i].Longitude;
                        //     for(var j = 0; j < restaurants.length; j++)
                        //     {
                        //       var latitude2 = restaurants[j].Latitude;
                        //       var longitude2 = restaurants[j].Longitude;
                        //       $scope.getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2,restaurants[i],restaurants[j]);
                              
                        //     }
                        // }
                        
                      }).
                      error(function (data, status, headers, config) {
                          console.log("---Facebook Error---:",status);
                  });

                  

                }
                else if(placetype == "MRT Stations" && typeName == "MRT Stations")
                {
                    var service1 = new google.maps.places.PlacesService(map);
                    service1.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'MY'},
                        type : [ 'train_station']
                    }, $scope.stationsCallback);   
                }
                else if(placetype == "Airport" && typeName == "Airport")
                {
                    var service1 = new google.maps.places.PlacesService(map);
                    service1.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        componentRestrictions: {'country': 'MY'},
                        type : [ 'airport']
                    }, $scope.airportCallback);   
                }
                else if(placetype == "Bar" && typeName == "Bar")
                {
                    var service2 = new google.maps.places.PlacesService(map);
                            service2.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'bar']
                            }, $scope.barCallback);   
                }
                else if(placetype == "Bus Station" && typeName == "Bus Station")
                {
                    var service3 = new google.maps.places.PlacesService(map);
                            service3.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'bus_station']
                            }, $scope.busStationCallback);
                }
                else if(placetype == "Cafe" && typeName == "Cafe")
                {
                    var service4 = new google.maps.places.PlacesService(map);
                            service4.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'cafe']
                            }, $scope.cafeCallback);
                }
                else if(placetype == "Casino" &&typeName == "Casino")
                {
                    var service5 = new google.maps.places.PlacesService(map);
                            service5.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'casino']
                            }, $scope.casinoCallback);
                }
                else if(placetype == "Liquor Store" && typeName == "Liquor Store")
                {
                    var service6 = new google.maps.places.PlacesService(map);
                            service6.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'liquor_store']
                            }, $scope.liquorStoreCallback);
                }
                else if(placetype == "Night Clubs" && typeName == "Night Clubs")
                {
                    var service9 = new google.maps.places.PlacesService(map);
                            service9.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'night_club']
                            }, $scope.nightClubCallback);
                }
                else if(placetype == "Park" && typeName == "Park")
                {
                    var service10 = new google.maps.places.PlacesService(map);
                            service10.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'park']
                            }, $scope.parkCallback);
                }
                else if(placetype == "Super Market" && typeName == "Super Market")
                {
                    var service11 = new google.maps.places.PlacesService(map);
                            service11.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'supermarket']
                            }, $scope.supermarketCallback);
                }
                else if(placetype == "Subway" && typeName == "Subway")
                {   
                    var service12 = new google.maps.places.PlacesService(map);
                            service12.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'subway_station']
                            }, $scope.subwayCallback);
                }
                else if(placetype == "Shopping Mall" && typeName == "Shopping Mall")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'shopping_mall']
                            }, $scope.shoppingmallCallback);
                }
                else if(placetype == "Meal Take Aways" && typeName == "Meal Take Aways")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'meal_takeway']
                            }, $scope.mealTakeawayCallback);
                }
                else if(placetype == "Movie Theaters" && typeName == "Movie Theaters")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'movie_theater']
                            }, $scope.movieTheaterCallback);
                }
                else if(placetype == "Transit Station" && typeName == "Transit Station")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'transit_station']
                            }, $scope.transitStationCallback);
                }
                else if(placetype == "Lodging" && typeName == "Lodging")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'lodging']
                            }, $scope.lodgingCallback);
                }
                else if(placetype == "Gym" && typeName == "Gym")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                componentRestrictions: {'country': 'MY'},
                                type : [ 'gym']
                            }, $scope.gymCallback);
                }
                
            }
            else
            {
                var typeName = $scope.placetypes[i].name;
                if( typeName == "Restaurants" )
                {
                    $scope.clearRestaurantsMarker();
                    restaurants = [];
                }
                else if(typeName == "MRT Stations")
                {
                    $scope.clearStationMarkers();
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
                else if(typeName == "Transit Staion")
                {
                    $scope.clearTransitStaionMarkers();
                }
                else if(typeName == "Lodging")
                {
                    $scope.clearLodgingMarkers();
                }
                else if(typeName == "Gym")
                {
                    $scope.clearGymMarkers();
                }
            }
        }
         
    };

    $scope.clearFusionLayer = function()
    {
        if( fusionLayer != null )
        {
            fusionLayer.setMap(null);
        }
    }

    $scope.clearMalaysiaMarkers = function()
    {
        if( markers != null )
        {
            for (var key in markers) 
            {
                markers[key].setMap(null);
                //markers =[];
            };  
        }
    }; 

    $scope.clearAllPlacesMarkers = function()
    {
        $scope.clearRestaurantsMarker();
        $scope.clearAirportMarkers();
        $scope.clearStationMarkers();
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
        $scope.clearTransitStaionMarkers();
        $scope.clearLodgingMarkers();
        $scope.clearGymMarkers();
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

    $scope.clearAirportMarkers = function()
    {
        for (var key in airportMarkers) 
        {
            airportMarkers[key].setMap(null);
        };
        //airportMarkers.length = 0;
       // airportMarkersCluster.clearMarkers();
    }; 

    $scope.clearStationMarkers = function()
    {
        for (var key in stationMarkers) 
        {
          stationMarkers[key].setMap(null);
        };
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

    $scope.clearTransitStaionMarkers = function()
    {
        for (var key in transitStationMarkers) 
        {
            transitStationMarkers[key].setMap(null);
        };
       // MealTakeAwayMarkers.length = 0;
        //MealTakeAwayMarkersCluster.clearMarkers();
    };

    $scope.clearLodgingMarkers = function()
    {
        for (var key in lodgingMarkers) 
        {
            lodgingMarkers[key].setMap(null);
        };
       // MealTakeAwayMarkers.length = 0;
        //MealTakeAwayMarkersCluster.clearMarkers();
    };

    $scope.clearGymMarkers = function()
    {
        for (var key in gymMarkers) 
        {
            gymMarkers[key].setMap(null);
        };
       // MealTakeAwayMarkers.length = 0;
        //MealTakeAwayMarkersCluster.clearMarkers();
    };

    $scope.clearAllCategoryMarkers = function()
    {
        $scope.clearCategorySmallProvisionStoresMarker();
        $scope.clearchineseMedicalHallSmallMarker();
        $scope.clearCategoryHypermarketMarker();
        $scope.clearCategoryOtherInstitutionalMarker();
        $scope.clearCategoryCateringMarker();
        $scope.clearCategorySupermarketMarker();
        $scope.clearCategoryLargeProvisionStoresMarker();
        $scope.clearCategoryPetrolMartStationMarker();
        $scope.clearCategoryRestaurantMarker();
        $scope.clearCategorySchoolMarker();
        $scope.clearCategoryPetShopMarker();
        $scope.clearCategoryMediumProvisionStoresMarker();
        $scope.clearCategoryChineseMedicalHallMarker();
        $scope.clearCategoryChineseMedicalHallLargeMarker();
        $scope.clearCategoryOtherConvenienceStoresMarker();
        $scope.clearCategoryTraditionalPharmacyMarker();
        $scope.clearCategorySpecialistFoodDrinkMarker();
        $scope.clearCategoryBakeryMarker();
        $scope.clearCategoryQSRMarker();
        $scope.clearCategoryWholesaleMarker();
        $scope.clearCategoryendingMachineMarker();
        $scope.clearCategorySpecialistOtherMarker();
        $scope.clearCategoryNewsMagazineStoreMarker();
        $scope.clearCategoryHospitalsMarker();
        $scope.clearCategoryModernPharmacyMarker();
        $scope.clearCategorySpecialityOtherMarker();
        $scope.clearCategoryBabyCenterMarker();
    };

    $scope.clearActiveMarker = function()
    {
        for (var key in activeMarker) 
        {
          activeMarker[key].setMap(null);
        };
    };

    $scope.clearInactiveMarker = function()
    {
        for (var key in inactiveMarker) 
        {
          inactiveMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySmallProvisionStoresMarker = function()
    {
        for (var key in categorySmallProvisionStoresMarker) 
        {
          categorySmallProvisionStoresMarker[key].setMap(null);
        };
    };

    $scope.clearchineseMedicalHallSmallMarker = function()
    {
        for (var key in chineseMedicalHallSmallMarker) 
        {
          chineseMedicalHallSmallMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryHypermarketMarker = function()
    {
        for (var key in categoryHypermarketMarker) 
        {
          categoryHypermarketMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryOtherInstitutionalMarker = function()
    {
        for (var key in categoryOtherInstitutionalMarker) 
        {
          categoryOtherInstitutionalMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryCateringMarker = function()
    {
        for (var key in categoryCateringMarker) 
        {
          categoryCateringMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySupermarketMarker = function()
    {
        for (var key in categorySupermarketMarker) 
        {
          categorySupermarketMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryLargeProvisionStoresMarker = function()
    {
        for (var key in categoryLargeProvisionStoresMarker) 
        {
          categoryLargeProvisionStoresMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryPetrolMartStationMarker = function()
    {
        for (var key in categoryPetrolMartStationMarker) 
        {
          categoryPetrolMartStationMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryRestaurantMarker = function()
    {
        for (var key in categoryRestaurantMarker) 
        {
          categoryRestaurantMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySchoolMarker = function()
    {
        for (var key in categorySchoolMarker) 
        {
          categorySchoolMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryPetShopMarker = function()
    {
        for (var key in categoryPetShopMarker) 
        {
          categoryPetShopMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryMediumProvisionStoresMarker = function()
    {
        for (var key in categoryMediumProvisionStoresMarker) 
        {
          categoryMediumProvisionStoresMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryChineseMedicalHallMarker = function()
    {
        for (var key in categoryChineseMedicalHallMarker) 
        {
          categoryChineseMedicalHallMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryChineseMedicalHallLargeMarker = function()
    {
        for (var key in categoryChineseMedicalHallLargeMarker) 
        {
          categoryChineseMedicalHallLargeMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryOtherConvenienceStoresMarker = function()
    {
        for (var key in categoryOtherConvenienceStoresMarker) 
        {
          categoryOtherConvenienceStoresMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryTraditionalPharmacyMarker = function()
    {
        for (var key in categoryTraditionalPharmacyMarker) 
        {
          categoryTraditionalPharmacyMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySpecialistFoodDrinkMarker = function()
    {
        for (var key in categorySpecialistFoodDrinkMarker) 
        {
          categorySpecialistFoodDrinkMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryBakeryMarker = function()
    {
        for (var key in categoryBakeryMarker) 
        {
          categoryBakeryMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryQSRMarker = function()
    {
        for (var key in categoryQSRMarker) 
        {
          categoryQSRMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryWholesaleMarker = function()
    {
        for (var key in categoryWholesaleMarker) 
        {
          categoryWholesaleMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryendingMachineMarker = function()
    {
        for (var key in categoryendingMachineMarker) 
        {
          categoryendingMachineMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySpecialistOtherMarker = function()
    {
        for (var key in categorySpecialistOtherMarker) 
        {
          categorySpecialistOtherMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryNewsMagazineStoreMarker = function()
    {
        for (var key in categoryNewsMagazineStoreMarker) 
        {
          categoryNewsMagazineStoreMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryHospitalsMarker = function()
    {
        for (var key in categoryHospitalsMarker) 
        {
          categoryHospitalsMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryModernPharmacyMarker = function()
    {
        for (var key in categoryModernPharmacyMarker) 
        {
          categoryModernPharmacyMarker[key].setMap(null);
        };
    };

    $scope.clearCategorySpecialityOtherMarker = function()
    {
        for (var key in categorySpecialityOtherMarker) 
        {
          categorySpecialityOtherMarker[key].setMap(null);
        };
    };

    $scope.clearCategoryBabyCenterMarker = function()
    {
        for (var key in categoryBabyCenterMarker) 
        {
          categoryBabyCenterMarker[key].setMap(null);
        };
    };

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
        console.log("--- slide1---", slide1);
        console.log("--- slide2---", slide2);
       // var restaurantsCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          //google.maps.places.type
          
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);
            var place = results[i];
            var object = {
                        "Name": place.name,
                        "Rating": place.rating,
                        "Address":place.formatted_address,
                        "Latitude": place.geometry.location.lat(),
                        "Longitude": place.geometry.location.lng(),
            };
            restaurants.push(object);


            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForRestaurant(results[i]);
                }
            }

          }

          //For removing duplicates and calculating distance from select stores to all pois
        //   console.log("--- Google Restaurants---", restaurants);
        //   // Array to keep track of duplicates
        //   var duplicates = [];
        //   $scope.AllInOneRestaurants = restaurants.filter(function(element) {
        //   // If it is not a duplicate, return true
        //   if (duplicates.indexOf(element.Name) == -1) 
        //   {
        //     duplicates.push(element.Name);
        //       return true;
        //   }
        //   return false;
        //   });
        //   console.log("---duplicates111---",duplicates);
        //   console.log("---$scope.AllInOneRestaurants NAME---",$scope.AllInOneRestaurants);

        //   for (var i = 0; i < restaurants.length; i++) 
        //   {
        //       var latitude1 = restaurants[i].Latitude;
        //       var longitude1 = restaurants[i].Longitude;
        //       for(var j = 0; j < restaurants.length; j++)
        //       {
        //         var latitude2 = restaurants[j].Latitude;
        //         var longitude2 = restaurants[j].Longitude;
        //         $scope.getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2,restaurants[i],restaurants[j]);
                
        //       }
        //   }

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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForAirport(results[i]);
                }
                else
                {
                    if( typeof results[i].rating == "undefined")
                    {
                        $scope.createPlacesMarkerForAirport(results[i]);
                    }
                }
            }

          }
        }
        // airportMarkersCluster = new MarkerClusterer(map, airportMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.stationsCallback = function(results, status)
    {
        //var airportCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForStations(results[i]);
                }
                else
                {
                    if( typeof results[i].rating == "undefined")
                    {
                        $scope.createPlacesMarkerForStations(results[i]);
                    }
                }
            }
          }
        }
    };

    $scope.barCallback = function(results, status)
    {
        //var barCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForBar(results[i]);
                }
                else
                {
                    if( typeof results[i].rating == "undefined")
                    {
                        console.log("---results[i].rating undefined---",results[i].rating);
                        $scope.createPlacesMarkerForBar(results[i]);
                    }
                }
            }
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForBusStop(results[i]);
                }
            }
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForCafe(results[i]);
                }
                else if( typeof results[i].rating == "undefined")
                {
                    $scope.createPlacesMarkerForCafe(results[i]);
                }
            }
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForCasino(results[i]);
                }
            }
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForLiquor(results[i]);
                }
            }
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForMealTakeAway(results[i]);
                }
            }
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForMovieTheater(results[i]);
                }
            }
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForNightClubs(results[i]);
                }
            }
              
            
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForPark(results[i]);
                }
            }
              
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForSuperMarket(results[i]);
                }
            }
              
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForSubway(results[i]);
                }
            }
              
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
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForShoppingMall(results[i]);
                }
            }
              
          }
        }
        // shoppingMallMarkersCluster = new MarkerClusterer(map, shoppingMallMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.transitStationCallback = function(results, status)
    {
        //var movieTheaterCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForTransitStation(results[i]);
                }
            }
          }
        }
        
        // movietheatermarkersCluster = new MarkerClusterer(map, movietheatermarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.lodgingCallback = function(results, status)
    {
        //var movieTheaterCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForLodging(results[i]);
                }
            }
          }
        }
        
        // movietheatermarkersCluster = new MarkerClusterer(map, movietheatermarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.gymCallback = function(results, status)
    {
        //var movieTheaterCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {
            $scope.googlePOIsArray.push(results[i]);

            if( slide1 != null && slide2 != null )
            {
                if( results[i].rating > slide1 && results[i].rating < slide2 )
                {
                    $scope.createPlacesMarkerForGym(results[i]);
                }
            }
          }
        }
        
        // movietheatermarkersCluster = new MarkerClusterer(map, movietheatermarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.createPlacesMarkerForZomatoRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        locationLatLng = new google.maps.LatLng(place.location.latitude, place.location.longitude); 
        var image = 'images/zomatoicon.png';
        
        //infowindowplacesmarker = new google.maps.InfoWindow();
        infowindowplacesmarker = new google.maps.InfoWindow({maxWidth:250});
        
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
              console.log("---Zomato error 1---:",error);
            });

            infowindowplacesmarker.open(map, this);
            infowindowsCollection.push(infowindowplacesmarker);
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
          restaurantsMarkers.push(restaurantMarker); 
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

    $scope.createPlacesMarkerForStations = function(place)
    {
        $scope.clearInfoWindow();
        var image = 'images/busstop.png';

        infowindowplacesmarker = new google.maps.InfoWindow();
        var placeLoc = place.geometry.location;
        stationsMarker = new google.maps.Marker({
        map : map,
        icon : image,
        position : place.geometry.location
        });

        google.maps.event.addListener(stationsMarker, 'click', function() {
        infowindowplacesmarker.setContent( "Name     : " + place.name
                                        + "<br>" + "Ratings     : " + place.rating);
                                        //+ "<br>" + "Address     : " + place.formatted_address
                                        //+ "<br>" + "Phone Number: " + place.formatted_phone_number);
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        showDirectionsForLocations(dirLatLng,placeLoc);
        });
        stationMarkers.push(stationsMarker); 
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

    $scope.createPlacesMarkerForTransitStation= function(place) {
        $scope.clearInfoWindow();
        //http://maps.google.com/mapfiles/ms/icons/" + color + ".png
        //var image = 'http://maps.google.com/mapfiles/kml/pal2/icon19.png';
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
                                           // + "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        transitStationMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForLodging = function(place) {
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
                                            //+ "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        lodgingMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForGym= function(place) {
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
                                            //+ "<br>" + "isOpen      : " + place.opening_hours.open
                                        );
        infowindowplacesmarker.open(map, this);
        infowindowsCollection.push(infowindowplacesmarker);
        //showDirectionsForLocations(dirLatLng,placeLoc);
        });
        gymMarkers.push(restaurantMarker); 
    };

    var newStores = [
      {
        "OUTLET_CODE": "AC519730",
        "ADDRESS": "14, JALAN DATO ABDULLAH, RAUB,PAHANG D.M   27600", 
        "geocodeaddress":"NO. 14, Jalan Dato Abdullah, Pahang, 27600 Raub District, Malaysia",
        "latitude":3.793157,
        "longitude":101.85628300000008,
        "POSTAL_CODE": "27600",
        "PLACE": "Raub",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "6/17/2016",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS": 21,
        "NO_OF_INVOICES": 25,
        "TOTAL_INVOICE_AMOUNT": " 11,668 ",
        "TOTAL_PRODUCT_LINES": "155",
        "AVERAGE_PURCHASE_PER_MONTH":556,
        "AVERAGE_PURCHASE_PER_INVOICE":467,
        "AVERAGE_LINES_PER_INVOICE":6.20,
        "Beauty and Personal Care": " 423 ",
        "Consumer Health": " 7,397 ",
        "Health and Wellness": " 321 ",
        "Home Care": " 264 ",
        "Packaged Food": " 2,433 ",
        "Soft Drinks": " 829 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC519868",
        "ADDRESS": "LOT 2858,SIMPANG SONGSANG, TEMERLOH,PAHANG D.M. 28000",
        "geocodeaddress":"5, Lot 5077, Simpang songsang, Mentakab,, Jalan Temerloh Jaya, Taman Temerloh Jaya, 28000 Temerloh, Pahang, Malaysia",
        "latitude":3.4697601,
        "longitude":102.38053939999998,
        "POSTAL_CODE": "28000",
        "PLACE": "Temerloh",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Petrol Mart Station",
        "INVOICE_START_DATE": "6/30/2016",
        "INVOICE_END_DATE": "3/27/2018",
        "MONTHS": 20,
        "NO_OF_INVOICES": 14,
        "TOTAL_INVOICE_AMOUNT": " 2,530 ",
        "TOTAL_PRODUCT_LINES": "53",
        "AVERAGE_PURCHASE_PER_MONTH":126,
        "AVERAGE_PURCHASE_PER_INVOICE":181,
        "AVERAGE_LINES_PER_INVOICE":3.79,
        "Beauty and Personal Care": " 209 ",
        "Consumer Health": " 2,140 ",
        "Health and Wellness": "",
        "Home Care": " 181 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC519910",
        "ADDRESS": "LOT 16773,MUKIM GALI,  RAUB, PAHANG DARUL MAKMUR.  27600",
        "geocodeaddress":"Lot 16773, Jalan Air Putih, Mukim Gali, 26720, Raub, Pahang, 26720 Raub District, Malaysia",
        "latitude":3.7967317,
        "longitude":101.8631325,
        "POSTAL_CODE": "27600",
        "PLACE": "Raub",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "6/23/2016",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS":21,
        "NO_OF_INVOICES":61,
        "TOTAL_INVOICE_AMOUNT": " 124,528 ",
        "TOTAL_PRODUCT_LINES": "670",
        "AVERAGE_PURCHASE_PER_MONTH":5930 ,
        "AVERAGE_PURCHASE_PER_INVOICE":2041 ,
        "AVERAGE_LINES_PER_INVOICE":10.98,
        "Beauty and Personal Care": " 40,358 ",
        "Consumer Health": " 11,579 ",
        "Health and Wellness": "",
        "Home Care": " 67,059 ",
        "Packaged Food": " 405 ",
        "Soft Drinks": " 5,126 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521374",
        "ADDRESS": "NO. 5, JALAN PERJIRANAN 10, PASIR GUDANG, JOHOR. NO. LESEN BERAS : 23229 JOHOR  -",
        "geocodeaddress":"Pasir Gudang, Johor, Malaysia",
        "latitude":1.470288,
        "longitude":103.90296890000002,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "6/24/2016",
        "INVOICE_END_DATE": "3/6/2018",
        "MONTHS": 20,
        "NO_OF_INVOICES": 28,
        "TOTAL_INVOICE_AMOUNT": " 29,379 ",
        "TOTAL_PRODUCT_LINES": "538",
        "AVERAGE_PURCHASE_PER_MONTH": 1469,
        "AVERAGE_PURCHASE_PER_INVOICE": 1049,
        "AVERAGE_LINES_PER_INVOICE": 19.21,
        "Beauty and Personal Care": " 7,535 ",
        "Consumer Health": " 10,956 ",
        "Health and Wellness": " 36 ",
        "Home Care": " 9,895 ",
        "Packaged Food": " 660 ",
        "Soft Drinks": " 297 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521439",
        "ADDRESS": "17, TAMAN SRI KULAI BARU 81000 KULAI JOHOR TEL:076633930 JOHOR  -",
        "geocodeaddress":"12, Jalan Susur Kulai 4, Taman Sri Kulai Baru, 81000 Kulai, Johor, Malaysia",
        "latitude":1.665957,
        "longitude":103.59223199999997,
        "POSTAL_CODE": "81000",
        "PLACE": "Kulai",
        "STATE": "Johor",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "5/26/2016",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS": 22,
        "NO_OF_INVOICES": 24,
        "TOTAL_INVOICE_AMOUNT": " 3,471 ",
        "TOTAL_PRODUCT_LINES": "79",
        "AVERAGE_PURCHASE_PER_MONTH":158,
        "AVERAGE_PURCHASE_PER_INVOICE":145,
        "AVERAGE_LINES_PER_INVOICE":3.29,
        "Beauty and Personal Care": " 196 ",
        "Consumer Health": " 3,077 ",
        "Health and Wellness": " 89 ",
        "Home Care": " 98 ",
        "Packaged Food": "",
        "Soft Drinks": " 12 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521565",
        "ADDRESS": "( KIP MART TAMPOI ) LOT NO. F6, PTD 129842, JALAN SKUDAI LAMA, TAMPOI. JOHOR  -",
        "geocodeaddress":"Jalan Skudai Lama, Taman Tampoi Indah, 81200 Johor Bahru, Johor, Malaysia",
        "latitude":1.509139,
        "longitude":103.687222,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "4/25/2016",
        "INVOICE_END_DATE": "4/3/2018",
        "MONTHS": 23,
        "NO_OF_INVOICES": 212,
        "TOTAL_INVOICE_AMOUNT": " 903,689 ",
        "TOTAL_PRODUCT_LINES": "2280",
        "AVERAGE_PURCHASE_PER_MONTH":39291,
        "AVERAGE_PURCHASE_PER_INVOICE":4263,
        "AVERAGE_LINES_PER_INVOICE":10.75,
        "Beauty and Personal Care": " 387,720 ",
        "Consumer Health": " 26,958 ",
        "Health and Wellness": " 120 ",
        "Home Care": " 482,799 ",
        "Packaged Food": "",
        "Soft Drinks": " 6,092 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521666",
        "ADDRESS": "17-24, PERJIRANAN 8, JALAN 10/17 81750, PASIR GUDANG , JOHOR. NO. LESEN BERAS : 19890 JOHOR  -",
        "geocodeaddress":"8, Jalan 10/17, Taman Air Biru, 81700 Pasir Gudang, Johor, Malaysia",
        "latitude":1.4601072,
        "longitude":103.90752240000006,
        "POSTAL_CODE": "81750",
        "PLACE": "Masai",
        "STATE": "Johor",
        "CHANNEL_HIERARCHY": "Large Provision Stores",
        "INVOICE_START_DATE": "4/23/2016",
        "INVOICE_END_DATE": "2/27/2018",
        "MONTHS": 22,
        "NO_OF_INVOICES": 26,
        "TOTAL_INVOICE_AMOUNT": " 39,697 ",
        "TOTAL_PRODUCT_LINES": "581",
        "AVERAGE_PURCHASE_PER_MONTH":1804,
        "AVERAGE_PURCHASE_PER_INVOICE":1527,
        "AVERAGE_LINES_PER_INVOICE":22.35,
        "Beauty and Personal Care": " 9,399 ",
        "Consumer Health": " 1,292 ",
        "Health and Wellness": " 92 ",
        "Home Care": " 28,584 ",
        "Packaged Food": " 167 ",
        "Soft Drinks": " 164 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521800",
        "ADDRESS": "27,JALAN PEDADA, TAMAN KOTA JAYA, KOTA TINGGI, JOHOR.   TEL : 8832003 JOHOR  -",
        "geocodeaddress":"27, Jalan Pedada, Taman Kota Jaya, 81900 Kota Tinggi, Johor, Malaysia",
        "latitude":1.7381407,
        "longitude":103.88986750000004,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "5/25/2016",
        "INVOICE_END_DATE": "2/25/2018",
        "MONTHS":21,
        "NO_OF_INVOICES":20,
        "TOTAL_INVOICE_AMOUNT": " 10,762 ",
        "TOTAL_PRODUCT_LINES": "363",
        "AVERAGE_PURCHASE_PER_MONTH":512,
        "AVERAGE_PURCHASE_PER_INVOICE":538,
        "AVERAGE_LINES_PER_INVOICE":18.15,
        "Beauty and Personal Care": " 1,534 ",
        "Consumer Health": " 2,625 ",
        "Health and Wellness": " 15 ",
        "Home Care": " 5,759 ",
        "Packaged Food": " 238 ",
        "Soft Drinks": " 590 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521993",
        "ADDRESS": "NO.88,JALAN IBRAHIM SULTAN , STULANG LAUT , 80300 JOHOR BAHRU ,JOHOR. TEL:07-22 JOHOR  -",
        "geocodeaddress":"Berjaya Waterfront Sdn. Bhd., 88, Jalan Ibrahim Sultan, Duty Free Zone, 80300 Johor Bahru, Johor, Malaysia",
        "latitude":1.4711281,
        "longitude":103.78458899999998,
        "POSTAL_CODE": "80300",
        "PLACE": "Johor Bahru",
        "STATE": "Johor",
        "CHANNEL_HIERARCHY": "Convenience Store",
        "INVOICE_START_DATE": "6/8/2016",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS": 21,
        "NO_OF_INVOICES":31,
        "TOTAL_INVOICE_AMOUNT": " 24,076 ",
        "TOTAL_PRODUCT_LINES": "186",
        "AVERAGE_PURCHASE_PER_MONTH":1146,
        "AVERAGE_PURCHASE_PER_INVOICE":777,
        "AVERAGE_LINES_PER_INVOICE":6.00,
        "Beauty and Personal Care": " 5,684 ",
        "Consumer Health": " 10,425 ",
        "Health and Wellness": " 7,894 ",
        "Home Care": " 72 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC521994",
        "ADDRESS": "BLOCK 15, JALAN TANJUNG PUTERI, TAMAN PUTERI RESORT, PASIR GUDANG. JOHOR  817500",
        "geocodeaddress":"Jalan Tanjong Puteri 1, Tanjong Puteri Resort, 81700 Pasir Gudang, Johor, Malaysia",
        "latitude":1.447873,
        "longitude":103.93906400000003,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "4/30/2016",
        "INVOICE_END_DATE": "3/20/2018",
        "MONTHS":22,
        "NO_OF_INVOICES":25,
        "TOTAL_INVOICE_AMOUNT": " 15,931 ",
        "TOTAL_PRODUCT_LINES": "362",
        "AVERAGE_PURCHASE_PER_MONTH":724,
        "AVERAGE_PURCHASE_PER_INVOICE":637,
        "AVERAGE_LINES_PER_INVOICE":14.48,
        "Beauty and Personal Care": " 7,430 ",
        "Consumer Health": " 1,292 ",
        "Health and Wellness": " 10 ",
        "Home Care": " 7,082 ",
        "Packaged Food": " 24 ",
        "Soft Drinks": " 94 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC522131",
        "ADDRESS": "LOT 8065, JALAN LIMA KELAPA SAWIT 81030 KULAI,JOHOR TEL:07-6525260 JOHOR  -",
        "geocodeaddress":"Kelapa Sawit, 81000 Kulai, Johor, Malaysia",
        "latitude":1.679482,
        "longitude":103.52587719999997,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Large Provision Stores",
        "INVOICE_START_DATE": "6/23/2016",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS":21,
        "NO_OF_INVOICES":22,
        "TOTAL_INVOICE_AMOUNT": " 15,566 ",
        "TOTAL_PRODUCT_LINES": "445",
        "AVERAGE_PURCHASE_PER_MONTH":741,
        "AVERAGE_PURCHASE_PER_INVOICE":708,
        "AVERAGE_LINES_PER_INVOICE":20.23,
        "Beauty and Personal Care": " 2,163 ",
        "Consumer Health": " 6,238 ",
        "Health and Wellness": " 119 ",
        "Home Care": " 6,676 ",
        "Packaged Food": " 125 ",
        "Soft Drinks": " 246 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC522132",
        "ADDRESS": "1738-1741, JALAN SRI PUTERI 4 TAMAN SRI PUTERI 81700 KULAI,JOHOR TEL:07-8621032 JOHOR  -",
        "geocodeaddress":"No. 6, Jalan Emas 29, Taman Sri Puteri, 81300, Skudai, Johor, 81300, Malaysia",
        "latitude":1.5437152,
        "longitude":103.65535769999997,
        "POSTAL_CODE": "81700",
        "PLACE": "Pasir Gudang",
        "STATE": "Johor",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "4/25/2016",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":22,
        "NO_OF_INVOICES":34,
        "TOTAL_INVOICE_AMOUNT": " 75,699 ",
        "TOTAL_PRODUCT_LINES": "922",
        "AVERAGE_PURCHASE_PER_MONTH":3441,
        "AVERAGE_PURCHASE_PER_INVOICE":2226,
        "AVERAGE_LINES_PER_INVOICE":27.12,
        "Beauty and Personal Care": " 22,583 ",
        "Consumer Health": " 17,250 ",
        "Health and Wellness": " 164 ",
        "Home Care": " 33,152 ",
        "Packaged Food": "",
        "Soft Drinks": " 2,550 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC522366",
        "ADDRESS": "74, JALAN UTARID U5/19 MAH SING INTEGRATED INDUSTRIAL PARK SECTION U5, 40150 SHAH ALAM SELANGOR   -",
        "geocodeaddress":"No. 74, 76 & 78, Jalan Utarid U5/19,, Mah Sing Integrated Industrial Park, Subang U5, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.1747451,
        "longitude":101.53383680000002,
        "POSTAL_CODE": "40150",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "7/15/2016",
        "INVOICE_END_DATE": "12/28/2017",
        "MONTHS":17,
        "NO_OF_INVOICES":6,
        "TOTAL_INVOICE_AMOUNT": " 10,346 ",
        "TOTAL_PRODUCT_LINES": "6",
        "AVERAGE_PURCHASE_PER_MONTH":609,
        "AVERAGE_PURCHASE_PER_INVOICE":1724,
        "AVERAGE_LINES_PER_INVOICE":1.00,
        "Beauty and Personal Care": "",
        "Consumer Health": " 10,346 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523278",
        "ADDRESS": "NO:3, JALAN BATU LAUT 28/5, TAMAN ALAM MEGAH, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"3, Jalan Batu Laut 28/5, Taman Alam Megah, 40400 Shah Alam, Selangor, Malaysia",
        "latitude":3.0061401,
        "longitude":101.56866349999996,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "12/29/2016",
        "INVOICE_END_DATE": "3/30/2018",
        "MONTHS":15,
        "NO_OF_INVOICES":12,
        "TOTAL_INVOICE_AMOUNT": " 1,858 ",
        "TOTAL_PRODUCT_LINES": "48",
        "AVERAGE_PURCHASE_PER_MONTH":124,
        "AVERAGE_PURCHASE_PER_INVOICE":155,
        "AVERAGE_LINES_PER_INVOICE":4.00,
        "Beauty and Personal Care": " 570 ",
        "Consumer Health": " 480 ",
        "Health and Wellness": " 20 ",
        "Home Care": " 788 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523288",
        "ADDRESS": "LEBUHRAYA KL-KLANG LOT 711, SEKSYEN 16, LEBUHRAYA PERSEKUTUAN 2, 40000 SHAH ALAM, SELANGOR D.E.  40000",
        "geocodeaddress":"2, Malaysia",
        "latitude":3.0623652,
        "longitude":101.5020303,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Petrol Mart Station",
        "INVOICE_START_DATE": "11/23/2016",
        "INVOICE_END_DATE": "3/23/2018",
        "MONTHS":16,
        "NO_OF_INVOICES":14,
        "TOTAL_INVOICE_AMOUNT": " 2,528 ",
        "TOTAL_PRODUCT_LINES": "51",
        "AVERAGE_PURCHASE_PER_MONTH":158,
        "AVERAGE_PURCHASE_PER_INVOICE":181,
        "AVERAGE_LINES_PER_INVOICE":3.64,
        "Beauty and Personal Care": " 24 ",
        "Consumer Health": " 1,942 ",
        "Health and Wellness": " 558 ",
        "Home Care": " 5 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523337",
        "ADDRESS": "NO:1, JALAN 6/1F, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.   -",
        "geocodeaddress":"1, Jalan 6, Taman Subang Baru, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.1541345,
        "longitude":101.5284557,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/21/2016",
        "INVOICE_END_DATE": "3/1/2018",
        "MONTHS":16,
        "NO_OF_INVOICES":14,
        "TOTAL_INVOICE_AMOUNT": " 13,971 ",
        "TOTAL_PRODUCT_LINES": "299",
        "AVERAGE_PURCHASE_PER_MONTH":873,
        "AVERAGE_PURCHASE_PER_INVOICE":998,
        "AVERAGE_LINES_PER_INVOICE":21.36,
        "Beauty and Personal Care": " 2,129 ",
        "Consumer Health": " 5,122 ",
        "Health and Wellness": " 711 ",
        "Home Care": " 5,638 ",
        "Packaged Food": " 107 ",
        "Soft Drinks": " 264 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523748",
        "ADDRESS": "NO:21, JALAN WAU A11/A, SEKSYEN 11, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"Seksyen 11, 40100 Shah Alam, Selangor, Malaysia",
        "latitude":3.07411,
        "longitude":101.52877999999998,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "11/15/2016",
        "INVOICE_END_DATE": "4/6/2018",
        "MONTHS":16,
        "NO_OF_INVOICES":13,
        "TOTAL_INVOICE_AMOUNT": " 8,723 ",
        "TOTAL_PRODUCT_LINES": "193",
        "AVERAGE_PURCHASE_PER_MONTH":545,
        "AVERAGE_PURCHASE_PER_INVOICE":671,
        "AVERAGE_LINES_PER_INVOICE":14.85,
        "Beauty and Personal Care": " 1,700 ",
        "Consumer Health": " 2,520 ",
        "Health and Wellness": " 171 ",
        "Home Care": " 4,156 ",
        "Packaged Food": " 36 ",
        "Soft Drinks": " 141 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523781",
        "ADDRESS": "NO:14, LORONG BERLIAN 1, TAMAN BATU 3, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"14, Lorong Berlian 1, Taman Batu Tiga, 40150 Subang Jaya, Selangor, Malaysia",
        "latitude":3.0743581,
        "longitude":101.56213709999997,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "12/29/2016",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":14,
        "NO_OF_INVOICES":12,
        "TOTAL_INVOICE_AMOUNT": " 1,133 ",
        "TOTAL_PRODUCT_LINES": "26",
        "AVERAGE_PURCHASE_PER_MONTH":81,
        "AVERAGE_PURCHASE_PER_INVOICE":94,
        "AVERAGE_LINES_PER_INVOICE":2.17,
        "Beauty and Personal Care": " 54 ",
        "Consumer Health": " 896 ",
        "Health and Wellness": " 5 ",
        "Home Care": " 75 ",
        "Packaged Food": " 103 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523895",
        "ADDRESS": "NO. 15 & 17, JALAN 27/60, TAMAN ALAM MEGAH, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"Taman Alam Megah, 40400 Shah Alam, Selangor, Malaysia",
        "latitude":3.003565,
        "longitude":101.55995889999997,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/19/2016",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":17,
        "NO_OF_INVOICES":20,
        "TOTAL_INVOICE_AMOUNT": " 14,143 ",
        "TOTAL_PRODUCT_LINES": "323",
        "AVERAGE_PURCHASE_PER_MONTH":832,
        "AVERAGE_PURCHASE_PER_INVOICE":707,
        "AVERAGE_LINES_PER_INVOICE":16.15,
        "Beauty and Personal Care": " 2,201 ",
        "Consumer Health": " 3,290 ",
        "Health and Wellness": " 467 ",
        "Home Care": " 7,429 ",
        "Packaged Food": " 440 ",
        "Soft Drinks": " 317 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC523961",
        "ADDRESS": "LOT PT 8834, 3KM JALAN CHEROH,  RAUB, PAHANG DARUL MAKMUR.  27600",
        "geocodeaddress":"Jalan Cheroh, 27600 Raub, Pahang, Malaysia",
        "latitude":3.7949123,
        "longitude":101.85642089999999,
        "POSTAL_CODE": "27600",
        "PLACE": "Raub",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Petrol Mart Station",
        "INVOICE_START_DATE": "7/14/2016",
        "INVOICE_END_DATE": "4/6/2018",
        "MONTHS":20,
        "NO_OF_INVOICES":18,
        "TOTAL_INVOICE_AMOUNT": " 6,261 ",
        "TOTAL_PRODUCT_LINES": "74",
        "AVERAGE_PURCHASE_PER_MONTH":313,
        "AVERAGE_PURCHASE_PER_INVOICE":348,
        "AVERAGE_LINES_PER_INVOICE":4.11,
        "Beauty and Personal Care": "",
        "Consumer Health": " 6,261 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC524012",
        "ADDRESS": "2 KM, JALAN TRAS,  RAUB, PAHANG DARUL MAKMUR.  27600",
        "geocodeaddress":"Lot 1460, Jalan Tras, Mukim Tras,, 27600 Raub District, Pahang, Malaysia",
        "latitude":3.664257,
        "longitude":101.84228800000005,
        "POSTAL_CODE": "27600",
        "PLACE": "Raub",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Petrol Mart Station",
        "INVOICE_START_DATE": "7/16/2016",
        "INVOICE_END_DATE": "4/4/2018",
        "MONTHS":20,
        "NO_OF_INVOICES":20,
        "TOTAL_INVOICE_AMOUNT": " 6,596 ",
        "TOTAL_PRODUCT_LINES": "91",
        "AVERAGE_PURCHASE_PER_MONTH":330,
        "AVERAGE_PURCHASE_PER_INVOICE":330,
        "AVERAGE_LINES_PER_INVOICE":4.55,
        "Beauty and Personal Care": " 26 ",
        "Consumer Health": " 6,436 ",
        "Health and Wellness": " 21 ",
        "Home Care": " 113 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC524636",
        "ADDRESS": "NO.5 , BLOK A, FELDA KERATONG 8 MUADZAM SHA  PAHANG  26700",
        "geocodeaddress":"No.203,block 9, 9,, Felda Keratong, 26700 Muadzam Shah, Pahang, Malaysia",
        "latitude":2.96087,
        "longitude":102.98069299999997,
        "POSTAL_CODE": "26700",
        "PLACE": "Muadzam Shah",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "9/14/2016",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS":18,
        "NO_OF_INVOICES":20,
        "TOTAL_INVOICE_AMOUNT": " 7,446 ",
        "TOTAL_PRODUCT_LINES": "336",
        "AVERAGE_PURCHASE_PER_MONTH":414,
        "AVERAGE_PURCHASE_PER_INVOICE":372,
        "AVERAGE_LINES_PER_INVOICE":16.80,
        "Beauty and Personal Care": " 1,892 ",
        "Consumer Health": " 1,782 ",
        "Health and Wellness": " 91 ",
        "Home Care": " 3,505 ",
        "Packaged Food": " 95 ",
        "Soft Drinks": " 82 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC524771",
        "ADDRESS": "KG. KOHIZAN 88200 PENAMPANG (NT 213193349) SABAH  88200",
        "geocodeaddress":"Lorong Kohizan, 88200 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.9272087,
        "longitude":116.08084209999993,
        "POSTAL_CODE": "88200",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "7/31/2017",
        "INVOICE_END_DATE": "7/31/2017",
        "MONTHS": 0,
        "NO_OF_INVOICES": 4,
        "TOTAL_INVOICE_AMOUNT": " 963 ",
        "TOTAL_PRODUCT_LINES": "25",
        "AVERAGE_PURCHASE_PER_MONTH": 0,
        "AVERAGE_PURCHASE_PER_INVOICE": 241,
        "AVERAGE_LINES_PER_INVOICE": 6.25,
        "Beauty and Personal Care": " 485 ",
        "Consumer Health": " 108 ",
        "Health and Wellness": "",
        "Home Care": " 324 ",
        "Packaged Food": "",
        "Soft Drinks": " 47 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC524832",
        "ADDRESS": "c/o HARRISONS SARAWAK SDN BHD P.O.BOX 128 93700 KUCHING   93700",
        "geocodeaddress":"Kuching, Sarawak, Malaysia",
        "latitude":1.553504,
        "longitude":110.35929269999997,
        "POSTAL_CODE": "93700",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "2/28/2017",
        "INVOICE_END_DATE": "2/28/2017",
        "MONTHS":0,
        "NO_OF_INVOICES":1,
        "TOTAL_INVOICE_AMOUNT": " 28 ",
        "TOTAL_PRODUCT_LINES": "2",
        "AVERAGE_PURCHASE_PER_MONTH":0,
        "AVERAGE_PURCHASE_PER_INVOICE":28,
        "AVERAGE_LINES_PER_INVOICE":2.00,
        "Beauty and Personal Care": " 28 ",
        "Consumer Health": "",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC525321",
        "ADDRESS": "LOT 3569, BLK 217, KNLD, (S/L1) GF, NO.140, CARINA ESTATE JLN STAPOK UTAMA,  93250 KUCHING SARAWAK 93250",
        "geocodeaddress":"140, Engsing TImur Lorong 12, 93250 Kuching, Sarawak, Malaysia",
        "latitude":1.5246441,
        "longitude":110.31213409999998,
        "POSTAL_CODE": "93250",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "12/5/2016",
        "INVOICE_END_DATE": "11/20/2017",
        "MONTHS":11,
        "NO_OF_INVOICES":8,
        "TOTAL_INVOICE_AMOUNT": " 5,510 ",
        "TOTAL_PRODUCT_LINES": "203",
        "AVERAGE_PURCHASE_PER_MONTH":501,
        "AVERAGE_PURCHASE_PER_INVOICE":689,
        "AVERAGE_LINES_PER_INVOICE":25.38,
        "Beauty and Personal Care": " 913 ",
        "Consumer Health": " 1,346 ",
        "Health and Wellness": " 732 ",
        "Home Care": " 2,498 ",
        "Packaged Food": "",
        "Soft Drinks": " 21 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC525439",
        "ADDRESS": "GRD FLR, LOT NO.42, NO. 30-0, BLK F, DAMAI PLAZA, PHASE IV, LUYANG, 88300 KOTA KINABALU, SABAH   88300",
        "geocodeaddress":"Block E, Ground Floor, Lot 37, No.40-0, Damai Plaza 4, 88300 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.9619239,
        "longitude":116.09138129999997,
        "POSTAL_CODE": "88300",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Convenience Store",
        "INVOICE_START_DATE": "11/15/2016",
        "INVOICE_END_DATE": "2/28/2018",
        "MONTHS":15,
        "NO_OF_INVOICES":13,
        "TOTAL_INVOICE_AMOUNT": " 2,084 ",
        "TOTAL_PRODUCT_LINES": "35",
        "AVERAGE_PURCHASE_PER_MONTH":139,
        "AVERAGE_PURCHASE_PER_INVOICE":160,
        "AVERAGE_LINES_PER_INVOICE":2.69,
        "Beauty and Personal Care": "",
        "Consumer Health": " 1,551 ",
        "Health and Wellness": "",
        "Home Care": " 399 ",
        "Packaged Food": "",
        "Soft Drinks": " 135 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC526386",
        "ADDRESS": "LORONG LOK BONU, JALAN RAMAYAH PUTATAN PENAMPANG, KOTA KINABALU SABAH  88200",
        "geocodeaddress":"88200, Sabah, Malaysia",
        "latitude":5.9123426,
        "longitude":116.05616529999998,
        "POSTAL_CODE": "88200",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "8/9/2017",
        "INVOICE_END_DATE": "8/9/2017",
        "MONTHS":0,
        "NO_OF_INVOICES":7,
        "TOTAL_INVOICE_AMOUNT": " 1,691 ",
        "TOTAL_PRODUCT_LINES": "48",
        "AVERAGE_PURCHASE_PER_MONTH":0,
        "AVERAGE_PURCHASE_PER_INVOICE":242,
        "AVERAGE_LINES_PER_INVOICE":6.86,
        "Beauty and Personal Care": " 328 ",
        "Consumer Health": " 713 ",
        "Health and Wellness": "",
        "Home Care": " 649 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC526447",
        "ADDRESS": "B-G-16, VISTA ALAM, JALAN IKHTISAS, SEKSYEN 14, 40000 SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"Jalan Ikhtisas, Seksyen 14/1, 40000 Shah Alam, Selangor, Malaysia",
        "latitude":3.0707144,
        "longitude":101.52422669999999,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "8/14/2017",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS":7,
        "NO_OF_INVOICES":8,
        "TOTAL_INVOICE_AMOUNT": " 1,117 ",
        "TOTAL_PRODUCT_LINES": "39",
        "AVERAGE_PURCHASE_PER_MONTH":160,
        "AVERAGE_PURCHASE_PER_INVOICE":140,
        "AVERAGE_LINES_PER_INVOICE":4.88,
        "Beauty and Personal Care": " 247 ",
        "Consumer Health": " 586 ",
        "Health and Wellness": " 5 ",
        "Home Care": " 279 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC526875",
        "ADDRESS": "54,JALAN 8/38D , PLAZA SINAR TAMAN SRI SINAR   51200 KUALA LUMPUR",
        "geocodeaddress":"Jalan 8/38d, Taman Sri Sinar, 51200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.1894466,
        "longitude":101.6533068,
        "POSTAL_CODE": "51200",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "10/13/2017",
        "INVOICE_END_DATE": "3/28/2018",
        "MONTHS":5,
        "NO_OF_INVOICES":2,
        "TOTAL_INVOICE_AMOUNT": " 133 ",
        "TOTAL_PRODUCT_LINES": "4",
        "AVERAGE_PURCHASE_PER_MONTH":27,
        "AVERAGE_PURCHASE_PER_INVOICE":66,
        "AVERAGE_LINES_PER_INVOICE":2.00,
        "Beauty and Personal Care": " 37 ",
        "Consumer Health": " 26 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": "",
        "Soft Drinks": " 70 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC526900",
        "ADDRESS": "3441 JALAN JINJANG AMAN 1 JINJANG UTARA   52000 KUALA LUMPUR",
        "geocodeaddress":"Jalan Jinjang Aman 1, Jinjang Utara, 52000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.2115728,
        "longitude":101.65824569999995,
        "POSTAL_CODE": "52000",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "10/19/2017",
        "INVOICE_END_DATE": "3/19/2018",
        "MONTHS":5,
        "NO_OF_INVOICES":5,
        "TOTAL_INVOICE_AMOUNT": " 7,697 ",
        "TOTAL_PRODUCT_LINES": "22",
        "AVERAGE_PURCHASE_PER_MONTH":1539,
        "AVERAGE_PURCHASE_PER_INVOICE":1539,
        "AVERAGE_LINES_PER_INVOICE":4.40,
        "Beauty and Personal Care": "",
        "Consumer Health": " 5,413 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": " 2,284 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC527044",
        "ADDRESS": "NO.12, JALAN DATO ABDULLAH,  RAUB, PAHANG DARUL MAKMUR.  27600",
        "geocodeaddress":"12, Jalan Dato Abdullah, 27600 Raub, Pahang, Malaysia",
        "latitude":3.7930137,
        "longitude":101.85624819999998,
        "POSTAL_CODE": "27600",
        "PLACE": "Raub",
        "STATE": "Pahang",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "11/11/2017",
        "INVOICE_END_DATE": "2/6/2018",
        "MONTHS":2,
        "NO_OF_INVOICES":3,
        "TOTAL_INVOICE_AMOUNT": " 1,095 ",
        "TOTAL_PRODUCT_LINES": "10",
        "AVERAGE_PURCHASE_PER_MONTH":547,
        "AVERAGE_PURCHASE_PER_INVOICE":365,
        "AVERAGE_LINES_PER_INVOICE":3.33,
        "Beauty and Personal Care": " 312 ",
        "Consumer Health": " 652 ",
        "Health and Wellness": "",
        "Home Care": " 70 ",
        "Packaged Food": " 59 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC527053",
        "ADDRESS": "NO.6, LOT 12, KKIP INDUSTRIAL ZONE 7 (IZ7), PHASE 1, LORONG 2A, KKIP TIMUR, 88450 KOTA KINABALU, SABAH.   88450",
        "geocodeaddress":"88450 Kota Kinabalu Sabah Malaysia","latitude":5.977751,
        "longitude":116.147781,
        "POSTAL_CODE": "88450",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Large Provision Stores",
        "INVOICE_START_DATE": "11/17/2017",
        "INVOICE_END_DATE": "3/28/2018",
        "MONTHS":4,
        "NO_OF_INVOICES":28,
        "TOTAL_INVOICE_AMOUNT": " 242,049 ",
        "TOTAL_PRODUCT_LINES": "154",
        "AVERAGE_PURCHASE_PER_MONTH":60512,
        "AVERAGE_PURCHASE_PER_INVOICE":8645,
        "AVERAGE_LINES_PER_INVOICE":5.50,
        "Beauty and Personal Care": " 78,586 ",
        "Consumer Health": " 35,155 ",
        "Health and Wellness": " 11,433 ",
        "Home Care": " 91,439 ",
        "Packaged Food": " 15,325 ",
        "Soft Drinks": " 10,110 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC527343",
        "ADDRESS": "R-15-G M-CITY AMPANG, NO .326,JALAN AMPANG KUALA LUMPUR   50450",
        "geocodeaddress":"Jalan Ampang, Kampung Berembang, 55000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.1590631,
        "longitude":101.74733330000004,
        "POSTAL_CODE": "50450",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "2/13/2018",
        "INVOICE_END_DATE": "3/26/2018",
        "MONTHS":1,
        "NO_OF_INVOICES":6,
        "TOTAL_INVOICE_AMOUNT": " 21,637 ",
        "TOTAL_PRODUCT_LINES": "166",
        "AVERAGE_PURCHASE_PER_MONTH":21637,
        "AVERAGE_PURCHASE_PER_INVOICE":3606,
        "AVERAGE_LINES_PER_INVOICE":27.67,
        "Beauty and Personal Care": " 7,595 ",
        "Consumer Health": " 2,835 ",
        "Health and Wellness": " 2,519 ",
        "Home Care": " 8,476 ",
        "Packaged Food": " 71 ",
        "Soft Drinks": " 141 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC527461",
        "ADDRESS": "NO:5&7, JALAN LIKU D8/D, SEKSYEN 8, SHAH ALAM, SELANGOR DARUL EHSAN.  40000",
        "geocodeaddress":"No. 9, Jalan Liku D 8/A, Seksyen 8, Selangor, 40000 Shah Alam, Malaysia",
        "latitude":3.0913614,
        "longitude":101.50874010000007,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "3/21/2018",
        "INVOICE_END_DATE": "3/21/2018",
        "MONTHS":0,
        "NO_OF_INVOICES":1,
        "TOTAL_INVOICE_AMOUNT": " 586 ",
        "TOTAL_PRODUCT_LINES": "1",
        "AVERAGE_PURCHASE_PER_MONTH":0,
        "AVERAGE_PURCHASE_PER_INVOICE":586,
        "AVERAGE_LINES_PER_INVOICE":1.00,
        "Beauty and Personal Care": "",
        "Consumer Health": "",
        "Health and Wellness": "",
        "Home Care": " 586 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC529139",
        "ADDRESS": "525-F, PEKAN LAMA, 08000 SUNGAI PETANI, KEDAH D.A.   8000",
        "geocodeaddress":"525 F, Jalan Kuala Ketil, 08000 Sungai Petani, Kedah, Malaysia",
        "latitude":5.639479,
        "longitude":100.49147800000003,
        "POSTAL_CODE": "8000",
        "PLACE": "Sungai Petani",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "12/16/2016",
        "INVOICE_END_DATE": "3/30/2018",
        "MONTHS":15,
        "NO_OF_INVOICES":35,
        "TOTAL_INVOICE_AMOUNT": " 84,639 ",
        "TOTAL_PRODUCT_LINES": "119",
        "AVERAGE_PURCHASE_PER_MONTH":5643,
        "AVERAGE_PURCHASE_PER_INVOICE":2418,
        "AVERAGE_LINES_PER_INVOICE":3.40,
        "Beauty and Personal Care": " 12,139 ",
        "Consumer Health": " 57,201 ",
        "Health and Wellness": " 726 ",
        "Home Care": " 2,173 ",
        "Packaged Food": " 8,335 ",
        "Soft Drinks": " 4,066 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC529257",
        "ADDRESS": "76, LORONG 2/A, TAMAN SRI WANG, 08000 SUNGAI PETANI, KEDAH.  8000",
        "geocodeaddress":"Taman Sri Wang, 08000 Sungai Petani, Kedah, Malaysia",
        "latitude":5.620051,
        "longitude":100.50002999999992,
        "POSTAL_CODE": "8000",
        "PLACE": "Sungai Petani",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "11/24/2017",
        "INVOICE_END_DATE": "11/24/2017",
        "MONTHS":0,
        "NO_OF_INVOICES":2,
        "TOTAL_INVOICE_AMOUNT": " 3,468 ",
        "TOTAL_PRODUCT_LINES": "8",
        "AVERAGE_PURCHASE_PER_MONTH":0,
        "AVERAGE_PURCHASE_PER_INVOICE":1734,
        "AVERAGE_LINES_PER_INVOICE":4.00,
        "Beauty and Personal Care": " 2,804 ",
        "Consumer Health": " 277 ",
        "Health and Wellness": "",
        "Home Care": " 388 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC529584",
        "ADDRESS": "525A-E, JALAN KUALA KETIL, 08000 SUNGAI PETANI, KEDAH DARUL AMAN.  8000",
        "geocodeaddress":"525 A-E, Jalan Kuala Ketil, 08000 Sungai Petani, Kedah, Malaysia",
        "latitude":5.639336,
        "longitude":100.49167890000001,
        "POSTAL_CODE": "8000",
        "PLACE": "Sungai Petani",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "6/7/2017",
        "INVOICE_END_DATE": "3/13/2018",
        "MONTHS":9,
        "NO_OF_INVOICES":20,
        "TOTAL_INVOICE_AMOUNT": " 23,357 ",
        "TOTAL_PRODUCT_LINES": "226",
        "AVERAGE_PURCHASE_PER_MONTH":2595,
        "AVERAGE_PURCHASE_PER_INVOICE":1168,
        "AVERAGE_LINES_PER_INVOICE":11.30,
        "Beauty and Personal Care": " 12,323 ",
        "Consumer Health": " 913 ",
        "Health and Wellness": "",
        "Home Care": " 8,255 ",
        "Packaged Food": " 856 ",
        "Soft Drinks": " 1,010 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC529607",
        "ADDRESS": "LOT 220, PEKAN LAMA, MUKIM PADANG MAT SIRAT, 07000 PULAU LANGKAWI, KEDAH DARUL AMAN.  7000",
        "geocodeaddress":"Padang Mat Sirat, 07000 Langkawi, Kedah, Malaysia",
        "latitude":6.4116364,
        "longitude":99.68983159999993,
        "POSTAL_CODE": "7000",
        "PLACE": "Langkawi",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "3/11/2017",
        "INVOICE_END_DATE": "3/13/2018",
        "MONTHS":12,
        "NO_OF_INVOICES":26,
        "TOTAL_INVOICE_AMOUNT": " 33,222 ",
        "TOTAL_PRODUCT_LINES": "385",
        "AVERAGE_PURCHASE_PER_MONTH":2768,
        "AVERAGE_PURCHASE_PER_INVOICE":1278,
        "AVERAGE_LINES_PER_INVOICE":14.81,
        "Beauty and Personal Care": " 19,175 ",
        "Consumer Health": " 3,667 ",
        "Health and Wellness": " 2,003 ",
        "Home Care": " 7,132 ",
        "Packaged Food": "",
        "Soft Drinks": " 1,243 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC529683",
        "ADDRESS": "712-A, JALAN KUALA KETIL, PEKAN LAMA, 08000 SUNGAI PETANI, KEDAH DARUL AMAN.  8000",
        "geocodeaddress":"No. 712-A, Jalan Kuala Ketil, Pekan Lama, 08000 Sungai Petani, Kedah, Malaysia",
        "latitude":5.636699,
        "longitude":100.49638600000003,
        "POSTAL_CODE": "8000",
        "PLACE": "Sungai Petani",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "12/15/2016",
        "INVOICE_END_DATE": "3/13/2018",
        "MONTHS":14,
        "NO_OF_INVOICES":18,
        "TOTAL_INVOICE_AMOUNT": " 9,402 ",
        "TOTAL_PRODUCT_LINES": "33",
        "AVERAGE_PURCHASE_PER_MONTH":672,
        "AVERAGE_PURCHASE_PER_INVOICE":522,
        "AVERAGE_LINES_PER_INVOICE":1.83,
        "Beauty and Personal Care": " 399 ",
        "Consumer Health": " 5,813 ",
        "Health and Wellness": " 15 ",
        "Home Care": "",
        "Packaged Food": " 1,336 ",
        "Soft Drinks": " 1,839 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC530409",
        "ADDRESS": "NO. 399, A-7, TAMAN INTAN, 08000 SUNGAI PETANI, KEDAH DARUL AMAN.   8000",
        "geocodeaddress":"399, 7, Taman Intan, 08000 Sungai Petani, Kedah, Malaysia",
        "latitude":5.6297428,
        "longitude":100.47105940000006,
        "POSTAL_CODE": "8000",
        "PLACE": "Sungai Petani",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "12/30/2016",
        "INVOICE_END_DATE": "3/26/2018",
        "MONTHS":14,
        "NO_OF_INVOICES":15,
        "TOTAL_INVOICE_AMOUNT": " 4,119 ",
        "TOTAL_PRODUCT_LINES": "50",
        "AVERAGE_PURCHASE_PER_MONTH":294,
        "AVERAGE_PURCHASE_PER_INVOICE":275,
        "AVERAGE_LINES_PER_INVOICE":3.33,
        "Beauty and Personal Care": " 462 ",
        "Consumer Health": " 2,556 ",
        "Health and Wellness": " 402 ",
        "Home Care": " 52 ",
        "Packaged Food": " 400 ",
        "Soft Drinks": " 246 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC530512",
        "ADDRESS": "7-11 STORE 2357 NO. 55A (GF), PERSIARAN BUNGA RAYA, JALAN KELIBANG, LANGKAWI MALL, 07000 LANGKAWI, KEDAH D.A.  7000",
        "geocodeaddress":"Persiaran Bunga Raya, Kuah, 07000 Langkawi, Kedah, Malaysia",
        "latitude":6.327210099999999,
        "longitude":99.84198500000002,
        "POSTAL_CODE": "7000",
        "PLACE": "Langkawi",
        "STATE": "Kedah",
        "CHANNEL_HIERARCHY": "Convenience Store",
        "INVOICE_START_DATE": "10/30/2017",
        "INVOICE_END_DATE": "4/6/2018",
        "MONTHS":5,
        "NO_OF_INVOICES":5,
        "TOTAL_INVOICE_AMOUNT": " 6,133 ",
        "TOTAL_PRODUCT_LINES": "53",
        "AVERAGE_PURCHASE_PER_MONTH":1227,
        "AVERAGE_PURCHASE_PER_INVOICE":1227,
        "AVERAGE_LINES_PER_INVOICE":10.60,
        "Beauty and Personal Care": " 1,091 ",
        "Consumer Health": " 2,934 ",
        "Health and Wellness": " 2,047 ",
        "Home Care": " 61 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC530608",
        "ADDRESS": "7-11 STORE 2482 NO. 7, (GF), PEKAN BARU PADANG MATSIRAT, PADANG MATSIRAT, 07100 LANGKAWI, KEDAH DARUL AMAN.  7100",
        "geocodeaddress":"Pekanbaru, Pekanbaru City, Riau, Indonesia",
        "latitude":0.5070677,
        "longitude":101.44777929999998,
        "POSTAL_CODE": "(blank)",
        "PLACE": "#N/A",
        "STATE": "#N/A",
        "CHANNEL_HIERARCHY": "Convenience Store",
        "INVOICE_START_DATE": "12/13/2017",
        "INVOICE_END_DATE": "4/6/2018",
        "MONTHS":3,
        "NO_OF_INVOICES":8,
        "TOTAL_INVOICE_AMOUNT": " 6,875 ",
        "TOTAL_PRODUCT_LINES": "60",
        "AVERAGE_PURCHASE_PER_MONTH":2292,
        "AVERAGE_PURCHASE_PER_INVOICE":859,
        "AVERAGE_LINES_PER_INVOICE":7.50,
        "Beauty and Personal Care": " 354 ",
        "Consumer Health": " 4,450 ",
        "Health and Wellness": " 2,009 ",
        "Home Care": " 61 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC530986",
        "ADDRESS": "NO. 1 JALAN BINTANG U5/33, SYEKSYEN U5 SUBANG SURIA 40150 SHAH ALAM, SELANGOR.   40150",
        "geocodeaddress":"Jalan Bintang U5/33, Subang Suria, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.18622,
        "longitude":101.53487410000002,
        "POSTAL_CODE": "40150",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "6/15/2016",
        "INVOICE_END_DATE": "3/27/2018",
        "MONTHS":21,
        "NO_OF_INVOICES":19,
        "TOTAL_INVOICE_AMOUNT": " 9,736 ",
        "TOTAL_PRODUCT_LINES": "337",
        "AVERAGE_PURCHASE_PER_MONTH":464,
        "AVERAGE_PURCHASE_PER_INVOICE":512,
        "AVERAGE_LINES_PER_INVOICE":17.74,
        "Beauty and Personal Care": " 2,844 ",
        "Consumer Health": " 2,358 ",
        "Health and Wellness": " 5 ",
        "Home Care": " 4,337 ",
        "Packaged Food": " 101 ",
        "Soft Drinks": " 91 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531178",
        "ADDRESS": "5,JALAN SP 1/2,SEKSEN 1, TAMAN SUBANG PERDANA, 40000 SHAH ALAM,SELANGOR   -",
        "geocodeaddress":"5, Jalan SP 1/2, Taman Subang Perdana, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.1552798,
        "longitude":101.53829760000008,
        "POSTAL_CODE": "40000",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "4/13/2016",
        "INVOICE_END_DATE": "3/27/2018",
        "MONTHS":23,
        "NO_OF_INVOICES":24,
        "TOTAL_INVOICE_AMOUNT": " 11,085 ",
        "TOTAL_PRODUCT_LINES": "339",
        "AVERAGE_PURCHASE_PER_MONTH":482,
        "AVERAGE_PURCHASE_PER_INVOICE":462,
        "AVERAGE_LINES_PER_INVOICE":14.13,
        "Beauty and Personal Care": " 2,444 ",
        "Consumer Health": " 2,455 ",
        "Health and Wellness": " 96 ",
        "Home Care": " 6,091 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531528",
        "ADDRESS": "50 NANAS ROAD WEST 93400 KUCHING SARAWAK   -",
        "geocodeaddress":"50, Jalan Nanas, 93400 Kuching, Sarawak, Malaysia",
        "latitude":1.5492606,
        "longitude":110.33330980000005,
        "POSTAL_CODE": "93400",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/24/2016",
        "INVOICE_END_DATE": "2/22/2018",
        "MONTHS":15,
        "NO_OF_INVOICES":9,
        "TOTAL_INVOICE_AMOUNT": " 1,830 ",
        "TOTAL_PRODUCT_LINES": "30",
        "AVERAGE_PURCHASE_PER_MONTH":122,
        "AVERAGE_PURCHASE_PER_INVOICE":203,
        "AVERAGE_LINES_PER_INVOICE":3.33,
        "Beauty and Personal Care": " 70 ",
        "Consumer Health": " 306 ",
        "Health and Wellness": "",
        "Home Care": " 1,393 ",
        "Packaged Food": "",
        "Soft Drinks": " 62 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531717",
        "ADDRESS": "KUCHING SARAWAK   93450",
        "geocodeaddress":"93450, Sarawak, Malaysia",
        "latitude":1.3629577,
        "longitude":110.29513640000005,
        "POSTAL_CODE": "93450",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "9/8/2016",
        "INVOICE_END_DATE": "4/3/2018",
        "MONTHS":18,
        "NO_OF_INVOICES":54,
        "TOTAL_INVOICE_AMOUNT": " 44,854 ",
        "TOTAL_PRODUCT_LINES": "343",
        "AVERAGE_PURCHASE_PER_MONTH":2492,
        "AVERAGE_PURCHASE_PER_INVOICE":831,
        "AVERAGE_LINES_PER_INVOICE":6.35,
        "Beauty and Personal Care": " 5,087 ",
        "Consumer Health": " 8,959 ",
        "Health and Wellness": " 2,959 ",
        "Home Care": " 27,503 ",
        "Packaged Food": " 32 ",
        "Soft Drinks": " 313 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531773",
        "ADDRESS": "c/o HARRISONS SARAWAK SDN BHD P O BOX 128   93700",
        "geocodeaddress":"Sarawak, Malaysia",
        "latitude":1.5532783,
        "longitude":110.35921269999994,
        "POSTAL_CODE": "93700",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/19/2016",
        "INVOICE_END_DATE": "3/20/2018",
        "MONTHS":17,
        "NO_OF_INVOICES":17,
        "TOTAL_INVOICE_AMOUNT": " 2,587 ",
        "TOTAL_PRODUCT_LINES": "29",
        "AVERAGE_PURCHASE_PER_MONTH":152,
        "AVERAGE_PURCHASE_PER_INVOICE":152,
        "AVERAGE_LINES_PER_INVOICE":1.71,
        "Beauty and Personal Care": " 354 ",
        "Consumer Health": " 861 ",
        "Health and Wellness": "",
        "Home Care": " 1,312 ",
        "Packaged Food": "",
        "Soft Drinks": " 61 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531876",
        "ADDRESS": "NO.3-9,BLK 9,JALAN TAPANG,KCLD KOTA SENTOSA 93250 KUCHING SARAWAK   -",
        "geocodeaddress":"Kota Sentosa, 93250 Kuching, Sarawak, Malaysia",
        "latitude":1.469816,
        "longitude":110.33159290000003,
        "POSTAL_CODE": "93250",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/18/2016",
        "INVOICE_END_DATE": "3/23/2018",
        "MONTHS":17,
        "NO_OF_INVOICES":17,
        "TOTAL_INVOICE_AMOUNT": " 37,789 ",
        "TOTAL_PRODUCT_LINES": "278",
        "AVERAGE_PURCHASE_PER_MONTH":2223,
        "AVERAGE_PURCHASE_PER_INVOICE":2223,
        "AVERAGE_LINES_PER_INVOICE":16.35,
        "Beauty and Personal Care": " 22,253 ",
        "Consumer Health": "",
        "Health and Wellness": "",
        "Home Care": " 15,535 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC531895",
        "ADDRESS": "c/o HARRISONS SARAWAK SDN BHD P O BOX 128   93700",
        "geocodeaddress":"Sarawak, Malaysia",
        "latitude":1.5532783,
        "longitude":110.35921269999994,
        "POSTAL_CODE": "93700",
        "PLACE": "Kuching",
        "STATE": "Sarawak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "10/6/2017",
        "INVOICE_END_DATE": "10/6/2017",
        "MONTHS":0,
        "NO_OF_INVOICES":1,
        "TOTAL_INVOICE_AMOUNT": " 27 ",
        "TOTAL_PRODUCT_LINES": "1",
        "AVERAGE_PURCHASE_PER_MONTH":0,
        "AVERAGE_PURCHASE_PER_INVOICE":27,
        "AVERAGE_LINES_PER_INVOICE":1.00,
        "Beauty and Personal Care": "",
        "Consumer Health": "",
        "Health and Wellness": "",
        "Home Care": " 27 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC532470",
        "ADDRESS": "MENGGATAL   88450",
        "geocodeaddress":"Batu 9 1/2, Jalan Tuaran, Menggatal, 88450, Kota Kinabalu, Sabah, 88450, Malaysia",
        "latitude":5.9917555,
        "longitude":116.11784929999999,
        "POSTAL_CODE": "88450",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "9/15/2016",
        "INVOICE_END_DATE": "3/16/2018",
        "MONTHS":18,
        "NO_OF_INVOICES":14,
        "TOTAL_INVOICE_AMOUNT": " 2,129 ",
        "TOTAL_PRODUCT_LINES": "49",
        "AVERAGE_PURCHASE_PER_MONTH":118,
        "AVERAGE_PURCHASE_PER_INVOICE":152,
        "AVERAGE_LINES_PER_INVOICE":3.50,
        "Beauty and Personal Care": " 458 ",
        "Consumer Health": "",
        "Health and Wellness": "",
        "Home Care": " 1,671 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC532547",
        "ADDRESS": "LOT 4, BLOCK M, G/F SINSURAN COMPLEX 88100 KOTA KINABAU, SABAH   88100",
        "geocodeaddress":"Lot 3 & 4, Block M, Sinsuran Kompleks, Jalan Sinsuran Pasar Malam, Sinsuran Kompleks, 88000 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.980715,
        "longitude":116.07182999999998,
        "POSTAL_CODE": "88100",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "9/20/2016",
        "INVOICE_END_DATE": "6/30/2017",
        "MONTHS":9,
        "NO_OF_INVOICES":14,
        "TOTAL_INVOICE_AMOUNT": " 5,345 ",
        "TOTAL_PRODUCT_LINES": "93",
        "AVERAGE_PURCHASE_PER_MONTH":594,
        "AVERAGE_PURCHASE_PER_INVOICE":382,
        "AVERAGE_LINES_PER_INVOICE":6.64,
        "Beauty and Personal Care": " 1,710 ",
        "Consumer Health": " 1,566 ",
        "Health and Wellness": " 223 ",
        "Home Care": " 1,745 ",
        "Packaged Food": " 69 ",
        "Soft Drinks": " 32 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC532658",
        "ADDRESS": "LOT NO.5, PUTATAN BARU 88200 KOTA KINABALU SABAH   88200",
        "geocodeaddress":"Lot No.5, Tingkat bawah, Tapak Kedai Baru Putatan, 88300, Kota Kinabalu, Sabah, Bandar Putatan, 88300 Penampang, Sabah, Malaysia",
        "latitude":5.8932014,
        "longitude":116.04823020000003,
        "POSTAL_CODE": "88200",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "9/8/2016",
        "INVOICE_END_DATE": "3/8/2018",
        "MONTHS":18,
        "NO_OF_INVOICES":48,
        "TOTAL_INVOICE_AMOUNT": " 11,378 ",
        "TOTAL_PRODUCT_LINES": "242",
        "AVERAGE_PURCHASE_PER_MONTH":632,
        "AVERAGE_PURCHASE_PER_INVOICE":237,
        "AVERAGE_LINES_PER_INVOICE":5.04,
        "Beauty and Personal Care": " 1,384 ",
        "Consumer Health": " 4,678 ",
        "Health and Wellness": "",
        "Home Care": " 4,832 ",
        "Packaged Food": " 280 ",
        "Soft Drinks": " 204 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC532748",
        "ADDRESS": "(CGS) TMN GOLF VIEW JLN BUNDUSAN,88200 PENAMPANG P.O.BOX 1,89507 PENAMPANG SABAH  88200",
        "geocodeaddress":"Jalan Bundusan, 88200 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.9289315,
        "longitude":116.09578540000007,
        "POSTAL_CODE": "88200",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "9/27/2016",
        "INVOICE_END_DATE": "3/19/2018",
        "MONTHS":17,
        "NO_OF_INVOICES":306,
        "TOTAL_INVOICE_AMOUNT": " 243,976 ",
        "TOTAL_PRODUCT_LINES": "1671",
        "AVERAGE_PURCHASE_PER_MONTH":14352,
        "AVERAGE_PURCHASE_PER_INVOICE":797,
        "AVERAGE_LINES_PER_INVOICE":5.46,
        "Beauty and Personal Care": " 73,786 ",
        "Consumer Health": " 26,052 ",
        "Health and Wellness": " 7,118 ",
        "Home Care": " 133,251 ",
        "Packaged Food": " 1,239 ",
        "Soft Drinks": " 2,531 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC532817",
        "ADDRESS": "GCH RETAIL (M) S/B (1087) G/F, KOSAN COMPLEX LIKAS ML 4,TUARAN RD, K.K SABAH  88400",
        "geocodeaddress":"Kosan Complex Likas, Jalan Tuaran, 88400 Kota Kinabalu, Sabah, 88400, Malaysia",
        "latitude":5.99013,
        "longitude":116.10766000000001,
        "POSTAL_CODE": "88400",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "9/8/2016",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS":18,
        "NO_OF_INVOICES":118,
        "TOTAL_INVOICE_AMOUNT": " 60,338 ",
        "TOTAL_PRODUCT_LINES": "457",
        "AVERAGE_PURCHASE_PER_MONTH":3352,
        "AVERAGE_PURCHASE_PER_INVOICE":511,
        "AVERAGE_LINES_PER_INVOICE":3.87,
        "Beauty and Personal Care": " 17,874 ",
        "Consumer Health": " 4,513 ",
        "Health and Wellness": " 672 ",
        "Home Care": " 36,442 ",
        "Packaged Food": " 274 ",
        "Soft Drinks": " 563 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      }, 
      {
        "OUTLET_CODE": "AC533105",
        "ADDRESS": "LOT NO:A7 & 8-0, BLOCK A GROUND FLOOR, BEVERLY HILL APARTMENTS,PHASE 1, JALAN BUNDUSAN,KOTA KINABALU, SABAH  88300",
        "geocodeaddress":"BLOCK A GROUND FLOOR, 1, Jalan Bundusan, 88300 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.933497699999999,
        "longitude":116.09928549999995,
        "POSTAL_CODE": "88300",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "10/28/2016",
        "INVOICE_END_DATE": "3/29/2018",
        "MONTHS":17,
        "NO_OF_INVOICES":15,
        "TOTAL_INVOICE_AMOUNT": " 91,997 ",
        "TOTAL_PRODUCT_LINES": "32",
        "AVERAGE_PURCHASE_PER_MONTH":5412,
        "AVERAGE_PURCHASE_PER_INVOICE":6133,
        "AVERAGE_LINES_PER_INVOICE":2.13,
        "Beauty and Personal Care": "",
        "Consumer Health": " 49,908 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": " 42,089 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC533149",
        "ADDRESS": "NO. 10, LOT 33, GROUND FLOOR, PHASE 2, KEPAYAN RIDGE COMMERCIAL CENTRE,   SABAH 88100",
        "geocodeaddress":"33, GROUND FLOOR, PHASE, 2, Jalan Kepayan, 88100 Kota Kinabalu, Sabah, Malaysia",
        "latitude":5.9495385,
        "longitude":116.05990750000001,
        "POSTAL_CODE": "88100",
        "PLACE": "Kota Kinabalu",
        "STATE": "Sabah",
        "CHANNEL_HIERARCHY": "Supermarket",
        "INVOICE_START_DATE": "10/17/2016",
        "INVOICE_END_DATE": "3/16/2018",
        "MONTHS":16,
        "NO_OF_INVOICES":163,
        "TOTAL_INVOICE_AMOUNT": " 194,460 ",
        "TOTAL_PRODUCT_LINES": "1057",
        "AVERAGE_PURCHASE_PER_MONTH":12154,
        "AVERAGE_PURCHASE_PER_INVOICE":1193,
        "AVERAGE_LINES_PER_INVOICE":6.48,
        "Beauty and Personal Care": " 56,670 ",
        "Consumer Health": " 29,350 ",
        "Health and Wellness": " 6,720 ",
        "Home Care": " 95,514 ",
        "Packaged Food": " 1,975 ",
        "Soft Drinks": " 4,232 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC533237",
        "ADDRESS": "LOT 1050 ,PRIVATE MARKET JLN CHANGKAT ASA, 35900 ULU BERNAM SELANGOR  35900",
        "geocodeaddress":"Ulu Bernam, 35900 Kerling, Selangor, Malaysia",
        "latitude":3.674364,
        "longitude":101.5225481,
        "POSTAL_CODE": "35900",
        "PLACE": "Tanjong Malim",
        "STATE": "Perak",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "4/13/2016",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":23,
        "NO_OF_INVOICES":21,
        "TOTAL_INVOICE_AMOUNT": " 1,843 ",
        "TOTAL_PRODUCT_LINES": "60",
        "AVERAGE_PURCHASE_PER_MONTH":80,
        "AVERAGE_PURCHASE_PER_INVOICE":88,
        "AVERAGE_LINES_PER_INVOICE":2.86,
        "Beauty and Personal Care": " 1,135 ",
        "Consumer Health": " 298 ",
        "Health and Wellness": " 40 ",
        "Home Care": " 370 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC535285",
        "ADDRESS": "LOT 3916, JALAN 1D, KAMPUNG BARU SUBANG 40150 SHAH ALAM, SELANGOR.   40150",
        "geocodeaddress":"Lot 515, No 22, Jalan TUDM, Kampung Baru Subang, Seksyen U6, 40150 Shah Alam, Selangor Darul Ehsan., Malaysia",
        "latitude":3.137381,
        "longitude":101.54161120000003,
        "POSTAL_CODE": "40150",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "5/13/2016",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS":22,
        "NO_OF_INVOICES":22,
        "TOTAL_INVOICE_AMOUNT": " 7,850 ",
        "TOTAL_PRODUCT_LINES": "119",
        "AVERAGE_PURCHASE_PER_MONTH":357,
        "AVERAGE_PURCHASE_PER_INVOICE":357,
        "AVERAGE_LINES_PER_INVOICE":5.41,
        "Beauty and Personal Care": " 1,567 ",
        "Consumer Health": " 689 ",
        "Health and Wellness": " 1,039 ",
        "Home Care": " 4,555 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC535824",
        "ADDRESS": "NO. 23 & 25, JLN DINAR D U3/D SEK U3, 40150 SHAH ALAM SELANGOR DARUL EHSAN   -",
        "geocodeaddress":"Lot 10, Malaysia International Aerospace Centre, Helicopter Centre, 21-1, Jalan Dinar D U3/D & Seksyen 43, Taman Subang Perdana, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.148754,
        "longitude":101.54539399999999,
        "POSTAL_CODE": "40150",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "4/22/2016",
        "INVOICE_END_DATE": "4/4/2018",
        "MONTHS":23,
        "NO_OF_INVOICES":18,
        "TOTAL_INVOICE_AMOUNT": " 15,627 ",
        "TOTAL_PRODUCT_LINES": "161",
        "AVERAGE_PURCHASE_PER_MONTH":679,
        "AVERAGE_PURCHASE_PER_INVOICE":868,
        "AVERAGE_LINES_PER_INVOICE":8.94,
        "Beauty and Personal Care": " 5,962 ",
        "Consumer Health": " 1,612 ",
        "Health and Wellness": "",
        "Home Care": " 8,053 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC535843",
        "ADDRESS": "NO 10 JALAN UTARID U5/D 40150 BANDAR PINGGIRAN SUBANG SHAH ALAM SELANGOR  40150",
        "geocodeaddress":"Jalan Utarid U5/D, Taman Mutiara Subang, 40150 Shah Alam, Selangor, Malaysia",
        "latitude":3.1780196,
        "longitude":101.53818869999998,
        "POSTAL_CODE": "40150",
        "PLACE": "Shah Alam",
        "STATE": "Selangor",
        "CHANNEL_HIERARCHY": "Provision Store - Small",
        "INVOICE_START_DATE": "4/7/2016",
        "INVOICE_END_DATE": "3/23/2018",
        "MONTHS":23,
        "NO_OF_INVOICES":133,
        "TOTAL_INVOICE_AMOUNT": " 123,213 ",
        "TOTAL_PRODUCT_LINES": "2199",
        "AVERAGE_PURCHASE_PER_MONTH":5357,
        "AVERAGE_PURCHASE_PER_INVOICE":926,
        "AVERAGE_LINES_PER_INVOICE":16.53,
        "Beauty and Personal Care": " 31,821 ",
        "Consumer Health": " 30,480 ",
        "Health and Wellness": " 1,674 ",
        "Home Care": " 57,469 ",
        "Packaged Food": " 462 ",
        "Soft Drinks": " 1,306 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537087",
        "ADDRESS": "LOT LG 01 GLOMAC MALL JALAN DAMANSARA KUALA LUMPUR   50490",
        "geocodeaddress":"699, Jalan Damansara, Taman Tun Dr Ismail, 60000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.1338524,
        "longitude":101.62989629999993,
        "POSTAL_CODE": "50490",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "12/8/2017",
        "INVOICE_END_DATE": "3/28/2018",
        "MONTHS":3,
        "NO_OF_INVOICES":10,
        "TOTAL_INVOICE_AMOUNT": " 27,220 ",
        "TOTAL_PRODUCT_LINES": "176",
        "AVERAGE_PURCHASE_PER_MONTH":9073,
        "AVERAGE_PURCHASE_PER_INVOICE":2722,
        "AVERAGE_LINES_PER_INVOICE":17.60,
        "Beauty and Personal Care": " 4,230 ",
        "Consumer Health": " 5,054 ",
        "Health and Wellness": " 514 ",
        "Home Care": " 17,421 ",
        "Packaged Food": "",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537090",
        "ADDRESS": "46&48 JALAN 5/40 TAMAN PUSAT KEPONG KUALA LUMPUR.   52100",
        "geocodeaddress":"46, 48, Jalan 5/40, Taman Pusat Kepong, 52000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.2025263,
        "longitude":101.65619960000004,
        "POSTAL_CODE": "52100",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Medium Provision Stores",
        "INVOICE_START_DATE": "11/7/2017",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":4,
        "NO_OF_INVOICES":9,
        "TOTAL_INVOICE_AMOUNT": " 25,410 ",
        "TOTAL_PRODUCT_LINES": "161",
        "AVERAGE_PURCHASE_PER_MONTH":6352,
        "AVERAGE_PURCHASE_PER_INVOICE":2823,
        "AVERAGE_LINES_PER_INVOICE":17.89,
        "Beauty and Personal Care": " 2,832 ",
        "Consumer Health": " 2,305 ",
        "Health and Wellness": " 718 ",
        "Home Care": " 18,987 ",
        "Packaged Food": " 357 ",
        "Soft Drinks": " 211 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537162",
        "ADDRESS": "NO 1-34 JALAN DESA 1/5 DESA AMAN PURI KEPONG KUALA LUMPUR   52100",
        "geocodeaddress":"1, Jalan Desa 1/5, Desa Aman Puri, 52100 Kuala Lumpur, Selangor, Malaysia",
        "latitude":3.212179,
        "longitude":101.61610199999996,
        "POSTAL_CODE": "52100",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Small",
        "INVOICE_START_DATE": "10/31/2017",
        "INVOICE_END_DATE": "3/20/2018",
        "MONTHS":4,
        "NO_OF_INVOICES":8,
        "TOTAL_INVOICE_AMOUNT": " 10,364 ",
        "TOTAL_PRODUCT_LINES": "92",
        "AVERAGE_PURCHASE_PER_MONTH":2591,
        "AVERAGE_PURCHASE_PER_INVOICE":1296,
        "AVERAGE_LINES_PER_INVOICE":11.50,
        "Beauty and Personal Care": " 1,696 ",
        "Consumer Health": " 1,670 ",
        "Health and Wellness": " 446 ",
        "Home Care": " 3,698 ",
        "Packaged Food": " 2,854 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537195",
        "ADDRESS": "NO 8 JALAN LANG KUNING(JLN133) KEPONG BARU KUALA LUMPUR   52100",
        "geocodeaddress":"50, Jalan Lang Kuning, Kepong Baru, 52100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.1907775,
        "longitude":101.64447859999996,
        "POSTAL_CODE": "52100",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Large",
        "INVOICE_START_DATE": "1/26/2018",
        "INVOICE_END_DATE": "3/28/2018",
        "MONTHS":2,
        "NO_OF_INVOICES":5,
        "TOTAL_INVOICE_AMOUNT": " 6,826 ",
        "TOTAL_PRODUCT_LINES": "71",
        "AVERAGE_PURCHASE_PER_MONTH":3413,
        "AVERAGE_PURCHASE_PER_INVOICE":1365,
        "AVERAGE_LINES_PER_INVOICE":14.20,
        "Beauty and Personal Care": " 316 ",
        "Consumer Health": " 2,890 ",
        "Health and Wellness": "",
        "Home Care": " 2,910 ",
        "Packaged Food": " 428 ",
        "Soft Drinks": " 281 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537215",
        "ADDRESS": "NO 12 - 14 JALAN DAYA 12 TAMAN DAYA KEPONG KUALA LUMPUR   51200",
        "geocodeaddress":"12, 14, Jalan Daya 12, Taman Daya, 52100 Kuala Lumpur, Selangor, Malaysia",
        "latitude":3.221816,
        "longitude":101.63688939999997,
        "POSTAL_CODE": "51200",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall",
        "INVOICE_START_DATE": "1/17/2018",
        "INVOICE_END_DATE": "3/22/2018",
        "MONTHS":2,
        "NO_OF_INVOICES":3,
        "TOTAL_INVOICE_AMOUNT": " 1,939 ",
        "TOTAL_PRODUCT_LINES": "31",
        "AVERAGE_PURCHASE_PER_MONTH":969,
        "AVERAGE_PURCHASE_PER_INVOICE":646,
        "AVERAGE_LINES_PER_INVOICE":10.33,
        "Beauty and Personal Care": " 324 ",
        "Consumer Health": " 657 ",
        "Health and Wellness": "",
        "Home Care": " 897 ",
        "Packaged Food": "",
        "Soft Drinks": " 62 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537270",
        "ADDRESS": "9 TENGKAT TONG SHIN GROUD FLOOR KUALA LUMPUR   50200",
        "geocodeaddress":"9, Tengkat Tong Shin, 50200 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.145393,
        "longitude":101.70704999999998,
        "POSTAL_CODE": "50200",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall",
        "INVOICE_START_DATE": "10/30/2017",
        "INVOICE_END_DATE": "3/14/2018",
        "MONTHS":4,
        "NO_OF_INVOICES":9,
        "TOTAL_INVOICE_AMOUNT": " 5,293 ",
        "TOTAL_PRODUCT_LINES": "86",
        "AVERAGE_PURCHASE_PER_MONTH":1323,
        "AVERAGE_PURCHASE_PER_INVOICE":588,
        "AVERAGE_LINES_PER_INVOICE":9.56,
        "Beauty and Personal Care": " 1,447 ",
        "Consumer Health": " 345 ",
        "Health and Wellness": " 493 ",
        "Home Care": " 2,897 ",
        "Packaged Food": "",
        "Soft Drinks": " 111 ",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537501",
        "ADDRESS": "NO 32 JALAN LANG KUNING 133 TAMAN SRI KEPONG BARU KEPONG KUALA LUMPUR   52100",
        "geocodeaddress":"Jalan Lang Kuning, Kepong Baru, 52100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.1924263,
        "longitude":101.64479559999995,
        "POSTAL_CODE": "52100",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall",
        "INVOICE_START_DATE": "2/28/2018",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS":1,
        "NO_OF_INVOICES":3,
        "TOTAL_INVOICE_AMOUNT": " 442 ",
        "TOTAL_PRODUCT_LINES": "8",
        "AVERAGE_PURCHASE_PER_MONTH":442,
        "AVERAGE_PURCHASE_PER_INVOICE":147,
        "AVERAGE_LINES_PER_INVOICE":2.67,
        "Beauty and Personal Care": " 37 ",
        "Consumer Health": " 369 ",
        "Health and Wellness": "",
        "Home Care": "",
        "Packaged Food": " 36 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      },
      {
        "OUTLET_CODE": "AC537507",
        "ADDRESS": "LOT 2/5 JLN UDANG SIAR 2 TAMAN SRI SEGAMBUT KUALA LUMPUR   52000",
        "geocodeaddress":"9, Jalan Udang Siar 2, Taman Sri Segambut, 52000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur, Malaysia",
        "latitude":3.198079,
        "longitude":101.65717100000006,
        "POSTAL_CODE": "52000",
        "PLACE": "Kuala Lumpur",
        "STATE": "Kuala Lumpur",
        "CHANNEL_HIERARCHY": "Chinese Medical Hall - Large",
        "INVOICE_START_DATE": "11/6/2017",
        "INVOICE_END_DATE": "4/5/2018",
        "MONTHS":4,
        "NO_OF_INVOICES":4,
        "TOTAL_INVOICE_AMOUNT": " 3,091 ",
        "TOTAL_PRODUCT_LINES": "51",
        "AVERAGE_PURCHASE_PER_MONTH":773,
        "AVERAGE_PURCHASE_PER_INVOICE":773,
        "AVERAGE_LINES_PER_INVOICE":12.75,
        "Beauty and Personal Care": " 1,217 ",
        "Consumer Health": " 427 ",
        "Health and Wellness": "",
        "Home Care": " 1,304 ",
        "Packaged Food": " 143 ",
        "Soft Drinks": "",
        "FIELD22": "",
        "FIELD23": "",
        "FIELD24": "",
        "FIELD25": "",
        "FIELD26": "",
        "FIELD27": "",
        "FIELD28": "",
        "FIELD29": ""
      }
     ];
});
