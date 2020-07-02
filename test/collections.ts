import { usEachArray } from '../lib/upperscore';
import { assert } from 'chai';
import { describe } from 'mocha';

describe('Module Collections: ', function(){
    describe('usEachArray: ', function(){
        it("", function() {
            usEachArray([1, 2, 3], function(num: number, i: number) {
            assert.strictEqual(num, i + 1, 'each iterators provide value and iteration count');
            });
        });
    });
});