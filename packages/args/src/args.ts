// SPDX-License-Identifier: Apache-2.0
import { identity, type Fn } from "@thi.ng/api/fn";
import { repeat } from "@thi.ng/strings/repeat";
import type {
	ArgDef,
	ArgDefRequired,
	ArgSpec,
	KVDict,
	KVMultiDict,
	Tuple,
} from "./api.js";
import {
	coerceFloat,
	coerceHexInt,
	coerceInt,
	coerceJson,
	coerceKV,
	coerceOneOf,
	coerceTuple,
} from "./coerce.js";

const __desc = (opts: readonly string[], prefix?: string) =>
	`${prefix ? prefix + ": " : ""}${opts.map((x) => `"${x}"`).join(", ")}`;

const __hint = (hint: string, delim?: string) =>
	hint + (delim ? `[${delim}..]` : "");

const defSingle =
	<ID extends string, T>(type: ID, coerce: Fn<string, T>, hint: string) =>
	<S extends ArgDef | ArgDefRequired<T>>(
		spec: S
	): S & {
		type: ID;
		coerce: Fn<string, T>;
		hint: string;
		group: string;
	} => ({
		type,
		coerce,
		hint,
		group: "main",
		...spec,
	});

const defMulti =
	<ID extends string, T extends unknown[]>(
		type: ID,
		coerce: Fn<string, T[0]>,
		hint: string,
		delim = ","
	) =>
	<S extends ArgDef | ArgDefRequired<T>>(
		spec: S & { delim?: string }
	): S & {
		type: ID;
		coerce: Fn<string[], T>;
		hint: string;
		group: string;
		delim: string;
		multi: true;
	} => ({
		type,
		delim,
		hint: __hint(hint, spec.delim ?? delim),
		coerce: (x) => <T>x.map(coerce),
		group: "main",
		multi: true,
		...spec,
	});

/**
 * Returns a full {@link ArgSpec} for a boolean flag. The mere presence of this
 * arg will enable the flag.
 *
 * @param spec -
 */
export const flag = <S extends ArgDef>(
	spec: S
): S & { type: "flag"; default: boolean; group: string } => ({
	type: "flag",
	group: "flags",
	default: false,
	...spec,
});

/**
 * Returns a full {@link ArgSpec} for a string value arg.
 *
 * @param spec -
 */
export const string = defSingle("string", identity, "STR");

/**
 * Multi-arg version of {@link string}. Returns a full {@link ArgSpec} for a
 * multi string value arg. This argument can be provided mutiple times with
 * values collected into an array.
 *
 * @param spec -
 */
export const strings = defMulti("strings", identity, "STR");

/**
 * Returns a full {@link ArgSpec} for a floating point value arg. The value
 * will be autoatically coerced into a number using {@link coerceFloat}.
 *
 * @param spec -
 */
export const float = defSingle("float", coerceFloat, "NUM");

/**
 * Multi-arg version of {@link float}. Returns a full {@link ArgSpec} for a
 * multi floating point value arg. This argument can be provided mutiple times
 * with values being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const floats = defMulti("floats", coerceFloat, "NUM");

/**
 * Returns a full {@link ArgSpec} for a single integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceInt}.
 *
 * @param spec -
 */
export const int = defSingle("int", coerceInt, "INT");

/**
 * Multi-arg version of {@link int}. Returns a full {@link ArgSpec} for a multi
 * integer value arg. This argument can be provided mutiple times with values
 * being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const ints = defMulti("ints", coerceInt, "INT");

/**
 * Returns a full {@link ArgSpec} for a single hex integer value arg. The value
 * will be autoatically coerced into a number using {@link coerceHexInt}.
 *
 * @param spec -
 */
export const hex = defSingle("hex", coerceHexInt, "HEX");

/**
 * Multi-arg version of {@link hex}. Returns a full {@link ArgSpec} for a multi
 * hex integer value arg. This argument can be provided mutiple times with
 * values being coerced into numbers and collected into an array.
 *
 * @param spec -
 */
export const hexes = defMulti("hexes", coerceHexInt, "HEX");

/**
 * Returns full {@link ArgSpec} for an enum-like string value arg. The raw CLI
 * value string will be automcatically validated using {@link coerceOneOf}.
 *
 * @param opts -
 * @param spec -
 */
