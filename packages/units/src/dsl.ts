import type { FnU, FnU2 } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { Implementations, Sym } from "@thi.ng/sexpr";
import { parse } from "@thi.ng/sexpr/parse";
import { runtime } from "@thi.ng/sexpr/runtime";
import * as CONST from "./constants/index.js";
import {
	add,
	asUnit,
	convert,
	div,
	mul,
	quantity,
	Quantity,
	reciprocal,
	sub,
} from "./unit.js";

/** @internal */
const __mathOp =
	(fn: FnU2<Quantity<number>>, fn1: FnU<Quantity<number>>) =>
	(first: any, ...args: any[]) => {
		return args.length > 0
			? // use a reduction for 2+ args
			  args.reduce((acc, x) => fn(acc, x), first)
			: // apply special case unary function
			  fn1(first);
	};

const ENV = {
	"+": __mathOp(add, (x) => x),
	"-": __mathOp(sub, (x) => sub(quantity(0, x.value), x)),
	"*": __mathOp(mul, (x) => x),
	"/": __mathOp(div, reciprocal),

	area: (src: Quantity<number[]>) => {
		const [w, h] = src.value.map((x) => quantity(1, x));
		return mul(w, h);
	},
	volume: (src: Quantity<number[]>) => {
		const [w, h, d] = src.value.map((x) => quantity(1, x));
		return mul(mul(w, h), d);
	},

	width: (src: Quantity<number[]>) => quantity(1, src.value[0]),
	height: (src: Quantity<number[]>) => quantity(1, src.value[1]),
	depth: (src: Quantity<number[]>) => quantity(1, src.value[2]),
};

const interpret = runtime<Implementations<null, any>, null, any>({
	expr: ({ children: [x, ...args] }) => {
		const name = (<Sym>x).value;
		const $args = args.map((a) => interpret(a, null));
		return (
			(<any>ENV)[name]?.apply(null, $args) ??
			convert($args[0], asUnit(name))
		);
	},
	sym: ({ value }) => {
		const match = /^[-+]?[0-9.]+(e[+-]?\d+)?/.exec(value);
		return match
			? quantity(+match[0], asUnit(value.substring(match[0].length)))
			: (<any>CONST)[value.toUpperCase()] ?? asUnit(value);
	},
	str: () => illegalArgs("string value"),
	num: (x) => x.value,
});

/**
 * Parses & evaluates given Lisp-like formula expression to compute, combine or
 * convert units in a more concise style than the default JS API provided by
 * this package.
 *
 * @remarks
 * The minimal domain specific language defined here only includes the following
 * functions (all following basic Lisp syntax, also see examples below):
 *
 * - Math operators: `+`, `-`, `*`, `/` to combine two or more quantities (all
 *   quantities MUST be compatible)
 * - `area`: Computes the area of a given 2D quantity (e.g. `(area DIN_A4)`
 *   computes the area of a sheet of paper)
 * - `volume`: Computes the volume of a given 3D quantity
 * - `width`: Returns the 1st dimension quantity of a 2D/3D quantity (e.g.
 *   `(width DIN_A4)` = 210mm)
 * - `height`: Returns the 2nd dimension quantity of a 2D/3D quantity
 * - `depth`: Returns the 3rd dimension quantity of a 3D quantity
 *
 * Any other symbol is interpreted as quantity or pre-defined registered unit or
 * constant (see readme).
 *
 * @example
 * ```ts tangle:../export/eval.ts
 * import { $eval } from "@thi.ng/units";
 *
 * // compute weight in grams of A4 paper with 320 grams per square meter
 * console.log($eval(`(g (* (area DIN_A4) 320gsm))`));
 * // 19.9584
 *
 * // compute weight in kg of 1/2 inch thick 200x300mm glass plate
 * console.log($eval(`(kg (* 200mm 300mm 0.5in 2500kg/m3))`));
 * // 1.905
 *
 * // same as previous but using the `glass` density preset
 * console.log($eval(`(kg (* 200mm 300mm 0.5in glass))`));
 * // 1.905
 * ```
 *
 * @param src
 */
export const $eval = (src: string) =>
	parse(src).children.reduce((_, x) => interpret(x, null), <any>null);
