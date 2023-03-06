import { group } from "@thi.ng/testament";
import * as assert from "assert";
import { parse } from "../src/index.js";

const check = (src: string, expected: any[], expectFailure = false) => {
	const { result, complete, state } = parse(src);
	if (expectFailure) assert.ok(!complete, "didn't fail");
	else assert.ok(complete, `failed to parse at line ${state.l}`);
	assert.deepStrictEqual(result, expected, JSON.stringify(result, null, 4));
};

group("parse", {
	CRLF: () => {
		check(`# hello\r\n\r\nworld`, [
			["h1", { id: "hello" }, "hello"],
			["p", {}, "world"],
		]);
	},

	blockquote: () => {
		check(
			"> line1\n>> **line 2**\\\n>> line 2a\n>> line 2b\n>> \n>> line 2c\n>>> line 3",
			[
				[
					"blockquote",
					{},
					"line1",
					[
						"blockquote",
						{},
						["strong", {}, "line 2"],
						["br", {}],
						"line 2a",
						" ",
						"line 2b",
						["br", {}],
						["br", {}],
						"line 2c",
						["blockquote", {}, "line 3"],
					],
				],
			]
		);
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

	emoji: () => {
		check(`prefix :smile::+1: :star_struck:`, [
			["p", {}, "prefix", " ", "😄", "👍", " ", "🤩"],
		]);
	},

	"escape in hd": () => {
		check("# a\\*\\*bc", [["h1", { id: "abc" }, "a**bc"]]);
	},

	"escape in para": () => {
		check("a \\`bc\\`", [["p", {}, "a `bc`"]]);
	},

	"escape in inline fmt": () => {
		check("**a\\_bc**", [["p", {}, ["strong", {}, "a_bc"]]]);
		check("_a\\**bc_", [["p", {}, ["em", {}, "a**bc"]]]);
	},

	"escape in link": () => {
		check(`[a\\_bc](d\\(ef\\) "with\\_esc")`, [
			["p", {}, ["a", { href: "d(ef)", title: "with_esc" }, "a_bc"]],
		]);
	},

	"escape in wikiref": () => {
		check(`[[ a\\[bc\\]]]`, [
			[
				"p",
				{},
				[
					"a",
					{
						class: "wikiref",
						href: "a%5Bbc%5D",
					},
					"a[bc]",
				],
			],
		]);
		check(`[[ a\\[bc\\]| Title ]]`, [
			[
				"p",
				{},
				[
					"a",
					{
						class: "wikiref",
						href: "a%5Bbc%5D",
					},
					"Title",
				],
			],
		]);
	},

	"escape in list": () => {
		check(`- a\\_bc\n\\- d\\[ef\\]`, [
			["ul", {}, ["li", {}, "a_bc\n- d[ef]"]],
		]);
	},

	footnotes: () => {
		check(
			`abc[^2] def[^1]

## Chapter 3
---
[^1]: **Bold _italic_** and\\
with linebreaks

[^2]: Second and \`last\`.`,
			[
				[
					"p",
					{},
					"abc",
					["sup", {}, ["a", { id: "fnref-2", href: "#fn-2" }, "[2]"]],
					" def",
					["sup", {}, ["a", { id: "fnref-1", href: "#fn-1" }, "[1]"]],
				],
				["h2", { id: "chapter-3" }, "Chapter 3"],
				["hr", { __length: 3 }],
				[
					"ul",
					{ id: "footnotes" },
					[
						"li",
						{ id: "fn-1" },
						["sup", {}, "[1] "],
						["strong", {}, "Bold ", ["em", {}, "italic"]],
						" and",
						["br", {}],
						"with linebreaks",
						" ",
						["a", { href: "#fnref-1" }, "↩︎"],
					],
					[
						"li",
						{ id: "fn-2" },
						["sup", {}, "[2] "],
						"Second and ",
						["code", {}, "last"],
						".",
						" ",
						["a", { href: "#fnref-2" }, "↩︎"],
					],
				],
			]
		);
	},

	h1: () => {
		check(`# Heading One\n\nbody`, [
			["h1", { id: "heading-one" }, "Heading One"],
			["p", {}, "body"],
		]);
	},

	h2: () => {
		check(`## Heading Two\n\nbody`, [
			["h2", { id: "heading-two" }, "Heading Two"],
			["p", {}, "body"],
		]);
	},

	h3: () => {
		check(`### Heading Three\n\nbody`, [
			["h3", { id: "heading-three" }, "Heading Three"],
			["p", {}, "body"],
		]);
	},

	h4: () => {
		check(`#### Heading Four\n\nbody`, [
			["h4", { id: "heading-four" }, "Heading Four"],
			["p", {}, "body"],
		]);
	},

	h5: () => {
		check(`##### Heading Five\n\nbody`, [
			["h5", { id: "heading-five" }, "Heading Five"],
			["p", {}, "body"],
		]);
	},

	h6: () => {
		check(`###### Heading Six\n\nbody`, [
			["h6", { id: "heading-six" }, "Heading Six"],
			["p", {}, "body"],
		]);
	},

	h7: () => {
		check(`####### Heading Seven\n\nbody`, [
			["p", { id: "heading-seven" }, "Heading Seven"],
			["p", {}, "body"],
		]);
	},

	"hd inline fmt": () => {
		check("# abc `def` **ghi** _jkl_", [
			[
				"h1",
				{ id: "abc-def-ghi-jkl" },
				"abc ",
				["code", {}, "def"],
				" ",
				["strong", {}, "ghi"],
				" ",
				["em", {}, "jkl"],
			],
		]);
	},

	"hd optional id": () => {
		check(`# Heading {#custom-id-123}`, [
			["h1", { id: "custom-id-123" }, "Heading"],
		]);
		check(`# _Head_ing{#custom_id}`, [
			["h1", { id: "custom_id" }, ["em", {}, "Head"], "ing"],
		]);
	},

	hr: () => {
		check(`---`, [["hr", { __length: 3 }]]);
		check(`----`, [["hr", { __length: 4 }]]);
	},

	img: () => {
		check(
			`![label](https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif "trippy GIF")`,
			[
				[
					"p",
					{},
					[
						"img",
						{
							src: "https://media.giphy.com/media/f6qMGmXuOdkwU/giphy.gif",
							alt: "label",
							title: "trippy GIF",
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
		check(
			`[label _with **nested fmt**_](https://thi.ng/umbrella "link title").`,
			[
				[
					"p",
					{},
					[
						"a",
						{
							href: "https://thi.ng/umbrella",
							title: "link title",
						},
						"label ",
						["em", {}, "with ", ["strong", {}, "nested fmt"]],
					],
					".",
				],
			]
		);
		check("**[_abc_](def)**", [
			[
				"p",
				{},
				[
					"strong",
					{},
					[
						"a",
						{
							href: "def",
							title: undefined,
						},
						["em", {}, "abc"],
					],
				],
			],
		]);
	},

	linkref: () => {
		const src = `[_label_][1]\n\n[1]: https://thi.ng/umbrella "link title"`;
		const { result, ctx } = parse(src);
		assert.deepStrictEqual(ctx.linkRefs, {
			1: ["https://thi.ng/umbrella", "link title"],
		});
		const link = result[0][2][1];
		link.href = link.href();
		link.title = link.title();
		const expected = [
			[
				"p",
				{},
				[
					"a",
					{
						href: "https://thi.ng/umbrella",
						title: "link title",
					},
					["em", {}, "label"],
				],
			],
		];
		assert.deepStrictEqual(result, expected);
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
		check(
			`| col1 | col2 |\n| :-- | --: |\n| row1a | row1b |\n| _row2a_ | **row2b** |`,
			[
				[
					"table",
					{
						__align: ["left", "right"],
					},
					[
						"thead",
						{},
						["tr", {}, ["th", {}, "col1"], ["th", {}, "col2"]],
					],
					[
						"tbody",
						{},
						["tr", {}, ["td", {}, "row1a"], ["td", {}, "row1b"]],
						[
							"tr",
							{},
							["td", {}, ["em", {}, "row2a"], " "],
							["td", {}, ["strong", {}, "row2b"], " "],
						],
					],
				],
			]
		);
	},

	wikiref: () => {
		check("A [[Page Title (Wiki-style)]].", [
			[
				"p",
				{},
				"A ",
				[
					"a",
					{
						class: "wikiref",
						href: "Page_Title_(Wiki-style)",
					},
					"Page Title (Wiki-style)",
				],
				".",
			],
		]);
		check("[[Page Name|Label]]", [
			[
				"p",
				{},
				[
					"a",
					{
						class: "wikiref",
						href: "Page_Name",
					},
					"Label",
				],
			],
		]);
	},

	"meta hd": () => {
		check("{{{ foo }}}\n# Hello", [
			["h1", { id: "hello", __meta: "foo" }, "Hello"],
		]);
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

	"meta hr": () => {
		check("{{{ front matter }}}\n---", [
			["hr", { __length: 3, __meta: "front matter" }],
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
				["thead", {}, ["tr", {}, ["th", {}, "Hello"]]],
				["tbody", {}],
			],
		]);
	},
});
