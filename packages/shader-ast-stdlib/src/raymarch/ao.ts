import type { FloatSym } from "@thi.ng/shader-ast";
import { F, V3 } from "@thi.ng/shader-ast/api/types";
import { forLoop } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { gensym } from "@thi.ng/shader-ast/ast/idgen";
import { FLOAT0, FLOAT05, FLOAT1, float } from "@thi.ng/shader-ast/ast/lit";
import {
	add,
	addSelf,
	inc,
	lte,
	mul,
	mulSelf,
	sub,
} from "@thi.ng/shader-ast/ast/ops";
import { $x } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import type { RaymarchScene } from "../api.js";
import { clamp01 } from "../math/clamp.js";

/**
 * Higher order function returning an function to compute the Ambient
 * Occlusion term / shadow factor for given SDF scene function. The
 * returned function takes 2 arguments: surface pos and normal. It
 * returns a float in [0..1] interval (zero = fully occluded).
 *
 * @param scene -
 * @param numSamples -
 * @param name -
 */
export const raymarchAO = (
	scene: RaymarchScene,
	numSamples = 5,
	name = gensym("raymarchAO_")
) =>
	defn(F, name, [V3, V3], (p, n) => {
		let r: FloatSym;
		let w: FloatSym;
		let d0: FloatSym;
		return [
			(r = sym(FLOAT0)),
			(w = sym(FLOAT1)),
			forLoop(
				sym(float(1)),
				(i) => lte(i, float(numSamples)),
				inc,
				(i) => [
					(d0 = sym(mul(i, 1 / numSamples))),
					addSelf(r, mul(w, sub(d0, $x(scene(add(p, mul(n, d0))))))),
					mulSelf(w, FLOAT05),
				]
			),
			ret(sub(FLOAT1, clamp01(r))),
		];
	});
