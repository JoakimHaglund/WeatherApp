import * as svg from './drawSvg.js';
import * as api from './weatherHandler.js';

Vue.createApp({
    data() {
        return {
            hasData: false,
            searchLocation: '',
            location: '',
            country: '',
            weather: {},
            storedLocations: [],
            selectedOption: 2,
            hasScrolledRight: false,
            showRightScroll: true,
            showLeftScroll: false,
            divider: 4,
            heartIcon: '/WeatherApp/resources/heart-empty.svg',
            heartEmpty: '/WeatherApp/resources/heart-empty.svg',
            heartFilled: '/WeatherApp/resources/heart-filled.svg',
            weatherDayIcons: {
                0: '/WeatherApp/resources/weatherIcons/clear-day.svg',
                1: '/WeatherApp/resources/weatherIcons/partly-cloudy-day.svg',
                2: '/WeatherApp/resources/weatherIcons/partly-cloudy-day.svg',
                3: '/WeatherApp/resources/weatherIcons/overcast-day.svg',
                45: '/WeatherApp/resources/weatherIcons/fog.svg',
                48: '/WeatherApp/resources/weatherIcons/snow.svg',
                51: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-drizzle.svg',
                53: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-drizzle.svg',
                55: '/WeatherApp/resources/weatherIcons/drizzle.svg',
                56: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-sleet.svg',
                57: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-sleet.svg',
                61: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-rain.svg',
                63: '/WeatherApp/resources/weatherIcons/partly-cloudy-day.svg',
                65: '/WeatherApp/resources/weatherIcons/rain.svg',
                66: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-sleet.svg',
                67: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-sleet.svg',
                71: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-snow.svg',
                73: '/WeatherApp/resources/weatherIcons/snow.svg',
                75: '/WeatherApp/resources/weatherIcons/snow.svg',
                77: '/WeatherApp/resources/weatherIcons/snow.svg',
                80: '/WeatherApp/resources/weatherIcons/drizzle.svg',
                81: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-rain.svg',
                82: '/WeatherApp/resources/weatherIcons/rain.svg',
                85: '/WeatherApp/resources/weatherIcons/partly-cloudy-day-snow.svg',
                86: '/WeatherApp/resources/weatherIcons/snow.svg',
                95: '/WeatherApp/resources/weatherIcons/thunderstorms-day-snow.svg',
                96: '/WeatherApp/resources/weatherIcons/thunderstorms-day-snow.svg',
                99: '/WeatherApp/resources/weatherIcons/thunderstorms-snow.svg',
                default: '/WeatherApp/resources/weatherIcons/not-available.svg'
            },
            weatherNightIcons: {
                0: '/WeatherApp/resources/weatherIcons/clear-night.svg',
                1: '/WeatherApp/resources/weatherIcons/partly-cloudy-night.svg',
                2: '/WeatherApp/resources/weatherIcons/partly-cloudy-night.svg',
                3: '/WeatherApp/resources/weatherIcons/overcast-night.svg',
                45: '/WeatherApp/resources/weatherIcons/fog.svg',
                48: '/WeatherApp/resources/weatherIcons/snow.svg',
                51: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-drizzle.svg',
                53: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-drizzle.svg',
                55: '/WeatherApp/resources/weatherIcons/drizzle.svg',
                56: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-sleet.svg',
                57: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-sleet.svg',
                61: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-rain.svg',
                63: '/WeatherApp/resources/weatherIcons/partly-cloudy-night.svg',
                65: '/WeatherApp/resources/weatherIcons/rain.svg',
                66: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-sleet.svg',
                67: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-sleet.svg',
                71: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-snow.svg',
                73: '/WeatherApp/resources/weatherIcons/snow.svg',
                75: '/WeatherApp/resources/weatherIcons/snow.svg',
                77: '/WeatherApp/resources/weatherIcons/snow.svg',
                80: '/WeatherApp/resources/weatherIcons/drizzle.svg',
                81: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-rain.svg',
                82: '/WeatherApp/resources/weatherIcons/rain.svg',
                85: '/WeatherApp/resources/weatherIcons/partly-cloudy-night-snow.svg',
                86: '/WeatherApp/resources/weatherIcons/snow.svg',
                95: '/WeatherApp/resources/weatherIcons/thunderstorms-night-snow.svg',
                96: '/WeatherApp/resources/weatherIcons/thunderstorms-night-snow.svg',
                99: '/WeatherApp/resources/weatherIcons/thunderstorms-snow.svg',
                default: '/WeatherApp/resources/weatherIcons/not-available.svg'
            }
        };
    },

    methods: {
        createNewSvg() {
            let svgWrapper = document.querySelector('#svgWrapper');
            while (svgWrapper.firstChild) {
                svgWrapper.removeChild(svgWrapper.firstChild);
              }
              let svgElement = svg.createDiagram(this.weather);
              svgWrapper.appendChild(svgElement);
        },
        scroll(scrollRight = false) {
            let element = document.querySelector('.weatherDeck');
            let scroll;
            if(scrollRight){
                scroll = element.scrollLeft + element.scrollWidth / this.divider;
            }
            else{
                scroll = element.scrollLeft - element.scrollWidth / this.divider;
            }
            element.scrollTo({
                top: 0,
                left: scroll,
                behavior: "smooth",
            });

            this.hasScrolledRight = true;
        },
        handleScroll() {
            const scrollContainer = this.$refs.scrollContainer;
            const isEndOfScroll = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 120;
            const isStartOfScroll = scrollContainer.scrollLeft <= 120;

            this.showRightScroll = !isEndOfScroll;
            this.showLeftScroll = !isStartOfScroll;
        },
        scrollTo(dateId) {
            this.selectOption('hourly');
            const element = document.getElementById(dateId);
            this.showLeftScroll = false
            element.scrollIntoView({ behavior: "smooth" });
        },
        getDayName(date) {
            const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return dayNames[new Date(date).getDay()];
        },
        getMonthName(date) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let day = date.substr(date.length - 2);
            let dayNumber = parseInt(day);
            let suffix = 'th';

            if (dayNumber < 10) {
                day = day.substr(1);
            }
            if (dayNumber === 1 || dayNumber === 21 || dayNumber === 31) {
                suffix = 'st';
            }
            else if (dayNumber === 2 || dayNumber === 22) {
                suffix = 'nd';
            }
            else if (dayNumber === 3 || dayNumber === 23) {
                suffix = 'rd';
            }
            return day + suffix + ' of ' + monthNames[new Date(date).getMonth()];
        },
        getWeatherIcons(weatherCode, time = null) {
            if (time) {
                let dummydate = '2000-01-01 '
                let startOfNight = Date.parse(dummydate + time) >= Date.parse(dummydate + "19:00");
                let endOfNight = Date.parse(dummydate + time) <= Date.parse(dummydate + "06:00");
                if (startOfNight || endOfNight) {
                    return this.weatherNightIcons[weatherCode];
                }
            }
            return this.weatherDayIcons[weatherCode];
        },
        fetchData() {
            const geocodingParams = new URLSearchParams({
                'name': this.searchLocation,
                'count': '10',
                'language': 'en',
                'format': 'json'
            });
            api.fetchLocationInfo(this.searchLocation).then(locationData => {
                this.location = locationData[0].name;
                this.country = locationData[0].country;
                document.querySelector('.showLocation').classList.remove('hidden');

                api.fetchData(
                    locationData[0].latitude, locationData[0].longitude
                ).then(weatherData => {
                    this.weather = weatherData;
                    this.hasData = true;
                    let option = this.selectedOption === 1 ? 'hourly' :  this.selectedOption === 2 ? 'two-weeks' : 3;
                    this.selectOption(option)
                    this.createNewSvg();
                });
            });

            localStorage.setItem('lastSearchedLocation', this.searchLocation);
            this.searchLocation = '';
            this.updateHeartIcon();
        },

        selectOption(option) {
            let dailyContainer = document.querySelector('.weatherDeck');
            let hourlyPresentation = document.querySelector('#hourlyPresentation');
            let svgWrapper = document.querySelector('#svgWrapper');
            dailyContainer.scrollLeft = 0;
            if (option === 'hourly') {
                this.selectedOption = 1;
                dailyContainer.classList.add('hidden');
                svgWrapper.classList.add('hidden');
                hourlyPresentation.classList.remove('hidden');
            }
            else if (option === 'two-weeks'){
                this.selectedOption = 2;
                hourlyPresentation.classList.add('hidden');
                svgWrapper.classList.add('hidden');
                dailyContainer.classList.remove('hidden');
                this.showRightScroll = true;
                this.divider = 4;
            }
            else {
                this.selectedOption = 3;
                dailyContainer.classList.add('hidden');
                hourlyPresentation.classList.add('hidden');
                svgWrapper.classList.remove('hidden');

            }
        },
        weatherOneDay(date) {
            if (this.hasData) {
                let daily = [];
                for (let i = 0; i < this.weather.hourly.length; i++) {
                    let dateTime = this.weather.hourly[i].time.split('T');
                    let selectedDate = Date.parse(dateTime[0]) === Date.parse(date);
                    let notPassedHours = Date.now() <= Date.parse(this.weather.hourly[i].time);
                    if (selectedDate && notPassedHours) {
                        daily.push(Object.assign({}, this.weather.hourly[i]))
                        daily[daily.length - 1].time = dateTime[1]
                    }
                    else if (Date.parse(dateTime[0]) > Date.parse(date)) {
                        break;
                    }
                }
                return daily;
            }
        },
        getAvailableDates() {
            if (this.hasData) {
                let dates = this.weather.hourly.map(date => date.time.split('T')[0]);
                dates = dates.filter((date, index, array) => array.indexOf(date) === index);
                return dates;
            }
        },

        retrieveFromLocalStorage(){
            const locations = localStorage.getItem('location');
            if (locations) {
                try {
                    const parsedLocations = JSON.parse(locations);
                    // Ensure parsedLocations is an array before assigning it
                    if (Array.isArray(parsedLocations)) {
                        this.storedLocations = parsedLocations;
                    } else {
                        // If parsedLocations is not an array, handle it accordingly
                        console.error('Retrieved data is not an array:', parsedLocations);
                    }
                } catch (error) {
                    console.error('Error parsing retrieved data:', error);
                }
            }
        },
        modifyLocalStorage(){
            let alreadySavedLocation = false;
            for (let i = 0; i < this.storedLocations.length; i++){
                if (this.searchLocation == this.storedLocations[i]){
                    alreadySavedLocation = true;
                    this.storedLocations.splice(i, 1);
                    break;
                }
            }
            if(!alreadySavedLocation && this.searchLocation){
                this.storedLocations.push(this.searchLocation);
            }
            localStorage.setItem('location', JSON.stringify(this.storedLocations));
            
            this.updateHeartIcon();
        },
        updateHeartIcon(){
            for (let i = 0; i < this.storedLocations.length; i++){
                if(this.searchLocation == this.storedLocations[i]){
                    this.heartIcon = this.heartFilled
                    break;
                }
                else{
                    this.heartIcon = this.heartEmpty;
                }
            }
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
        this.retrieveFromLocalStorage();
    }

}).mount('#app');
