import type { ISeq } from "@thi.ng/api";
import * as assert from "assert";
import { cons, lazyseq } from "../src";

describe("lazyseq", () => {
    it("lazyseq", () => {
        const fib = (a?: number, b?: number): ISeq<number> =>
            a !== undefined
                ? lazyseq(() => cons(a, fib(b, a + b!)))
                : fib(0, 1);
        assert.equal(fib().first(), 0);
        // prettier-ignore
        assert.equal(fib().next()!.first(), 1);
        // prettier-ignore
        assert.equal(fib().next()!.next()!.first(), 1);
        // prettier-ignore
        assert.equal(fib().next()!.next()!.next()!.first(), 2);
        // prettier-ignore
        assert.equal(fib().next()!.next()!.next()!.next()!.first(), 3);
    });
});
