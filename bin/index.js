"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var array = new Array(10);
for (var i = 0; i < 10; i++) {
    array[i] = i;
}
var sum = array.reduce(function (acc, cur) {
    return acc + cur;
}, 10);
console.log(sum);
//us_each_obj(object, console.log);
