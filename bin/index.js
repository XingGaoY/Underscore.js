"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upperscore_1 = require("./lib/upperscore");
var performance = require('perf_hooks').performance;
var array = new Array(1000);
for (var i = 0; i < 1000; i++) {
    array[i] = Math.random();
}
var power2 = upperscore_1.usMapArray(array, function (element) { return element * element; });
console.log(power2);
//us_each_obj(object, console.log);
