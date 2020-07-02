"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var upperscore_1 = require("./lib/upperscore");
var array = [1, 2, 'a'];
var object = {
    name: 'anderson',
    age: 10,
    arr: [1, 2, 'a']
};
upperscore_1.usEachArray(array, console.log);
//us_each_obj(object, console.log);
