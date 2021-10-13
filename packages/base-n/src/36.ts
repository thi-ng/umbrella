import { defBase } from "./base.js";

export const B36_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Digits: 0-9 A-Z
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base36
 */
export const BASE36 = defBase(B36_CHARS);
