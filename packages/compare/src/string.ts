import type { Comparator, NumOrString } from "@thi.ng/api";

/** @internal */
const BOUNDARY = /(\D\d|\d\D)/;

/**
 * Comparator intended for short tag-like strings containing compounds of words
 * and numbers (e.g. `2d` or `base36`). Splits strings at first digit/non-digit
 * boundary and if both inputs happen to contain such a boundary, compares
 * inputs pairwise, comparing each lexicographically (ascending order for
 * numeric parts)
 *
 * @example
 * ```ts tangle:../export/compare-lex.ts
 * import { compareLex } from "@thi.ng/compare";
 *
 * const src=["2d", "16bit", "base36", "8bit", "1d", "base8"];
 *
 * console.log("native", [...src].sort());
 * // [ '2d', '16bit', 'base36', '8bit', '1d', 'base8' ]
 *
 * console.log("compareLex", [...src].sort(compareLex));
 * // [ '1d', '2d', '8bit', '16bit', 'base8', 'base36' ]
 * ```
 *
 * @param a
 * @param b
 */
export const compareLex: Comparator<string> = (a, b) => {
	const ma = BOUNDARY.exec(a);
	const mb = BOUNDARY.exec(b);
	return ma && mb
		? __compare2(
				__maybeNum(a.substring(0, ma.index + 1)),
				__maybeNum(a.substring(ma.index + 1)),
				__maybeNum(b.substring(0, mb.index + 1)),
				__maybeNum(b.substring(mb.index + 1))
		  )
		: a < b
		? -1
		: a > b
		? 1
		: 0;
};

const __compare2 = (
	a1: NumOrString,
	a2: NumOrString,
	b1: NumOrString,
	b2: NumOrString
) => {
	const na = typeof a1 === "number";
	const nb = typeof b1 === "number";
	if (na !== nb) {
		// if not both sides are numbers, append a char < "0" to the numeric
		// part and then compare both sides as strings
		if (na) a1 += " ";
		else a2 += " ";
		if (nb) b1 += " ";
		else b2 += " ";
	}
	return a1 === b1 ? (a2 === b2 ? 0 : a2 < b2 ? -2 : 2) : a1 < b1 ? -1 : 1;
};

const __maybeNum = (x: string) => {
	const id = x.charCodeAt(0);
	return id >= 0x30 && id <= 0x39 ? +x : x;
};
