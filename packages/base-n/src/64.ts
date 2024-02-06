import { defBase } from "./base.js";
import * as c from "./chars/64.js";
export * from "./chars/64.js";

/**
 * Digits: 0-9 A-Z a-z + /
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base64
 *
 * Note: This encoder does NOT perform automatic padding (i.e. `=`-suffixes)
 */
export const BASE64 = defBase(c.B64_CHARS);
