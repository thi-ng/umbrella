import * as assert from "assert";
import { CloseMode, DUMMY, fromIterable, metaStream, State } from "../src";
import { TIMEOUT } from "./config";

describe("MetaStream", function () {
    this.retries(3);

    it("basic", (done) => {
        const src = fromIterable([1, 2, 3], { delay: TIMEOUT });
        const meta = metaStream<number, number>((x) =>
            fromIterable([x * 10, x * 20, x * 30], { delay: TIMEOUT >> 2 })
        );
        const sub = src.subscribe(meta);
        const acc: number[] = [];
        const sub2 = sub.subscribe({
            next(x) {
                acc.push(x);
            },
        });
        setTimeout(() => {
            assert.deepStrictEqual(acc, [10, 20, 30, 20, 40, 60, 30, 60, 90]);
            assert.strictEqual(meta.getState(), State.DONE);
            assert.strictEqual(sub.getState(), State.DONE);
            assert.strictEqual(sub2.getState(), State.DONE);
            done();
        }, 5 * TIMEOUT);
    });

    it("closein", (done) => {
        const src = fromIterable([1], { delay: TIMEOUT });
        const meta = metaStream((x) => fromIterable([x]), {
            closeIn: CloseMode.NEVER,
        });
        const sub = src.subscribe(meta);
        const child = sub.subscribe(DUMMY);
        setTimeout(() => {
            assert.strictEqual(src.getState(), State.DONE);
            assert.strictEqual(meta.getState(), State.ACTIVE);
            assert.strictEqual(sub.getState(), State.ACTIVE);
            assert.strictEqual(child.getState(), State.IDLE);
            done();
        }, 3 * TIMEOUT);
    });

    it("closeout", (done) => {
        const src = fromIterable([1], { delay: TIMEOUT });
        const meta = src.subscribe(
            metaStream((x) => fromIterable([x * 10]), {
                closeIn: CloseMode.NEVER,
                closeOut: CloseMode.NEVER,
            })
        );
        const acc: number[] = [];
        const child = meta.subscribe({
            next(x) {
                acc.push(x);
            },
        });
        setTimeout(() => {
            child.unsubscribe();
            assert.strictEqual(src.getState(), State.DONE);
            assert.strictEqual(meta.getState(), State.ACTIVE);
            meta.subscribe({
                next(x) {
                    acc.push(x);
                },
            });
            assert.deepStrictEqual(acc, [10, 10]);
            done();
        }, 3 * TIMEOUT);
    });
});
