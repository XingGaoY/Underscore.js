export function usEachArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T>{
    let T = thisArg;
    // Good things here is ts is definitely typed and a lot type checking is done in compile time
    // JS polyfill has type check, more rubust

    // Notice it did not use `typeof thisArg !== undefined`, but length of args

    for(let i = 0; i < obj.length; i++){
        func.call(T, obj[i], i, obj);
    }
    return obj;
};

export function usMapArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T>{
    let ret: Array<T> = new Array(obj.length), T = thisArg;

    for(let i = 0; i < obj.length; i++){
        let modified = func.call(T, obj[i], i, obj);
        ret[i] = modified;
    }

    return ret;
};

export function usReduceArray<T>(obj: Array<T>, func: Function, initialValue?: T){
    let memo;

    if(initialValue) {
        memo = initialValue;
    }
    else if(obj.length === 0){
        throw new TypeError("Reduce of empty array with no initial value.");
    }

    for(let i = 1; i < obj.length; i++){
        memo = func(memo, obj[i], i, obj);
    }

    return memo;
}
/*
export function us_each_obj<T extends object, U extends keyof T>(obj: T, func: Function): object {
    let _keys: U = Object.keys(obj);
    for(let i = 0; i < _keys.length; i++){
        func(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}*/