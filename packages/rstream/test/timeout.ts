import * as assert from "assert";
import { timeout } from "../src";
import { TIMEOUT } from "./config";

describe("Timeout", function () {
    this.retries(3);

    it("times out", function (done) {
        this.timeout(TIMEOUT * 3);

        let err: any;
        timeout(TIMEOUT).subscribe({
            error(e) {
                err = e;
                return true;
            },
        });
        setTimeout(() => {
            assert(err instanceof Error);
            done();
        }, TIMEOUT * 2);
    });

    it("times out with error object", function (done) {
        this.timeout(TIMEOUT * 3);

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
    });

    it("cancels timeout in cleanup()", function (done) {
        this.timeout(TIMEOUT * 3);

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
            assert(!called);
            done();
        }, TIMEOUT * 2);
    });

    it("resets timeout when value received", function (done) {
        this.timeout(TIMEOUT * 4);

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
    });
});
