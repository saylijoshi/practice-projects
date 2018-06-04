var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var fs = require("fs");
var request = require('request');

//var config = require('./config');
var googlemaps = require('@google/maps');
var csv = require('fast-csv');

//var Pbf = require('pbf');
//var parseOSM = require('osm-pbf-parser');
//
var googleMapsClient = googlemaps.createClient({
    key: "AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo"
});

//var config = require('./config');
//var googlemaps = require('@google/maps');
//var csv = require('fast-csv');
//
//var Pbf = require('pbf');
//var parseOSM = require('osm-pbf-parser');
//
//var googleMapsClient = googlemaps.createClient({
//    key: "AIzaSyDVR5iaxk4V2f3OqyyhwUrZdWvE7L7n8Uo"
//});
//>>>>>>> ad6c2d0b9beaa8b19dd90444e26c37c121e2b612

//var schema = require('protocol-buffers-schema');
//var proto = require('/home/pallavidandane/googleMapAngularNodeJS/Angular_node_eg/node_modules/pbf/node_modules/resolve-protobuf-schema/node_modules/protocol-buffers-schema/example.proto');
//
//var Test = proto.Test;

// Database
var mongo = require('mongodb');
//console.log(mongo);
var monk = require('monk');
//console.log(monk);
var db = monk('130.211.159.225:27017/googleMapData');
//console.log(db);

//var handsontable = require('handsontable');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req,res,next){
    req.db = db;
//    console.log('=======================================');
//    console.log(req.db );
    next();
});
app.use('/', index);
app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function readCSVfile(){
    fs.createReadStream("addresses.csv")
        .pipe(csv())
        .on("data", function(data){
            // console.log(data);
            getGeolocation(data);
            // console.log(data);
        })
        .on("end", function(){
            // console.log("done");
        });

}

function getLocationFromArray(dataArr, index){
    var DELIM = " ";
    if(index == 1){
        for(var j = 3; j>0 ; j--){
            dataArr[j] = dataArr[j].replace(/[.,;:*&'"@$%()]/g,"");
            var tempArr = dataArr[j].split(DELIM);
            if(tempArr.length > 1){
                dataArr.splice(j,1);
                tempArr.map(function(x, k){
                    dataArr.splice(j+k,0,x);
                })
            }
        }
    };

    var retString = "";
    for(var i = index; i < dataArr.length-3; i++){
        retString = retString + " " + dataArr[i];
    };

    return retString;
}

function getGeolocation(dataArray, index){
    // console.log("dataArray", dataArray);
    if(!index)
        index = 0;
    index++;
    var location = getLocationFromArray(dataArray, index);
//    console.log(index, " - location", location);
    googleMapsClient.geocode({
        address: location
    }, function(err, response) {
        if (!err) {
//            console.log(index, location)
            if(response.json.results.length > 0){
                response.json.results.map(function(x){
                    console.log("%s,%s,%s,%s,%s", dataArray[0], x.formatted_address.replace(/,/g,' '), x.geometry.location.lat, x.geometry.location.lng,response.json.results.length);
                })
            }
            else
                getGeolocation(dataArray, index);
        } else {
            console.log("error", err);
        }
    });
}

//readCSVfile();
module.exports = app;
