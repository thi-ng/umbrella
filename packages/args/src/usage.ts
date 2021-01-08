import type { IObjectOf } from "@thi.ng/api";
import {
    kebab,
    padRight,
    repeat,
    stripAnsi,
    wordWrapLines,
} from "@thi.ng/strings";
import type { Args, ArgSpecExt, UsageOpts } from "./api";

export const usage = <T extends IObjectOf<any>>(
    specs: Args<T>,
    opts: Partial<UsageOpts> = {}
) => {
    opts = {
        lineWidth: 80,
        paramWidth: 32,
        color: true,
        colorParam: 96,
        colorRequired: 33,
        colorMulti: 90,
        colorHint: 90,
        ...opts,
    };
    const indent = repeat(" ", opts.paramWidth!);
    const ansi = (x: string, col: number) =>
        opts.color ? `\x1b[${col}m${x}\x1b[0m` : x;
    return Object.keys(specs)
        .sort()
        .map((id) => {
            const spec: ArgSpecExt = specs[id];
            const hint = spec.hint
                ? ansi(" " + spec.hint, opts.colorHint!)
                : "";
            const name = ansi(`--${kebab(id)}`, opts.colorParam!);
            const alias = spec.alias
                ? `${ansi("-" + spec.alias, opts.colorParam!)}${hint}, `
                : "";
            const params = `${alias}${name}${hint}`;
            const isRequired = spec.optional === false;
            const prefixes: string[] = [];
            isRequired && prefixes.push("required");
            spec.multi && prefixes.push("multiple");
            const prefix = prefixes.length
                ? ansi(
                      `[${prefixes.join(", ")}] `,
                      isRequired ? opts.colorRequired! : opts.colorMulti!
                  )
                : "";
            const res: string =
                padRight(opts.paramWidth!)(params, stripAnsi(params).length) +
                wordWrapLines(
                    prefix + (spec.desc || ""),
                    opts.lineWidth! - opts.paramWidth!
                )
                    .map((l, i) => (i > 0 ? indent : "") + l)
                    .join("\n");
            return res;
        })
        .join("\n");
};
