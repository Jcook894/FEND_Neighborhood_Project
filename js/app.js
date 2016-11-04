//Global Variables
var map;
var marker;
var markers = [];
var locationArray = [
  {title:'State House', location:{lat: 41.763711, lng:-72.685093} },
  {title:'Travel Insurance', location:{lat: 41.755042, lng:-72.665532} },
  {title:'BurgerKing', location:{lat: 41.757419, lng:-72.664175} },
  {title:'Subway', location:{lat: 41.767228, lng:-72.676470} },
  {title:'Quiznos', location:{lat: 41.764117, lng:-72.671873} }
];

//The style of the map.
var style=[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];



// Initiates the google maps api.
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.764117, lng: -72.676470},
        zoom: 13,
        styles: style
    });

//Changes the marker color.
      var defaultMarker = changeMarker('ff66ff');
      var highlightedMarker = changeMarker('66ccff');


// Iterates through the locationArray and gives the marker a proper
// location.
  for(var i = 0; i < locationArray.length; i++){
      var locations = locationArray[i].location;
      var title = locationArray[i].title;
      wikipedia(locationArray[i]);

//Creates the markers on the map.
  var marker = new google.maps.Marker({
      position: locations,
       map: map,
       title: title,
       icon: defaultMarker,
       animation: google.maps.Animation.DROP
   });

      markers.push(marker);
      locationArray[i].marker = marker;

      console.log(markers);
//Creates the info windows to the markers.
      var infoWindow = new google.maps.InfoWindow({
          content: title,
          position: locations
      });

//Gets the street view data and creates a panorama view in the infoWindow.
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

      }

//Calls the wikipedia function with the locationArray passed in it.

//The marker event listener that opens the infoWindow with the correct information of the location.
      google.maps.event.addListener(marker,'click', ( function(marker, location){
          return function() {

          streetViewService.getPanoramaByLocation(marker.position, streetRadius, getStreetData);
//Checks for markers and sets the icon to defaultMarker
          if(infoWindow.marker){
            infoWindow.marker.setIcon(defaultMarker);
          }
          infoWindow.marker = marker;
          infoWindow.open( map, marker);
          infoWindow.setContent("<div>" + marker.title + "</div><div id='pano'></div><div><a href=" + location.url + ">"+ location.url +"</a></div>");
//When clicked, change marker to highlightedMarker.
          this.setIcon(highlightedMarker);
      }
})(marker, locationArray[i]));
//If you close out window/marker, change old marker back to default.
google.maps.event.addListener(infoWindow, 'closeclick', function(){
  this.marker.setIcon(defaultMarker);
})
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
function wikipedia(location){

//Waiting for the wiki request
  location.url = 'searching...'

    var wikiUrl = 'https://en.wikipedia.org/w/api.php?' +
        'action=opensearch&search=' + title +
        '&format=json&callback=wikiCallback'

//If you cant get a wiki request, throw an error message.
    var wikiError = setTimeout(function(){
      location.url = 'Cant find that wiki request yo!';
      console.log("wikipedia aint working!!!")
    }, 4000);

    $.ajax({
      url: wikiUrl,
      dataType: "jsonp",
      jsonp: "callback",
      success: function (response){
        var url = response[3][0];
            location.url = url;
            clearTimeout(wikiError);
            console.log('this ' + location.url);

}

  });

};
ko.applyBindings( new ViewModel());

};

// View Model

//Binds the location title to the list in the navigation bar.
function ViewModel(marker) {
  var self = this;
//Gets value from the search and filters through the array.
  self.filter = ko.observable('');
//Sets the locationArray as a ko.observableArray.
  self.items = ko.observableArray(locationArray);

//Computed function that filters through the locationArray
  self.filteredItems = ko.computed(function() {
    var filter = self.filter();
    if (!filter) {
      for(var i = 0; i < markers.length; i++){

        markers[i].setVisible()
        console.log(markers)
      }
      return self.items();
    }
    return self.items().filter(function(i) {
      var match= i.title.toLowerCase().indexOf(filter) > -1;
      i.marker.setVisible(match);
      return match;
  });



  });
//When the location is clicked, it opens the infoWindow.
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
