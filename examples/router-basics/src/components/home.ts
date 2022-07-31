import type { AppContext } from "../api";
import { externalLink } from "./external-link";

/**
 * Homepage component.
 *
 * @param ctx - njected context object
 */
export function home(ctx: AppContext) {
	return [
		"div",
		ctx.ui.bodyCopy,
		[
			"p",
			"This is an example application to demonstrate common usage patterns for creating lightweight web apps with the ",
			[
				externalLink,
				ctx.ui.bodyLink,
				"https://github.com/thi-ng/umbrella",
				"@thi.ng/umbrella",
			],
			" libraries.",
		],
		[
			"p",
			[
				"ul.list",
				["li", "App & component configuration"],
				["li", "Global context injection"],
				["li", "Pure ES6 UI components"],
				["li", "Central app state handling"],
				["li", "Derived views"],
				["li", "Route definition & validation"],
				["li", "Composable events, interceptors, side effects"],
				["li", "Async side effects"],
				["li", "Dynamic content loading / transformation"],
				[
					"li",
					"Component styling with ",
					[
						externalLink,
						ctx.ui.bodyLink,
						"http://tachyons.io/",
						"Tachyons CSS",
					],
				],
			],
		],
		[
			"p",
			"Please see the related blog post and the commented source code for more details.",
		],
		["p", "(total app file size: 11.2KB)"],
	];
}
