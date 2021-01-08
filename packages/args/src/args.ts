import type { Fn } from "@thi.ng/api";
import type { ArgSpec } from "./api";
import {
    coerceFloat,
    coerceFloats,
    coerceHexInt,
    coerceHexInts,
    coerceInt,
    coerceInts,
    coerceJson,
    coerceOneOf,
} from "./coerce";

const $single = <T = number>(coerce: Fn<string, T>, hint: string) => <
    S extends Partial<ArgSpec<T>>
>(
    spec: S
): S & { coerce: Fn<string, T>; hint: string } => ({
    coerce,
    hint,
    ...spec,
});

const $multi = <T = number>(coerce: Fn<string[], T[]>, hint: string) => <
    S extends Partial<ArgSpec<T[]> & { comma: boolean }>
>(
    spec: S
): S & { coerce: Fn<string[], T[]>; hint: string; multi: true } => ({
    hint: hint + (spec.comma ? "[,..]" : ""),
    multi: true,
    coerce,
    ...spec,
});

export const flag = <S extends Partial<ArgSpec<boolean>>>(
    spec: S
): S & { flag: true } => ({ flag: true, ...spec });

export const string = <S extends Partial<ArgSpec<string>>>(
    spec: S
): S & { hint: string } => ({ hint: "STR", ...spec });

export const strings = $multi<string>((x) => x, "STR");

export const float = $single(coerceFloat, "NUM");

export const hex = $single(coerceHexInt, "HEX");

export const int = $single(coerceInt, "INT");

export const floats = $multi(coerceFloats, "NUM");

export const hexes = $multi(coerceHexInts, "HEX");

export const ints = $multi(coerceInts, "INT");

export const json = <T, S extends Partial<ArgSpec<T>>>(
    spec: S
): S & { coerce: Fn<string, T>; hint: string } => ({
    coerce: coerceJson,
    hint: "JSON",
    ...spec,
});

export const oneOf = <K extends string, S extends Partial<ArgSpec<K>>>(
    opts: readonly K[],
    spec: S
): S & { coerce: Fn<string, K>; hint: string; desc: string } => ({
    coerce: coerceOneOf(opts),
    hint: "ID",
    ...spec,
    desc: `${spec.desc}: ${opts.map((x) => `'${x}'`).join(", ")}`,
});

export const oneOfMulti = <
    K extends string,
    S extends Partial<ArgSpec<K[]> & { comma: boolean }>
>(
    opts: readonly K[],
    spec: S
): S & {
    coerce: Fn<string[], K[]>;
    hint: string;
    multi: true;
} & { desc: string } => ({
    coerce: (xs) => xs.map(coerceOneOf(opts)),
    hint: "ID" + (spec.comma ? "[,..]" : ""),
    multi: true,
    ...spec,
    desc: `${spec.desc}: ${opts.map((x) => `'${x}'`).join(", ")}`,
});
