import type { FloatTerm, Prim, Term } from "@thi.ng/shader-ast";
import { float, vec2, vec3, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { pow } from "@thi.ng/shader-ast/builtin/math";

const GAMMA = float(2.2);
const INV_GAMMA = float(1 / 2.2);

const $ = <T extends Prim>(t: Term<T>, x: FloatTerm): Term<T> => <any>{
		float: x,
		vec2: vec2(x),
		vec3: vec3(x),
		vec4: vec4(x, x, x, 1),
	}[t.type];

/**
 * Inline function. Converts sRGB color term (1D-4D) to linear space via
 * `pow(rgb, GAMMA)`, where gamma is hardcoded to 2.2. For vec4 args,
 * the `w` component (alpha) remains unchanged.
 *
 * @param x -
 */
export const toLinear = <T extends Prim>(x: Term<T>) => pow(x, $(x, GAMMA));

/**
 * Inline function. Converts linear color term (1D-4D) to sRGB via
 * `pow(rgb, 1.0 / GAMMA)`, where gamma is hardcoded to 2.2. For vec4
 * args, the `w` component (alpha) remains unchanged.
 *
 * @param x -
 */
export const toSRGB = <T extends Prim>(x: Term<T>) => pow(x, $(x, INV_GAMMA));
