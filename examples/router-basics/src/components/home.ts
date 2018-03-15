import { UIAttribs } from "../api";
import { App } from "../app";

/**
 * Homepage component.
 *
 * @param app
 */
export function home(_: App, ui: UIAttribs) {
    return ["div", ui.bodyCopy,
        ["p",
            "This is an example application to demonstrate common usage patterns for creating lightweight web apps with the ",
            ["a", { ...ui.bodyLink, href: "https://github.com/thi-ng/umbrella" }, "@thi.ng/umbrella"],
            " libraries."],
        ["p",
            ["ul.list",
                ["li", "App & component configuration"],
                ["li", "Pure ES6 UI components"],
                ["li", "Central app state handling"],
                ["li", "Derived views"],
                ["li", "Route definition & validation"],
                ["li", "Composable events, interceptors, side effects"],
                ["li", "Async side effects"],
                ["li", "Dynamic content loading / transformation"],
                ["li", "Component styling with ",
                    ["a", { ...ui.bodyLink, href: "http://tachyons.io/" }, "Tachyons CSS"]],
            ]],
        ["p",
            "Please see the related blog post and the commented source code for more details."],
        ["p", "(total app file size: 11.2KB)"]
    ];
}
