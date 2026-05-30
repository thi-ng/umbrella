// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	validateSchema,
	type AltSchema,
	type ArraySchema,
	type NumberSchema,
	type ObjectSchema,
} from "../src/index.js";

describe("validateSchema", () => {
	//
	test("null", () => {
		expect(validateSchema(null, { type: "null" })).toBeTrue();
		expect(() => validateSchema(1, { type: "null" })).toThrow("null");
	});

	test("boolean", () => {
		expect(validateSchema(false, { type: "boolean" })).toBeTrue();
		expect(validateSchema(true, { type: "boolean" })).toBeTrue();
		expect(() => validateSchema(1, { type: "boolean" })).toThrow("boolean");
	});

	test("number", () => {
		expect(validateSchema(42, { type: "number" })).toBeTrue();
		expect(() => validateSchema("42", { type: "number" })).toThrow(
			"number"
		);
		expect(() =>
			validateSchema(42, {
				type: "number",
				minimum: 100,
				maximum: 200,
			})
		).toThrow("[100,200]");
		expect(() =>
			validateSchema(42, { type: "number", minimum: 100 })
		).toThrow("interval");
		expect(() =>
			validateSchema(42, { type: "number", maximum: 10 })
		).toThrow("interval");
	});

	test("integer", () => {
		expect(validateSchema(42, { type: "integer" })).toBeTrue();
		expect(() => validateSchema(42.2, { type: "integer" })).toThrow(
			"integer"
		);
		expect(() => validateSchema(-0.0000001, { type: "integer" })).toThrow(
			"integer"
		);
	});

	test("string", () => {
		expect(validateSchema("a", { type: "string" })).toBeTrue();
		expect(() => validateSchema(42, { type: "string" })).toThrow("string");
		expect(() =>
			validateSchema("abc", {
				type: "string",
				minLength: 10,
				maxLength: 20,
			})
		).toThrow("[10,20]");
		expect(() =>
			validateSchema("abc", { type: "string", minLength: 10 })
		).toThrow("length");
		expect(() =>
			validateSchema("abc", { type: "string", maxLength: 2 })
		).toThrow("length");
	});

	test("multiple types", () => {
		const schema: AltSchema = {
			type: ["number", "string", "null"],
		};
		expect(validateSchema(42, schema)).toBeTrue();
		expect(validateSchema("42", schema)).toBeTrue();
		expect(validateSchema(null, schema)).toBeTrue();
		expect(() => validateSchema([], schema)).toThrow("type");
	});

	test("array (prefixItems)", () => {
		const schema: ArraySchema = {
			type: "array",
			prefixItems: [{ type: "number" }, { type: "number" }],
			items: { type: "string" },
		};
		expect(validateSchema([1, 2, "3"], schema)).toBeTrue();
		expect(validateSchema([1, 2], schema)).toBeTrue();
		expect(() => validateSchema([1, "2"], schema)).toThrow("number");
		expect(() => validateSchema([1], schema)).toThrow("length");
		expect(() => validateSchema([1, 2, 3], schema)).toThrow("string");
	});

	test("object", () => {
		const schema: ObjectSchema = {
			type: "object",
			properties: {
				a: { type: "number" },
				b: { type: "array", items: { type: "string" } },
			},
		};
		expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toBeTrue();
		expect(() => validateSchema({ a: "a" }, schema)).toThrow("number");
		expect(() => validateSchema({ a: 1 }, schema)).toThrow("array");
		expect(() => validateSchema({ a: 1, b: 2 }, schema)).toThrow("array");
		expect(() => validateSchema({ a: 1, b: [1, 2] }, schema)).toThrow(
			"string"
		);
	});

	test("schema ref", () => {
		const schema: ObjectSchema = {
			type: "object",
			properties: {
				a: { $ref: "#/$defs/num" },
				b: { $ref: "#/$defs/str" },
				c: { $ref: "#/$defs/nested" },
				d: { $ref: "#array" },
				e: { $ref: "https://example.org/" },
			},
			$defs: {
				num: { type: "number" },
				str: { type: "string" },
				nested: { $ref: "#/$defs/str" },
				anchor: { type: "array", $anchor: "array" },
				id: { type: "number", $id: "https://example.org/" },
			},
		};
		expect(
			validateSchema({ a: 1, b: "b", c: "c", d: [], e: 2 }, schema, {
				base: "https://schema.thi.ng/",
			})
		).toBeTrue();
	});

	test("not", () => {
		const schema: NumberSchema = {
			not: { type: "number", minimum: 0 },
			type: "number",
		};
		expect(validateSchema(-1, schema)).toBeTrue();
		expect(() => validateSchema(1, schema)).toThrow("fail");
	});
});
