// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { OK, validateSchema, type JSONSchema } from "../src/index.js";

const __error = (...errors: string[]) => ({
	valid: false,
	errors: errors.map((msg) => ({ path: [], msg })),
});

const __errorPath = (path: any[], msg: string) => ({
	valid: false,
	errors: [{ path, msg }],
});

describe("validateSchema", () => {
	//
	test("empty", () => {
		expect(validateSchema(1, <any>{})).toEqual(OK);
		expect(validateSchema(1, <any>{ not: {} })).toEqual(
			__error("expected value not to pass schema: {}")
		);
	});

	test("null", () => {
		expect(validateSchema(null, { type: "null" })).toEqual(OK);
		expect(validateSchema(1, { type: "null" })).toEqual(
			__error("expected nullish value")
		);
	});

	test("boolean", () => {
		expect(validateSchema(false, { type: "boolean" })).toEqual(OK);
		expect(validateSchema(true, { type: "boolean" })).toEqual(OK);
		expect(validateSchema(1, { type: "boolean" })).toEqual(
			__error("expected boolean value")
		);
	});

	test("number", () => {
		expect(validateSchema(42, { type: "number" })).toEqual(OK);
		expect(validateSchema("42", { type: "number" })).toEqual(
			__error("expected number value")
		);
		expect(
			validateSchema(42, {
				type: "number",
				minimum: 100,
				maximum: 200,
			})
		).toEqual(__error("expected value in closed interval [100,200]"));
		expect(validateSchema(42, { type: "number", minimum: 100 })).toEqual(
			__error("expected value in closed interval [100,Infinity]")
		);
		expect(validateSchema(42, { type: "number", maximum: 10 })).toEqual(
			__error("expected value in closed interval [-Infinity,10]")
		);
	});

	test("integer", () => {
		expect(validateSchema(42, { type: "integer" })).toEqual(OK);
		expect(validateSchema(42.2, { type: "integer" })).toEqual(
			__error("expected integer value")
		);
		expect(validateSchema(-0.0000001, { type: "integer" })).toEqual(
			__error("expected integer value")
		);
	});

	test("string", () => {
		expect(validateSchema("a", { type: "string" })).toEqual(OK);
		expect(validateSchema(42, { type: "string" })).toEqual(
			__error("expected string value")
		);
		expect(
			validateSchema("abc", {
				type: "string",
				minLength: 10,
				maxLength: 20,
			})
		).toEqual(__error("expected length in [10,20] range"));
		expect(
			validateSchema("abc", { type: "string", minLength: 10 })
		).toEqual(__error("expected min. length 10"));
		expect(validateSchema("abc", { type: "string", maxLength: 2 })).toEqual(
			__error("expected max. length 2")
		);
	});

	test("string (pattern)", () => {
		const schema: JSONSchema = { type: "string", pattern: "^[A-Z]+$" };
		expect(validateSchema("ABC", schema)).toEqual(OK);
		expect(validateSchema("", schema)).toEqual(
			__error("expected pattern: ^[A-Z]+$")
		);
		expect(validateSchema("ABc", schema)).toEqual(
			__error("expected pattern: ^[A-Z]+$")
		);
		expect(validateSchema(null, schema)).toEqual(
			__error("expected string value")
		);
	});

	test("multiple types", () => {
		const schema: JSONSchema = {
			type: ["number", "string", "null"],
		};
		expect(validateSchema(42, schema)).toEqual(OK);
		expect(validateSchema("42", schema)).toEqual(OK);
		expect(validateSchema(null, schema)).toEqual(OK);
		expect(validateSchema([], schema)).toEqual(
			__error("value type must be one of: number,string,null")
		);
	});

	test("enum", () => {
		const schema: JSONSchema = { enum: ["a", "b"] };
		expect(validateSchema("a", schema)).toEqual(OK);
		expect(validateSchema("c", schema)).toEqual(
			__error("expected value to be one of: a, b")
		);
		expect(validateSchema(1, schema)).toEqual(
			__error("expected value to be one of: a, b")
		);
	});

	test("const", () => {
		const schema: JSONSchema = { const: "a" };
		expect(validateSchema("a", schema)).toEqual(OK);
		expect(validateSchema("b", schema)).toEqual(
			__error(`expected value to be: "a"`)
		);
	});

	test("array (prefixItems)", () => {
		const schema: JSONSchema = {
			type: "array",
			prefixItems: [{ type: "number" }, { type: "number" }],
			items: { type: "string" },
		};
		expect(validateSchema([1, 2, "3"], schema)).toEqual(OK);
		expect(validateSchema([1, 2], schema)).toEqual(OK);
		expect(validateSchema([1, "2"], schema)).toEqual(
			__errorPath([1], "expected number value")
		);
		expect(validateSchema([1], schema)).toEqual(
			__error("expected min. length 2")
		);
		expect(validateSchema([1, 2, 3], schema)).toEqual(
			__errorPath([2], "expected string value")
		);

		expect(validateSchema([1, 2, 3], { ...schema, items: false })).toEqual(
			__error("expected length of 2")
		);
	});

	test("array (contains & unique)", () => {
		const schema: JSONSchema = {
			type: "array",
			contains: { type: "string" },
			maxContains: 2,
			uniqueItems: true,
		};
		expect(validateSchema([1, 2, "a"], schema)).toEqual(OK);
		expect(validateSchema([1, 2], schema)).toEqual(
			__error(`expected min. 1 values to pass schema: {"type":"string"}`)
		);
		expect(validateSchema(["a", "b", "c"], schema)).toEqual(
			__error(`expected max. 2 values to pass schema: {"type":"string"}`)
		);
		expect(validateSchema(["a", "a"], schema)).toEqual(
			__error("expected unique items")
		);
	});

	test("object", () => {
		const schema: JSONSchema = {
			type: "object",
			properties: {
				a: { type: "number" },
				b: { type: "array", items: { type: "string" } },
			},
		};
		expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toEqual(OK);
		expect(validateSchema({ a: 1 }, schema)).toEqual(OK);
		expect(validateSchema({ a: "a" }, schema)).toEqual(
			__errorPath(["a"], "expected number value")
		);
		expect(validateSchema({ b: 2 }, schema)).toEqual(
			__errorPath(["b"], "expected array value")
		);
		expect(validateSchema({ b: [1, 2] }, schema)).toEqual({
			valid: false,
			errors: [
				{ path: ["b", 0], msg: "expected string value" },
				{ path: ["b", 1], msg: "expected string value" },
			],
		});
	});

	test("object required", () => {
		const schema: JSONSchema = {
			type: "object",
			properties: {
				a: { type: "number" },
				b: { type: "array", items: { type: "string" } },
			},
			required: ["a"],
		};
		expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toEqual(OK);
		expect(validateSchema({ a: "a" }, schema)).toEqual(
			__errorPath(["a"], "expected number value")
		);
		expect(validateSchema({ b: 1 }, schema)).toEqual(
			__error("expected keys: a")
		);
		expect(validateSchema({ a: 1, b: 2 }, schema)).toEqual(
			__errorPath(["b"], "expected array value")
		);
		expect(validateSchema({ a: 1, b: [1, 2] }, schema)).toEqual({
			valid: false,
			errors: [
				{ path: ["b", 0], msg: "expected string value" },
				{ path: ["b", 1], msg: "expected string value" },
			],
		});
	});

	test("object patternProperties", () => {
		const schema: JSONSchema = {
			type: "object",
			patternProperties: { "^id\\d+": { type: "number" } },
			additionalProperties: false,
		};
		expect(validateSchema({ id1: 1 }, schema)).toEqual(OK);
		expect(validateSchema({ id1: "1" }, schema)).toEqual(
			__errorPath(["id1"], "expected number value")
		);
		expect(validateSchema({ a: 1 }, schema)).toEqual(
			__errorPath(["a"], "property not allowed")
		);
	});

	test("object additionalProperties", () => {
		const schema: JSONSchema = {
			type: "object",
			properties: { a: { type: "number" } },
			additionalProperties: { type: "boolean" },
		};
		expect(validateSchema({ a: 1, b: false }, schema)).toEqual(OK);
		expect(validateSchema({ b: false }, schema)).toEqual(OK);
		expect(validateSchema({ b: 1 }, schema)).toEqual(
			__errorPath(["b"], "expected boolean value")
		);
		expect(
			validateSchema({ b: 1 }, { ...schema, required: ["a"] })
		).toEqual(__error("expected keys: a"));
	});

	test("object (min/maxProperties)", () => {
		const schema: JSONSchema = {
			type: "object",
			minProperties: 2,
			maxProperties: 3,
		};
		expect(validateSchema({ a: 1, b: 2 }, schema)).toEqual(OK);
		expect(validateSchema({ a: 1, b: 2, c: 3 }, schema)).toEqual(OK);
		expect(validateSchema({ a: 1, b: 2, c: 3, d: 4 }, schema)).toEqual(
			__error("expected 2-3 properties")
		);
		expect(
			validateSchema({ a: 1 }, { ...schema, maxProperties: 2 })
		).toEqual(__error("expected 2 properties"));
	});

	test("object (propertyNames)", () => {
		const schema: JSONSchema = {
			type: "object",
			propertyNames: { type: "string", minLength: 3, maxLength: 4 },
		};
		expect(validateSchema({ abc: 1, defg: 2 }, schema)).toEqual(OK);
		expect(validateSchema({ ab: 1 }, schema)).toEqual(
			__errorPath(["ab"], "expected length in [3,4] range")
		);
	});

	test("schema ref", () => {
		const schema: JSONSchema = {
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
				anchor: {
					type: "array",
					$anchor: "array",
					items: { $ref: "#/$defs/str" },
				},
				id: { type: "number", $id: "https://example.org/" },
			},
		};
		expect(
			validateSchema({ a: 1, b: "b", c: "c", d: [], e: 2 }, schema, {
				base: "https://schema.thi.ng/",
			})
		).toEqual(OK);
		expect(validateSchema({ d: [1] }, schema)).toEqual({
			valid: false,
			errors: [{ path: ["d", 0], msg: "expected string value" }],
		});
		expect(
			validateSchema({ a: "", b: 2, c: 3, d: ["d"], e: "e" }, schema)
		).toEqual({
			valid: false,
			errors: [
				{ path: ["a"], msg: "expected number value" },
				{ path: ["b"], msg: "expected string value" },
				{ path: ["c"], msg: "expected string value" },
				{ path: ["e"], msg: "expected number value" },
			],
		});
	});

	test("schema ref cycle breaker", () => {
		expect(
			validateSchema(
				{ a: "a", b: "b" },
				{
					type: "object",
					properties: {
						a: { $ref: "#foo" },
						b: { $ref: "#foo" },
					},
					$defs: {
						foo: { $ref: "#bar", $anchor: "foo" },
						bar: { $ref: "#/$defs/str", $anchor: "bar" },
						str: { type: "string" },
					},
				}
			)
		).toEqual(OK);
		expect(() =>
			validateSchema(1, {
				$ref: "#foo",
				$defs: {
					foo: { $ref: "#foo", $anchor: "foo" },
				},
			})
		).toThrow("cycle detected: #foo -> #foo");
		expect(() =>
			validateSchema(
				{ a: 1 },
				{
					type: "object",
					properties: { a: { $ref: "#foo" } },
					$defs: {
						num1: { $ref: "#/$defs/num2", $anchor: "foo" },
						num2: { $ref: "#/$defs/num1" },
					},
				}
			)
		).toThrow(
			"cycle detected: #foo -> #/$defs/num2 -> #/$defs/num1 -> #/$defs/num2"
		);
	});

	test("schema recursion", () => {
		const schema: JSONSchema = {
			type: "object",
			properties: {
				name: { type: "string" },
				children: {
					type: "array",
					items: { $ref: "#" },
				},
			},
		};
		expect(
			validateSchema(
				{
					name: "a",
					children: [
						{ name: "b", children: [{ name: "c", children: [] }] },
					],
				},
				schema
			)
		).toEqual(OK);
	});

	test("not", () => {
		const schema: JSONSchema = {
			not: { type: "number", minimum: 0 },
		};
		expect(validateSchema(-1, schema)).toEqual(OK);
		expect(validateSchema("a", schema)).toEqual(OK);
		expect(validateSchema(1, schema)).toEqual({
			valid: false,
			errors: [
				{
					path: [],
					msg: `expected value not to pass schema: {"type":"number","minimum":0}`,
				},
			],
		});
	});

	test("anyOf", () => {
		const schema: JSONSchema = {
			anyOf: [
				{ type: "number", minimum: 0, maximum: 10 },
				{ type: "number", minimum: 100, maximum: 200 },
				{ type: "string" },
			],
		};
		expect(validateSchema(1, schema)).toEqual(OK);
		expect(validateSchema(101, schema)).toEqual(OK);
		expect(validateSchema("1", schema)).toEqual(OK);
		expect(validateSchema(99, schema)).toEqual(
			__error("expected to match one of the schema options")
		);
	});

	test("allOf", () => {
		const schema: JSONSchema = {
			allOf: [{ $ref: "#/$defs/num" }, { $ref: "#/$defs/range" }],
			$defs: {
				num: { type: "number" },
				range: { type: "number", minimum: 0, maximum: 10 },
			},
		};
		expect(validateSchema(1, schema)).toEqual(OK);
		expect(validateSchema(11, schema)).toEqual(
			__error("expected value in closed interval [0,10]")
		);
	});
});
