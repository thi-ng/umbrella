// SPDX-License-Identifier: Apache-2.0
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
		`:root {
		color-1=#f00
		pad="1px 2px"
		gradient=linear-gradient(white black)
		foo:color2=#00f
		color_3=var(--color2)
		content-["a=b"]
		foo:content-["c=d"]
		}`,
		proc
	);
	const bundle: string[] = [];
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		':root{--color-1:#f00;--pad:1px 2px;--gradient:linear-gradient(white black);--color_3:var(--color2);content:"a=b";}',
		'@media (foo){:root{--color2:#00f;content:"c=d";}}',
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
				bg: { backgound: "url({0})", __arity: 1 },
			},
			media: { foo: { foo: true }, bar: { bar: true } },
		},
		plainRules: {},
		mediaQueryRules: {},
		mediaQueryIDs: new Set(["foo", "bar"]),
	};
	const bundle: string[] = [];
	processSpec(
		`#test { top(5) vars(2,3) bg(data:image/png\\,...=) foo:top(10) foo:vars(4, 5) foo:bg(data:image/jpg\\,...=) }
		#test2 { foo:bar:top(10) foo:bar:vars(4, 5) foo:bar:bg(data:image/gif\\,...=) }`,
		proc
	);
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		"#test{top:5rem;--a:2rem;--b:3s;backgound:url(data:image/png,...=);}",
		"@media (foo){#test{top:10rem;--a:4rem;--b:5s;backgound:url(data:image/jpg,...=);}}",
		"@media (foo) and (bar){#test2{top:10rem;--a:4rem;--b:5s;backgound:url(data:image/gif,...=);}}",
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
	processSpec(
		`#test { prop-name-[foo\ bar] foo:prop-name-[1px] { [type=test] { prop-name-[nested] } } }
		#test2 { content-["test:"] foo:content-["foo:"] }`,
		proc
	);
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		`#test{prop-name:foo bar;}#test[type=test]{prop-name:nested;}#test2{content:"test:";}`,
		'@media (foo){#test{prop-name:1px;}#test2{content:"foo:";}}',
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
	expect([...splitLine(`a="b,c"`)]).toEqual([`a="b,c"`]);
	expect([...splitLine(`a-["b,c"]`)]).toEqual([`a-["b,c"]`]);
	expect(() => [...splitLine("f(a,b))")]).toThrow();
	expect(() => [...splitLine("a, b {f(a,b}")]).toThrow();
	expect(() => [...splitLine("a-[b [c]")]).toThrow();
});
