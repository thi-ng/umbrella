import { range } from "@thi.ng/iterators/range";
import { map } from "@thi.ng/iterators/map";

import { App } from "../app";
import { ROUTE_HOME, ROUTE_USER_PROFILE, UI } from "../config";
import { link } from "./route-link";

/**
 * Dummy user list component.
 *
 * @param app
 */
export function userList(app: App) {
    return ["div",
        ["h1", "All users"],
        link(app, ROUTE_HOME, null, UI.button, "Homepage"),
        [linkList, app, 3]
    ];
}

function linkList(app: App, num = 3) {
    const users = app.views.users.deref();
    return ["ul",
        map(
            (id: number) => ["li",
                link(
                    app,
                    ROUTE_USER_PROFILE,
                    { id },
                    null,
                    users[id] ? users[id].name : `User #${id}`
                )
            ],
            range(1, num + 1)
        )];
}