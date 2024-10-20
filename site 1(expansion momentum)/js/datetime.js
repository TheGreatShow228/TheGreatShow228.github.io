function getCurrentTime(latitude, longitude) {
	fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`)
		.then(response => response.json())
		.then(locationData => {
			const city = locationData.city || locationData.locality;
			const timezone = timeZoneMapping[city] || 'Europe/Moscow';

			updateTime(timezone)
			setInterval(() => updateTime(timezone), 1000);
		})
		.catch(error => {
			console.error('Ошибка при получении часового пояса:', error);
		})
}

function updateTime(timezone) {
	fetch(`https://timeapi.io/api/Time/current/zone?timeZone=${timezone}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Ошибка: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			document.querySelector('.time').textContent = formatTime(data);
			document.querySelector('.date').textContent = formatDate(data);
			updateWallpaper();
		})
		.catch(error => {
			console.error('Ошибка при получении текущего времени:', error);
		})
}

const timeZoneMapping = {
	'Москва': 'Europe/Moscow', 'Санкт-Петербург': 'Europe/Moscow', 'Краснодар': 'Europe/Moscow',
	'Хабаровск': 'Asia/Khabarovsk', 'Владивосток': 'Asia/Vladivostok',
}

function formatTime(data) {
	const { hour, minute, seconds } = data;
	return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2,'0')
	}:${String(seconds).padStart(2, '0')}`
}

function formatDate(data) {
	const { day, month, year } = data;
	const date = new Date(year, month - 1, day);
	const options = { day: '2-digit', month: 'long', weekday: 'long' };
	return date.toLocaleDateString('ru-RU', options);
}
