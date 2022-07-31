import {
	ALPHA as _ALPHA,
	ALPHA_NUM as _ALPHA_NUM,
} from "@thi.ng/strings/groups";
import { oneOf } from "../prims/one-of.js";
import { range } from "../prims/range.js";

/**
 * Matches single char in `a` - `z` range.
 */
export const LOWER_CASE = range("a", "z");

/**
 * Matches single char in `A` - `Z` range.
 */
export const UPPER_CASE = range("A", "Z");

/**
 * Matches single in {@link LOWER_CASE} or {@link UPPER_CASE}.
 */
export const ALPHA = oneOf(_ALPHA);

/**
 * Matches single in {@link ALPHA} or {@link DIGIT}.
 */
export const ALPHA_NUM = oneOf(_ALPHA_NUM);
