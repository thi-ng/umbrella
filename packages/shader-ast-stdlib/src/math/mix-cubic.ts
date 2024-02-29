import type { FloatSym, PrimTypeMap } from "@thi.ng/shader-ast";
import { F, V2, V3, V4 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { add, mul, sub } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";

const $ = <N extends 1 | 2 | 3 | 4, T extends PrimTypeMap[N]>(n: N, type: T) =>
	defn(
		type,
		`mixCubic${n > 1 ? n : ""}`,
		[type, type, type, type, F],
		(a, b, c, d, t) => {
			let s: FloatSym;
			let s2: FloatSym;
			let t2: FloatSym;
			return [
				(t2 = sym(mul(t, t))),
				(s = sym(sub(1, t))),
				(s2 = sym(mul(s, s))),
				ret(
					add(
						add(
							add(
								mul(a, mul(s, s2)),
								mul(b, mul(3, mul(s2, t)))
							),
							mul(c, mul(3, mul(t2, s)))
						),
						mul(d, mul(t, t2))
					)
				),
			];
		}
	);

export const mixCubic = $(1, F);
export const mixCubic2 = $(2, V2);
export const mixCubic3 = $(3, V3);
export const mixCubic4 = $(4, V4);
