import { App } from "../app";
import { EV_LOAD_USER_LIST, EV_SET_STATUS, ROUTE_USER_PROFILE, StatusType } from "../config";

import { appLink } from "./link";
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
        app.bus.dispatch([EV_SET_STATUS, [StatusType.INFO, "loaded from cache"]]);
    }
    return ["div",
        [status, app, ui.status],
        [userList, app, ui.userlist]
    ];
}

function userList(app: App, ui: any) {
    const users = app.views.users.deref();
    const all = users.all;
    return all && ["section", ui.root, all.map(user(app, ui, users))];
}

function user(app: App, ui: any, users: any) {
    return (u) =>
        ["article", ui.container,
            ["div", ui.thumbWrapper,
                ["img", { ...ui.thumb, src: u.img }]],
            ["div", ui.body,
                ["h1", ui.title,
                    appLink(app, ROUTE_USER_PROFILE.id, { id: u.id }, null, u.name)],
                ["h2", ui.subtitle, `@${u.alias}`]
            ],
            ["div", ui.meta, users[u.id] ? "cached" : undefined]
        ];
}
