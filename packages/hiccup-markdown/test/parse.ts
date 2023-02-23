import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { parse } from "../src/index.js";

const check = (src: string, expected: any[]) => {
	const { result } = parse(src);
	assert.deepStrictEqual(result, expected, JSON.stringify(result, null, 4));
};

group("parse", {
	CRLF: () => {
		check(`# hello\r\n\r\nworld`, [
			["h1", {}, "hello"],
			["p", {}, "world"],
		]);
	},

	blockquote: () => {
		check(`> a block **quote** of\n> two _lines_.`, [
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
		check("> line 1\\\n> line 2\n> line 3", [
			["blockquote", {}, "line 1", ["br", {}], "line 2", " ", "line 3"],
		]);
		check("> line 1\\\n> line 2\n> \n> line 3", [
			[
				"blockquote",
				{},
				"line 1",
				["br", {}],
				"line 2",
				" ",
				["br", {}],
				["br", {}],
				"line 3",
			],
		]);
	},

	code: () => {
		check("inline `const example = 'indeed!'` code", [
			[
				"p",
				{},
				"inline ",
				["code", {}, "const example = 'indeed!'"],
				" code",
			],
		]);
	},

	"code no inline fmt": () => {
		check("`exp_2(x) = 2 ** x`", [
			["p", {}, ["code", {}, "exp_2(x) = 2 ** x"]],
		]);
	},

	codeblock: () => {
		check(
			"```js tangle:foo.ts linenum:yes\nconst code = () => 'indeed!'\n\n```",
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
		check(`some _emphasized_ text`, [
			["p", {}, "some ", ["em", {}, "emphasized"], " text"],
		]);
	},

	h1: () => {
		check(`# Heading One\n\nbody`, [
			["h1", {}, "Heading One"],
			["p", {}, "body"],
		]);
	},

	h2: () => {
		check(`## Heading Two\n\nbody`, [
			["h2", {}, "Heading Two"],
			["p", {}, "body"],
		]);
	},

	h3: () => {
		check(`### Heading Three\n\nbody`, [
			["h3", {}, "Heading Three"],
			["p", {}, "body"],
		]);
	},

	h4: () => {
		check(`#### Heading Four\n\nbody`, [
			["h4", {}, "Heading Four"],
			["p", {}, "body"],
		]);
	},

	h5: () => {
		check(`##### Heading Five\n\nbody`, [
			["h5", {}, "Heading Five"],
			["p", {}, "body"],
		]);
	},

	h6: () => {
		check(`###### Heading Six\n\nbody`, [
			["h6", {}, "Heading Six"],
			["p", {}, "body"],
		]);
	},

	h7: () => {
		check(`####### Heading Seven\n\nbody`, [
			["p", {}, "Heading Seven"],
			["p", {}, "body"],
		]);
	},

	"hd inline fmt": () => {
		check("# abc `def` **ghi** _jkl_", [
			[
				"h1",
				{},
				"abc ",
				["code", {}, "def"],
				" ",
				["strong", {}, "ghi"],
				" ",
				["em", {}, "jkl"],
			],
		]);
	},

	hr: () => {
		check(`--`, [["hr", { __length: 2 }]]);
		check(`---`, [["hr", { __length: 3 }]]);
		check(`----`, [["hr", { __length: 4 }]]);
	},

	img: () => {
		check(
			`![thi.ng](https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif)`,
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

	kbd: () => {
		check("Press <kbd>Control</kbd> + <kbd>R</kbd> to reload", [
			[
				"p",
				{},
				"Press ",
				["kbd", {}, "Control"],
				" + ",
				["kbd", {}, "R"],
				" to reload",
			],
		]);
	},

	ul: () => {
		check(`- an item\n- another`, [
			["ul", {}, ["li", {}, "an item"], ["li", {}, "another"]],
		]);
	},

	ol: () => {
		check(`11. an item\n22. another`, [
			[
				"ol",
				{},
				[
					"li",
					{
						__index: 11,
					},
					"an item",
				],
				[
					"li",
					{
						__index: 22,
					},
					"another",
				],
			],
		]);
	},

	todo: () => {
		check("- [ ] abc\n- [x] def", [
			[
				"ul",
				{},
				[
					"li",
					{
						__todo: true,
						__done: false,
					},
					"abc",
				],
				[
					"li",
					{
						__todo: true,
						__done: true,
					},
					"def",
				],
			],
		]);
	},

	"nested list": () => {
		check(
			"- outer 1\n  - nested 1a\n  - nested 1b\n- outer 2\n  1. nested 2a\n  2. nested 2b\n    - nested 3a\n- outer 3",
			[
				[
					"ul",
					{},
					[
						"li",
						{},
						"outer 1",
						[
							"ul",
							{},
							["li", {}, "nested 1a"],
							["li", {}, "nested 1b"],
						],
					],
					[
						"li",
						{},
						"outer 2",
						[
							"ol",
							{},
							[
								"li",
								{
									__index: 1,
								},
								"nested 2a",
							],
							[
								"li",
								{
									__index: 2,
								},
								"nested 2b",
								["ul", {}, ["li", {}, "nested 3a"]],
							],
						],
					],
					["li", {}, "outer 3"],
				],
			]
		);
	},

	link: () => {
		check(`come [to](http://thi.ng/umbrella) the light`, [
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
		check(`This is ~~all **wrong**~~ correct`, [
			[
				"p",
				{},
				"This is ",
				["s", {}, "all ", ["strong", {}, "wrong"]],
				" correct",
			],
		]);
	},

	strong: () => {
		check(`I **_really_ meant** that`, [
			[
				"p",
				{},
				"I ",
				["strong", {}, ["em", {}, "really"], " meant"],
				" that",
			],
		]);
	},

	table: () => {
		check(`| col1 | col2 |\n| :-- | --: |\n| row1 | row2 |`, [
			[
				"table",
				{ __align: ["left", "right"] },
				[
					"thead",
					{},
					["tr", {}, ["td", {}, "col1"], ["td", {}, "col2"]],
				],
				[
					"tbody",
					{},
					["tr", {}, ["td", {}, "row1"], ["td", {}, "row2"]],
				],
			],
		]);
	},

	"meta hd": () => {
		check("{{{ foo }}}\n# Hello", [["h1", { __meta: "foo" }, "Hello"]]);
	},

	"meta para": () => {
		check("{{{ foo }}}\nHello", [["p", { __meta: "foo" }, "Hello"]]);
	},

	"meta codeblock": () => {
		check("{{{ foo }}}\n```ts\n//Hello\n```", [
			[
				"pre",
				{
					data: {
						lang: "ts",
					},
					__head: [],
					__meta: "foo",
				},
				["code", {}, "//Hello"],
			],
		]);
	},

	"meta bq": () => {
		check("{{{ foo }}}\n> Hello", [
			["blockquote", { __meta: "foo" }, "Hello"],
		]);
	},

	"meta list": () => {
		check("{{{ foo }}}\n- Hello", [
			["ul", { __meta: "foo" }, ["li", {}, "Hello"]],
		]);
	},

	"meta table": () => {
		check("{{{ foo }}}\n|Hello|", [
			[
				"table",
				{
					__align: ["left"],
					__meta: "foo",
				},
				["thead", {}, ["tr", {}, ["td", {}, "Hello"]]],
				["tbody", {}],
			],
		]);
	},
});
