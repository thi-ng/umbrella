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
): ParseResult<T> | undefined => {
    opts = { start: 2, showUsage: true, help: ["--help", "-h"], ...opts };
    try {
        return parseOpts(specs, argv, opts);
    } catch (e) {
        if (opts.showUsage) {
            console.log(
                (<Error>e).message + "\n\n" + usage(specs, opts.usageOpts)
            );
        }
        throw e;
    }
};

const parseOpts = <T extends IObjectOf<any>>(
    specs: Args<T>,
    argv: string[],
    opts: Partial<ParseOpts>
): ParseResult<T> | undefined => {
    const aliases = aliasIndex<T>(specs);
    const acc: any = {};
    let id: Nullable<string>;
    let spec: Nullable<ArgSpecExt>;
    let i = opts.start!;
    for (; i < argv.length; ) {
        const a = argv[i];
        if (!id) {
            if (opts.help!.includes(a)) {
                console.log(usage(specs, opts.usageOpts));
                return;
            }
            const state = parseKey(specs, aliases, acc, a);
            id = state.id;
            spec = state.spec;
            i = i + ~~(state.state < 2);
            if (state.state) break;
        } else {
            if (parseValue(spec!, acc, id, a)) break;
            id = null;
            i++;
        }
    }
    id && illegalArgs(`missing value for: --${id}`);
    return {
        result: processResults(specs, acc),
        index: i,
        rest: argv.slice(i),
        done: i >= argv.length,
    };
};

const aliasIndex = <T extends IObjectOf<any>>(specs: Args<T>) =>
    Object.entries(specs).reduce(
        (acc, [k, v]) => (v.alias ? ((acc[v.alias] = k), acc) : acc),
        <IObjectOf<string>>{}
    );

interface ParseKeyResult {
    state: number;
    id?: string;
    spec?: ArgSpecExt;
}

const parseKey = <T extends IObjectOf<any>>(
    specs: Args<T>,
    aliases: IObjectOf<string>,
    acc: any,
    a: string
): ParseKeyResult => {
    if (a[0] === "-") {
        let id: string | undefined;
        if (a[1] === "-") {
            // terminator arg, stop parsing
            if (a === "--") return { state: 1 };
            id = camel(a.substr(2));
        } else {
            id = aliases[a.substr(1)];
            !id && illegalArgs(`unknown option: ${a}`);
        }
        const spec: ArgSpecExt = specs[id];
        !spec && illegalArgs(id);
        if (spec.flag) {
            acc[id] = true;
            id = undefined;
            // stop parsing if fn returns false
            if (spec.fn && !spec.fn("true")) return { state: 1, spec };
        }
        return { state: 0, id, spec };
    }
    // no option arg, stop parsing
    return { state: 2 };
};

const parseValue = (spec: ArgSpecExt, acc: any, id: string, a: string) => {
    /^-[a-z]/i.test(a) && illegalArgs(`missing value for: --${id}`);
    if (spec!.multi) {
        isArray(acc[id!]) ? acc[id!].push(a) : (acc[id!] = [a]);
    } else {
        acc[id!] = a;
    }
    return spec!.fn && !spec!.fn(a);
};

const processResults = <T extends IObjectOf<any>>(specs: Args<T>, acc: any) => {
    let spec: Nullable<ArgSpecExt>;
    for (let id in specs) {
        spec = specs[id];
        if (acc[id] === undefined) {
            if (spec.default !== undefined) {
                acc[id] = spec.default;
            } else if (spec.optional === false) {
                illegalArgs(`missing arg: --${id}`);
            }
        } else if (spec.coerce) {
            coerceValue(spec, acc, id);
        }
    }
    return acc;
};

const coerceValue = (spec: ArgSpecExt, acc: any, id: string) => {
    try {
        if (spec.multi && spec.delim) {
            acc[id] = (<string[]>acc[id]).reduce(
                (acc, x) => (acc.push(...x.split(spec!.delim!)), acc),
                <string[]>[]
            );
        }
        acc[id] = spec.coerce!(acc[id]);
    } catch (e) {
        throw new Error(`arg --${id}: ${(<Error>e).message}`);
    }
};
