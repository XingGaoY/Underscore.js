import {usEachArray} from './lib/upperscore'

let array = [1, 2, 'a'];
let object = {
    name: 'anderson',
    age: 10,
    arr: [1, 2, 'a']
};

usEachArray(array, console.log);
//us_each_obj(object, console.log);