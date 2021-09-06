import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { CloseMode, fromIterable, metaStream, reactive } from "../src";
import { TIMEOUT } from "./config";
import { assertActive, assertUnsub } from "./utils";

group(
    "MetaStream",
    {
        basic: ({ done, setTimeout }) => {
            const acc: number[] = [];
            const src = fromIterable([1, 2, 3], { delay: TIMEOUT });
            const meta = metaStream<number, number>((x) =>
                fromIterable([x * 10, x * 20, x * 30], { delay: TIMEOUT >> 2 })
            );
            const sub = src.subscribe(meta);
            const sub2 = sub.subscribe({
                next(x) {
                    acc.push(x);
                },
            });
            setTimeout(() => {
                assert.deepStrictEqual(
                    acc,
                    [10, 20, 30, 20, 40, 60, 30, 60, 90]
                );
                assertUnsub(meta);
                assertUnsub(sub);
                assertUnsub(sub2);
                done();
            }, 5 * TIMEOUT);
        },

        null: ({ done, setTimeout }) => {
            const acc: number[] = [];
            const src = fromIterable([1, 2, 3], { delay: TIMEOUT });
            const meta = metaStream<number, number>((x) =>
                x & 1 ? reactive(x) : null
            );
            const sub = src.subscribe(meta);
            const sub2 = sub.subscribe({
                next(x) {
                    acc.push(x);
                },
            });
            setTimeout(() => {
                assert.deepStrictEqual(acc, [1, 3]);
                assertUnsub(meta);
                assertUnsub(sub);
                assertUnsub(sub2);
                done();
            }, 5 * TIMEOUT);
        },

        closein: ({ done, setTimeout }) => {
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
        },

        closeout: ({ done, setTimeout }) => {
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
        },
    },
    {
        maxTries: 3,
        timeOut: TIMEOUT * 6,
    }
);
