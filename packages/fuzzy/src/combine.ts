import type { FnN2, Nullable } from "@thi.ng/api";
import type { FuzzyFn } from "./api";

/**
 * Takes an array of fuzzy set {@link FuzzyFn}, evaluates each with input `x`
 * (skipping any nullish terms) and combines results using `op` (usually an
 * S-norm / T-conorm operation, e.g. `max(a,b)`). Returns `initial` (default: 0)
 * if no valid terms were processed (e.g. due to empty array or only null values)
 *
 * @remarks
 * Also @see {@link compose}.
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
