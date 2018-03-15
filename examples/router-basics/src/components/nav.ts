import { App } from "../app";
import { ROUTE_USER_LIST, ROUTE_HOME, ROUTE_CONTACT } from "../config";

import { routeLink } from "./route-link";

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
            routeLink(app, ROUTE_HOME.id, null, ui.link, "Home"),
            routeLink(app, ROUTE_USER_LIST.id, null, ui.link, "Users"),
            routeLink(app, ROUTE_CONTACT.id, null, ui.linkLast, "Contact"),
        ]
    ];
}
