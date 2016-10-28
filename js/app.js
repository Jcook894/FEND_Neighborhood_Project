<!-- Global Variables -->
var map;
var marker;
var locationArray = ko.observableArray ([
  {title:'State House', location:{lat: 41.763711, lng:-72.685093} },
  {title:'Hartford School', location:{lat: 41.755042, lng:-72.665532} },
  {title:'Keeney Park', location:{lat: 41.757419, lng:-72.664175} },
  {title:'House', location:{lat: 41.764117, lng:-72.671873} },
  {title:'Subway', location:{lat: 41.767228, lng:-72.676470} }
]);

var style=[{elementType:"geometry",stylers:[{color:"#1d2c4d"}]},{elementType:"labels.text.fill",stylers:[{color:"#8ec3b9"}]},{elementType:"labels.text.stroke",stylers:[{color:"#1a3646"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#64779e"}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{color:"#334e87"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#023e58"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#283d6a"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#6f9ba5"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#023e58"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#3C7680"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#304a7d"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#2c6675"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#255763"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b0d5ce"}]},{featureType:"road.highway",elementType:"labels.text.stroke",stylers:[{color:"#023e58"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"transit.line",elementType:"geometry.fill",stylers:[{color:"#283d6a"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#3a4762"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#0e1626"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#4e6d70"}]}];



// Initiates the google maps api.
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


      var streetViewService = new google.maps.StreetViewService();
      var streetRadius = 50;

      function getStreetData (data, status){

      if(status == google.maps.StreetViewStatus.OK){
        var nearStreet = data.location.latLng;
        var heading = google.maps.geometry.spherical.computeHeading( nearStreet, marker.position);
        var panoramaOptions = {
            position: nearStreet,
            pov: {
            heading: heading,
            pitch: 30
              }
          };
        var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), panoramaOptions);
      }
      else {
            infoWindow.setContent('<div>No Street View Found</div>');
          }

      };

      marker.addListener('click', function() {

            this.setIcon(highlightedMarker);
          });
        /*  marker.addListener('click', function() {
            this.setIcon(defaultMarker);
          });*/

      google.maps.event.addListener(marker,'click', ( function(marker){
          return function() {
          wikipedia();
          infoWindow.setContent("<div>" + marker.title + "</div><div id='pano'></div>");
          streetViewService.getPanoramaByLocation(marker.position, streetRadius, getStreetData);
          infoWindow.open( map, marker);

      }
})(marker));

};

//Changes the color of the marker.
function changeMarker (color){
  var markerColor = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ color +
          '|40|_|%E2%80%A2',

          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerColor;

      };

//Grabs the wikipedia api and sets the search to the marker title.
function wikipedia(){

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?' +
        'action=opensearch&search=' + title +
        '&format=json&callback=wikiCallback'

//If you cant get a wiki request, throw an error message.
    var wikiError = setTimeout(function(){
      window.alert('Cant find that wiki request yo!');
      console.log("wikipedia aint working!!!")
    }, 8000);

    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      //jsonp: "callback",
      success: function (response){
        var wikiArticle = response[1];



        for(var i = 0; i < wikiArticle.length; i++){
          wikiStr = wikiArticle[1];
            var title = marker.title[i];

            var content = document.getElementById('wikiElem');

          var url = 'http://en.wikipedia.org/wiki/' + wikiStr;
          infoWindow.setContent('<div id="wikiElem"><div>'+ url + '</div>');

          console.log(response);
        }
// Clears the time out if the wiki request is made.
        clearTimeout(wikiError);
      }

    });

};
};

<!-- View Model -->

//Binds the location title to the list in the navigation bar.
function viewModel() {
  this.openWindow = function(location) {
    google.maps.event.trigger(location.marker,'click');
  };


};

//loads the NY times articles.


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
