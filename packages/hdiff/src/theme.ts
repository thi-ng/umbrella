import { css } from "@thi.ng/hiccup-css/css";
import type { BgFg, BgFgBorder, Theme } from "./api.js";

const block = { display: "block" };
const none = { display: "none" };
const lnum = "attr(data-lnum)";

export const compileTheme = (theme: Theme): string =>
	css(
		[
			[
				"body",
				"div",
				"pre",
				"code",
				{
					"box-sizing": "border-box",
					margin: 0,
				},
			],
			["body", { "font-family": "sans-serif" }],
			[
				"header",
				bgfg(theme.header),
				{
					position: "fixed",
					top: 0,
					width: "100%",
					padding: "0.5rem",
					"box-shadow": "-8px 0 8px #666",
				},
				[
					"h1",
					{
						margin: "0 0 0.25rem 0",
						padding: "0 0 0.25rem 0",
						"border-bottom": "1px dotted currentColor",
						"font-weight": 100,
					},
				],
				["code", { "font-size": "66%" }],
			],
			["main", { "margin-top": "5rem" }],
			[
				"pre",
				{
					"font-size": "0.8rem",
					"line-height": "1.2rem",
				},
				[
					"> code",
					block,
					[
						":before",
						bgfgBorder(theme.diff.nochange.side),
						{
							padding: "0.23rem 0.5rem 0.23rem 1rem",
							"margin-right": "1rem",
							"font-size": "0.64rem",
						},
					],
					[
						":hover",
						bgfg(theme.diff.hover.main),
						[":before", bgfgBorder(theme.diff.hover.side)],
					],
				],
				[
					"[data-fold]",
					[
						"> code[data-fold-range]:before",
						block,
						bgfg(theme.diff.fold),
						{
							content: `"⥣ ⋯⋯ Folded lines: " attr(data-fold-range) " ⋯⋯ ⥥"`,
							width: "100%",
							border: "1px dotted",
						},
					],
					[`> code${diffAttr(" ")}`, none],
					[
						":hover",
						[
							`> code${diffAttr(" ")}`,
							block,
							bgfg(theme.diff.hover.main),
						],
						[`> code[data-fold-range]:before`, none],
					],
				],
			],
			diffMode(theme.diff.add, "+", `"    " ${lnum} " +"`),
			diffMode(theme.diff.del, "-", `${lnum} "     -"`),
			diffMode(theme.diff.nochange, " ", `"    " ${lnum} "  "`),
			[
				"code",
				{
					"font-size": "1em",
					"font-family": "Consolas, monaco, monospace",
				},
			],
			["*::selection", bgfg(theme.selection)],
		]
		// { format: PRETTY }
	);

const bgfg = ([background, color]: BgFg) => ({
	background,
	color,
});

const bgfgBorder = ([background, color, br]: BgFgBorder) => ({
	background,
	color,
	"border-right": `1px solid ${br}`,
});

const diffAttr = (id: string) => `[data-diff="${id}"]`;

const diffMode = (
	{ main, side, word }: { main: BgFg; word?: BgFg; side: BgFgBorder },
	mode: string,
	content: string
) => [
	`code${diffAttr(mode)}`,
	bgfg(main),
	word ? [`> span${diffAttr(mode)}`, bgfg(word)] : null,
	[
		":before",
		{
			...bgfgBorder(side),
			content,
		},
	],
];
