import { alt } from "../combinators/alt.js";
import { maybe } from "../combinators/maybe.js";
import { zeroOrMore } from "../combinators/repeat.js";
import { seq } from "../combinators/seq.js";
import { xform } from "../combinators/xform.js";
import { lit } from "../prims/lit.js";
import { oneOf } from "../prims/one-of.js";
import { comp } from "../xform/comp.js";
import { join } from "../xform/join.js";
import { xfFloat, xfInt } from "../xform/number.js";
import { xfID } from "../xform/with-id.js";
import { DIGIT, DIGITS } from "./digits.js";

/**
 * Matches single `+` or `-` char.
 */
export const SIGN = maybe(oneOf("-+"));

/**
 * Matches optionally signed {@link DIGITS} and result transformed w/
 * {@link xfInt} to JS number.
 */
export const INT = xform(seq([SIGN, DIGITS], "int"), xfInt());

/**
 * Matches same as {@link DIGITS} but result transformed w/
 * {@link xfInt} to JS number.
 */
export const UINT = xform(DIGITS, comp(xfID("uint"), xfInt()));

const EXP = maybe(seq([maybe(oneOf("eE")), SIGN, DIGITS]));

const DOT = lit(".");

const FRACT0 = maybe(seq([DOT, zeroOrMore(DIGIT)]));
const FRACT1 = seq([DOT, DIGITS]);

const _REAL = seq([SIGN, alt([FRACT1, seq([DIGITS, FRACT0])]), EXP], "real");

/**
 * Matches IEEE754 floating point number.
 */
export const REAL = join(_REAL);

/**
 * Like {@link REAL} but transforms result w/ {@link xfFloat} to JS
 * number.
 */
export const FLOAT = xform(_REAL, xfFloat);
