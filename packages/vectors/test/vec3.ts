import * as assert from "assert";
import * as v from "../src/index";

describe("vec3", () => {

    const op2 = (fn, x, y, z) => {
        assert.deepEqual(
            fn([1, 2, 3], [10, 20, 30]),
            [x, y, z]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0], [0, 10, 0, 20, 0, 30, 0], 1, 1, 4, 2),
            [0, x, 0, 0, 0, y, 0, 0, 0, z, 0, 0]
        );
    };

    const opn = (fn, x, y, z) => {
        assert.deepEqual(
            fn([1, 2, 3], 10),
            [x, y, z]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0], 10, 1, 4),
            [0, x, 0, 0, 0, y, 0, 0, 0, z, 0, 0]
        );
    };

    it("add", () => op2(v.add3, 11, 22, 33));
    it("sub", () => op2(v.sub3, -9, -18, -27));
    it("mul", () => op2(v.mul3, 10, 40, 90));
    it("div", () => op2(v.div3, 0.1, 0.1, 0.1));

    it("addn", () => opn(v.addN3, 11, 12, 13));
    it("subn", () => opn(v.subN3, -9, -8, -7));
    it("muln", () => opn(v.mulN3, 10, 20, 30));
    it("divn", () => opn(v.divN3, 0.1, 0.2, 0.3));

    it("madd", () => {
        assert.deepEqual(
            v.madd3([1, 2, 3], [10, 20, 30], [0.5, 0.25, 0.75]),
            [1 + 10 * 0.5, 2 + 20 * 0.25, 3 + 30 * 0.75]
        );
        assert.deepEqual(
            v.madd3([1, 2, 3], [10, 0, 20, 0, 30], [0.5, 0, 0, 0.25, 0, 0, 0.75], 0, 0, 0, 1, 2, 3),
            [1 + 10 * 0.5, 2 + 20 * 0.25, 3 + 30 * 0.75]
        );
    });

    it("maddn", () => {
        assert.deepEqual(
            v.maddN3([1, 2, 3], [10, 20, 30], 0.5),
            [1 + 10 * 0.5, 2 + 20 * 0.5, 3 + 30 * 0.5]
        );
        assert.deepEqual(
            v.maddN3([1, 2, 3], [10, 0, 20, 0, 30], 0.5, 0, 0, 1, 2),
            [1 + 10 * 0.5, 2 + 20 * 0.5, 3 + 30 * 0.5]
        );
    });

    it("eqdelta", () => {
        assert(v.eqDelta3([0, 1.001, 0, 1.999, 0, 3.0099], [1, 2, 3], 0.01, 1, 0, 2, 1));
        assert(!v.eqDelta3([0, 1.001, 0, 1.999, 0, 3.02], [1, 2, 3], 0.01, 1, 0, 2, 1));
    });
});
