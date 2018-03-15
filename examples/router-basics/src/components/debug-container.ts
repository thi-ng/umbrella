import { IView } from "@thi.ng/atom/api";

import { App } from "../app";
import { EV_TOGGLE_DEBUG } from "../config";

/**
 * Collapsable component showing stringified app state.
 *
 * @param app
 * @param ui
 * @param debug
 * @param json
 */
export function debugContainer(app: App, ui: any, debug: number, json: IView<any>) {
    return ["div#debug", ui.column.debug[debug],
        ["a.toggle",
            {
                href: "#",
                onclick: (e) => (e.preventDefault(), app.bus.dispatch([EV_TOGGLE_DEBUG]))
            },
            debug ? "close \u25bc" : "open \u25b2"
        ],
        ["pre", ui.code, json]
    ];
}
