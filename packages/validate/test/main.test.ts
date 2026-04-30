// SPDX-License-Identifier: Apache-2.0
import { expect, test } from "bun:test";
import {
	every,
	hasKeysOf,
	hasPatternKeysOf,
	hasRequiredKeys,
	hasRequiredPatternKeys,
	isArray,
	isArrayOf,
	isInRange,
	isLength,
	isMinLength,
	isMinMaxLength,
	isNumber,
	isObject,
	isPositive,
	isString,
	not,
	optional,
	some,
	validator,
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

	expect(() => fn({})).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], c: {} })).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], c: 1 })).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], d: 1 })).toThrow();
});

test("hasRequiredPatternKeys", () => {
	expect(
		validator(hasRequiredPatternKeys(/^id\d+$/))({ id1: null })
	).toBeTrue();
	expect(
		validator(hasRequiredPatternKeys(/^id\d+$/))({ id123: 1 })
	).toBeTrue();

	expect(() =>
		validator(hasRequiredPatternKeys(/^id\d+$/, true))({})
	).toThrow();
	expect(() =>
		validator(hasRequiredPatternKeys(/^id\d+$/, true, true))({
			id1: 1,
			a: 1,
		})
	).toThrow();
});

test("hasPatternKeysOf", () => {
	const fn = validator(hasPatternKeysOf(/^id\d+$/, isNumber()));
	const fn2 = validator(
		hasPatternKeysOf(/^id\d+$/, [isNumber(), isPositive()], true)
	);
	const fn3 = validator(
		every(
			isObject(),
			// only allow keys matching pattern
			hasRequiredPatternKeys(/^(id|title)\d+/, true, true),
			hasPatternKeysOf(/^id\d+$/, isNumber()),
			hasPatternKeysOf(/^title\d$/, isString())
		)
	);
	expect(fn({ id1: 1, id123: 123, a: "a" })).toBeTrue();

	expect(() => fn2({ id1: "1" })).toThrow("number");
	expect(() => fn2({ id1: -1 })).toThrow("positive");
	expect(() => fn2({ a: 1 })).toThrow("not allowed");

	expect(fn3({ id1: 1, title1: "" })).toBeTrue();
	expect(() => fn3({ title1: 1 })).toThrow("string");
	expect(() => fn3({ title1: "", a: 1 })).toThrow("not allowed");
});
