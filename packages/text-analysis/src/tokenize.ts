// SPDX-License-Identifier: Apache-2.0
import { split } from "@thi.ng/strings";
import type { Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { iterator } from "@thi.ng/transducers/iterator";

/**
 * Customizable string tokenizer with optional transducer-based token
 * transformation(s). Yields an iterator of tokens.
 *
 * @remarks
 * The package provides a number of composable string transducers which can be
 * listed here and will be applied in sequence for each input token.
 *
 * @example
 * ```ts tangle:../export/tokenize.ts
 * import * as ta from "@thi.ng/text-analysis";
 *
 * const input = `Do not go gentle into that good night,
 *   Old age should burn and rave at close of day;
 *   Rage, rage against the dying of the light.
 *
 *   Though wise men at their end know dark is right,
 *   Because their words had forked no lightning they
 *   Do not go gentle into that good night.`;
 *
 * // tokenize input with given token transforms
 * // collect tokens into array
 * const tokens = [...ta.tokenize(
 *   input,
 *   [
 *     ta.lowercase,
 *     ta.removeNonAlphaNum,
 *     ta.removeStopWords()
 *   ]
 * )];
 *
 * console.log(tokens);
 * // [
 * //   "do", "not", "go", "gentle", "good", "night", "old", "age",
 * //   "burn", "rave", "close", "day", "rage", "rage", "dying", "light",
 * //   ...
 * // ]
 *
 * console.log(
 *   [...ta.tokenize(input, [ta.ngrams(2)])]
 * );
 * ```
 *
 * @param src
 * @param xforms
 * @param delim
 * @param includeDelim
 */
export const tokenize = (
	src: string,
	xforms?: Transducer<string, string>[],
	delim: RegExp | string = /[ \t\n\r,;:/?!()\[\]]+/g,
	includeDelim = false
) => {
	const $src = split(src, delim, includeDelim);
	return xforms
		? iterator(comp(...(<[Transducer<string, string>]>xforms)), $src)
		: $src;
};
