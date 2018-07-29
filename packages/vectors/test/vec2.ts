import * as assert from "assert";
import * as v from "../src/index";

describe("vec2", () => {

    const op2 = (fn, x, y) => {
        assert.deepEqual(
            fn([1, 2], [10, 20]),
            [x, y]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0], [0, 10, 0, 20, 0], 1, 1, 4, 2),
            [0, x, 0, 0, 0, y, 0, 0]
        );
    };

    const opn = (fn, x, y) => {
        assert.deepEqual(
            fn([1, 2], 10),
            [x, y]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0], 10, 1, 4),
            [0, x, 0, 0, 0, y, 0, 0]
        );
    };

    it("add", () => op2(v.add2, 11, 22));
    it("sub", () => op2(v.sub2, -9, -18));
    it("mul", () => op2(v.mul2, 10, 40));
    it("div", () => op2(v.div2, 0.1, 0.1));

    it("addn", () => opn(v.addN2, 11, 12));
    it("subn", () => opn(v.subN2, -9, -8));
    it("muln", () => opn(v.mulN2, 10, 20));
    it("divn", () => opn(v.divN2, 0.1, 0.2));

    it("madd", () => {
        assert.deepEqual(
            v.madd2([1, 2], [10, 20], [0.5, 0.25]),
            [1 + 10 * 0.5, 2 + 20 * 0.25]
        );
        assert.deepEqual(
            v.madd2([1, 2], [10, 0, 20, 0], [0.5, 0, 0, 0.25], 0, 0, 0, 1, 2, 3),
            [1 + 10 * 0.5, 2 + 20 * 0.25]
        );
    });

    it("maddn", () => {
        assert.deepEqual(
            v.maddN2([1, 2], [10, 20], 0.5),
            [1 + 10 * 0.5, 2 + 20 * 0.5]
        );
        assert.deepEqual(
            v.maddN2([1, 2], [10, 0, 20, 0], 0.5, 0, 0, 1, 2),
            [1 + 10 * 0.5, 2 + 20 * 0.5]
        );
    });


    it("eqdelta", () => {
        assert(v.eqDelta2([0, 1.001, 0, 1.999, 0], [1, 2], 0.01, 1, 0, 2, 1));
        assert(!v.eqDelta2([0, 1.001, 0, 1.989, 0], [1, 2], 0.01, 1, 0, 2, 1));
    });
});
