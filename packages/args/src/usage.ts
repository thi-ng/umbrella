import type { IObjectOf, Pair } from "@thi.ng/api";
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
        ids.map((id) => argUsage(id, specs[id], opts, theme, indent));
    const sortedIDs = Object.keys(specs).sort();
    const groups: Pair<string, string[]>[] = opts.groups
        ? opts.groups
              .map(
                  (gid): Pair<string, string[]> => [
                      gid,
                      sortedIDs.filter((id) => specs[id].group === gid),
                  ]
              )
              .filter((g) => !!g[1].length)
        : [["options", sortedIDs]];
    return [
        ...wrap(opts.prefix, opts.lineWidth!),
        ...groups.map(([gid, ids]) =>
            [
                ...(opts.showGroupNames ? [`${gid}:\n`] : []),
                ...format(ids),
                "",
            ].join("\n")
        ),
        ...wrap(opts.suffix, opts.lineWidth!),
    ].join("\n");
};

const argUsage = (
    id: string,
    spec: ArgSpecExt,
    opts: Partial<UsageOpts>,
    theme: ColorTheme,
    indent: string
) => {
    const hint = argHint(spec, theme);
    const alias = argAlias(spec, theme, hint);
    const name = ansi(`--${kebab(id)}`, theme.param!);
    const params = `${alias}${name}${hint}`;
    const isRequired = spec.optional === false && spec.default === undefined;
    const prefixes: string[] = [];
    isRequired && prefixes.push("required");
    spec.multi && prefixes.push("multiple");
    const body =
        argPrefix(prefixes, theme, isRequired) +
        (spec.desc || "") +
        argDefault(spec, opts, theme);
    return (
        padRight(opts.paramWidth!)(params, lengthAnsi(params)) +
        wrap(body, opts.lineWidth! - opts.paramWidth!)
            .map((l, i) => (i > 0 ? indent + l : l))
            .join("\n")
    );
};

const argHint = (spec: ArgSpecExt, theme: ColorTheme) =>
    spec.hint ? ansi(" " + spec.hint, theme.hint!) : "";

const argAlias = (spec: ArgSpecExt, theme: ColorTheme, hint: string) =>
    spec.alias ? `${ansi("-" + spec.alias, theme.param!)}${hint}, ` : "";

const argPrefix = (
    prefixes: string[],
    theme: ColorTheme,
    isRequired: boolean
) =>
    prefixes.length
        ? ansi(
              `[${prefixes.join(", ")}] `,
              isRequired ? theme.required! : theme.multi!
          )
        : "";

const argDefault = (
    spec: ArgSpecExt,
    opts: Partial<UsageOpts>,
    theme: ColorTheme
) =>
    opts.showDefaults && spec.default != null && spec.default !== false
        ? ansi(
              ` (default: ${stringify(true)(
                  spec.defaultHint != undefined
                      ? spec.defaultHint
                      : spec.default
              )})`,
              theme.default
          )
        : "";

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
