// SPDX-License-Identifier: Apache-2.0
import { isArray as $isArray } from "@thi.ng/checks/is-array";
import { isArrayOf as $isArrayOf } from "@thi.ng/checks/is-array-of";
import { isBoolean as $isBoolean } from "@thi.ng/checks/is-boolean";
import { isDate as $isDate } from "@thi.ng/checks/is-date";
import { isFunction as $isFunction } from "@thi.ng/checks/is-function";
import { isMultipleOf as $isMultipleOf } from "@thi.ng/checks/is-multiple-of";
import { isNumber as $isNumber } from "@thi.ng/checks/is-number";
import { isObjectOf as $isObjectOf } from "@thi.ng/checks/is-object-of";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { isRegExp as $isRegExp } from "@thi.ng/checks/is-regexp";
import { isString as $isString } from "@thi.ng/checks/is-string";
import { isTypedArray as $isTypedArray } from "@thi.ng/checks/is-typedarray";
import { equiv } from "@thi.ng/equiv";
import { defError, type CustomError } from "@thi.ng/errors/deferror";
import type { Validator, ValidatorMsg } from "./api.js";

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
				if ($isFunction(msg)) msg = msg(x);
				throw new ValidationError(msg ?? "failed validation");
			}
		}
		return true;
	};

/** @internal */
const __asArray = (v: Validator | Validator[]) => ($isArray(v) ? v : [v]);

/**
 * Utility validator which always passes.
 */
export const ALWAYS: Validator = { valid: () => true };

/**
 * Utility validator which always fails.
 */
export const NEVER: Validator = { valid: () => false };

/**
 * Higher order validator. Takes existing validator(s) and returns an augmented
 * version which also allows values to be nullish. If more than one validator is
 * given, they're first combined via {@link every}.
 *
 * @param first
 * @param rest
 */
export const optional = (first: Validator, ...rest: Validator[]): Validator => {
	const { coerce, valid, msg } = rest.length ? every(first, ...rest) : first;
	return {
		coerce,
		valid: (x) => x == null || valid(x),
		msg,
	};
};

/**
 * Higher order validator. Takes existing validator and optional error message.
 * Returns an augmented validator which applies logical negation of the original
 * validator.
 *
 * @param validator
 * @param msg
 */
export const not = (
	{ coerce, valid, msg: $msg }: Validator,
	msg?: ValidatorMsg
): Validator => ({
	coerce,
	valid: (x) => {
		try {
			return !valid(x);
		} catch (e) {
			return true;
		}
	},
	msg: msg ?? $msg,
});

/**
 * Higher order validator. Takes one or more validators and returns a new one
 * which will apply the validators in given order, and return successfully with
 * the first one passed and only fails if **none** of the validators passed.
 *
 * @param first
 * @param rest
 */
export const some = (
	first: Validator | Validator[],
	...rest: (Validator | Validator[])[]
): Validator => {
	let lastMsg: string | undefined;
	return {
		valid: (x: any) => {
			lastMsg = undefined;
			for (let $v of [first, ...rest]) {
				try {
					return validator(...__asArray($v))(x);
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
 * Higher order validator. Takes a number of validators and returns a new one
 * which will apply the validators in given order, and only returns success if
 * **all** of the validators passed.
 *
 * @remarks
 * Essentially the same as {@link validator}, but returns a {@link Validator}
 * object (presumably for further composition) instead of a predicate function
 * to apply directly.
 *
 * @param first
 * @param rest
 */
export const every = (first: Validator, ...rest: Validator[]): Validator => ({
	valid: (x) => validator(first, ...rest)(x),
});

/**
 * Returns validator to check if value is undefined.
 *
 * @param msg
 */
export const isUndefined = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x === undefined,
	msg: msg ?? __expectedVal("undefined"),
});

/**
 * Returns validator to check if value is nullish.
 *
 * @param msg
 */
export const isNullish = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x === null,
	msg: msg ?? __expectedVal("nullish"),
});

/**
 * Returns validator to check if value equals `expected` value (uses
 * [`equiv()`](https://thi.ng/equiv) for equality checking).
 *
 * @param expected
 * @param msg
 */
export const isEqual = (expected: any, msg?: ValidatorMsg): Validator => ({
	valid: (x) => equiv(x, expected),
	msg: msg ?? __expected(expected ?? "null"),
});

export const isArray = (msg?: ValidatorMsg): Validator => ({
	valid: $isArray,
	msg: msg ?? __expectedVal("array"),
});

export const isArrayOf = (
	validators: Validator | Validator[],
	msg?: ValidatorMsg
): Validator => ({
	valid: $isArrayOf(validator(...__asArray(validators))),
	msg: msg ?? __expectedVal("array"),
});

export const isBoolean = (msg?: ValidatorMsg): Validator => ({
	valid: $isBoolean,
	msg: msg ?? __expectedVal("boolean"),
});

export const isNumber = (msg?: ValidatorMsg): Validator => ({
	valid: $isNumber,
	msg: msg ?? __expectedVal("number"),
});

/**
 * Return validator to check if value is an integer (not necessarily in the
 * 32bit range, but merely if the value has no fractional part).
 *
 * @param msg
 */
export const isInteger = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => $isNumber(x) && Math.trunc(x) === x,
	msg: msg ?? __expectedVal("integer"),
});

