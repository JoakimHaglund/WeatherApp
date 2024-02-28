
Vue.createApp({
    methods: {
        fetchData() {
            const params = new URLSearchParams({
                'name': this.location,
                'count': '1',
                'language': 'en',
                'format': 'json'
            });

            const url = 'https://geocoding-api.open-meteo.com/v1/search?' + params.toString();

            fetch(url, {
                method: 'GET'
            })
                .then(response => {
                    response.json().then(res => {
                        console.log(res.results[0].latitude + ' ' +  res.results[0].longitude); 
                        console.log(res);
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        }
    },
    computed: {
    }
  
}).mount('#app');

// async function start() {
//     let response = await fetch(
//         'https://api.open-meteo.com/v1/forecast' +
//         '?latitude=57.721104651297615' +
//         '&longitude=11.976178043983431' +
//         '&current=temperature_2m'
//     );
//     let json = await response.json();

//     let temperature = json.current.temperature_2m;
//     let p = document.querySelector('p');
//     p.textContent = 'Current temperature in Gothenburg: ' + temperature;
// }

// start();