import { memoizeJ } from "@thi.ng/memoize/memoizej";
import type { Stringer } from "./api.js";

export const currency = <
    (sym: string, pre?: boolean, prec?: number) => Stringer<number>
>memoizeJ((sym: string, pre = true, prec = 2) => {
    const ff = (x: number) => x.toFixed(prec);
    return pre ? (x: number) => sym + ff(x) : (x: number) => ff(x) + sym;
});

export const chf = currency("CHF ");

export const eur = currency("€");

export const gbp = currency("£");

export const usd = currency("$");

export const yen = currency("¥");
