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
