import * as assert from "assert";
import { debounce, fromIterable } from "../src/index";
import { TIMEOUT } from "./config";

describe("debounce", function () {
    this.retries(3);

    it("basic", (done) => {
        const acc: number[] = [];
        fromIterable([1, 2, 3], { delay: TIMEOUT })
            .subscribe(debounce(TIMEOUT * 1.5))
            .subscribe({
                next(x) {
                    acc.push(x);
                },
            });
        setTimeout(() => {
            assert.deepStrictEqual(acc, [3]);
            done();
        }, TIMEOUT * 5);
    });

    it("no last", (done) => {
        const acc: number[] = [];
        fromIterable([1, 2, 3], { delay: TIMEOUT })
            .subscribe(debounce(TIMEOUT * 1.5, { emitLast: false }))
            .subscribe({
                next(x) {
                    acc.push(x);
                },
            });
        setTimeout(() => {
            assert.deepStrictEqual(acc, []);
            done();
        }, TIMEOUT * 5);
    });
});
