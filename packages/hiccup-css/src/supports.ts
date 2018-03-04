import { RuleFn, Conditional } from "./api";
import { conditional } from "./conditional";

export function at_supports(cond: Conditional, rules: any[]): RuleFn {
    return conditional("@supports", cond, rules);
}
