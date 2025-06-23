// SPDX-License-Identifier: Apache-2.0
import { bidirIndexFromJSON, defBidirIndex } from "@thi.ng/bidir-index";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { isString } from "@thi.ng/checks/is-string";
import { mapcat } from "@thi.ng/transducers/mapcat";
import type { SerializedVocab, Vocab } from "./api.js";

/**
 * Creates a bi-directional index storing unique tokens from given `src`
 * iterable, optionally using custom `start` ID offset (default: 0). This index
 * can then be used with {@link encodeDense}, {@link encodeSparse} and related
 * functions.
 *
 * @remarks
 * This function is syntax sugar for
 * [thi.ng/bidir-index](https://thi.ng/bidir-index).
 *
 * The vocab/index can be serialized to JSON and then re-created via
 * `defVocab()`.
 *
 * @example
 * ```ts tangle:../export/def-vocab.ts
 * import { defVocab, tokenize } from "@thi.ng/text-analysis";
 *
 * const vocab = defVocab(
 *   tokenize("the quick brown fox jumps over the lazy dog")
 * );
 *
 * console.log([...vocab.entries()]);
 * // [
 * //   [ "the", 0 ],
 * //   [ "quick", 1 ],
 * //   [ "brown", 2 ],
 * //   [ "fox", 3 ],
 * //   [ "jumps", 4 ],
 * //   [ "over", 5 ],
 * //   [ "lazy", 6 ],
 * //   [ "dog", 7 ]
 * // ]
 *
 * console.log(vocab.get("fox"))
 * // 3
 *
 * console.log(vocab.getID(3))
 * // "fox"
 * ```
 *
 * @param src
 * @param start
 */
export function defVocab(
	src: Iterable<string> | Iterable<string>[],
	start?: number
): Vocab;
/**
 * (Re)creates bi-directional vocab index from previous serialized state (e.g.
 * via `vocab.toJSON()`).
 *
 * @param vocab
 */
export function defVocab(vocab: SerializedVocab): Vocab;
export function defVocab(
	src: Iterable<string> | Iterable<string>[] | SerializedVocab,
	start?: number
) {
	return isIterable(src)
		? defBidirIndex(
				mapcat((x: Iterable<string>) => (isString(x) ? [x] : x), src),
				{ start }
		  )
		: bidirIndexFromJSON(src);
}
