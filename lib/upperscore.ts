interface List<T> {
  [index: number]: T;
  length: number;
}

interface Dictionary<T> {
  [index: string]: T;
}

export { List, Dictionary };

function each<T>(list: List<T>, func: Function, thisArg?: any): List<T>;
function each<T>(obj: Dictionary<T>, func: Function, thisArg?: any): Dictionary<T>;

function each<T>(obj: any, func: Function, thisArg?: any): any {
  const T = thisArg;
  // Good things here is ts is definitely typed and a lot type checking is done in compile time
  // JS polyfill has type check, more rubust

  // Notice it did not use `typeof thisArg !== undefined`, but length of args

  if (obj.length) {
    for (let i = 0, { length } = obj; i < length; i++) {
      func.call(T, obj[i], i, obj);
    }
  } else {
    const keys = Object.keys(obj);
    for (let i = 0, { length } = keys; i < length; i++) {
      func.call(T, obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
}

export function mapArray<T>(obj: Array<T>, func: Function, thisArg?: any): Array<T> {
  const ret: Array<T> = new Array(obj.length); const
    T = thisArg;

  for (let i = 0; i < obj.length; i++) {
    const modified = func.call(T, obj[i], i, obj);
    ret[i] = modified;
  }

  return ret;
}

// here return value and initialValue is not type T
// explanation see uniTest: 'Calculate number of occurence in array'
export function reduceArray<T, K>(obj: Array<T>, func: Function, initialValue?: K): K {
  let memo: K; let
    i = 0;

  if (initialValue) {
    memo = initialValue;
  } else if (obj.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value.');
  } else {
    memo = obj[0] as any;
    i++;
  }

  for (; i < obj.length; i++) {
    memo = func(memo, obj[i], i, obj);
  }

  return memo;
}

function createPredicateIndexFinder(dir: number): Function {
  return function<T> (obj: Array<T>, predicate: Function, thisArg?: any) {
    let index = dir === 1 ? 0 : obj.length - 1;
    for (; index >= 0 && index < obj.length; index += dir) {
      const iValue = obj[index];
      if (predicate.call(thisArg, iValue, index, obj)) {
        return index;
      }
    }

    return -1;
  };
}
const findIndexArray = createPredicateIndexFinder(1);
const findLastIndexArray = createPredicateIndexFinder(-1);

export function find<T>(obj: Array<T>, predicate: Function, thisArg?: any): T|undefined {
  const key = findIndexArray(obj, predicate, thisArg);
  if (key && key !== -1) return obj[key];
  return undefined;
}

export function filter<T>(obj: Array<T>, predicate: Function, thisArg?: any): Array<T> {
  const results: Array<T> = [];

  each(obj, (element: T, index: number, array: Array<T>) => {
    if (predicate(element, index, array)) results.push(element);
  }, thisArg);

  return results;
}

export function every<T>(obj: Array<T>, cb: Function, thisArg?: any): boolean {
  for (let i = 0; i < obj.length; i++) {
    if (!cb.call(thisArg, obj[i], i, obj)) return false;
  }

  return true;
}

export {
  each,
  findIndexArray,
  findLastIndexArray,
};
