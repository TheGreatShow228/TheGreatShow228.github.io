function getCurrentTime(latitude, longitude) {
	fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ru`)
		.then(response => response.json())
		.then(locationData => {
			const city = locationData.city || locationData.locality;
			const timezone = timeZoneMapping[city] || 'Europe/Moscow';

			displayCityTime(timezone); 
			setInterval(() => displayCityTime(timezone), 1000);
		})
		.catch(error => {
			console.error('Ошибка при получении часового пояса:', error);
		})
}


const timeZoneMapping = {
	'Москва': 'Europe/Moscow', 'Санкт-Петербург': 'Europe/Moscow', 'Краснодар': 'Europe/Moscow',
	'Хабаровск': 'Asia/Vladivostok', 'Владивосток': 'Asia/Vladivostok', 'Красноярск': 'Asia/Krasnoyarsk', 
	'Новосибирск': 'Asia/Novosibirsk', 'Екатеринбург': 'Asia/Yekaterinburg', 'Казань': 'Europe/Moscow',
	'Нижний Новгород': 'Europe/Moscow', 'Челябинск': 'Asia/Yekaterinburg', 'Омск': 'Asia/Omsk',
	'Ростов-на-Дону': 'Europe/Moscow', 'Волгоград': 'Europe/Moscow', 'Пермь': 'Asia/Yekaterinburg',
	'Тюмень': 'Asia/Tyumen','Уфа': 'Asia/Yekaterinburg', 'Саратов': 'Europe/Moscow',
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
	return date.toLocaleDateString('ru-RU', options) + ` ${year}`;
}

function displayCityTime(timezone) {
    const now = new Date();
    const options = { timeZone: timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeFormatter = new Intl.DateTimeFormat('ru-RU', options);

    document.querySelector('.time').textContent = timeFormatter.format(now);
    
    const dateFormatter = new Intl.DateTimeFormat('ru-RU', { timeZone: timezone, year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });
		const formattedDate = dateFormatter.format(now).replace('г.', '').trim();
    document.querySelector('.date').textContent = formattedDate.toUpperCase();
}

function displayLocalTime() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    
    try {
        const timeFormatter = new Intl.DateTimeFormat('ru-RU', options);
        document.querySelector('.time').textContent = timeFormatter.format(now);
    
        const dateFormatter = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' });
        const formattedDate = dateFormatter.format(now).replace('г.', '').trim();
        document.querySelector('.date').textContent = formattedDate.toUpperCase();
    } catch (error) {
        console.error('Ошибка при форматировании локальной даты:', error);
        document.querySelector('.time').textContent = 'Ошибка';
        document.querySelector('.date').textContent = 'Ошибка';
    }

		setInterval(displayLocalTime, 1000);
}