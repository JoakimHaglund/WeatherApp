
Vue.createApp({
    data() {
        return {
            hasData: false,
            location: '',
            country: '',
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
            weatherTestTable: [],
        };
    },
    methods: {
        scrollTranslate() {
            return window.scrollX = window.scrollY;
        },
        getDayName(date) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return dayNames[new Date(date).getDay()];
        },
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
                        this.location = res.results[0].name;
                        this.country = res.results[0].country;
                        const weatherParams = new URLSearchParams({
                            'latitude': res.results[0].latitude,
                            'longitude': res.results[0].longitude,
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
                                    this.weather = res.daily;
                                    this.hasData = true;

                                });
                            });

                    })
                        .catch(err => {
                            console.error(err);
                        });
                });
        },
        displayData(weatherData) {

            for (let i = 0; i < weatherData.time.length; i++) {
                this.weatherTestTable.push({ time: weatherData.time[i], temp: weatherData.temperature_2m_max[i] });

            }
            console.log(this.weatherTestTable);
        },
    },
    computed: {

        style(value) {
            return {
                transform: 'rotate(' + value + 'deg)',
                display: 'inline-block'
            }
        }


    }
}).mount('#app');