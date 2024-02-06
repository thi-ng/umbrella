import { defBase } from "./base.js";
import * as c from "./chars/16.js";
export * from "./chars/16.js";

/**
 * Digits: 0-9 A-F
 */
export const BASE16_UC = defBase(c.B16_UC_CHARS);

/**
 * Digits: 0-9 a-f
 */
export const BASE16_LC = defBase(c.B16_LC_CHARS);

/**
 * Alias for {@link BASE16_LC}
 */
export const BASE16 = BASE16_LC;
