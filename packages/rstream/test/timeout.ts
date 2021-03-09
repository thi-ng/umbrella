import * as assert from "assert";
import { timeout } from "../src";
import { TIMEOUT } from "./config";

describe("Timeout", function () {
    this.retries(3);

    it("times out", function (done) {
        this.timeout(TIMEOUT * 2);

        timeout(TIMEOUT).subscribe({
            next() {},
            error: (e) => {
                assert(e instanceof Error);
                done();
                return true;
            },
        });
    });

    it("times out with error object", function (done) {
        this.timeout(TIMEOUT * 2);

        const error = "error object";

        timeout(TIMEOUT, { error }).subscribe({
            next() {},
            error: (err) => {
                assert.strictEqual(err, error);
                done();
                return true;
            },
        });
    });

    it("cancels timeout in cleanup()", function (done) {
        this.timeout(TIMEOUT * 3);

        timeout(TIMEOUT)
            .subscribe({
                next() {},
                error: () => assert.fail("timed out"),
            })
            .unsubscribe();

        setTimeout(() => done(), TIMEOUT * 2);
    });

    it("resets timeout when value received", function (done) {
        this.timeout(TIMEOUT * 4);

        const res: any[] = [];
        const t = timeout(TIMEOUT, { reset: true });
        t.subscribe({
            next: (x) => {
                res.push(x);
            },
            error: () => {
                assert.deepStrictEqual(res, [1, 2]);
                return true;
            },
        });

        setTimeout(() => t.next(1), TIMEOUT * 0.7);
        setTimeout(() => t.next(2), TIMEOUT * 1.5);
        setTimeout(() => t.next(3), TIMEOUT * 2.9);
        setTimeout(() => done(), TIMEOUT * 3.5);
    });
});
