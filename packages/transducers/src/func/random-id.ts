import { choices } from "../iter/choices";
import { take } from "../xform/take";

/**
 * Generates and returns a random string of `len` characters (default
 * 4), plus optional given `prefix` and using only provided `syms`
 * characters (default lowercase a-z).
 *
 * ```
 * randomID()
 * "qgdt"
 *
 * randomID(8, "id-", "0123456789ABCDEF")
 * "id-94EF6E1A"
 * ```
 *
 * @param len
 * @param prefix
 * @param syms
 */
export const randomID = (len = 4, prefix = "", syms = "abcdefghijklmnopqrstuvwxyz") =>
    [prefix, ...take(len, choices(syms))].join("");
