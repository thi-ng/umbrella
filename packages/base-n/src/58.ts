import { defBase } from "./base.js";

const D = "123456789";
const U = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const L = "abcdefghijkmnopqrstuvwxyz";

export const B58_CHARS_UC = D + U + L;

export const B58_CHARS_LC = D + L + U;

export const B58_CHARS = B58_CHARS_UC;

/**
 * Reference: https://en.wikipedia.org/wiki/Binary-to-text_encoding
 */
export const BASE58_UC = defBase(B58_CHARS_UC);

/**
 * Alias for {@link BASE58_UC}.
 */
export const BASE58 = BASE58_UC;

/**
 * Alt version of Base58 which uses {@link B58_CHARS_LC}.
 */
export const BASE58_LC = defBase(B58_CHARS_LC);
