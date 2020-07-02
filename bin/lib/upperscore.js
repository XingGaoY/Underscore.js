"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usReduceArray = exports.usMapArray = exports.usEachArray = void 0;
function usEachArray(obj, func, thisArg) {
    var T = thisArg;
    // Good things here is ts is definitely typed and a lot type checking is done in compile time
    // JS polyfill has type check, more rubust
    // Notice it did not use `typeof thisArg !== undefined`, but length of args
    for (var i = 0; i < obj.length; i++) {
        func.call(T, obj[i], i, obj);
    }
    return obj;
}
exports.usEachArray = usEachArray;
;
function usMapArray(obj, func, thisArg) {
    var ret = new Array(obj.length), T = thisArg;
    for (var i = 0; i < obj.length; i++) {
        var modified = func.call(T, obj[i], i, obj);
        ret[i] = modified;
    }
    return ret;
}
exports.usMapArray = usMapArray;
;
function usReduceArray(obj, func, initialValue) {
    var memo;
    if (initialValue) {
        memo = initialValue;
    }
    else if (obj.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value.");
    }
    else {
        memo = obj[0];
    }
    for (var i = 1; i < obj.length; i++) {
        memo = func(memo, obj[i], i, obj);
    }
    return memo;
}
exports.usReduceArray = usReduceArray;
/*
export function us_each_obj<T extends object, U extends keyof T>(obj: T, func: Function): object {
    let _keys: U = Object.keys(obj);
    for(let i = 0; i < _keys.length; i++){
        func(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}*/ 
