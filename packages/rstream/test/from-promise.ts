import * as assert from "assert";

import * as rs from "../src/index";

describe("fromPromise()", () => {

    it("resolves to sub", (done) => {
        let src = rs.fromPromise(Promise.resolve(23));
        let called = false;
        src.subscribe({
            next(x) {
                assert.equal(x, 23);
                called = true;
            },
            done() {
                assert(called, "not called next()");
                done();
            }
        });
    });

    it("rejects to sub", (done) => {
        let src = rs.fromPromise(Promise.reject(23));
        let called = false;
        let sub = src.subscribe({
            next(_) {
                assert.fail("called next()");
            },
            done() {
                assert.fail("called done()");
            },
            error(x) {
                assert.equal(x, 23);
                assert.equal(src.getState(), rs.State.ERROR);
                assert.equal(sub.getState(), rs.State.ERROR);
                called = true;
            }
        });
        setTimeout(() => {
            assert(called, "not called");
            done();
        }, 1);
    });

    it("passes error to sub", (done) => {
        let src = rs.fromPromise(new Promise(() => { throw new Error("foo"); }));
        let called = false;
        let sub = src.subscribe({
            next(_) {
                assert.fail("called next()");
            },
            done() {
                assert.fail("called done()");
            },
            error(x) {
                assert.equal(x.message, "foo");
                assert.equal(src.getState(), rs.State.ERROR);
                assert.equal(sub.getState(), rs.State.ERROR);
                called = true;
            }
        });
        setTimeout(() => {
            assert(called, "not called");
            // TODO remove, next() doesn't throw error anymore if already in done or error state
            // assert.throws(() => src.next(Promise.resolve()), "no next() allowed");
            src.done();
            assert.equal(src.getState(), rs.State.ERROR, "src not ERROR");
            done();
        }, 10);
    });

    it("resolves via Resolver", (done) => {
        let src = rs.fromIterable([Promise.resolve(23)]);
        let called = false;
        src.subscribe(rs.resolve())
            .subscribe({
                next(x) {
                    assert.equal(x, 23);
                    called = true;
                },
                done() {
                    assert(called, "not called");
                    done();
                }
            });
    });
});
