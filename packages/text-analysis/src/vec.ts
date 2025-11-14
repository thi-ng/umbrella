// SPDX-License-Identifier: Apache-2.0
import type { ReadonlyVec } from "@thi.ng/vectors";
import type { Vocab } from "./api.js";
import { defVocab } from "./vocab.js";

/**
 * Encodes the given `doc` tokens into a dense multi-hot vector using provided
 * `vocab` (e.g. created via {@link defVocab}). The vector size is the number of
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
 * @param doc
 */
export const encodeDense = (vocab: Vocab, doc: Iterable<string>) =>
	toDense(vocab.size, vocab.getAll(doc));

/**
 * Convenience function to create a vocabulary from given docs and encode each
 * doc into a dense multi-hot vector (using {@link encodeDense}).
 *
 * @param docs
 */
export const encodeAllDense = (docs: string[][]) => {
	const vocab = defVocab(docs);
	return {
		vocab,
		docs: docs.map((x) => encodeDense(vocab, x)),
	};
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
export const encodeSparse = (
	vocab: Vocab,
	src: Iterable<string>
): ReadonlyVec => [...vocab.getAllUnique(src)].sort((a, b) => a - b);

/**
 * Convenience function to create a vocabulary from given docs and encode each
 * doc into a sparse multi-hot vector (using {@link encodeSparse}).
 *
 * @param docs
 */
export const encodeAllSparse = (docs: string[][]) => {
	const vocab = defVocab(docs);
	return {
		vocab,
		docs: docs.map((x) => encodeSparse(vocab, x)),
	};
};

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

/**
 * Converts given multi-hot sparse vector (e.g. created via {@link encodeSparse}
 * into a dense representation.
 *
 * @param dim
 * @param sparse
 */
export const toDense = (dim: number, sparse: ReadonlyVec): ReadonlyVec => {
	const res = new Array<number>(dim).fill(0);
	for (const i of sparse) res[i] = 1;
	return res;
};

/**
 * Converts given multi-hot dense vector (e.g. created via {@link encodeDense})
 * into a sparse representation.
 *
 * @param dense
 */
export const toSparse = (dense: ReadonlyVec): ReadonlyVec => {
	const res: number[] = [];
	for (let i = 0, n = dense.length; i < n; i++) {
		if (dense[i]) res.push(i);
	}
	return res;
};
