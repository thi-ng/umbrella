import { defBase } from "./base.js";
import * as c from "./chars/26.js";
export * from "./chars/26.js";

/**
 * Digits: A-Z
 */
export const BASE26_UC = defBase(c.B26_UC_CHARS);

/**
 * Digits: a-z
 */
export const BASE26_LC = defBase(c.B26_LC_CHARS);

/**
 * Alias for {@link BASE26_LC}
 */
export const BASE26 = BASE26_LC;
