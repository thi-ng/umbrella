import { oneOrMore } from "../combinators/repeat.js";
import { range } from "../prims/range.js";

/**
 * Matches single decimal digit.
 */
export const DIGIT = range("0", "9", "digit");

/**
 * Matches one or more {@link DIGIT}s.
 */
export const DIGITS = oneOrMore(DIGIT);
