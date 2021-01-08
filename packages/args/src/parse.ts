import type { IObjectOf, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import { camel } from "@thi.ng/strings";
import type { Args, ArgSpecExt, ParseOpts, ParseResult } from "./api";
import { usage } from "./usage";

export const parse = <T extends IObjectOf<any>>(
    specs: Args<T>,
    argv: string[],
    opts?: Partial<ParseOpts>
): ParseResult<T> => {
    opts = { start: 2, showUsage: true, ...opts };
    const acc: any = {};
    const aliases = Object.entries(specs).reduce(
        (acc, [k, v]) => (v.alias ? ((acc[v.alias] = k), acc) : acc),
        <IObjectOf<string>>{}
    );
    let key: Nullable<string>;
    let spec: Nullable<ArgSpecExt>;
    let i = opts.start!;
    try {
        for (; i < argv.length; ) {
            const a = argv[i];
            if (!key) {
                if (a[0] === "-") {
                    if (a[1] === "-") {
                        if (a === "--") break;
                        key = camel(a.substr(2));
                    } else {
                        key = aliases[a.substr(1)];
                        !key && illegalArgs(`unknown alias: ${a}`);
                    }
                    spec = specs[key];
                    !spec && illegalArgs(key);
                    if (spec.flag) {
                        acc[key] = true;
                        key = null;
                    }
                    i++;
                }
            } else {
                a[0] === "-" && illegalArgs(`missing value for: ${key}`);
                if (spec!.multi) {
                    isArray(acc[key]) ? acc[key].push(a) : (acc[key] = [a]);
                } else {
                    acc[key] = a;
                }
                key = null;
                i++;
            }
        }
        key && illegalArgs(`missing value for: ${key}`);
        for (let id in specs) {
            spec = specs[id];
            if (acc[id] === undefined) {
                if (spec.default !== undefined) {
                    acc[id] = spec.default;
                } else if (spec.optional === false) {
                    illegalArgs(`missing arg: ${id}`);
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
                        throw new Error(`arg '${id}': ${e.message}`);
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
