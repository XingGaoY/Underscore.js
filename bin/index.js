"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upperscore_1 = require("./lib/upperscore");
var array = new Array(10);
for (var i = 0; i < 10; i++) {
    array[i] = i;
}
var sum = upperscore_1.usReduceArray([1, 2, 3], function (acc, cur) {
    return acc + cur;
}, 0);
console.log(sum);
//us_each_obj(object, console.log);
