import type { BigType } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isString } from "@thi.ng/checks/is-string";
import { split } from "@thi.ng/strings/split";
import { wordWrapLine, wordWrapLines } from "@thi.ng/strings/word-wrap";
import type {
	CodeGenOpts,
	Field,
	InjectedBody,
	WasmPrim,
	WasmPrim32,
} from "../api.js";

/**
 * Returns true iff `x` is a {@link WasmPrim32}.
 *
 * @param x
 */
export const isNumeric = (x: string): x is WasmPrim32 =>
	/^(([iu](8|16|32))|(f(32|64)))$/.test(x);

/**
 * Returns true iff `x` is a `i64` or `u64`.
 *
 * @param x
 */
export const isBigNumeric = (x: string): x is BigType => /^[iu]64$/.test(x);

/**
 * Returns true iff `x` is a {@link WasmPrim}.
 *
 * @param x
 */
export const isWasmPrim = (x: string): x is WasmPrim =>
	isNumeric(x) || isBigNumeric(x);

export const isWasmString = (x: string): x is "string" => x === "string";

export const isPadding = (f: Field) => f.pad != null && f.pad > 0;

export const isPointer = (f: Field) => f.tag === "ptr";

export const isSlice = (f: Field) => f.tag === "slice";

/**
 * Returns true iff the struct field is a pointer, slice or "string" type
 *
 * @param f
 */
export const isPointerLike = (f: Field) =>
	isPointer(f) || isSlice(f) || isWasmString(f.type);

/**
 * Returns true if `type` is "slice".
 *
 * @param type
 */
export const isStringSlice = (
	type: CodeGenOpts["stringType"]
): type is "slice" => type === "slice";

/**
 * Returns filtered array of struct fields of with "ptr" tag.
 *
 * @param fields
 *
 * @internal
 */
export const pointerFields = (fields: Field[]) =>
	fields.filter((f) => f.tag === "ptr");

/**
 * Returns filtered array of struct fields of only "string" fields.
 *
 * @param fields
 *
 * @internal
 */
export const stringFields = (fields: Field[]) =>
	fields.filter((f) => isWasmString(f.type) && f.tag !== "ptr");

/**
 * Returns enum identifier formatted according to given opts.
 *
 * @param opts
 * @param name
 *
 * @internal
 */
export const enumName = (opts: CodeGenOpts, name: string) =>
	opts.uppercaseEnums ? name.toUpperCase() : name;

/**
 * Takes an array of strings or splits given string into lines, word wraps and
 * then prefixes each line with given `width` and `prefix`. Returns array of new
 * lines.
 *
 * @param prefix
 * @param str
 * @param width
 */
export const prefixLines = (
	prefix: string,
	str: string | string[],
	width: number
) =>
	(isString(str)
		? wordWrapLines(str, { width: width - prefix.length })
		: str.flatMap((x) => wordWrapLine(x, { width: width - prefix.length }))
	).map((line) => prefix + line);

export const ensureLines = (
	src: string | string[] | InjectedBody,
	key?: keyof InjectedBody
): Iterable<string> =>
	isString(src)
		? split(src)
		: isArray(src)
		? src
		: key
		? src[key]
			? ensureLines(src[key]!, key)
			: []
		: [];

/**
 * Yields iterator of given lines, each with applied indentation based on given
 * scope regexp's which are applied to each line to increase or decrease
 * indentation level (the initial indentation level can be specified via
 * optional `level` arg, default 0). If `scopeStart` succeeds, the indent is
 * increased for the _next_ line. If `scopeEnd` succeeds the level is decreased
 * for the _current_ line. ...
 *
 * @param lines
 * @param indent
 * @param scopeStart
 * @param scopeEnd
 * @param level
 */
export function* withIndentation(
	lines: string[],
	indent: string,
	scopeStart: RegExp,
	scopeEnd: RegExp,
	level = 0
) {
	const stack: string[] = new Array(level).fill(indent);
	for (let l of lines) {
		scopeEnd.test(l) && stack.pop();
		const curr = stack.length ? stack[stack.length - 1] : "";
		yield curr + l;
		scopeStart.test(l) && stack.push(curr + indent);
	}
}
