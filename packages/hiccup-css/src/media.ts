import { RuleFn, Conditional } from "./api";
import { conditional } from "./conditional";

export function at_media(cond: Conditional, rules: any[]): RuleFn {
    return conditional("@media", cond, rules);
}
