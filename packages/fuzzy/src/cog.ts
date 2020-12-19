import type { DefuzzStrategy } from "./api";

export interface COGOpts {
    samples: number;
}

/**
 * Higher-order function: Center-of-gravity defuzzification strategy, computing
 * the integral of the given `fn` in the defined `[min,max]` domain. The domain
 * is sampled at `opts.samples` uniformly spaced points.
 *
 * @param terms
 * @param domain
 */
export const cogStrategy = (opts?: Partial<COGOpts>): DefuzzStrategy => {
    let { samples } = { samples: 100, ...opts };
    return (fn, [min, max]) => {
        const delta = (max - min) / samples;
        let sum: [number, number][] = [];
        // integrate over given var's domain
        // state: [x, sum(term(x))]
        for (let i = 0, acc = 0; i <= samples; i++) {
            const t = min + i * delta;
            acc += fn(t);
            sum[i] = [t, acc];
        }
        if (!sum.length) return min;
        const mean = sum[samples][1] * 0.5;
        const idx = sum.findIndex((x) => x[1] > mean);
        return idx > 0 ? (sum[idx - 1][0] + sum[idx][0]) * 0.5 : sum[0][0];
    };
};
