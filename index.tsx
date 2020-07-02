import {usEachArray, usMapArray} from './lib/upperscore'
const {performance} = require('perf_hooks');

let array:Array<number> = new Array(1000);
for(let i = 0; i < 1000; i++){
    array[i] = Math.random();
}

let power2 = usMapArray(array, (element: number) => element*element);

console.log(power2);

//us_each_obj(object, console.log);