$(document).ready(function(){
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://unknowntracker.herokuapp.com/data",
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
        infowindow.setContent(locations[i][0]+locations[i][4]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
})
})
