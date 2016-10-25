<!-- Global Variables -->
var map;
var marker;
var locationArray = ko.observableArray ([
  {title:'Hartford Hospital', location:{lat: 41.754582, lng:-72.678633} },
  {title:'School', location:{lat: 41.755042, lng:-72.665532} },
  {title:'Park', location:{lat: 41.757419, lng:-72.664175} },
  {title:'House', location:{lat: 41.764117, lng:-72.671873} },
  {title:'Condo', location:{lat: 41.767228, lng:-72.676470} }
]);

var style=[{elementType:"geometry",stylers:[{color:"#1d2c4d"}]},{elementType:"labels.text.fill",stylers:[{color:"#8ec3b9"}]},{elementType:"labels.text.stroke",stylers:[{color:"#1a3646"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#64779e"}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{color:"#334e87"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#023e58"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#283d6a"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#6f9ba5"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#023e58"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#3C7680"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#304a7d"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#2c6675"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#255763"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b0d5ce"}]},{featureType:"road.highway",elementType:"labels.text.stroke",stylers:[{color:"#023e58"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"transit.line",elementType:"geometry.fill",stylers:[{color:"#283d6a"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#3a4762"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#0e1626"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#4e6d70"}]}];






<!-- GoogleMap API -->
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.764117, lng: -72.676470},
    zoom: 13,
    styles: style
  });

  var defaultMarker = changeMarker('ff66ff');
  var highlightedMarker = changeMarker('66ccff');

// Iterates through the locationArray and gives the marker a proper
// location.
 for(var i = 0; i < locationArray().length; i++){
   var locations = locationArray()[i].location;
   var title = locationArray()[i].title;

   var marker = new google.maps.Marker({
       position: locations,
       map: map,
       title: title,
       icon: defaultMarker,
       animation: google.maps.Animation.DROP
           });

      locationArray()[i].marker = marker;

      var message = "hello world!";

      var infoWindow = new google.maps.InfoWindow({
        content: title,
        position: locations
      });

      //TODO: fix location on the Street view.

      var streetViewService = new google.maps.StreetViewService();
      var streetRadius = 50;

      function getStreetData (data, status){

        if(status == google.maps.StreetViewStatus.OK){
          var nearStreet = data.location.latLng;
          var heading = google.maps.geometry.spherical.computeHeading( nearStreet, marker);
           infoWindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>')
          var panoramaOptions = {
              position: nearStreet,
              pov: {
              heading: heading,
              pitch: 30
                  }
                };
      var panorama = new google.maps.StreetViewPanorama(
      document.getElementById('pano'), panoramaOptions);

      } else {
            infoWindow.setContent('<div>No Street View Found</div>');
          }

      streetViewService.getPanoramaByLocation(marker.location, streetRadius, getStreetData);




      }

      marker.addListener('click', function() {
            this.setIcon(highlightedMarker);
          });
        /*  marker.addListener('click', function() {
            this.setIcon(defaultMarker);
          });*/

      google.maps.event.addListener(marker,'click', ( function(marker){
          return function() {
          infoWindow.setContent("<div>" + marker.title + "</div><div id='pano'></div>");
          infoWindow.open( map, marker);
          getStreetData();
      }
})(marker));


};

//changes the color of the marker.
function changeMarker (color){
  var markerColor = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
          '|40|_|%E2%80%A2',

          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerColor;

}

};


<!-- View Model -->

//Binds the location title to the list in the navigation bar.
function viewModel() {
  this.openWindow = function(location) {
    google.maps.event.trigger(location.marker,'click');
  };

};

// If google maps is not working, throw and error message.
function googleError(){
  window.alert("Google Maps request error");
}

// Opens and closes nav menu.
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};


ko.applyBindings( new viewModel());
