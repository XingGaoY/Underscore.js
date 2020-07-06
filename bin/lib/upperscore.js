"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLastIndexArray = exports.findIndexArray = exports.map = exports.each = exports.every = exports.filter = exports.find = exports.reduceArray = void 0;
function each(obj, func, thisArg) {
    // Good things here is ts is definitely typed and a lot type checking is done in compile time
    // JS polyfill has type check, more rubust
    // Notice it did not use `typeof thisArg !== undefined`, but length of args
    if (obj.length) {
        for (var i = 0, length_1 = obj.length; i < length_1; i++) {
            func.call(thisArg, obj[i], i, obj);
        }
    }
    else {
        var keys = Object.keys(obj);
        for (var i = 0, length_2 = keys.length; i < length_2; i++) {
            func.call(thisArg, obj[keys[i]], keys[i], obj);
        }
    }
    return obj;
}
exports.each = each;
function map(obj, func, thisArg) {
    var keys = !obj.length && Object.keys(obj);
    var length = (keys || obj).length;
    var ret = new Array(length);
    for (var i = 0; i < length; i++) {
        var currentKey = keys ? keys[i] : i;
        var modified = func.call(thisArg, obj[currentKey], currentKey, obj);
        ret[i] = modified;
    }
    return ret;
}
exports.map = map;
// here return value and initialValue is not type T
// explanation see uniTest: 'Calculate number of occurence in array'
function reduceArray(obj, func, initialValue) {
    var memo;
    var i = 0;
    if (initialValue) {
        memo = initialValue;
    }
    else if (obj.length === 0) {
        throw new TypeError('Reduce of empty array with no initial value.');
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
exports.reduceArray = reduceArray;
function createPredicateIndexFinder(dir) {
    return function (obj, predicate, thisArg) {
        var index = dir === 1 ? 0 : obj.length - 1;
        for (; index >= 0 && index < obj.length; index += dir) {
            var iValue = obj[index];
            if (predicate.call(thisArg, iValue, index, obj)) {
                return index;
            }
        }
        return -1;
    };
}
var findIndexArray = createPredicateIndexFinder(1);
exports.findIndexArray = findIndexArray;
var findLastIndexArray = createPredicateIndexFinder(-1);
exports.findLastIndexArray = findLastIndexArray;
function find(obj, predicate, thisArg) {
    var key = findIndexArray(obj, predicate, thisArg);
    if (key && key !== -1)
        return obj[key];
    return undefined;
}
exports.find = find;
function filter(obj, predicate, thisArg) {
    var results = [];
    each(obj, function (element, index, array) {
        if (predicate(element, index, array))
            results.push(element);
    }, thisArg);
    return results;
}
exports.filter = filter;
function every(obj, cb, thisArg) {
    for (var i = 0; i < obj.length; i++) {
        if (!cb.call(thisArg, obj[i], i, obj))
            return false;
    }
    return true;
}
exports.every = every;
