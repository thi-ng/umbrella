import type { Fn2, FnN, FnN2, IObjectOf, Nullable } from "@thi.ng/api";

export type FuzzyFn = FnN;

export type RuleInputs = IObjectOf<string>;
export type RuleOutputs = IObjectOf<string>;
export type RuleOp = (x: number, a: FuzzyFn, b: FuzzyFn) => number;

export type DefuzzStrategy = Fn2<Nullable<FuzzyFn>[], [number, number], number>;

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
    domain: [number, number];
    terms: Record<string, FuzzyFn>;
}
