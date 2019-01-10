import { Conditional, RuleFn } from "./api";
import { conditional } from "./conditional";

export const at_media =
    (cond: Conditional, rules: any[]): RuleFn =>
        conditional("@media", cond, rules);
