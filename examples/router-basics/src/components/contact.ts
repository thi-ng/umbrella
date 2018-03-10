import { App } from "../app";

/**
 * Contact page component.
 *
 * @param app
 */
export function contact(_: App, ui: any) {
    return ["div",
        ["p", ui.bodyCopy, "Get in touch!"],
        ["p", ui.bodyCopy,
            [
                ["https://github.com/thi-ng/umbrella", "GitHub"],
                ["https://twitter.com/toxi", "Twitter"],
                ["https://medium.com/@thi.ng", "Medium"]
            ].map(([uri, label]) => ["a", { ...ui.contact.link, href: uri }, label])
        ]
    ];
}
