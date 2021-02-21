import type { FnN2 } from "@thi.ng/api";
import type { LVarKeySet, LVarSet, Rule } from "./api";
import { snormMax, tnormMin, tnormProduct } from "./tnorms";

/**
 * Defines and returns a new rule object. Takes a T-norm (or S-norm) `op`, an
 * object of input conditions, an object of results and optional rule `weight`.
 * The `op` function is used to combine input terms.
 *
 * @remarks
 * The input and output objects are each using LVar names as keys and respective
 * var terms (their names) as values (see example).
 *
 * The optional rule weight (default: 1) is used by {@link defuzz} to adjust
 * rule importance.
 *
 * Also @see {@link and}, {@link strongAnd}, {@link or} for syntax sugar.
 *
 * @example
 * ```ts
 * // given 3 LVars from a classic fuzzy logic example:
 * // food, service, tip
 *
 * // define this rule:
 * // "If the food was bad AND service poor, then a small tip only"
 * // here multiply is used for strong conjunction of the food & service terms
 * rule(
 *   (a, b) => a * b,
 *   { food: "bad",  service: "poor" },
 *   { tip: "small" }
 * )
 * ```
 *
 * @param op
 * @param $if
 * @param then
 * @param weight
 */
export const rule = <I extends LVarSet<string>, O extends LVarSet<string>>(
    op: FnN2,
    $if: LVarKeySet<I, keyof I>,
    then: LVarKeySet<O, keyof O>,
    weight = 1
): Rule<I, O> => ({
    if: $if,
    then,
    op,
    weight,
});

export const and = <I extends LVarSet<string>, O extends LVarSet<string>>(
    $if: LVarKeySet<I, keyof I>,
    then: LVarKeySet<O, keyof O>,
    weight?: number
) => rule(tnormMin, $if, then, weight);

export const strongAnd = <I extends LVarSet<string>, O extends LVarSet<string>>(
    $if: LVarKeySet<I, keyof I>,
    then: LVarKeySet<O, keyof O>,
    weight?: number
) => rule(tnormProduct, $if, then, weight);

export const or = <I extends LVarSet<string>, O extends LVarSet<string>>(
    $if: LVarKeySet<I, keyof I>,
    then: LVarKeySet<O, keyof O>,
    weight?: number
) => rule(snormMax, $if, then, weight);
