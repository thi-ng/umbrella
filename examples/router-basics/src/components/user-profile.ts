import { App } from "../app";
import { EV_LOAD_USER, EV_SET_STATUS, ROUTE_USER_LIST, UI } from "../config";
import { link } from "./route-link";

/**
 * Single user profile page. Trigger JSON I/O request if user data has
 * not been loaded yet.
 *
 * @param app
 */
export function userProfile(app: App) {
    const id = app.views.route.deref().params.id;
    if (!app.views.users.deref()[id]) {
        app.bus.dispatch([EV_LOAD_USER, id]);
    } else {
        app.bus.dispatch([EV_SET_STATUS, ["idle", "loaded from cache"]]);
    }
    return ["div",
        [userDetails, app, id],
        ["p", link(app, ROUTE_USER_LIST, null, UI.button, "Show all users")],
        [status, app]
    ];
}

function userDetails(app: App, id: number) {
    const user = app.views.users.deref()[id];
    return user ?
        ["h1", user.name, ["small", UI.subtitle, ` (${user.job})`]] :
        ["h1", `User #${id}`];
}

function status(app: App) {
    const status = app.views.status.deref() || [];
    return ["p", UI.status[status[0]], `${status[1]}`];
}