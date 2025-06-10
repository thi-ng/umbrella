import {
	bidirIndexFromJSON,
	defBidirIndex,
	type BidirIndex,
	type SerializedBidirIndex,
} from "@thi.ng/bidir-index";
import { isIterable } from "@thi.ng/checks/is-iterable";

export type Vocab = BidirIndex<string>;

export type SerializedVocab = SerializedBidirIndex<string>;

/**
 * Creates a bi-directional index storing unique tokens from given `src`
 * iterable, optionally using custom `start` ID offset (default: 0). This index
 * can then be used with {@link vectorize}, {@link vectorizeSparse}.
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
export function defVocab(src: Iterable<string>, start?: number): Vocab;
/**
 * (Re)creates bi-directional vocab index from previous serialized state (e.g.
 * via `vocab.toJSON()`).
 *
 * @param vocab
 */
export function defVocab(vocab: SerializedVocab): Vocab;
export function defVocab(
	src: Iterable<string> | SerializedVocab,
	start?: number
) {
	return isIterable(src)
		? defBidirIndex(src, { start })
		: bidirIndexFromJSON(src);
}

/**
 * Encodes the given `src` tokens into a dense multi-hot vector using provided
 * `vocab` (created via {@link defVocab}). The vector size is the number of
 * items in the vocab.
 *
 * @remarks
 * Also see {@link encodeSparse}.
 *
 * @example
 * ```ts tangle:../export/encode-dense.ts
 * import { defVocab, encodeDense, tokenize } from "@thi.ng/text-analysis";
 *
 * const vocab = defVocab(
 *   tokenize("the quick brown fox jumps over the lazy dog")
 * );
 *
 * console.log(encodeDense(vocab, tokenize("the brown dog jumps")));
 * // [ 1, 0, 1, 0, 1, 0, 0, 1 ]
 *
 * console.log(encodeDense(vocab, tokenize("the lazy fox")));
 * // [ 1, 0, 0, 1, 0, 0, 1, 0 ]
 * ```
 *
 * @param vocab
 * @param src
 */
export const encodeDense = (vocab: Vocab, src: Iterable<string>) => {
	const vec = new Array(vocab.size).fill(0);
	for (const i of vocab.getAll(src)) vec[i] = 1;
	return vec;
};

/**
 * Encodes the given `src` tokens into a sparse vector using provided `vocab`
 * (created via {@link defVocab}). Only the IDs of matched tokens are stored.
 * The returned vector size depends on the number of used/matched tokens, at
 * most `vocab.size` (if entire vocab is used by `src`).
 *
 * @remarks
 * Also see {@link encodeDense} for alternative encoding.
 *
 * @example
 * ```ts tangle:../export/encode-sparse.ts
 * import { defVocab, encodeSparse, tokenize } from "@thi.ng/text-analysis";
 *
 * const vocab = defVocab(
 *   tokenize("the quick brown fox jumps over the lazy dog")
 * );
 *
 * console.log(encodeSparse(vocab, tokenize("the brown dog jumps")));
 * // [ 0, 2, 4, 7 ]
 *
 * console.log(encodeSparse(vocab, tokenize("the lazy fox")));
 * // [ 0, 3, 6 ]
 * ```
 *
 * @param vocab
 * @param src
 */
export const encodeSparse = (vocab: Vocab, src: Iterable<string>) =>
	[...vocab.getAllUnique(src)].sort((a, b) => a - b);

/**
 * Reverse op of {@link encodeDense}. Decodes dense multi-hot vector to extract
 * tokens from provided `vocab` (created via {@link defVocab}). The returned
 * array only contains the corresponding tokens of the vector's non-zero
 * components.
 *
 * @remarks
 * Also see {@link decodeSparse}.
 *
 * @example
 * ```ts tangle:../export/decode-dense.ts
 * import { defVocab, decodeDense, tokenize } from "@thi.ng/text-analysis";
 *
 * const vocab = defVocab(
 *   tokenize("the quick brown fox jumps over the lazy dog")
 * );
 *
 * console.log(decodeDense(vocab, [1, 0, 1, 0, 1, 0, 0, 1]));
 * // [ "the", "brown", "jumps", "dog" ]
 *
 * console.log(decodeDense(vocab, [1, 0, 0, 1, 0, 0, 1, 0]));
 * // [ "the", "fox", "lazy" ]
 * ```
 *
 * @param vocab
 * @param src
 * @param sort
 */
export const decodeDense = (vocab: Vocab, vec: Iterable<number>) => {
	const res: string[] = [];
	let i = 0;
	for (const x of vec) {
		if (x) res.push(vocab.getID(i)!);
		i++;
	}
	return res;
};

/**
 * Reverse op of {@link encodeSparse}. Decodes sparse vector (created via
 * {@link encodeSparse} to extract tokens from provided `vocab` (created via
 * {@link defVocab}).
 *
 * @remarks
 * Also see {@link decodeDense}.
 *
 * @example
 * ```ts tangle:../export/decode-sparse.ts
 * import { defVocab, decodeSparse, tokenize } from "@thi.ng/text-analysis";
 *
 * const vocab = defVocab(
 *   tokenize("the quick brown fox jumps over the lazy dog")
 * );
 *
 * console.log(decodeSparse(vocab, [0, 2, 4, 7]));
 * // [ "the", "brown", "jumps", "dog" ]
 *
 * console.log(decodeSparse(vocab, [0, 3, 6]));
 * // [ "the", "fox", "lazy" ]
 * ```
 *
 * @param vocab
 * @param src
 * @param sort
 */
export const decodeSparse = (vocab: Vocab, vec: Iterable<number>) =>
	vocab.getAllIDs(vec);
