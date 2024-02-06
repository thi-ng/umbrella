import { defBase } from "./base.js";
import * as c from "./chars/85.js";
export * from "./chars/85.js";

/**
 * Reference: https://en.wikipedia.org/wiki/Ascii85
 */
export const BASE85 = defBase(c.B85_CHARS);
