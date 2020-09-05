import type { FnN } from "@thi.ng/api";
import { fit, lens, mix, safeDiv } from "@thi.ng/math";
import type { Domain, Range, ScaleFn } from "./api";

export const linearScale = ([d1, d2]: Domain, [r1, r2]: Range): ScaleFn => (
    x
) => fit(x, d1, d2, r1, r2);

export const logScale = (
    domain: Domain,
    [r1, r2]: Range,
    base = 10
): ScaleFn => {
    const lb = Math.log(base);
    const log: FnN = (x) =>
        x > 0 ? Math.log(x) / lb : x < 0 ? -Math.log(-x) / lb : 0;
    const d1l = log(domain[0]);
    const drange = log(domain[1]) - d1l;
    return (x) => mix(r1, r2, (log(x) - d1l) / drange);
};

export const lensScale = (
    [d1, d2]: Domain,
    [r1, r2]: Range,
    focus = (d1 + d2) / 2,
    strength: number
): ScaleFn => {
    const dr = d2 - d1;
    const f = safeDiv(focus - d1, dr);
    return (x) => mix(r1, r2, lens(f, strength, safeDiv(x - d1, dr)));
};
