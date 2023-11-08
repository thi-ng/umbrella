import { expect, test } from "bun:test";
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
    <!-- <ignore></ignore> -->
    <a href="#bar">baz        <b>bold</b></a><br/>
  </div>
</body>
</html>`;

test("basics", () => {
	const result = parseHtml(src);
	expect(result.result).toEqual([
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
});

test("custom", () => {
	const result = parseHtml(src, {
		doctype: true,
		dataAttribs: false,
		comments: true,
		collapse: false,
		ignoreElements: ["head", "b", "br"],
		ignoreAttribs: ["bool"],
	});
	expect(result.result).toEqual(<any[]>[
		["!DOCTYPE", "html"],
		[
			"html",
			{ lang: "en" },
			[
				"body",
				{},
				[
					"div",
					{ id: "foo" },
					["__COMMENT__", "<ignore></ignore>"],
					["a", { href: "#bar" }, "baz        "],
				],
			],
		],
	]);
});

test("entities", () => {
	const src = `<body><script>x &lt; 0</script>x &lt; 0</body>`;
	expect(parseHtml(src).result).toEqual([
		["body", {}, ["script", {}, "x &lt; 0"], "x < 0"],
	]);
	expect(parseHtml(src, { unescape: false }).result).toEqual([
		["body", {}, ["script", {}, "x &lt; 0"], "x &lt; 0"],
	]);
});
