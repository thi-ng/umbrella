// SPDX-License-Identifier: Apache-2.0
import { identity, type Fn } from "@thi.ng/api/fn";
import { repeat } from "@thi.ng/strings/repeat";
import type { ArgSpec, KVDict, KVMultiDict, Tuple } from "./api.js";
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
	coerceTuple,
} from "./coerce.js";

const $single =
	<T = number>(coerce: Fn<string, T>, hint: string) =>
	<S extends Partial<ArgSpec<T>>>(
		spec: S
	): S & { coerce: Fn<string, T>; hint: string; group: string } => ({
		coerce,
		hint,
		group: "main",
		...spec,
	});

const $multi =
	<T = number>(coerce: Fn<string[], T[]>, hint: string) =>
	<S extends Partial<ArgSpec<T[]> & { delim: string }>>(
		spec: S
	): S & {
		coerce: Fn<string[], T[]>;
		hint: string;
		multi: true;
		group: string;
	} => ({
		hint: $hint(hint, spec.delim),
		multi: true,
		coerce,
		group: "main",
		...spec,
	});

const $hint = (hint: string, delim?: string) =>
	hint + (delim ? `[${delim}..]` : "");

/**
 * Returns a full {@link ArgSpec} for a boolean flag. The mere presence of this
 * arg will enable the flag.
 *
 * @param spec -
 */
export const flag = <S extends Partial<ArgSpec<boolean>>>(
	spec: S
): S & { flag: true; default: boolean; group: string } => ({
	flag: true,
	default: false,
	group: "flags",
	...spec,
});

/**
 * Returns a full {@link ArgSpec} for a string value arg.
 *
 * @param spec -
 */
export const string = $single<string>(identity, "STR");

/**
 * Multi-arg version of {@link string}. Returns a full {@link ArgSpec} for a
 * multi string value arg. This argument can be provided mutiple times with
 * values collected into an array.
 *
 * @param spec -
 */
export const strings = $multi<string>(identity, "STR");

/**
 * Returns a full {@link ArgSpec} for a floating point value arg. The value
 * will be autoatically coerced into a number using {@link coerceFloat}.
 *
 * @param spec -
 */
export const float = $single(coerceFloat, "NUM");

/**
 * Returns a full {@link ArgSpec} for a single hex integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceHexInt}.
 *
 * @param spec -
 */
export const hex = $single(coerceHexInt, "HEX");

/**
 * Returns a full {@link ArgSpec} for a single integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceInt}.
 *
 * @param spec -
 */
export const int = $single(coerceInt, "INT");

/**
 * Multi-arg version of {@link float}. Returns a full {@link ArgSpec} for a
 * multi floating point value arg. This argument can be provided mutiple times
 * with values being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const floats = $multi(coerceFloats, "NUM");

/**
 * Multi-arg version of {@link hex}. Returns a full {@link ArgSpec} for a multi
 * hex integer value arg. This argument can be provided mutiple times with
 * values being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const hexes = $multi(coerceHexInts, "HEX");

/**
 * Multi-arg version of {@link int}. Returns a full {@link ArgSpec} for a multi
 * integer value arg. This argument can be provided mutiple times with values
 * being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const ints = $multi(coerceInts, "INT");

/**
 * Returns full {@link ArgSpec} for a JSON value arg. The raw CLI value string
 * will be automcatically coerced using {@link coerceJson}.
 *
 * @param spec -
 */
export const json = <T, S extends Partial<ArgSpec<T>>>(
	spec: S
): S & { coerce: Fn<string, T>; hint: string; group: string } => ({
	coerce: coerceJson,
	hint: "JSON",
	group: "main",
	...spec,
});

const $desc = (opts: readonly string[], prefix?: string) =>
	`${prefix ? prefix + ": " : ""}${opts.map((x) => `"${x}"`).join(", ")}`;

/**
 * Returns full {@link ArgSpec} for an enum-like string value arg. The raw CLI
 * value string will be automcatically validated using {@link coerceOneOf}.
 *
 * @param opts -
 * @param spec -
 */
export const oneOf = <K extends string, S extends Partial<ArgSpec<K>>>(
	opts: readonly K[],
	spec: S
): S & { coerce: Fn<string, K>; hint: string; group: string } & {
	desc: string;
} => ({
	coerce: coerceOneOf(opts),
	hint: "ID",
	group: "main",
	...spec,
	desc: $desc(opts, spec.desc),
});

/**
 * Multi-arg version of {@link oneOf}. Returns full {@link ArgSpec} for multiple
 * enum-like string value args. The raw CLI value strings will be automcatically
 * validated using {@link coerceOneOf} and collected into an array.
 *
 * @param opts -
 * @param spec -
 */
export const oneOfMulti = <
	K extends string,
	S extends Partial<ArgSpec<K[]> & { delim: string }>
