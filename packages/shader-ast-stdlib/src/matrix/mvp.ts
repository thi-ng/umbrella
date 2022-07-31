import type { Mat4Term, Vec3Term } from "@thi.ng/shader-ast";
import { FLOAT1, vec4 } from "@thi.ng/shader-ast/ast/lit";
import { mul } from "@thi.ng/shader-ast/ast/ops";

/**
 * Inline function. Multiplies `pos` with given model, view & projection
 * matrices (in order). `p` is extended to a vec4.
 *
 * @param p -
 * @param model -
 * @param view -
 * @param proj -
 */
export const transformMVP = (
	p: Vec3Term,
	model: Mat4Term,
	view: Mat4Term,
	proj: Mat4Term
) => mul(mul(proj, mul(view, model)), vec4(p, FLOAT1));
