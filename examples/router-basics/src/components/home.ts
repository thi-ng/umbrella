import { App } from "../app";
import { ROUTE_USER_LIST, ROUTE_USER_PROFILE } from "../config";
import { link } from "./route-link";

/**
 * Homepage component.
 *
 * @param app
 */
export function home(app: App) {
    return ["div",
        ["h1", "Welcome"],
        ["ul",
            ["li", link(app, ROUTE_USER_LIST, null, null, "All users")],
            ["li", link(app, ROUTE_USER_PROFILE, { id: 1 }, null, "Single user")],
        ]
    ];
}
