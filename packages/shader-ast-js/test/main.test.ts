import { bvec2, defn, greaterThan, ret, vec2 } from "@thi.ng/shader-ast";
import { eqDelta2 } from "@thi.ng/vectors";
import { expect, test } from "bun:test";
import { JS_DEFAULT_ENV, targetJS } from "../src/index.js";

const $2 = JS_DEFAULT_ENV.pools.vec2.from;

test("vec2", () => {
	const V2 = JS_DEFAULT_ENV.vec2;
	expect(V2.abs([-1, 2])).toEqual($2(1, 2));
	expect(V2.acos([0, 1])).toEqual($2(Math.PI / 2, 0));
	expect(V2.add([1, 2], [10, 20])).toEqual($2(11, 22));
	expect(V2.addnv(10, [1, 2])).toEqual($2(11, 12));
	expect(V2.addvn([1, 2], 10)).toEqual($2(11, 12));
	expect(V2.asin([0, 1])).toEqual($2(0, Math.PI / 2));
	expect(V2.atan([0, 1])).toEqual($2(0, 0.7853981633974483));
	expect(V2.atannn([0, 1], [1, 0])).toEqual($2(0, Math.PI / 2));
	expect(V2.ceil([-1.8, 1.2])).toEqual($2(-1, 2));
	expect(V2.cos([0, Math.PI])).toEqual($2(1, -1));
	expect(V2.clamp([-1.8, 1.2], [-1, -1], [1, 1])).toEqual($2(-1, 1));
	expect(V2.dec([-1, 1])).toEqual($2(-2, 0));
	expect(V2.degrees([Math.PI / 2, -Math.PI / 4])).toEqual($2(90, -45));
	expect(V2.distance([10, 20], [11, 19])).toEqual(Math.SQRT2);
	expect(V2.div([1, 2], [10, -10])).toEqual($2(0.1, -0.2));
	expect(V2.divnv(10, [2, 4])).toEqual($2(5, 2.5));
	expect(V2.divvn([1, 2], 10)).toEqual($2(0.1, 0.2));
	expect(V2.dot([1, 2], [10, 20])).toEqual(50);
	expect(V2.exp([2, -3])).toEqual($2(Math.exp(2), Math.exp(-3)));
	expect(V2.exp2([2, -3])).toEqual($2(Math.pow(2, 2), Math.pow(2, -3)));
	// assert. deepStrictEqual(V2.faceForward(), []);
	expect(V2.floor([-1.2, 1.2])).toEqual($2(-2, 1));
	expect(eqDelta2(V2.fract([-1.8, 1.8]), $2(0.2, 0.8))).toBeTrue();
	expect(eqDelta2(V2.inc([-1.2, 1.2]), $2(-0.2, 2.2))).toBeTrue();
	expect(V2.inversesqrt([4, 9])).toEqual($2(1 / 2, 1 / 3));
	expect(V2.length([100, 100])).toEqual(100 * Math.SQRT2);
	expect(V2.log([2, 10])).toEqual($2(Math.LN2, Math.LN10));
	expect(V2.log2([4, 32])).toEqual($2(2, 5));
	//assert. deepStrictEqual(V2.max(), []);
	//assert. deepStrictEqual(V2.min(), []);
	//assert. deepStrictEqual(V2.mix(), []);
	//assert. deepStrictEqual(V2.mixn(), []);
	//assert. deepStrictEqual(V2.mod(), []);
	//assert. deepStrictEqual(V2.modn(), []);
	//assert. deepStrictEqual(V2.mul(), []);
	//assert. deepStrictEqual(V2.mulnv(), []);
	//assert. deepStrictEqual(V2.mulvn(), []);
	//assert. deepStrictEqual(V2.normalize(), []);
	//assert. deepStrictEqual(V2.pow(), []);
	//assert. deepStrictEqual(V2.radians(), []);
	//assert. deepStrictEqual(V2.reflect(), []);
	//assert. deepStrictEqual(V2.refract(), []);
	//assert. deepStrictEqual(V2.sign(), []);
	//assert. deepStrictEqual(V2.sin(), []);
	//assert. deepStrictEqual(V2.smoothstep(), []);
	//assert. deepStrictEqual(V2.sqrt(), []);
	//assert. deepStrictEqual(V2.step(), []);
	//assert. deepStrictEqual(V2.sub(), []);
	//assert. deepStrictEqual(V2.sub1(), []);
	//assert. deepStrictEqual(V2.subnv(), []);
	//assert. deepStrictEqual(V2.subvn(), []);
	//assert. deepStrictEqual(V2.tan(), []);
});

test("vec2 coerce", () => {
	const emit = targetJS();
	expect(emit(vec2())).toBe("env.vec2n(0)");
	expect(emit(vec2(bvec2()))).toBe("env.vec2b(env.bvec2n(false))");

	const foo = emit.compile(
		defn("vec2", "foo", ["vec2"], (a) => [
			ret(vec2(greaterThan(a, vec2(0.5)))),
		])
	).foo;
	expect(foo([0.4, 0.6])).toEqual($2(0, 1));
	expect(foo([0.6, 0.4])).toEqual($2(1, 0));
});
