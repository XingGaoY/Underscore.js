import { assert } from 'chai';
import { describe, it } from 'mocha';
import {
  each,
  map,
  reduce,
  findIndex,
  findLastIndex,
  find,
  filter,
  where,
  every,
} from '../lib/upperscore';

describe('Module Collections: ', () => {
  describe('each: ', () => {
    it('Each iterator provide value and index', () => {
      each([1, 2, 3], (num: number, i: number) => {
        assert.strictEqual(num, i + 1);
      });
    });

    it('Context object property accessed', () => {
      const answers: number[] = [];
      each([1, 2, 3], function (this: {multiplier: 0}, num: number) {
        answers.push(num * this.multiplier);
      }, { multiplier: 5 });
      assert.deepEqual(answers, [5, 10, 15]);
    });

    it('Iterate simple array', () => {
      const answers: number[] = [];
      each([1, 2, 3], (num: number) => {
        answers.push(num);
      });
      assert.deepEqual(answers, [1, 2, 3]);
    });

    it('Able to reference original array in function', () => {
      let answer: boolean = false;
      each([1, 2, 3], (num: number, idx: number, arr: number[]) => {
        if (num in arr) { answer = true; }
      });
      assert.ok(answer);
    });

    it('Iterating over object', () => {
      const answers: number[] = [];
      const obj = { one: 1, two: 2, three: 3 };
      each(obj, (value: number) => answers.push(value));
      assert.deepEqual(answers, [1, 2, 3]);
    });
  });

  describe('map: ', () => {
    it('Double a simple array', () => {
      const answers = map([1, 2, 3], (element: number) => element * 2);
      assert.deepEqual(answers, [2, 4, 6]);
    });

    it('Triple simple array with multiplier in context', () => {
      const answers = map([1, 2, 3], function (this: {multiplier: 0}, num: number) {
        return num * this.multiplier;
      }, { multiplier: 3 });
      assert.deepEqual(answers, [3, 6, 9]);
    });

    const obj = { 0: { id: '1' }, 1: { id: '2' } };
    it('Map on arrayLikes', () => {
      const ids = map(obj, (n: { id: string; }) => n.id);
      assert.deepEqual(ids, ['1', '2']);
    });

    const people = [{ name: 'moe', age: 30 }, { name: 'curly', age: 50 }];
    function gatherNames(element: { [x: string]: string | number; }) {
      return element.name;
    }

    it('Gather property with name offered', () => {
      assert.deepEqual(map(people, gatherNames), ['moe', 'curly']);
    });
  });

  describe('reduce: ', () => {
    it('Sum simple array with init value 0', () => {
      const sum: number = reduce([1, 2, 3], (memo: number, num: number) => memo + num, 0);
      assert.deepEqual(sum, 6);
    });

    it('Sum simple array with init value', () => {
      const sum: number = reduce([1, 2, 3], (memo: number, num: number) => memo + num, 10);
      assert.deepEqual(sum, 16);
    });

    it('Sum with default init value', () => {
      const sum: number = reduce([1, 2, 3], (memo: number, num: number) => memo + num);
      assert.deepEqual(sum, 6);
    });

    it('Convert 2d array to 1d', () => {
      const array1D: number[] = reduce([[0, 1], [2, 3], [4, 5]],
        (memo: number[], cur: number[]) => memo.concat(cur));
      assert.deepEqual(array1D, [0, 1, 2, 3, 4, 5]);
    });

    it('Calculate number of occurence in array', () => {
      const array: string[] = ['1', '2', '3', '3', '2', '3'];
      const countedOccurence: {[key: string]:number} = reduce(array,
        (memo: {[key: string]:number}, cur: string) => {
          if (cur in memo) {
            memo[cur]++;
          } else {
            memo[cur] = 1;
          }

          return memo;
        }, {});
      assert.deepEqual(countedOccurence, { 1: 1, 2: 2, 3: 3 });
    });
  });

  describe('findIndex', () => {
    function isPrime(element: number) {
      let start = 2;
      while (start <= Math.sqrt(element)) {
        if (element % start++ < 1) {
          return false;
        }
      }
      return element > 1;
    }

    const arrayPrime: number[] = [4, 6, 9, 7, 4, 11, 4];
    const arrayNoPrime: number[] = [4, 6, 8];

    it('FindIndex first prime', () => {
      const index = findIndex(arrayPrime, isPrime);
      assert.deepEqual(index, 3);
    });

    it('FindLastIndex of prime', () => {
      const index = findLastIndex(arrayPrime, isPrime);
      assert.deepEqual(index, 5);
    });

    it('FindIndex no prime', () => {
      const index = findIndex(arrayNoPrime, isPrime);
      assert.deepEqual(index, -1);
    });

    it('Find prime', () => {
      const primeNumber = find(arrayPrime, isPrime);
      assert.deepEqual(primeNumber, 7);
    });

    it('Find no prime', () => {
      const primeNumber = find([4, 6, 8], isPrime);
      assert.deepEqual(primeNumber, undefined);
    });

    it('Find in object', () => {
      const list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }, { a: 2, b: 4 }];
      function findObj(element: {[x: string]: number}) {
        if (element.a === 1) return true;
        return false;
      }
      assert.deepEqual(find(list, findObj), { a: 1, b: 2 });
    });
  });

  describe('Filter', () => {
    it('Filter smaller value', () => {
      const array = [12, 5, 8, 130, 44];
      const filtered = filter(array, (element: number) => element >= 10);
      assert.deepEqual(filtered, [12, 130, 44]);
    });

    it('Filter array with query', () => {
      const array = ['apple', 'banana', 'grapes', 'mango', 'orange'];

      function filterArray(query: String) {
        return filter(array,
          (element: String) => element.toLowerCase().indexOf(query.toLowerCase()) > -1);
      }

      assert.deepEqual(filterArray('ap'), ['apple', 'grapes']);
    });

    it('Filter elements with propertys given value', () => {
      const list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
      const targetList = [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
      assert.deepEqual(filter(list, (element: {[x: string]: number}) => element.a === 1),
        targetList);
    });
  });

  describe('where', () => {
    const list = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }];
    it('Find array with all values matches given KV', () => {
      const result = where(list, { a: 1 });
      assert.deepEqual(result, [{ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 1, b: 4 }]);
      assert.deepEqual(where(list, { a: 5 }), []);
    });
  });

  describe('Every', () => {
    const arraySmall = [12, 5, 8, 11];
    const arrayBig = [11, 12, 13];
    it('Filter smaller value', () => {
      assert.notOk(every(arraySmall, (element: number) => element >= 10));
      assert.ok(every(arrayBig, (element: number) => element >= 10));
    });

    it('Filter smaller value with this', () => {
      assert.notOk(every(arraySmall, function (this: {guard: 0}, element: number) {
        return element >= this.guard;
      }, { guard: 10 }));
      assert.ok(every(arrayBig, function (this: {guard: 0}, element: number) {
        return element >= this.guard;
      }, { guard: 10 }));
    });
  });
});
