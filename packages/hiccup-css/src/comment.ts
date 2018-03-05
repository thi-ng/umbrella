import { RuleFn } from "./api";
import { indent } from "./impl";

export function comment(body: string, force = false): RuleFn {
    return (acc, opts) => {
        const space = indent(opts);
        const inner = indent(opts, opts.depth + 1);
        if (opts.format.comments || force) {
            Array.prototype.push.apply(
                acc,
                [space + "/*", body.split("\n").map((l) => inner + l).join("\n"), space + "*/"]
            );
        }
        return acc;
    };
}
