interface List<T> {
  [index: number]: T;
  length: number;
}

interface Dictionary<T> {
  [index: string]: T;
}

type Collection<T> = List<T> | Dictionary<T>;
type TypeOfCollection<V> =
  V extends List<infer T> ? T
  : V extends Dictionary<infer T> ? T
  : never;

export { List, Dictionary };

function each<T>(list: List<T>, func: Function, thisArg?: any): List<T>;
function each<T>(obj: Dictionary<T>, func: Function, thisArg?: any): Dictionary<T>;
function each<T>(obj: any, func: Function, thisArg?: any): any {
  // Good things here is ts is definitely typed and a lot type checking is done in compile time
  // JS polyfill has type check, more rubust

  // Notice it did not use `typeof thisArg !== undefined`, but length of args

  if (obj.length) {
    for (let i = 0, { length } = obj; i < length; i++) {
      func.call(thisArg, obj[i], i, obj);
    }
  } else {
    const keys = Object.keys(obj);
    for (let i = 0, { length } = keys; i < length; i++) {
      func.call(thisArg, obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
}

function map<T>(list: List<T>, func: Function, thisArg?: any): any;
function map<T>(obj: Dictionary<T>, func: Function, thisArg?: any): any;
function map<T>(obj: any, func: Function, thisArg?: any): any {
  const keys = !obj.length && Object.keys(obj);
  const { length } = keys || obj;
  const ret: Array<T> = new Array(length);

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    const modified = func.call(thisArg, obj[currentKey], currentKey, obj);
    ret[i] = modified;
  }

  return ret;
}

// here return value and initialValue is not type T
// explanation see uniTest: 'Calculate number of occurence in array'
function reduce<T, TResult>(list: List<T>, func: Function, initialValue?: TResult): TResult;
function reduce<T, TResult>(obj: Dictionary<T>, func: Function, initialValue?: TResult): TResult;
function reduce<T, TResult>(obj: any, func: Function, initialValue?: TResult): TResult {
  const keys = !obj.length && Object.keys(obj);
  const { length } = (keys || obj);
  let i = 0; let
    memo;

  if (initialValue) {
    memo = initialValue;
  } else if (obj.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value.');
  } else {
    memo = obj[0] as any;
    i++;
  }

  for (; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    memo = func(memo, obj[currentKey], currentKey, obj);
  }

  return memo;
}

function findKey<T>(obj: Dictionary<T>, predicate: Function, thisArg?: any): string|undefined {
  const keys = Object.keys(obj);
  let currentKey;
  for (let i = 0, { length } = keys; i < length; i++) {
    currentKey = keys[i];
    if (predicate.call(thisArg, obj[currentKey], currentKey, obj)) {
      return currentKey;
    }
  }
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
const findIndex = createPredicateIndexFinder(1);
const findLastIndex = createPredicateIndexFinder(-1);

function find<T>(list: List<T>, predicate: Function, thisArg?: any): T|undefined;
function find<T>(obj: Dictionary<T>, predicate: Function, thisArg?: any): T|undefined;
function find<T>(obj: any, predicate: Function, thisArg?: any): T|undefined {
  const finder = obj.length ? findIndex : findKey;
  const key = finder(obj, predicate, thisArg);
  if (key !== undefined && key !== -1) return obj[key];
  return undefined;
}

function filter<T extends Collection<any>>(
  obj: T,
  predicate: Function,
  thisArg?: any,
): TypeOfCollection<T>[] {
  const results: TypeOfCollection<T>[] = [];

  each(obj, (element: TypeOfCollection<T>, index: number, array: T) => {
    if (predicate(element, index, array)) results.push(element);
  }, thisArg);

  return results;
}

function isMatch(obj: any, attrs: any): boolean {
  const keys = Object.keys(attrs); const
    { length } = keys;
  if (obj == null) return !length;
  for (let i = 0; i < length; i += 1) {
    const key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
}

function matcher(attrs: any) {
  return function (obj: any) {
    return isMatch(obj, attrs);
  };
}

function where<T, U extends {}>(list: List<T>, properties: U): T[] {
  return filter(list, matcher(properties));
}

export function every<T>(obj: Array<T>, cb: Function, thisArg?: any): boolean {
  for (let i = 0; i < obj.length; i++) {
    if (!cb.call(thisArg, obj[i], i, obj)) return false;
  }

  return true;
}

export {
  each,
  map,
  reduce,
  find,
  findIndex,
  findLastIndex,
  filter,
  where,
};
