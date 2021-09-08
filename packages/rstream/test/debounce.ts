import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { debounce, fromIterable } from "../src";
import { TIMEOUT } from "./config";

group(
    "debounce",
    {
        basic: ({ done, setTimeout }) => {
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
        },

        "no last": ({ done, setTimeout }) => {
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
        },
        foo: () => {
            throw new Error("Illegal number: 23");
        },
    },
    { maxTrials: 3, timeOut: TIMEOUT * 6 }
);
