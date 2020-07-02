export function usEachArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T>{
    let T;
    // Good things here is ts is definitely typed and a lot type checking is done in compile time
    // JS polyfill has type check, more rubust

    // Notice it did not use `typeof thisArg !== undefined`, but length of args
    if(arguments.length > 2) {
        T = thisArg;
    }

    for(let i = 0; i < obj.length; i++){
        func.call(T, obj[i], i, obj);
    }
    return obj;
};

/*
export function us_each_obj<T extends object, U extends keyof T>(obj: T, func: Function): object {
    let _keys: U = Object.keys(obj);
    for(let i = 0; i < _keys.length; i++){
        func(obj[_keys[i]], _keys[i], obj);
    }
    return obj;
}*/