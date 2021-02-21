import type { IObjectOf } from "@thi.ng/api";
import type { FuzzyFn, LVarSet, Rule } from "./api";
import { constant, intersect, union, weighted } from "./shapes";
import { centroidStrategy } from "./strategies/centroid";
import { snormMax, tnormMin } from "./tnorms";

/**
 * Takes an object of input {@link variable}s, an object of output variable,
 * rule array and an object of input values. Evaluates relevant terms of input
 * variables in all matching rules, then combines and defuzzes them using given
 * optional strategy (by default {@link centroidStrategy} w/ its own default
 * options). Returns object of computed output variable values.
 *
 * @remarks
 * The `imply` T-norm (default: {@link tnormMin} is used to transform each
 * rule's output set(s) using each rule's computed/aggregated truth value, as
 * well as each rule's weight. Different T-norms might produce different fuzzy
 * set shapes and different results, even if the defuzz strategy remains
 * constant.
 *
 * The `combine` S-norm (default: {@link snormMax}) is used to combine the
 * relevant output sets of all rules for integration/analysis by the given
 * defuzz `strategy` actually producing the crisp result.
 *
 * @param ins
 * @param outs
 * @param rules
 * @param vals
 * @param strategy
 * @param imply
 * @param combine
 */
export const defuzz = <I extends LVarSet<string>, O extends LVarSet<string>>(
    ins: I,
    outs: O,
    rules: Rule<I, O>[],
    vals: Partial<Record<keyof I, number>>,
    strategy = centroidStrategy(),
    imply = tnormMin,
    combine = snormMax
) => {
    const ruleTerms = rules.map((r) => {
        let alpha: number | null = null;
        for (let id in vals) {
            if (r.if[id]) {
                const v = ins[id].terms[<string>r.if[id]](vals[id]!);
                alpha = alpha !== null ? r.op(alpha, v) : v;
            }
        }
        const terms: IObjectOf<FuzzyFn> = {};
        if (alpha) {
            const aterm = constant(alpha);
            for (let id in r.then) {
                if (outs[id]) {
                    const oterm = outs[id].terms[<string>r.then[id]];
                    terms[id] = intersect(
                        imply,
                        r.weight == 1 ? oterm : weighted(oterm, r.weight),
                        aterm
                    );
                }
            }
        }
        return terms;
    });

    const res: Partial<Record<keyof O, number>> = {};
    for (let id in outs) {
        res[id] = strategy(
            union(combine, ...ruleTerms.map((r) => r[id]).filter((f) => !!f)),
            outs[id].domain
        );
    }
    return res;
};
