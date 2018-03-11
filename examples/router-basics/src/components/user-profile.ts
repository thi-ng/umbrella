import { App } from "../app";
import { StatusType } from "../api";
import { EV_LOAD_USER, EV_SET_STATUS } from "../config";

import { status } from "./status";

/**
 * Single user profile page. Triggers JSON I/O request on init if user
 * data has not been loaded yet.
 *
 * @param app
 */
export function userProfile(app: App, ui: any) {
    const id = app.views.route.deref().params.id;
    if (!app.views.users.deref()[id]) {
        app.bus.dispatch([EV_LOAD_USER, id]);
    } else {
        app.bus.dispatch([
            EV_SET_STATUS,
            [StatusType.SUCCESS, "loaded from cache", true]
        ]);
    }
    return ["div",
        [status, ui.status, app.views.status],
        [userCard, app, ui.card, id]
    ];
}

// based on: http://tachyons.io/components/cards/profile-card/index.html
function userCard(app: App, ui: any, id: number) {
    const user = app.views.users.deref()[id];
    return user ?
        ["div", ui.container,
            ["img", { ...ui.thumb, src: user.img }],
            ["h3", ui.title, user.name],
            user.job,
            ["hr", ui.sep],
            ["p", ui.body, user.desc]
        ] :
        undefined;
}
