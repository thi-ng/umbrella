import { conditional } from "./conditional";
import type { Conditional, RuleFn } from "./api";

export const at_supports = (cond: Conditional, rules: any[]): RuleFn =>
    conditional("@supports", cond, rules);