export const isString = (msg?: ValidatorMsg): Validator => ({
	valid: $isString,
	msg: msg ?? __expectedVal("string"),
});

export const isDate = (msg?: ValidatorMsg): Validator => ({
	valid: $isDate,
	msg: msg ?? __expectedVal("date"),
});

export const isFunction = (msg?: ValidatorMsg): Validator => ({
	valid: $isFunction,
	msg: msg ?? __expectedVal("function"),
});

export const isRegExp = (msg?: ValidatorMsg): Validator => ({
	valid: $isRegExp,
	msg: msg ?? __expectedVal("regexp"),
});

/**
 * Returns validator which checks that given value is a plain object (not class).
 *
 * @param msg
 */
export const isObject = (msg?: ValidatorMsg): Validator => ({
	valid: isPlainObject,
	msg: msg ?? __expectedVal("object"),
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
	msg?: ValidatorMsg
): Validator => ({
	valid: $isObjectOf(validator(...__asArray(validators))),
	msg: msg ?? __expectedVal("object"),
});

export const isTypedArray = (msg?: ValidatorMsg): Validator => ({
	valid: $isTypedArray,
	msg: msg ?? __expectedVal(`typed array`),
});

/**
 * Returns validator to check if value is a `Uint8Array`.
 *
 * @param msg
 */
export const isU8Array = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x instanceof Uint8Array,
	msg: msg ?? __expectedVal(`byte array`),
});

/**
 * Returns validator to check if value is a number and a multiple of given
 * `base` (using `eps` tolerance, default: 1e-6).
 *
 * @param base
 * @param eps
 * @param msg
 */
export const isMultipleOf = (
	base: number,
	eps?: number,
	msg?: ValidatorMsg
): Validator => ({
	valid: (x) => $isMultipleOf(base, x, eps),
	msg: msg ?? __expected(`number value, a multiple of ${base}`),
});

/**
 * Returns validator to ensure given `keys` are present in an object, optionally
 * also checks their values are `nonNullish` (default: false). If `onlyKeys` is
 * true (default: false), the validator also checks that no other keys are
 * defined in the object.
 *
 * @param keys
 * @param nonNullish
 * @param onlyKeys
 * @param msg
 */
export const hasRequiredKeys = (
	keys: string[],
	nonNullish = false,
	onlyKeys = false,
	msg?: ValidatorMsg
): Validator => ({
	valid: (x) => {
		if (onlyKeys) __onlyKeys(keys, x);
		return keys.every((k) => k in x && (nonNullish ? x[k] != null : true));
	},
	msg:
		msg ??
		__expected(
			`keys: ${keys.join(", ")}${nonNullish ? " (values must be non-nullish)" : ""}`
		),
});

/**
 * Takes object of validators to check values of different keys in an object.
 * Returns validator which applies all checks, optionally also ensures no other
 * keys are defined (if `onlyKeys` is true, default: false).
 *
 * @param validators
 * @param onlyKeys
 */
export const hasKeysOf = (
	validators: Record<PropertyKey, Validator | Validator[]>,
	onlyKeys = false
): Validator => ({
	valid: (x: any) => {
		if (onlyKeys) __onlyKeys(Object.keys(validators), x);
		for (let k in validators) {
			try {
				validator(...__asArray(validators[k]))(x[k]);
			} catch (e) {
				throw new ValidationError(
					((<CustomError>e).origMessage ?? (<Error>e).message) +
						` (key: ${k})`
				);
			}
		}
		return true;
	},
});

