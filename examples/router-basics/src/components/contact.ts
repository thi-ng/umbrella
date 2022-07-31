import type { AppContext } from "../api";
import { externalLink } from "./external-link";

/**
 * Contact page component.
 *
 * @param ctx - njected context object
 */
export function contact(ctx: AppContext) {
	return [
		"div",
		ctx.ui.bodyCopy,
		["p", "Get in touch!"],
		[
			"p",
			[
				["https://github.com/thi-ng/umbrella", "GitHub"],
				["https://twitter.com/toxi", "Twitter"],
				["https://medium.com/@thi.ng", "Medium"],
			].map((link) => [externalLink, ctx.ui.contact.link, ...link]),
		],
	];
}
