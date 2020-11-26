import * as assert from "assert";
import {
    fromIterable,
    fromPromise,
    resolve,
    State,
    Subscription,
} from "../src/index";
import { TIMEOUT } from "./config";

describe("fromPromise()", function () {
    this.retries(3);

    it("resolves to sub", (done) => {
        let src = fromPromise(Promise.resolve(23));
        let called = false;
        src.subscribe({
            next(x) {
                assert.strictEqual(x, 23);
                called = true;
            },
            done() {
                assert(called, "not called next()");
                done();
            },
        });
    });

    it("rejects to sub", (done) => {
        let src = fromPromise(Promise.reject(23));
        let called = false;
        let sub: Subscription<never, never> = src.subscribe({
            next(_) {
                assert.fail("called next()");
            },
            done() {
                assert.fail("called done()");
            },
            error(x) {
                assert.strictEqual(x, 23);
                assert.strictEqual(src.getState(), State.ERROR);
                assert.strictEqual(sub.getState(), State.ERROR);
                called = true;
            },
        });
        setTimeout(() => {
            assert(called, "not called");
            done();
        }, TIMEOUT);
    });

    it("passes error to sub", (done) => {
        let src = fromPromise(
            new Promise(() => {
                throw new Error("foo");
            })
        );
        let called = false;
        let sub: Subscription<any, any> = src.subscribe({
            next(_) {
                assert.fail("called next()");
            },
            done() {
                assert.fail("called done()");
            },
            error(x) {
                assert.strictEqual(x.message, "foo");
                assert.strictEqual(src.getState(), State.ERROR);
                assert.strictEqual(sub.getState(), State.ERROR);
                called = true;
            },
        });
        setTimeout(() => {
            assert(called, "not called");
            // TODO remove, next() doesn't throw error anymore if already in done or error state
            // assert.throws(() => src.next(Promise.resolve()), "no next() allowed");
            src.done();
            assert.strictEqual(src.getState(), State.ERROR, "src not ERROR");
            done();
        }, TIMEOUT);
    });

    it("resolves via Resolver", (done) => {
        let src = fromIterable([Promise.resolve(23)]);
        let called = false;
        src.subscribe(resolve()).subscribe({
            next(x) {
                assert.strictEqual(x, 23);
                called = true;
            },
            done() {
                assert(called, "not called");
                done();
            },
        });
    });
});
