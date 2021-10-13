import { conditional } from "./conditional.js";
import type { Conditional, RuleFn } from "./api.js";

export const at_media = (cond: Conditional, rules: any[]): RuleFn =>
    conditional("@media", cond, rules);
