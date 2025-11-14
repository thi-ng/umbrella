// SPDX-License-Identifier: Apache-2.0
import type { Stringer } from "./api.js";

/**
 * Formats given value `x` as Fortran style Hollerith string.
 *
 * @remarks
 * References:
 *
 * - https://en.wikipedia.org/wiki/Hollerith_constant
 * - https://en.wikipedia.org/wiki/IGES#File_format
 *
 * @example
 * ```ts tangle:../export/hstr.ts
 * import { hstr } from "@thi.ng/strings";
 *
 * console.log(hstr("abc"));  // "3Habc"
 * console.log(hstr(123.45)); // "6H123.45"
 * console.log(hstr(""));     // "0H"
 * console.log(hstr(null));   // ""
 * ```
 *
 * @param x -
 */
export const hstr: Stringer<any> = (x) =>
	x != null ? ((x = x.toString()), `${x.length}H${x}`) : "";
