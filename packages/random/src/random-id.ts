// SPDX-License-Identifier: Apache-2.0
import type { IRandom } from "./api.js";
import { SYSTEM } from "./system.js";

/**
 * Generates and returns a random string of `len` characters (default 4), plus
 * optional given `prefix` and using only provided `syms` characters (default
 * lowercase a-z).
 *
 * @remarks
 * See [thi.ng/ksuid](https://thi.ng/thi.ng/ksuid) for a more advanced and
 * collision-free approach.
 *
 * @example
 * ```ts tangle:../export/random-id.ts
 * import { randomID } from "@thi.ng/random";
 *
 * console.log(randomID());
 * "qgdt"
 *
 * console.log(randomID(8, "id-", "0123456789ABCDEF"));
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
	const n = syms.length;
	for (; len-- > 0; ) {
		prefix += syms[rnd.int() % n];
	}
	return prefix;
};
