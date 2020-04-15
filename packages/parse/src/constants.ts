import { alt } from "./combinators/alt";
import { maybe } from "./combinators/maybe";
import { oneOrMore, zeroOrMore } from "./combinators/repeat";
import { seq } from "./combinators/seq";
import { xform } from "./combinators/xform";
import { lit } from "./prims/lit";
import { oneOf } from "./prims/one-of";
import { range } from "./prims/range";
import { xfFloat, xfInt } from "./xform/number";

export const WS = oneOf(" \t\n\r");

export const DIGIT = range<string>("0", "9");

export const HEX_DIGIT = alt([
    DIGIT,
    range<string>("a", "f"),
    range<string>("A", "F"),
]);

export const ALPHA = alt([range<string>("a", "z"), range<string>("A", "Z")]);

export const ALPHA_NUM = alt([ALPHA, DIGIT]);

export const DIGITS_0 = zeroOrMore(DIGIT);

export const DIGITS_1 = oneOrMore(DIGIT);

export const HEX_DIGITS_1 = oneOrMore(HEX_DIGIT);

const SIGN = maybe(oneOf("-+"));

const EXP = maybe(seq([maybe(oneOf("eE")), SIGN, DIGITS_1]));

const DOT = lit(".");

const FRACT0 = maybe(seq([DOT, maybe(DIGITS_0)]));
const FRACT1 = seq([DOT, DIGITS_1]);

export const INT = xform(seq([SIGN, DIGITS_1]), xfInt());

export const UINT = xform(DIGITS_1, xfInt());

export const HEX_UINT = xform(HEX_DIGITS_1, xfInt(16));

export const FLOAT = xform(
    seq([SIGN, alt([FRACT1, seq([DIGITS_1, FRACT0])]), EXP]),
    xfFloat
);
