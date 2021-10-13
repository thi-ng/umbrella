import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { fromIterable, fromPromise, ISubscribable, resolve } from "../src/index.js"
import { TIMEOUT } from "./config.js";
import { assertActive } from "./utils.js";

const dummySub = (src: ISubscribable<any>) => {
    const state = { err: undefined, called: false };
    const sub = src.subscribe({
        next(_) {
            assert.fail("called next()");
        },
        done() {
            assert.fail("called done()");
        },
        error(e) {
            state.err = e;
            state.called = true;
            return true;
        },
    });
    return { sub, state };
};

group(
    "fromPromise()",
    {
        "resolves to sub": ({ done }) => {
            let src = fromPromise(Promise.resolve(23));
            let called = false;
            src.subscribe({
                next(x) {
                    assert.strictEqual(x, 23);
                    called = true;
                },
                done() {
                    assert.ok(called, "not called next()");
                    done();
                },
            });
        },

        "rejected promise": ({ done, setTimeout }) => {
            let called1 = false;
            let err: any;
            let src = fromPromise(Promise.reject<number>(23), {
                error: (e) => {
                    err = e;
                    called1 = true;
                    return true;
                },
            });
            const { sub, state } = dummySub(src);
            setTimeout(() => {
                assert.ok(called1, "not called1");
                assert.ok(!state.called, "not called2");
                assert.strictEqual(err, 23);
                assert.strictEqual(state.err, undefined);
                assertActive(src);
                assertActive(sub);
                done();
            }, TIMEOUT);
        },

        "promise w/ error": ({ done, setTimeout }) => {
            let called1 = false;
            let err: any;
            let src = fromPromise(
                new Promise(() => {
                    throw new Error("foo");
                }),
                {
                    error: (e) => {
                        err = e;
                        called1 = true;
                        return true;
                    },
                }
            );
            const { sub, state } = dummySub(src);
            setTimeout(() => {
                assert.ok(called1, "not called1");
                assert.ok(!state.called, "not called2");
                assert.strictEqual(err.message, "foo");
                assert.strictEqual(state.err, undefined);
                assertActive(src);
                assertActive(sub);
                done();
            }, TIMEOUT);
        },

        "resolves via Resolver": ({ done }) => {
            let src = fromIterable([Promise.resolve(23)]);
            let called = false;
            src.subscribe(resolve()).subscribe({
                next(x) {
                    assert.strictEqual(x, 23);
                    called = true;
                },
                done() {
                    assert.ok(called, "not called");
                    done();
                },
            });
        },
    },
    { maxTrials: 3 }
);
