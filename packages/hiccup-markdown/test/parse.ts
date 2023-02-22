import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { defMDContext, parseRaw, walk } from "../src/index.js";

const check = (src: string, expected: any[]) => {
	const { result, ctx } = parseRaw(src);
	assert.ok(result);
	const res: any[] = [];
	walk(ctx.root, defMDContext(), res);
	assert.deepStrictEqual(res, expected, JSON.stringify(res, null, 4));
};

group("parse", {
	CRLF: () => {
		check(`# hello\r\n\r\nworld\r\n\r\n`, [
			["h1", {}, "hello"],
			["p", {}, "world"],
		]);
	},

	blockquote: () => {
		check(`> a block **quote** of\n> two _lines_.\n\n`, [
			[
				"blockquote",
				{},
				"a block ",
				["strong", {}, "quote"],
				" of",
				" ",
				"two ",
				["em", {}, "lines"],
				".",
			],
		]);
	},

	code: () => {
		check("inline `const example = 'indeed!'` code\n\n", [
			[
				"p",
				{},
				"inline ",
				["code", {}, "const example = 'indeed!'"],
				" code",
			],
		]);
	},

	code_block: () => {
		check(
			"```js tangle:foo.ts linenum:yes\nconst code = () => 'indeed!'\n\n```\n",
			[
				[
					"pre",
					{
						data: { lang: "js" },
						__head: ["tangle:foo.ts", "linenum:yes"],
					},
					["code", {}, "const code = () => 'indeed!'"],
				],
			]
		);
	},

	em: () => {
		check(`some _emphasized_ text\n\n`, [
			["p", {}, "some ", ["em", {}, "emphasized"], " text"],
		]);
	},

	h1: () => {
		check(`# Heading One\n\nbody\n\n`, [
			["h1", {}, "Heading One"],
			["p", {}, "body"],
		]);
	},

	h2: () => {
		check(`## Heading Two\n\nbody\n\n`, [
			["h2", {}, "Heading Two"],
			["p", {}, "body"],
		]);
	},

	h3: () => {
		check(`### Heading Three\n\nbody\n\n`, [
			["h3", {}, "Heading Three"],
			["p", {}, "body"],
		]);
	},

	h4: () => {
		check(`#### Heading Four\n\nbody\n\n`, [
			["h4", {}, "Heading Four"],
			["p", {}, "body"],
		]);
	},

	h5: () => {
		check(`##### Heading Five\n\nbody\n\n`, [
			["h5", {}, "Heading Five"],
			["p", {}, "body"],
		]);
	},

	h6: () => {
		check(`###### Heading Six\n\nbody\n\n`, [
			["h6", {}, "Heading Six"],
			["p", {}, "body"],
		]);
	},

	h7: () => {
		check(`####### Heading Seven\n\nbody\n\n`, [
			["p", {}, "Heading Seven"],
			["p", {}, "body"],
		]);
	},

	hr: () => {
		check(`--\n`, [["hr", { __length: 2 }]]);
		check(`---\n`, [["hr", { __length: 3 }]]);
		check(`----\n`, [["hr", { __length: 4 }]]);
	},

	img: () => {
		check(
			`![thi.ng](https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif)\n\n`,
			[
				[
					"p",
					{},
					[
						"img",
						{
							src: "https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif",
							alt: "thi.ng",
						},
					],
				],
			]
		);
	},

	li: () => {
		check(`- an item\n- another\n\n`, [
			["ul", {}, ["li", {}, "an item"], ["li", {}, "another"]],
		]);
	},

	link: () => {
		check(`come [to](http://thi.ng/umbrella) the light\n\n`, [
			[
				"p",
				{},
				"come ",
				["a", { href: "http://thi.ng/umbrella" }, "to"],
				" the light",
			],
		]);
	},

	strike: () => {
		check(`This is ~~all wrong~~ correct\n\n`, [
			["p", {}, "This is ", ["s", {}, "all wrong"], " correct"],
		]);
	},

	strong: () => {
		check(`I **really** meant that\n\n`, [
			["p", {}, "I ", ["strong", {}, "really"], " meant that"],
		]);
	},

	table: () => {
		check(`| col1 | col2 |\n| :-- | --: |\n| row1 | row2 |\n\n`, [
			[
				"table",
				{ __align: ["left", "right"] },
				[
					"thead",
					{},
					["tr", {}, ["td", {}, "col1 "], ["td", {}, "col2 "]],
				],
				[
					"tbody",
					{},
					["tr", {}, ["td", {}, "row1 "], ["td", {}, "row2 "]],
				],
			],
		]);
	},
});
