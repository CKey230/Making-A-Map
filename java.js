
  const map = L.map('map').setView([0,0], 13);

  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

  function display(){
    

      if(!navigator.geolocation){
        console.log('not supported by this browser');
      
      }
      else {
        console.log('supported by this browser')
        navigator.geolocation.getCurrentPosition(position => {
          const data = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }
          L.marker([data.lat,data.long]).addTo(map) .bindPopup('You are here').openPopup();
          console.log(data)
        });
      }
    }
      display();
      

    var popup = L.popup();
    

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    
    map.on('click', onMapClick);
    
   