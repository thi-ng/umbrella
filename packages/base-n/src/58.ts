import { defBase } from "./base.js";
import * as c from "./chars/58.js";
export * from "./chars/58.js";

/**
 * Reference: https://en.wikipedia.org/wiki/Binary-to-text_encoding
 */
export const BASE58_UC = defBase(c.B58_CHARS_UC);

/**
 * Alias for {@link BASE58_UC}.
 */
export const BASE58 = BASE58_UC;

/**
 * Alt version of Base58 which uses {@link B58_CHARS_LC}.
 */
export const BASE58_LC = defBase(c.B58_CHARS_LC);
