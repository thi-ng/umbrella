import { CSSOpts, RuleFn } from "./api";
import { _css } from "./css";
import { indent } from "./utils";

export function conditional(type: string, cond: string, rules: any[]): RuleFn {
    return (acc: string[], opts: CSSOpts) => {
        const space = indent(opts);
        acc.push(`${space}${type}(${cond})${opts.format.declStart}`);
        opts.depth++;
        _css(acc, [], rules, opts);
        opts.depth--;
        acc.push(space + opts.format.declEnd);
        return acc;
    };
}
