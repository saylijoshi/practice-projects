
angular.module('angularjs_with_Nodejs').controller('accenturev2Controller', function ($rootScope,$scope, $timeout, $filter, $http) {

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
    var categorySmallProvisionStoresMarker = [];
    var categoryCaféMarker = [];
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
    var locationMarker;
    var restaurants = [];
   

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
      if( localStorage.getItem("token") == 'lzbPt76HhtGKhHRj' )
      {
        $scope.initMap();
        localStorage.setItem("token",'');
      }
      else
      {
        window.location.href = '/accenturedemo';
      }
      
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

        $scope.storeIPAddress();
        $scope.initialiseData();
        $scope.showStores();

        // $http({ method: 'GET', url: 'https://graph.facebook.com/search?type=place&fields=name,checkins,hours,location,engagement,is_verified,link,overall_star_rating,payment_options,price_range,restaurant_specialties&q=cafe&center=18.7304,73.2921&distance=10000&access_token=1837470493045321|SdcUiYX-RcYgghJWMtc07ph0O6I' }).
        //               success(function (data, status, headers, config) {
        //                   console.log("---Success---:",status);
        //                   console.log("---data---:",data);
        //                   console.log("---data.length---:",data.data.length);
        //               }).
        //               error(function (data, status, headers, config) {
        //                   console.log("---Error---:",status);
        //           });

    }

    
$scope.initialiseData = function()
{
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


    for (var i = 0, length = storeJSON.length; i < length; i++) 
    {
        var storeData = storeJSON[i];
        standardHierarchyNames.push({
            name: storeData.STANDARD_HIERARCHY,
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

    $scope.$apply();
};

// $scope.CountryChanged = function (name)
// {
//   console.log("---name---: ",  $scope.selectedCountry);
//     if( $scope.selectedCountry == "Malaysia" )
//     {
//         $scope.showStores();
//     }
// };

$scope.showStores = function()
{
    var storeData;
    console.log("---storeJSON---:",storeJSON.length);

    $scope.storeNames.length = 0;  

    for (var i = 0, length = storeJSON.length; i < length; i++) 
    {
        storeData = storeJSON[i];

        if( storeData.LATITUDE != null && storeData.LONGITUDE != null  )
        {
            $scope.storeNames.push(storeData);
            var heatmapPoint = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE);
            $scope.heatmapArray.push(heatmapPoint);
            latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
      
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: storeData.CUST_NAME,
            icon: 'images/purple.png',
            mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
            });

            infoWindow = new google.maps.InfoWindow();
            (function(marker, storeData) {

                // Attaching a click event to the current marker
                google.maps.event.addListener(marker, "click", function(e) {
                
                //infoWindow.setContent('<h3>' + storeData.name + '</h3>'+ "<br/>" + storeData.address + "<br/>" + storeData.contact);
                
                infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                + "<br/>" + "Latitude           :" +storeData.LATITUDE
                + "<br/>" + "Longitude          :" +storeData.LONGITUDE);

                infoWindow.open(map, marker);
                //clearDirection();
                //dirLatLng = { lat : storeData.latitude , lng : storeData.longitude};
                //showDirections(myLatLng,dirLatLng,storeData );
                });

                markers.push(marker);
                })(marker, storeData);
        }
        else
        {
            //console.log("---storeData.ADDR_TOTAL---:",storeData.ADDR_TOTAL);
            AddressJSON.push(storeData.ADDR_TOTAL);
        }
    }
  
    console.log("---AddressJSON---:",AddressJSON.length);
    //$scope.theNext();
    
    $scope.$apply();
};

$scope.getDistanceFromLatLonInKm = function(lat1,lon1,lat2,lon2) {
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
  return d;
};

$scope.deg2rad = function(deg) {
  return deg * (Math.PI/180)
};

