import { externalLink } from "./external-link";
import type { AppContext } from "../api";

/**
 * Contact page component.
 *
 * @param ctx injected context object
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
