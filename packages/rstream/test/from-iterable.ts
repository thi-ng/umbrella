import * as assert from "assert";
import { fromIterable, State, Stream, Subscription } from "../src/index";
import { TIMEOUT } from "./config";

describe("fromIterable()", () => {
    let src: Stream<number>;
    let data = [10, 20, 30];

    beforeEach(() => {
        src = fromIterable(data);
    });

    it("is a stream", () => {
        assert(src instanceof Stream);
        assert(src instanceof Subscription);
    });

    it("has an ID", () => {
        assert(src.id.startsWith("iterable-"));
    });

    it("starts in IDLE state", () => {
        assert.equal(src.getState(), State.IDLE);
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
            },
        });
    });

    it("finishes", (done) => {
        let sub = src.subscribe({
            done() {
                assert.equal(src.getState(), State.DONE, "src not done");
                assert.equal(sub.getState(), State.DONE, "sub not done");
                done();
            },
        });
    });

    it("works with delay", (done) => {
        let buf: any[] = [];
        let t0 = Date.now();
        src = fromIterable(data, { delay: 10 });
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepEqual(buf, data);
                assert(Date.now() - t0 >= (data.length + 1) * 10);
                done();
            },
        });
    });

    it("can be cancelled", function (done) {
        this.timeout(TIMEOUT * 5);
        let buf: any[] = [];
        let doneCalled = false;
        src = fromIterable(data, { delay: TIMEOUT });
        src.subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                doneCalled = true;
            },
        });
        setTimeout(() => src.cancel(), TIMEOUT * 1.5);
        setTimeout(() => {
            assert.deepEqual(buf, [data[0]]);
            assert(!doneCalled);
            done();
        }, TIMEOUT * 4);
    });
});
