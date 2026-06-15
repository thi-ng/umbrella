// SPDX-License-Identifier: Apache-2.0
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import type { CoercionFn, CoercionHOF } from "./api.js";

/**
 * Higher order function. Returns function to parse a `base`-N string value as
 * signed 32bit int. Returns undefined if coerced number `isNaN`.
 *
 * @param base
 */
export const coerceInt =
	(base = 10): CoercionFn =>
	(x) => {
		if (isNumber(x)) return x | 0;
		if (isString(x)) {
			const res = parseInt(x, base);
			if (!isNaN(res)) return res | 0;
		}
	};

/**
 * Higher order function. Returns function to parse a `base`-N string value as
 * unsigned 32bit int. Returns undefined if coerced number `isNaN`.
 *
 * @param base
 */
export const coerceUint =
	(base = 10): CoercionFn =>
	(x) => {
		if (isNumber(x)) return x >>> 0;
		if (isString(x)) {
			const res = parseInt(x, base);
			if (!isNaN(res)) return res;
		}
	};

/**
 * Coercion function to parse string value as JS number. Returns undefined if
 * coerced number `isNaN`.
 *
 * @param x
 */
export const coerceFloat: CoercionFn = (x) => {
	if (isNumber(x)) return x;
	if (isString(x)) {
		const res = parseFloat(x);
		if (!isNaN(res)) return res;
	}
};

/**
 * Higher-order coercion to split a string value with given delimiter into a
 * string array. Usage example: `["split", ";"]`
 *
 * @param delim
 */
export const coerceSplit =
	(delim: string | RegExp = ","): CoercionFn =>
	(x) =>
		isArray(x) ? x : isString(x) ? x.split(delim) : null;

/**
 * Similar to {@link coerceSplit}, but always treats given `delim` as regexp
 * (i.e. creates RegExp if necessary). If given as string, the regexp will be
 * assigned the global flag.
 *
 * @param delim
 */
export const coerceSplitRegExp = (delim: string | RegExp) =>
	coerceSplit(isString(delim) ? new RegExp(delim, "g") : delim);

/**
 * Coercion function to parse string value as JSON.
 *
 * @param x
 */
export const coerceJSON: CoercionFn = (x) =>
	isString(x) ? JSON.parse(x) : null;

export const DEFAULT_COERCIONS: Record<string, CoercionFn | CoercionHOF> = {
	/**
	 * Coerces base-2 (binary) string value to 32bit umsigned int.
	 */
	bits: coerceUint(2),
	/**
	 * Coerces comma-separated string to array of strings
	 */
	csv: coerceSplit(","),
	/**
	 * Coerces string value to JS number.
	 */
	float: coerceFloat,
	/**
	 * Coerces base-16 (hexadecimal) string value to 32bit umsigned int
	 */
	hex: coerceUint(16),
	/**
	 * Coerces string value to 32bit signed int
	 */
	int: coerceInt(),
	/**
	 * Parses string value as JSON
	 */
	json: coerceJSON,
	/**
	 * Coerces base-8 (octal) string value to 32bit umsigned int
	 */
	octal: coerceUint(8),
	/**
	 * Higher-order coercion to split a string value with given delimiter regexp into a
	 * string array. Usage example: `["split", "\\s+"]`
	 *
	 * @remarks
	 * The regexp will be assigned the global flag.
	 */
	splitRegExp: coerceSplitRegExp,
	/**
	 * Higher-order coercion to split a string value with given delimiter into a
	 * string array. Usage example: `["split", ";"]`
	 */
	split: coerceSplit,
	/**
	 * Coerces string value to 32bit unsigned int
	 */
	uint: coerceUint(),
};
