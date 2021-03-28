import type { IObjectOf } from "@thi.ng/api";
import {
    kebab,
    lengthAnsi,
    padRight,
    repeat,
    SPLIT_ANSI,
    stringify,
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
        prefix: "",
        suffix: "",
        groups: ["flags", "main"],
        ...opts,
    };
    const theme =
        opts.color !== false
            ? { ...DEFAULT_THEME, ...opts.color }
            : <ColorTheme>{};
    const indent = repeat(" ", opts.paramWidth!);
    const format = (ids: string[]) =>
        ids.map((id) => {
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
                opts.showDefaults &&
                spec.default != null &&
                spec.default !== false
                    ? ansi(
                          ` (default: ${stringify(true)(
                              spec.defaultHint != undefined
                                  ? spec.defaultHint
                                  : spec.default
                          )})`,
                          theme.default
                      )
                    : "";
            return (
                padRight(opts.paramWidth!)(params, lengthAnsi(params)) +
                wrap(
                    prefix + (spec.desc || "") + defaults,
                    opts.lineWidth! - opts.paramWidth!
                )
                    .map((l, i) => (i > 0 ? indent + l : l))
                    .join("\n")
            );
        });
    const sortedIDs = Object.keys(specs).sort();
    const groups = opts.groups
        ? opts.groups.map((gid) =>
              sortedIDs.filter((id) => specs[id].group === gid)
          )
        : [sortedIDs];
    return [
        ...wrap(opts.prefix, opts.lineWidth!),
        ...groups.map((ids) => format(ids).join("\n") + "\n"),
        ...wrap(opts.suffix, opts.lineWidth!),
    ].join("\n");
};

const ansi = (x: string, col: number) =>
    col != null ? `\x1b[${col}m${x}\x1b[0m` : x;

const wrap = (str: string | undefined, width: number) =>
    str
        ? wordWrapLines(str, {
              width,
              splitter: SPLIT_ANSI,
              hard: true,
          })
        : [];
