"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindIndexArray = exports.ReduceArray = exports.MapArray = exports.EachArray = void 0;
function EachArray(obj, func, thisArg) {
    var T = thisArg;
    // Good things here is ts is definitely typed and a lot type checking is done in compile time
    // JS polyfill has type check, more rubust
    // Notice it did not use `typeof thisArg !== undefined`, but length of args
    for (var i = 0; i < obj.length; i++) {
        func.call(T, obj[i], i, obj);
    }
    return obj;
}
exports.EachArray = EachArray;
;
function MapArray(obj, func, thisArg) {
    var ret = new Array(obj.length), T = thisArg;
    for (var i = 0; i < obj.length; i++) {
        var modified = func.call(T, obj[i], i, obj);
        ret[i] = modified;
    }
    return ret;
}
exports.MapArray = MapArray;
;
// here return value and initialValue is not type T
// explanation see uniTest: 'Calculate number of occurence in array'
function ReduceArray(obj, func, initialValue) {
    var memo, i = 0;
    if (initialValue) {
        memo = initialValue;
    }
    else if (obj.length === 0) {
        throw new TypeError("Reduce of empty array with no initial value.");
    }
    else {
        memo = obj[0];
        i++;
    }
    for (; i < obj.length; i++) {
        memo = func(memo, obj[i], i, obj);
    }
    return memo;
}
exports.ReduceArray = ReduceArray;
var FindIndexArray = createPredicateIndexFinder(1);
exports.FindIndexArray = FindIndexArray;
function createPredicateIndexFinder(dir) {
    return function (obj, predicate, thisArg) {
        var index = dir === 1 ? 0 : obj.length - 1;
        for (; index >= 0 && index < obj.length; index += dir) {
            var iValue = obj[index];
            if (predicate.call(thisArg, iValue, index, obj)) {
                return index;
            }
        }
    };
}
/*
export function us_each_obj<T extends object, U extends keyof T>(obj: T, func: Function): object {
    let _keys: U = Object.keys(obj);
    for(let i = 0; i < _keys.length; i++){
        func(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}*/ 
