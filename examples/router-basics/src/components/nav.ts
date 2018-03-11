import { App } from "../app";
import { ROUTE_USER_LIST, ROUTE_HOME, ROUTE_CONTACT } from "../config";

import { appLink } from "./link";

/**
 * Main nav component with hardcoded routes.
 *
 * @param app
 * @param ui
 */
export function nav(app: App, ui: any) {
    return ["nav",
        ["h1", ui.title, "Demo app"],
        ["div", ui.inner,
            appLink(app, ROUTE_HOME.id, null, ui.link, "Home"),
            appLink(app, ROUTE_USER_LIST.id, null, ui.link, "Users"),
            appLink(app, ROUTE_CONTACT.id, null, ui.linkLast, "Contact"),
        ]
    ];
}
