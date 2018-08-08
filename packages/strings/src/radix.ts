import { memoizeJ } from "@thi.ng/memoize/memoizej";

import { Stringer } from "./api";
import { repeat } from "./repeat";

/**
 * Returns a `Stringer` which formats given numbers to `radix` and `len`.
 *
 * @param radix
 * @param len
 */
export const radix: (radix: number, len: number) => Stringer<number> =
    memoizeJ(
        (radix: number, n: number) => {
            const buf = repeat("0", n);
            return (x: any) => {
                x = (x >>> 0).toString(radix);
                return x.length < n ? buf.substr(x.length) + x : x;
            };
        }
    );

export const B8 = radix(2, 8);
export const U8 = radix(16, 2);
export const U16 = radix(16, 4);
export const U32 = radix(16, 8);
export const U64 = (hi: number, lo: number) => U32(hi) + U32(lo);
