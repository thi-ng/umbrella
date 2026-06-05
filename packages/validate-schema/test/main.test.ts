// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import { OK, validateSchema, type JSONSchema } from "../src/index.js";

const __error = (...errors: string[]) => ({
	valid: false,
	errors: errors.map((msg) => ({ path: [], msg })),
	defaults: [],
});

const __errorPaths = (...paths: [any[], string][]) => ({
	valid: false,
	errors: paths.map(([path, msg]) => ({ path, msg })),
	defaults: [],
});

const __defaults = (...paths: [any[], any][]) => ({
	defaults: paths.map(([path, value]) => ({ path, value })),
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
			__error("expected value >= 100")
		);
		expect(validateSchema(42, { type: "number", maximum: 10 })).toEqual(
			__error("expected value <= 10")
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

	describe("string", () => {
		test("string basic", () => {
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
			expect(
				validateSchema("abc", { type: "string", maxLength: 2 })
			).toEqual(__error("expected max. length 2"));
		});

		test("pattern", () => {
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

		test("format: date", () => {
			const schema: JSONSchema = { type: "string", format: "date" };
			expect(validateSchema("2026-01-23", schema)).toEqual(OK);
			expect(validateSchema("1999-12-31", schema)).toEqual(OK);
			expect(validateSchema("2026-01", schema)).toEqual(
				__error("expected date format")
			);
		});

		test("format: date-time", () => {
			const schema: JSONSchema = { type: "string", format: "date-time" };
			expect(validateSchema("2026-01-02T03:04:05Z", schema)).toEqual(OK);
			expect(validateSchema("2026-01-02T03:04:05-06:00", schema)).toEqual(
				OK
			);
			expect(validateSchema("2026-01-02", schema)).toEqual(
				__error("expected date-time format")
			);
		});

		test("format: email", () => {
			const schema: JSONSchema = { type: "string", format: "email" };
			expect(validateSchema("a.BC+d_ef@Email.co.uk", schema)).toEqual(OK);
			expect(validateSchema("a.bc@d_ef@email.", schema)).toEqual(
				__error("expected email format")
			);
		});

		test("format: time", () => {
			const schema: JSONSchema = { type: "string", format: "time" };
			expect(validateSchema("01:02:03Z", schema)).toEqual(OK);
			expect(validateSchema("01:02:03.123-04:00", schema)).toEqual(OK);
			expect(validateSchema("01:02+03:00", schema)).toEqual(OK);
			expect(validateSchema("01:02", schema)).toEqual(
				__error("expected time format")
			);
		});

		test("format: uri", () => {
			const schema: JSONSchema = { type: "string", format: "uri" };
			expect(validateSchema("https://thi.ng", schema)).toEqual(OK);
			expect(validateSchema("urn:isbn:123456789", schema)).toEqual(OK);
			expect(validateSchema("://example.org", schema)).toEqual(
				__error("expected uri format")
			);
		});

		test("format: uuid", () => {
			const schema: JSONSchema = { type: "string", format: "uuid" };
			expect(
				validateSchema("3A2A8FE2-C3C4-4625-BF08-8CF8EB09E78F", schema)
			).toEqual(OK);
			expect(
				validateSchema("3a2a8fe2-c3c4-4625-bf08-8cf8eb09e78f", schema)
			).toEqual(OK);
			expect(
				validateSchema("3A2A8FE2-Z3C4-4625-BF08-8CF8EB09E78F", schema)
			).toEqual(__error("expected uuid format"));
		});
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
			__errorPaths([[1], "expected number value"])
		);
		expect(validateSchema([1], schema)).toEqual(
			__errorPaths(
				[[], "expected min. length 2"],
				[[1], "expected number value"]
			)
		);
		expect(validateSchema([1, 2, 3], schema)).toEqual(
			__errorPaths([[2], "expected string value"])
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

	describe("object", () => {
		test("basic", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: {
					a: { type: "number" },
					b: { type: "array", items: { type: "string" } },
				},
			};
			expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toEqual(
				OK
			);
			expect(validateSchema({ a: 1 }, schema)).toEqual(OK);
			expect(validateSchema({ a: "a" }, schema)).toEqual(
				__errorPaths([["a"], "expected number value"])
			);
			expect(validateSchema({ b: 2 }, schema)).toEqual(
				__errorPaths([["b"], "expected array value"])
			);
			expect(validateSchema({ b: [1, 2] }, schema)).toEqual(
				__errorPaths(
					[["b", 0], "expected string value"],
					[["b", 1], "expected string value"]
				)
			);
		});

		test("required", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: {
					a: { type: "number" },
					b: { type: "array", items: { type: "string" } },
				},
				required: ["a"],
			};
			expect(validateSchema({ a: 42, b: ["a", "b"] }, schema)).toEqual(
				OK
			);
			expect(validateSchema({ a: "a" }, schema)).toEqual(
				__errorPaths([["a"], "expected number value"])
			);
			expect(validateSchema({ b: 1 }, schema)).toEqual(
				__errorPaths(
					[[], "expected keys: a"],
					[["b"], "expected array value"]
				)
			);
			expect(validateSchema({ a: 1, b: 2 }, schema)).toEqual(
				__errorPaths([["b"], "expected array value"])
			);
			expect(validateSchema({ a: 1, b: [1, 2] }, schema)).toEqual(
				__errorPaths(
					[["b", 0], "expected string value"],
					[["b", 1], "expected string value"]
				)
			);
		});

		test("patternProperties", () => {
			const schema: JSONSchema = {
				type: "object",
				patternProperties: { "^id\\d+": { type: "number" } },
				additionalProperties: false,
			};
			expect(validateSchema({ id1: 1 }, schema)).toEqual(OK);
			expect(validateSchema({ id1: "1" }, schema)).toEqual(
				__errorPaths([["id1"], "expected number value"])
			);
			expect(validateSchema({ a: 1 }, schema)).toEqual(
				__errorPaths([["a"], "property not allowed"])
			);
		});

		test("additionalProperties", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: { a: { type: "number" } },
				additionalProperties: { type: "boolean" },
			};
			expect(validateSchema({ a: 1, b: false }, schema)).toEqual(OK);
			expect(validateSchema({ b: false }, schema)).toEqual(OK);
			expect(validateSchema({ b: 1 }, schema)).toEqual(
				__errorPaths([["b"], "expected boolean value"])
			);
			expect(
				validateSchema({ b: 1 }, { ...schema, required: ["a"] })
			).toEqual(
				__errorPaths(
					[[], "expected keys: a"],
					[["b"], "expected boolean value"]
				)
			);
		});

		test("min/maxProperties", () => {
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

		test("propertyNames", () => {
			const schema: JSONSchema = {
				type: "object",
				propertyNames: { minLength: 3, maxLength: 4 },
			};
			expect(validateSchema({ abc: 1, defg: 2 }, schema)).toEqual(OK);
			expect(validateSchema({ ab: 1 }, schema)).toEqual(
				__errorPaths([["ab"], "expected length in [3,4] range"])
			);
		});

		test("dependentRequired", () => {
			const schema: JSONSchema = {
				type: "object",
				dependentRequired: {
					a: ["a1", "a2"],
					b: ["c"],
				},
			};
			expect(validateSchema({}, schema)).toEqual(OK);
			expect(validateSchema({ a: 1, a1: 2, a2: 3 }, schema)).toEqual(OK);
			expect(validateSchema({ b: 1, c: 2 }, schema)).toEqual(OK);
			expect(validateSchema({ a: 1 }, schema)).toEqual(
				__errorPaths([["a"], "required dependent properties: a1,a2"])
			);
		});

		test("dependentSchemas", () => {
			const schema: JSONSchema = {
				type: "object",
				dependentSchemas: {
					a: {
						properties: { a1: { type: "string" } },
						required: ["a1"],
					},
				},
			};
			expect(validateSchema({}, schema)).toEqual(OK);
			expect(validateSchema({ a: 1, a1: "2" }, schema)).toEqual(OK);
			expect(validateSchema({ a: 1, a1: 1 }, schema)).toEqual(
				__errorPaths([["a1"], "expected string value"])
			);
			expect(validateSchema({ a: 1 }, schema)).toEqual(
				__error("expected keys: a1")
			);
		});
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
		expect(validateSchema({ d: [1] }, schema)).toEqual(
			__errorPaths([["d", 0], "expected string value"])
		);
		expect(
			validateSchema({ a: "", b: 2, c: 3, d: ["d"], e: "e" }, schema)
		).toEqual(
			__errorPaths(
				[["a"], "expected number value"],
				[["b"], "expected string value"],
				[["c"], "expected string value"],
				[["e"], "expected number value"]
			)
		);
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
		expect(validateSchema(1, schema)).toEqual(
			__error(
				`expected value not to pass schema: {"type":"number","minimum":0}`
			)
		);
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

	test("if-then-else", () => {
		const schema: JSONSchema = {
			if: { type: "array" },
			then: { type: "array", items: { type: "number" } },
			else: {
				type: "object",
				properties: { a: { type: "number" } },
				required: ["a"],
			},
		};
		expect(validateSchema([1, 2, 3], schema)).toEqual(OK);
		expect(validateSchema({ a: 1 }, schema)).toEqual(OK);
		expect(validateSchema("a", schema)).toEqual(
			__error("expected object value")
		);
		expect(validateSchema(["a"], schema)).toEqual(
			__errorPaths([[0], "expected number value"])
		);
		expect(validateSchema({ a: "1" }, schema)).toEqual(
			__errorPaths([["a"], "expected number value"])
		);
	});

	describe("defaults", () => {
		test("array", () => {
			const schema: JSONSchema = {
				type: "array",
				prefixItems: [
					{ type: "number", default: 1 },
					{ type: "string", default: "b" },
				],
				items: { type: "string", default: "ok" },
			};
			expect(validateSchema([], schema)).toEqual({
				...__errorPaths(
					[[], "expected min. length 2"],
					[[0], "expected number value"],
					[[1], "expected string value"]
				),
				...__defaults([[0], 1], [[1], "b"]),
			});
		});

		test("object", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: {
					a: { default: 1 },
					b: { $ref: "#b" },
					c: {
						type: "object",
						properties: {
							c1: { default: 3 },
							c2: { default: 4, $ref: "#b" },
						},
					},
				},
				$defs: {
					b: { $anchor: "b", default: 2 },
				},
			};
			expect(validateSchema({}, schema)).toEqual({
				...OK,
				...__defaults(
					[["a"], 1],
					[["b"], 2],
					[["c", "c1"], 3],
					[["c", "c2"], 2]
				),
			});
		});
	});
});
