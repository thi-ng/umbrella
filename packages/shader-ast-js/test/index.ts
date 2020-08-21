import { bvec2, defn, greaterThan, ret, vec2 } from "@thi.ng/shader-ast";
import { eqDelta2 } from "@thi.ng/vectors";
import * as assert from "assert";
import { JS_DEFAULT_ENV, targetJS } from "../src/";

describe("shader-ast-js", () => {
    it("vec2", () => {
        const V2 = JS_DEFAULT_ENV.vec2;
        assert.deepEqual(V2.abs([-1, 2]), [1, 2]);
        assert.deepEqual(V2.acos([0, 1]), [Math.PI / 2, 0]);
        assert.deepEqual(V2.add([1, 2], [10, 20]), [11, 22]);
        assert.deepEqual(V2.addnv(10, [1, 2]), [11, 12]);
        assert.deepEqual(V2.addvn([1, 2], 10), [11, 12]);
        assert.deepEqual(V2.asin([0, 1]), [0, Math.PI / 2]);
        assert.deepEqual(V2.atan([0, 1]), [0, 0.7853981633974483]);
        assert.deepEqual(V2.atannn([0, 1], [1, 0]), [0, Math.PI / 2]);
        assert.deepEqual(V2.ceil([-1.8, 1.2]), [-1, 2]);
        assert.deepEqual(V2.cos([0, Math.PI]), [1, -1]);
        assert.deepEqual(V2.clamp([-1.8, 1.2], [-1, -1], [1, 1]), [-1, 1]);
        assert.deepEqual(V2.dec([-1, 1]), [-2, 0]);
        assert.deepEqual(V2.degrees([Math.PI / 2, -Math.PI / 4]), [90, -45]);
        assert.deepEqual(V2.distance([10, 20], [11, 19]), Math.SQRT2);
        assert.deepEqual(V2.div([1, 2], [10, -10]), [0.1, -0.2], "d1");
        assert.deepEqual(V2.divnv(10, [2, 4]), [5, 2.5], "d2");
        assert.deepEqual(V2.divvn([1, 2], 10), [0.1, 0.2], "d3");
        assert.deepEqual(V2.dot([1, 2], [10, 20]), 50);
        assert.deepEqual(V2.exp([2, -3]), [Math.exp(2), Math.exp(-3)]);
        assert.deepEqual(V2.exp2([2, -3]), [Math.pow(2, 2), Math.pow(2, -3)]);
        // assert.deepEqual(V2.faceForward(), []);
        assert.deepEqual(V2.floor([-1.2, 1.2]), [-2, 1], "floor");
        assert.ok(eqDelta2(V2.fract([-1.8, 1.8]), [0.2, 0.8]), "fract");
        assert.ok(eqDelta2(V2.inc([-1.2, 1.2]), [-0.2, 2.2]), "inc");
        assert.deepEqual(V2.inversesqrt([4, 9]), [1 / 2, 1 / 3]);
        assert.deepEqual(V2.length([100, 100]), 100 * Math.SQRT2);
        assert.deepEqual(V2.log([2, 10]), [Math.LN2, Math.LN10]);
        assert.deepEqual(V2.log2([4, 32]), [2, 5]);
        //assert.deepEqual(V2.max(), []);
        //assert.deepEqual(V2.min(), []);
        //assert.deepEqual(V2.mix(), []);
        //assert.deepEqual(V2.mixn(), []);
        //assert.deepEqual(V2.mod(), []);
        //assert.deepEqual(V2.modn(), []);
        //assert.deepEqual(V2.mul(), []);
        //assert.deepEqual(V2.mulnv(), []);
        //assert.deepEqual(V2.mulvn(), []);
        //assert.deepEqual(V2.normalize(), []);
        //assert.deepEqual(V2.pow(), []);
        //assert.deepEqual(V2.radians(), []);
        //assert.deepEqual(V2.reflect(), []);
        //assert.deepEqual(V2.refract(), []);
        //assert.deepEqual(V2.sign(), []);
        //assert.deepEqual(V2.sin(), []);
        //assert.deepEqual(V2.smoothstep(), []);
        //assert.deepEqual(V2.sqrt(), []);
        //assert.deepEqual(V2.step(), []);
        //assert.deepEqual(V2.sub(), []);
        //assert.deepEqual(V2.sub1(), []);
        //assert.deepEqual(V2.subnv(), []);
        //assert.deepEqual(V2.subvn(), []);
        //assert.deepEqual(V2.tan(), []);
    });

    it("vec2 coerce", () => {
        const emit = targetJS();
        assert.equal(emit(vec2()), "env.vec2n(0)");
        assert.equal(emit(vec2(bvec2())), "env.vec2b(env.bvec2n(false))");

        const foo = emit.compile(
            defn("vec2", "foo", ["vec2"], (a) => [
                ret(vec2(greaterThan(a, vec2(0.5)))),
            ])
        ).foo;
        assert.deepEqual(foo([0.4, 0.6]), [0, 1]);
        assert.deepEqual(foo([0.6, 0.4]), [1, 0]);
    });
});
