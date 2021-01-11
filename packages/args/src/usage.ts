import type { IObjectOf } from "@thi.ng/api";
import {
    kebab,
    padRight,
    repeat,
    stringify,
    stripAnsi,
    wordWrapLines,
} from "@thi.ng/strings";
import { Args, ArgSpecExt, ColorTheme, DEFAULT_THEME, UsageOpts } from "./api";

export const usage = <T extends IObjectOf<any>>(
    specs: Args<T>,
    opts: Partial<UsageOpts> = {}
) => {
    opts = {
        lineWidth: 80,
        paramWidth: 32,
        showDefaults: true,
        ...opts,
    };
    const theme =
        opts.color !== false
            ? { ...DEFAULT_THEME, ...opts.color }
            : <ColorTheme>{};
    const indent = repeat(" ", opts.paramWidth!);
    const ansi = (x: string, col: number) =>
        col != null ? `\x1b[${col}m${x}\x1b[0m` : x;
    return Object.keys(specs)
        .sort()
        .map((id) => {
            const spec: ArgSpecExt = specs[id];
            const hint = spec.hint ? ansi(" " + spec.hint, theme.hint!) : "";
            const name = ansi(`--${kebab(id)}`, theme.param!);
            const alias = spec.alias
                ? `${ansi("-" + spec.alias, theme.param!)}${hint}, `
                : "";
            const params = `${alias}${name}${hint}`;
            const isRequired =
                spec.optional === false && spec.default === undefined;
            const prefixes: string[] = [];
            isRequired && prefixes.push("required");
            spec.multi && prefixes.push("multiple");
            const prefix = prefixes.length
                ? ansi(
                      `[${prefixes.join(", ")}] `,
                      isRequired ? theme.required! : theme.multi!
                  )
                : "";
            const defaults =
                opts.showDefaults && spec.default
                    ? ansi(
                          ` (default: ${stringify()(
                              spec.defaultHint != undefined
                                  ? spec.defaultHint
                                  : spec.default
                          )})`,
                          theme.default
                      )
                    : "";
            return (
                padRight(opts.paramWidth!)(params, stripAnsi(params).length) +
                wordWrapLines(
                    prefix + (spec.desc || "") + defaults,
                    opts.lineWidth! - opts.paramWidth!
                )
                    .map((l, i) => (i > 0 ? indent : "") + l)
                    .join("\n")
            );
        })
        .join("\n");
};
