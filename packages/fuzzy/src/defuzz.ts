import type { IObjectOf } from "@thi.ng/api";
import type { FuzzyFn, LVar, Rule } from "./api";
import { cogStrategy } from "./cog";
import { weighted } from "./shapes";

/**
 * Takes an object of input {@link variable}s, an object of output variable,
 * rule array and an object of input values. Evaluates relevant terms of input
 * variables in all matching rules, then combines and defuzzes them using given
 * optional strategy (by default {@link cogStrategy} w/ its own default
 * options). Returns object of computed output variable values.
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
    strategy = cogStrategy()
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
