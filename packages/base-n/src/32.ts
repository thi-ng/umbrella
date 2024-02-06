import { defBase } from "./base.js";
import * as c from "./chars/32.js";
export * from "./chars/32.js";

/**
 * Digits: A-Z 2-7
 *
 * @remarks
 * Reference: https://tools.ietf.org/html/rfc4648
 */
export const BASE32_RFC4648 = defBase(c.B32_RFC4648_CHARS);

/**
 * Alias for {@link BASE32_RFC4648}
 */
export const BASE32 = BASE32_RFC4648;

/**
 * Digits: 0-9 A-V
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base32#base32hex
 */
export const BASE32_HEX = defBase(c.B32_HEX_CHARS);

/**
 * Digits: 0-9 A-Z (excl. I,L,O,U)
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base32#Crockford's_Base32
 */
export const BASE32_CROCKFORD = defBase(c.B32_CROCKFORD_CHARS);
