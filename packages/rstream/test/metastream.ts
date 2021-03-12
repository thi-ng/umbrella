import * as assert from "assert";
import { CloseMode, fromIterable, metaStream } from "../src";
import { TIMEOUT } from "./config";
import { assertActive, assertUnsub } from "./utils";

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
            assertUnsub(meta);
            assertUnsub(sub);
            assertUnsub(sub2);
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
            assertUnsub(src);
            assertActive(meta);
            assertActive(sub);
            assertActive(child);
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
            assertUnsub(src);
            assertActive(meta);
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
