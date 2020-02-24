import { conditional } from "./conditional";
import type { Conditional, RuleFn } from "./api";

export const at_media = (cond: Conditional, rules: any[]): RuleFn =>
    conditional("@media", cond, rules);
