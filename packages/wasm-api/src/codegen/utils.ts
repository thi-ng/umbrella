import type { BigType } from "@thi.ng/api";
import { isString } from "@thi.ng/checks/is-string";
import type { CodeGenOpts, StructField, WasmPrim, WasmPrim32 } from "../api.js";

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

/**
 * Takes an array of strings or splits given string into lines, prefixes each
 * line with given `prefix` and then returns rejoined result.
 *
 * @param prefix
 * @param str
 */
export const prefixLines = (prefix: string, str: string | string[]) =>
	(isString(str) ? str.split("\n") : str)
		.map((line) => prefix + line)
		.join("\n");

/**
 * Returns true if `type` is "slice".
 * @param type
 */
export const isStringSlice = (
	type: CodeGenOpts["stringType"]
): type is "slice" => type === "slice";

export const pointerFields = (fields: StructField[]) =>
	fields.filter((f) => f.tag === "ptr");

/**
 * Returns filtered array of struct fields of only "string" fields.
 *
 * @param fields
 */
export const stringFields = (fields: StructField[]) =>
	fields.filter((f) => isWasmString(f.type) && f.tag !== "ptr");

/**
 * Yield iterator of given lines, each with applied indentation based on given
 * scope regexp's which are applied to each line to increase or decrease
 * indentation level. If `scopeEnd` succeeds the level is decreased for the
 * current line. If `scopeStart` succeeds, the indent is increased for the next
 * line...
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
