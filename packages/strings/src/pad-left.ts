import { memoizeJ } from "@thi.ng/memoize";
import type { Stringer } from "./api";
import { repeat } from "./repeat";

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
export const padLeft: (
    n: number,
    ch?: string | number
) => Stringer<any> = memoizeJ<
    number,
    string | number | undefined,
    Stringer<any>
>((n, ch = " ") => {
    const buf = repeat(String(ch), n);
    return (x: any) =>
        x != null
            ? ((x = x.toString()), x.length < n ? buf.substr(x.length) + x : x)
            : buf;
});

/**
 * Zero-padded 2 digit formatter.
 */
export const Z2 = padLeft(2, "0");

/**
 * Zero-padded 3 digit formatter.
 */
export const Z3 = padLeft(3, "0");

/**
 * Zero-padded 4 digit formatter.
 */
export const Z4 = padLeft(4, "0");
