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
	oneOf,
	isString,
	optional,
	validator,
} from "../src/index.js";

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

test("hasKeysOf (object)", () => {
	const fn = validator(
		hasKeysOf({
			a: isNumber(),
			b: [isArray(), isMinMaxLength(2, 4)],
			c: optional(
				oneOf([isString(), [isObject(), hasKeysOf({ x: isNumber() })]])
			),
		})
	);
	expect(fn({ a: 1, b: ["a", "b"], c: { x: 1 } })).toBeTrue();
	expect(fn({ a: 1, b: ["a", "b"], c: "" })).toBeTrue();
	expect(fn({ a: 1, b: ["a", "b"] })).toBeTrue();
	expect(() => fn({ a: 1, b: ["a", "b"], c: {} })).toThrow();
	expect(() => fn({ a: 1, b: ["a", "b"], c: 1 })).toThrow();
});
