import { assert } from 'chai';
import { describe, it } from 'mocha';
import {
  eachArray, mapArray, reduceArray, findIndexArray,
} from '../lib/upperscore';

describe('Module Collections: ', () => {
  describe('eachArray: ', () => {
    it('Each iterator provide value and index', () => {
      eachArray([1, 2, 3], (num: number, i: number) => {
        assert.strictEqual(num, i + 1);
      });
    });

    it('Context object property accessed', () => {
      const answers: number[] = [];
      eachArray([1, 2, 3], function (this: {multiplier: 0}, num: number) {
        answers.push(num * this.multiplier);
      }, { multiplier: 5 });
      assert.deepEqual(answers, [5, 10, 15]);
    });

    it('Iterate simple array', () => {
      const answers: number[] = [];
      eachArray([1, 2, 3], (num: number) => {
        answers.push(num);
      });
      assert.deepEqual(answers, [1, 2, 3]);
    });

    it('Able to reference original array in function', () => {
      let answer: boolean = false;
      eachArray([1, 2, 3], (num: number, idx: number, arr: number[]) => {
        if (num in arr) { answer = true; }
      });
      assert.ok(answer);
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
    it('Find first prime', () => {
      function isPrime(element: number) {
        let start = 2;
        while (start <= Math.sqrt(element)) {
          if (element % start++ < 1) {
            return false;
          }
        }
        return element > 1;
      }

      const index = findIndexArray([4, 6, 8, 9, 11], isPrime);
      assert.deepEqual(index, 4);
    });
  });
});
