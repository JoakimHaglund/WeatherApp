export function fullCallParams(latitude, longitude) {
    return new URLSearchParams({
        'latitude': latitude,
        'longitude': longitude,
        'hourly': [
            'temperature_2m',
            'apparent_temperature',
            'precipitation_probability',
            'precipitation',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m',
            'weather_code'
        ],
        'daily': [
            'temperature_2m_max',
            'apparent_temperature_max',
            'precipitation_probability_max',
            'precipitation_sum',
            'wind_speed_10m_max',
            'wind_speed_10m_min',
            'wind_direction_10m_dominant',
            'wind_gusts_10m_max',
            'weather_code'
        ],
        'forecast_days': 14,
    }).toString();
}
export function dailyCallParams(latitude, longitude) {
    return new URLSearchParams({
        'latitude': latitude,
        'longitude': longitude,
        'forecast_days': 14,
    }).toString();
}

export async function fetchLocationInfo(location) {
    const geocodingParams = new URLSearchParams({
        'name': location,
        'count': '5',
        'language': 'en',
        'format': 'json'
    });
    const urlGeocoding = 'https://geocoding-api.open-meteo.com/v1/search?' + geocodingParams.toString();
    try {
        const response = await fetch(urlGeocoding, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();
        let locationData = [];

        res.results.forEach(element => {
            locationData.push({
                name: element.name,
                country: element.country,
                latitude: element.latitude,
                longitude: element.longitude,
                timezone: element.timezone
            });
        });

        return locationData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function fetchData(latitude, longitude) {
    const urlWeather = 'https://api.open-meteo.com/v1/forecast?' + fullCallParams(latitude, longitude);

    try {
        const response = await fetch(urlWeather, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return handleData(data);

    } catch (err) {
        console.error(err);
        throw err;
    }
}

function handleData(weatherData) {
    let weather = {
        daily: [],
        hourly: []
    };
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        let timestamp = weatherData.hourly.time[i].split('T');
        weather.hourly.date = timestamp[0]
        weather.hourly.push({
            time: weatherData.hourly.time[i],
            temp: Math.round(weatherData.hourly.temperature_2m[i]),
            apparent_temp: Math.round(weatherData.hourly.apparent_temperature[i]),
            precipitation_probability: weatherData.hourly.precipitation_probability[i],
            precipitation: weatherData.hourly.precipitation[i],
            wind_speed: Math.round((weatherData.hourly.wind_speed_10m[i] / 3.6).toFixed(2)),
            wind_direction: weatherData.hourly.wind_direction_10m[i],
            wind_gusts: Math.round((weatherData.hourly.wind_gusts_10m[i] / 3.6).toFixed(2)),
            weather_code: weatherData.hourly.weather_code[i],
        });
    }
    for (let i = 0; i < weatherData.daily.time.length; i++) {
        weather.daily.push({
            time: weatherData.daily.time[i],
            temp: Math.round(weatherData.daily.temperature_2m_max[i]),
            apparent_temp: Math.round(weatherData.daily.apparent_temperature_max[i]),
            precipitation_probability: weatherData.daily.precipitation_probability_max[i],
            precipitation: weatherData.daily.precipitation_sum[i],
            wind_speed: Math.round((weatherData.daily.wind_speed_10m_max[i] / 3.6).toFixed(2)),
            wind_speed_min: Math.round((weatherData.daily.wind_speed_10m_min[i] / 3.6).toFixed(2)),
            wind_direction: weatherData.daily.wind_direction_10m_dominant[i],
            wind_gusts: Math.round((weatherData.daily.wind_gusts_10m_max[i] / 3.6).toFixed(2)),
            weather_code: weatherData.daily.weather_code[i],
        });
    }
    return weather;
}