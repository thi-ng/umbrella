import type { FnN2 } from "@thi.ng/api";
import { snormMax, tnormMin, tnormProduct } from "@thi.ng/math";
import type { Rule, RuleFn, RuleInputs, RuleOutputs } from "./api";

const rule = (
    op: FnN2,
    $if: RuleInputs,
    then: RuleOutputs,
    weight = 1
): Rule => ({
    if: $if,
    then,
    op,
    weight,
});

export const and: RuleFn = ($if, $then, weight) =>
    rule(tnormMin, $if, $then, weight);

export const strongAnd: RuleFn = ($if, $then, weight) =>
    rule(tnormProduct, $if, $then, weight);

export const or: RuleFn = ($if, $then, weight) =>
    rule(snormMax, $if, $then, weight);
