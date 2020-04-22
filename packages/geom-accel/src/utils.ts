import type { Fn, Nullable } from "@thi.ng/api";

/** @internal */
export const CMP = (a: [number, any?], b: [number, any?]) => b[0] - a[0];

/** @internal */
export const addResults = <A, B>(
    fn: Fn<A, B>,
    sel: [number, Nullable<A>?][],
    acc: B[]
) => {
    for (let n = sel.sort(CMP).length; --n >= 0; ) {
        const s = sel[n][1];
        s && acc.push(fn(s));
    }
    return acc;
};
