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

    it("equiv", () => {
        const buf = [1, 2, 1, 0, 2, 0]
        assert(v.equiv2(buf, buf, 0, 2, 1, 2));
        assert(!v.equiv2(buf, buf, 0, 2));
        assert(new v.Vec2(buf).equiv(buf.slice(0, 2)));
        assert(new v.Vec2(buf).equiv(new v.Vec2(buf, 2, 2)));
        assert(!new v.Vec2(buf).equiv(new v.Vec2(buf, 2, 1)));
    });

    it("eqdelta", () => {
        assert(v.eqDelta2([0, 1.001, 0, 1.999, 0], [1, 2], 0.01, 1, 0, 2, 1));
        assert(!v.eqDelta2([0, 1.001, 0, 1.989, 0], [1, 2], 0.01, 1, 0, 2, 1));
    });

    it("iterator", () => {
        assert.deepEqual([...new v.Vec2([1, 2])], [1, 2]);
        assert.deepEqual([...new v.Vec2([0, 1, 0, 2], 1, 2)], [1, 2]);
    });

    it("arraylike", () => {
        const buf = [0, 1, 0, 2];
        const a = new v.Vec2(buf, 1, 2);
        assert.equal(a.length, 2);
        assert.equal(a[0], 1);
        assert.equal(a[1], 2);
        a[0] = 10;
        a[1] = 20;
        assert.equal(a[0], 10);
        assert.equal(a[1], 20);
        assert.deepEqual(a.buf, [0, 10, 0, 20]);
    });

    it("prop access", () => {
        const buf = [0, 1, 0, 2];
        const a = new v.Vec2(buf, 1, 2);
        assert.equal(a.x, 1);
        assert.equal(a.y, 2);
        a.x = 10;
        a.y = 20;
        assert.equal(a.x, 10);
        assert.equal(a.y, 20);
        assert.deepEqual(a.buf, [0, 10, 0, 20]);
    });
});
