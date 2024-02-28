import './assets/main.css'

import { createApp } from 'vue'

createApp({
    methods: {
        calculateBMI() {
            this.bmi = this.weight / (this.height * this.height);
        }
    },
    computed: {
    },
    data() {
        return {
            weight: 80,
            height: 1.80,
            bmi: null
        }
    }
}).mount('#app');