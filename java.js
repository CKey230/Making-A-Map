//Leaflet Map
  const map = L.map('map').setView([0,0], 3);

  //Create Tiles
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


//Geographic Location
  function userLocation(){

      if(!navigator.geolocation){
        console.log('not supported by this browser');
      
      }
      else {
        console.log('supported by this browser')
        navigator.geolocation.getCurrentPosition(position => {
          const pos = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }
          L.marker([pos.lat,pos.long]).addTo(map) .bindPopup('You are here').openPopup();
          console.log(pos)
        });
      }
    }
      userLocation();
     
//misc.. on click map popup 
    var popup = L.popup();
    

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    
    map.on('click', onMapClick);


    
   