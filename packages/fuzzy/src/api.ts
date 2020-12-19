import type { Fn2, FnN, FnN2, IObjectOf } from "@thi.ng/api";

export type FuzzyFn = FnN;

export type RuleInputs = IObjectOf<string>;
export type RuleOutputs = IObjectOf<string>;
export type RuleOp = (x: number, a: FuzzyFn, b: FuzzyFn) => number;

export type DefuzzStrategy = Fn2<FuzzyFn, [number, number], number>;

export interface Rule {
    op: FnN2;
    if: RuleInputs;
    then: RuleOutputs;
    weight: number;
}

export type RuleFn = (
    $if: RuleInputs,
    $then: RuleOutputs,
    weight?: number
) => Rule;

/**
 * Linguistic Variable, defining several (possibly overlapping) fuzzy sets in an
 * overall global domain.
 */
export interface LVar {
    /**
     * Value domain/interval used to evaluate (and integrate) all terms during
     * {@link defuzz}. Interval is semi-open, i.e. `[min, max)`
     *
     * @remarks
     * The domain can be smaller or larger than the actual union bounds of the
     * defined sets. However, for precision and performance reasons, it's
     * recommended to keep this interval as compact as possible.
     */
    domain: [number, number];
    /**
     * Object of named fuzzy sets.
     */
    terms: Record<string, FuzzyFn>;
}
