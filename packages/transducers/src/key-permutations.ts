import type { IObjectOf, Pair } from "@thi.ng/api";
import { assocObj } from "./assoc-obj.js";
import { map } from "./map.js";
import { mapcat } from "./mapcat.js";
import { pairs } from "./pairs.js";
import { partition } from "./partition.js";
import { permutations } from "./permutations.js";

/**
 * Similar to {@link permutations}, however takes an object with each
 * key specifying an array of its possible values. Yields an iterable of
 * objects of all value permutations.
 *
 * @remarks
 * The resulting object type will be derived from the value types in the
 * given `spec` object.
 *
 * The order of resulting permutations is not guaranteed and depending
 * on the VM's iteration behavior of `Object.keys()`.
 *
 * @example
 * ```ts
 * import { keyPermutations } from "@thi.ng/transducers";
 *
 * [...keyPermutations({ a: [1, 2], b: [true, false], c: ["X", "Y"] })]
 * // [
 * //   { a: 1, b: true, c: 'X' },
 * //   { a: 1, b: true, c: 'Y' },
 * //   { a: 1, b: false, c: 'X' },
 * //   { a: 1, b: false, c: 'Y' },
 * //   { a: 2, b: true, c: 'X' },
 * //   { a: 2, b: true, c: 'Y' },
 * //   { a: 2, b: false, c: 'X' },
 * //   { a: 2, b: false, c: 'Y' }
 * // ]
 * ```
 *
 * @param spec - permutation spec object
 */
export const keyPermutations = <T extends IObjectOf<any[]>>(
	spec: T
): IterableIterator<{ [k in keyof T]: T[k][0] }> =>
	<any>(
		map(
			(x) => assocObj(<Iterable<Pair<string, any>>>partition(2, x)),
			permutations(...mapcat(([k, v]) => [[k], v], pairs(spec)))
		)
	);
