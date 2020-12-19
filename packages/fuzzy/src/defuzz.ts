import type { IObjectOf } from "@thi.ng/api";
import type { FuzzyFn, LVar, Rule } from "./api";
import { cogStrategy } from "./cog";
import { constant, implication, weighted } from "./shapes";
import { tnormMin } from "./tnorms";

/**
 * Takes an object of input {@link variable}s, an object of output variable,
 * rule array and an object of input values. Evaluates relevant terms of input
 * variables in all matching rules, then combines and defuzzes them using given
 * optional strategy (by default {@link cogStrategy} w/ its own default
 * options). Returns object of computed output variable values.
 *
 * @remarks
 * The `imply` T-norm (default: {@link tnormMin} is used to transform each
 * rule's output set(s) using each rule's computed/aggregated truth value, as
 * well as each rule's weight. Different T-norms might produce different fuzzy
 * set shapes and different results, even if the defuzz strategy remains
 * constant.
 *
 * @param ins
 * @param outs
 * @param rules
 * @param vals
 * @param strategy
 * @param imply
 */
export const defuzz = (
    ins: IObjectOf<LVar>,
    outs: IObjectOf<LVar>,
    rules: Rule[],
    vals: IObjectOf<number>,
    strategy = cogStrategy(),
    imply = tnormMin
) => {
    const ruleTerms = rules.map((r) => {
        let alpha: number | null = null;
        for (let id in vals) {
            if (r.if[id]) {
                const v = ins[id].terms[r.if[id]](vals[id]);
                alpha = alpha !== null ? r.op(alpha, v) : v;
            }
        }
        const terms: IObjectOf<FuzzyFn> = {};
        if (alpha) {
            const aterm = constant(alpha);
            for (let id in r.then) {
                if (outs[id]) {
                    const oterm = outs[id].terms[r.then[id]];
                    terms[id] = implication(
                        imply,
                        r.weight == 1 ? oterm : weighted(oterm, r.weight),
                        aterm
                    );
                }
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
