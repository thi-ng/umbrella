import type { Fn, IObjectOf, Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks";
import { illegalArgs } from "@thi.ng/errors";
import type { Args, ArgSpec, ParseResult } from "./api";

export const parseArgs = <T extends IObjectOf<any>>(
    specs: Args<T>,
    argv: string[],
    i = 2
): ParseResult<T> => {
    const acc: any = {};
    const aliases = Object.entries(specs).reduce(
        (acc, [k, v]) => (v.alias ? ((acc[v.alias] = k), acc) : acc),
        <IObjectOf<string>>{}
    );
    let key: Nullable<string>;
    let spec: Nullable<
        ArgSpec<any> & {
            coerce?: Fn<any, any>;
            multi?: boolean;
            flag?: boolean;
        }
    >;
    for (; i < argv.length; ) {
        const a = argv[i];
        if (!key) {
            if (a[0] === "-") {
                if (a[1] === "-") {
                    if (a === "--") break;
                    key = a.substr(2);
                } else {
                    key = aliases[a.substr(1)];
                    !key && illegalArgs(`unknown alias: ${a}`);
                }
                spec = specs[key];
                if (!spec) illegalArgs(key);
                if (spec.flag) {
                    acc[key] = true;
                    key = null;
                }
                i++;
            }
        } else {
            if (a[0] === "-") illegalArgs(`missing value for: ${key}`);
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
                    acc[id] = spec.coerce(acc[id]);
                } catch (e) {
                    throw new Error(`arg '${id}': ${e.message}`);
                }
            }
        }
    }
    return { result: acc, index: i };
};
