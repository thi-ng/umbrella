import { indent } from "./impl.js";
import type { RuleFn } from "./api.js";

export const comment =
    (body: string, force = false): RuleFn =>
    (acc, opts) => {
        const space = indent(opts);
        const inner = indent(opts, opts.depth + 1);
        if (opts.format.comments || force) {
            acc.push(
                space + "/*",
                body
                    .split("\n")
                    .map((l) => inner + l)
                    .join("\n"),
                space + "*/"
            );
        }
        return acc;
    };
