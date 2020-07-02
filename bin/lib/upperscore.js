"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usEachArray = void 0;
function usEachArray(obj, func) {
    var len = obj.length >>> 0;
    console.log(len);
    for (var i = 0; i < obj.length; i++) {
        func(obj[i], i, obj);
    }
    return obj;
}
exports.usEachArray = usEachArray;
;
/*
export function us_each_obj<T extends object, U extends keyof T>(obj: T, func: Function): object {
    let _keys: U = Object.keys(obj);
    for(let i = 0; i < _keys.length; i++){
        func(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}*/ 
