import type { IObjectOf, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { camel, kebab } from "@thi.ng/strings";
import type { Args, ArgSpecExt, ParseOpts, ParseResult } from "./api";
import { usage } from "./usage";

export const parse = <T extends IObjectOf<any>>(
    specs: Args<T>,
    argv: string[],
    opts?: Partial<ParseOpts>
): ParseResult<T> | undefined => {
    opts = { start: 2, showUsage: true, ...opts };
    const acc: any = {};
    const aliases = Object.entries(specs).reduce(
        (acc, [k, v]) => (v.alias ? ((acc[v.alias] = k), acc) : acc),
        <IObjectOf<string>>{}
    );
    let id: Nullable<string>;
    let spec: Nullable<ArgSpecExt>;
    let i = opts.start!;
    try {
        for (; i < argv.length; ) {
            const a = argv[i];
            if (!id) {
                if (a[0] === "-") {
                    if (a[1] === "-") {
                        if (a === "--") break;
                        id = camel(a.substr(2));
                    } else {
                        id = aliases[a.substr(1)];
                        !id && illegalArgs(`unknown alias: ${a}`);
                    }
                    if (id === "help") {
                        console.log(usage(specs, opts.usageOpts));
                        return;
                    }
                    spec = specs[id];
                    !spec && illegalArgs(id);
                    i++;
                    if (spec.flag) {
                        acc[id] = true;
                        id = null;
                        if (spec.fn && !spec.fn("true")) break;
                    }
                } else {
                    illegalArgs(
                        `got '${a}', but expected one of: ${Object.keys(specs)
                            .map((x) => `--${kebab(x)}`)
                            .join(", ")}`
                    );
                }
            } else {
                a[0] === "-" && illegalArgs(`missing value for: --${id}`);
                if (spec!.multi) {
                    isArray(acc[id]) ? acc[id].push(a) : (acc[id] = [a]);
                } else {
                    acc[id] = a;
                }
                id = null;
                i++;
                if (spec!.fn && !spec!.fn(a)) break;
            }
        }
        id && illegalArgs(`missing value for: --${id}`);
        for (id in specs) {
            spec = specs[id];
            if (acc[id] === undefined) {
                if (spec.default !== undefined) {
                    acc[id] = spec.default;
                } else if (spec.optional === false) {
                    illegalArgs(`missing arg: --${id}`);
                }
            } else {
                if (spec.coerce) {
                    try {
                        if (spec.multi && spec.comma) {
                            acc[id] = (<string[]>acc[id]).reduce(
                                (acc, x) => (acc.push(...x.split(",")), acc),
                                <string[]>[]
                            );
                        }
                        acc[id] = spec.coerce(acc[id]);
                    } catch (e) {
                        throw new Error(`arg --${id}: ${e.message}`);
                    }
                }
            }
        }
        return { result: acc, index: i };
    } catch (e) {
        if (opts.showUsage) {
            console.log(e.message + "\n\n" + usage(specs, opts.usageOpts));
        }
        throw e;
    }
};
