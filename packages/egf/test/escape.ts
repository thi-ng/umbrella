import * as assert from "assert";
import { group } from "@thi.ng/testament";
import { ParseContext, parseString } from "../src/index.js";

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

group("escape", {
	"node id": () => {
		assert.deepStrictEqual(parseString(`\\u0046oo`).nodes, {
			Foo: { $id: "Foo" },
		});
	},

	"node id (qfn)": () => {
		assert.deepStrictEqual(
			parseString(`@prefix foo: FOO\n\\u0066oo:\\u0062ar`, $ctx).nodes,
			{
				FOObar: { $id: "FOObar" },
			}
		);
	},

	"prefix decl": () => {
		assert.strictEqual(
			parseString(`@prefix \\u0066oo: \\u0046OO`, $ctx).prefixes.foo,
			"FOO"
		);
	},

	"prop name (qfn)": () => {
		assert.deepStrictEqual(
			parseString(`@prefix a: foo\nx\n\t\\u0061:\\u0062ar baz`, $ctx)
				.nodes,
			{
				x: { $id: "x", foobar: "baz" },
			}
		);
	},

	"tag id": () => {
		assert.deepStrictEqual(parseString(`a\n\tfoo #\\u006eum 42`).nodes, {
			a: { $id: "a", foo: 42 },
		});
	},

	"string value": () => {
		assert.deepStrictEqual(parseString(`a\n\tfoo \\u0062ar`).nodes, {
			a: { $id: "a", foo: "bar" },
		});
	},

	"string multi-line value": () => {
		assert.deepStrictEqual(
			parseString(`a\n\tfoo >>>abc\\ndef\nghi<<<`).nodes,
			{
				a: { $id: "a", foo: "abc\ndef\nghi" },
			}
		);
	},

	"#list multi-line value": () => {
		assert.deepStrictEqual(
			parseString(`a\n\tfoo #list >>>\nabc\\ndef\nghi<<<`).nodes,
			{
				a: { $id: "a", foo: ["abc\ndef", "ghi"] },
			}
		);
	},

	ref: () => {
		assert.deepStrictEqual(
			parseString(`a\n\tfoo -> \\u0062`, { opts: { resolve: true } })
				.nodes,
			{
				a: { $id: "a", foo: { $id: "b" } },
				b: { $id: "b" },
			}
		);
	},

	"ref <>": () => {
		assert.deepStrictEqual(
			parseString(`a\n\tfoo -> <\\u0062:b>`, {
				opts: { prefixes: true, resolve: true },
			}).nodes,
			{
				a: { $id: "a", foo: { $id: "b:b" } },
				"b:b": { $id: "b:b" },
			}
		);
	},
});
