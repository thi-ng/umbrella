import { defBase } from "./base.js";
import * as c from "./chars/36.js";
export * from "./chars/36.js";

/**
 * Digits: 0-9 A-Z
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base36
 */
export const BASE36 = defBase(c.B36_CHARS);
