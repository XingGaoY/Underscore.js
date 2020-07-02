import { assert } from 'chai';
import { describe, it } from 'mocha';
import { usEachArray, usMapArray, usReduceArray } from '../lib/upperscore';

describe('Module Collections: ', () => {
  describe('usEachArray: ', () => {
    it('Each iterator provide value and index', () => {
      usEachArray([1, 2, 3], (num: number, i: number) => {
        assert.strictEqual(num, i + 1);
      });
    });

    it('Context object property accessed', () => {
      const answers: number[] = [];
      usEachArray([1, 2, 3], function (this: {multiplier: 0}, num: number) {
        answers.push(num * this.multiplier);
      }, { multiplier: 5 });
      assert.deepEqual(answers, [5, 10, 15]);
    });

    it('Iterate simple array', () => {
      const answers: number[] = [];
      usEachArray([1, 2, 3], (num: number) => {
        answers.push(num);
      });
      assert.deepEqual(answers, [1, 2, 3]);
    });

    it('Able to reference original array in function', () => {
      let answer: boolean = false;
      usEachArray([1, 2, 3], (num: number, idx: number, arr: number[]) => {
        if(num in arr) { answer = true;}
      });
      assert.ok(answer);
    });
  });

  describe('usMapArray: ', () => {
    it('Double a simple array', () => {
      const answers: number[] = usMapArray([1, 2, 3], (element: number) => element * 2);
      assert.deepEqual(answers, [2, 4, 6]);
    });

    it('Triple simple array with multiplier in context', () => {
      const answers: number[] = usMapArray([1, 2, 3], function (this: {multiplier: 0}, num: number){
        return num * this.multiplier;
      }, {multiplier: 3});
      assert.deepEqual(answers, [3, 6, 9]);
    });
  });

  describe('usReduceArray: ', () => {
    it('Sum simple array with init value 0', () => {
      const sum: number = usReduceArray([1, 2, 3], (memo: number, num: number) => memo + num, 0);
      assert.deepEqual(sum, 6);
    });

    it('Sum simple array with init value', () => {
      const sum: number = usReduceArray([1, 2, 3], (memo: number, num: number) => memo + num, 10);
      assert.deepEqual(sum, 16);
    });

    it('Sum with default init value', () => {
      const sum: number = usReduceArray([1, 2, 3], (memo: number, num: number) => memo + num);
      assert.deepEqual(sum, 6);
    });

    it('Convert 2d array to 1d', () => {
      const array1D: number[] = usReduceArray([[0, 1], [2, 3], [4, 5]], (memo: number[], cur: number[]) => {
        return memo.concat(cur);
      });
      assert.deepEqual(array1D, [0, 1, 2, 3, 4, 5]);
    });

    it('Calculate number of occurence in array', () => {
      const array: string[] = ['1', '2', '3', '3', '2', '3'];
      const countedOccurence: {[key: string]:number} = usReduceArray(array, (memo: {[key: string]:number}, cur: string) => {
        if(cur in memo) {
          memo[cur]++;
        }
        else {
          memo[cur] = 1;
        }

        return memo;
      }, {});
      assert.deepEqual(countedOccurence, { '1': 1, '2': 2, '3': 3 });
    })
  });
});
