import { memoizeJ } from "@thi.ng/memoize";
import type { Stringer } from "./api";
import { repeat } from "./repeat";

/**
 * @param n - target length
 * @param ch - pad character(s)
 */
export const padRight: (
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
            ? ((x = x.toString()), x.length < n ? x + buf.substr(x.length) : x)
            : buf;
});
