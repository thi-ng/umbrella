// SPDX-License-Identifier: Apache-2.0
import { comp } from "@thi.ng/transducers/comp";
import { filter } from "@thi.ng/transducers/filter";
import { map } from "@thi.ng/transducers/map";
import type { Vocab } from "./api.js";
import { stemWord } from "./stem.js";

const RE_NON_ALPHA = /[^A-Za-z\u00c0-\u017f]/g;

const RE_NON_ALPHANUM = /[^0-9A-Za-z\u00c0-\u017f]/g;

/**
 * Trnasducer to produce lowercase string.
 */
export const lowercase = map((x: string) => x.toLowerCase());

/**
 * Trnasducer which collapses multiple whitespace chars into one.
 */
export const collapseWS = map((x: string) => x.replace(/\s+/g, " "));

/**
 * Transducer which removes empty or whitespace-only strings/tokens.
 */
export const removeEmpty = filter((x: string) => !/^\s*$/.test(x));

/**
 * Transducer which removes non-alphabetic chars from input, using
 * {@link RE_NON_ALPHA}.
 */
export const removeNonAlpha = comp(
	map((x: string) => x.replace(RE_NON_ALPHA, "")),
	removeEmpty
);

/**
 * Transducer which removes non-alphabetic chars from input, using
 * {@link RE_NON_ALPHANUM}.
 */
export const removeNonAlphaNum = comp(
	map((x: string) => x.replace(RE_NON_ALPHANUM, "")),
	removeEmpty
);

/**
 * Transducer which removes tokens with their length outside the configured
 * `[min,max]` range.
 *
 * @param min
 * @param max
 */
export const minMaxLength = (min: number, max: number) =>
	filter((x: string) => x.length >= min && x.length <= max);

/**
 * Transducer version of {@link stemWord}.
 */
export const stemOnly = map(stemWord);

/**
 * Transducer which removes tokens which are not present in given `vocab`.
 *
 * @param vocab
 */
export const vocabOnly = (vocab: Vocab) => filter((x: string) => vocab.has(x));
