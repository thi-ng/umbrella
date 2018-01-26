import * as assert from "assert";

import * as rs from "../src/index";

describe("fromPromise()", () => {

    it("resolves to sub", (done) => {
        let src = rs.fromPromise(Promise.resolve(23)),
            called = false;
        src.subscribe({
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

    it("rejects to sub", (done) => {
        let src = rs.fromPromise(Promise.reject(23)),
            called = false,
            calledDone = false,
            sub = src.subscribe({
                error(x) {
                    assert.equal(x, 23);
                    assert.equal(src.getState(), rs.State.ERROR);
                    assert.equal(sub.getState(), rs.State.ERROR);
                    called = true;
                },
                done() {
                    calledDone = true;
                }
            });
        setTimeout(() => {
            assert(called, "not called");
            assert(!calledDone, "called done");
            done();
        }, 10);
    });

    it("passes error to sub", (done) => {
        let src = rs.fromPromise(new Promise(() => { throw new Error("foo"); })),
            called = false,
            calledDone = false,
            sub = src.subscribe({
                error(x) {
                    assert.equal(x.message, "foo");
                    assert.equal(src.getState(), rs.State.ERROR);
                    assert.equal(sub.getState(), rs.State.ERROR);
                    called = true;
                },
                done() {
                    calledDone = true;
                }
            });
        setTimeout(() => {
            assert(called, "not called");
            assert(!calledDone, "called done");
            done();
        }, 10);
    });

    it("goes into ERROR state", (done) => {
        let src = rs.fromPromise(new Promise(() => { throw new Error("foo"); })),
            calledDone = false,
            sub = src.subscribe({
                done() {
                    calledDone = true;
                }
            });
        setTimeout(() => {
            assert.equal(src.getState(), rs.State.ERROR, "src not ERROR");
            assert.equal(sub.getState(), rs.State.ERROR, "sub not ERROR");
            assert(!calledDone, "called done");
            assert.throws(() => src.next(Promise.resolve()), "no next() allowed");
            src.done();
            assert.equal(src.getState(), rs.State.ERROR, "src not ERROR");
            done();
        }, 0);
    });

    it("resolves via Resolver", (done) => {
        let src = rs.fromIterable([Promise.resolve(23)]),
            called = false;
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
