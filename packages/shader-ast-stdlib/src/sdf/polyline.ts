import type { FloatSym } from "@thi.ng/shader-ast";
import { F, V2 } from "@thi.ng/shader-ast/api/types";
import { assign } from "@thi.ng/shader-ast/ast/assign";
import { forLoop } from "@thi.ng/shader-ast/ast/controlflow";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { index } from "@thi.ng/shader-ast/ast/indexed";
import { INT0, float, int } from "@thi.ng/shader-ast/ast/lit";
import { add, inc, lt } from "@thi.ng/shader-ast/ast/ops";
import { sym } from "@thi.ng/shader-ast/ast/sym";
import { min } from "@thi.ng/shader-ast/builtin/math";
import { sdfLine2 } from "./line.js";

export const sdfPolyline2 = (N: number) =>
	defn(
		F,
		`sdfPolyline2_${N}`,
		[V2, ["vec2[]", "pts", { num: N }]],
		(p, pts) => {
			let minD: FloatSym;
			return [
				(minD = sym(float(1e6))),
				forLoop(
					sym(INT0),
					(i) => lt(i, int(N - 1)),
					inc,
					(i) => [
						assign(
							minD,
							min(
								minD,
								sdfLine2(
									p,
									index(pts, i),
									index(pts, add(i, 1))
								)
							)
						),
					]
				),
				ret(minD),
			];
		}
	);
