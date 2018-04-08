import { AppContext } from "../api";
import { ROUTE_USER_LIST, ROUTE_HOME, ROUTE_CONTACT } from "../config";

import { routeLink } from "./route-link";

/**
 * Main nav component with hardcoded routes.
 *
 * @param ctx injected context object
 */
export function nav(ctx: AppContext) {
    const ui = ctx.ui.nav;
    return ["nav",
        ["h1", ui.title, "Demo app"],
        ["div", ui.inner,
            [routeLink, ROUTE_HOME.id, null, ui.link, "Home"],
            [routeLink, ROUTE_USER_LIST.id, null, ui.link, "Users"],
            [routeLink, ROUTE_CONTACT.id, null, ui.linkLast, "Contact"],
        ]
    ];
}
