import * as assert from "assert";
import { timeout } from "../src";
import { TIMEOUT } from "./config";

describe("Timeout", () => {
    it("times out", function (done) {
        this.timeout(TIMEOUT * 2);

        timeout(TIMEOUT).subscribe({
            error: (e) => {
                assert(e instanceof Error);
                done();
            },
        });
    });

    it("times out with error object", function (done) {
        this.timeout(TIMEOUT * 2);

        const error = "error object";

        timeout(TIMEOUT, { error }).subscribe({
            error: (err) => {
                assert.strictEqual(err, error);
                done();
            },
        });
    });

    it("cancels timeout in cleanup()", function (done) {
        this.timeout(TIMEOUT * 3);

        timeout(TIMEOUT)
            .subscribe({
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
            },
        });

        setTimeout(() => t.next(1), TIMEOUT * 0.7);
        setTimeout(() => t.next(2), TIMEOUT * 1.5);
        setTimeout(() => t.next(3), TIMEOUT * 2.9);
        setTimeout(() => done(), TIMEOUT * 3.5);
    });
});
