






//Geographic Location
function userLocation(){
  //leaflet map
  const map = L.map('map').setView([0,0], 15);
//create tiles 
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

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

    

    const sumbit = document.getElementById("submit");
    sumbit.addEventListener("click", function(e){
      document.getElementById('business').value
     console.log(business)
    })
    
