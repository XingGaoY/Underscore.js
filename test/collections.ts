import { assert } from 'chai';
import { describe, it } from 'mocha';
import {
  each,
  mapArray,
  reduceArray,
  findIndexArray,
  findLastIndexArray,
  find,
  filter,
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
      each(obj, (value: number, key: string) => answers.push(value));
      assert.deepEqual(answers, [1, 2, 3]);
    });
  });

  describe('mapArray: ', () => {
    it('Double a simple array', () => {
      const answers: number[] = mapArray([1, 2, 3], (element: number) => element * 2);
      assert.deepEqual(answers, [2, 4, 6]);
    });

    it('Triple simple array with multiplier in context', () => {
      const answers: number[] = mapArray([1, 2, 3], function (this: {multiplier: 0}, num: number) {
        return num * this.multiplier;
      }, { multiplier: 3 });
      assert.deepEqual(answers, [3, 6, 9]);
    });
  });

  describe('reduceArray: ', () => {
    it('Sum simple array with init value 0', () => {
      const sum: number = reduceArray([1, 2, 3], (memo: number, num: number) => memo + num, 0);
      assert.deepEqual(sum, 6);
    });

    it('Sum simple array with init value', () => {
      const sum: number = reduceArray([1, 2, 3], (memo: number, num: number) => memo + num, 10);
      assert.deepEqual(sum, 16);
    });

    it('Sum with default init value', () => {
      const sum: number = reduceArray([1, 2, 3], (memo: number, num: number) => memo + num);
      assert.deepEqual(sum, 6);
    });

    it('Convert 2d array to 1d', () => {
      const array1D: number[] = reduceArray([[0, 1], [2, 3], [4, 5]],
        (memo: number[], cur: number[]) => memo.concat(cur));
      assert.deepEqual(array1D, [0, 1, 2, 3, 4, 5]);
    });

    it('Calculate number of occurence in array', () => {
      const array: string[] = ['1', '2', '3', '3', '2', '3'];
      const countedOccurence: {[key: string]:number} = reduceArray(array,
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

  describe('findIndexArray', () => {
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
      const index = findIndexArray(arrayPrime, isPrime);
      assert.deepEqual(index, 3);
    });

    it('FindLastIndex of prime', () => {
      const index = findLastIndexArray(arrayPrime, isPrime);
      assert.deepEqual(index, 5);
    });

    it('FindIndex no prime', () => {
      const index = findIndexArray(arrayNoPrime, isPrime);
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
        return filter(array, (element: String) => element.toLowerCase().indexOf(query.toLowerCase()) > -1);
      }

      assert.deepEqual(filterArray('ap'), ['apple', 'grapes']);
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
