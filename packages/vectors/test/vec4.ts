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

    it("addn", () => opn(v.addN4, 11, 12, 13, 14));
    it("subn", () => opn(v.subN4, -9, -8, -7, -6));
    it("muln", () => opn(v.mulN4, 10, 20, 30, 40));
    it("divn", () => opn(v.divN4, 0.1, 0.2, 0.3, 0.4));

    it("madd", () => {
        assert.deepEqual(
            v.madd4([1, 2, 3, 4], [10, 20, 30, 40], [0.5, 0.25, 0.75, 0.125]),
            [1 + 10 * 0.5, 2 + 20 * 0.25, 3 + 30 * 0.75, 4 + 40 * 0.125]
        );
        assert.deepEqual(
            v.madd4([1, 2, 3, 4], [10, 0, 20, 0, 30, 0, 40], [0.5, 0, 0, 0.25, 0, 0, 0.75, 0, 0, 0.125], 0, 0, 0, 1, 2, 3),
            [1 + 10 * 0.5, 2 + 20 * 0.25, 3 + 30 * 0.75, 4 + 40 * 0.125]
        );
    });

    it("maddn", () => {
        assert.deepEqual(
            v.maddN4([1, 2, 3, 4], [10, 20, 30, 40], 0.5),
            [1 + 10 * 0.5, 2 + 20 * 0.5, 3 + 30 * 0.5, 4 + 40 * 0.5]
        );
        assert.deepEqual(
            v.maddN4([1, 2, 3, 4], [10, 0, 20, 0, 30, 0, 40], 0.5, 0, 0, 1, 2),
            [1 + 10 * 0.5, 2 + 20 * 0.5, 3 + 30 * 0.5, 4 + 40 * 0.5]
        );
    });

    it("equiv", () => {
        const buf = [1, 2, 3, 4, 1, 0, 2, 0, 3, 0, 4]
        assert(v.equiv4(buf, buf, 0, 4, 1, 2));
        assert(!v.equiv4(buf, buf, 0, 4));
        assert(new v.Vec4(buf).equiv(buf.slice(0, 4)));
        assert(new v.Vec4(buf).equiv(new v.Vec4(buf, 4, 2)));
        assert(!new v.Vec4(buf).equiv(new v.Vec4(buf, 4, 1)));
    });

    it("eqdelta", () => {
        assert(v.eqDelta4([0, 1.001, 0, 1.999, 0, 3.0099, 0, 3.991], [1, 2, 3, 4], 0.01, 1, 0, 2, 1));
        assert(!v.eqDelta4([0, 1.001, 0, 1.999, 0, 3.02, 0, 4], [1, 2, 3, 4], 0.01, 1, 0, 2, 1));
    });

    it("iterator", () => {
        assert.deepEqual([...new v.Vec4([1, 2, 3, 4])], [1, 2, 3, 4]);
        assert.deepEqual([...new v.Vec4([0, 1, 0, 2, 0, 3, 0, 4], 1, 2)], [1, 2, 3, 4]);
    });

    it("arraylike", () => {
        const buf = [0, 1, 0, 2, 0, 3, 0, 4];
        const a = new v.Vec4(buf, 1, 2);
        assert.equal(a.length, 4);
        assert.equal(a[0], 1);
        assert.equal(a[1], 2);
        assert.equal(a[2], 3);
        assert.equal(a[3], 4);
        a[0] = 10;
        a[1] = 20;
        a[2] = 30;
        a[3] = 40;
        assert.equal(a[0], 10);
        assert.equal(a[1], 20);
        assert.equal(a[2], 30);
        assert.equal(a[3], 40);
        assert.deepEqual(a.buf, [0, 10, 0, 20, 0, 30, 0, 40]);
    });

    it("prop access", () => {
        const buf = [0, 1, 0, 2, 0, 3, 0, 4];
        const a = new v.Vec4(buf, 1, 2);
        assert.equal(a.x, 1);
        assert.equal(a.y, 2);
        assert.equal(a.z, 3);
        assert.equal(a.w, 4);
        a.x = 10;
        a.y = 20;
        a.z = 30;
        a.w = 40;
        assert.equal(a.x, 10);
        assert.equal(a.y, 20);
        assert.equal(a.z, 30);
        assert.equal(a.w, 40);
        assert.deepEqual(a.buf, [0, 10, 0, 20, 0, 30, 0, 40]);
    });
});