>(
	opts: readonly K[],
	spec: S
): S & {
	coerce: Fn<string[], K[]>;
	hint: string;
	multi: true;
	group: string;
} & { desc: string } => ({
	coerce: (values) => values.map(coerceOneOf(opts)),
	hint: $hint("ID", spec.delim),
	multi: true,
	group: "main",
	...spec,
	desc: $desc(opts, spec.desc),
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
 * @param spec -
 * @param delim -
 */
export const kvPairs = <S extends Partial<ArgSpec<KVDict>>>(
	spec: S,
	delim = "=",
	strict?: boolean
): S & {
	coerce: Fn<string[], KVDict>;
	hint: string;
	multi: true;
	group: string;
} => ({
	coerce: coerceKV(delim, strict),
	hint: `key${delim}val`,
	multi: true,
	group: "main",
	...spec,
});

/**
 * Like {@link kvPairs}, but coerces KV pairs into a result {@link KVMultiDict}
 * which supports multiple values per given key (each key's values are collected
 * into arrays).
 *
 * @param spec -
 * @param delim -
 * @param strict -
 */
export const kvPairsMulti = <S extends Partial<ArgSpec<KVMultiDict>>>(
	spec: S,
	delim = "=",
	strict?: boolean
): S & {
	coerce: Fn<string[], KVMultiDict>;
	hint: string;
	multi: true;
	group: string;
} => ({
	coerce: coerceKV(delim, strict, true),
	hint: `key${delim}val(s)`,
	multi: true,
	group: "main",
	...spec,
});

/**
 * Returns a full {@link ArgSpec} for a fixed `size` tuple extracted from a
 * single value string. The individual values are delimited by `delim` and will
 * be coerced into their target type via `coerce`. The result tuple will be
 * wrapped in a {@link Tuple} instance.
 *
 * @remarks
 * An error will be thrown if the number of extracted values differs from the
 * specified tuple size or any value coercion fails.
 *
 * @example
 * ```ts tangle:../export/tuple.ts
 * import { coerceInt, parse, tuple } from "@thi.ng/args";
 *
 * console.log(
 *   parse({ a: tuple(coerceInt, 2, {})}, ["--a", "1,2"])
 * );
 * // {
 * //   result: { a: Tuple { value: [1, 2] } },
 * //   index: 2,
 * //   rest: [],
 * //   done: true
 * // }
 * ```
 *
 * @param coerce -
 * @param size -
 * @param spec -
 * @param delim -
 */
export const tuple = <T, S extends Partial<ArgSpec<Tuple<T>>>>(
	coerce: Fn<string, T>,
	size: number,
	spec: S,
	delim = ","
): S & { coerce: Fn<string, Tuple<T>>; hint: string; group: string } => ({
	coerce: coerceTuple(coerce, size, delim),
	hint: [...repeat("N", size)].join(delim),
	group: "main",
	...spec,
});

/**
 * Syntax sugar for `tuple(coerceInt, size, {...}, delim)`.
 *
 * @param size -
 * @param spec -
 * @param delim -
 */
export const size = <S extends Partial<ArgSpec<Tuple<number>>>>(
	size: number,
	spec: S,
	delim = "x"
) => tuple(coerceInt, size, spec, delim);

/**
 * Syntax sugar for `tuple(coerceFloat, size, {...}, delim)`.
 *
 * @param size -
 * @param spec -
 * @param delim -
 */
export const vec = <S extends Partial<ArgSpec<Tuple<number>>>>(
	size: number,
	spec: S,
	delim = ","
) => tuple(coerceFloat, size, spec, delim);

/////////////////// arg presets

/**
 * Re-usable preset arg spec for a `--dry-run` flag.
 */
export const ARG_DRY_RUN = {
	dryRun: flag({
		desc: "Dry run (no changes applied)",
	}),
};

/**
 * Re-usable preset arg spec for a `--quiet` / `-q` flag.
 */
export const ARG_QUIET = {
	quiet: flag({
		alias: "q",
		desc: "Disable all logging",
	}),
};

/**
 * Re-usable preset arg spec for a `--verbose` / `-v` flag.
 */
export const ARG_VERBOSE = {
	verbose: flag({
		alias: "v",
		desc: "Display extra information",
	}),
};

/**
 * Higher-order re-usable preset arg spec for a `--out-dir` / `-O` arg. Accepts
 * optional default value (e.g. sourced from an env var). If the the
 * `defaultVal` is defined, the arg is declared as optional, otherwise
 * mandatory.
 *
 * @param defaultVal
 * @param desc
 */
export const ARG_OUT_DIR = <T extends string | undefined>(
	defaultVal?: string,
	desc?: string
): {
	outDir: ReturnType<typeof string> &
		(T extends string ? { default: string } : { optional: false });
} => ({
	outDir: <any>string({
		alias: "O",
		desc: "Output directory" + (desc ?? ""),
		hint: "PATH",
		default: defaultVal,
		optional: !!defaultVal,
	}),
});

/**
 * Higher-order re-usable preset arg spec for a `--out-file` / `-o` arg. Accepts
 * optional default value (e.g. sourced from an env var). If the the
 * `defaultVal` is defined, the arg is declared as optional, otherwise
 * mandatory.
 *
 * @param defaultVal
 * @param desc
 */
export const ARG_OUT_FILE = <T extends string | undefined>(
	defaultVal?: T,
	desc?: string
): {
	outFile: ReturnType<typeof string> &
		(T extends string ? { default: string } : { optional: false });
} => ({
	outFile: <any>string({
		alias: "o",
		desc: "Output file" + (desc ?? ""),
		hint: "PATH",
		default: defaultVal,
		optional: !!defaultVal,
	}),
});
