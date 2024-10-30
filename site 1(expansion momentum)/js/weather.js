function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, showError);
	} else {
		console.log('Геолокация не поддерживается этим браузером.');
		getWeatherForecast(44.036, 38.9746);
	}
}
document.querySelector('.city-button').addEventListener('click', getLocation);

function showPosition(position) {
	const { latitude, longitude } = position.coords;
	localStorage.setItem('latitude', latitude);
	localStorage.setItem('longitude', longitude);


	fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`)
		.then(response => response.json())
		.then(data => {
			const city = data.city || data.locality;
 			document.querySelector('.city').textContent = city;
 			localStorage.setItem('city', city);
 			updateWeatherAndTime(latitude, longitude);
		})
		.catch(error => {
			console.error('Ошибка при получении данных о местоположении:', error);
		})
}

function getWeatherForecast(latitude, longitude) {
	fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature,precipitation,weathercode,windspeed_10m`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Ошибка: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			updateWeather(data);
			setInterval(() => updateWeather(data), 60000);
		})
		.catch(error => {
			console.error('Ошибка при получении данных о погоде:', error);
		})
}

function updateWeather(data) {
	const temperature = data.hourly.temperature[0];
	const precipitation = data.hourly.precipitation[0];
	const weatherCode = data.hourly.weathercode[0];
	const windSpeed = data.hourly.windspeed_10m[0];

	document.querySelector(
		'.temperature'
	).innerHTML = `<img src="img/icon 02.png" alt="Температура" class="icon weather-icon"> ${temperature}°`

	const weatherForecast = weatherCondition[weatherCode];
	if (weatherForecast) {
		document.querySelector(
			'.weather'
		).innerHTML = `<img src="img/icon 03.png" alt="Погода" class="icon weather-icon"> ${weatherForecast}`
	}
	if (precipitation > 0.5) {
		document.querySelector('.precipitation').innerHTML = `<img src="img/icon 04.png" alt="Осадки" class="icon weather-icon"> ${precipitation} мм`;
	} else {
		document.querySelector('.precipitation').textContent = '';
	}
	if (windSpeed >= 1.5) {
		document.querySelector(
			'.windSpeed'
		).innerHTML = `<img src="img/icon 05.png" alt="Ветер" class="icon weather-icon"> ${windSpeed} м/с`
	} else {
		document.querySelector('.windSpeed').textContent = '';
	}
}

const weatherCondition = [
	'Ясно', 'Малооблачно', 'Облачно', 'Пасмурно', 'Туман', 
	'Небольшой дождь', 'Дождь', 'Сильный дождь', 'Небольшой снег', 'Снег', 
	'Сильный снег', 'Гроза', 'Ливень',  'Сильный ливень', 'Град'
];

function getWindCondition(speed) {
	if (speed >= 1.5 && speed <= 5.4) {
		return 'Слабый ветер'
	} else if (speed > 5.4 && speed <= 10.7) {
		return 'Обычный ветер'
	} else if (speed > 10.7) {
		return 'Сильный ветер'
	}
}

function showError(error) {
	const notification = document.getElementById('notification');
	const messages = {
		[error.PERMISSION_DENIED]: 'Пользователь отказал в доступе к геолокации.',
		[error.POSITION_UNAVAILABLE]: 'Информация о местоположении недоступна.',
		[error.TIMEOUT]: 'Запрос на получение местоположения превысил время ожидания.',
		[error.UNKNOWN_ERROR]: 'Произошла неизвестная ошибка.',
	}
	notification.textContent = messages[error.code] || 'Произошла ошибка.';
	notification.style.display = 'block';

	setTimeout(() => {
		notification.style.display = 'none';
	}, 2000)
}
