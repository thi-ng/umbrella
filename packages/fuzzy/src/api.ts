import type { Fn2, FnN, FnN2 } from "@thi.ng/api";

export type FuzzyFn = FnN;

export type RuleOp = (x: number, a: FuzzyFn, b: FuzzyFn) => number;

export type DefuzzStrategy = Fn2<FuzzyFn, LVarDomain, number>;

export type LVarDomain = [number, number];

export type LVarTerms<K extends string> = Record<K, FuzzyFn>;

export type LVarSet<I extends string> = Record<I, LVar<any>>;

export type LVarKeys<T extends LVar<any>> = keyof T["terms"];

export type LVarKeySet<I extends LVarSet<string>, K extends keyof I> = Partial<
    {
        [k in K]: LVarKeys<I[k]>;
    }
>;

/**
 * Linguistic Variable, defining several (possibly overlapping) fuzzy sets in an
 * overall global domain.
 */
export interface LVar<K extends string> {
    /**
     * Value domain/interval used to evaluate (and integrate) all terms during
     * {@link defuzz}. Interval is semi-open, i.e. `[min, max)`
     *
     * @remarks
     * The domain can be smaller or larger than the actual union bounds of the
     * defined sets. However, for precision and performance reasons, it's
     * recommended to keep this interval as compact as possible.
     */
    domain: LVarDomain;
    /**
     * Object of named fuzzy sets.
     */
    terms: LVarTerms<K>;
}

export interface Rule<I extends LVarSet<string>, O extends LVarSet<string>> {
    op: FnN2;
    if: LVarKeySet<I, keyof I>;
    then: LVarKeySet<O, keyof O>;
    weight: number;
}
