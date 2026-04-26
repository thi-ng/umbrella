import { isArray as $isArray } from "@thi.ng/checks/is-array";
import { isArrayOf as $isArrayOf } from "@thi.ng/checks/is-array-of";
import { isBoolean as $isBoolean } from "@thi.ng/checks/is-boolean";
import { isDate as $isDate } from "@thi.ng/checks/is-date";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNumber as $isNumber } from "@thi.ng/checks/is-number";
import { isObjectOf as $isObjectOf } from "@thi.ng/checks/is-object-of";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isRegExp as $isRegExp } from "@thi.ng/checks/is-regexp";
import { isString as $isString } from "@thi.ng/checks/is-string";
import { defError, type CustomError } from "@thi.ng/errors/deferror";
import type { Validator } from "./api.js";

/**
 * Error type thrown by validation functions.
 */
export const ValidationError = defError(() => `validation error`);

/**
 * Higher order function. Takes a number of {@link Validator}s and returns a
 * function which when called, applies validators in sequence to provided value.
 * Returns true if all validators passed, otherwise throws an error if any of
 * the validators fails.
 *
 * @example
 * ```ts tangle:../export/validator.ts
 * import * as v from "@thi.ng/validate";
 *
 * // build validation function to check if a value is...
 * const check = v.validator(
 *   // a plain object
 *   v.isObject(),
 *   // its keys are matching given validation criteria:
 *   v.hasKeysOf({
 *     // number in [0,1000] range
 *     id: [v.isNumber(), v.isInRange(1,1000)],
 *     // optional title string (i.e. nullish values allowed)
 *     title: v.optional(v.isString()),
 *     // enum type
 *     type: v.isEnum(["file", "url", "record"])
 *   })
 * );
 *
 * try {
 *   check({ id: 123, title: "abc", type: "file" });
 *   // true
 *
 *   // validation will fail:
 *   check({ id: 999, type: "foo" })
 * } catch(e) {
 *   console.warn(e);
 * }
 *
 * // validation error: required value to be one of: file, url, record (key: type)
 * ```
 *
 * @param validators
 */
export const validator =
	(...validators: Validator[]) =>
	(x: any) => {
		for (let { coerce, valid, msg } of validators) {
			if (coerce) x = coerce(x);
			if (!valid(x)) {
				if (isFunction(msg)) msg = msg(x);
				throw new ValidationError(msg ?? "failed validation");
			}
		}
		return true;
	};

/**
 * Higher order validator. Takes an existing validator and returns an augmented
 * version which also allows value to be nullish.
 *
 * @param validator
 */
export const optional = ({ coerce, valid, msg }: Validator): Validator => ({
	coerce,
	valid: (x) => x == null || valid(x),
	msg,
});

/** @internal */
const __asArray = (v: Validator | Validator[]) => ($isArray(v) ? v : [v]);

/**
 * Higher order validator. Takes a numer of validators and returns a new one
 * which will apply the validators in given order, but return when the first one
 * succeeds and only fails if all of the validators failed.
 *
 * @param validators
 */
export const oneOf = (validators: (Validator | Validator[])[]): Validator => {
	let lastMsg: string | undefined;
	return {
		valid: (x: any) => {
			lastMsg = undefined;
			for (let v of validators) {
				try {
					return validator(...__asArray(v))(x);
				} catch (e) {
					lastMsg =
						(<CustomError>e).origMessage ?? (<Error>e).message;
				}
			}
			return false;
		},
		msg: () => lastMsg ?? "invalid value",
	};
};

/**
 * Returns validator to check if value is undefined.
 *
 * @param msg
 */
export const isUndefined = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x === undefined,
	msg: msg ?? `expected undefined value`,
});

/**
 * Returns validator to check if value is nullish.
 *
 * @param msg
 */
export const isNullish = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x === null,
	msg: msg ?? `expected nullish value`,
});

export const isBoolean = (msg?: Validator["msg"]): Validator => ({
	valid: $isBoolean,
	msg: msg ?? `required boolean value`,
});

export const isNumber = (msg?: Validator["msg"]): Validator => ({
	valid: $isNumber,
	msg: msg ?? `required number value`,
});

export const isString = (msg?: Validator["msg"]): Validator => ({
	valid: $isString,
	msg: msg ?? `required string value`,
});

