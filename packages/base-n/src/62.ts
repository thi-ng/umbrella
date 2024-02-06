import { defBase } from "./base.js";
import * as c from "./chars/62.js";
export * from "./chars/62.js";

/**
 * Digits: 0-9 A-Z a-z
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base62
 */
export const BASE62 = defBase(c.B62_CHARS);
