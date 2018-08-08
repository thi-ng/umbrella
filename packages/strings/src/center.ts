import { memoizeJ } from "@thi.ng/memoize/memoizej";

import { Stringer } from "./api";
import { repeat } from "./repeat";

/**
 * @param n target length
 * @param ch pad character(s)
 */
export const center: (n: number, ch?: string | number) => Stringer<any> =
    memoizeJ<number, string, Stringer<any>>((n, ch = " ") => {
        const buf = repeat(ch, ((n + 1) & ~1) / 2);
        return (x: any) => {
            if (x == null) return buf;
            x = x.toString();
            const r = (n - x.length) / 2;
            return x.length < n ?
                buf.substr(0, r) + x + buf.substr(0, r + ((n & 1) === (x.length & 1) ? 0 : 1)) :
                x;
        }
    });
