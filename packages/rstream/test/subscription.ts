import * as tx from "@thi.ng/transducers";
import * as assert from "assert";

import * as rs from "../src/index";

describe("Subscription", () => {
    let src: rs.Stream<number>;

    beforeEach(() => {
    });

    it("new sub receives last", (done) => {
        let buf = [];
        src = rs.fromIterable([1, 2, 3], 10);
        src.subscribe({ next(x) { buf.push(x); } });
        setTimeout(() =>
            src.subscribe({
                next(x) { buf.push(x); },
                done() {
                    assert.deepEqual(buf, [1, 2, 2, 3, 3]);
                    done();
                }
            }),
            25);
    });

    it("unsub does not trigger Subscription.done()", (done) => {
        let buf = [];
        let called = false;
        src = rs.fromIterable([1, 2, 3], 10);
        const sub = src.subscribe({
            next(x) { buf.push(x); },
            done() { called = true; }
        });
        setTimeout(() => sub.unsubscribe(), 15);
        setTimeout(() => {
            assert.deepEqual(buf, [1]);
            assert.equal(src.getState(), rs.State.DONE);
            assert.equal((<any>src).subs.length, 0);
            assert(!called);
            done();
        }, 30);
    });

    it("no new values after unsub", (done) => {
        let buf = [];
        let called = false;
        src = rs.fromIterable([1, 2, 3], 10);
        const sub = src.subscribe(
            {
                next(x) { buf.push(x); },
                done() { called = true; }
            },
            tx.partition(2, true)
        );
        setTimeout(() => sub.unsubscribe(), 25);
        setTimeout(() => {
            assert.deepEqual(buf, [[1, 2]]);
            assert.equal(src.getState(), rs.State.DONE);
            assert(!called);
            done();
        }, 50);
    });

    it("completing transducer sends all values", (done) => {
        let buf = [];
        src = rs.fromIterable([1, 2, 3], 10);
        src.subscribe(
            {
                next(x) { buf.push(x); },
                done() {
                    assert.deepEqual(buf, [[1, 2], [3]]);
                    assert.equal(src.getState(), rs.State.DONE);
                    done();
                }
            },
            tx.partition(2, true)
        );
    });
});
