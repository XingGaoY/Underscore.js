import {usEachArray, usMapArray} from './lib/upperscore'
const {performance} = require('perf_hooks');

let array:Array<number> = new Array(10);
for(let i = 0; i < 10; i++){
    array[i] = i;
}

let sum = array.reduce(function (acc, cur) {
    return acc + cur;
}, 10);

console.log(sum);

//us_each_obj(object, console.log);