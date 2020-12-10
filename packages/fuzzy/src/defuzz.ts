import type { FnN2, IObjectOf, Nullable } from "@thi.ng/api";
import { snormMax } from "@thi.ng/math";
import type { DefuzzStrategy, FuzzyFn, LVar, Rule } from "./api";
import { weighted } from "./shapes";

/**
 * Takes an object of input {@link variable}s, an object of output variable,
 * rule array and an object of input values. Evaluates relevant terms of input
 * variables in all matching rules, then combines and defuzzes them using given
 * optional strategy (by default {@link cog} w/ its own default options).
 * Returns object of computed output variable values.
 *
 * @param ins
 * @param outs
 * @param rules
 * @param vals
 * @param strategy
 */
export const defuzz = (
    ins: IObjectOf<LVar>,
    outs: IObjectOf<LVar>,
    rules: Rule[],
    vals: IObjectOf<number>,
    strategy = cog()
) => {
    const ruleTerms = rules.map((r) => {
        let acc: number | null = null;
        for (let id in vals) {
            if (r.if[id]) {
                const v = ins[id].terms[r.if[id]](vals[id]);
                acc = acc !== null ? r.op(acc, v) : v;
            }
        }
        const weight = (acc || 0) * r.weight;
        const terms: IObjectOf<FuzzyFn> = {};
        for (let id in r.then) {
            if (outs[id]) {
                terms[id] = weighted(outs[id].terms[r.then[id]], weight);
            }
        }
        return terms;
    });

    const res: IObjectOf<number> = {};
    for (let id in outs) {
        res[id] = strategy(
            ruleTerms.map((r) => r[id]),
            outs[id].domain
        );
    }
    return res;
};

export interface COGOpts {
    combine: FnN2;
    n: number;
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
export const cog = (opts?: Partial<COGOpts>): DefuzzStrategy => {
    const { combine, n } = { combine: snormMax, n: 64, ...opts };
    return (terms, [min, max]) => {
        const delta = (max - min) / n;
        let sum: [number, number][] = [];
        // integrate over given var's domain
        // state: [x, sum(term(x))]
        for (let i = min, j = 0; i < max; i += delta, j++) {
            sum[j] = [
                i,
                delta * combineTerms(combine, terms, i) +
                    (j > 0 ? sum[j - 1][1] : 0),
            ];
        }
        const mean = sum[n - 1][1] * 0.5;
        const idx = sum.findIndex((x) => x[1] > mean);
        return idx > 0 ? (sum[idx - 1][0] + sum[idx][0]) * 0.5 : sum[0][0];
    };
};

/**
 * Takes an array of fuzzy set term functions, evaluates each with input `x`
 * (skipping any nullish terms) and combines results using `op` (usually an
 * S-norm / T-conorm operation, e.g. `max(a,b)`). Returns `initial` if no valid
 * terms were processed (e.g. due to empty array or null values)
 *
 * @param op
 * @param terms
 * @param x
 * @param initial - initial value
 */
export const combineTerms = (
    op: FnN2,
    terms: Nullable<FuzzyFn>[],
    x: number,
    initial = 0
) => terms.reduce((acc, term) => (term ? op(acc, term(x)) : acc), initial);
