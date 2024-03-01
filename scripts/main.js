
Vue.createApp({
    data() {
        return {
            weather: [],
                /*{
                temperature_2m: "",
                relative_humidity_2m: "",
                apparent_temperature: "",
                precipitation_probability: "",
                precipitation: "",
                wind_speed_10m: "",
                wind_direction_10m: "",
                wind_gusts_10m: "",
            }],*/
            weatherTestTable: [{
                temp: [],
                time: [],
        }],
        };
    },
    methods: {
        fetchData() {
            const geocodingParams = new URLSearchParams({
                'name': this.location,
                'count': '1',
                'language': 'en',
                'format': 'json'
            });

            const urlGeocoding = 'https://geocoding-api.open-meteo.com/v1/search?' + geocodingParams.toString();

            fetch(urlGeocoding, {
                method: 'GET'
            })
                .then(response => {
                    response.json().then(res => {
                        const weatherParams = new URLSearchParams({
                            'latitude': res.results[0].latitude,
                            'longitude': res.results[0].longitude,
                            'daily': [
                                'temperature_2m_max',
                               // 'relative_humidity_2m',
                               // 'apparent_temperature',
                               // 'precipitation_probability',
                               // 'precipitation',
                               // 'wind_speed_10m',
                              // 'wind_direction_10m',
                               // 'wind_gusts_10m'
                            ],
                            'forecast_days': 14,
                        });
                        const urlWeather = 'https://api.open-meteo.com/v1/forecast?' + weatherParams.toString();

                        console.log(res.results[0].latitude + ' ' + res.results[0].longitude);
                        console.log(res);

                        fetch(urlWeather, {
                            method: 'GET'
                        })
                            .then(response => {
                                response.json().then(res => {
                                    console.log(res);
                                    this.weather = res.daily.temperature_2m_max;
                                    this.weatherTestTable.time = res.daily.time;
                                    this.weatherTestTable.temp = res.daily.temperature_2m_max;
                                });
                            });

                    })
                        .catch(err => {
                            console.error(err);
                        });
                });
        },
        displayData(weatherData) {

            for (let i = 0; i < weatherData.daily.time.length; i++) {
                console.log(weatherData.daily.time[i]);
                this.weatherTestTable[i].time = weatherData.daily.time[i];
            }
        },
    },
    computed: {
    }
}).mount('#app');