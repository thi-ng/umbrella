import { isString } from "@thi.ng/checks/is-string";
import { Conditional, CSSOpts, RuleFn } from "./api";
import { expand, indent } from "./impl";

export function conditional(type: string, cond: Conditional, rules: any[]): RuleFn {
    return (acc: string[], opts: CSSOpts) => {
        const space = indent(opts);
        acc.push(`${space}${type} ${formatCond(cond)}${opts.format.declStart}`);
        opts.depth++;
        expand(acc, [], rules, opts);
        opts.depth--;
        acc.push(space + opts.format.declEnd);
        return acc;
    };
}

function formatCond(cond: any) {
    if (isString(cond)) {
        return cond;
    }
    const acc = [];
    for (let c in cond) {
        if (cond.hasOwnProperty(c)) {
            let v = cond[c];
            if (v === true) {
                v = c;
            } else if (v === false) {
                v = "not " + c;
            } else if (v === "only") {
                v += " " + c;
            } else {
                v = `(${c}:${v})`;
            }
            acc.push(v);
        }
    }
    return acc.join(" and ");
}
