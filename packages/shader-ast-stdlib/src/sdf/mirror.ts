import type { Vec2Sym } from "@thi.ng/shader-ast";
import { V2 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { FLOAT05, VEC2_1, VEC2_2 } from "@thi.ng/shader-ast/ast/lit";
import { add, div, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { floor, mod } from "@thi.ng/shader-ast/builtin/math";

/**
 * @remarks
 * Based on HG_SDF (Mercury Demogroup). Does not compute cell index.
 *
 * @param p - point
 * @param size - mirror box size
 */
export const sdfMirror2 = defn(V2, "sdfMirror2", [V2, V2], (p, size) => {
	let halfSize: Vec2Sym;
	return [
		(halfSize = sym(mul(size, FLOAT05))),
		ret(
			mul(
				sub(mod(add(p, halfSize), size), halfSize),
				sub(
					mul(mod(floor(div(add(p, halfSize), size)), VEC2_2), 2),
					VEC2_1
				)
			)
		),
	];
});
