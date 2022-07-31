import type { FloatTerm, Term, Vec } from "@thi.ng/shader-ast";
import { add, mul } from "@thi.ng/shader-ast/ast/ops";
import { normalize } from "@thi.ng/shader-ast/builtin/math";

/**
 * Inline function. Returns point on ray (`p`, `dir`) at distance `t`.
 * Unless `norm` is true (default false), `dir` must be already
 * normalized.
 *
 * @param p -
 * @param dir -
 * @param t -
 * @param normalize -
 */
export const rayPointAt = <A extends Vec, B extends A>(
	p: Term<A>,
	dir: Term<B>,
	t: FloatTerm,
	norm = false
) => add(p, mul(norm ? normalize(dir) : dir, t));
