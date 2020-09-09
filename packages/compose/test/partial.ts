import * as assert from "assert";
import { partial } from "../src";

describe("partial", () => {
    const fn = (
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any,
        g: any,
        h: any,
        i: any
    ) => [a, b, c, d, e, f, g, h, i];
    const res = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    it("1-arg", () => {
        assert.deepStrictEqual(partial(fn, 0)(1, 2, 3, 4, 5, 6, 7, 8), res);
    });

    it("2-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1)(2, 3, 4, 5, 6, 7, 8), res);
    });

    it("3-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2)(3, 4, 5, 6, 7, 8), res);
    });

    it("4-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2, 3)(4, 5, 6, 7, 8), res);
    });

    it("5-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4)(5, 6, 7, 8), res);
    });

    it("6-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5)(6, 7, 8), res);
    });

    it("7-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5, 6)(7, 8), res);
    });

    it("8-arg", () => {
        assert.deepStrictEqual(partial(fn, 0, 1, 2, 3, 4, 5, 6, 7)(8), res);
    });
});
