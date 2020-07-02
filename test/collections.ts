import { assert } from 'chai';
import { describe } from 'mocha';
import { usEachArray } from '../lib/upperscore';

describe('Module Collections: ', () => {
  describe('usEachArray: ', () => {
    it('Each iterator provide value and index', () => {
      usEachArray([1, 2, 3], (num: number, i: number) => {
        assert.strictEqual(num, i + 1);
      });
    });

    it('context object property accessed', () => {
      const answers: number[] = [];
      usEachArray([1, 2, 3], function (this: {multiplier: 5}, num: number) {
        answers.push(num * this.multiplier);
      }, { multiplier: 5 });
      assert.deepEqual(answers, [5, 10, 15]);
    });
  });
});
