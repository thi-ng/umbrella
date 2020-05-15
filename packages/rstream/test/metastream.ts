import * as assert from "assert";
import { CloseMode, fromIterable, metaStream, State } from "../src/index";
import { TIMEOUT } from "./config";

describe("MetaStream", () => {
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
            assert.deepEqual(acc, [10, 20, 30, 20, 40, 60, 30, 60, 90]);
            assert.equal(meta.getState(), State.DONE);
            assert.equal(sub.getState(), State.DONE);
            assert.equal(sub2.getState(), State.DONE);
            done();
        }, 5 * TIMEOUT);
    });

    it("closein", (done) => {
        const src = fromIterable([1], { delay: TIMEOUT });
        const meta = metaStream((x) => fromIterable([x]), {
            closeIn: CloseMode.NEVER,
        });
        const sub = src.subscribe(meta);
        const child = sub.subscribe({});
        setTimeout(() => {
            assert.equal(src.getState(), State.DONE);
            assert.equal(meta.getState(), State.ACTIVE);
            assert.equal(sub.getState(), State.ACTIVE);
            assert.equal(child.getState(), State.IDLE);
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
            assert.equal(src.getState(), State.DONE);
            assert.equal(meta.getState(), State.ACTIVE);
            meta.subscribe({
                next(x) {
                    acc.push(x);
                },
            });
            assert.deepEqual(acc, [10, 10]);
            done();
        }, 3 * TIMEOUT);
    });
});
