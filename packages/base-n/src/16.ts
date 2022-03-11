import { defBase } from "./base.js";

export const B16_UC_CHARS = "0123456789ABCDEF";

export const B16_LC_CHARS = "0123456789abcdef";

/**
 * Digits: 0-9 A-F
 */
export const BASE16_UC = defBase(B16_UC_CHARS);

/**
 * Digits: 0-9 a-f
 */
export const BASE16_LC = defBase(B16_LC_CHARS);
