import { defBase } from "./base.js";

export const B58_CHARS =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

/**
 * Reference: https://en.wikipedia.org/wiki/Binary-to-text_encoding
 */
export const BASE58 = defBase(B58_CHARS);