export const oneOf = <K extends string, S extends ArgDef | ArgDefRequired<K>>(
	spec: S & { opts: readonly K[] }
): S & {
	type: "oneOf";
	coerce: Fn<string, K>;
	desc: string;
	hint: string;
	group: string;
	opts: readonly K[];
} => ({
	...spec,
	type: "oneOf",
	coerce: coerceOneOf(spec.opts),
	hint: spec.hint ?? "ID",
	group: spec.group ?? "main",
	desc: __desc(spec.opts, spec.desc),
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
	S extends ArgDef | ArgDefRequired<K>
>(
	spec: S & { opts: readonly K[]; delim?: string }
): S & {
	type: "oneOfMulti";
	coerce: Fn<string, K>;
	desc: string;
	hint: string;
	group: string;
	multi: true;
	opts: readonly K[];
	delim?: string;
} => ({
	...spec,
	type: "oneOfMulti",
	coerce: coerceOneOf(spec.opts),
	hint: spec.hint ?? __hint("ID", spec.delim),
	group: spec.group ?? "main",
	desc: __desc(spec.opts, spec.desc),
	multi: true,
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
 */
export const kvPairs = <S extends ArgDef | ArgDefRequired<KVDict>>(
	spec: S & { delim?: string; strict?: boolean }
): S & {
	type: "kvPairs";
	coerce: Fn<string[], KVDict>;
	hint: string;
	group: string;
	multi: true;
	kvDelim?: string;
	strict?: boolean;
	split: false;
} => {
	if (!spec.delim) spec.delim = "=";
	return {
		type: "kvPairs",
		coerce: coerceKV(spec.delim, spec.strict, false),
		hint: `key${spec.delim}val`,
		group: "main",
		multi: true,
		split: false,
		...spec,
	};
};

/**
 * Like {@link kvPairs}, but coerces KV pairs into a result {@link KVMultiDict}
 * which supports multiple values per given key (each key's values are collected
 * into arrays).
 *
 * @param spec -
 */
export const kvPairsMulti = <S extends ArgDef | ArgDefRequired<KVMultiDict>>(
	spec: S & { delim?: string; strict?: boolean }
): S & {
	type: "kvPairsMulti";
	coerce: Fn<string[], KVMultiDict>;
	hint: string;
	group: string;
	multi: true;
	delim?: string;
	strict?: boolean;
} => ({
	type: "kvPairsMulti",
	coerce: coerceKV(spec.delim, spec.strict, true),
	hint: `key${spec.delim}val`,
	group: "main",
	multi: true,
	...spec,
});

/**
 * Returns a full {@link ArgSpec} for a fixed `size` tuple extracted from a
 * single value string. The individual values are delimited by `delim` (default:
 * `,`) and will be coerced into their target type via `coerce`. The result
 * tuple will be wrapped in a {@link Tuple} instance.
 *
 * @remarks
 * An error will be thrown if the number of extracted values differs from the
 * specified tuple size or any value coercion fails.
 *
 * @example
 * ```ts tangle:../export/tuple.ts
 * import { coerceInt, parse, tuple, type Tuple } from "@thi.ng/args";
 *
 * interface A {
 *   a?: Tuple<number>;
 * }
 *
 * console.log(
 *   parse<A>(
 *     { a: tuple({ size: 2, coerce: coerceInt }) },
 *     ["--a", "1,2"],
 *     { start: 0 }
 *   )
 * );
 * // {
 * //   result: { a: Tuple { value: [1, 2] } },
 * //   index: 2,
 * //   rest: [],
 * //   done: true
 * // }
 * ```
 *
 * @param spec -
 */
export const tuple = <T, S extends ArgDef | ArgDefRequired<Tuple<T>>>(
	spec: S & { size: number; coerce: Fn<string, T>; delim?: string }
): S & {
	type: "tuple";
	coerce: Fn<string, Tuple<T>>;
	hint: string;
	group: string;
	size: number;
	delim?: string;
} => {
	if (!spec.delim) spec.delim = ",";
	return {
		...spec,
		type: "tuple",
		coerce: coerceTuple(spec.coerce, spec.size, spec.delim),
		hint: spec.hint ?? [...repeat("N", spec.size)].join(spec.delim),
		group: spec.group ?? "main",
	};
};

/**
 * Syntax sugar for `tuple(size, coerceInt, {...})`. See {@link tuple} for
 * further details.
 *
 * @param spec -
 */
export const size = <S extends ArgDef | ArgDefRequired<Tuple<number>>>(
	spec: S & { size: number; delim?: string }
) => tuple({ ...spec, coerce: coerceInt });

/**
 * Syntax sugar for `tuple(size, coerceFloat, {...})`. See {@link tuple} for
 * further details.
 *
 * @param spec -
 */
export const vec = <S extends ArgDef | ArgDefRequired<Tuple<number>>>(
	spec: S & { size: number; delim?: string }
) => tuple({ ...spec, coerce: coerceFloat });

/**
 * Returns full {@link ArgSpec} for a JSON value arg. The raw CLI value string
 * will be automcatically coerced using {@link coerceJson}.
 *
 * @param spec -
 */
export const json = <T, S extends ArgDef | ArgDefRequired<T>>(
	spec: S
): S & {
	type: "json";
	coerce: Fn<string, T>;
	hint: string;
	group: string;
} => ({
	type: "json",
	coerce: coerceJson,
	hint: "JSON",
	group: "main",
	...spec,
});

/**
 * Index which maps arg type IDs to their factory functions
 */
export const ARG_TYPES: Record<string, Fn<any, ArgSpec<any>>> = {
	flag,
	float,
	floats,
	hex,
	hexes,
	int,
	ints,
	json,
	kvPairs,
	kvPairsMulti,
	oneOf,
	oneOfMulti,
	string,
	strings,
	tuple,
};

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
		required: !!defaultVal,
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
		required: !!defaultVal,
	}),
});
