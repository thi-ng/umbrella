import { IView } from "@thi.ng/atom/api";

import { App } from "../app";
import { StatusType } from "../api";
import { EV_LOAD_USER_LIST, EV_SET_STATUS, ROUTE_USER_PROFILE } from "../config";

import { routeLink } from "./route-link";
import { status } from "./status";

/**
 * Dummy user list component. Triggers JSON I/O request if user data has
 * not been loaded yet.
 *
 * @param app
 */
export function allUsers(app: App, ui: any) {
    if (!app.views.users.deref().all) {
        app.bus.dispatch([EV_LOAD_USER_LIST]);
    } else {
        app.bus.dispatch([EV_SET_STATUS, [StatusType.SUCCESS, "loaded from cache", true]]);
    }
    return ["div",
        [status, ui.status, app.views.status],
        [userList, app, ui.userlist, app.views.users]
    ];
}

/**
 * The actual user list component.
 *
 * @param app
 * @param ui
 * @param view
 */
function userList(app: App, ui: any, view: IView<any>) {
    const users = view.deref();
    return users.all &&
        ["section", ui.root, users.all.map(user(app, ui, users))];
}

/**
 * Single user component (used as list items)
 *
 * Based on:
 * http://tachyons.io/components/lists/follower-notifications/index.html
 *
 * @param app
 * @param ui
 * @param users
 */
function user(app: App, ui: any, users: any) {
    return (u) =>
        ["article", ui.container,
            ["div", ui.thumbWrapper,
                ["img", { ...ui.thumb, src: u.img }]],
            ["div", ui.body,
                ["h1", ui.title,
                    routeLink(app, ROUTE_USER_PROFILE.id, { id: u.id }, null, u.name)],
                ["h2", ui.subtitle, `@${u.alias}`]
            ],
            users[u.id] ?
                ["div", ui.meta, "cached"] :
                undefined
        ];
}
