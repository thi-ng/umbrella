import { Stringer } from "./api";

/**
 * Uppercase string formatter.
 *
 * @param x string to transform
 */
export const upper: Stringer<string> =
    (x: string) => x.toUpperCase();

/**
 * Lowercase string formatter.
 *
 * @param x string to transform
 */
export const lower: Stringer<string> =
    (x: string) => x.toLowerCase();

/**
 * String formatter which capitalizes first character.
 *
 * @param x string to transform
 */
export const capitalize: Stringer<string> =
    (x: string) => x[0].toUpperCase() + x.substr(1);
