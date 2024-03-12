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
            selectedOption: 14,
            hasScrolledRight: false,
            showRightScroll: true,
            showLeftScroll: false,
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
            element.scrollTo({
                top: 0,
                left: element.scrollLeft - element.scrollWidth / 4,
                behavior: "smooth",
              });

            this.hasScrolledRight = true;
        },
        scrollRight() {
            //scroll left
            console.log('clicked on Right Scroll!')
            let element = document.querySelector('.container');
            element.scrollTo({
                top: 0,
                left: element.scrollLeft + element.scrollWidth / 4,
                behavior: "smooth",
              });

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
            const isStartOfScroll = scrollContainer.scrollLeft <= 120;

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
        getWeatherIcons(weatherCode){
            switch(weatherCode) {
                case 0:
                    return '/WeatherApp/resources/weatherIcons/useful/clear-day.svg';
                case 1:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day.svg';
                case 2:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day.svg';
                case 3:
                    return '/WeatherApp/resources/weatherIcons/useful/overcast-day.svg';
                case 45:
                    return '/WeatherApp/resources/weatherIcons/useful/fog.svg';
                case 48:
                    return '/WeatherApp/resources/weatherIcons/useful/snow.svg';
                case 51:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-drizzle.svg';
                case 53:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-drizzle.svg';
                case 55:
                    return '/WeatherApp/resources/weatherIcons/useful/drizzle.svg';
                case 56:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-sleet.svg'; 
                case 57:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-sleet.svg'; 
                case 61:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-rain.svg'; 
                case 63:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day.svg';
                case 65:
                    return '/WeatherApp/resources/weatherIcons/useful/rain.svg'; 
                case 66:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-sleet.svg'; // För molniga nätter med måne
                case 67:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-sleet.svg'; // För molniga dagar eller nätter utan sol eller måne
                case 71:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-snow.svg'; // För molniga dagar eller nätter utan sol eller måne
                case 73:
                    return '/WeatherApp/resources/weatherIcons/useful/snow.svg'; // För övercasta dagar eller nätter utan sol eller måne
                case 75:
                    return '/WeatherApp/resources/weatherIcons/useful/snow.svg'; // För övercasta dagar eller nätter utan sol eller måne
                case 77:
                    return '/WeatherApp/resources/weatherIcons/useful/snow.svg';
                case 80:
                    return '/WeatherApp/resources/weatherIcons/useful/drizzle.svg'; // Sökväg för väderkod 20
                case 81:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-rain.svg'; // Sökväg för väderkod 21
                case 82:
                    return '/WeatherApp/resources/weatherIcons/useful/rain.svg'; // Sökväg för väderkod 22
                case 85:
                    return '/WeatherApp/resources/weatherIcons/useful/partly-cloudy-day-snow.svg'; // Sökväg för väderkod 23
                case 86:
                    return '/WeatherApp/resources/weatherIcons/useful/snow.svg'; // Sökväg för väderkod 24
                case 95:
                    return '/WeatherApp/resources/weatherIcons/useful/thunderstorm-day-snow.svg'; // Sökväg för väderkod 25
                case 96:
                    return '/WeatherApp/resources/weatherIcons/useful/thunderstorm-day-snow.svg'; // Sökväg för väderkod 26
                case 99:
                    return '/WeatherApp/resources/weatherIcons/useful/thunderstorms-snow.svg'; // Sökväg för väderkod 27
                default:
                    return '/WeatherApp/resources/weatherIcons/not-available.svg'; // Om ingen matchning hittas
            }
            
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

                
                api.fetchData(
                        locationData[0].latitude, locationData[0].longitude
                    ).then(weatherData => {
                        console.log( 'weatherData')
                    console.log( weatherData)
                    this.weather = weatherData;
                    this.hasData = true;
                    let element = document.querySelector('.container');
                    element.scrollLeft = 0;
                    element.classList.remove('hidden');
                   // this.createNewSvg();
                });
            });


        },
      
        selectOption(option) {
            let dailyContainer = document.querySelector('.container');
            let hourlyPresentation = document.querySelector('#hourlyPresentation');
            dailyContainer.scrollLeft = 0;
            if(option === 'hourly'){
                this.selectedOption = 1;
                dailyContainer.classList.add('hidden');
                hourlyPresentation.classList.remove('hidden');
                
            }
            else if(option === 'week'){
                this.selectedOption = 7;
                dailyContainer.classList.remove('hidden');
                hourlyPresentation.classList.add('hidden');
            }
            else{
                this.selectedOption = 14;
                dailyContainer.classList.remove('hidden');
                hourlyPresentation.classList.add('hidden');
            }
        },
        weatherOneDay(date){
            if (this.hasData){
                let daily = [];
                for(let i = 0; i < this.weather.hourly.length; i++){
                    let dateTime = this.weather.hourly[i].time.split('T');
                    let selectedDate = Date.parse(dateTime[0]) ===  Date.parse(date);
                    let notPassedHours = Date.now() <= Date.parse(this.weather.hourly[i].time);
                    if (selectedDate && notPassedHours){
                        daily.push(Object.assign({}, this.weather.hourly[i]))
                        daily[daily.length - 1].time = dateTime[1]
                    }
                    else if (Date.parse(dateTime[0]) >  Date.parse(date)){
                        break;
                    }
                }
                return daily;
            }
        },
        getAvailableDates(){
            if(this.hasData){
            let dates = this.weather.hourly.map(date => date.time.split('T')[0]);
            dates = dates.filter((date, index, array) => array.indexOf(date) === index);
            return dates;
            }
        }
    },
    computed: {
        filteredForecastData() {
            return this.weather.daily.slice(0, this.selectedOption ); // Filter the forecast data based on the selected option

        },

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

       // this.fetchData();
        // Call the function to create SVG when the component is mounted
        //this.createNewSvg();
    }
}).mount('#app');