
angular.module('angularjs_with_Nodejs').controller('iciciController', function ($rootScope,$scope, $timeout, $filter, $http) {

    var map,geocoder;
    var infoWindow;
    var markers = []; 
    $scope.selectedStore = {};
    $scope.storeNames = [];
    $scope.showStorePlaceTypes = false;
    var trafficLayer;
    $scope.SelectedCountry = "";
    $scope.formblock = true;
    $scope.showMarketing = false;
    $scope.showTrafficButton = true;
    $scope.loading = false;
    var locationMarker;
   
    $scope.showPersonAnalysis = false;
    $scope.weightagePOI = [];
    $scope.TotalWeightage = 0;
    $scope.categorizedWeightage = {};
    

    

    var AddressJSON = [];
    var nextAddress = 0;
    var delay = 100;
    var bounds;
    $scope.heatmapArray = [];
    $scope.standardHierarchy = [];
    $scope.storeNames = [];
    $scope.selectedRatingFilter = 0;
    var selectedRatingFilterArray = [];
    var countryMarkerCluster;

  
    $scope.goto = function(page) {
      $scope.status = "Goto " + page;
    };

    setTimeout(function ()
    {
      $scope.initMap();
        
    }, 50);

    $scope.initMap = function ()
    {
        map = new google.maps.Map(document.getElementById("mymap"), {
        center: new google.maps.LatLng(23.492690,78.680398),
        zoom: 5, 
        mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        $scope.storeIPAddress();
        $scope.initialiseData();
        $scope.showStores();
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

    $scope.$apply();
};

$scope.createMyMarker = function(data) 
  {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude,data.longitude),
      icon: 'images/red1.png',
      map: map,
      //zIndex: Math.round(latlng.lat()*-100000)<<5
    });
//{"CTLPNO":273014,"latitude":26.7733598,"longitude":83.41098339999996,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "18000 INR/Sqft "},
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent("Client Number     :" + data.CTLNUM
                            + "<br/>" + "Latitude           :" + data.latitude 
                            + "<br/>" + "Longitude          :" +data.longitude
                            + "<br/>" + "Pincode            :" +data.CTLPNO 
                            + "<br/>" + "Premium Amount     :" +data.wfporigamt
                            + "<br/>" + "Health             :" +data.Health 
                            + "<br/>" + "Average Cost Living:" +data.AverageCostOfLand); 
      infowindow.open(map,marker);
    });
    markers.push(marker);
  }

