import type { Stringer } from "./api.js";

/**
 * Returns {@link Stringer} which formats given fractions as percentage (e.g.
 * `0.1234 => 12.34%`).
 *
 * @param prec - number of fractional digits (default: 0)
 */
export const percent =
    (prec = 0): Stringer<number> =>
    (x: number) =>
        (x * 100).toFixed(prec) + "%";
