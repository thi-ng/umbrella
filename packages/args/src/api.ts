import type { Fn, IObjectOf } from "@thi.ng/api";

export interface ArgSpec<T> {
    alias?: string;
    desc?: string | string[];
    hint?: string;
    optional?: boolean;
    default?: T;
}

export type Args<T extends IObjectOf<any>> = {
    [id in keyof T]: T[id] extends boolean
        ? ArgSpec<T[id]> & { flag: true }
        : T[id] extends any[]
        ? T[id] extends string[]
            ? ArgSpec<T[id]> & { coerce?: Fn<string[], T[id]>; multi: true }
            : ArgSpec<T[id]> & { coerce: Fn<string[], T[id]>; multi: true }
        : T[id] extends string
        ? ArgSpec<T[id]> & { coerce?: Fn<string, T[id]> }
        : ArgSpec<T[id]> & { coerce: Fn<string, T[id]> };
};

export interface ParseResult<T> {
    result: T;
    index: number;
}

export interface UsageOpts {
    lineWidth: number;
    colWidth: number;
}
