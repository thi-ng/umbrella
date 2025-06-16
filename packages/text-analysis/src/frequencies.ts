import type { Fn, Fn2 } from "@thi.ng/api";
import { frequencies as $freq } from "@thi.ng/transducers/frequencies";
import { normFrequenciesAuto as $norm } from "@thi.ng/transducers/norm-frequencies-auto";
import { sortedFrequencies as $sorted } from "@thi.ng/transducers/sorted-frequencies";

/**
 * Reducer. Computes histogram of given inputs. Returns a Map with unique inputs
 * as keys and their occurrences as values.
 *
 * @remarks
 * Re-export of [eponymous function in
 * thi.ng/transducers](https://docs.thi.ng/umbrella/transducers/functions/frequencies.html)
 *
 * @example
 * ```ts tangle:../export/frequencies.ts
 * import { frequencies, tokenize } from "@thi.ng/text-analysis";
 *
 * console.log(
 *   frequencies(tokenize("to be or not to be"))
 * );
 * // Map(4) { "to": 2, "be": 2, "or": 1, "not": 1 }
 * ```
 */
export const frequencies = $freq;

/**
 * Similar to {@link frequencies}, but with each all values normalized (based on
 * total number of inputs received).
 *
 * @remarks
 * Re-export of [`normFrequenciesAuto()` in
 * thi.ng/transducers](https://docs.thi.ng/umbrella/transducers/functions/normFrequenciesAuto.html)
 *
 * @example
 * ```ts tangle:../export/norm-frequencies.ts
 * import { normFrequencies, tokenize } from "@thi.ng/text-analysis";
 *
 * console.log(
 *   normFrequencies(tokenize("to be or not to be"))
 * );
 * // Map(4) { "to": 0.333, "be": 0.333, "or": 0.166, "not": 0.166 }
 * ```
 */
export const normFrequencies = $norm;

/**
 * Reducer. Similar to {@link frequencies}, but instead of a Map produces an
 * array of `[key, frequency]`-pairs, sorted by the descending number of
 * occurrences of each distinct key/token.
 *
 * @remarks
 * Re-export of [eponymous function in
 * thi.ng/transducers](https://docs.thi.ng/umbrella/transducers/functions/sortedFrequencies.html)
 *
 * @example
 * ```ts tangle:../export/sorted-frequencies.ts
 * import { sortedFrequencies, tokenize } from "@thi.ng/text-analysis";
 *
 * console.log(
 *   sortedFrequencies(tokenize("to be or not to be"))
 * );
 * // [ [ "to", 2 ], [ "be", 2 ], [ "or", 1 ], [ "not", 1 ] ]
 * ```
 */
export const sortedFrequencies = $sorted;

/**
 * Takes an array of tokenized documents, a histogram function (`frequencies`)
 * and a predicate function (`pred`). First computes the combined histogram of
 * terms/works in all given docs using `frequencies`, then filters each document
 * using supplied predicate, which is called with a single word/token and its
 * computed frequency. Only words are kept for which the predicate succeeds.
 *
 * @remarks
 * See {@link frequencies} and {@link normFrequencies} for histogram creation.
 *
 * @example
 * ```ts tangle:../export/filter-docs-frequency.ts
 * import { filterDocsFrequency, frequencies } from "@thi.ng/text-analysis";
 *
 * const docs = [
 *   ["a", "b", "c"],
 *   ["a", "b", "d", "e"],
 *   ["b", "f", "g"],
 *   ["a", "b", "c", "f"],
 *   ["a", "g", "h"]
 * ];
 *
 * // only keep words which occur more than once
 * const filtered = filterDocsFrequency(docs, frequencies, (_, x) => x > 1);
 *
 * // show before & after
 * for(let i = 0; i < docs.length; i++) console.log(docs[i], "=>", filtered[i]);
 * // [ "a", "b", "c" ] => [ "a", "b", "c" ]
 * // [ "a", "b", "d", "e" ] => [ "a", "b" ]
 * // [ "b", "f", "g" ] => [ "b", "f", "g" ]
 * // [ "a", "b", "c", "f" ] => [ "a", "b", "c", "f" ]
 * // [ "a", "g", "h" ] => [ "a", "g" ]
 * ```
 *
 * @param docs
 * @param frequencies
 * @param pred
 */
export const filterDocsFrequency = (
	docs: string[][],
	frequencies: Fn<Iterable<string>, Map<string, number>>,
	pred: Fn2<string, number, boolean>
) => {
	const histogram = frequencies(docs.flat());
	return docs.map((doc) =>
		doc.filter((word) => {
			const freq = histogram.get(word);
			return freq !== undefined && pred(word, freq);
		})
	);
};
