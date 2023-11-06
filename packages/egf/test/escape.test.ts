import { expect, test } from "bun:test";
import { type ParseContext, parseString } from "../src/index.js";

const $ctx: Partial<ParseContext> = { opts: { prefixes: true } };

test("node id", () => {
	expect(parseString(`\\u0046oo`).nodes).toEqual({
		Foo: { $id: "Foo" },
	});
});

test("node id (qfn)", () => {
	expect(
		parseString(`@prefix foo: FOO\n\\u0066oo:\\u0062ar`, $ctx).nodes
	).toEqual({
		FOObar: { $id: "FOObar" },
	});
});

test("prefix decl", () => {
	expect(parseString(`@prefix \\u0066oo: \\u0046OO`, $ctx).prefixes.foo).toBe(
		"FOO"
	);
});

test("prop name (qfn)", () => {
	expect(
		parseString(`@prefix a: foo\nx\n\t\\u0061:\\u0062ar baz`, $ctx).nodes
	).toEqual({
		x: { $id: "x", foobar: "baz" },
	});
});

test("tag id", () => {
	expect(parseString(`a\n\tfoo #\\u006eum 42`).nodes).toEqual({
		a: { $id: "a", foo: 42 },
	});
});

test("string value", () => {
	expect(parseString(`a\n\tfoo \\u0062ar`).nodes).toEqual({
		a: { $id: "a", foo: "bar" },
	});
});

test("string multi-line value", () => {
	expect(parseString(`a\n\tfoo >>>abc\\ndef\nghi<<<`).nodes).toEqual({
		a: { $id: "a", foo: "abc\ndef\nghi" },
	});
});

test("#list multi-line value", () => {
	expect(parseString(`a\n\tfoo #list >>>\nabc\\ndef\nghi<<<`).nodes).toEqual({
		a: { $id: "a", foo: ["abc\ndef", "ghi"] },
	});
});

test("ref", () => {
	expect(
		parseString(`a\n\tfoo -> \\u0062`, { opts: { resolve: true } }).nodes
	).toEqual({
		a: { $id: "a", foo: { $id: "b" } },
		b: { $id: "b" },
	});
});

test("ref <>", () => {
	expect(
		parseString(`a\n\tfoo -> <\\u0062:b>`, {
			opts: { prefixes: true, resolve: true },
		}).nodes
	).toEqual({
		a: { $id: "a", foo: { $id: "b:b" } },
		"b:b": { $id: "b:b" },
	});
});
