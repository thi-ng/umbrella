import { partition } from "@thi.ng/transducers";
import * as assert from "assert";
import { fromIterable, State, Stream } from "../src/index";
import { TIMEOUT } from "./config";

describe("Subscription", () => {
    let src: Stream<number>;

    beforeEach(() => {});

    it("new sub receives last", function(done) {
        this.timeout(TIMEOUT * 5);
        let buf: any[] = [];
        src = fromIterable([1, 2, 3], { delay: TIMEOUT });
        src.subscribe({
            next(x) {
                buf.push(x);
            }
        });
        setTimeout(
            () =>
                src.subscribe({
                    next(x) {
                        buf.push(x);
                    },
                    done() {
                        assert.deepEqual(buf, [1, 2, 2, 3, 3]);
                        done();
                    }
                }),
            TIMEOUT * 2.5
        );
    });

    it("unsub does not trigger Subscription.done()", function(done) {
        this.timeout(TIMEOUT * 5);
        let buf: any[] = [];
        let called = false;
        src = fromIterable([1, 2, 3], { delay: TIMEOUT });
        const sub = src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                called = true;
            }
        });
        setTimeout(() => sub.unsubscribe(), TIMEOUT * 1.5);
        setTimeout(() => {
            assert.deepEqual(buf, [1]);
            assert.equal(src.getState(), State.DONE);
            assert.equal((<any>src).subs.length, 0);
            assert(!called);
            done();
        }, TIMEOUT * 4);
    });

    it("no new values after unsub", function(done) {
        this.timeout(TIMEOUT * 5);

        let buf: any[] = [];
        let called = false;
        src = fromIterable([1, 2, 3], { delay: TIMEOUT });
        const sub = src.subscribe(
            {
                next(x) {
                    buf.push(x);
                },
                done() {
                    called = true;
                }
            },
            partition(2, true)
        );
        setTimeout(() => sub.unsubscribe(), TIMEOUT * 2.5);
        setTimeout(() => {
            assert.deepEqual(buf, [[1, 2]]);
            assert.equal(src.getState(), State.DONE);
            assert(!called);
            done();
        }, TIMEOUT * 4);
    });

    it("completing transducer sends all values", (done) => {
        let buf: any[] = [];
        src = fromIterable([1, 2, 3], { delay: 10 });
        src.subscribe(
            {
                next(x) {
                    buf.push(x);
                },
                done() {
                    assert.deepEqual(buf, [[1, 2], [3]]);
                    assert.equal(src.getState(), State.DONE);
                    done();
                }
            },
            partition(2, true)
        );
    });
});
