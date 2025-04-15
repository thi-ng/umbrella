// SPDX-License-Identifier: Apache-2.0
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
				__bgfg(theme.header),
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
						"letter-spacing": "-0.05rem",
					},
				],
				["small", { "margin-left": "1rem", "font-size": "60%" }],
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
						__bgfgBorder(theme.diff.nochange.side),
						{
							padding: "0.23rem 0.5rem 0.23rem 1rem",
							"margin-right": "1rem",
							"font-size": "0.64rem",
						},
					],
					[
						":hover",
						__bgfg(theme.diff.hover.main),
						[":before", __bgfgBorder(theme.diff.hover.side)],
					],
				],
				[
					"[data-fold]",
					[
						"> code[data-fold-range]:before",
						block,
						__bgfg(theme.diff.fold),
						{
							content: `"⥣ ⋯⋯ Folded lines: " attr(data-fold-range) " ⋯⋯ ⥥"`,
							width: "100%",
							border: "1px dotted",
						},
					],
					[`> code${__diffAttr(" ")}`, none],
					[
						":hover",
						[
							`> code${__diffAttr(" ")}`,
							block,
							__bgfg(theme.diff.hover.main),
						],
						[`> code[data-fold-range]:before`, none],
					],
				],
			],
			__diffMode(theme.diff.add, "+", `"    " ${lnum} " +"`),
			__diffMode(theme.diff.del, "-", `${lnum} "     -"`),
			__diffMode(theme.diff.nochange, " ", `"    " ${lnum} "  "`),
			[
				"code",
				{
					"font-size": "1em",
					"font-family": "Consolas, monaco, monospace",
				},
			],
			["*::selection", __bgfg(theme.selection)],
		]
		// { format: PRETTY }
	);

/** @internal */
const __bgfg = ([background, color]: BgFg) => ({
	background,
	color,
});

/** @internal */
const __bgfgBorder = ([background, color, br]: BgFgBorder) => ({
	background,
	color,
	"border-right": `1px solid ${br}`,
});

/** @internal */
const __diffAttr = (id: string) => `[data-diff="${id}"]`;

/** @internal */
const __diffMode = (
	{ main, side, word }: { main: BgFg; word?: BgFg; side: BgFgBorder },
	mode: string,
	content: string
) => [
	`code${__diffAttr(mode)}`,
	__bgfg(main),
	word ? [`> span${__diffAttr(mode)}`, __bgfg(word)] : null,
	[
		":before",
		{
			...__bgfgBorder(side),
			content,
		},
	],
];
