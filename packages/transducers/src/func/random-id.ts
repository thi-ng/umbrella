import { IRandom, SYSTEM } from "@thi.ng/random";
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
 * @param rnd
 */
export const randomID =
    (len = 4, prefix = "", syms = "abcdefghijklmnopqrstuvwxyz", rnd: IRandom = SYSTEM) =>
        [prefix, ...take(len, choices(syms, null, rnd))].join("");
