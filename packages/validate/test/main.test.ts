// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import {
	hasKeysOf,
	isArray,
	isArrayOf,
	isInRange,
	isLength,
	isMinMaxLength,
	isNumber,
	isObject,
	some,
	isString,
	optional,
	validator,
	isMinLength,
	every,
	isPositive,
	not,
	hasRequiredKeys,
} from "../src/index.js";

test("optional", () => {
	expect(validator(optional(isString()))(null)).toBeTrue();
	expect(validator(optional(isString()))("")).toBeTrue();
	expect(validator(optional(isString(), isMinLength(3)))("abc")).toBeTrue();
	expect(() =>
		validator(optional(isString(), isMinLength(3)))("ab")
	).toThrow();
});

test("not", () => {
	expect(validator(not(isString()))(null)).toBeTrue();
	expect(validator(not(isString()))(1)).toBeTrue();
	expect(() =>
		validator(not(isString(), "required non-string value"))("")
	).toThrow("non-string");
});

test("some", () => {
	expect(validator(some(isString(), isNumber()))(1)).toBeTrue();
	expect(validator(some(isString(), isNumber()))("a")).toBeTrue();
	expect(() => validator(some(isString(), isNumber()))([])).toThrow();
});

test("every", () => {
	expect(validator(every(isNumber()))(1)).toBeTrue();
	expect(validator(every(isNumber(), isPositive()))(1)).toBeTrue();
	expect(() => validator(every(isNumber(), isString()))(1)).toThrow();
});

test("isMinMaxLength (string)", () => {
	const fn = validator(isString(), isMinMaxLength(3, 6));
	expect(fn("abc")).toBeTrue();
	expect(fn("abcdef")).toBeTrue();
});

test("isArrayOf", () => {
	const fn = validator(
		isArrayOf([isArrayOf([isNumber(), isInRange(0, 10)]), isLength(3)])
	);
	expect(
		fn([
			[1, 2, 3],
			[2, 3, 4],
		])
	).toBeTrue();
	expect(() => fn([[1, 2, -3]])).toThrow("not in range");
	expect(() => fn([[1, 2]])).toThrow("length");
	expect(() => fn([["a"]])).toThrow("number");
});

test("hasRequiredKeys (object)", () => {
	expect(validator(hasRequiredKeys(["a"]))({ a: null })).toBeTrue();
	expect(() => validator(hasRequiredKeys(["a"]))({})).toThrow();
	expect(() =>
		validator(hasRequiredKeys(["a"], true))({ a: null })
	).toThrow();
	expect(() =>
		validator(hasRequiredKeys(["a"], false, true))({ a: null, b: null })
	).toThrow("not allowed");
	expect(() =>
		validator(hasRequiredKeys(["a"], true, true))({ a: null })
	).toThrow("non-nullish");
});

test("hasKeysOf (object)", () => {
	const fn = validator(
		hasKeysOf(
			{
				a: isNumber(),
				b: [isArray(), isMinMaxLength(2, 4)],
				c: optional(
					some(isString(), [isObject(), hasKeysOf({ x: isNumber() })])
				),
			},
			true
		)
	);
	expect(fn({ a: 1, b: ["a", "b"], c: { x: 1 } })).toBeTrue();
	expect(fn({ a: 1, b: ["a", "b"], c: "" })).toBeTrue();
	expect(fn({ a: 1, b: ["a", "b"], c: null })).toBeTrue();
	expect(fn({ a: 1, b: ["a", "b"] })).toBeTrue();
	expect(() => fn({ a: 1, b: ["a", "b"], c: {} })).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], c: 1 })).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], d: 1 })).toThrow();
});
