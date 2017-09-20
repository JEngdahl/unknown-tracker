// var Twitter = require('twitter-node-client').Twitter;
// var twitter = new Twitter(config);
//
// //Example calls
// var error = function (err, response, body) {
//   console.log('ERROR [%s]', err);
// };
// var success = function (data) {
//   console.log('Data [%s]', data);
// };
//
// twitter.getUserTimeline({ screen_name: 'UnownBot', count: '10'}, error, success);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:1337/data",
  "method": "GET",
}

var locations;

$.ajax(settings).done(function(data){

var locations = data;

console.log(locations)

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: new google.maps.LatLng(39, -100),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
})



// var locations = [
//       ['Bondi Beach', -33.890542, 151.274856, 4],
//       ['Coogee Beach', -33.923036, 151.259052, 5],
//       ['Cronulla Beach', -34.028249, 151.157507, 3],
//       ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//       ['Maroubra Beach', -33.950198, 151.259302, 1]
//     ];
