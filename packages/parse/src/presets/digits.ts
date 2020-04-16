import { alt } from "../combinators/alt";
import { oneOrMore, zeroOrMore } from "../combinators/repeat";
import { range } from "../prims/range";

/**
 * Matches single decimal digit.
 */
export const DIGIT = range<string>("0", "9", "digit");

/**
 * Matches single hex digit (case insensitive).
 */
export const HEX_DIGIT = alt([
    DIGIT,
    range<string>("a", "f"),
    range<string>("A", "F"),
]);

/**
 * Matches zero or more {@link DIGIT}s.
 */
export const DIGITS_0 = zeroOrMore(DIGIT);

/**
 * Matches one or more {@link DIGIT}s.
 */
export const DIGITS_1 = oneOrMore(DIGIT);

/**
 * Matches one or more {@link HEX_DIGIT}s.
 */
export const HEX_DIGITS_1 = oneOrMore(HEX_DIGIT);
