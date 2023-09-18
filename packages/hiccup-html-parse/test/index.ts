import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { parseHtml } from "../src/index.js";

const src = `<!doctype html>
<html lang="en">
<head>
	<script lang="javascript">
console.log("</"+"script>");
	</script>
	<style>
body { margin: 0; }
	</style>
</head>
<body>
	<div id="foo" bool data-xyz="123" empty=''>
	<a href="#bar">baz <b>bold</b></a><br/>
	</div>
</body>
</html>`;

group("hiccup-html-parse", {
	basics: () => {
		const result = parseHtml(src);
		assert.deepStrictEqual(result.result, [
			[
				"html",
				{ lang: "en" },
				[
					"head",
					{},
					[
						"script",
						{ lang: "javascript" },
						'console.log("</"+"script>");',
					],
					["style", {}, "body { margin: 0; }"],
				],
				[
					"body",
					{},
					[
						"div",
						{ id: "foo", bool: true, "data-xyz": "123" },
						["a", { href: "#bar" }, "baz ", ["b", {}, "bold"]],
						["br", {}],
					],
				],
			],
		]);
	},

	ignore: () => {
		const result = parseHtml(src, {
			doctype: true,
			dataAttribs: false,
			ignoreElements: ["head", "b", "br"],
			ignoreAttribs: ["bool"],
		});
		assert.deepStrictEqual(result.result, [
			["!DOCTYPE", "html"],
			[
				"html",
				{ lang: "en" },
				[
					"body",
					{},
					["div", { id: "foo" }, ["a", { href: "#bar" }, "baz "]],
				],
			],
		]);
	},
});
