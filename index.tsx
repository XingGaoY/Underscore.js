import {eachArray, mapArray, reduceArray, findIndexArray} from './lib/upperscore'
import {performance} from 'perf_hooks';

let array:Array<number> = new Array(10);
for(let i = 0; i < 10; i++){
    array[i] = i;
}

let sum = reduceArray([1,2,3], function (acc: number, cur: number) {
    return acc + cur;
}, 0);

let idx = array.findIndex((element) => element > 5);
let usidx = findIndexArray(array, (element: number) => element > 5);

console.log(idx);
console.log(usidx);

//us_each_obj(object, console.log);