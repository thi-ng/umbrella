import type { Fn } from "@thi.ng/api";
import type { ArgSpec, KVDict } from "./api";
import {
    coerceFloat,
    coerceFloats,
    coerceHexInt,
    coerceHexInts,
    coerceInt,
    coerceInts,
    coerceJson,
    coerceKV,
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

/**
 * Returns a full {@link ArgSpec} for a boolean flag.
 *
 * @param spec
 */
export const flag = <S extends Partial<ArgSpec<boolean>>>(
    spec: S
): S & { flag: true } => ({ flag: true, ...spec });

/**
 * Returns a full {@link ArgSpec} for a string value arg.
 *
 * @param spec
 */
export const string = <S extends Partial<ArgSpec<string>>>(
    spec: S
): S & { hint: string } => ({ hint: "STR", ...spec });

/**
 * Multi-arg version of {@link string}. Returns a full {@link ArgSpec} for a
 * multi string value arg. This argument can be provided mutiple times with
 * values collected into an array.
 *
 * @param spec
 */
export const strings = $multi<string>((x) => x, "STR");

/**
 * Returns a full {@link ArgSpec} for a floating point value arg. The value
 * will be autoatically coerced into a number using {@link coerceFloat}.
 *
 * @param spec
 */
export const float = $single(coerceFloat, "NUM");

/**
 * Returns a full {@link ArgSpec} for a single hex integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceHexInt}.
 *
 * @param spec
 */
export const hex = $single(coerceHexInt, "HEX");

/**
 * Returns a full {@link ArgSpec} for a single integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceInt}.
 *
 * @param spec
 */
export const int = $single(coerceInt, "INT");

/**
 * Multi-arg version of {@link float}. Returns a full {@link ArgSpec} for a
 * multi floating point value arg. This argument can be provided mutiple times
 * with values being coerced into numbers and collected into an array.
 *
 * @param spec
 */
export const floats = $multi(coerceFloats, "NUM");

/**
 * Multi-arg version of {@link hex}. Returns a full {@link ArgSpec} for a multi
 * hex integer value arg. This argument can be provided mutiple times with
 * values being coerced into numbers and collected into an array.
 *
 * @param spec
 */
export const hexes = $multi(coerceHexInts, "HEX");

/**
 * Multi-arg version of {@link int}. Returns a full {@link ArgSpec} for a multi
 * integer value arg. This argument can be provided mutiple times with values
 * being coerced into numbers and collected into an array.
 *
 * @param spec
 */
export const ints = $multi(coerceInts, "INT");

/**
 * Returns full {@link ArgSpec} for a JSON value arg. The raw CLI value string
 * will be automcatically coerced using {@link coerceJson}.
 *
 * @param spec
 */
export const json = <T, S extends Partial<ArgSpec<T>>>(
    spec: S
): S & { coerce: Fn<string, T>; hint: string } => ({
    coerce: coerceJson,
    hint: "JSON",
    ...spec,
});

/**
 * Returns full {@link ArgSpec} for an enum-like string value arg. The raw CLI
 * value string will be automcatically validated using {@link coerceOneOf}.
 *
 * @param opts
 * @param spec
 */
export const oneOf = <K extends string, S extends Partial<ArgSpec<K>>>(
    opts: readonly K[],
    spec: S
): S & { coerce: Fn<string, K>; hint: string; desc: string } => ({
    coerce: coerceOneOf(opts),
    hint: "ID",
    ...spec,
    desc: `${spec.desc}: ${opts.map((x) => `'${x}'`).join(", ")}`,
});

/**
 * Multi-arg version of {@link oneOf}. Returns full {@link ArgSpec} for multiple
 * enum-like string value args. The raw CLI value strings will be automcatically
 * validated using {@link coerceOneOf} and collected into an array.
 *
 * @param opts
 * @param spec
 */
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

/**
 * Returns a full {@link ArgSpec} for multiple `key=value` pair args, coerced
 * into a result object.
 *
 * @remarks
 * The default delimiter (`=`) can be overridden. Also by default, key-only args
 * are allowed and will receive a `"true"` as their value. However, if `strict`
 * is true, only full KV pairs are allowed.
 *
 * @param spec
 * @param delim
 */
export const kvPairs = <S extends Partial<ArgSpec<KVDict>>>(
    spec: S,
    delim = "=",
    strict?: boolean
): S & { coerce: Fn<string[], KVDict>; hint: string; multi: true } => ({
    coerce: coerceKV(delim, strict),
    hint: `key${delim}val`,
    multi: true,
    ...spec,
});
