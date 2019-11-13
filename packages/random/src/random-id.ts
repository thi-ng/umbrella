import { IRandom } from "./api";
import { SYSTEM } from "./system";

/**
 * Generates and returns a random string of `len` characters (default
 * 4), plus optional given `prefix` and using only provided `syms`
 * characters (default lowercase a-z).
 *
 * ```ts
 * randomID()
 * "qgdt"
 *
 * randomID(8, "id-", "0123456789ABCDEF")
 * "id-94EF6E1A"
 * ```
 *
 * @param len -
 * @param prefix -
 * @param syms -
 * @param rnd -
 */
export const randomID = (
    len = 4,
    prefix = "",
    syms = "abcdefghijklmnopqrstuvwxyz",
    rnd: IRandom = SYSTEM
) => {
    for (const n = syms.length; --len >= 0; ) {
        prefix += syms[rnd.float(n) | 0];
    }
    return prefix;
};
