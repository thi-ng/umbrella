import { memoizeJ } from "@thi.ng/memoize";
import type { Stringer } from "./api";

export const truncate: (
    n: number,
    suffix?: string
) => Stringer<string> = memoizeJ((n: number, suffix = "") => (x) =>
    x.length > n ? x.substr(0, n - suffix.length) + suffix : x
);
