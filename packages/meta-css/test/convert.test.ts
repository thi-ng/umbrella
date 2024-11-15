import { COMPACT } from "@thi.ng/hiccup-css";
import { NULL_LOGGER } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import {
	processMediaQueries,
	processPlainRules,
	processSpec,
	splitLine,
	type ProcessOpts,
} from "../src/convert.js";

test("var decls", () => {
	const proc: ProcessOpts = {
		css: { format: COMPACT },
		logger: NULL_LOGGER,
		specs: {
			info: { name: "", version: "" },
			decls: [],
			classes: {},
			templates: {},
			media: { foo: { foo: true } },
		},
		plainRules: {},
		mediaQueryRules: {},
		mediaQueryIDs: new Set(["foo"]),
	};
	processSpec(
		":root { color1=#f00 foo:color2=#00f color3=var(--color2) }",
		proc
	);
	const bundle: string[] = [];
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		":root{--color1:#f00;--color3:var(--color2);}",
		"@media (foo){:root{--color2:#00f;}}",
	]);
});

test("templates", () => {
	const proc: ProcessOpts = {
		css: { format: COMPACT },
		logger: NULL_LOGGER,
		specs: {
			info: { name: "", version: "" },
			decls: [],
			classes: {},
			templates: {
				top: { top: "{0}rem", __arity: 1 },
				vars: { "--a": "{0}rem", "--b": "{1}s", __arity: 2 },
			},
			media: { foo: { foo: true } },
		},
		plainRules: {},
		mediaQueryRules: {},
		mediaQueryIDs: new Set(["foo"]),
	};
	const bundle: string[] = [];
	processSpec("#test { top(5) vars(2,3) foo:top(10) foo:vars(4, 5) }", proc);
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		"#test{top:5rem;--a:2rem;--b:3s;}",
		"@media (foo){#test{top:10rem;--a:4rem;--b:5s;}}",
	]);
});

test("verbatim", () => {
	const proc: ProcessOpts = {
		css: { format: COMPACT },
		logger: NULL_LOGGER,
		specs: {
			info: { name: "", version: "" },
			decls: [],
			classes: {},
			templates: {},
			media: { foo: { foo: true } },
		},
		plainRules: {},
		mediaQueryRules: {},
		mediaQueryIDs: new Set(["foo"]),
	};
	const bundle: string[] = [];
	processSpec(`#test { prop-name-[foo\ bar] foo:prop-name-[1px] }`, proc);
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		"#test{prop-name:foo bar;}",
		"@media (foo){#test{prop-name:1px;}}",
	]);
});

test("split line", () => {
	expect([...splitLine("")]).toEqual([]);
	expect([...splitLine("  a b")]).toEqual(["a", "b"]);
	expect([...splitLine("\ta\t\tb")]).toEqual(["a", "b"]);
	expect([...splitLine("a b{}")]).toEqual(["a", "b", "{", "}"]);
	expect([...splitLine("a b{{}}")]).toEqual(["a", "b", "{", "{", "}", "}"]);
	expect([...splitLine("a b{{ }}")]).toEqual(["a", "b", "{", "{", "}", "}"]);
	expect([...splitLine("a, b {}")]).toEqual(["a,", "b", "{", "}"]);
	expect([...splitLine("a, b {f(a, b)}")]).toEqual([
		"a,",
		"b",
		"{",
		"f(a, b)",
		"}",
	]);
	expect([...splitLine("a-[b c]")]).toEqual(["a-[b c]"]);
	expect([...splitLine("a-[b [c]]")]).toEqual(["a-[b [c]]"]);
	expect(() => [...splitLine("f(a,b))")]).toThrow();
	expect(() => [...splitLine("a, b {f(a,b}")]).toThrow();
	expect(() => [...splitLine("a-[b [c]")]).toThrow();
});
