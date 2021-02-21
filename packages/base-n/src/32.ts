import { defBase } from "./base";

/**
 * Digits: A-Z 2-7
 *
 * @remarks
 * Reference: https://tools.ietf.org/html/rfc4648
 */
export const BASE32_RFC4648 = defBase("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");

/**
 * Digits: 0-9 A-V
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Base32#base32hex
 */
export const BASE32_HEX = defBase("0123456789ABCDEFGHIJKLMNOPQRSTUV");
