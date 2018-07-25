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

    it("addn", () => opn(v.add3n, 11, 12, 13));
    it("subn", () => opn(v.sub3n, -9, -8, -7));
    it("muln", () => opn(v.mul3n, 10, 20, 30));
    it("divn", () => opn(v.div3n, 0.1, 0.2, 0.3));
});