$scope.showStores = function()
{
    console.log("---finalLocations.length---:",finalLocations.length);
    for (var i = 0, length = finalLocations.length; i < length; i++) 
    {
      data = finalLocations[i];
      $scope.createMyMarker(data);
    }

    countryMarkerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'}); 
       
    $scope.$apply();
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


    var finalLocations = [

      {"CTLPNO":110006,"latitude":28.6610779,"longitude":77.2345881,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
       {"CTLPNO":110008,"latitude":28.6482162,"longitude":77.16407179999999 ,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110001,"latitude":28.6327426,"longitude":77.21959689999994,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
       {"CTLPNO":110002,"latitude":28.6352202,"longitude":77.24688579999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
       {"CTLPNO":110003,"latitude":28.5916468,"longitude":77.23178630000007,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
       {"CTLPNO":110005,"latitude":28.6556793,"longitude":77.18746009999995,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110009,"latitude":28.7108654,"longitude":77.20314929999995,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
       {"CTLPNO":110015,"latitude":28.6589251,"longitude":77.14576139999997,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
       {"CTLPNO":110017,"latitude":28.5279118,"longitude":77.20889869999996,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110018,"latitude":28.6436082,"longitude":77.08698370000002,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
       {"CTLPNO":110007,"latitude":28.6785828,"longitude":77.19158399999992,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
      {"CTLPNO":110019,"latitude":28.5346916,"longitude":77.26017419999994,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
       {"CTLPNO":110020,"latitude":28.5388479,"longitude":77.27537280000001,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110021,"latitude":28.5883628,"longitude":77.18590689999996,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Red","AverageCostOfLand" : "9000 INR/Sqft "},
       {"CTLPNO":110024,"latitude":28.5683786,"longitude":77.24164640000004,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "5490 INR/Sqft "},
       {"CTLPNO":110025,"latitude":28.562147,"longitude":77.28570200000001,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110026,"latitude":28.6683157,"longitude":77.13654040000006,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
       {"CTLPNO":110028,"latitude":28.631833,"longitude":77.1387588,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
       {"CTLPNO":110031,"latitude":28.6508353,"longitude":77.26759500000003,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
       {"CTLPNO":110032,"latitude":28.6865527,"longitude":77.29221570000004,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
       {"CTLPNO":110034,"latitude":28.6930443,"longitude":77.13509490000001,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
       {"CTLPNO":110035,"latitude":28.6738274,"longitude":77.1642584,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
       {"CTLPNO":110057,"latitude":28.5616397,"longitude":77.15588389999994,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":110041,"latitude":28.6696613,"longitude":77.05687560000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":110043,"latitude":28.611665,"longitude":76.97867799999995,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":110051,"latitude":28.6569035,"longitude":77.2822923,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":110039,"latitude":28.80015809999999,"longitude":77.03548520000004,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":110044,"latitude":28.5006897,"longitude":77.3152116,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":110052,"latitude":28.689477,"longitude":77.17540880000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":110040,"latitude":28.834898,"longitude":77.08987839999998,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":110049,"latitude":28.5623635,"longitude":77.223073,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":110048,"latitude":28.54786,"longitude":77.23764140000003,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":110055,"latitude":28.645567,"longitude":77.21109720000004,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":121001,"latitude":28.3899664,"longitude":77.29797819999999,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":122015,"latitude":28.4963709,"longitude":77.05932459999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":121002,"latitude":28.419423,"longitude":77.36689649999994,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":122007,"latitude":28.471851,"longitude":77.0578855,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":122016,"latitude":28.5079338,"longitude":77.07515379999995,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":122009,"latitude":28.4641637,"longitude":77.08234820000007,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":125050,"latitude":29.4835524,"longitude":75.38785250000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":121004,"latitude":28.2919383,"longitude":77.355413,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":126102,"latitude":29.2857394,"longitude":76.29425070000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":122018,"latitude":28.4180814,"longitude":77.05068959999994,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":122006,"latitude":28.4813712,"longitude":76.99310739999999,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":132103,"latitude":29.4107176,"longitude":77.07947050000007,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
  {"CTLPNO":132001,"latitude":29.6386837,"longitude":77.07947050000007,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
  {"CTLPNO":133001,"latitude":30.377589,"longitude":76.86056499999995,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
  {"CTLPNO":141003,"latitude":30.8721582,"longitude":75.83596450000005,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "5490 INR/Sqft "},
  {"CTLPNO":133302,"latitude":30.8569568,"longitude":76.90668289999996,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
  {"CTLPNO":141010,"latitude":30.9023784,"longitude":75.90567529999998,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
  {"CTLPNO":141001,"latitude":30.9058885,"longitude":75.83596450000005,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":135001,"latitude":30.1014803,"longitude":77.27499639999996,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
  {"CTLPNO":141008,"latitude":30.9579652,"longitude":75.74877790000005,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
  {"CTLPNO":141123,"latitude":30.8875739,"longitude":75.97535160000007,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Red","AverageCostOfLand" : "9000 INR/Sqft "},
  {"CTLPNO":151001,"latitude":30.17384139999999,"longitude":74.8974925,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":143001,"latitude":31.6427636,"longitude":74.85656130000007,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":147203,"latitude":30.586134,"longitude":76.15518659999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":175101,"latitude":31.961527,"longitude":77.10824439999999,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":152123,"latitude":30.4120793,"longitude":74.07700999999997,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":142022,"latitude":30.8507629,"longitude":75.79528400000004,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":144001,"latitude":31.3271102,"longitude":75.59170919999997,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":175126,"latitude":31.8846818,"longitude":77.06795899999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":160036,"latitude":30.7325393,"longitude":76.73942369999997,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":152112,"latitude":30.3037834,"longitude":74.47600880000005,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":147001,"latitude":30.2896414,"longitude":76.34057329999996,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":201309,"latitude":28.6197948,"longitude":77.36115489999997,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":201002,"latitude":28.6805926,"longitude":77.4587239,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":201001,"latitude":28.6643697,"longitude":77.43864289999999,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":201010,"latitude":28.6609173,"longitude":77.34105690000001,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":201307,"latitude":28.5875317,"longitude":77.38411969999993,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Red","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":201304,"latitude":28.5160459,"longitude":77.39686770000003,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":201303,"latitude":28.5613345,"longitude":77.34967080000001,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":202001,"latitude":27.9079413,"longitude":78.0766036,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":201012,"latitude":28.6505315,"longitude":77.3525419,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":207123,"latitude":27.8089745,"longitude":78.6795836,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":201204,"latitude":28.8497207,"longitude":77.55047790000003,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":226010,"latitude":26.8524588,"longitude":81.02025329999992,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":221010,"latitude":25.3036473,"longitude":82.98509939999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":208006,"latitude":26.4480011,"longitude":80.31156120000003,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
{"CTLPNO":221001,"latitude":25.3254276,"longitude":83.0092803,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":208005,"latitude":26.4692427,"longitude":80.30181070000003,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":208001,"latitude":26.4870674,"longitude":80.34915990000002,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":221304,"latitude":25.3387082,"longitude":82.44277690000001,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":208027,"latitude":26.4279706,"longitude":80.29623850000007,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
{"CTLPNO":208002,"latitude":26.5019377,"longitude":80.31016840000007,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
{"CTLPNO":243122,"latitude":28.4422629,"longitude":79.44225929999993,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":247001,"latitude":29.9109993,"longitude":77.53901270000006,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":243001,"latitude":28.336572,"longitude":79.41974970000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":244001,"latitude":28.8736556,"longitude":78.72494689999996,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":249407,"latitude":29.9265396,"longitude":78.1022729,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":245101,"latitude":28.6977289,"longitude":77.76809520000006,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":249403,"latitude":29.9498376,"longitude":78.0766036,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":249401,"latitude":29.9767856,"longitude":78.12223360000007,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":248001,"latitude":30.3345816,"longitude":78.05378129999997,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":247776,"latitude":29.4787291,"longitude":77.30946740000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":251001,"latitude":29.4722225,"longitude":77.72231620000002,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":250003,"latitude":28.9776733,"longitude":77.72517800000003,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":250001,"latitude":29.0188653,"longitude":77.76809520000006,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":250004,"latitude":28.9396918,"longitude":77.779537,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":251002,"latitude":29.47829339999999,"longitude":77.66506600000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":250002,"latitude":28.9104503,"longitude":77.71086860000003,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":273001,"latitude":26.7448496,"longitude":83.36558230000003,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":262001,"latitude":28.6129028,"longitude":79.78484219999996,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":273014,"latitude":26.7733598,"longitude":83.41098339999996,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":262701,"latitude":28.0073044,"longitude":80.69926329999998,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":281001,"latitude":27.480921,"longitude":77.68796959999997,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":302001,"latitude":26.9178916,"longitude":75.80153799999994,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":274001,"latitude":26.4495915,"longitude":83.7836403,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":274301,"latitude":26.8807604,"longitude":83.70928609999999,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":281004,"latitude":27.4747631,"longitude":77.61924469999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":282005,"latitude":27.2251305,"longitude":78.00241340000002,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":274304,"latitude":26.9735099,"longitude":83.95325709999997,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":273015,"latitude":26.7918114,"longitude":83.30410610000001,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":302003,"latitude":26.9175077,"longitude":75.83401270000002,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":302004,"latitude":26.9013363,"longitude":75.82881900000007,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":302013,"latitude":27.0200643,"longitude":75.77203280000003,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":302021,"latitude":26.9055822,"longitude":75.74289929999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":302019,"latitude":26.8881391,"longitude":75.7610654,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":305001,"latitude":26.4573487,"longitude":74.64589869999998,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":302016,"latitude":26.9344949,"longitude":75.79425029999993,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":305801,"latitude":26.571016,"longitude":74.8974925,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":305901,"latitude":26.0951592,"longitude":74.33528580000007,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":302023,"latitude":26.9656399,"longitude":75.77493950000007,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":302015,"latitude":26.8767803,"longitude":75.79805750000003,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":302039,"latitude":26.9592126,"longitude":75.77147319999995,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":304021,"latitude":26.3244911,"longitude":75.85339539999995,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":311001,"latitude":25.3366306,"longitude":74.56976170000007,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":335501,"latitude":29.03363599999999,"longitude":75.22456929999998,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":313324,"latitude":25.0648113,"longitude":73.77132000000006,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":313001,"latitude":24.598284,"longitude":73.72424860000001,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":323001,"latitude":25.4473156,"longitude":75.64408419999995,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":332713,"latitude":27.7378679,"longitude":75.81853139999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":324009,"latitude":25.1551679,"longitude":75.82724819999999,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":334004,"latitude":28.0605146,"longitude":73.29422669999997,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":314025,"latitude":23.6683983,"longitude":73.99475630000006,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":334001,"latitude":28.2165605,"longitude":73.13496050000003,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":360002,"latitude":22.3030103,"longitude":70.89523370000006,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":360001,"latitude":22.2964051,"longitude":70.79415640000002,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":363641,"latitude":22.8017221,"longitude":70.76442359999999,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Yellow","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":360370,"latitude":21.8436466,"longitude":70.59788460000004,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":360007,"latitude":22.3024378,"longitude":70.77334359999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":360110,"latitude":22.4121994,"longitude":70.57408859999998,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":364004,"latitude":21.7731446,"longitude":72.0586677,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":360021,"latitude":22.2451749,"longitude":70.60978210000007,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":364001,"latitude":21.8681807,"longitude":72.18899999999996,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":342008,"latitude":26.1563518,"longitude":72.9814877,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":360004,"latitude":22.2169633,"longitude":70.75252990000001,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":370201,"latitude":23.071922,"longitude":70.15153420000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":380006,"latitude":23.0197481,"longitude":72.55464380000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":380009,"latitude":23.0314594,"longitude":72.56410770000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":370421,"latitude":22.8430356,"longitude":69.75252130000001,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":380008,"latitude":22.9984497,"longitude":72.61119389999999,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":380013,"latitude":23.0599377,"longitude":72.56124580000005,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":380015,"latitude":23.024349,"longitude":72.53015210000001,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":380005,"latitude":23.088705,"longitude":72.59109289999992,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":380052,"latitude":23.0513311,"longitude":72.53194910000002,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":380050,"latitude":22.9720561,"longitude":72.61216009999998,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":380054,"latitude":23.0134816,"longitude":72.49575129999994,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Red","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":380061,"latitude":23.0720184,"longitude":72.54213400000003,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":382213,"latitude":22.9179686,"longitude":72.41397870000003,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":380058,"latitude":23.0357933,"longitude":72.4376499,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":380060,"latitude":23.1102687,"longitude":72.48498610000001,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":382340,"latitude":23.0901517,"longitude":72.65153829999997,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":382210,"latitude":22.9260246,"longitude":72.48498610000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":382330,"latitude":23.0882825,"longitude":72.69789309999999,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":382405,"latitude":22.9644508,"longitude":72.58982979999996,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":382424,"latitude":23.1092442,"longitude":72.58482500000002,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":382430,"latitude":23.0421852,"longitude":72.69789309999999,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":383001,"latitude":23.5607987,"longitude":73.00510550000001,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":384205,"latitude":23.6411639,"longitude":72.3488721,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":382440,"latitude":22.9525631,"longitude":72.61128759999997,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":389151,"latitude":22.8147446,"longitude":74.25314649999996,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":382475,"latitude":23.0773592,"longitude":72.61891220000007,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":390022,"latitude":22.4091102,"longitude":73.24115059999997,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Red","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":395002,"latitude":21.184037,"longitude":72.84695669999996,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":394210,"latitude":21.1665957,"longitude":72.84729170000003,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":390011,"latitude":22.269836,"longitude":73.18423380000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":390020,"latitude":22.3008241,"longitude":73.1733127,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":391350,"latitude":22.4106642,"longitude":73.12020800000005,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":393145,"latitude":21.8995567,"longitude":73.45337789999996,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":390007,"latitude":22.3015177,"longitude":73.15266229999997,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":391243,"latitude":22.1808609,"longitude":73.15856259999998,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":390021,"latitude":22.3188741,"longitude":73.13938610000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":394221,"latitude":21.1346531,"longitude":72.83968789999994,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":395010,"latitude":21.1945842,"longitude":72.86918800000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":395004,"latitude":21.2299596,"longitude":72.82092979999993,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":395009,"latitude":21.1927855,"longitude":72.79980890000002,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":396191,"latitude":20.370056,"longitude":73.06413959999998,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":395006,"latitude":21.2173191,"longitude":72.86647160000007,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":396185,"latitude":20.440598,"longitude":72.90471359999992,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":395007,"latitude":21.1597606,"longitude":72.79591219999998,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Red","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":395023,"latitude":21.1268316,"longitude":72.85503080000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":395017,"latitude":21.1557746,"longitude":72.80871150000007,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400001,"latitude":18.9385352,"longitude":72.83633399999997,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400006,"latitude":18.9540855,"longitude":72.80044769999995,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":400002,"latitude":18.948367,"longitude":72.82593599999996,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Red","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":400020,"latitude":18.9351176,"longitude":72.82643780000001,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400021,"latitude":18.9255728,"longitude":72.82422210000004,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":400026,"latitude":18.970642,"longitude":72.809483,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":400013,"latitude":18.9981729,"longitude":72.82746910000003,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":400003,"latitude":18.9531926,"longitude":72.83530050000002,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":400004,"latitude":18.9579877,"longitude":72.82143990000009,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400022,"latitude":19.0425604,"longitude":72.86380889999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400058,"latitude":19.1227346,"longitude":72.8302013,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400031,"latitude":19.0132891,"longitude":72.85489810000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400059,"latitude":19.1118641,"longitude":72.8790282,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":400054,"latitude":19.0820116,"longitude":72.83446909999998,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":400056,"latitude":19.1044973,"longitude":72.8395011,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400028,"latitude":19.0217224,"longitude":72.83747900000003,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400050,"latitude":19.0551695,"longitude":72.8299518,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400053,"latitude":19.1121049,"longitude":72.86107300000003,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400052,"latitude":19.071708,"longitude":72.83410379999998,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":400034,"latitude":18.9724162,"longitude":72.81481770000005,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":400061,"latitude":19.1426559,"longitude":72.80534409999996,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":400069,"latitude":19.117753,"longitude":72.87370169999997,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":400077,"latitude":19.0778737,"longitude":72.90556270000002,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400063,"latitude":19.1648109,"longitude":72.8532715,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400093,"latitude":19.1282743,"longitude":72.86770920000004,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400097,"latitude":19.1838631,"longitude":72.85843210000007,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Red","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":400064,"latitude":19.1872294,"longitude":72.84074729999998,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400072,"latitude":19.1018031,"longitude":72.89035250000006,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":400068,"latitude":19.2590954,"longitude":72.83382340000003,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400071,"latitude":19.0521122,"longitude":72.900668,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400067,"latitude":19.2072366,"longitude":72.8348221,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400701,"latitude":19.1264801,"longitude":73.01100959999997,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Yellow","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":400705,"latitude":19.0574665,"longitude":73.01100959999997,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400602,"latitude":19.1900019,"longitude":72.96820170000001,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400614,"latitude":19.0283389,"longitude":73.03757610000002,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":400604,"latitude":19.1982404,"longitude":72.94900940000002,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400703,"latitude":19.0793547,"longitude":72.99920129999998,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":400102,"latitude":19.1418961,"longitude":72.83442400000001,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":400601,"latitude":19.2010502,"longitude":72.97853529999998,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":400104,"latitude":19.1630445,"longitude":72.83929949999992,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":411002,"latitude":18.512489,"longitude":73.86118119999992,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411001,"latitude":18.5296029,"longitude":73.87601530000006,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":410210,"latitude":19.0630231,"longitude":73.07004210000002,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Red","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411006,"latitude":18.5527212,"longitude":73.88964450000003,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":401209,"latitude":19.4054486,"longitude":72.83086920000005,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Yellow","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":411021,"latitude":18.5282286,"longitude":73.77780770000004,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Green","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":411004,"latitude":18.515729,"longitude":73.83486829999993,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":411009,"latitude":18.4865807,"longitude":73.85011029999998,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":401101,"latitude":19.2999134,"longitude":72.83973170000002,"CTLNUM":52151340,"wfporigamt":"11638 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":400710,"latitude":19.1045894,"longitude":73.02281730000004,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":411038,"latitude":18.5165691,"longitude":73.80367520000004,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411030,"latitude":18.510216,"longitude":73.84671049999997,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Green","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":411044,"latitude":18.6658525,"longitude":73.76543670000001,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411060,"latitude":18.4665083,"longitude":73.91683969999997,"CTLNUM":52151340,"wfporigamt":"13422 INR","Health": "Red","AverageCostOfLand" : "8250 INR/Sqft "},
 {"CTLPNO":411040,"latitude":18.492095,"longitude":73.9001776,"CTLNUM":52151340,"wfporigamt":"35000 INR","Health": "Yellow","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411045,"latitude":18.5642382,"longitude":73.7769432,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":411052,"latitude":18.485132,"longitude":73.81109470000001,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411037,"latitude":18.4807627,"longitude":73.87243009999997,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "10000 INR/Sqft "},
 {"CTLPNO":411048,"latitude":18.4645115,"longitude":73.88722519999999,"CTLNUM":52151340,"wfporigamt":"2554 INR","Health": "Green","AverageCostOfLand" : "18000 INR/Sqft "},
 {"CTLPNO":411051,"latitude":18.4777968,"longitude":73.82132130000002,"CTLNUM":52151340,"wfporigamt":"115000 INR","Health": "Red","AverageCostOfLand" : "5490 INR/Sqft "},
 {"CTLPNO":415003,"latitude":17.7001397,"longitude":74.04763779999996,"CTLNUM":52151340,"wfporigamt":"7148 INR","Health": "Green","AverageCostOfLand" : "5700 INR/Sqft "},
 {"CTLPNO":415002,"latitude":17.5951595,"longitude":73.95949399999995,"CTLNUM":52151340,"wfporigamt":"54413 INR","Health": "Yellow","AverageCostOfLand" : "9000 INR/Sqft "},
 {"CTLPNO":415311,"latitude":17.2728644,"longitude":74.52289159999998,"CTLNUM":52151340,"wfporigamt":"3969 INR","Health": "Green","AverageCostOfLand" : "8250 INR/Sqft "}
  
    ];

});
