async function callApi() {

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

export async function fetchData(weatherParams) {
    const urlWeather = 'https://api.open-meteo.com/v1/forecast?' + weatherParams.toString();

    try {
        const response = await fetch(urlWeather, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data);
        const weather = data.daily;
        return weather;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error to be handled by the caller if needed
    }
}
async function displayData(weatherData) {

    for (let i = 0; i < weatherData.time.length; i++) {
        this.weatherTestTable.push({ time: weatherData.time[i], temp: weatherData.temperature_2m_max[i] });

    }
    console.log(this.weatherTestTable);
}