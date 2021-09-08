import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { timeout } from "../src";
import { TIMEOUT } from "./config";

group(
    "Timeout",
    {
        "times out": ({ done, setTimeout }) => {
            let err: any;
            timeout(TIMEOUT).subscribe({
                error(e) {
                    err = e;
                    return true;
                },
            });
            setTimeout(() => {
                assert.ok(err instanceof Error);
                done();
            }, TIMEOUT * 2);
        },

        "times out with error object": ({ done, setTimeout }) => {
            const errorObj = "error object";
            let err: any;
            timeout(TIMEOUT, { error: errorObj }).subscribe({
                error(e) {
                    err = e;
                    return true;
                },
            });
            setTimeout(() => {
                assert.strictEqual(err, errorObj);
                done();
            }, TIMEOUT * 2);
        },

        "cancels timeout in cleanup()": ({ done, setTimeout }) => {
            let called = false;
            timeout(TIMEOUT)
                .subscribe({
                    error() {
                        called = true;
                        return true;
                    },
                })
                .unsubscribe();

            setTimeout(() => {
                assert.ok(!called);
                done();
            }, TIMEOUT * 2);
        },

        "resets timeout when value received": ({ done, setTimeout }) => {
            const buf: any[] = [];
            let res: any[] | undefined;
            const t = timeout(TIMEOUT, { reset: true });
            t.subscribe({
                next(x) {
                    buf.push(x);
                },
                error() {
                    res === undefined && (res = [...buf]);
                    return true;
                },
            });

            setTimeout(() => t.next(1), TIMEOUT * 0.7);
            setTimeout(() => t.next(2), TIMEOUT * 1.5);
            setTimeout(() => t.next(3), TIMEOUT * 2.9);
            setTimeout(() => {
                assert.deepStrictEqual(res, [1, 2]);
                assert.deepStrictEqual(buf, [1, 2, 3]);
                done();
            }, TIMEOUT * 3.5);
        },
    },
    {
        maxTrials: 3,
        timeOut: TIMEOUT * 4,
    }
);
