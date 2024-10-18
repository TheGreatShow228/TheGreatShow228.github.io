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
}

