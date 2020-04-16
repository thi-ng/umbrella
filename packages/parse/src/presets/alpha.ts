import { range } from "../prims/range";
import { alt } from "../combinators/alt";
import { DIGIT } from "./digits";

/**
 * Matches single char in `a` - `z` range.
 */
export const LOWER_CASE = range<string>("a", "z");

/**
 * Matches single char in `A` - `Z` range.
 */
export const UPPER_CASE = range<string>("A", "Z");

/**
 * Matches single in {@link LOWER_CASE} or {@link UPPER_CASE}.
 */
export const ALPHA = alt([LOWER_CASE, UPPER_CASE]);

/**
 * Matches single in {@link ALPHA} or {@link DIGIT}.
 */
export const ALPHA_NUM = alt([ALPHA, DIGIT]);
