// SPDX-License-Identifier: Apache-2.0
import { describe, expect, test } from "bun:test";
import {
	coerceJSON,
	coerceSplit,
	coerceUint,
	OK,
	validateSchema,
	type JSONSchema,
	type ValidateSchemaCtx,
} from "../src/index.js";

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

const check = (
	value: any,
	schema: JSONSchema,
	expected: any,
	opts: Partial<Pick<ValidateSchemaCtx, "base" | "registry">> = {}
) =>
	expect(validateSchema(value, schema, opts)).toEqual(
		expected.value != null ? expected : { ...expected, value }
	);

describe("validateSchema", () => {
	//
	test("empty", () => {
		check(1, {}, OK);
		check(1, { not: {} }, __error("expected value not to pass schema: {}"));
	});

	test("null", () => {
		check(null, { type: "null" }, OK);
		check(1, { type: "null" }, __error("expected nullish value"));
	});

	test("boolean", () => {
		check(false, { type: "boolean" }, OK);
		check(true, { type: "boolean" }, OK);
		check(1, { type: "boolean" }, __error("expected boolean value"));
	});

	test("number", () => {
		check(42, { type: "number" }, OK);
		check("42", { type: "number" }, __error("expected number value"));
		check(
			42,
			{
				type: "number",
				minimum: 100,
				maximum: 200,
			},
			__error("expected value in closed interval [100,200]")
		);
		check(
			42,
			{ type: "number", minimum: 100 },
			__error("expected value >= 100")
		);
		check(
			42,
			{ type: "number", maximum: 10 },
			__error("expected value <= 10")
		);
	});

	test("integer", () => {
		check(42, { type: "integer" }, OK);
		check(42.2, { type: "integer" }, __error("expected integer value"));
		check(
			-0.0000001,
			{ type: "integer" },
			__error("expected integer value")
		);
	});

	describe("string", () => {
		test("string basic", () => {
			check("a", { type: "string" }, OK);
			check(42, { type: "string" }, __error("expected string value"));
			check(
				"abc",
				{
					type: "string",
					minLength: 10,
					maxLength: 20,
				},
				__error("expected length in [10,20] range")
			);
			check(
				"abc",
				{ type: "string", minLength: 10 },
				__error("expected min. length 10")
			);
			check(
				"abc",
				{ type: "string", maxLength: 2 },
				__error("expected max. length 2")
			);
		});

		test("pattern", () => {
			const schema: JSONSchema = { type: "string", pattern: "^[A-Z]+$" };
			check("ABC", schema, OK);
			check("", schema, __error("expected pattern: ^[A-Z]+$"));
			check("ABc", schema, __error("expected pattern: ^[A-Z]+$"));
			check(null, schema, __error("expected string value"));
		});

		test("format: date", () => {
			const schema: JSONSchema = { type: "string", format: "date" };
			check("2026-01-23", schema, OK);
			check("1999-12-31", schema, OK);
			check("2026-01", schema, __error("expected date format"));
		});

		test("format: date-time", () => {
			const schema: JSONSchema = { type: "string", format: "date-time" };
			check("2026-01-02T03:04:05Z", schema, OK);
			check("2026-01-02T03:04:05-06:00", schema, OK);
			check("2026-01-02", schema, __error("expected date-time format"));
		});

		test("format: email", () => {
			const schema: JSONSchema = { type: "string", format: "email" };
			check("a.BC+d_ef@Email.co.uk", schema, OK);
			check("a.bc@d_ef@email.", schema, __error("expected email format"));
		});

		test("format: time", () => {
			const schema: JSONSchema = { type: "string", format: "time" };
			check("01:02:03Z", schema, OK);
			check("01:02:03.123-04:00", schema, OK);
			check("01:02+03:00", schema, OK);
			check("01:02", schema, __error("expected time format"));
		});

		test("format: uri", () => {
			const schema: JSONSchema = { type: "string", format: "uri" };
			check("https://thi.ng", schema, OK);
			check("urn:isbn:123456789", schema, OK);
			check("://example.org", schema, __error("expected uri format"));
		});

		test("format: uuid", () => {
			const schema: JSONSchema = { type: "string", format: "uuid" };
			check("3A2A8FE2-C3C4-4625-BF08-8CF8EB09E78F", schema, OK);
			check("3a2a8fe2-c3c4-4625-bf08-8cf8eb09e78f", schema, OK);
			check(
				"3A2A8FE2-Z3C4-4625-BF08-8CF8EB09E78F",
				schema,
				__error("expected uuid format")
			);
		});
	});

	test("multiple types", () => {
		const schema: JSONSchema = {
			type: ["number", "string", "null"],
		};
		check(42, schema, OK);
		check("42", schema, OK);
		check(null, schema, OK);
		check(
			[],
			schema,
			__error("value type must be one of: number,string,null")
		);
	});

	test("enum", () => {
		const schema: JSONSchema = { enum: ["a", "b"] };
		check("a", schema, OK);
		check("c", schema, __error("expected value to be one of: a, b"));
		check(1, schema, __error("expected value to be one of: a, b"));
	});

	test("const", () => {
		const schema: JSONSchema = { const: "a" };
		check("a", schema, OK);
		check("b", schema, __error(`expected value to be: "a"`));
	});

	test("array (prefixItems)", () => {
		const schema: JSONSchema = {
			type: "array",
			prefixItems: [{ type: "number" }, { type: "number" }],
			items: { type: "string" },
		};
		check([1, 2, "3"], schema, OK);
		check([1, 2], schema, OK);
		check([1, "2"], schema, __errorPaths([[1], "expected number value"]));
		check(
			[1],
			schema,
			__errorPaths(
				[[], "expected min. length 2"],
				[[1], "expected number value"]
			)
		);
		check([1, 2, 3], schema, __errorPaths([[2], "expected string value"]));

		check(
			[1, 2, 3],
			{ ...schema, items: false },
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
		check([1, 2, "a"], schema, OK);
		check(
			[1, 2],
			schema,
			__error(`expected min. 1 values to pass schema: {"type":"string"}`)
		);
		check(
			["a", "b", "c"],
			schema,
			__error(`expected max. 2 values to pass schema: {"type":"string"}`)
		);
		check(["a", "a"], schema, __error("expected unique items"));
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
			check({ a: 42, b: ["a", "b"] }, schema, OK);
			check({ a: 1 }, schema, OK);
			check(
				{ a: "a" },
				schema,
				__errorPaths([["a"], "expected number value"])
			);
			check(
				{ b: 2 },
				schema,
				__errorPaths([["b"], "expected array value"])
			);
			check(
				{ b: [1, 2] },
				schema,
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
			check({ a: 42, b: ["a", "b"] }, schema, OK);
			check(
				{ a: "a" },
				schema,
				__errorPaths([["a"], "expected number value"])
			);
			check(
				{ b: 1 },
				schema,
				__errorPaths(
					[[], "expected keys: a"],
					[["b"], "expected array value"]
				)
			);
			check(
				{ a: 1, b: 2 },
				schema,
				__errorPaths([["b"], "expected array value"])
			);
			check(
				{ a: 1, b: [1, 2] },
				schema,
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
			check({ id1: 1 }, schema, OK);
			check(
				{ id1: "1" },
				schema,
				__errorPaths([["id1"], "expected number value"])
			);
			check(
				{ a: 1 },
				schema,
				__errorPaths([["a"], "property not allowed"])
			);
		});

		test("additionalProperties", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: { a: { type: "number" } },
				additionalProperties: { type: "boolean" },
			};
			check({ a: 1, b: false }, schema, OK);
			check({ b: false }, schema, OK);
			check(
				{ b: 1 },
				schema,
				__errorPaths([["b"], "expected boolean value"])
			);
			check(
				{ b: 1 },
				{ ...schema, required: ["a"] },
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
			check({ a: 1, b: 2 }, schema, OK);
			check({ a: 1, b: 2, c: 3 }, schema, OK);
			check(
				{ a: 1, b: 2, c: 3, d: 4 },
				schema,
				__error("expected 2-3 properties")
			);
			check(
				{ a: 1 },
				{ ...schema, maxProperties: 2 },
				__error("expected 2 properties")
			);
		});

		test("propertyNames", () => {
			const schema: JSONSchema = {
				type: "object",
				propertyNames: { minLength: 3, maxLength: 4 },
			};
			check({ abc: 1, defg: 2 }, schema, OK);
			check(
				{ ab: 1 },
				schema,
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
			check({}, schema, OK);
			check({ a: 1, a1: 2, a2: 3 }, schema, OK);
			check({ b: 1, c: 2 }, schema, OK);
			check(
				{ a: 1 },
				schema,
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
			check({}, schema, OK);
			check({ a: 1, a1: "2" }, schema, OK);
			check(
				{ a: 1, a1: 1 },
				schema,
				__errorPaths([["a1"], "expected string value"])
			);
			check({ a: 1 }, schema, __error("expected keys: a1"));
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
		check({ a: 1, b: "b", c: "c", d: [], e: 2 }, schema, OK, {
			base: "https://schema.thi.ng/",
		});
		check(
			{ d: [1] },
			schema,
			__errorPaths([["d", 0], "expected string value"])
		);
		check(
			{ a: "", b: 2, c: 3, d: ["d"], e: "e" },
			schema,
			__errorPaths(
				[["a"], "expected number value"],
				[["b"], "expected string value"],
				[["c"], "expected string value"],
				[["e"], "expected number value"]
			)
		);
	});

	test("schema ref cycle breaker", () => {
		check(
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
			},
			OK
		);
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
		check(
			{
				name: "a",
				children: [
					{ name: "b", children: [{ name: "c", children: [] }] },
				],
			},
			schema,
			OK
		);
	});

	test("not", () => {
		const schema: JSONSchema = {
			not: { type: "number", minimum: 0 },
		};
		check(-1, schema, OK);
		check("a", schema, OK);
		check(
			1,
			schema,
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
		check(1, schema, OK);
		check(101, schema, OK);
		check("1", schema, OK);
		check(
			99,
			schema,
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
		check(1, schema, OK);
		check(11, schema, __error("expected value in closed interval [0,10]"));
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
		check([1, 2, 3], schema, OK);
		check({ a: 1 }, schema, OK);
		check("a", schema, __error("expected object value"));
		check(["a"], schema, __errorPaths([[0], "expected number value"]));
		check(
			{ a: "1" },
			schema,
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
			check([], schema, {
				...__errorPaths(
					[[], "expected min. length 2"],
					[[0], "expected number value"],
					[[1], "expected string value"]
				),
				...__defaults([[0], 1], [[1], "b"]),
				// value: [1, "b"],
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
			check({}, schema, {
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

	describe("coerce", () => {
		test("object", () => {
			const schema: JSONSchema = {
				type: "object",
				properties: {
					a: { type: "number", coerce: coerceUint() },
					b: {
						type: "array",
						items: {
							type: "string",
							coerce: (x) => x.toUpperCase(),
						},
					},
					c: { $ref: "#/$defs/c" },
					d: { type: "array", coerce: coerceSplit(";"), default: [] },
				},
				$defs: {
					c: {
						type: "array",
						items: { $ref: "#num" },
						coerce: coerceJSON,
					},
					num: { $anchor: "num", type: "number" },
				},
			};
			check({ a: "1", b: ["b"], c: "[1,2,3]", d: "ab;cde;f" }, schema, {
				...OK,
				value: {
					a: 1,
					b: ["B"],
					c: [1, 2, 3],
					d: ["ab", "cde", "f"],
				},
				defaults: [{ path: ["d"], value: [] }],
			});
			check({}, schema, {
				...OK,
				value: {},
				defaults: [{ path: ["d"], value: [] }],
			});
		});

		describe("registry", () => {
			test("hex", () => {
				const schema: JSONSchema = {
					type: "number",
					coerce: "hex",
				};
				check("decafbad", schema, { ...OK, value: 0xdecafbad });
				check(0xdecafbad, schema, { ...OK, value: 0xdecafbad });
				check(42.23, schema, { ...OK, value: 42 });
				check("xyz", schema, __error("coercion failed"));
				check([], schema, __error("coercion failed"));
			});

			test("higher order (split delim)", () => {
				const schema: JSONSchema = {
					type: "array",
					items: { type: "string" },
					coerce: ["split", "|"],
				};
				check("a|b|c", schema, { ...OK, value: ["a", "b", "c"] });
			});

			test("unknown coercion", () => {
				expect(() => validateSchema("", { coerce: "XXX" })).toThrow(
					"unknown coercion"
				);
				expect(() =>
					validateSchema("", { coerce: ["XXX", 1] })
				).toThrow("unknown coercion");
			});
		});
	});
});
