import {usEachArray, usMapArray, usReduceArray} from './lib/upperscore'
import {performance} from 'perf_hooks';

let array:Array<number> = new Array(10);
for(let i = 0; i < 10; i++){
    array[i] = i;
}

let sum = usReduceArray([1,2,3], function (acc: number, cur: number) {
    return acc + cur;
}, 0);

console.log(sum);

//us_each_obj(object, console.log);