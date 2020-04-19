import { oneOrMore } from "../combinators/repeat";
import { range } from "../prims/range";

/**
 * Matches single decimal digit.
 */
export const DIGIT = range("0", "9", "digit");

/**
 * Matches one or more {@link DIGIT}s.
 */
export const DIGITS = oneOrMore(DIGIT);
