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

    it("equiv", () => {
        const buf = [1, 2, 3, 0, 1, 0, 2, 0, 3]
        assert(v.equiv3(buf, buf, 0, 4, 1, 2));
        assert(!v.equiv3(buf, buf, 0, 4));
        assert(new v.Vec3(buf).equiv(buf.slice(0, 3)));
        assert(new v.Vec3(buf).equiv(new v.Vec3(buf, 4, 2)));
        assert(!new v.Vec3(buf).equiv(new v.Vec3(buf, 4, 1)));
    });

    it("eqdelta", () => {
        assert(v.eqDelta3([0, 1.001, 0, 1.999, 0, 3.0099], [1, 2, 3], 0.01, 1, 0, 2, 1));
        assert(!v.eqDelta3([0, 1.001, 0, 1.999, 0, 3.02], [1, 2, 3], 0.01, 1, 0, 2, 1));
        assert(new v.Vec3([0, 1.001, 0, 1.999, 0, 3.0099], 1, 2).eqDelta(v.vec3(1, 2, 3), 0.01));
        assert(!new v.Vec3([0, 1.001, 0, 1.999, 0, 3.02], 1, 2).eqDelta(v.vec3(1, 2, 3), 0.01));
    });

    it("iterator", () => {
        assert.deepEqual([...new v.Vec3([1, 2, 3])], [1, 2, 3]);
        assert.deepEqual([...new v.Vec3([0, 1, 0, 2, 0, 3], 1, 2)], [1, 2, 3]);
    });

    it("arraylike", () => {
        const buf = [0, 1, 0, 2, 0, 3];
        const a = new v.Vec3(buf, 1, 2);
        assert.equal(a.length, 3);
        assert.equal(a[0], 1);
        assert.equal(a[1], 2);
        assert.equal(a[2], 3);
        a[0] = 10;
        a[1] = 20;
        a[2] = 30;
        assert.equal(a[0], 10);
        assert.equal(a[1], 20);
        assert.equal(a[2], 30);
        assert.deepEqual(a.buf, [0, 10, 0, 20, 0, 30]);
    });

    it("prop access", () => {
        const buf = [0, 1, 0, 2, 0, 3];
        const a = new v.Vec3(buf, 1, 2);
        assert.equal(a.x, 1);
        assert.equal(a.y, 2);
        assert.equal(a.z, 3);
        a.x = 10;
        a.y = 20;
        a.z = 30;
        assert.equal(a.x, 10);
        assert.equal(a.y, 20);
        assert.equal(a.z, 30);
        assert.deepEqual(a.buf, [0, 10, 0, 20, 0, 30]);
    });
});
