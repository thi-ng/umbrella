import { CSSOpts } from "./api";
import { _css } from "./css";
import { indent } from "./utils";

export function mediaQuery(cond, rules: any[]) {
    return (acc: string[], opts: CSSOpts) => {
        const space = indent(opts);
        acc.push(`${space}@media(${cond})${opts.format.declStart}`);
        opts.depth++;
        _css(acc, [], rules, opts);
        opts.depth--;
        acc.push(space + opts.format.declEnd);
        return acc;
    };
}
