// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	OK,
	validateSchema,
	type AltSchema,
	type ArraySchema,
	type NumberSchema,
	type ObjectSchema,
} from "../src/index.js";

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
			__error("required boolean value")
		);
	});

	test("number", () => {
		expect(validateSchema(42, { type: "number" })).toEqual(OK);
		expect(validateSchema("42", { type: "number" })).toEqual(
			__error("required number value")
		);
		expect(
			validateSchema(42, {
				type: "number",
				minimum: 100,
				maximum: 200,
			})
		).toEqual(__error("value not in closed interval [100,200]"));
		expect(validateSchema(42, { type: "number", minimum: 100 })).toEqual(
			__error("value not in closed interval [100,Infinity]")
		);
		expect(validateSchema(42, { type: "number", maximum: 10 })).toEqual(
			__error("value not in closed interval [-Infinity,10]")
		);
	});

	test("integer", () => {
		expect(validateSchema(42, { type: "integer" })).toEqual(OK);
		expect(validateSchema(42.2, { type: "integer" })).toEqual(
			__error("required integer value")
		);
		expect(validateSchema(-0.0000001, { type: "integer" })).toEqual(
			__error("required integer value")
		);
	});

	test("string", () => {
		expect(validateSchema("a", { type: "string" })).toEqual(OK);
		expect(validateSchema(42, { type: "string" })).toEqual(
			__error("required string value")
		);
		expect(
			validateSchema("abc", {
				type: "string",
				minLength: 10,
				maxLength: 20,
			})
		).toEqual(__error("length not in [10,20] range"));
		expect(
			validateSchema("abc", { type: "string", minLength: 10 })
		).toEqual(__error("required min. length 10"));
		expect(validateSchema("abc", { type: "string", maxLength: 2 })).toEqual(
			__error("required max. length 2")
		);
	});

	test("multiple types", () => {
		const schema: AltSchema = {
			type: ["number", "string", "null"],
		};
		expect(validateSchema(42, schema)).toEqual(OK);
		expect(validateSchema("42", schema)).toEqual(OK);
		expect(validateSchema(null, schema)).toEqual(OK);
		expect(validateSchema([], schema)).toEqual(
			__error("value type must be one of: number,string,null")
		);
	});

	test("array (prefixItems)", () => {
		const schema: ArraySchema = {
			type: "array",
			prefixItems: [{ type: "number" }, { type: "number" }],
			items: { type: "string" },
		};
		expect(validateSchema([1, 2, "3"], schema)).toEqual(OK);
		expect(validateSchema([1, 2], schema)).toEqual(OK);
		expect(validateSchema([1, "2"], schema)).toEqual(
			__errorPath([1], "required number value")
		);
		expect(validateSchema([1], schema)).toEqual(
			__error("required min. length 2")
		);
		expect(validateSchema([1, 2, 3], schema)).toEqual(
			__errorPath([2], "required string value")
		);
	});

	test("object", () => {
		const schema: ObjectSchema = {
			type: "object",
			properties: {
				a: { type: "number" },
				b: { type: "array", items: { type: "string" } },
			},
		};
		expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toEqual(OK);
		expect(validateSchema({ a: "a" }, schema)).toEqual({
			valid: false,
			errors: [
				{ path: ["a"], msg: "required number value" },
				{ path: ["b"], msg: "required array value" },
			],
		});
		expect(validateSchema({ a: 1 }, schema)).toEqual(
			__errorPath(["b"], "required array value")
		);
		expect(validateSchema({ a: 1, b: 2 }, schema)).toEqual(
			__errorPath(["b"], "required array value")
		);
		expect(validateSchema({ a: 1, b: [1, 2] }, schema)).toEqual({
			valid: false,
			errors: [
				{ path: ["b", 0], msg: "required string value" },
				{ path: ["b", 1], msg: "required string value" },
			],
		});
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
		expect(
			validateSchema({ d: [1] }, schema, {
				base: "https://schema.thi.ng/",
			})
		).toEqual({
			valid: false,
			errors: [
				{
					path: ["a"],
					msg: "required number value",
				},
				{
					path: ["b"],
					msg: "required string value",
				},
				{
					path: ["c"],
					msg: "required string value",
				},
				{
					path: ["d", 0],
					msg: "required string value",
				},
				{
					path: ["e"],
					msg: "required number value",
				},
			],
		});
	});

	test("not", () => {
		const schema: NumberSchema = {
			not: { type: "number", minimum: 0 },
			type: "number",
		};
		expect(validateSchema(-1, schema)).toEqual(OK);
		expect(validateSchema(1, schema)).toEqual({
			valid: false,
			errors: [{ path: [], msg: "expected schema to fail" }],
		});
	});
});