export const hasRequiredPatternKeys = (
	pattern: RegExp,
	nonNullish = false,
	onlyKeys = false,
	msg?: ValidatorMsg
): Validator => ({
	valid: (x: any) => {
		let found = false;
		for (let k in x) {
			if (pattern.test(k)) {
				if (nonNullish && x[k] == null) return false;
				found = true;
			} else if (onlyKeys) {
				__disallowedKey(k);
			}
		}
		return found;
	},
	msg:
		msg ??
		__expected(
			`pattern keys: ${pattern}${nonNullish ? " (values must be non-nullish)" : ""}`
		),
});

export const hasPatternKeysOf = (
	pattern: RegExp,
	validators: Validator | Validator[],
	onlyKeys = false
): Validator => {
	const fn = validator(...__asArray(validators));
	return {
		valid: (x: any) => {
			for (let k in x) {
				if (pattern.test(k)) {
					try {
						fn(x[k]);
					} catch (e) {
						throw new ValidationError(
							((<CustomError>e).origMessage ??
								(<Error>e).message) + ` (key: ${k})`
						);
					}
				} else if (onlyKeys) {
					__disallowedKey(k);
				}
			}
			return true;
		},
	};
};

/** @internal */
const __onlyKeys = (keys: string[], x: any) => {
	for (let k in x) {
		if (!keys.includes(k)) __disallowedKey(k);
	}
};

const __disallowedKey = (key: string) => {
	throw new ValidationError(`key: ${key} not allowed`);
};

/**
 * Returns validator to check if value is one of the given options. Values are
 * checked via `opts.includes(x)`.
 *
 * @param opts
 * @param msg
 */
export const isEnum = <T>(opts: T[], msg?: ValidatorMsg): Validator => ({
	valid: (x) => opts.includes(x),
	msg: msg ?? __expected(`value to be one of: ${opts.join(", ")}`),
});

/**
 * Returns validator to check if value is in given closed [min,max] interval.
 *
 * @param min
 * @param max
 * @param msg
 */
export const isInClosedInterval = <T extends number | string>(
	min: T,
	max: T,
	msg?: ValidatorMsg
): Validator => ({
	valid: (x) => x >= min && x <= max,
	msg: msg ?? __expected(`value in closed interval [${min},${max}]`),
});

/** @deprecated renamed to {@link isInClosedInterval} */
export const isInRange = isInClosedInterval;

export const isInOpenInterval = <T extends number | string>(
	min: T,
	max: T,
	msg?: ValidatorMsg
): Validator => ({
	valid: (x) => x > min && x < max,
	msg: msg ?? __expected(`value in open interval (${min},${max})`),
});

export const isPositive = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x > 0,
	msg: msg ?? __expectedVal("positive"),
});

export const isNegative = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x < 0,
	msg: msg ?? __expectedVal("negative"),
});

export const isNonPositive = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x <= 0,
	msg: msg ?? __expectedVal("non-positive"),
});
export const isNonNegative = (msg?: ValidatorMsg): Validator => ({
	valid: (x) => x >= 0,
	msg: msg ?? __expectedVal("non-negative"),
});

export const isLength = (n: number, msg?: ValidatorMsg): Validator => ({
	valid: (x) => x?.length === n,
	msg: msg ?? __expected(`length of ${n}`),
});

export const isMinLength = (n: number, msg?: ValidatorMsg): Validator => ({
	valid: (x) => x?.length >= n,
	msg: msg ?? __expected(`min. length ${n}`),
});

export const isMaxLength = (n: number, msg?: ValidatorMsg): Validator => ({
	valid: (x) => x?.length <= n,
	msg: msg ?? __expected(`max. length ${n}`),
});

export const isMinMaxLength = (
	min: number,
	max: number,
	msg?: ValidatorMsg
): Validator =>
	min > -Infinity
		? max < Infinity
			? {
					valid: (x) => x?.length >= min && x?.length <= max,
					msg: msg ?? __expected(`length in [${min},${max}] range`),
				}
			: isMinLength(min)
		: max < Infinity
			? isMaxLength(max)
			: ALWAYS;

/**
 * Returns validator to check if value is a string and matches given regexp.
 *
 * @param re
 * @param msg
 */
export const matchesRegexp = (re: RegExp, msg?: ValidatorMsg): Validator => ({
	valid: (x) => $isString(x) && re.test(x),
	msg: msg ?? __expected(`pattern: ${re.source}`),
});

/** @internal */
const __expected = (x: string) => `expected ${x}`;

/** @internal */
const __expectedVal = (x: string) => `expected ${x} value`;
