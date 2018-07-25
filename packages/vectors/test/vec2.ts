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

    it("addn", () => opn(v.add2n, 11, 12));
    it("subn", () => opn(v.sub2n, -9, -8));
    it("muln", () => opn(v.mul2n, 10, 20));
    it("divn", () => opn(v.div2n, 0.1, 0.2));
});
