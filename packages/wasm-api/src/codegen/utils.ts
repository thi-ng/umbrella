import type { BigType } from "@thi.ng/api";
import type { WasmPrim, WasmPrim32 } from "../api.js";

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
export const isPrim = (x: string): x is WasmPrim =>
	isNumeric(x) || isBigNumeric(x);

/**
 * Splits given string into lines, prefixes each with given `prefix` and then
 * returns rejoined result.
 *
 * @param prefix
 * @param str
 */
export const prefixLines = (prefix: string, str: string) =>
	str
		.split("\n")
		.map((line) => prefix + line)
		.join("\n");
