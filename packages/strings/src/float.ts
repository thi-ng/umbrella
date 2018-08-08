import { memoizeJ } from "@thi.ng/memoize/memoizej";

import { Stringer } from "./api";

/**
 * Returns `Stringer` which formats numbers to given precision.
 *
 * @param len number of fractional digits
 * @kind function
 */
export const float = memoizeJ(
    (prec: number): Stringer<number> =>
        (x: number) => x.toFixed(prec)
);
