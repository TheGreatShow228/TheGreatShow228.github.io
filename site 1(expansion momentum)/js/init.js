document.addEventListener('DOMContentLoaded', () => {
	const defaultCoordinates = { latitude: 44.036, longitude: 38.9746 };
	const storedLatitude = localStorage.getItem('latitude') || defaultCoordinates.latitude;
	const storedLongitude = localStorage.getItem('longitude') || defaultCoordinates.longitude;
	const storedCity = localStorage.getItem('city') || 'Краснодар';

	document.querySelector('.city').textContent = storedCity;
	localStorage.setItem('latitude', storedLatitude);
	localStorage.setItem('longitude', storedLongitude);
	localStorage.setItem('city', storedCity);

  updateWeatherAndTime(storedLatitude, storedLongitude);
})

function updateWeatherAndTime(latitude, longitude) {
	getWeatherForecast(latitude, longitude);
	getCurrentTime(latitude, longitude);
	updateWallpaper();
}

function updateWallpaper() {
	let images = new Array();
	images[0] = 'img/image 01.jpg';
	images[1] = 'img/image 02.jpg';
	images[2] = 'img/image 03.jpg';
	images[3] = 'img/image 04.jpg';

	function Images() {
		let hour = new Date().getHours();
		let i = 0;

		if (hour >= 6 && hour < 12) i = 0;
		else if (hour >= 12 && hour < 18) i = 1;
		else if (hour >= 18 && hour < 24) i = 2;
		else i = 3;
		document.querySelector('.wallpaper').style.backgroundImage = `url('${images[i]}')`;
	}

	Images();
	setInterval(Images, 60000);
}