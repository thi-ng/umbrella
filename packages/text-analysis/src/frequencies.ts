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
