
<!-- GoogleMap API -->
function initMap() {


  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.764117, lng: -72.676470},
    zoom: 13,
    styles: style
  });

// Iterates through the locationArray and gives the marker a proper
// location.
 for(var i = 0; i < locationArray().length; i++){
   var locations = locationArray()[i].location;
   var title = locationArray()[i].title;

   var marker = new google.maps.Marker({
       position: locations,
       map: map,
       title: title,
       animation: google.maps.Animation.DROP
           });

      locationArray()[i].marker = marker;

      var message = "hello world!";

      var infoWindow = new google.maps.InfoWindow({
        content: title,
        position: locations
      });


function clickMe (){

      google.maps.event.addListener(marker,'click', ( function(marker){
          return function() {
          windowInfo();
          infoWindow.setContent("<div>" + marker.title + "</div>");
          infoWindow.open( map, marker);
      }
})(marker));
}

};

function windowInfo(marker, infoWindow){

  if(infoWindow.marker == marker){
    infoWindow.setContent('');
    infoWindow.marker = marker;

    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

};



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


<!-- View Model -->

//Binds the location title to the list in the navigation bar.
function viewModel() {
  var infoWindow;

  this.openWindow = function(location, marker){
    if(marker !== null){

      console.log(marker);
    }
  };
};
// Opens and closes nav menu.
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
};

ko.applyBindings( new viewModel());
