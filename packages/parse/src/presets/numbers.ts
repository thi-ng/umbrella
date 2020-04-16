import { alt } from "../combinators/alt";
import { maybe } from "../combinators/maybe";
import { seq } from "../combinators/seq";
import { xform } from "../combinators/xform";
import { lit } from "../prims/lit";
import { oneOf } from "../prims/one-of";
import { xfFloat, xfInt } from "../xform/number";
import { DIGITS_0, DIGITS_1, HEX_DIGITS_1 } from "./digits";

/**
 * Matches single `+` or `-` char.
 */
export const SIGN = maybe(oneOf("-+"));

/**
 * Matches optionally signed {@link DIGITS_1} and result transformed w/
 * {@link xfInt} to JS number.
 */
export const INT = xform(seq([SIGN, DIGITS_1], "int"), xfInt());

/**
 * Matches same as {@link DIGITS_1}, but result transformed w/
 * {@link xfInt} to JS number.
 */
export const UINT = xform(DIGITS_1, xfInt());

/**
 * Matches same as {@link HEX_DIGITS_1}, but result transformed w/
 * {@link xfInt} to JS number.
 */
export const HEX_UINT = xform(HEX_DIGITS_1, xfInt(16));

const EXP = maybe(seq([maybe(oneOf("eE")), SIGN, DIGITS_1]));

const DOT = lit(".");

const FRACT0 = maybe(seq([DOT, DIGITS_0]));
const FRACT1 = seq([DOT, DIGITS_1]);

/**
 * Matches IEEE754 floating point number and transforms result w/
 * {@link xfFloat}.
 */
export const FLOAT = xform(
    seq([SIGN, alt([FRACT1, seq([DIGITS_1, FRACT0])]), EXP], "float"),
    xfFloat
);
