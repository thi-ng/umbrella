import type { Fn } from "@thi.ng/api";
import type { FloatSym, FloatTerm, Prim, Term } from "@thi.ng/shader-ast";
import { F } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { forLoop } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { gensym } from "@thi.ng/shader-ast/ast/idgen";
import { FLOAT0, FLOAT05, float } from "@thi.ng/shader-ast/ast/lit";
import { add, inc, lt, mul } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";

/**
 * Higher order function. Takes an AST type ID, a single-arg scalar
 * function `fn`, number of octaves (default: 4) and an optional
 * function name. Returns a new function which computes the summed value
 * of `fn` over the given number octaves and accepts 3 args:
 *
 * - position (float)
 * - octave shift (float)
 * - octave decay (usually 0.5)
 *
 * For each octave `i` [0..oct), the function is (in principle)
 * evaluated as:
 *
 * n += decay / exp2(i) * fn(pos * exp2(i) + i * shift)
 *
 * @param fn -
 * @param oct -
 * @param name -
 */
export const additive = <T extends Prim>(
	type: T,
	fn: Fn<Term<T>, FloatTerm>,
	oct: number | FloatTerm = 4,
	name = gensym("additive_")
) =>
	defn(F, name, [[type], [type], F], (pos, shift, decay) => {
		let n: FloatSym;
		let amp: FloatSym;
		return [
			(n = sym(FLOAT0)),
			(amp = sym(FLOAT05)),
			forLoop(
				sym(FLOAT0),
				(i) => lt(i, float(oct)),
				inc,
				(i) => [
					assign(
						n,
						add(
							n,
							mul(amp, fn(add(pos, mul(i, shift))))
						)
					),
					assign(amp, mul(amp, decay)),
					assign(pos, mul(pos, 2)),
				]
			),
			ret(n),
		];
	});
