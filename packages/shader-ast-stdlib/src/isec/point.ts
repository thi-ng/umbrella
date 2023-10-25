import type { Vec2Sym } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { bool } from "@thi.ng/shader-ast/ast/lit";
import { add } from "@thi.ng/shader-ast/ast/ops";
import { $x, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { distance, min, step } from "@thi.ng/shader-ast/builtin/math";

/**
 * Predicate function to check if given point `p` is inside the circle defined
 * by `pos` and `radius`.
 */
export const isPointInCircle = defn(
	"bool",
	null,
	[V2, V2, F],
	(p, pos, radius) => [ret(bool(step(distance(p, pos), radius)))]
);

/**
 * Predicate function to check if given point `p` is inside the axis-aligned
 * rect defined by `pos` and `size`. Branchless.
 */
export const isPointInRect = defn(
	"bool",
	null,
	[V2, V2, V2],
	(p, pos, size) => {
		let q: Vec2Sym;
		return [
			(q = sym(min(step(pos, p), step(p, add(pos, size))))),
			ret(bool(min($x(q), $y(q)))),
		];
	}
);
