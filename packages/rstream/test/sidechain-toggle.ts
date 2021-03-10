import type { Predicate } from "@thi.ng/api";
import * as assert from "assert";
import { sidechainToggle, Stream, stream } from "../src";
import { assertUnsub } from "./utils";

describe("SidechainToggle", () => {
    let src: Stream<any>, side: Stream<any>, buf: any[];

    beforeEach(() => {
        src = stream();
        side = stream();
        buf = [];
    });

    let check = (
        initial: any,
        pred: Predicate<any> | undefined,
        expect: any,
        done: Function
    ) => {
        src.subscribe(sidechainToggle(side, { initial, pred })).subscribe({
            next(x) {
                buf.push(x);
            },
            done() {
                assert.deepStrictEqual(buf, expect);
                done();
            },
        });
        src.next(1);
        src.next(2);
        side.next(0);
        src.next(3);
        src.next(4);
        side.next(1);
        src.next(5);
        src.done();
    };

    it("toggles (initially on)", (done) => {
        check(true, undefined, [1, 2, 5], done);
    });

    it("toggles (initially off)", (done) => {
        check(false, undefined, [3, 4], done);
    });

    it("toggles w/ predicate", (done) => {
        check(true, (x) => x === 0, [1, 2], done);
    });

    it("unsubscribe chain (from child)", () => {
        const part = src.subscribe(sidechainToggle(side));
        const sub = part.subscribe({});
        sub.unsubscribe();
        assertUnsub(src);
        assertUnsub(side);
        assertUnsub(part);
        assertUnsub(sub);
    });
});
