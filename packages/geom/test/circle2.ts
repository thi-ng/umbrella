import { equiv } from "@thi.ng/equiv";
import { PI, TAU, HALF_PI } from "@thi.ng/math/api";
import { eqDelta2array, vec2 } from "@thi.ng/vectors/vec2";
import * as assert from "assert";
import { circle2, Circle2, HiccupCircle2 } from "../src";

describe("circle2", () => {

    it("ctor1", () => {
        const c = circle2(10, 20);
        assert(c instanceof Circle2);
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 1);
        assert.strictEqual(c.attribs, undefined);
    });

    it("ctor2", () => {
        const c = circle2(10, 20, 5);
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 5);
        assert.strictEqual(c.attribs, undefined);
    });

    it("ctor3", () => {
        const c = circle2(10, 20, 5, { a: 1 });
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 5);
        assert.deepEqual(c.attribs, { a: 1 });
    });

    it("ctor4", () => {
        const c = circle2(vec2(10, 20));
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 1);
        assert.strictEqual(c.attribs, undefined);
    });

    it("ctor5", () => {
        const c = circle2(vec2(10, 20), 5);
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 5);
        assert.strictEqual(c.attribs, undefined);
    });

    it("ctor6", () => {
        const c = circle2(vec2(10, 20), { a: 1 });
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 1);
        assert.deepEqual(c.attribs, { a: 1 });
    });


    it("ctor7", () => {
        const c = circle2(vec2(10, 20), 5, { a: 1 });
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 5);
        assert.deepEqual(c.attribs, { a: 1 });
    });

    it("ctor8", () => {
        const c = circle2(5);
        assert(equiv(c.pos, [0, 0]));
        assert.equal(c.r, 5);
        assert.strictEqual(c.attribs, undefined);
    });

    it("ctor9", () => {
        const c = circle2(5, { a: 1 });
        assert(equiv(c.pos, [0, 0]));
        assert.equal(c.r, 5);
        assert.deepEqual(c.attribs, { a: 1 });
    });

    it("hiccup", () => {
        const src: HiccupCircle2 = ["circle", { a: 1 }, [10, 20], 5];
        const c = Circle2.fromHiccup(src);
        assert(equiv(c.pos, [10, 20]));
        assert.equal(c.r, 5);
        assert.deepEqual(c.attribs, { a: 1 });
        assert(equiv(c.toHiccup(), src));
    });

    it("area", () => {
        assert.equal(circle2(10).area(), PI * 100);
    });

    it("arclength", () => {
        assert.equal(circle2(10).arcLength(), TAU * 10);
    });

    it("vertices (num)", () => {
        assert(eqDelta2array(
            circle2(10).vertices(4),
            [[10, 0], [0, 10], [-10, 0], [0, -10]]
        ))
    });

    it("vertices ({ num })", () => {
        assert(eqDelta2array(
            circle2(10).vertices({ num: 4 }),
            [[10, 0], [0, 10], [-10, 0], [0, -10]]
        ))
    });

    it("vertices ({ num, last: true })", () => {
        assert(eqDelta2array(
            circle2(10).vertices({ num: 4, last: true }),
            [[10, 0], [0, 10], [-10, 0], [0, -10], [10, 0]]
        ))
    });

    it("vertices ({ theta })", () => {
        assert(eqDelta2array(
            circle2(10).vertices({ theta: HALF_PI }),
            [[10, 0], [0, 10], [-10, 0], [0, -10]]
        ))
    });

    it("vertices ({ dist })", () => {
        assert(eqDelta2array(
            circle2(10).vertices({ dist: TAU * 10 / 4 }),
            [[10, 0], [0, 10], [-10, 0], [0, -10]]
        ))
    });
});
