import { alt } from "./combinators/alt.js";
import { maybe } from "./combinators/maybe.js";
import { seq } from "./combinators/seq.js";
import { xform } from "./combinators/xform.js";
import { char } from "./prims/char.js";
import { oneOf, oneOfD } from "./prims/one-of.js";
import { stringD } from "./prims/string.js";

const digits = "0123456789";
const hexdigits = digits + "abcdefABCDEF";
const ws = " \t\n\r";

export const WS = oneOfD(ws);

export const WS0 = oneOfD(ws, { min: 0, max: Infinity });
export const WS1 = oneOfD(ws, { max: Infinity });

export const DNL = oneOfD("\n\r");
export const DNL1 = oneOfD("\n\r", { min: 1, max: Infinity });
export const DNL2 = oneOfD("\n\r", { id: "DNL2", min: 2, max: Infinity });

export const INT = xform(
	seq(
		[
			maybe(char("-")),
			alt([
				seq([stringD("0x"), oneOf(hexdigits, { max: Infinity })], {
					id: "hex",
				}),
				seq([stringD("0b"), oneOf("01", { max: Infinity })], {
					id: "bin",
				}),
				oneOf(digits, { id: "dec", max: Infinity }),
			]),
		],
		{ id: "int" }
	),
	(scope) => {
		if (scope.result) return scope;
		const [{ result: sign = "" }, digits] = scope.children!;
		const base = { bin: 2, dec: 10, hex: 16 }[digits.id];
		scope.result = parseInt(
			sign + (base === 10 ? digits.result : digits.children![0].result),
			base
		);
		delete scope.children;
		return scope;
	}
);
