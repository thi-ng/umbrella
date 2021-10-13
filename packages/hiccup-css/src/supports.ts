import { conditional } from "./conditional.js";
import type { Conditional, RuleFn } from "./api.js";

export const at_supports = (cond: Conditional, rules: any[]): RuleFn =>
    conditional("@supports", cond, rules);
