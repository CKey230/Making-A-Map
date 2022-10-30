//global objects 
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

// map build calling global object
	userLocation() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 11,
		});
		//create tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		//user geo marker
		const marker = L.marker(this.coordinates)
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
	},

	// for loop for business marker
	getMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

//async function for coordinates 
async function getLocation(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// foursquare api 
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
		}
	}
	let limit = 5
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	let data = await response.text()
	let parsedData = JSON.parse(data)
	let businesses = parsedData.results
	return businesses
}

function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}

window.onload = async () => {
	const coords = await getLocation()
	myMap.coordinates = coords
	myMap.userLocation()
}

//event listener for submit button 
const submit = document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.getMarkers()
})


//function userLocation(){

    //if(!navigator.geolocation){
      //console.log('not supported by this browser');
    
    //}
    //else {
      //console.log('supported by this browser')
      //navigator.geolocation.getCurrentPosition(position => {
       // const pos = {
         // lat: position.coords.latitude,
          //long: position.coords.longitude,
       // }
        //L.marker([pos.lat,pos.long]).addTo(map) .bindPopup('You are here').openPopup();
       // console.log(pos)
      //});
    //}
    //businesses.forEach(element => 
     // L.marker([element.coords[0],element.coords[1]]).addTo(mymap)
     //.bindPopup("<strong>"+element.name+"</strong>"));
  //}
    //userLocation();
   