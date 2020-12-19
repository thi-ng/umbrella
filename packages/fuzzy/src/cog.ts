import type { FnN2 } from "@thi.ng/api";
import type { DefuzzStrategy } from "./api";
import { combineTerms } from "./combine";
import { snormMax } from "./tnorms";

export interface COGOpts {
    combine: FnN2;
    steps: number;
}

/**
 * Higher-order function: Center of gravity defuzzing strategy, using given
 * `opts` with `combine` t-norm to form the integral of evaluated terms in the
 * defined domain of a single Linguistic output variable. The domain is sampled
 * at `n` uniformly spaced points.
 *
 * @param terms
 * @param domain
 */
export const cogStrategy = (opts?: Partial<COGOpts>): DefuzzStrategy => {
    const { combine, steps } = { combine: snormMax, steps: 100, ...opts };
    return (terms, [min, max]) => {
        const delta = (max - min) / steps;
        let sum: [number, number][] = [];
        // integrate over given var's domain
        // state: [x, sum(term(x))]
        for (let i = min, j = 0, acc = 0; i <= max; i += delta, j++) {
            acc += delta * combineTerms(combine, terms, i);
            sum[j] = [i, acc];
        }
        if (!sum.length) return min;
        const mean = sum[sum.length - 1][1] * 0.5;
        const idx = sum.findIndex((x) => x[1] > mean);
        return idx > 0 ? (sum[idx - 1][0] + sum[idx][0]) * 0.5 : sum[0][0];
    };
};
