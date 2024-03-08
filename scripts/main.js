import * as svg from './drawSvg.js';
import * as api from './weatherHandler.js';

Vue.createApp({
    data() {
        return {
            hasData: false,
            searchLocation: '',
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
            hasScrolledRight: false,
            showRightScroll: true,
            showLeftScroll: false,
            searchPerformed: false
        };  
    },

    methods: {
        createNewSvg() {
            svg.createDiagram(this.weather);
            console.log('SVG')
        },
        scrollLeft() {
            //scroll left
            console.log('clicked on Right Scroll!')
            let element = document.querySelector('.container');
            element.scrollLeft -= element.scrollWidth / 4;

            this.hasScrolledRight = true;
        },
        scrollRight() {
            //scroll left
            console.log('clicked on Right Scroll!')
            let element = document.querySelector('.container');
            element.scrollLeft += element.scrollWidth / 4;

            this.hasScrolledRight = true;
        },
        scrollTranslate() {
            const scrollContainer = this.$refs.scrollContainer;
            const scrollLeft = scrollContainer.scrollLeft;
            const scrollWidth = scrollContainer.scrollWidth;
            const clientWidth = scrollContainer.clientWidth;

            // Calculate scroll percentage
            const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;

            console.log("Scroll Left:", scrollLeft);
            console.log("Scroll Width:", scrollWidth);
            console.log("Client Width:", clientWidth);
            console.log("Scroll Percentage:", scrollPercentage.toFixed(2) + "%");
        },
        handleScroll() {
            const scrollContainer = this.$refs.scrollContainer;
            const isEndOfScroll = scrollContainer.scrollLeft + scrollContainer.clientWidth  >= scrollContainer.scrollWidth - 120;
            const isStartOfScroll = scrollContainer.scrollLeft === 0;

            this.showRightScroll = !isEndOfScroll;

            this.showLeftScroll = !isStartOfScroll;
            console.log('END: ' + isEndOfScroll + ' START: ' + isStartOfScroll);
        },
        getDayName(date) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return dayNames[new Date(date).getDay()];
        },
        getMonthName(date){
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let day = date.substr(date.length - 2);
            let dayNumber = parseInt(day);
            let suffix = 'th';

            if (dayNumber < 10) {
                day = day.substr(1);
            }

            if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
                suffix = 'st';
            } else if (dayNumber === 2 || dayNumber === 22) {
                suffix = 'nd';
            } else if (dayNumber === 3 || dayNumber === 23) {
                suffix = 'rd';
            }

            return day + suffix + ' of ' + monthNames[new Date(date).getMonth()];
        },

        fetchData() {
            const geocodingParams = new URLSearchParams({
                'name': this.searchLocation,
                'count': '10',
                'language': 'en',
                'format': 'json'
            });
            api.fetchLocationInfo(this.searchLocation).then(locationData => {
                console.log( locationData)
                this.location = locationData[0].name;
                this.country = locationData[0].country;

                const weatherParams = new URLSearchParams({
                    'latitude': locationData[0].latitude,
                    'longitude': locationData[0].longitude,
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
                api.fetchData(weatherParams).then(weatherData => {
                    console.log( weatherData)
                    this.weather = weatherData;
                    this.hasData = true;
                    let element = document.querySelector('.container');
                    element.classList.remove('hidden');
                    this.createNewSvg();
                });
            });

            this.searchPerformed = true;
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
            value = value + 180;
            return {
                transform: 'rotate(' + value + 'deg)',
                display: 'inline-block'
            }
        }


    },
    watch: {
        scrollContainer(value) {
            if (value) {
                value.addEventListener("scroll", this.handleScroll);
            }
        }
    },
    mounted() {
        // Call the function to create SVG when the component is mounted
        //this.createNewSvg();
    }
}).mount('#app');