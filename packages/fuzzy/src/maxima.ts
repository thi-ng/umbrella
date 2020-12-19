import type { FnN2 } from "@thi.ng/api";
import { EPS, eqDelta } from "@thi.ng/math";
import type { DefuzzStrategy } from "./api";
import { combineTerms } from "./combine";
import { snormMax } from "./tnorms";

export interface MaximaOpts {
    mode: "first" | "last" | "mean";
    combine: FnN2;
    steps: number;
    eps: number;
}

export const maximaStrategy = (opts?: Partial<MaximaOpts>): DefuzzStrategy => (
    terms,
    [min, max]
) => {
    const { mode, combine, steps, eps } = <MaximaOpts>{
        mode: "first",
        combine: snormMax,
        steps: 100,
        eps: EPS,
        ...opts,
    };
    const delta = (max - min) / steps;
    let peak = -Infinity;
    let peakPos = min;
    const $ = (i: number) => {
        const x = combineTerms(combine, terms, i);
        if (x > peak) {
            peak = x;
            peakPos = i;
        }
    };
    switch (mode) {
        case "mean": {
            let n = 1;
            for (let i = min; i <= max; i += delta) {
                const x = combineTerms(combine, terms, i);
                if (eqDelta(x, peak, eps)) {
                    peakPos += i;
                    n++;
                } else if (x > peak) {
                    peak = x;
                    peakPos = i;
                    n = 1;
                }
            }
            return peakPos / n;
        }
        case "last":
            for (let i = max; i >= min; i -= delta) $(i);
            break;
        case "first":
        default:
            for (let i = min; i <= max; i += delta) $(i);
    }
    return peakPos;
};
