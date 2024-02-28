"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./assets/main.css");
var vue_1 = require("vue");
(0, vue_1.createApp)({
    methods: {
        calculateBMI: function () {
            this.bmi = this.weight / (this.height * this.height);
        }
    },
    computed: {},
    data: function () {
        return {
            weight: 80,
            height: 1.80,
            bmi: null
        };
    }
}).mount('#app');
