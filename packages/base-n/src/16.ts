import { __B16_LC_CHARS, defBase } from "./base.js";

export const B16_UC_CHARS = "0123456789ABCDEF";

export const B16_LC_CHARS = __B16_LC_CHARS;

/**
 * Alias for {@link B16_LC_CHARS}
 */
export const B16_CHARS = B16_LC_CHARS;

/**
 * Digits: 0-9 A-F
 */
export const BASE16_UC = defBase(B16_UC_CHARS);

/**
 * Digits: 0-9 a-f
 */
export const BASE16_LC = defBase(B16_LC_CHARS);

/**
 * Alias for {@link BASE16_LC}
 */
export const BASE16 = BASE16_LC;
