import { Conditional, RuleFn } from "./api";
import { conditional } from "./conditional";

export const at_supports = (cond: Conditional, rules: any[]): RuleFn =>
    conditional("@supports", cond, rules);
