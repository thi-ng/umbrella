import { DOCTYPE_HTML } from "@thi.ng/hiccup/api";
import { serialize } from "@thi.ng/hiccup/serialize";
import { DEFAULT_THEME, type Theme } from "./api.js";
import { compileTheme } from "./theme.js";

export const generateHtml = (
	diff: any[],
	headerBody: any[],
	theme: Theme = DEFAULT_THEME
) =>
	serialize([
		DOCTYPE_HTML,
		[
			"html",
			[
				"head",
				["meta", { charset: "UTF-8" }],
				[
					"meta",
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0",
					},
				],
				[
					"meta",
					{ name: "generator", content: "https://thi.ng/hdiff" },
				],
				["title", "hdiff"],
				["style", compileTheme(theme)],
			],
			["body", headerBody, ["main", diff]],
		],
	]);
