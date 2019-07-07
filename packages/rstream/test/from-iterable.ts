import * as assert from "assert";
import * as rs from "../src/index";

describe("fromIterable()", () => {
    let src: rs.Stream<number>;
    let data = [10, 20, 30];

    beforeEach(() => {
        src = rs.fromIterable(data);
    });

    it("is a stream", () => {
        assert(src instanceof rs.Stream);
        assert(src instanceof rs.Subscription);
    });

    it("has an ID", () => {
        assert(src.id.startsWith("iterable-"));
    });

    it("starts in IDLE state", () => {
        assert.equal(src.getState(), rs.State.IDLE);
    });

    it("delivers all values", (done) => {
        let buf: any[] = [];
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, data);
                done();
            }
        });
    });

    it("finishes", (done) => {
        let sub = src.subscribe({
            done() {
                assert.equal(src.getState(), rs.State.DONE, "src not done");
                assert.equal(sub.getState(), rs.State.DONE, "sub not done");
                done();
            }
        });
    });

    it("works with delay", (done) => {
        let buf: any[] = [];
        let t0 = Date.now();
        src = rs.fromIterable(data, 10);
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, data);
                assert(Date.now() - t0 >= (data.length + 1) * 10);
                done();
            }
        });
    });

    it("can be cancelled", (done) => {
        let buf: any[] = [];
        let doneCalled = false;
        src = rs.fromIterable(data, 10);
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                doneCalled = true;
            }
        });
        setTimeout(() => src.cancel(), 15);
        setTimeout(() => {
            assert.deepEqual(buf, [data[0]]);
            assert(!doneCalled);
            done();
        }, 50);
    });
});
