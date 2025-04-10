import { implementsFunction } from "@thi.ng/checks/implements-function";
import type { ReadonlyVec } from "@thi.ng/vec-api";

/**
 * Copies 2D vector `a`, with optional support of
 * [`ICopy`](https://docs.thi.ng/umbrella/api/interfaces/ICopy.html)
 *
 * @param a - input vector
 */
export const copy2 = (a: ReadonlyVec) =>
	implementsFunction(a, "copy") ? a.copy() : [a[0], a[1]];
