import type { IObjectOf } from "@thi.ng/api";
import { charRange } from "./range";

const defGroup = (...xs: Iterable<string>[]) => {
    const acc: IObjectOf<boolean> = {};
    for (let range of xs) {
        for (let c of range) {
            acc[c] = true;
        }
    }
    return Object.freeze(acc);
};

/**
 * Object with whitespace characters as keys and their values set to
 * true. All others undefined.
 */
export const WS: IObjectOf<boolean> = Object.freeze({
    "\t": true,
    "\n": true,
    "\v": true,
    "\f": true,
    "\r": true,
    " ": true,
});

/**
 * Object with 0-9 characters as keys and their values set to true. All
 * others undefined.
 */
export const DIGITS = defGroup(charRange("0", "9"));

/**
 * Object with hex digit characters (upper & lower case versions) as
 * keys and their values set to true. All others undefined.
 */
export const HEX = defGroup(
    charRange("0", "9"),
    charRange("A", "F"),
    charRange("a", "f")
);

/**
 * Object with ASCII lowercase characters as keys and their values set
 * to true. All others undefined.
 */
export const LOWER = defGroup(charRange("a", "z"));

/**
 * Object with ASCII uppercase characters as keys and their values set
 * to true. All others undefined.
 */
export const UPPER = defGroup(charRange("A", "Z"));

/**
 * Combination of {@link UPPER} and {@link LOWER}.
 */
export const ALPHA = Object.freeze({ ...UPPER, ...LOWER });

/**
 * Combination of {@link ALPHA} and {@link DIGITS} and '_'.
 */
export const ALPHA_NUM: IObjectOf<boolean> = Object.freeze({
    ...ALPHA,
    ...DIGITS,
    _: true,
});

/**
 * Object with ASCII punctuation characters as keys and their values set
 * to true. All others undefined.
 */
export const PUNCTUATION = defGroup(
    charRange("!", "/"),
    charRange(":", "@"),
    charRange("[", "`"),
    charRange("{", "~")
);
