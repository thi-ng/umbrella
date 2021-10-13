import { HEX } from "@thi.ng/strings/groups";
import { oneOrMore, repeat } from "../combinators/repeat.js";
import { xform } from "../combinators/xform.js";
import { oneOf } from "../prims/one-of.js";
import { xfInt } from "../xform/number.js";

/**
 * Matches single hex digit (case insensitive).
 */
export const HEX_DIGIT = oneOf(HEX);

/**
 * Matches one or more {@link HEX_DIGIT}s.
 */
export const HEX_DIGITS = oneOrMore(HEX_DIGIT);

/**
 * Matches 1-8 successive {@link HEX_DIGIT} and transforms with
 * {@link xfInt} to JS number.
 */
export const HEX_UINT = xform(repeat(HEX_DIGIT, 1, 8, "uint"), xfInt(16));