$scope.getPoints = function() 
{
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

    for (var i = 0, length = storeJSON.length; i < length; i++) 
    {
        var storeData = storeJSON[i];
        var type = storeData.CUST_STATUS;

        if( storeData.LATITUDE != null && storeData.LONGITUDE != null  )
        {
          if(event.target.checked)
          {  
              map.setCenter({lat:4.465754,lng: 107.501896});
              map.setZoom(6);
      
              if( name == "Active" && type == 1 )
              {
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
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
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
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
    $scope.getData(null,-1);
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

$scope.showLocations = function (name,event, index) 
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

    for (var i = 0, length = storeJSON.length; i < length; i++) 
    {
        var storeData = storeJSON[i];
        var typeName = storeData.STANDARD_HIERARCHY;

        if( storeData.LATITUDE != null && storeData.LONGITUDE != null  )
        {
          if(event.target.checked)
          {  
              map.setCenter({lat:4.465754,lng: 107.501896});
              map.setZoom(6);
      
              if( name == "Small Provision Stores" && typeName == "Small Provision Stores" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Small Provision Stores";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categorySmallProvisionStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Café" && typeName == "Café" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Café";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryCaféMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Hypermarket" && typeName == "Hypermarket" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Hypermarket";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryHypermarketMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Other Institutional" && typeName == "Other Institutional" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Other Institutional";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryOtherInstitutionalMarker.push(marker);
                  })(marker, storeData);
              } 
              else if( name == "Catering" && typeName == "Catering" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Catering";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" +storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categoryCateringMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Supermarket" && typeName == "Supermarket" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Supermarket";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
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
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
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
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryPetrolMartStationMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Restaurant" && typeName == "Restaurant" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Restaurant";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categoryRestaurantMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "School" && typeName == "School" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "School";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categorySchoolMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Pet Shop" && typeName == "Pet Shop" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Pet Shop";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryPetShopMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Medium Provision Stores" && typeName == "Medium Provision Stores" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Medium Provision Stores";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
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
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categoryChineseMedicalHallMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Other Convenience Stores" && typeName == "Other Convenience Stores" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Other Convenience Stores";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryOtherConvenienceStoresMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Traditional Pharmacy" && typeName == "Traditional Pharmacy" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Traditional Pharmacy";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryTraditionalPharmacyMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Specialist Food & Drink" && typeName == "Specialist Food & Drink" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Specialist Food & Drink";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categorySpecialistFoodDrinkMarker.push(marker);
                  })(marker, storeData);
              } 
              else if( name == "Bakery" && typeName == "Bakery" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Bakery";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categoryBakeryMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "QSR" && typeName == "QSR" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "QSR";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryQSRMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Wholesale" && typeName == "Wholesale" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Wholesale";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryWholesaleMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Vending Machine" && typeName == "Vending Machine" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Vending Machine";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryendingMachineMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Specialist Other" && typeName == "Specialist Other" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Specialist Other";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/purple.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  //infoWindow = new google.maps.InfoWindow();
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
  
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
  
                  infoWindow.open(map, marker);
                  });
  
                  categorySpecialistOtherMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "News / Magazine Store" && typeName == "News / Magazine Store" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "News / Magazine Store";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/pink.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryNewsMagazineStoreMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Hospitals" && typeName == "Hospitals" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Hospitals";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categoryHospitalsMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Modern Pharmacy" && typeName == "Modern Pharmacy" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Modern Pharmacy";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryModernPharmacyMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Speciality Other" && typeName == "Speciality Other" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Speciality Other";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/green.png',
                  mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  });
  
                  categorySpecialityOtherMarker.push(marker);
                  })(marker, storeData);
              }
              else if( name == "Baby Center" && typeName == "Baby Center" )
              {
                  console.log("---typeName---:",typeName);
                  userSelectedCategoryName = "Baby Center";
                  $scope.storeNames.push(storeData);
  
                  latLng = new google.maps.LatLng(storeData.LATITUDE, storeData.LONGITUDE); 
                  // Creating a marker and putting it on the map
                  var marker = new google.maps.Marker({
                  position: latLng,
                  map: map,
                  title: storeData.CUST_NAME,
                  icon: 'images/blue.png',
                  //mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
                  });
  
                  infoWindow = new google.maps.InfoWindow({ maxWidth: 290 });
                  (function(marker, storeData) {
  
                  // Attaching a click event to the current marker
                  google.maps.event.addListener(marker, "click", function(e) {
                    infoWindow.setContent('<h3>' + "Customer Name         :" + storeData.CUST_NAME + '</h3>'
                    + "<br/>" + "Customer Status    :" + storeData.CUST_STATUS 
                    + "<br/>" + "Postal Code        :" +storeData.POSTAL_CODE_1
                    + "<br/>" + "Address            :" +storeData.ADDR_TOTAL 
                    + "<br/>" + "Company Hierarchy  :" +storeData.COMPANY_HIERARCHY
                    + "<br/>" + "Standard Hierarchy :" +storeData.STANDARD_HIERARCHY 
                    + "<br/>" + "Latitude           :" +storeData.LATITUDE
                    + "<br/>" + "Longitude          :" +storeData.LONGITUDE);
                  infoWindow.open(map, marker);
                  //$scope.clearDirection();
                  //dirLatLng = { lat : cocacolaStoreData.latitude , lng : cocacolaStoreData.longitude};
                  //$scope.showDirections(myLatLng,dirLatLng,storeData );
  
                  });
  
                  categoryBabyCenterMarker.push(marker);
                  })(marker, storeData);
              }
          }
          else
          {
              if( name == "Small Provision Stores" && typeName == "Small Provision Stores" )
              {
                  $scope.clearCategorySmallProvisionStoresMarker();
              }
              else if( name == "Café" && typeName == "Café" )
              {
                  $scope.clearCategoryCaféMarker();
              }
              else if( name == "Hypermarket" && typeName == "Hypermarket" )
              {
                  $scope.clearCategoryHypermarketMarker();
              }
              else if( name == "Other Institutional" && typeName == "Other Institutional" )
              {
                  $scope.clearCategoryOtherInstitutionalMarker();
              }
              else if( name == "Catering" && typeName == "Catering" )
              {
                  $scope.clearCategoryCateringMarker();
              }
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
              else if( name == "Restaurant" && typeName == "Restaurant" )
              {
                  $scope.clearCategoryRestaurantMarker();
              }
              else if( name == "School" && typeName == "School" )
              {
                  $scope.clearCategorySchoolMarker();
              }
              else if( name == "Pet Shop" && typeName == "Pet Shop" )
              {
                  $scope.clearCategoryPetShopMarker();
              }
              else if( name == "Medium Provision Stores" && typeName == "Medium Provision Stores" )
              {
                  $scope.clearCategoryMediumProvisionStoresMarker();
              }
              else if( name == "Chinese Medical Hall" && typeName == "Chinese Medical Hall" )
              {
                  $scope.clearCategoryChineseMedicalHallMarker();
              }
              else if( name == "Other Convenience Stores" && typeName == "Other Convenience Stores" )
              {
                  $scope.clearCategoryOtherConvenienceStoresMarker();
              }
              else if( name == "Traditional Pharmacy" && typeName == "Traditional Pharmacy" )
              {
                  $scope.clearCategoryTraditionalPharmacyMarker();
              }
              else if( name == "Specialist Food & Drink" && typeName == "Specialist Food & Drink" )
              {
                  $scope.clearCategorySpecialistFoodDrinkMarker();
              }
              else if( name == "Bakery" && typeName == "Bakery" )
              {
                  $scope.clearCategoryBakeryMarker();
              }
              else if( name == "QSR" && typeName == "QSR" )
              {
                  $scope.clearCategoryQSRMarker();
              }
              else if( name == "Wholesale" && typeName == "Wholesale" )
              {
                  $scope.clearCategoryWholesaleMarker();
              }
              else if( name == "Vending Machine" && typeName == "Vending Machine" )
              {
                  $scope.clearCategoryendingMachineMarker();
              }
              else if( name == "Specialist Other" && typeName == "Specialist Other" )
              {
                  $scope.clearCategorySpecialistOtherMarker();
              }
              else if( name == "News / Magazine Store" && typeName == "News / Magazine Store" )
              {
                  $scope.clearCategoryNewsMagazineStoreMarker();
              }
              else if( name == "Hospitals" && typeName == "Hospitals" )
              {
                  $scope.clearCategoryHospitalsMarker();
              }
              else if( name == "Modern Pharmacy" && typeName == "Modern Pharmacy" )
              {
                  $scope.clearCategoryModernPharmacyMarker();
              }
              else if( name == "Speciality Other" && typeName == "Speciality Other" )
              {
                  $scope.clearCategorySpecialityOtherMarker();
              }
              else if( name == "Baby Center" && typeName == "Baby Center" )
              {
                  $scope.clearCategoryBabyCenterMarker();
              }
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

$scope.initHeatMap = function()
{
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: $scope.getPoints(),
        map: map
        });
        //<span ng-if="showStorePlaceTypes">
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


    $scope.getData = function(event, index) 
    {
        var jsonObject = JSON.parse($scope.selectedStore);

        $scope.clearAllPlacesMarkers();
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
        
        if (jsonObject.STANDARD_HIERARCHY == "Small Provision Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Café" ||
            jsonObject.STANDARD_HIERARCHY == "Other Convenience Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Medium Provision Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Hypermarket" ||
            jsonObject.STANDARD_HIERARCHY == "Other Institutional" ||
            jsonObject.STANDARD_HIERARCHY == "Catering" ||
            jsonObject.STANDARD_HIERARCHY == "Supermarket" ||
            jsonObject.STANDARD_HIERARCHY == "Large Provision Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Petrol Mart Station" ||
            jsonObject.STANDARD_HIERARCHY == "Restaurant" ||
            jsonObject.STANDARD_HIERARCHY == "School" ||
            jsonObject.STANDARD_HIERARCHY == "Pet Shop" ||
            jsonObject.STANDARD_HIERARCHY == "Medium Provision Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Chinese Medical Hall" ||
            jsonObject.STANDARD_HIERARCHY == "Other Convenience Stores" ||
            jsonObject.STANDARD_HIERARCHY == "Traditional Pharmacy" ||
            jsonObject.STANDARD_HIERARCHY == "Specialist Food & Drink" ||
            jsonObject.STANDARD_HIERARCHY == "Bakery" ||
            jsonObject.STANDARD_HIERARCHY == "QSR" ||
            jsonObject.STANDARD_HIERARCHY == "Wholesale" ||
            jsonObject.STANDARD_HIERARCHY == "Vending Machine" ||
            jsonObject.STANDARD_HIERARCHY == "Specialist Other" ||
            jsonObject.STANDARD_HIERARCHY == "News / Magazine Store" ||
            jsonObject.STANDARD_HIERARCHY == "Hospitals" ||
            jsonObject.STANDARD_HIERARCHY == "Modern Pharmacy" ||
            jsonObject.STANDARD_HIERARCHY == "Speciality Other" ||
            jsonObject.STANDARD_HIERARCHY == "Baby Center"
            )
        {
            $scope.showStorePlaceTypes = true;
            latLng = new google.maps.LatLng(jsonObject.LATITUDE, jsonObject.LONGITUDE); 
            bounds  = new google.maps.LatLngBounds();
            bounds.extend(latLng);
    
            // Creating a marker and putting it on the map
            var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: jsonObject.CUST_NAME,
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
              infoWindow.setContent('<h3>' + "Customer Name         :" + jsonObject.CUST_NAME + '</h3>'
              + "<br/>" + "Customer Status    :" + jsonObject.CUST_STATUS 
              + "<br/>" + "Postal Code        :" +jsonObject.POSTAL_CODE_1
              + "<br/>" + "Address            :" +jsonObject.ADDR_TOTAL 
              + "<br/>" + "Company Hierarchy  :" +jsonObject.COMPANY_HIERARCHY
              + "<br/>" + "Standard Hierarchy :" +jsonObject.STANDARD_HIERARCHY 
              + "<br/>" + "Latitude           :" +jsonObject.LATITUDE
              + "<br/>" + "Longitude          :" +jsonObject.LONGITUDE);

            infoWindow.open(map, marker);

            });

            cityAndRegionMarkers.push(marker);

            })(marker, jsonObject);
        }
        

        var storeLatLng = { lat : jsonObject.LATITUDE , lng : jsonObject.LONGITUDE};

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
                        //componentRestrictions: {'country': 'SG'},
                        type : [ 'restaurant']
                    },$scope.restaurantCallback);

                    //https://developers.zomato.com/api/v2.1/geocode?lat=3.14692831&lon=101.7466792
                    $http({
                        method: 'GET',
                        url: 'https://developers.zomato.com/api/v2.1/geocode?',
                        headers: {'user-key' : '1b6ddcb47426d068e923e86a6046a39b'},
                        params: {
                            lat: jsonObject.LATITUDE, 
                            lon: jsonObject.LONGITUDE
                        }
                    }).success(function(data) {

                      //console.log("---success---:",data);
                      console.log("---data.nearby_restaurants.length---:",data.nearby_restaurants.length);
                      for (var i = 0; i < data.nearby_restaurants.length; i++) 
                      {
                        var place = data.nearby_restaurants[i].restaurant;
                        if( selectedRatingFilterArray.length == 0 || selectedRatingFilterArray.length == 2 )
                        {
                            $scope.createPlacesMarkerForZomatoRestaurant(place);
                        }
                        else if(selectedRatingFilterArray.length == 1 )
                        {
                            if( selectedRatingFilterArray[0] == 3 )
                            {
                                if( typeof place.user_rating.aggregate_rating == "undefined" || place.user_rating.aggregate_rating < 3 )
                                {
                                    $scope.createPlacesMarkerForZomatoRestaurant(place);
                                }
                            }
                            else if( place.user_rating.aggregate_rating > 3 && selectedRatingFilterArray[0] == 5 )
                            {
                                $scope.createPlacesMarkerForZomatoRestaurant(place);
                            }
                        }
                      }
                  
                    }).error(function(error) {
                      console.log("---error---:",error);
                    });

                    //&q=cafe
                    $http({ method: 'GET', url: 'https://graph.facebook.com/search?type=place&fields=name,checkins,hours,location,engagement,is_verified,link,overall_star_rating,payment_options,price_range,restaurant_specialties&q=restaurants&center='+ jsonObject.LATITUDE + ',' +jsonObject.LONGITUDE +'&distance=2000&access_token=1837470493045321|SdcUiYX-RcYgghJWMtc07ph0O6I' }).
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

                          if( selectedRatingFilterArray.length == 0 || selectedRatingFilterArray.length == 2 )
                          {
                              $scope.createPlacesMarkerForFacebookRestaurant(place);
                          }
                          else if(selectedRatingFilterArray.length == 1 )
                          {
                              if( selectedRatingFilterArray[0] == 3 )
                              {
                                  if( typeof place.overall_star_rating == "undefined" || place.overall_star_rating < 3 )
                                  {
                                      $scope.createPlacesMarkerForFacebookRestaurant(place);
                                  }
                              }
                              else if( place.overall_star_rating > 3 && selectedRatingFilterArray[0] == 5 )
                              {
                                  $scope.createPlacesMarkerForFacebookRestaurant(place);
                              }
                          }
                        }
                        //console.log("---restaurantsFb---",restaurants);

                        // Array to keep track of duplicates
                        var duplicates = [];
                        $scope.AllInOneRestaurants = restaurants.filter(function(element) {
                        // If it is not a duplicate, return true
                        if (duplicates.indexOf(element.Name) == -1) 
                        {
                          duplicates.push(element.Name);
                            return true;
                        }
                        return false;
                        });

                        console.log("---$scope.AllInOneRestaurants---",$scope.AllInOneRestaurants);
                        
                      }).
                      error(function (data, status, headers, config) {
                          console.log("---Error---:",status);
                  });

                  

                }
                else if(typeName == "Airport")
                {
                    var service1 = new google.maps.places.PlacesService(map);
                    service1.nearbySearch({
                        location : storeLatLng,
                        radius : 2000,
                        //componentRestrictions: {'country': 'SG'},
                        type : [ 'airport']
                    }, $scope.airportCallback);   
                }
                else if(typeName == "Bar")
                {
                    var service2 = new google.maps.places.PlacesService(map);
                            service2.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
                                type : [ 'bar']
                            }, $scope.barCallback);   
                }
                else if(typeName == "Bus Station")
                {
                    var service3 = new google.maps.places.PlacesService(map);
                            service3.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
                                type : [ 'bus_station']
                            }, $scope.busStationCallback);
                }
                else if(typeName == "Cafe")
                {
                    var service4 = new google.maps.places.PlacesService(map);
                            service4.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
                                type : [ 'cafe']
                            }, $scope.cafeCallback);
                }
                else if(typeName == "Casino")
                {
                    var service5 = new google.maps.places.PlacesService(map);
                            service5.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
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
                                //componentRestrictions: {'country': 'SG'},
                                type : [ 'night_club']
                            }, $scope.nightClubCallback);
                }
                else if(typeName == "Park")
                {
                    var service10 = new google.maps.places.PlacesService(map);
                            service10.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
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
                                //componentRestrictions: {'country': 'SG'},
                                type : [ 'subway_station']
                            }, $scope.subwayCallback);
                }
                else if(typeName == "Shopping Mall")
                {
                    var service13 = new google.maps.places.PlacesService(map);
                            service13.nearbySearch({
                                location : storeLatLng,
                                radius : 2000,
                                //componentRestrictions: {'country': 'SG'},
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
                                //componentRestrictions: {'country': 'SG'},
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
                    restaurants = [];
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
        $scope.clearCategorySmallProvisionStoresMarker();
        $scope.clearCategoryCaféMarker();
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

    $scope.clearCategoryCaféMarker = function()
    {
        for (var key in categoryCaféMarker) 
        {
          categoryCaféMarker[key].setMap(null);
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
       // var restaurantsCount = results.length;
        if (status === google.maps.places.PlacesServiceStatus.OK) 
        {
          //google.maps.places.type
          for (var i = 0; i < results.length; i++) 
          {

            var place = results[i];
            var object = {
                        "Name": place.name,
                        "Rating": place.rating,
                        "Address":place.formatted_address,
                        "Latitude": place.geometry.location.lat(),
                        "Longitude": place.geometry.location.lng(),
            };
            restaurants.push(object);


            if( selectedRatingFilterArray.length == 2 )
            {
                $scope.createPlacesMarkerForRestaurant(results[i]);
            }
            else if(selectedRatingFilterArray.length == 1 )
            {
                if( selectedRatingFilterArray[0] == 3 )
                {
                    if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                    {
                        $scope.createPlacesMarkerForRestaurant(results[i]);
                    }
                }
                else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                {
                    $scope.createPlacesMarkerForRestaurant(results[i]);
                }
            }
            else if(selectedRatingFilterArray.length == 0 )
            {
                $scope.createPlacesMarkerForRestaurant(results[i]);
            }
          }
          console.log("--- Google Restaurants---", restaurants);
          // Array to keep track of duplicates
          var duplicates = [];
          $scope.AllInOneRestaurants = restaurants.filter(function(element) {
          // If it is not a duplicate, return true
          if (duplicates.indexOf(element.Name) == -1) 
          {
            duplicates.push(element.Name);
              return true;
          }
          return false;
          });
          console.log("---duplicates111---",duplicates);
          console.log("---$scope.AllInOneRestaurants NAME---",$scope.AllInOneRestaurants);



          for (var i = 0; i < restaurants.length; i++) 
          {
              var latitude1 = restaurants.Latitude;
              var longitude1 = restaurants.Longitude;
              for(var j = 0; j < restaurants.length; j++)
              {
                var latitude2 = restaurants.Latitude;
                var longitude2 = restaurants.Longitude;
                var distance = $scope.getDistanceFromLatLonInKm(latitude1,longitude1,latitude2,longitude2);
                console.log("---distance---: ",distance);
              }

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
            if( selectedRatingFilterArray.length == 2 )
            {
                $scope.createPlacesMarkerForAirport(results[i]);
            }
            else if(selectedRatingFilterArray.length == 1 )
            {
                if( selectedRatingFilterArray[0] == 3 )
                {
                    if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                    {
                        $scope.createPlacesMarkerForAirport(results[i]);
                    }
                }
                else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                {
                    $scope.createPlacesMarkerForAirport(results[i]);
                }
            }
            else if(selectedRatingFilterArray.length == 0 )
            {
                $scope.createPlacesMarkerForAirport(results[i]);
            }
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
            if( selectedRatingFilterArray.length == 2 )
            {
                $scope.createPlacesMarkerForBar(results[i]);
            }
            else if(selectedRatingFilterArray.length == 1 )
            {
                if( selectedRatingFilterArray[0] == 3 )
                {
                    if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                    {
                        $scope.createPlacesMarkerForBar(results[i]);
                    }
                }
                else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                {
                    $scope.createPlacesMarkerForBar(results[i]);
                }
            }
            else if(selectedRatingFilterArray.length == 0 )
            {
                $scope.createPlacesMarkerForBar(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForBusStop(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForBusStop(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForBusStop(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForBusStop(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForCafe(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForCafe(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForCafe(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForCafe(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForCasino(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForCasino(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForCasino(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForCasino(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForLiquor(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForLiquor(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForLiquor(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForLiquor(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForMealTakeAway(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForMealTakeAway(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForMealTakeAway(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForMealTakeAway(results[i]);
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
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForMovieTheater(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForMovieTheater(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForMovieTheater(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForMovieTheater(results[i]);
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
              
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForNightClubs(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForNightClubs(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForNightClubs(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForNightClubs(results[i]);
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
              
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForPark(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForPark(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForPark(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForPark(results[i]);
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
              
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForSuperMarket(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForSuperMarket(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForSuperMarket(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForSuperMarket(results[i]);
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
              
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForSubway(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForSubway(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForSubway(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForSubway(results[i]);
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
              
              if( selectedRatingFilterArray.length == 2 )
              {
                  $scope.createPlacesMarkerForShoppingMall(results[i]);
              }
              else if(selectedRatingFilterArray.length == 1 )
              {
                  if( selectedRatingFilterArray[0] == 3 )
                  {
                      if( typeof results[i].rating == "undefined" || results[i].rating < 3 )
                      {
                          $scope.createPlacesMarkerForShoppingMall(results[i]);
                      }
                  }
                  else if( results[i].rating > 3 && selectedRatingFilterArray[0] == 5 )
                  {
                      $scope.createPlacesMarkerForShoppingMall(results[i]);
                  }
              }
              else if(selectedRatingFilterArray.length == 0 )
              {
                  $scope.createPlacesMarkerForShoppingMall(results[i]);
              }
          }
        }
        // shoppingMallMarkersCluster = new MarkerClusterer(map, shoppingMallMarkers,
        // {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    };

    $scope.createPlacesMarkerForZomatoRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        locationLatLng = new google.maps.LatLng(place.location.latitude, place.location.longitude); 
        var image = 'images/green.png';
        
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
            restaurantsMarkers.push(restaurantMarker); 
    };

    $scope.createPlacesMarkerForFacebookRestaurant = function(place)
    {
        $scope.clearInfoWindow();
        locationLatLng = new google.maps.LatLng(place.location.latitude, place.location.longitude); 
        var image = 'images/blue.png';
        
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

    var storeJSON = [
      {
        "CUST_NAME": "AC186732",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9927,
        "ADDR_TOTAL": "NO.6 GROUND FLOOR,JLN PRIMA 2, PUSAT NIAGA METRO PRIMA ,KEPONG,KL 016-9927 6130",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC152120",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9809,
        "ADDR_TOTAL": "LOT 1344 LORONG 2B, PJT COMM. CTR 98007 MIRI SARAWAK  014-691-9809 (MDM WONG) EMA4",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC214409",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9589,
        "ADDR_TOTAL": "SUB LOT 7 LOT 597,BLOCK 5 KUALA BARAM LAND DISTRICT 98100 MIRI 019-894-95890",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC058718",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9560,
        "ADDR_TOTAL": "LOT PTD 8535-9560 BANDAR UTAMA MUKIM SG SEGAMAT DAERAH SEGAMAT JOJBSEGAMAT ",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - Modern Trade - Key Account",
        "STANDARD_HIERARCHY": "Hypermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC248114",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9493,
        "ADDR_TOTAL": "BMI MEDICAL PLANT FIZ PHASE 2, BAYAN LEPAS 11900 PENANG  ATTN : Rusydi 018-575-9493",
        "COMPANY_HIERARCHY": "Out of Home - Business/Industry - Factory and Office pantry /show room/service centr - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC248466",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9425,
        "ADDR_TOTAL": "(OSRAM OPTO SEMICONDUCTOR (M) S/B) BAYAN LEPAS PHASE 1 FIZ 11900 PENANG ATTN : FIZAN 014-9425 296",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Caterer - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC214778",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9341,
        "ADDR_TOTAL": "LOT 1140 GROUND FLOOR NEW LUTONG COMM CENTRE 98000 012-883-93410",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC042006",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9332,
        "ADDR_TOTAL": "Lot Pt 9325-9332 Sura Gate Mukim TEDUPAK",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC520320",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9332,
        "ADDR_TOTAL": "LOT PT 9325-9332 SURA GATE,MUKIM KUALA DUNGUN,2300  KUALA TERENGGANU TERENGGANU-",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - SUPERMARKET - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC219474",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9294,
        "ADDR_TOTAL": "\"LOT 8287-9294,GROUND FLOOR\" \"SECTION 64,JALAN TUN RAZAK\" KUCHING KUCHING",
        "COMPANY_HIERARCHY": "Modern - Major Account - Supermarket                  . - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC540732",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9281,
        "ADDR_TOTAL": "BLOCK E 12-0-2,DESA PANDAN, JALAN KAMPONG PANDAN, KUALA LUMPUR. 03-9281 84770",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292731",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -9122,
        "ADDR_TOTAL": "NO 148 KG TABANAK PETI SURAT 61424-09-9122 LAHAD DATU",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC005101",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -9002,
        "ADDR_TOTAL": "9000K-9002K, Batu 6, Jalan Kelantan Kuala Terengganu  OTT1NL",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.291752,
        "LONGITUDE": 103.114744
      },
      {
        "CUST_NAME": "AC208667",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8933,
        "ADDR_TOTAL": "7,FELDA AIR TAWAR 2 81900 KOTA TINGGI TEL:07-8933 6520",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539958",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8925,
        "ADDR_TOTAL": "NO.10 (GF), JALAN 3/7, SEKSYEN 3,BANDAR BARU BANGI, 43650 SELANGOR. (K408)03-8925 97440",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208668",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8890,
        "ADDR_TOTAL": "45 & 47,JLN SS 2/6 TMN SRI SAUJANA 81900 KOTA TINNGI TEL:07-8890 2510",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210746",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8873,
        "ADDR_TOTAL": "7,JLN HANG JEBAT 26 TMN SKUDAI BARU 81300 SKUDAI.JOHOR TEL:07-8873 6000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210220",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8838,
        "ADDR_TOTAL": "28,JLN MELATI 2 TMN MELATI PUTIH 81900 KOTA TINGGI TEL:07-8838 9060",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207986",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8831,
        "ADDR_TOTAL": "28,JLN TAMBATAN 81900 KOTA TINGGI TEL:07-8831 532   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop-",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208349",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8826,
        "ADDR_TOTAL": "102-A,JALAN TUN HABAB (LOMBONG), 81900 KPTA TINGGI JOHOR TEL:07-8826 0030",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210754",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8676,
        "ADDR_TOTAL": "STESEN MINYAK SHELL BATU 10 3/4 LOT 26082,JLN KOTA TNGGI 818800 ULU TIRAM ,JOHOR TEL:07-8676 599 FAX:07-8676 5980",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210732",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8636,
        "ADDR_TOTAL": "8,JLN LADING 23 TMN PUTRI WANGSA 81800 ULU TIRAM TEL;07-8636 3340",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208840",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8615,
        "ADDR_TOTAL": "8A,JLN ARA 19 TMN DESA CEMERLANG 81800 ULU TIRAM ,JOHOR BAHRU TEL:07-8615 7980",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208994",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8611,
        "ADDR_TOTAL": "2,JLN CANGGIH 5 TMN PERINDUSTRIAN CEMERLANG 81800 ULU TIRAM 07-8611 643/ 3260",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC380069",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8372,
        "ADDR_TOTAL": "PT8361-8372,Taman Wangsa Mewangi, Jalan Persiaran Raya, Gua Musang, Kelantan",
        "COMPANY_HIERARCHY": "Planned Shopping - Supermarket - Supermarket - Regional - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC520322",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8372,
        "ADDR_TOTAL": "PT 8361-8372, TMN WANGSA MEWANGI,JLN PERSIARAN RAY  KOTA BAHRU KELANTAN-",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - SUPERMARKET - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC540737",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8318,
        "ADDR_TOTAL": "NO.32,JALAN PP 2/3, TMN PUTRA PERDANA, PUCHONG,SELANGOR. 03-8318 09070",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC026520",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8306,
        "ADDR_TOTAL": "Lot 8299-8306, Jalan Sherip Masahor Kuching (DU-1)  OTT1N",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC214494",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8229,
        "ADDR_TOTAL": "LOT 10630 GRD FLR, BLK 5, LLD JLN AIRPORT 98000 MIRI 019-487-82290",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207974",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -8228,
        "ADDR_TOTAL": "SUNGAI CEMARAN ,DESARU 81900 KOTA TNGGI ,JOHOR TEl:07-8228 017/018   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC133740",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8073,
        "ADDR_TOTAL": "LOT 8072-8073, SIBU JAYA COMMERCIAL TOWNSHIP, SIBU.   EMA4",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC182617",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8070,
        "ADDR_TOTAL": "A-1-20, APARTMENT SRI KESIDANG, JLN BAYAM, BDR PUCHONG JAYA, 47100 PUCHONG, SEL. TEL:03-8070 0143 (MR.THIBAGARAN)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC187407",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -8060,
        "ADDR_TOTAL": "L001, JLN PJU 10/2A,  DAMANSARA DAMAI,DAMANSARA,  SELANGOR DARUL EHSAN, MALAYSIA. TEL : 03-8060 4145  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539789",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -7982,
        "ADDR_TOTAL": "205, MAIN STREET, SALAK SOUTH, KUALA LUMPUR.  03-7982 4537 0",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC249837",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7960,
        "ADDR_TOTAL": "LOT 9A, JALAN 223 46100 PETALING JAYA SELANGOR DARUL EHSAN  TEL : 03-7960 3233  , FAX : 03-7960 3418 ",
        "COMPANY_HIERARCHY": "Planned Shopping - Hypermarket - Hypermarket - International - ",
        "STANDARD_HIERARCHY": "Hypermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC187256",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7954,
        "ADDR_TOTAL": "MONT KIARA,  KUALA LUMPUR. H/P : 012-377 9028 (MR. CHUAH) TEL : 03-7954 1084 (MS WONG/CHIN SING)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210150",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7921,
        "ADDR_TOTAL": "BG-20,BLK B K.K.R LARKIN PERDANA TMN LARKIN PERDANA,JOHOR BAHRU TEL:012-7921 508  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC187033",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7877,
        "ADDR_TOTAL": "NO.17, JLN 20/14, DARAMOUNT GARDEN, PETALING JAYA. TEL : 03-7877 8786 (KASSIM)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC187159",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7877,
        "ADDR_TOTAL": "NO.18, JALAN SS 5B/4, KELANA JAYA, PETALING JAYA, SELANGOR. TEL: 03-7877 7786  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC248617",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7803,
        "ADDR_TOTAL": "Y-BG-03 BLOCK KAYANGAN CRIMSON COMMERCIAL CENTRE JALAN PJU 1 A/41 47301 PETALING JAYA,SELANGOR  FAX : 03-7803 1191",
        "COMPANY_HIERARCHY": "Out of Home - Business/Industry - Factory and Office pantry /show room/service centr - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC004098",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7569,
        "ADDR_TOTAL": "Lot HSM 7566-7569, Mukim Pedah, Jerantut.   PAJEJER ",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Super - LMT SUPER",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 3.934367,
        "LONGITUDE": 102.381688
      },
      {
        "CUST_NAME": "AC042146",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7555,
        "ADDR_TOTAL": "Lot 7549-7555    TEBEBES ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC248148",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7495,
        "ADDR_TOTAL": "C-33-1 & 35-1 ,1ST FLOOR,BLK C ,JAYA ONE 72-A JALAN UNIVERSITI, SECTION 13 46200 PETALING JAYA SELANGOR DARUL EHSAN TEL : 03-7495 6222 ,FAX : 03-7495 9980 ",
        "COMPANY_HIERARCHY": "Out of Home - Leisure/Sports/Enter - Cinema/Movie Theatre - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292644",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7366,
        "ADDR_TOTAL": "MDLD 0763 PUBLIC VILLA 91100 LAHAD DATU 911122-12-7366   ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC040826",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7254,
        "ADDR_TOTAL": "LOT 7251-7254, SPG 57 LORONG SETIA DIRAJA KAWASAN PERINDUSTRIA SG DUHON KUALA BELAIT, KA1331  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292768",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -7158,
        "ADDR_TOTAL": "KG SUKAU WDT 121 90200 KOTA KINABATANGAN KAMSIAH AWANG 790101-12-7158  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC590930",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -6951,
        "ADDR_TOTAL": "K-6951,KEDAI FASA 1, TAMAN FIKRI 2, CHUKAI KEMAMAN.   .",
        "COMPANY_HIERARCHY": "East-Pahang - General-Trade-East-Pahang - Class-D-East-Pahang - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC009112",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6894,
        "ADDR_TOTAL": "LOT 6893-6894 NO 2-3, KG PAYA JARAS HILIR, SUNGAI BULOH SELANGOR.  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 3.188497,
        "LONGITUDE": 101.538337
      },
      {
        "CUST_NAME": "AC292912",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6705,
        "ADDR_TOTAL": "LOT 8-1 , A290 JLN DAM BARU OFF MILE 1.5 JLN DAM 861118-49-6705  ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC027909",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6460,
        "ADDR_TOTAL": "Lot 5443-6460 (Parent Lot 5569), Block 9 Lorong  Cahya Mata 4,Salak Land District Bandar Samariang Commercial Centre  SWSWNL -",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Hyper - LMT HYPER",
        "STANDARD_HIERARCHY": "Hypermarket",
        "LATITUDE": 1.5908863,
        "LONGITUDE": 110.4034717
      },
      {
        "CUST_NAME": "AC249986",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -6422,
        "ADDR_TOTAL": "LGF-116 & 117, QUEENSBAY MALL 100 PERSIARAN BAYAN INDAH 11900 BAYAN LEPAS PENANG  TEL : 04-6422 161 .",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292754",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6375,
        "ADDR_TOTAL": "KM 35 JLN TAWAU SHOPIAN ABDULLAH 630512-02-6375   ",
        "COMPANY_HIERARCHY": "Out of Home - Business/Industry - Factory/Office Canteen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC579924",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6319,
        "ADDR_TOTAL": "SU86, SU87, TINGKAT BAWAH  JALAN TERENDAK HEIGHTS 1, TAMAN TERENDAK HEIGHTS  76300 SUNGAI UDANG, MELAKA.TEL:012-6319 697  88",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-D-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC249951",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6251,
        "ADDR_TOTAL": "17G,JALAN 7/33B,  MWE CAMMERCIAL PARK, 52000 KEPONG,KUALA LUMPUR    ATTN:CONNIE 03-6251 3838",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292763",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6220,
        "ADDR_TOTAL": "1ST FLOOR BLOCK 5 NO 7 PUSAT KOMERSIL BANDAR CENDERAWASIH NAJLA BINTI KAMARUDDIN 910929-12-6220  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292611",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6209,
        "ADDR_TOTAL": "BATU 17 JLN SANDAKAN JUNIDI BIN ABD GAFFAR 861129-49-6209 SAING BIN SINRING  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292762",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6194,
        "ADDR_TOTAL": "PS 61013 JLN AGASEH DEPAN SMK AGASEH ASRINAH BINTI AWANG 800521-12-6194  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539750",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -6138,
        "ADDR_TOTAL": "NO 8,JLN SJ 14, TAMAN SELAYANG JAYA, 68100 BATU CAVES, SELANGOR DARUL EHSAN. (J076) 03-6138 5485 0",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - LPS - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC540756",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -6137,
        "ADDR_TOTAL": "JALAN 11,OFF JALAN 15, NO.40 B,SELAYANG BARU, SELANGOR.  03-6137 3239 0",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292829",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6099,
        "ADDR_TOTAL": "SIMPNG TH GROUP JLAN SANDAKAN ADNAN BIN ISMAIL 780409-12-6099  ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292775",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6079,
        "ADDR_TOTAL": "KG TANJUNG LABIAN P/S 60344@61166 TUNGKU LAHAD DATU 781004-12-6079  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC508872",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -6017,
        "ADDR_TOTAL": "KG CENDERAMATA, JALAN SAPI NAGOH, 90100, BELURAN, SABAH. IC NO : 630830-01-6017. MR. YAH LIAN CHUAN,",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292907",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5997,
        "ADDR_TOTAL": "SMK TUNGKU  D. NOR MISSUARY 840319-12-5997  ",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292691",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5976,
        "ADDR_TOTAL": "KG TELISAI PS 62419 TUNGKU 91128 LAHAD DATU RAFIDAH BINTI AZIZ 790812-12-5976  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292598",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5960,
        "ADDR_TOTAL": "MDLD 6498 , BANDAR SRI PERDANA, 91100 LAHAD DATU, SABAH. KASMIA BINTI MANGGATI 960211-12-5960  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292917",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5924,
        "ADDR_TOTAL": "CHINESE MIDDLE SCHOOL LIM SIEW HWA 790518-12-5924   ",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Breeder - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292803",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5921,
        "ADDR_TOTAL": "TAMAN AMAN JAYA MDLD 5185 800214-12-5921   ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292942",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5900,
        "ADDR_TOTAL": "NO 5 LOT 9 LORONG I-PEAK 3 I PEAK JLN DAM 91100 LAHAD DATU 840716-02-5900  ",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC248266",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5881,
        "ADDR_TOTAL": "PLOT 6, HILIR SUNGAI KELUANG 4 BAYAN LEPAS, FIZ PHASE 4 11900 PENANG   ATTN : ISHWARY 016-404-5881",
        "COMPANY_HIERARCHY": "Out of Home - Business/Industry - Factory and Office pantry /show room/service centr - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292857",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5850,
        "ADDR_TOTAL": "P/O BOX 60211 KM 1.5 91111 SANDAU LAHAD DATU 690202-12-5850 HJ SAOMAH BINTI BACHO  ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292859",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5850,
        "ADDR_TOTAL": "BOONRICH JLN SANDAKAN HJ SAOMAH BINTI PALLU 690202-12-5850   ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC022041",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -5732,
        "ADDR_TOTAL": "Lot 5730-5732, Jalan Jelawat, Mukim 1, Pusat Bandar Seberang Jaya.  OTT1NL ",
        "COMPANY_HIERARCHY": "Convenience Store - Petrol Kiosk - Petrol Kiosk - Petrol Kiosk",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC027671",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": -5589,
        "ADDR_TOTAL": "Lot 5586-5589 Block 225 KNLD 9(S/L 31-34 34-37 Kuching City Mall Commercial Centr New Expressway 4 1/2 Miles of Penrissen  SWKCNL 0",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 1.49392,
        "LONGITUDE": 110.352901
      },
      {
        "CUST_NAME": "AC037692",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5565,
        "ADDR_TOTAL": "LOT 5561-5565, JALAN SONG    SWKCNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC042137",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5488,
        "ADDR_TOTAL": "No-5488    KEKBKET ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC187479",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5459,
        "ADDR_TOTAL": "NO.62, JLN BESAR, HULU BERNAM .  TEL : 03-5459 6179  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC218100",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": -5417,
        "ADDR_TOTAL": "No.30-32, Lot 5415-5417, Rh Plaza, Jalan Lapangan Terbang, Kuching.   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC108223",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "Jusco AU2 Shopping Centre, Lot G-38 No. 6, Jln Setiawangsa (Jln 37/56) AU2, B.B.Ampang, Mkm Ulu Klang Hp: 012-4223868 (Sharon Lim)  54200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC194011",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "No.4,Jalan Keramat, Kg. Dato Keramat, Kuala Lumpur   54200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC049551",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "23 TINGKAT BAWAH BAZAR PUSAT BANDAR TAMAN KERAMAT KUALA LUMPUR  KLDKKERAMAT 54200",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC108814",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "No. 23, Tingkat Bawah Bazar Pusat Bandar Taman Keramat 54200 Kuala Lumpur Hp: 019-2969072  54200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC111748",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "LOT 8, JALAN AU 5, TAMAN LEMBAH KERAMAT 54200 KUALA LUMPUR   54200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC109550",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54200,
        "ADDR_TOTAL": "No. 2, Jalan 5/56 AU3 Blk G, Sek. Keb. AU3 Ampang Ulu Klang, 54200 K.L Hp: 012-2649676 (En. Zainal)  54200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223704",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54206,
        "ADDR_TOTAL": "LOT 34626, KG BENGKURONG, BRUNEI DARUSSALAM TEL : 2654206   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223486",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54206,
        "ADDR_TOTAL": "NO. 258, JLN. BINTURAN PENANJUNG KG. PENANJONG, TUTONG BRUNEI DARUSSALAM TEL  :02-654206      FAX  :  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC179866",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54217,
        "ADDR_TOTAL": "63,JALAN TEO JOO, TRIANG,PAHANG.  TEL:012-9687141/09-2554217  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC198224",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54222,
        "ADDR_TOTAL": "1, JLN CERIA 1,  83000 BATU PAHAT, JOHOR. 012-7654222   ",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC177888",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54226,
        "ADDR_TOTAL": "NO.8,LALUAN LAPANGAN SIBER 1 PANORAMA LAPANGAN PERDANA 31650 IPOH PERAK.    (017-5371866,012-5754226)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC172185",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54235,
        "ADDR_TOTAL": "PTB 76 , Depan Stesen Bas , Machang , Kelantan  TEL : 09-9754235   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC177170",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54242,
        "ADDR_TOTAL": "GERAI NO.5,MDTM RAWAT & REHAT TOLL LAMA SLIM RIVER PERAK    (H/P:016-5054242)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223773",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54266,
        "ADDR_TOTAL": "UNIT 7, BGN HASBULLAH 2, GADONG, BRUNEI DARUSSALAM.  TEL : 2454266 C.O.D  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC075620",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54274,
        "ADDR_TOTAL": "LEVEL 1 WISMA SEDCO LOT TL 01754274  OTOTKOTA KINABALU ",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - Modern Trade - Key Account",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC025519",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54274,
        "ADDR_TOTAL": "GST.001952423936 Level 1, Wisma Sedco, Lot TL 01754274, Coastal Highway.  OTT1NL ",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Super - LMT SUPER(Not Use)",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 5.969127,
        "LONGITUDE": 116.11483
      },
      {
        "CUST_NAME": "AC168555",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54280,
        "ADDR_TOTAL": "NO.11,JALAN MEWAH, TAMAN MEWAH, KAMUNTING, PERAK. TEL:012-5554280  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC077357",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54288,
        "ADDR_TOTAL": "168 Padang Lembu  Gurun Kedah     04-4254288  8330",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC352952",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54296,
        "ADDR_TOTAL": "LOT 1658 JALAN ABDUL KADIR ADABI BEREK 12 15200 KOTA BHARU,KEL. TEL:019-9354296  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC053118",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "17G, JALAN SAETIAWANGSA 8, TAMAN SETIAWANGSA, 54300 KUALA LUMPUR.  KLSTSETAPAK 54300",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - Convenience Store",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237882",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  NO.17(GROUND FLOOR),JALAN SETIAWANGSA 8, TAMAN SETIAWANGSA. KUALA LUMPUR,WILAYAH PERSEKUTUAN 54300",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238460",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "17-2, JALAN SETIAWANGSA 9 TAMAN SETIAWANGSA W.P. KUALA LUMPUR KUALA LUMPUR 54300",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC192024",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "No. 26, Jalan 11/55C Taman Setaiwangsa 54300 Kuala Lumpur   54300",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC011227",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "NO.33G,JALAN SETIAWANGSA 11A, TAMAN SETIAWANGSA , 54300 KUALA LUMPUR.  KLAMTHU ",
        "COMPANY_HIERARCHY": "Industrial Canteen - Pharmacy - Pharmacy - Pharmacy",
        "STANDARD_HIERARCHY": "Traditional Pharmacy",
        "LATITUDE": 3.178089,
        "LONGITUDE": 101.743214
      },
      {
        "CUST_NAME": "AC387701",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54300,
        "ADDR_TOTAL": "NO.40, JALAN 14/27B, TAMAN DESA SETAPAK, SEKSYEN 2, WANGSA MAJU, 54300 KUALA LUMPUR.  54300",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Indian Muslim Coffee Shop - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC170020",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54328,
        "ADDR_TOTAL": "NO.4,PERUSAHAAN PENGKALAN 3, TAMAN PERUSAH PERKHIDMATAN PENGKALAN, 34000 TAIPING,PERAK. 019-5654328  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC450198",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54358,
        "ADDR_TOTAL": "( AS 0254358-P ) 534, FELDA SUNGAI TIANG, PENDANG,KEDAH   6750",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223460",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54361,
        "ADDR_TOTAL": "UNIT A-01, NO. 12021, BANGUNAN HAJI OMAR, SIMPANG 15, GADONG, B.S.B. NEGARA BRUNEI DARUSSALAM TEL  :2454361      FAX  :  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223881",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54376,
        "ADDR_TOTAL": "NO.4, SPG.14, JALAN KIARONG, KG KIARONG BE1318, BSB, BRUNEI DARUSSALAM. TEL : 2454376  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC447131",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54378,
        "ADDR_TOTAL": "BATU 61/2 JLN TITI GAJAH, 06220 ALOR SETAR.   ATTN:MOHD SALMI TEL:019-3054378 6220",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC178085",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54384,
        "ADDR_TOTAL": "LOT.35,KG TERSUSUN BATU 3 35350 TEMOH (012-5554384)   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC006476",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54400,
        "ADDR_TOTAL": "G-00-06, PERUMAHAN AWAN DESA REJANG, 54400 SETAPAK JAYA, KUALA LUMPUR   KLSTTSE ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 3.186827,
        "LONGITUDE": 101.731779
      },
      {
        "CUST_NAME": "AC025457",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54400,
        "ADDR_TOTAL": "GST.000919654400 NO. G3, WISMA TING HUI JALAN MANGGALADOI,TAMPARULI, SABAH  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.969104,
        "LONGITUDE": 116.114694
      },
      {
        "CUST_NAME": "AC470373",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54406,
        "ADDR_TOTAL": "18 PEKAN SEMELING SEMELING KEDAH  TEL    :013-4554406 8400",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC014787",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54409,
        "ADDR_TOTAL": "Lot G11, S'Mart Buiding PTD 154409, Batu 7 1/2 Jalan Kota Tinggi  OTT1NL ",
        "COMPANY_HIERARCHY": "Modern Trade - Super - Ind Super - IND SUPER",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 1.535194,
        "LONGITUDE": 103.783393
      },
      {
        "CUST_NAME": "AC460854",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54413,
        "ADDR_TOTAL": "NO.146,TAMAN BISTARI, KULIM, KEDAH.  ATTN :019-4354413 9000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC193473",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54444,
        "ADDR_TOTAL": "FO 17, PANGSAPURI BAIDURI, BANDAR TASIK KESUMA, BERANANG.   54444",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC447160",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54464,
        "ADDR_TOTAL": "CO.NO:AS0254464-W, NO.50,KM-13, JALAN DATUK KUMBAR, MUKIM LANGGAR, ALOR SETAR,KEDAH. 6500",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448654",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54470,
        "ADDR_TOTAL": "NO.1,SPG TIGA JALAN SUNGAI MATI 06500 LANGGAR ALOR SETAR KEDAH ATTN :04-7876745 & 012-4354470 6500",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC179976",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54477,
        "ADDR_TOTAL": "18 TAMAN CHENG SIEW 28300 TRIANG  09-2554477  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC183193",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54485,
        "ADDR_TOTAL": "TELUK PULAI H/P:016-9954485    0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC509302",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54486,
        "ADDR_TOTAL": "PETRONAS JALAN LEILA LOT 7754486,    JLN BOKARA SANDAKAN.",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC286201",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54500,
        "ADDR_TOTAL": "652-P,TAMAN BUKIT MELAKA, JALAN DELIMA 6, BUKIT BURANG, MELAKA.   754500",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Bakery - Bakery - ",
        "STANDARD_HIERARCHY": "Bakery",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC033904",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54500,
        "ADDR_TOTAL": "BANGUNAN MARIAMMAN RETAIL B, GRD FLOOR, NO.2 , JLN HANG KASTURI,   OTT1NL 54500",
        "COMPANY_HIERARCHY": "Convenience Store - Food Specialty - Food Specialty - QSR-Others",
        "STANDARD_HIERARCHY": "QSR",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223523",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54508,
        "ADDR_TOTAL": "BLOCK E, UNIT 1, SEMPURNA COMPLEX JALAN GADONG, BATU BERSURAT BRUNEI DARUSSALAM TEL  :2456222      FAX  :2454508  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210068",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54521,
        "ADDR_TOTAL": "LOT 4425,JLN. UNGKU MOHJSIN KG.UNGKU MOHSIN JOHOR  H/P:016-7654521  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC275676",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54521,
        "ADDR_TOTAL": "NO.5, GERAI BERHAMPIRAN STES BUS LUMUT 32200 LUMUT PERAK   TEL ; 016-2554521          ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC214099",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54531,
        "ADDR_TOTAL": "LOT 1175, LUTONG BARU, MIRI. 654531  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC172626",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54537,
        "ADDR_TOTAL": "B-229 , JALAN WAN AHMAD , TANAH MERAH , KELANTAN . TEL ; 09-9554537   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC481373",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54540,
        "ADDR_TOTAL": "NO 106 JALAN TU 42 TAMAN TASIK UTAMA AYER KEROH 754540 MELAKA MALAYSIA   .",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Indian Muslim Coffee Shop - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC384096",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54551,
        "ADDR_TOTAL": "NO.53 & 53M, JALAN KOSAS 1/3, TAMAN KOSAS,  42954551 0",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC377354",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54559,
        "ADDR_TOTAL": "FELDA ULU TEBRAU    ATTN:013-7654559 PN EANARIA ",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC216700",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54565,
        "ADDR_TOTAL": "Batu 8 , Kem Penrissen HP:016-8954565 -Mr. Wee Kuching.   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208198",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54566,
        "ADDR_TOTAL": "22, JALAN DANAU 3 TAMAN DESA JAYA  TEL: 07-3554566  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC474030",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54567,
        "ADDR_TOTAL": "NO:29,JALAN FAIR PARK,31400 IPOH.  TEL:017-5654567   ",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC507323",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54567,
        "ADDR_TOTAL": "NO.2 TAMAN SUTERA JAYA JALAN KUALA KETIL,BATU 2 SUNGAI PETANI KEDAH TEL : 04-4254567 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC471483",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54567,
        "ADDR_TOTAL": "2 TAMAN SUTERA JAYA JLN KUALA KETIL SUNGAI PETANI KEDAH TEL : 04-4254567 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC070046",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54600,
        "ADDR_TOTAL": "NO. 107, KG RAJA, PAGOH, 84200 MUAR, JOHOR.  JOJBMUAR 54600",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.16714411,
        "LONGITUDE": 102.7566095
      },
      {
        "CUST_NAME": "AC290416",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54600,
        "ADDR_TOTAL": "LOT 2008-3, TAMAN PERMATANG PASIR ALAI, PADANG TEMU, 754600 MELAKA.   ATTN : 30",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC094250",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54603,
        "ADDR_TOTAL": "NO 6, JALAN CUNGAH,  42000 PELABUHAN KLANG,  SELANGOR. TEL: 03 31621786/31654603  CEN4",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208663",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54615,
        "ADDR_TOTAL": "5,DAERITAN BANGUNAN KOPESI 81900 KOTA TINGGI,FELDA SEMENCU TEL:07-8954615   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223755",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54620,
        "ADDR_TOTAL": "NO. 4, SPG 46, JLN DATO RATNA, KG KIARONG, BRUNEI DARUSSALAM TEL : 2454620   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207182",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54620,
        "ADDR_TOTAL": "LOT 1356, JALAN KANGKAR TEBRAU, 81100 JOHOR BAHRU TEL : 017-7459099, 019-7154620   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC167134",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54638,
        "ADDR_TOTAL": "NO.36, JALAN SUNGAI BATU, 34900 PANTAI REMIS, PERAK TEL:016-4154638  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 4.209206,
        "LONGITUDE": 100.6952216
      },
      {
        "CUST_NAME": "AC168993",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54638,
        "ADDR_TOTAL": "NO.36, JALAN SUNGAI BATU, 34900 PANTAI REMIS, PERAK TEL:016-4154638  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC452463",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54654,
        "ADDR_TOTAL": "CO.NO:PG0354654-M, NO.5, JALAN ANGGERIK 2, BANDAR AMANJAYA, SUNGAI PETANI, KEDAH. 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC451243",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54656,
        "ADDR_TOTAL": "CO.NO:001954656-K, A2 & A3,LOT 1617, TAMAN KOTA JAYA, KOTA SARANG SEMUT, ALOR SETAR,KEDAH. 6800",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC214815",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54672,
        "ADDR_TOTAL": "LOT 1923,BLOK 3,JALAN PUTUS 4, PIASAU INDUSTRIES ESTATE , 98000 MIRI SARAWAK 085-663672/654672  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC169984",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54673,
        "ADDR_TOTAL": "51,JALAN PASAR, 36000,TELUK INTAN. TEL:05-6237028/019-5754673   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC162338",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54679,
        "ADDR_TOTAL": "14 Lebuh Intan   Sungai Petani Kedah     016-4954679 (Mohd Musa)  8000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC418174",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54691,
        "ADDR_TOTAL": "( 001554691-X ) NO 12 LORONG BAHI NILAM 3D BANDAR BUKIT TINGGI KLANG  ",
        "COMPANY_HIERARCHY": "Planned Shopping - Cash & Carry - ** DO NOT USE ** - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448196",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54693,
        "ADDR_TOTAL": "CO.NO:PG0354693-K, LOT3 -K03 3RD FLOOR, NO1 AMAN CENTRAL, LEBUHRAYA DARULAMAN, ALOR SETAR,KEDAH. 5100",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238045",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54700,
        "ADDR_TOTAL": "27,MENARA SHELL. 211,JALAN TUN SAMBATHAN,   KUALA LUMPUR 54700",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208350",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54712,
        "ADDR_TOTAL": "14, JALAN SAGU 35 TAMAN DAYA 81100 JOHOR BAHRU TEL : 3554712  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292708",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54720,
        "ADDR_TOTAL": "LADANG TOMANGGONG PO BOX 1209 90713 LAHAD DATU (GST REG NO:002081054720)  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292966",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54720,
        "ADDR_TOTAL": "LADANG BUKIT MAS THE RIVER ESTATE (GST REG NO:002081054720)   ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC076780",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54722,
        "ADDR_TOTAL": "51 Jalan Nilam  Taman Nilam  Sungai Petani Kedah     04-4254722  8000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC471207",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54722,
        "ADDR_TOTAL": "51 LOR 1-C TAMAN NILAM SUNGAI PETANI KEDAH TEL : 04-4254722 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC353021",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54726,
        "ADDR_TOTAL": "NO.55,JALAN BESAR 16200 TUMPAT KELANTAN TEL:09-7254726  ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448107",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54746,
        "ADDR_TOTAL": "CO.NO.:AS0354746-V, KEDAI MAKANAN MINUMAN & RUNCIT KG. CHANG DENG, MK. TEKAI KIRI, KUALA NERANG,KEDAH. 6350",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448929",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54747,
        "ADDR_TOTAL": "CO.NO:AS0254747-P, NO.1006, LORONG MERPATI, ALOR SETAR, KEDAH. 5200",
        "COMPANY_HIERARCHY": "Planned Shopping - Hard Discount - Wholesaler - ",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC217772",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54752,
        "ADDR_TOTAL": "No 9,Betong Bazaar 95700 Betong [GST ID:001182154752]   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC222462",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54752,
        "ADDR_TOTAL": "YUWANG PLANTATION, LADANG ULU TINGKAYU, 91209 KUNAK, SABAH.  GST NO:001873354752 -",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210504",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54752,
        "ADDR_TOTAL": "61, JALAN BETIK 1 KOTA MASAI 81750 PASIR GUDANG TEL: 07-2554752  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448601",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54786,
        "ADDR_TOTAL": "CAWANGAN 2968-D JALAN SULTANAH 05350 ALOR SETAR KEDAH ATTN : 04-7354786 ",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210315",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54786,
        "ADDR_TOTAL": "NO.30, JALAN TASEK 61 BANDAR SERI ALAM JOHOR TEL : 2554786  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC421652",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54789,
        "ADDR_TOTAL": "8th Floor 1st Avenue Near Cinema Tel : 016-4754789   ",
        "COMPANY_HIERARCHY": "Out of Home - Quick Service Rest's - Food Kiosk/Food Stall/Hospital Cafeteria - ",
        "STANDARD_HIERARCHY": "QSR",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC421679",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54789,
        "ADDR_TOTAL": "3rd Floor Prangin Mall Tel : 016-4754789    ",
        "COMPANY_HIERARCHY": "Out of Home - Quick Service Rest's - Food Kiosk/Food Stall/Hospital Cafeteria - ",
        "STANDARD_HIERARCHY": "QSR",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC356569",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54800,
        "ADDR_TOTAL": "Lot C4 Tingkat 1 Blok 1 Pusat Bandar Damansara 54800 Kuala Lumpur   54800",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Bakery CafÃ©/Delicatessen - ",
        "STANDARD_HIERARCHY": "Bakery",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448381",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54811,
        "ADDR_TOTAL": "CO.NO:AS0254811-V, NO.8, PEKAN TANAH MERAH, PENDANG, KEDAH. 6700",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC204776",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54816,
        "ADDR_TOTAL": "NOR CAFE CATERING SAPTARIA SDN.  BHD (700-N014) LOT 144, SUBLOT 4, GROUND FLOOR TG.  KIDURONG SHOPHOUSE 97000 BINTULU 086-254816 0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC224263",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54817,
        "ADDR_TOTAL": "NO.7 SPG.185-35 KG KATOK, GADONG JLN TUNGKU,BRUNEI DARUSSALAM TEL: 2450678 FAX: 2454817  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207912",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54834,
        "ADDR_TOTAL": "41, JALAN ANGGERIK 42 TAMAN JOHOR JAYA 81100 JOHOR BAHRU TEL : 3554834  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448089",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54838,
        "ADDR_TOTAL": "CO.NO:000054838-X, NO.81, KOMPLEKS JITRA, JITRA, KEDAH. 6000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC209277",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54840,
        "ADDR_TOTAL": "L1- 25 ,PLAZA ANGSANA JOHOR BAHRU  TEL:07-2354840  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC218113",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54848,
        "ADDR_TOTAL": "No.105 & 106,Ground Floor Wisma Hopoh,Jln P. Ramlee 93400,Kuching,Sarawak  [GST ID:000635854848] 0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC292943",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54848,
        "ADDR_TOTAL": "MDLD 3512,3513,3514,3515 & 3516 JLN BUNGA RAYA GST NO: 001160654848   ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC183021",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54849,
        "ADDR_TOTAL": "NO 37-0-1,JLN BATU NILAM 10A, BANDAR BUKIT TINGGI, KLANG,SEL TEL : 017-3654849  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC276833",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54851,
        "ADDR_TOTAL": "6 JALAN BESAR PADANG RENGAS 33700 PERAK   TEL 012454851          ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223436",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54855,
        "ADDR_TOTAL": "NO. 63, GRND FLOOR, UNIT 3 & 4 BANGUNAN ASSIRAH, JALAN HJ HALUS BT1320 BRUNEI DARUSSALAM TEL  :2654855      FAX  :2654855  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223875",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54874,
        "ADDR_TOTAL": "G1 GROUND FLOOR QAF PLAZA KG  BERIBI, BRUNEI DARUSSALAM. TEL: 2654874   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC276311",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54885,
        "ADDR_TOTAL": "NO.20, KOMPLEKS GERAI GUGUSAN MANJOI LORONG PASAR, KG SG TAPAH TAMBAHAN 30020 IPOH PERAK  TEL : 012-5254885          ",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208100",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54898,
        "ADDR_TOTAL": "43, JALAN DEDAP 18 TAMAN JOHOR JAYA 81100 JOHOR TEL : 3554898  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC221782",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54912,
        "ADDR_TOTAL": "LOT (FA 01) BANGUNAN TERMINAL LAPANGAN TERBANG, BALUNG TAWAU, TAWAU. P. O. BOX NO. 1628,91039 TAWAU, SABAH.  GST NO:000002854912 -",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Vending/chiller - ",
        "STANDARD_HIERARCHY": "Vending Machine",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC216012",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54920,
        "ADDR_TOTAL": "S/L 33, NO.8, TKT BAWAH, LORONG ULU SG MERAH,SIBU. TEL : 016-5754920  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC281470",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54924,
        "ADDR_TOTAL": "12 PSRN BEMBAN RAYA 8 JLN SIPUTEH 31000 BATU GAJAH PERAK TEL: 3654924  ATTN :          ",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC357201",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54940,
        "ADDR_TOTAL": "T/A TAIPAN CHEF SDN BHD 136 Jalan Kasah Medan Damansara 54940 Kuala Lumpur  54940",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Cash Sales - ",
        "STANDARD_HIERARCHY": "Specialist Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208724",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 54955,
        "ADDR_TOTAL": "110, JALAN SRI PELANGI TAMAN PELANGI 80400 JOHOR BAHRU. TEL: 07-3354955  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC218468",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54957,
        "ADDR_TOTAL": "Mjc  HP:010-5454957 - Rahim Khan   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC269794",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54966,
        "ADDR_TOTAL": "18 &19, BAGAN PASIR LAUT, RUNGKUP, 36200 BAGAN DATOH, PERAK BUSS|REG NO|(IP0054966-K) ATTN|MR CHAN BOON TIONG",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Kiosk - Kiosk News/Mags - ",
        "STANDARD_HIERARCHY": "News / Magazine Store",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC451293",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54966,
        "ADDR_TOTAL": "CO.NO:554966-X, 525 A-E,JALAN KUALA KETIL, SUNGAI PETANI, KEDAH DARUL AMAN, MALAYSIA. 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC224124",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54969,
        "ADDR_TOTAL": "SPG.32, KG ANGGEREK DESA, JLN PULAIE, BERAKAS DAERAH BRUNEI MUARA, BRUNEI DARUSSALAM TEL NO: 8754969   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC451639",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54975,
        "ADDR_TOTAL": "CO.NO:254975-W, NO.22,23,RUMAH KEDAI, PEKAN BARU KUPANG, KUPANG BALING, KEDAH DARUL AMAN. 9200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC457633",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54979,
        "ADDR_TOTAL": "NO.3634&3635,JALAN SELASIH 2, TAMAN SELASIH, 09000 KULIM KEDAH.  ATTN : 04-4954979 9000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC224180",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54980,
        "ADDR_TOTAL": "UNIT 2-7, GROUND FLOOR, LOT 30195, KG SINARUBAI, BENGKURONG MUKIM KILANAS,  NEGARA BRUNEI DARUSSALAM TEL : 2654981   FAX : 2654980 CONTACT :STEVEN CHAI  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC040818",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54989,
        "ADDR_TOTAL": "UNIT 1-9, EDR NO.BD46390 LOT 54989 BGN. D'AMIN JAYA JLN KIULAP GADONG RUNEI DARUSSALAM  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC028178",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 54989,
        "ADDR_TOTAL": "UNIT 1-9, EDR NO. BD46390, LOT 54989, BGN D'AMIN JAYA, JLN KIULAP, GADONG,  OTT1NL ",
        "COMPANY_HIERARCHY": "Modern Trade - Super - Ind Super - IND SUPER",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 4.901286,
        "LONGITUDE": 114.92141
      },
      {
        "CUST_NAME": "AC403562",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "LEVEL 3A, PODIUM BLOCK, PLAZA BERJAYA, NO.12, JALAN IMBI, 55100 KUALA LUMPUR.  55000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC489791",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "52A LORONG DAMAIL OFF JALAN DAMAI 55000 KUALA LUMPUR   55000",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC574548",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "40-42-44, PERSIARAN AMPANG 6 KM OFF JLN AMPANG  Selangor  55000",
        "COMPANY_HIERARCHY": "Kuala-Lumpur - General-Trade-Kuala-Lumpur - Class-E-Kuala-Lumpur - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC355339",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "(Ullage) 40, 42 & 44 Persiaran Ampang 6KM Off Jalan Ampang 55000 Kuala Lumpur  55000",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC049105",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "NO 40,42,44 PERSIARAN AMPANG 6 KM INACTIVE 07/06/12 - TOH BT  KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Credit Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC107590",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "No. 40, 42, 44 Persiaran Ampang 6 Km Off Jalan Ampang 55000 Kuala Lumpur Tel : 42565976  55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC033366",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "Jalan Kelab Golf 55000 Kuala Lumpur   OTT1NL 55000",
        "COMPANY_HIERARCHY": "HORECA - Restaurant - Restaurant - Restaurant",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC383746",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "NO. 11, LORONG MENGKUDU SATU OFF JALAN AMPANG, KUALA LUMPUR. (SATURDAY,SUNDAY CLOSE)  55000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC109869",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "No.11, Lorong Mengkudu Satu Off Jalan Ampang Kuala Lumpur    55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC489879",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "THE ELEMENTS @ AMPANG JALAN AMPANG ULU 55000 KUALA LUMPUR   55000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486238",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "NO.62 JALAN DAMAI KAMPUNG DATUK KERAMAT KUALA LUMPUR WILAYAH PERSEKUTUAN  55000",
        "COMPANY_HIERARCHY": "Out of Home - Education - University/College - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC360767",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "28 Lorong 2, Kg Desa Pahlawan Batu 4 Jalan Ampang Kuala Lumpur   55000",
        "COMPANY_HIERARCHY": "Spec Non Food - Hardware Related - Contractor Supply - ",
        "STANDARD_HIERARCHY": "Specialist Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC010336",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "C1-1-1,TMN AMPANG HILIR JLN AMPANG 55000 KUALA LUMPUR  KLCCKBA ",
        "COMPANY_HIERARCHY": "Industrial Canteen - Pharmacy - Pharmacy - Pharmacy",
        "STANDARD_HIERARCHY": "Traditional Pharmacy",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC054333",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "BLOCK A1-1-1, FLAT TAMAN  AMPANG HILIR, AMPANG, SELANGOR.  KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC182415",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "RKAT DESA PASIFIK JLN AMPANG KIRI, KUALA LUMPUR TEL : 03-42661912  55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC050209",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "BLOCK A1-1-1 FLAT TAMAN AMPANG HILIR 55000 AMPANG SELANGOR   KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC010384",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "223 B/1, KAMPUNG PINGGIR LEMBAH JAYA SELATAN AMPANG 55000 KUALA LUMPUR  KLCCKBA ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC050224",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "31 KAMPUNG PERWIRA JAYA BATU 4 LORONG 4 JLN AMPANG 55000 KUALA LUMPUR  KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 3.15051338,
        "LONGITUDE": 101.7430025
      },
      {
        "CUST_NAME": "AC034554",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "26 PERSIARAN AMPANG KUALA LUMPUR   OTT1NL 55000",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC033890",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "32, PERSIARAN AMPANG, KUALA LUMPUR   OTT1NL 55000",
        "COMPANY_HIERARCHY": "HORECA - Restaurant - Restaurant - Restaurant-Fine Dining",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC192613",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "Lansdn Place, Ambassdor Residences No.1, Jalan Ampang Hilir 55000 Kuala Lumpur   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC555148",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "(PASARAYA 101 SDN BHD) NO.11-G, JALAN PANDAN 2/3, PANDAN JAYA KUALA LUMPUR. DEL BEFORE 5.30P.M 55000",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC185823",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "NO.19, JALAN MEMANDA 7/1, AMPANG POINT, KUALA LUMPUR. TEL:03-42701651   55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC108724",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "No. 12, Persiaran Ampang 55000 Kuala Lumpur Hp: 016-6086148 (Samad)   55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC050208",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "A-1-1-5 TAMAN AMPANG HILIR 55000 AMPANG SELANGOR   KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 3.14692831,
        "LONGITUDE": 101.7466792
      },
      {
        "CUST_NAME": "AC102323",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "LOT PT 2536,  LEBUHRAYA LINGKARAN TENGAH 2 MK AMPANG  TEL:9281 4601 (ZALINA)  55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC192686",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "Lonson Place Ambassador Residences No.1, Jalan Ampang Hilir 55000 Kuala Lumpur   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC111470",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "LOT PT 128, JALAN KAMPUNG PANDAN TAMAN MALURI 55000 KUALA LUMPUR   55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC010778",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "B13-0-1 JALAN 4/76A DESA PANDAN   KLCCKBA 55000",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC109438",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "Block A1-1-1 Flat Taman  Ampang Hilir 55000 Ampang, Selangor Hp: 013-6480170 (Ali)  55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC108260",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "lot 64, Seksyen 88 Jalan Ampang, 55000 Kuala Lumpur Tel.: 42565001   55000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC050207",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55000,
        "ADDR_TOTAL": "C1-1-5 TAMAN AMPANG HILIR 55000 KUALA LUMPUR   KLAMAMPANG 55000",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - GT Cash Sales",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC223628",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55006,
        "ADDR_TOTAL": "SPG 529, NO 1, JLN KEBANGSAAN LAMA,  BRUNEI. TEL : 8755006 - HJ MOHD SHOEB C.O.D  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC170093",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55033,
        "ADDR_TOTAL": "NO.20,MEDAN MAK INTAN, JALAN MAHKOTA, 36000 TELUK INTAN,PERAK. 010-7855033  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC177909",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55033,
        "ADDR_TOTAL": "48,TINGKAT TAMAN IPOH 12 TAMAN IPOH SELATAN  31400 IPOH PERAK  (TEL:05-5456088,FAX:05-5455033)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC205710",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55037,
        "ADDR_TOTAL": "LOT 1 ,  ARKED CENGAL UTM, 81310 SKUDAI  TEL : 014-3155037  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207850",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55040,
        "ADDR_TOTAL": "32, JALAN MOLEK 2 TAMAN MOLEK 81100 JOHOR BAHRU TEL: 07-3555040  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210884",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55063,
        "ADDR_TOTAL": "NO:33 ,JLN.TITIWANGSA 3/3 TMN.TAMPOI INDAH JOHOR BAHRU TEL:2355063  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC522488",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55069,
        "ADDR_TOTAL": "KEDAI PEKAN MESAPOL 89850 SIPITANG SABAH 010-3455069   -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - MEDIUM PROVISION - ",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC216828",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55072,
        "ADDR_TOTAL": "No.102-106, Serian Bazaar, 94700 Serian Sarawak  [GST ID:000205955072] 0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC178730",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55076,
        "ADDR_TOTAL": "22 JALAN THEATRE 30300 IPOH PERAK TEL : 05-2555076   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207812",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55079,
        "ADDR_TOTAL": "1A, LADANG TELUK SENGAT TELUK SENGAT KOTA TINGGI , 81940 JOHOR TEL : 8955339/8955079  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC109759",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55085,
        "ADDR_TOTAL": "No. 46, Jalan Ijok Utama 1 Taman Ijok Utama 43620 Ijok, Selangor Hp: 013-2055085 (Ms. Chia)  CEN4",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC177200",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55090,
        "ADDR_TOTAL": "81,JALAN LAU PAK KHUAN IPOH GARDEN 31400 IPOH PERAK       (TEL:05-5455090)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC106025",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.154, JALAN KAMPONG  PANDAN, 55100 KUALA LUMPUR.  TEL:9848650, 9857817  55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC192049",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "No. 20, Jalan Bukit Bintang 55100 Kuala Lumpur Hp: 016-2236168 (Nunni) Hp: 016-2269168  55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC191698",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "Wisma Hainan 112 & 114 Ground Floor, Jalan Pudu 55100 Kuala Lumpur Hp: 016-6621683 (Nunni)  55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC191929",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "Unit D1, Ground Floor, Block D KL Plaza, No.179, Jln Bukit Bintang 55100 Kuala Lumpur Hp: 016-2269168  55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC295271",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LEVEL 3 A, PODIUM BLOCK, PLAZA BERJAYA, NO.12, JALAN IMBI, 55100 KUALA LUMPUR.   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC508309",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-Eleven Malaysia Sdn Bhd Level 3A  Podium Block Plaza Berjaya  No.12  Jalan Imbi Kuala Lumpur Wilayah Perseketuan 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC072130",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LEVEL 3A.PODIUM BLOCK BERJAYA NO 12,JALAN IMBI, 55100 KUALA LUMPUR  KLBBBKT BINTANG 55100",
        "COMPANY_HIERARCHY": "Chilled Division - Chilled Division - General Trade - Convenience Store",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC460071",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.9(GF) TAMAN BADLISHAH, JALAN LUNAS KILANG LAMA, KULIM KEDAH.  MISS NURUL AZNI:04-4955450 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494909",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC379792",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LEVEL 3A, PODIUM BLOCK PLAZA BERJAYA NO 12, JALAN IMBI, 55100 KUALA LUMPUR  ATTN : 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC528893",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LEVEL 3-A, PODIUM BLOCK, PLAZA BERJAYA, 12, JALAN IMBI, 55100 KUALA LUMPUR.  55100",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - CONVENIENCE - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC384105",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "21GF,JALAN PANDAN INDAH 4/2. PANDAN INDAH, 55100 KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC510654",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD LEVEL 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237984",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "402,JALAN PUDU  KUALA LUMPUR WILAYAH PERSEKUTUAN  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237856",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LOT NO.01-48,01-53,NO.1,JALAN IMBI, FIRST FLOOR,BERJAYA TIMES SQUARE, KUALA LUMPUR WILAYAH PERSEKUTUAN  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238098",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.15(GF),JALAN PANDAN INDAH 1/23,PANDAN INDAH KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC279343",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD LEVE 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI KUALA LUMPUR  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494920",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC279370",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD LEVEL 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI KUALA LUMPUR  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494921",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486664",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "MYNEWS RETAIL SDN BHD MID POINT SHOPPING CENTRE, R.G.07 & S.C.07, MID POINT SHOPPING COMPLEX JALAN PANDAN INDAH 1/25 PANDAN INDAH 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC404501",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "UNIT 5-05-5.07, LEVEL 5, AMODA, NO.22, JALAN IMBI, 55100 KUALA LUMPUR.  55100",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC460014",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LEVEL 3A,PODIUM BLOCK, PLAZA BERJAYA, NO.12,JALAN IMBI, 55100 KUALA LUMPUR, MALAYSIA. 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494922",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494923",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494924",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN (M) SDN BHD, LEVEL 3A PODIUM BLOCK PLAZA ,BERJAYA 12 JAN IMBI 55100 KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494925",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN (M) SDN BHD, LEVEL 3A PODIUM BLOCK PLAZA ,BERJAYA 12 JALAN IMBI 55100 KUALA LUMPUR MALAYSIA   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494926",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA 12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494927",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC494928",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7 ELEVEN MALAYSIA SDN BHD, LEVEL 3A PODIUM PLAZA BERJAYA12 JALAN IMBI ,KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486254",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "SA-22 LORONG PANDAN PERTAMA 3 PANDAN UTAMA    55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC518397",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "Level 3A, Podium Block Plaza Berjaya, No.12,Jalan Imbi, Kuala Lumpur  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC518396",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "Level 3A, Podium Block Plaza Berjaya, No.12,Jalan Imbi Kuala Lumpur  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC518394",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD.  LEVEL 3A PODIUM BLOCK PLAZA BERJAYA NO.12 JALAN IMBI KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237623",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  No 141 (GF) Jalan Imbi KUALA LUMPUR WILAYAH PERSEKUTUAN 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC137169",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "Level 3A,Podium Block Plaza Berjaya,No. 12,Jalan Imbi 55100 Kuala Lumpur  GST ID:000940552192 55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Convenience Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC150702",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO. 211-213 JLN PERKASA 1, BGN DIRIKON TMN MALURI  CHERAS KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Convenience Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238225",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  LOT G-15A, SUNWAY VELOCITY, 80, JALAN CHERAS MALURI, KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238233",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  (ANSA HOTEL) LOT 1, NO 101 JALAN BUKIT BINTANG, KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238269",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  GROUND FLOOR, UNIT C, MENARA WORLDWIDE, 198 JALAN BUKIT BINTANG, KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237647",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "1, JLN KHOO TEIK EE, OFF JLN IMBI,  KUALA LUMPUR WILAYAH PERSEKUTUAN  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237652",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  15, LOT 638, JLN PANDAN 3/5, PANDAN JAYA, KUALA LUMPUR,WPKL 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486532",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.23 TINGKAT BAWAH JLN MELATI UTAMA 4 MELATI UTAMA SETAPAK KL   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237726",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  No. 109 (GF) Jalan Kampung Pandan Taman Maluri KUALA LUMPUR,WPKL 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC237820",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  NO.52(GF),JALAN BULAN, OFF JALAN BUKIT BINTANG, KUALA LUMPUR 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238290",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.21(GF), JALAN PANDAN INDAH 4/2,  PANDAH INDAH, KUALA LUMPUR. 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486506",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO 43A-0-4(GF) JLN 1/48A SENTUL PERDANA BDR BARU KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC238166",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  LG001-1B,SUNGEI WANG PLAZA, JALAN SULTAN ISMAIL, BUKIT BINTANG, KL 55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486484",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO 2963, LOT 18113, MUKIM PETALING, DISTRICT OF KUALA LUMPUR.    55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486551",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.22 (GF), JLN JEJAKA 9, TAMAN MALURI, KUALA LUMPUR.    55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC460038",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "65.GROUN FLOOR JALAN ANSON, BUKIT MERTAJAM.   55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC486374",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "5946, HS (M) 1945, MUKIM SETAPAK Kuala Lumpur Wilayah Persekutuan  55100",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC220987",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.3 GF LINTAS STATION JLN LINTAS, KK 55100 LUYANG   55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC107483",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "11,JALAN JEJAKA 6,TAMAN MALURI CHERAS KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233195",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO. B6 & B7, JALAN EXCELLA 1 TAMAN AMPANG HILIR 55100 KUALA LUMPUR.   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233196",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO. 5 & 7 (GF), JALAN BUKIT BINTANG 55100 KUALA LUMPUR.    55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233251",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "No.91,93&95(Ground Floor) Jalan Changkat Thamby Dollah 55100 Kuala Lumpur.   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233229",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO. 91&93 (GROUND FLOOR), JALAN VILLA SHOPLEX PUDU IMPIAN 3. JALAN PUDU ULU OFF JALAN CHERAS 55100 KUALA LUMPUR  55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233273",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "No: 31 & 33 (GF),Jalan Pandan Indah 1/23E Pandan Indah 55100 KL.   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233231",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO: 94 (GROUND FLOOR), JALAN PANDAN INDAH 4/6B PANDAN INDAH 55100 KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233226",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO : 2 (GROUND FLOOR),JALAN PANDAN 2/2 PANDAN JAYA 55100 KUALA LUMPUR.   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC233197",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO. 289 & 291 (GF), JALAN MAHKOTA TAMAN MALURI 55100 KUALA LUMPUR.   55100",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC226976",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO: 91  93 & 95 (GROUND FLOOR)  JALAN CHANGKAT THAMBY DOLLAH  55100 KUALA LUMPUR.  ",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 3.1992534,
        "LONGITUDE": 101.741833
      },
      {
        "CUST_NAME": "AC227107",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO: 31 & 33(GROUND FLOOR)  JALAN PANDAN INDAH 1/23E  PANDAN INDAH  55100 KL.  ",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 3.1493403,
        "LONGITUDE": 101.7800323
      },
      {
        "CUST_NAME": "AC002035",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "LOT 91,BLOCK A,NO:A1 & A2 & A3, JALAN SAN PENG,PUDU, 55100 KUALA LUMPUR.  KLBBJPU ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC001094",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "NO.B6 & B7,JALAN EXCELLA 1, TAMAN AMPANG HILIR, 55100 KUALA LUMPUR,  KLAMTAH ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC356554",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "41 Jalan Pandan Indah 4/6B Pandan Indah 55100 Kaula Lumpur   55100",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Bakery CafÃ©/Delicatessen - ",
        "STANDARD_HIERARCHY": "Bakery",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC527251",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "BLOCK D-13, PPR COCHRANE, JALAN PEEL,55100 KUALA LUMPUR   55100",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - SMALL PROVISION - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC189510",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "152-0-1, KOMPLEKS MALURI, JLN JEJAKA,TMN MALURI, KUALA LUMPUR. TEL:016-2222756  55100",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC383571",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 55100,
        "ADDR_TOTAL": "(MARRYBROWN RESTAURANT) G01-G04, GROUND FLOOR, MARKET HALL, NO. 1, JALAN PASAR BAHARU, PUDU,  KUALA LUMPUR. 55100",
        "COMPANY_HIERARCHY": "Out of Home - Quick Service Rest's - Chicken Place - ",
        "STANDARD_HIERARCHY": "QSR",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC002520",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "GF BINTANG ENTERPRISE 4680, TAMAN DATO TAHA, 73200 GEMENCHEH, N. SEMBILAN.  MEBMBCI 73200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365254",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "(PASARAYA HALAL FRESH MART) NO.12 & 13,PUSAT KOMERSIAL GEMENCHEH, 73200 GEMENCHEH, NEGERI SEMBILAN DARUL KHUSUS.  73200",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC159026",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.1.GEMENCHEH BARU, 73200 GEMENCHEH, N.SEMBILAN. A/C NO : KN 034  73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365278",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.1,GEMENCHEH BARU, 73200 GEMENCHEH. NEGERI SEMBILAN DARUL KHUSUS. RABU TUTUP ATTN : 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC440176",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "6715 PEKAN GEMENCHEH BARU    Ng Sembilan 73200",
        "COMPANY_HIERARCHY": "Doctors/Human Care - General Practitioner - GP - ",
        "STANDARD_HIERARCHY": "Hospitals",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC440181",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5994 PEKAN GEMENCHEH BARU    Ng Sembilan 73200",
        "COMPANY_HIERARCHY": "Doctors/Human Care - General Practitioner - GP - ",
        "STANDARD_HIERARCHY": "Hospitals",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC480007",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "KM 37 JLN TAMPIN GEMAS  KAMPUNG SUNGAI DUA  GEMENCHEH NSDK 73200",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC290512",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "16,JALAN BESAR, AIR KUNING SELATAN 73200 NEGERI SEMBILAN   30",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538598",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4 PASAR BUKIT ROKAN UTARA, GEMENCHEH,NEGERI SEMBILAN    73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538597",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 301, FELDA BUKIT ROKAN UTARA, GEMENCHEH, NEGERI SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366444",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "43, GEMENCHEH BARU, 73200 GEMENCHEH, NEGERI SEMBILAN.   73200",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Spices/Ingredients - Spices and Ingredient - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365453",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.29, PER 4, FELDA BUKIT ROKAN, 73200 GEMENCHEH, NEGERI SEMBILAN DARUL KHUSUS.   73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371274",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "A1, KAMPUNG BARU GEDOK, 73200 GEMENCHEH N SEMBILAN 06-4316508  73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366429",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT.8772,JALAN TAMPIN, 73200 GEMENCHEH, NEGERI SEMBILAN.   73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC576334",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.7031,TAMAN GEMENCHEH BARU 73200 GEMENCHEH, NEGERI SEMBILAN Melaka  73200",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-D-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365597",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "81,JALAN DAHLIA, FELDA BUKIT ROKAN BARAT, P.O.GEMENCHEH, NSDK.  73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC294840",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "KEDAI BARANG RUNCIT FELDA BUKIT ROKAN BARAT 73200 GEMENCIH NEGERI SEMBILAN ATTN : 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365594",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "6782,TAMAN GEMENCHEH BARU, GEMENCHEH, NSDK.   73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC576846",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO 1 GERAI MAJLIS, DEARH KAMPUNG BATANG ROKAN  73200 GEMENCHEH . N SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Negeri-Sembilan - General-Trade-Negeri-Sembilan - Class-D-Negeri-Sembilan - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC320480",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "37, KAWASAN PERNIAGAAN FELDA BUKIT ROKAN GEMENCHEH N.SEMBILAN  73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371230",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.4649 TAMAN DATO TAHA 73200 GEMENCHEH N  SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC526208",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "1640,TAMAN DATO MOHD TAHA, 73200 GEMENCHEH,NEGERI SEMBILAN.    -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - SMALL PROVISION - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365658",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.1120, PEKAN GEMENCHEH, NSDK.   73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC129820",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "7,GEMENCHEH BARU, 73200 GEMENCHEH, N.S.D.K.    73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552483",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "7, GEMENCHEH BARU, 73200 GEMENCHEH, NEGERI SEMBILAN. N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538716",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO 5503 PERINGKAT SATU FELDA BUKIT ROKAN GEMENCHEH NEGERI SEMBILAN  73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371253",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5503, BUKIT ROKAN, 73200 GEMENCHEH, N.S.    73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC553413",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 1, GERAI MASJID JAMEK, GEMENCHEH, N.SEMBILAN (N.C!!) N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366419",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.18, JALAN BESAR, GEMENCHEH BARU, 73200 GEMENCHEH, NEGERI SEMBILAN.  73200",
        "COMPANY_HIERARCHY": "Spec Non Food - Paper and Gift - Book Store - ",
        "STANDARD_HIERARCHY": "Specialist Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC246335",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "3276-3278 TAMAN MUHIBBAH 73200 GEMENCHEH, NEGERI SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012547",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4841,4842, 4843,JALAN REGENT 1, TAMAN REGENT,GEMENCHEH, NEGERI SEMBILAN.  NSTAGEE 73200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.523035,
        "LONGITUDE": 102.403875
      },
      {
        "CUST_NAME": "AC012624",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.5950, TAMAN OKID, 73200 GEMENCHEH, NEGERI SEMBILAN.  MEGEGEM 73200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365020",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "D'MART BUKIT ROKAN UTARA, 73200 GEMENCHEH, NSDK.   73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC246440",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "3260 TAMAN MUHIBBAH GEMENCHEH NS   ATTN : 73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC553043",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5703-2,TAMAN GEMENCHEH JAYA, GEMENCHEH LAMA, 73200 GEMENCHEH, N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC129641",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PETROL STESEN (TANGGAMAS) 73200 GEMENCHEH, NEGERI SEMBILAN.   73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC324598",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5703 /13 TAMAN GEMENCHEH JAYA  73200 GEMENCHEH  N.SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC246358",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO 1867, 1868 JLN KENANGA SATU TMN SRI INTAN GEMENCHEH  N.S. ATTN : 73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC569710",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "(PERNIAGAAN PUJAAN) 3260,TAMAN MUHIBBAH, 73200 GEMENCHEH,N.SEMBILAN. N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - LPS - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538728",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.1867-1872, JALAN KENANGAN 1, TAMAN SRI INTAH, 73200 GEMENCHEH, NSDK.   73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - LARGE PROVISION - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012635",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 3260, TAMAN MUHIBAH, 73200 GEMENCHEH, NEGERI SEMBILAN.  NSTAGEE 73200",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 2.538879,
        "LONGITUDE": 102.406385
      },
      {
        "CUST_NAME": "AC127778",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "1872,JALAN KENANGA 1, TAMAN SRI INTAN,GEMENCHEH, NEGERI SEMBILAN. A/C NO : PM 271  73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC129261",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "1872,JALAN KENANGA 1, TAMAN SRI INTAN,GEMENCHEH, NEGERI SEMBILAN. UBS AC-30PM/271  73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366063",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PT 4827, TAMAN REGENT, 73200 GEMENCHEH, NEGERI SEMBILAN DARUL KHUSUS.   73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371137",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4635, JLN MEMPELAM, TMN DATO TAHA 73200  GEMENCHEH N  SEMBILAN  06-4310379 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Indian Coffee Shop - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371162",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "7040 PEKAN GEMENCHEH BARU 73200 GEMENCHEH N.S   73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Malay Rest/Indian Rest/Other Asian/Local Rest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371084",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4829 TAMAN REGENT 73200 GEMENCHEH N SEMBILAN 019-6937965  73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Malay Rest/Indian Rest/Other Asian/Local Rest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371247",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "JLN BESAR GEMENCHEH 73200   06-4310434 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371179",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "8781 PEKAN GEMENCHEH BARU 73200  GEMENCHEH BARU 73200 GEMENCHEH NSDK 013-6275464  73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371103",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "JALAN BESAR, KAMPUNG BARU GEDOK, 73200 GEMENCHEH N SEMBILAN 06-4319757 73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371107",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PT 5955-5957 TAMAN ORKID GEMENCHEH NEGERI SEMBILAN    73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371173",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT 8775 JALAN BESAR GEMENCHEH BARU, 73200 GEMENCHEH N SEMBILAN DARUL KHUSUS TEL:019-9898378,019-9628256  73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371221",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT 3188,TAMAN REGENT, 73200 GEMENCHEH, NEGERI SEMBILAN.(MA0139773-M) 013-2301241  73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371254",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.5955-5957, TAMAN ORKID, 73200 GEMENCHEH N SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - TaiPaiTong/TaiChow - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371340",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4821 JALAN 1 , TAMAN REGENT 73200  GEMENCHEH N  SEMBILAN 06-4316340 73200",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC484841",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 7214, TAMAN GEMENCHEH BARU, GEMENCHEH, NEGERI SEMBILAN.  73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012654",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5506, KAWASAN PERNIAGAAN, FELDA BUKIT ROKAN, 73200 GEMENCHEH, NEGERI SEMBILAN.  MEBMBCI 73200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366179",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 5506, KAWASAN PERNIAGAAN, FELDA BUKIT ROKAN, GEMENCHEH, NSDK. (8AM - 1PM ONLY) 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC159922",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "3255, TAMPIN MUHIBBAH, 73200 GEMENCHEH.  A/C: SN029  73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366221",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.3255, TAMPIN MUHIBBAH, 73200 GEMENCHEH, NEGERI SEMBILAN DARUL KHUSUS.   73200",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371123",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "JLN BESAR 73200  GEMENCHEH N  SEMBILAN   73200",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371281",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5, GEMENCHEH BARU 73200 GEMENCHEH N SEMBILAN  019-3087617 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538855",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.2,GEMENCHEH BAHRU, NEGERI SEMBILAN.    73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366228",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PT 8774 JALAN BESAR, 73200 GEMENCHEH, NEGERI SEMBILAN DARUL KHUSUS.   73200",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC294998",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "TAMAN ACBE 73200 BAHAU NEGERI SEMBILAN  ATTN : 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371268",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "6720 TAMAN GEMENCHEH BARU 73200 GEMENCHEH N SEMBILAN TEL : 019 2866774  73200",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Bakery CafÃ©/Delicatessen - ",
        "STANDARD_HIERARCHY": "Bakery",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC247208",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PERTUBUHAN PELADANG KAWASAN TAMPIN (TANGGAMAS) GEMENCHEH N.SEMBILAN. ATTN : 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371278",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "KANTIN SEK.MEN.KEB BUKIT JALOR 73200 GEMENCHEH NEGERI SEMBILAN  73200",
        "COMPANY_HIERARCHY": "Out of Home - Education - School - Secondary - ",
        "STANDARD_HIERARCHY": "School",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366191",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PT 3989, JLN BESAR, GEMENCHEH, NSDK.   73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC244792",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "PT 3989 JALAN BESAR 73200 GEMENCHEH NSDK    73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012867",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT 1233, GEMENCHEH LAMA, 73200 GEMENCHEH, NEGERI SEMBILAN.   MEGEAKU ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.537286,
        "LONGITUDE": 102.394533
      },
      {
        "CUST_NAME": "AC244791",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT  3989 JALAN  BESAR GEMENCHEH  ATTN : 73200",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365788",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT 6411, KG AIR GELUGOR, GEMENCHEH, NSDK. (DELIVER BEFORE 12PM)  73200",
        "COMPANY_HIERARCHY": "Planned Shopping - Hard Discount - Wholesaler - ",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552863",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "12, MAIN ROAD, AYER KUNING SELATAN, N.SEMBILAN. N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC247539",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "STESEN MINYAK SHELL LOT PT 1854-1860 TAMAN PEKAN BARU GEMENCHEH N.SEMBIALN. ATTN : 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552479",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "5703/13,GEMENCHEH JAYA, 73200 GEMENCHEH,N.SEMBILAN  N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC247501",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "STESEN MINYAK SHELL LOT PT 1854-1860 TAMAN GEMENCHEH BARU GEMENCHEH ATTN : NORYAH 73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366351",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT PT 1854-1560, TMN GEMENCHEH BARU, GEMENCHEH, NSDK.  73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC128160",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT PT.1854-1860, TMN PEKAN BARU, 73200 GEMENCHEH,N.S.   73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366450",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "3265,TAMAN MUHIBBAH GEMENCHEH, 73200 NEGERI SEMBILAN.    73200",
        "COMPANY_HIERARCHY": "Spec Non Food - Audio/Electr/Music - Mobile Cell/Phone Co - ",
        "STANDARD_HIERARCHY": "Specialist Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366413",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "3281, TAMAN MUHIBAH, 73200 GEMENCHEH, NEGERI SEMBILAN.   73200",
        "COMPANY_HIERARCHY": "Spec Non Food - Audio/Electr/Music - Mobile Cell/Phone Co - ",
        "STANDARD_HIERARCHY": "Specialist Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371305",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "KG. SRI ASAHAN 73200 GEMENCHEH N  SEMBILAN 06-4310951 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC129528",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.185, GEMENCHEH BARU,  73200 GEMENCHEH, NEGERI SEMBILAN.   73200",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC295152",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.447 FELDA BUKIT ROKAN UTARA, 73200 GEMENCHEH, NEGERI SEMBILAN.  ATTN : 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539065",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "LOT 5 KAWASAN PERNIAGAAN, FELDA BUKIT ROKAN UTARA, GEMENCHEH , NEGERI SEMBILAN  73200",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371331",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.3, JALAN BESAR, 73200 GEMENCHEH BARU, NEGERI SEMBILAN DARUL KHUSUS 019-9654310  73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371344",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NEAR PUJAAN JALAN BESAR 73200 GEMENCHEH N  SEMBILAN 012-2761236 73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366524",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.6797&6798, PEKAN GEMENCHEH BARU, GEMENCHEH, NSDK.  73200",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552218",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "4839, JALAN 1, TAMAN REGENT, 73200 GEMENCHEH, NEGERI SEMBILAN. N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366542",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO. 4839, JLN 1, TMN REGENT, GEMENCHEH, NSDK.  73200",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552214",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "NO.18-B,JALAN BESAR, AIR KUNING,SELATAN, GEMENCHEH,73300 N.S N SEMBILAN  73200",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC030526",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73200,
        "ADDR_TOTAL": "41, Jalan Besar,, Jementah, Segamat, Johor.  JOTAJEM 73200",
        "COMPANY_HIERARCHY": "Chinese Medical Hall - Chinese Medical Hall - Chinese Medical Hall - Chinese Medical Hall(NA)",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": 2.437612,
        "LONGITUDE": 102.684023
      },
      {
        "CUST_NAME": "AC448621",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73209,
        "ADDR_TOTAL": "NO.2509,KOMPLEKS TUNKU YAACOB LEBUHRAYA DARUL AMAN 05100 ALOR SETAR KEDAH ATTN : MR LIM SENG HEONG    019-5273209 5100",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC139273",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73211,
        "ADDR_TOTAL": "NO-CL015484974 & CL015484983 & CL015473211, 51/2 MILE, JLN TUARAN, KELOMBONG, KOTA KINABALU, SABAH KOTA KINABALU  EMA4",
        "COMPANY_HIERARCHY": "Modern - Major Account - Supermarket                  . - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC221044",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73211,
        "ADDR_TOTAL": "NO-CL015484974 & CL015484983 \"& CL015473211, 51/2 MILE, JLN TUARAN,\" \"KELOMBONG, KOTA KINABALU, SABAH\" KOTA KINABALU  ",
        "COMPANY_HIERARCHY": "Modern - Major Account - Supermarket - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC167717",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73213,
        "ADDR_TOTAL": "714, KG MUHIBBAH 31100 SG SIPUT TEL : 05-5973213   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207557",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73214,
        "ADDR_TOTAL": "BLK 59, 0110 & 0111, SECTION 13 TAMAN UNGKU TUN AMINAH 81300 SKUDAI, JOHOR TEL: 07-5573214  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC127779",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73220,
        "ADDR_TOTAL": "3260,TAMAN MUHIBAH, GEMENCHEH, 73220 N. SEMBILAN. A/C NO : PN 021  73220",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC197547",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73220,
        "ADDR_TOTAL": "3260,TAMAN MUHIBAH, GEMENCHEH, 73220 N.SEMBILAN. UBS AC-30PN/021  73220",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC456243",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73221,
        "ADDR_TOTAL": "1357,PULAU MERTAJAM, 13110 PENAGA.   ATTN :017-4473221 / ASRAF          ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC287023",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73222,
        "ADDR_TOTAL": "A-135, GROUND FLOOR, LRG TUN ISMAIL 6, SRI DAGANGAN, 25000 KTN.  TEL-017-9871222 /017-9873222 ",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Chinese Rest/ChineseSeafoodRest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210357",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73228,
        "ADDR_TOTAL": "28, JALAN HARMONI 3/2 TAMAN DESA HARMONI 81100 JOHOR BAHRU TEL : 3573228  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC319563",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73240,
        "ADDR_TOTAL": "FEIDA PASIR BESAR GEMAS N.S     73240",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC168968",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73243,
        "ADDR_TOTAL": "NO.9, JALAN PEJABAT POS, 32800 PARIT, PERAK. TEL: 05-3773243   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Vending/chiller - ",
        "STANDARD_HIERARCHY": "Vending Machine",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC168179",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73243,
        "ADDR_TOTAL": "9 , JALAN PEJABAT POS PARIT TEL:05-3773243   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC449055",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73254,
        "ADDR_TOTAL": "NO.5, TAMAN JITRA JAYA 06000 JITRA KEDAH  ATTN : MR LIM  04-9173254 ",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC192565",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73258,
        "ADDR_TOTAL": "Putra LRT Station Jalan Datuk Keramat 54000 Kuala Lumpur Tel.:016-2073258  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC128686",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73260,
        "ADDR_TOTAL": "NO.10/5733,GEMENCHEH LAMA N.S TAMAN GEMENCHEH JAYA 73260 GEMENCHEH,NSDK.   73260",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC112597",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73280,
        "ADDR_TOTAL": "62GF,JLN TAN SRI MANICKAVASAGAM, 70200 SEREMBAN,N.S.D.K. REG NO:NS0073280-U GST NO:  -   700-T110",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC506126",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73285,
        "ADDR_TOTAL": "NO.97 JALAN ANGGERIK 5/1 BANDAR AMAN JAYA SUNGAI PETANI KEDAH TEL    :012-4373285 8000",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC167138",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73288,
        "ADDR_TOTAL": "21, JALAN PANGKALAN BARU, 34900 PANTAI REMIS, TEL:05-6773288   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC155102",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73297,
        "ADDR_TOTAL": "No.247 Bt.18,Jalan Changloon, JITRA,KEDAH.  Tel : 04-9173297  6000",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC167819",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73298,
        "ADDR_TOTAL": "NO 494 PERSIARAN SM 2/23 FASA 2B 32040 SERI MANJUNG PERAK 012-5473298  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC324939",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO 4938 KUALA INA 73300 PULAU SEBANG MELAKA   73300",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC128799",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. 2, KG. BARU GEDOK, GEDOK, MELAKA. A/C NO : (300G/016)  73300",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC582447",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "JC 53,JALAN BMU 3, BANDAR BARU, MERLIMAU UTARA, 73300 MERLIMAU MELAKA.  73300",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-E-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC525410",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. 367, TAMAN SRI AIR KUNING, (S) BATANG MELAKA, 73300 NEGERI SEMBILAN   -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552837",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "J-6866 PERUMAHAN FELCRA LEMBAH KESANG MERLIMAU,73300 MELAKA.  MELAKA  73300",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538706",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "JB 4164, JALAN SERI HILIR 1, TAMAN SERI HILIR ON LOK, 73300 BATANG MELAKA.   -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC324889",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO 5532 JLN BESAR BATANG MELAKA     73300",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC197049",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "16, JALAN BESAR, AIR KUNING SELATAN, BATANG MELAKA, 73300 MELAKA. A/C NO : CN 037  ",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC553035",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "JB 639 PEKAN BATANG MELAKA, 77500 BATANG MELAKA,MELAKA  MELAKA  73300",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC285189",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "4279 TAMAN SRI HILIR, BATANG MELAKA ON LOK,    73300 BATANG MELAKA",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC588659",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "KM.14 KR,BERANVAM ENAM, UMBAI MERLIMAU, 77300 MERLIMAU MELAKA.   773300",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-D-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC483795",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "(RESTORAN AZAM PEDAS WARISAN) NAZRI CAFE NO 2 CANTEEN DELIMA POLITEKNIK MERLIMAU 773300 MELAKA 773300",
        "COMPANY_HIERARCHY": "Out of Home - Education - University/College - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC285292",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "JB 4164,JALAN SERI HILIR 1, TAMAN SERI HILIR ON LOK, 73300 BATANG MELAKA.   73300",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012607",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "376, TAMAN SRI AIR KUNING, 73300 BATANG MELAKA, N.SEMBILAN  MESENYA 73300",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 2.512962,
        "LONGITUDE": 102.482604
      },
      {
        "CUST_NAME": "AC290591",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "JB 4169 JALAN SERI HILIR 1, TAMAN SERI HILIR, ON LOK, BATANG MELAKA.73300 MELAKA ATTN :RAVINDRAN A/L JAYARATNAM 30",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC127857",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "25, MAIN ROAD, GEMENCHEH. A/C NO :  73300",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366212",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO 86, PERINGKAT 2, FELDA BUKIT ROKAN, 73300 GEMENCHEH, NEGERI  SEMBILAN DARUL KHUSUS.  73300",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC483231",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. J-4488,MAIN ROAD, BATANG MELAKA 73300 BATANG MELAKA  ATTN : 73300",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366180",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. 34, JLN BESAR, AIR KUNING SELATAN, BATANG MELAKA, NSDK.  73300",
        "COMPANY_HIERARCHY": "Planned Shopping - Hard Discount - Wholesaler - ",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC128314",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO 34,JALAN BESAR, AIR KUNING SELATAN, 73300 BTG,MELAKA. UBS AC-30HN/018  73300",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC159913",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "12, JALAN BESAR, AIR KUNING, SELATAN, BATANG MELAKA, 73300 MELAKA. UBS AC-30TN/004  73300",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC538993",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "12, MAIN ROAD, AYER KUNING SELATAN, NEGERI SEMBILAN.   73300",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539154",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. 18-B JALAN BESAR AIR KUNING, SELATAN, GEMENCEH GEMAS NEGERI SEMBILAN  73300",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366529",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73300,
        "ADDR_TOTAL": "NO. 18B, JLN BESAR, AIR KUNING SELATAN, BATANG MELAKA, NSDK.  73300",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208989",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73302,
        "ADDR_TOTAL": "2,JLN SHAH BANDAR 6 TMN UNGKU TUN AMINAH 81300 SKUDAI 07-5573302  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC207842",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73305,
        "ADDR_TOTAL": "S-1, MAIN ROAD PLENTONG TEL: 07-3873305    0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC249676",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73306,
        "ADDR_TOTAL": ". 65A,JALAN 20/7,PARAMOUNT GARDEN, 46300 PETALING JAYA, SELANGOR D.E. 03-78773306 .",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC527304",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73310,
        "ADDR_TOTAL": "L3-11-16,level 3,the mines jalan dulang,mines resort city,sri kembangan selangor   389573310",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC216651",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73312,
        "ADDR_TOTAL": "No.28, Poh Kwong Park Bazaar 93150 Kuching Sarawak GST ID:000012173312   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC177209",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73318,
        "ADDR_TOTAL": "NO.43,PERSIARAN SERI RAIA TAMAN SERI RAIA 31300 KAMPONG KEPAYANG PERAK    (TEL:05-3573318)  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC216554",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73329,
        "ADDR_TOTAL": "No 32 , Spaoh Bazaar 95600 Spaoh Tel:083-473329   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448082",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73332,
        "ADDR_TOTAL": "( PETRON JALAN LENCONG BARAT ) CO.NO:AS0273332-P, NO.5393,JALAN LENCONG BARAT, ALOR STAR, KEDAH. 5050",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Petrol Station - Petrol Mart - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208957",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73343,
        "ADDR_TOTAL": "16, JALAN A. SEKOI BANDAR BARU UDA 81200 JOHOR TEL ; 07-2373343  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC278106",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73343,
        "ADDR_TOTAL": "NO 7 TAMAN SRI KANTHAN KANTHAN BARU 31200 CHEMOR PERAK  TEL:2011803 H/P 010-573343          ",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC448367",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73348,
        "ADDR_TOTAL": "R-17,PASAR SIMPANG KUALA, 05400 ALOR SETAR.   ATTN:MARIAM TEL:017-5273348 5400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC227445",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73350,
        "ADDR_TOTAL": "No 2 Jalan BU4 Taman Bachang Utama Bachang 73350     ",
        "COMPANY_HIERARCHY": "Modern - Major Account - Key Account - ",
        "STANDARD_HIERARCHY": "Hypermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC210585",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73350,
        "ADDR_TOTAL": "10,JLN BELADAU 17 TMN PUTRI WANGSA 81800 ULU TIRAM TEL:07-8673350  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC485253",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73350,
        "ADDR_TOTAL": "PULAU GADONG MELAKA   ATTN : 73350",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208757",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73357,
        "ADDR_TOTAL": "11, JALAN BADIK 19 TAMAN PUTERI WANGSA 81800 JOHOR BAHRU. TEL: 07-8673357  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC405483",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73375,
        "ADDR_TOTAL": "K-69, JALAN SURA GATE 23000, DUNGUN, TERENGGANU   BAHARIN (019-9373375) ",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - CafÃ© - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC208501",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73393,
        "ADDR_TOTAL": "NO.1, JALAN INDAH 15/3 TAMAN BUKIT INDAH 81200 JOHOR BAHRU TEL : 2373393  0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC217635",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73398,
        "ADDR_TOTAL": "No 17 Grd Flr Betong Bazaar 95400 Betong Tel:083-472539/012-8273398   0",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC319786",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "17, JALAN STESEN 73400 GEMAS N.SEMBILAN   73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pharmacy - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC285867",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4704 (GF) TAMAN DESA PERMAI TAMAN DESA PERMAI GEMAS, GEMAS NEGERI SEMBILAN  73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC285869",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "7-ELEVEN MALAYSIA SDN BHD  NO 2,(GF),JALAN DS 2/1 DATARAN SATARUS 2 73400 GEMAS, NEGERI SEMBILAN. 73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236576",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4704 GF TMN DESA PERMAI GEMAS N.SEMBILAN  73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236578",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "2 GF JALAN DS 2/1 DATARAN SATRIA 2 GEAS N.SEMBILAN 73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236569",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "4645 KAWASAN PERDAGANGAN GEMAS N.SEMBILAN  73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC246868",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 4645(GF) KAW PERDAGANGAN GEMAS GEMAS  N.S. STORE NO : 557                     *** ATTN : 73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Convenience - Convenience Store - ",
        "STANDARD_HIERARCHY": "Other Convenience Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236986",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.12 & 13 (GROUND FLOOR) JALAN STESEN BAS GEMAS NEGERI SEMBILAN  73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236864",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "(1814) NS TAMAN DAMAI GEMAS  PT 4287 & 4288 (G) TAMAN DAMAI GEMAS  73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Large Provision - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211456",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1198,Tmn Sentosa 73400 Gemas, N. Sembilan Hp:013-6300353  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212628",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "962, JALAN PASAR,  73400 GEMAS,  NEGERI SEMBILAN.    73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236609",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "GERAI NO E7 GERAI PERHENTIAN BAS GEMAS PEKAN GEMAS 73400 GEMAS  73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC583089",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 1 JALAN BATU ANAM 73400 GEMAS, NEGERI SEMBILAN    73400",
        "COMPANY_HIERARCHY": "Negeri-Sembilan - General-Trade-Negeri-Sembilan - Class-E-Negeri-Sembilan - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371078",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT G59 NO35 JLN DS 2/2 DATARAN SATRIA 2  GEMAS N. SEMBILAN   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC364856",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "TF VALUE MART. LOT G59.35. JLN DS 2/2,DATARAN SATRIA, GEMAS, NSDK. 73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC480465",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "35 LOT GF 9 JALAN BF 2/2 DATARAN SATRIA 2 73400 GEMAS  73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC364877",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.38,JALAN TAMPIN, GEMAS, NSDK.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Indian Muslim Coffee Shop - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC364858",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.342, FELDA SUNGAI KELAMAH, GEMAS, NSDK.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366412",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 1200, TMN SENTOSA, GEMAS, NSDK.   73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Spices/Ingredients - Spices and Ingredient - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC561241",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1200, TAMAN SENTOSA, 73400 GEMAS, NEGERI SEMBILAN.   73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212623",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "A16, JALAN DESA PERMAI,  73400 GEMAS,  NEGERTI SEMBILAN.    73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC557655",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT 999,BATU 1, JALAN BATU ANAM, 73400 GEMAS, NEGERI SEMBILAN.    73400",
        "COMPANY_HIERARCHY": "MODERN TRADE - PRE-SALES - PETROL - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC335594",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO, 12, JALAN BATU ANAM GEMAS   ATTN : 73400",
        "COMPANY_HIERARCHY": "Out of Home - Cafe/Bakery Cafe/Bar - Ice Cream Parlour - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC364868",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.A4 TINGKAT BAWAH, TAMAN DESA PERMAI, GEMAS, NSDK.  73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC302828",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 6  JALAN ZURAH TAMAN BINTANG GEMAS BAHRU.    73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236785",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4482 JLN DAMAI 8 TMN DAMAI 73400 GEMAS N.SEMBILAN  73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371098",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.3,JLN ORKID 5, TAMAN MEGA, GEMAS BARU 73400 GEMAS, NEGERI SEMBILAN TEL : 07-9483623  73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012021",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "763, TAMAN GEMAS JAYA, 73400 GEMAS, N.S.   NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.580199,
        "LONGITUDE": 102.59169
      },
      {
        "CUST_NAME": "AC211783",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "763,Tmn Gemas Jaya 73400 Gemas  Tel:07-9482502,013-7275647  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC364913",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "763 , TAMAN GEMAS JAYA, 73400 GEMAS, NEGERI SEMBILAN DARUL KHUSUS.   73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pet Food Dominant - Pet Shop - ",
        "STANDARD_HIERARCHY": "Pet Shop",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC125799",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No. 29, Jalan Pasar,  73400 Gemas,  Negeri Sembilan 07-948 1244  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371116",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 8544 TAMAN SUNGAI GEMAS 73400 GEMAS 017-2892543   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC335889",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "17 MAIN ROAD GEMAS BAHRU   ATTN : 73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC551657",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "17, MAIN ROAD, GEMAS BARU, 73400 SEGAMAT, JOHOR. JOHOR  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211766",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "17,Main Road Gemas Baru 73400 Segamat Tel:07-9481229  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC302890",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 19  JALAN OKRID 1 TAMAN MEGA GEMAS BAHRU SEGAMAT.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Chinese Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC575644",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.1,2,3,TAPAK INDUSTRI, KOPERASI PALONG 7 73400 GEMAS,N.S. Melaka  73400",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - POT-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC319357",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "A 134, FELDA BKT JALOR, 73400 GEMAS, N.S    73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC236639",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO G-11Ã‚Â£Ã‚Â¬1-11&2-11 JLN HARMONI GEMAS 1 PUSAT PERNIAGAAN HARMONI GEMAS 73400 GEMAS N.S  73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC336039",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "2 TAMAN GEMAS BARU SEGAMAT   ATTN : 73400",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Malay Rest/Indian Rest/Other Asian/Local Rest - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC568163",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "P-T 4622, PEKAN GEMAS,  GEMAS, N.S  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - WS - ",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC319458",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4623 PEKAN GEMAS N.S D.K     73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212265",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4623, Pekan Gemas, 73400 Gemas, Negeri Sembilan.    73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC440198",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "37 GROUND FLOOR JALAN BESAR   Ng Sembilan 73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pharmacy - Modern Pharmacy - ",
        "STANDARD_HIERARCHY": "Modern Pharmacy",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC224906",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "37 GRD FLR JLN GEMAS 73400 GEMAS  NEGERI SEMBILAN NEGERI SEMBILAN ",
        "COMPANY_HIERARCHY": "Modern - Zuellig Ip - Zuellig Ip - ",
        "STANDARD_HIERARCHY": "Modern Pharmacy",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC294582",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.205 FELDA PALONG 3 73400 GEMAS NEGERI SEMBILAN  ATTN : 73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC244656",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4953  JLN TAMPIN GEMAS  N.S.  *** ATTN : 73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Confectionery - Candy/Sweet Shop - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012365",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4953, JALAN TAMPIN, 73400 GEMAS, NEGERI SEMBILAN.  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Super - LMT SUPER(Not Use)",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC371139",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT 2203 BANDAR GEMAS, 73400 GEMAS N SEMBILAN TEL: 012-2474301  73400",
        "COMPANY_HIERARCHY": "Out of Home - Leisure/Sports/Enter - Bowling Alley - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC126657",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 4 & 5, JALAN MAHKAMAH,  73400 GEMAS,  NEGERI SEMBILAN.    73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC575652",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.4 & 5,JALAN MAHKAMAH, 73400 GEMAS,N.S. TEL:07-9483762/9485863 Melaka  73400",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-A-Melaka - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552694",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT 14 & 16, JALAN LINTANG, 73400 GEMAS, NEGERI SEMBILAN. DELIVER TO: NO.4 & 5,JALAN N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC126177",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No.10, Jalan Lintang, 73400 Gemas, Negeri Sembilan.   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211813",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "13,Jln Station  73400 Gemas  Tel:07-9481578  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365132",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.13,JLN STATION, GEMAS, NSDK.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Indian Coffee Shop - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC336163",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "BATU 2 1/2  JALAN TAMPIN GEMAS NEGERI SEMBILAN  ATTN : 73400",
        "COMPANY_HIERARCHY": "Out of Home - Leisure/Sports/Enter - Disco/Karaoke/Club/Pub/Fishing Pond - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552277",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT 764, TAMAN GEMAS JAYA, GEMAS, 73400 N. SEMBILAN.  N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365128",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "KAFETERIA STESEN KERETAPI GEMAS, TAMPIN, NSDK.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Malay Coffee Shop - ",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365127",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.6, TKT BAWAH, PUSAT KOMERSIAL PAHLAWAN, BT 4, JLN GEMAS TAMPIN, GEMAS, NSDK.  73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Fruit/Vegetable - Vegetables and Fruit Outlet - ",
        "STANDARD_HIERARCHY": "Specialist Food & Drink",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211446",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "Pt 6623 Pekan Gemas 73400 Gemas N.Sembilan   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365151",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4623, PEKAN GEMAS 73400 GEMAS, NEGERI SEMBILAN DARUL KHUSUS.   73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC035362",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "28,JALAN PASAR, 73400 PEKAN GEMAS, NEGERI SEMBILAN.  OTT1NL ",
        "COMPANY_HIERARCHY": "HORECA - Bakery - Bakery - Bakery-Ind-Traditional",
        "STANDARD_HIERARCHY": "Bakery",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212277",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "49, Jalan Pasar, 73400 Gemas, Negeri Sembilan  Tel: 07-9484818  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365177",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "49,JALAN PASAR, 73400 GEMAS, NEGERI SEMBILAN DARUL KHUSUS.   73400",
        "COMPANY_HIERARCHY": "Ad Hoc Convenience - Small Store - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC125459",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "17,Jln Stesen 73400 Gemas N. Sembilan Tel:07-9481987  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Chinese Medical Hall - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC365164",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 17, JLN STESEN GEMAS, 73400 GEMAS, NSDK   73400",
        "COMPANY_HIERARCHY": "Spec Food & Drink - Pharmacy - Chinese Medical Hall with Grocery - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC039937",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "6 JALAN LINTANG,GEMAS,    OTT1NL 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Others",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.45641538,
        "LONGITUDE": 102.9799353
      },
      {
        "CUST_NAME": "AC365152",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 6, JLN LINTANG, GEMAS, NSDK.   73400",
        "COMPANY_HIERARCHY": "Out of Home - On The Street - Drink kiosk/ Drink Stall /Drink island (independen - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC127746",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4953, JALAN TAMPIN, 73400 GEMAS,  NEGERI SEMBILAN.   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212011",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT, 4642 Bandar Gemas 73400 Gemas    73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Catering - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212165",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No.A3, Jalan Desa Permai 1, Pusat Perinagaan Desa Permai, 73400 Gemas.   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212275",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No 13, Jalan Batu Anam, 73400 Gemas,  Negeri Sembilan  Tel: 07-9484825  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012409",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "16, JALAN MAHKAMAH, GEMAS, 73400 NEGERI SEMBILAN  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Wholesale - Consumer - Consumer Wholesale - Consumer Wholesale",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552014",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "BENGKEL NO.3, KG HALACARA BARU ULU LADANG, 73400 GEMAS, N.SEMBILAN N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC553439",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "2273, PUSAT PERDAGANGAN GEMAS, JALAN BATU ANAM, GEMAS, 73400 N.SEMBILAN. N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - CMH - ",
        "STANDARD_HIERARCHY": "Chinese Medical Hall",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552425",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "18, MAIN ROAD, GEMAS BAHRU, 73400 SEGAMAT, JOHOR  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC539076",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.18 , JALAN BESAR, GEMAS BARU, 73400 GEMAS, NEGERI SEMBILAN.   73400",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC525935",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "KIOSK STESEN KERETAPI GEMAS, 73400 TAMPIN, NEGERI SEMBILAN.   -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - OTHERS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552017",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1, JALAN RAYA GEMAS BAHRU, SEGAMAT, JOHOR.  JOHOR  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC002539",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 8, TAMAN BINTANG, 73400 GEMAS BAHRU, SEGAMAT,  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012139",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 28, JALAN ZURAH 01, TAMAN BINTANG, 73400 GEMAS BARU SEGAMAT, JOHOR.  OTT1NL 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.587371,
        "LONGITUDE": 102.637744
      },
      {
        "CUST_NAME": "AC012141",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.45, NEW VILLAGE, 73400 GEMAS, N.S.   NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC553516",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 1, BENGKEL MAJLIS DAERAH, PERSIMPANGAN KG. LONDAH, 73400 GEMAS, N.SEMBILAN. N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC551999",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.4771-4772,RUMAH KEDAI, TAMAN PASIR BESAR, 73420 GEMAS, N.SEMBILAN. N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012151",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.768, TAMAN GEMAS JAYA, 73400 GEMAS, NEGERI SEMBILAN.  NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.580148,
        "LONGITUDE": 102.592009
      },
      {
        "CUST_NAME": "AC014135",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1198 , TAMAN SENTOSA 73400 GEMAS , N.SEMBILAN   OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.585059,
        "LONGITUDE": 102.595157
      },
      {
        "CUST_NAME": "AC570864",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 1198, TAMAN SENTOSA, 73400 GEMAS, N.S.   73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC552280",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "5, JALAN STATION, 73400 GEMAS, N.SEMBILAN. (DELIVER BEFORE 3PM) N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC576324",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "5, JLN. STATION, 73400 GEMAS, NSDK. Melaka  73400",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-A-Melaka - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012166",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.5, JALAN STATION 73400 GEMAS NEGERI SEMBILAN  NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 2.580824,
        "LONGITUDE": 102.611411
      },
      {
        "CUST_NAME": "AC012171",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4638, GEMAS SQUARE, 73400 GEMAS, N.S.   NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.581125,
        "LONGITUDE": 102.613088
      },
      {
        "CUST_NAME": "AC552008",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT4638,GEMAS SQUARE, 73400 GEMAS, N.SEMBILAN. (THURSDAY CLOSED) N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - SPS - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012172",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1196,TAMAN SENTOSA, 73400 GEMAS.   OTT1NL 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.585178,
        "LONGITUDE": 102.595086
      },
      {
        "CUST_NAME": "AC575615",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "BLOCK B, LOT 1705, BATU 2, JALAN TAMPIN,73400 GEMAS, NEGERI SEMBILAN Melaka  73400",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - WUC-Melaka - ",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC575700",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.23,FELDA PALONG 5, 73400 GEMAS,N.S.D.K. TEL:06-4669006 Melaka  73400",
        "COMPANY_HIERARCHY": "Melaka - General-Trade-Melaka - Class-E-Melaka - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012655",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "PT 4602-4603, BANDAR BARU, 73400 GEMAS, NEGERI SEMBILAN.   MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.58069,
        "LONGITUDE": 102.612924
      },
      {
        "CUST_NAME": "AC125458",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "Pt 4602-4603,Bdr Baru 73400 Gemas N.Sembilan Tel:019-7578983     012-7223181      Fax:07-948311  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC014136",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1193 TAMAN SENTOSA , 73400 GEMAS , NEGERI SEMBILAN   OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.585359,
        "LONGITUDE": 102.595074
      },
      {
        "CUST_NAME": "AC211434",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "1193,Tmn Sentosa 73400 Gemas N.Sembilan Tel: 019-6263994  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC578711",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO 2271, PUSAT PERDAGANGAN , JALAN BATU ANAM, 73400 GEMAS, N.SEMBILAN   73400",
        "COMPANY_HIERARCHY": "Negeri-Sembilan - General-Trade-Negeri-Sembilan - Class-D-Negeri-Sembilan - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC551980",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.28,JALAN PASAR,73400 GEMAS, NEGERI SEMBILAN D.K.N SEMBILAN 73400",
        "COMPANY_HIERARCHY": "GENERAL TRADE - PRE-SALES - OTH - ",
        "STANDARD_HIERARCHY": "Speciality Other",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC125961",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No.5, Jalan Batu Anam 73400 Gemas, N.S.  Tel:07-948 1048  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012675",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO. 1, JALAN MAHKAMAH, 73400 GEMAS, NEGERI SEMBILAN.  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012209",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "9 & 10, JLN MAHKAMAH, 73400 GEMAS N.SEMBILAN  NSTAGEM 73400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 2.581261,
        "LONGITUDE": 102.611186
      },
      {
        "CUST_NAME": "AC125764",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "Wholesaler & Minimarket 9 & 10,Jln Mahkamah 73400 Gemas   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC126295",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "9 & 10, Jalan Mahkamah, 73400 Gemas, Negeri Sembilan  Tel: 012-7156249  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Small Provision - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC012679",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "9 & 10, JALAN MAHKAMAH, 73400 GEMAS, NEGERI SEMBILAN.  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC212330",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No A7, Tingkat Bawah, Jalan Permai,  Taman Desa Permai, 73400 Gemas, Negeri Sembilan. Tel: 013-6808873  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC125729",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "18,Jln Batu Anam 73400 Gemas N.Sembilan   73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211688",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "Lot 3160,Jln Besar Tmn Bkt Lentang Gemas Baru,73400 Gemas   ",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Petrol Convenience - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC524591",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "NO.35 JALAN DS  2/2, DATARAN SATRIA 2 , GEMAS NSDK  73400",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - SUPERMARKET - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC014265",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "No 35, Jalan DS 2/2, Dataran Satria 2, 73400 Gemas, Negeri Sembilan Darul Khusus  NSTAGEM ",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Super - LMT SUPER",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 2.237086,
        "LONGITUDE": 102.247426
      },
      {
        "CUST_NAME": "AC581125",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "7-8, PUSAT BANDAR FELDA PALONG 4,5,6, GEMAS NEGERI SEMBILAN   73400",
        "COMPANY_HIERARCHY": "Negeri-Sembilan - General-Trade-Negeri-Sembilan - Class-E-Negeri-Sembilan - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366352",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "BANGUNAN LIM CHIN MOH, NO 1, TINGKAT 1, JALAN LINTANG, 73400 GEMAS, NEGERI SEMBILAN DARUL KHUSUS. 73400",
        "COMPANY_HIERARCHY": "Out of Home - Full Service Rest's - Western Restaurant - ",
        "STANDARD_HIERARCHY": "Restaurant",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC485643",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "BANGUNAN LIM CHIN MOH NO 1 JALAN LIMTANG 73400 GEMAS N. SEMBILAN   73400",
        "COMPANY_HIERARCHY": "Out of Home - Hotel/Accommodation - Hotel - ",
        "STANDARD_HIERARCHY": "Other Institutional",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC366317",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT 4677, PUSAT PERDAGANGAN GEMAS, JLN TOK SULUNG, GEMAS, NSDK.  73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Supermarket - Supermarket - Regional - ",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC014294",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "Lot 4677, Jln Tok Sulong, Bandar Gemas, 73400 Gemas, Negeri Sembilan, Malaysia   NSTAGEM ",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Super - LMT SUPER",
        "STANDARD_HIERARCHY": "Supermarket",
        "LATITUDE": 2.536739,
        "LONGITUDE": 102.404679
      },
      {
        "CUST_NAME": "AC012738",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "3, JALAN BATU ANAM, 73400 GEMAS, NEGERI SEMBILAN  MEBMBCI 73400",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 2.581463,
        "LONGITUDE": 102.611934
      },
      {
        "CUST_NAME": "AC211457",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "3,Jln Bt. Anam 73400 Gemas N.Sembilan Tel: 012-7608151  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC525570",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "A9 JALAN DESA PERMAI 1, 73400 GEMAS, NEGERI SEMBILAN   -",
        "COMPANY_HIERARCHY": "Malaysia - Malaysia - WHOLESALER - ",
        "STANDARD_HIERARCHY": "Wholesale",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC286067",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT PT 999 JLN BT ANAM  TAMPIN MELAKA 73400",
        "COMPANY_HIERARCHY": "Planned Shopping - Counter Store - Mini Market - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC551991",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "LOT PT 999,BATU 1, JALAN BATU ANAM, 74300 GEMAS,NEGERI SEMBILAN. N SEMBILAN  73400",
        "COMPANY_HIERARCHY": "MODERN TRADE - PRE-SALES - PETROL - ",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC211795",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 73400,
        "ADDR_TOTAL": "4292 Ground Floor Jln Damai Tmn Damai Gemas Tel:07-9483001  73400",
        "COMPANY_HIERARCHY": "Traditional Trade - Preferred Dealer / Gt - Provision Shop - ",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC016535",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9400,
        "ADDR_TOTAL": "2973, Jln Lagenda 1/6, Tmn Lagenda, 09400 Pdg Serai, Kedah.   KDASNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC000185",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9410,
        "ADDR_TOTAL": "No.17, Lorong 1, Taman Desa Cinta Sayang Sungai Karangan, 09410 Padang Serai, Kedah.   KDKUPS 9410",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.51264433,
        "LONGITUDE": 100.6129033
      },
      {
        "CUST_NAME": "AC023431",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9419,
        "ADDR_TOTAL": "NO.18, JALAN DESA AMAN, S2/1 TAMAN DESA AMAN, 09419 PADANG SERAI, KEDAH.  KDKUPS ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.505783,
        "LONGITUDE": 100.622241
      },
      {
        "CUST_NAME": "AC005029",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9468,
        "ADDR_TOTAL": "9468-A Wakaf Tengah   OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.429632,
        "LONGITUDE": 103.056086
      },
      {
        "CUST_NAME": "AC020200",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9500,
        "ADDR_TOTAL": "No. 1, lorong 1, Tmn. Bunga Tanjung, 09500 Mahang, Kedah.  OTT1NL 9500",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.331115,
        "LONGITUDE": 100.747699
      },
      {
        "CUST_NAME": "AC019739",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9500,
        "ADDR_TOTAL": "No.9, 10 & 10A, Jalan Raya, 09500 Mahang, Perak.  OTT1NL 9500",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.320989,
        "LONGITUDE": 100.748179
      },
      {
        "CUST_NAME": "AC019819",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9500,
        "ADDR_TOTAL": "7, Pekan Mahang, Karangan   OTT1NL 9500",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.320932,
        "LONGITUDE": 100.748368
      },
      {
        "CUST_NAME": "AC019573",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "11, 12, 13, JLN SADERI, TMN SADERI, 09600, LUNAS  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.42466,
        "LONGITUDE": 100.551822
      },
      {
        "CUST_NAME": "AC002398",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "No.920-929, Jalan Makmur 5, Taman Makmur, 09600 Lunas, Kedah.  KDKUNL 9600",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.44145742,
        "LONGITUDE": 100.5451054
      },
      {
        "CUST_NAME": "AC022746",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "NO 1, Jalan Permai 1, Taman Desa Damai, 09600 Lunas  KDKUNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.404469,
        "LONGITUDE": 100.39739
      },
      {
        "CUST_NAME": "AC019526",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "31 TAMAN MAKMUR FASA 3 09600 LUNAS   OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.446705,
        "LONGITUDE": 100.549902
      },
      {
        "CUST_NAME": "AC022090",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "850 JALAN MAKMUR 1, TAMAN MAKMUR LUNAS. 09600 KEDAH  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019078",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "850,TAMAN MAKMUR SUNGAI SELUANG LUNAS 9600 OTT1NL ",
        "COMPANY_HIERARCHY": "HORECA - Coffe Shop - Coffe Shop - Coffe Shop",
        "STANDARD_HIERARCHY": "Café",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019489",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "11, LORONG KUCAI 2 TAMAN KUCAI 09600 KULIM, KEDAH  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC023580",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "No 146,Lorong Cekur Manis 4, Taman Cekur Manis, 09600 Kulim, Kedah.  KDKUNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.376751,
        "LONGITUDE": 100.405731
      },
      {
        "CUST_NAME": "AC022308",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "535 & 536, JALAN LOBAK, TAMAN LOBAK, 09600 LUNAS, KEDAH  KDKUNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.42423,
        "LONGITUDE": 100.55208
      },
      {
        "CUST_NAME": "AC019547",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "5/6,Jalan Cekur Manis 1, Taman Cekur Manis, 09600 Lunas, Kedah  OTT1NL 9600",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC022003",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "970, JALAN DAMAI TAMAN SEJAHTERA 09600 LUNAS, KEDAH  OTT1NL 9600",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.423749,
        "LONGITUDE": 100.537816
      },
      {
        "CUST_NAME": "AC019515",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "17,JALAN PERMAI 1, TAMAN DESA PERMAI, 09600 LUNAS.  OTT1NL 9600",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.440384,
        "LONGITUDE": 100.537025
      },
      {
        "CUST_NAME": "AC016961",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "NO. 7, Jalan Paya Besar, Taman Sawi, 09600 Lunas Kulim  KDKUNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.413694,
        "LONGITUDE": 100.549963
      },
      {
        "CUST_NAME": "AC019563",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "NO 91-94 TAMAN SRI SELADANG 09600 LUNAS KULIM  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.413307,
        "LONGITUDE": 100.541745
      },
      {
        "CUST_NAME": "AC019311",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "Lot 2937, Mukim Kulim,    OTT1NL 9600",
        "COMPANY_HIERARCHY": "Convenience Store - Petrol Kiosk - Petrol Kiosk - Petrol Kiosk",
        "STANDARD_HIERARCHY": "Petrol Mart Station",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019332",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "11,12,13, JALAN SADERI TAMAN SEDARI 09600 LUNAS, KEDAH  OTT1NL 9000",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019338",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9600,
        "ADDR_TOTAL": "3, Taman Sani    OTT1NL 9600",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC025874",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9632,
        "ADDR_TOTAL": "TB 8167, Lot 1, CL 9632, Tawau   OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019262",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "NO 177-182 JALAN MUTIARA 3 TAMAN MUTIARA 09700 KARANGAN KEDAH 9700 OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.432117,
        "LONGITUDE": 100.63997
      },
      {
        "CUST_NAME": "AC021933",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "NO. 3087-3097, JLN  MUTIARA BIRU, TAMAN MUTIARA 09700, KARANGAN, KEDAH  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC022898",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "116,JALAN MUTIARA BIRU, TAMAN MUTIARA,SG KOB 09700 KARANGAN,KEDAH  KDKUPS 9700",
        "COMPANY_HIERARCHY": "Industrial Canteen - Baby Center - Baby Center - Baby Center",
        "STANDARD_HIERARCHY": "Baby Center",
        "LATITUDE": 5.427295,
        "LONGITUDE": 100.639734
      },
      {
        "CUST_NAME": "AC020250",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "47, Karangan 09700 Kulim, Kedah.  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC023989",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "NO.9, MAIN BAZAAR, P.O.BOX 10, 9700 LIMBANG, SARAWAK.  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC022030",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "169. JLN MUTIARA 3, TMN MUTIARA 3A SG KOB , KULIM  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.43259,
        "LONGITUDE": 100.639751
      },
      {
        "CUST_NAME": "AC022042",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "193-195, Jalan Mutiara 3, Taman Mutiara 09700 Karangan, Kedah  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.431226,
        "LONGITUDE": 100.640424
      },
      {
        "CUST_NAME": "AC021959",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "NO 7-8 LRG DESA KOB TAMAN SUNGAI KOB 09700 KULIM KEDAH  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019914",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "No. 12, Kampung Sedim, 09700 Karangan, Kulim, Kedah.  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC020524",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "No.5 ,TAMAN SG KOB 09700 KARANGAN KULIM, KEDAH OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.427909,
        "LONGITUDE": 100.642603
      },
      {
        "CUST_NAME": "AC022810",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "No 13, Lorong Desa Kob, 09700, Karangan Kulim Kedah KDKUNL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.404471,
        "LONGITUDE": 100.397385
      },
      {
        "CUST_NAME": "AC019622",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "74, Pekan Karangan 09700 Kulim, Kedah  OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC022275",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "NO. 2 & 3, PEKAN SG. KOB, 09700 KARANGAN, KULIM, KEDAH OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.428084,
        "LONGITUDE": 100.644915
      },
      {
        "CUST_NAME": "AC019672",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9700,
        "ADDR_TOTAL": "71, Pekan Karangan, 09700 Kulim, Kedah. OTT1NL 9700",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC019737",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 9800,
        "ADDR_TOTAL": "49, Jalan Besar Lubuk Buntar Serdang, Kedah  OTT1NL 9800",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.140498,
        "LONGITUDE": 100.590145
      },
      {
        "CUST_NAME": "AC005348",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21100,
        "ADDR_TOTAL": "1583-D, JALAN PANJI ALAM, GONG TOK NASEK, 21100 K.T. OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.290963,
        "LONGITUDE": 103.149731
      },
      {
        "CUST_NAME": "AC005361",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21100,
        "ADDR_TOTAL": "1207KG, PASIR PANJANG, 21100 KUALA TERENGGANU, OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.295914,
        "LONGITUDE": 103.137345
      },
      {
        "CUST_NAME": "AC003651",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21100,
        "ADDR_TOTAL": "PELANGI INDAH MINI MARKET 1235-C JLN PASIR PANJANG  OTT1NL 21100",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC005345",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21100,
        "ADDR_TOTAL": "D-4, FLAT GOLENG BILAL, JLN PASIR PANJANG 21100 K.TRG TEKTMAN ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.294219,
        "LONGITUDE": 103.139107
      },
      {
        "CUST_NAME": "AC028575",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot 5854 Kg Peta 1 Bubus Manir Jalan Jeram  21200 Kuala Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.2719318,
        "LONGITUDE": 103.1608129
      },
      {
        "CUST_NAME": "AC011881",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "69-A Kg Banggol Tok Esah Manir 21200 K.Trg 21200 Kuala Terengganu Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.30609063,
        "LONGITUDE": 103.078512
      },
      {
        "CUST_NAME": "AC006159",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "LOT PT 4281 P, Kampung Tetambah, Manir 21200 Kuala Terengganu Terengganu  TEKTMAN .",
        "COMPANY_HIERARCHY": "Provision - Large Provision - Large Provision - Large Provision",
        "STANDARD_HIERARCHY": "Large Provision Stores",
        "LATITUDE": 5.307015,
        "LONGITUDE": 103.123571
      },
      {
        "CUST_NAME": "AC023804",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "165 Kg Banggol Air Lilih 21200 K.Terengganu   OTT1NL 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.3091088,
        "LONGITUDE": 103.0813363
      },
      {
        "CUST_NAME": "AC028582",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot 9733A Kampung Baloh Manir 21200 Kula Terengganu Terengganu  TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.2719233,
        "LONGITUDE": 103.1608104
      },
      {
        "CUST_NAME": "AC028583",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "N6, 4 Lot 11376 Kampung Telok Maenara Manir 21200 Kuala Terengganu Terengganu  TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.2718856,
        "LONGITUDE": 103.160847
      },
      {
        "CUST_NAME": "AC031357",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot 10188B , Kg Durian Mas Manir 21200 Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.31301712,
        "LONGITUDE": 103.054741
      },
      {
        "CUST_NAME": "AC005732",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "No. 6 Bangunan KEdai Pmint Batu 8, Jalan Kelantan  21200 OTT1NL .",
        "COMPANY_HIERARCHY": "Industrial Canteen - Pharmacy - Pharmacy - Pharmacy",
        "STANDARD_HIERARCHY": "Traditional Pharmacy",
        "LATITUDE": 5.346349,
        "LONGITUDE": 103.091931
      },
      {
        "CUST_NAME": "AC006175",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Batu 8 , Jalan Kelantan 21200 Kuala Tegengganu TEKTGBA 21200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.342307,
        "LONGITUDE": 103.090984
      },
      {
        "CUST_NAME": "AC005269",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot PT17687, Taman Semarak, Bukit Tunggal, Mukim Kuala Nerus, 21200 Kuala Terengganu.  OTT1NL ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC006179",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "718-c Batu 6 Jalan Kelantan 21200 Kuala Terengganu Terengganu TEKTMAN ",
        "COMPANY_HIERARCHY": "Industrial Canteen - Pharmacy - Pharmacy - Pharmacy",
        "STANDARD_HIERARCHY": "Traditional Pharmacy",
        "LATITUDE": 5.347606,
        "LONGITUDE": 103.090438
      },
      {
        "CUST_NAME": "AC006138",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Kedai MPKT 8189-B, Jalan Manir 21200 Kuala Terengganu Terengganu TEKTMAN ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.310768,
        "LONGITUDE": 103.084974
      },
      {
        "CUST_NAME": "AC031347",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "67,Taman Perumahan Batu Hampar Manir 21200 Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.3060611,
        "LONGITUDE": 103.078623
      },
      {
        "CUST_NAME": "AC006009",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "G.DURIAN MAS MANIR 21200 KUALA TERENGGANU TERENGGANU TEKTSTA ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.296009,
        "LONGITUDE": 103.066018
      },
      {
        "CUST_NAME": "AC000121",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "A-248 Kampung Kesom manir 21200 kuala Terengganu Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.30599656,
        "LONGITUDE": 103.078525
      },
      {
        "CUST_NAME": "AC005335",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "KG BATU ENAM JALAN KELANTAN OTT1NL 21200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": null,
        "LONGITUDE": null
      },
      {
        "CUST_NAME": "AC005729",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "PT 2251K, Depan Pasar Manir Kuala Terengganu 21200 OTT1NL .",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.308956,
        "LONGITUDE": 103.081737
      },
      {
        "CUST_NAME": "AC006236",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "LOT PT 35353 & 35354, DATARAN AUSTIN 21200 KUALA TERENGGANU TEKTSTA ",
        "COMPANY_HIERARCHY": "Industrial Canteen - Pharmacy - Pharmacy - Pharmacy",
        "STANDARD_HIERARCHY": "Traditional Pharmacy",
        "LATITUDE": 5.308956,
        "LONGITUDE": 103.127782
      },
      {
        "CUST_NAME": "AC031356",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "53,Kg Durian Mas Manir  21200 Kuala Terengganu TEKTMAN 21200",
        "COMPANY_HIERARCHY": "HORECA - Catering - Catering - Temp-Act",
        "STANDARD_HIERARCHY": "Catering",
        "LATITUDE": 5.30614451,
        "LONGITUDE": 103.0786116
      },
      {
        "CUST_NAME": "AC023794",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "193, Kampung Banggol Air Lilih 21200 Terengganu OTT1NL 21200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.30903507,
        "LONGITUDE": 103.0813714
      },
      {
        "CUST_NAME": "AC006051",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot PT 2788 Kedai Manir Pasir Manir Kuala Terengganu 21200 OTT1NL .",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.310572,
        "LONGITUDE": 103.079071
      },
      {
        "CUST_NAME": "AC031176",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot Pt 2894-A Kg Buluh Gading 21200 Jalan Kelantan Trg TEKTMAN 21200",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.30604488,
        "LONGITUDE": 103.0784529
      },
      {
        "CUST_NAME": "AC006290",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21200,
        "ADDR_TOTAL": "Lot PT 35511,Kg Banggol Jalan Gong Pak Damat Gong Badak 21200 Terengganu TEKTGBA 21200",
        "COMPANY_HIERARCHY": "Modern Trade - LMT - LMT Hyper - LMT HYPER",
        "STANDARD_HIERARCHY": "Hypermarket",
        "LATITUDE": 5.315376,
        "LONGITUDE": 103.134571
      },
      {
        "CUST_NAME": "AC006132",
        "CUST_STATUS": 0,
        "POSTAL_CODE_1": 21303,
        "ADDR_TOTAL": "6510-A KG PADANG NENAS, 21030 MENGABANG TELIPOT TEKTMAN 21303",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.412129,
        "LONGITUDE": 103.069285
      },
      {
        "CUST_NAME": "AC031195",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21400,
        "ADDR_TOTAL": "515 Jalan Surau Haji Mat Zin Pekan Bukit Payung 21400 Bukit Payung Trg OTT1NL 21400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.32113058,
        "LONGITUDE": 103.0427992
      },
      {
        "CUST_NAME": "AC000216",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21400,
        "ADDR_TOTAL": "Lot 10688 Jalan Rawai Kg Padang Limau Nipis 21400 Bukit Payung Terengganu   OTT1NL 21400",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.2719348,
        "LONGITUDE": 103.1608335
      },
      {
        "CUST_NAME": "AC004395",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21400,
        "ADDR_TOTAL": "58-B, TINGKAT BAWAH, PEKAN BUKIT PAYONG, 21400 MARANG  OTT1NL .",
        "COMPANY_HIERARCHY": "Provision - Medium Provision - Medium Provision - Medium Provision",
        "STANDARD_HIERARCHY": "Medium Provision Stores",
        "LATITUDE": 5.232284,
        "LONGITUDE": 103.103239
      },
      {
        "CUST_NAME": "AC006301",
        "CUST_STATUS": 1,
        "POSTAL_CODE_1": 21400,
        "ADDR_TOTAL": "Lot,57-A Pekan Bukit Payong 21400 Marang Terengganu   TEMAWTA ",
        "COMPANY_HIERARCHY": "Provision - Small Provision - Small Provision - Small Provision",
        "STANDARD_HIERARCHY": "Small Provision Stores",
        "LATITUDE": 5.309311,
        "LONGITUDE": 103.097845
      }
     ]

});