export const isDate = (msg?: Validator["msg"]): Validator => ({
	valid: $isDate,
	msg: msg ?? `required date value`,
});

export const isRegExp = (msg?: Validator["msg"]): Validator => ({
	valid: $isRegExp,
	msg: msg ?? `required regexp value`,
});

export const isObject = (msg?: Validator["msg"]): Validator => ({
	valid: isPlainObject,
	msg: msg ?? `required object value`,
});

/**
 * Returns validator to check if value is a plain object and the values of all
 * its keys are matching given validators.
 *
 * @param validators
 * @param msg
 */
export const isObjectOf = (
	validators: Validator | Validator[],
	msg?: Validator["msg"]
): Validator => ({
	valid: $isObjectOf(validator(...__asArray(validators))),
	msg: msg ?? `required object value`,
});

export const isArray = (msg?: Validator["msg"]): Validator => ({
	valid: $isArray,
	msg: msg ?? `required array value`,
});

export const isArrayOf = (
	validators: Validator | Validator[],
	msg?: Validator["msg"]
): Validator => ({
	valid: $isArrayOf(validator(...__asArray(validators))),
	msg: msg ?? `required array value`,
});

export const hasRequiredKeys = (
	keys: string[],
	msg?: Validator["msg"]
): Validator => ({
	valid: (x) => {
		const $keys = new Set(Object.keys(x));
		return keys.every((k) => $keys.has(k));
	},
	msg: msg ?? `required keys: ${keys.join(", ")}`,
});

export const hasKeysOf = (
	validators: Record<PropertyKey, Validator | Validator[]>
): Validator => ({
	valid: (x: any) => {
		if (x == null) return false;
		for (let [key, v] of Object.entries(validators)) {
			try {
				validator(...__asArray(v))(x[key]);
			} catch (e) {
				throw new ValidationError(
					((<CustomError>e).origMessage ?? (<Error>e).message) +
						` (key: ${key})`
				);
			}
		}
		return true;
	},
});

/**
 * Returns validator to check if value is one of the given options.
 *
 * @param opts
 * @param msg
 */
export const isEnum = <T>(opts: T[], msg?: Validator["msg"]): Validator => ({
	valid: (x) => opts.includes(x),
	msg: msg ?? `required value to be one of: ${opts.join(", ")}`,
});

/**
 * Returns validator to check if value is in given closed [min,max] interval.
 *
 * @param min
 * @param max
 * @param msg
 */
export const isInRange = <T extends number | string>(
	min: T,
	max: T,
	msg?: Validator["msg"]
): Validator => ({
	valid: (x) => x >= min && x <= max,
	msg: msg ?? ((x) => `value ${x} not in range [${min},${max}]`),
});

export const isPositive = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x > 0,
	msg: msg ?? `required positive value`,
});

export const isNegative = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x < 0,
	msg: msg ?? `required negative number`,
});

export const isNonPositive = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x <= 0,
	msg: msg ?? `required non-positive value`,
});
export const isNonNegative = (msg?: Validator["msg"]): Validator => ({
	valid: (x) => x >= 0,
	msg: msg ?? `required non-negative value`,
});

export const isLength = (n: number, msg?: Validator["msg"]): Validator => ({
	valid: (x) => x?.length === n,
	msg: msg ?? `required length (${n})`,
});

export const isMinLength = (n: number, msg?: Validator["msg"]): Validator => ({
	valid: (x) => x?.length >= n,
	msg: msg ?? `required min. length (${n})`,
});

export const isMaxLength = (n: number, msg?: Validator["msg"]): Validator => ({
	valid: (x) => x?.length <= n,
	msg: msg ?? `required max. length (${n})`,
});

export const isMinMaxLength = (
	min: number,
	max: number,
	msg?: Validator["msg"]
): Validator => ({
	valid: (x) => x?.length >= min && x?.length <= max,
	msg: msg ?? `length not in [${min},${max}] range`,
});

/**
 * Returns validator to check if value is a string and matches given regexp.
 *
 * @param re
 * @param msg
 */
export const matchesRegexp = (
	re: RegExp,
	msg?: Validator["msg"]
): Validator => ({
	valid: (x) => $isString(x) && re.test(x),
	msg: msg ?? `doesn't match pattern`,
});
