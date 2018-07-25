import * as assert from "assert";
import * as v from "../src/index";

describe("vec4", () => {

    const op2 = (fn, x, y, z, w) => {
        assert.deepEqual(
            fn([1, 2, 3, 4], [10, 20, 30, 40]),
            [x, y, z, w]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0], [0, 10, 0, 20, 0, 30, 0, 40, 0], 1, 1, 4, 2),
            [0, x, 0, 0, 0, y, 0, 0, 0, z, 0, 0, 0, w, 0, 0]
        );
    };

    const opn = (fn, x, y, z, w) => {
        assert.deepEqual(
            fn([1, 2, 3, 4], 10),
            [x, y, z, w]
        );
        assert.deepEqual(
            fn([0, 1, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 4, 0, 0], 10, 1, 4),
            [0, x, 0, 0, 0, y, 0, 0, 0, z, 0, 0, 0, w, 0, 0]
        );
    };

    it("add", () => op2(v.add4, 11, 22, 33, 44));
    it("sub", () => op2(v.sub4, -9, -18, -27, -36));
    it("mul", () => op2(v.mul4, 10, 40, 90, 160));
    it("div", () => op2(v.div4, 0.1, 0.1, 0.1, 0.1));

    it("addn", () => opn(v.add4n, 11, 12, 13, 14));
    it("subn", () => opn(v.sub4n, -9, -8, -7, -6));
    it("muln", () => opn(v.mul4n, 10, 20, 30, 40));
    it("divn", () => opn(v.div4n, 0.1, 0.2, 0.3, 0.4));
});
