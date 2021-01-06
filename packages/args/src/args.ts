import type { ArgSpec } from "./api";
import { int, ints, json, oneOf } from "./coerce";

export const argFlag = (spec: Partial<ArgSpec<boolean>>) => ({
    flag: <const>true,
    ...spec,
});

export const argInt = (spec: Partial<ArgSpec<number>>) => ({
    coerce: int,
    hint: "INT",
    ...spec,
});

export const argInts = (spec: Partial<ArgSpec<number[]>>) => ({
    coerce: ints,
    hint: "INT",
    multi: <const>true,
    ...spec,
});

export const argJSON = <T>(spec: Partial<ArgSpec<T>>) => ({
    coerce: json,
    hint: "JSON",
    ...spec,
});

export const argEnum = (opts: string[], spec: Partial<ArgSpec<string>>) => ({
    coerce: oneOf(opts),
    hint: "ID",
    ...spec,
    desc: `${spec.desc}: ${opts.map((x) => `'${x}'`).join(", ")}`,
});
