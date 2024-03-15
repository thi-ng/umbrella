import { COMPACT } from "@thi.ng/hiccup-css";
import { NULL_LOGGER } from "@thi.ng/logger";
import { expect, test } from "bun:test";
import {
	processMediaQueries,
	processPlainRules,
	processSpec,
	type ProcessOpts,
} from "../src/convert.js";

test("var decls", () => {
	const proc: ProcessOpts = {
		format: COMPACT,
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
	processSpec(":root { color1=#f00 foo:color2=#00f }", proc);
	const bundle: string[] = [];
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		":root{--color1:#f00;}",
		"@media (foo){:root{--color2:#00f;}}",
	]);
});

test("templates", () => {
	const proc: ProcessOpts = {
		format: COMPACT,
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
	processSpec("#test { top(5) vars(2,3) foo:top(10) foo:vars(4,5) }", proc);
	processPlainRules(bundle, proc);
	processMediaQueries(bundle, proc);
	expect(bundle).toEqual([
		"#test{top:5rem;--a:2rem;--b:3s;}",
		"@media (foo){#test{top:10rem;--a:4rem;--b:5s;}}",
	]);
});
