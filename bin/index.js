"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upperscore_1 = require("./lib/upperscore");
var array = new Array(10);
for (var i = 0; i < 10; i++) {
    array[i] = i;
}
var sum = upperscore_1.reduce([1, 2, 3], function (acc, cur) {
    return acc + cur;
}, 0);
var idx = array.findIndex(function (element) { return element > 5; });
var usidx = upperscore_1.findIndexArray(array, function (element) { return element > 5; });
console.log(idx);
console.log(usidx);
//us_each_obj(object, console.log);
