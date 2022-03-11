import { type AppContext, StatusType, type User } from "../api";
import { LOAD_USER_LIST, SET_STATUS } from "../events";
import { USER_PROFILE } from "../routes";
import { routeLink } from "./route-link";
import { status } from "./status";

/**
 * Dummy user list component. Triggers JSON I/O request if user data has
 * not been loaded yet.
 *
 * @param ctx - njected context object
 */
export function allUsers(ctx: AppContext) {
    ctx.bus.dispatch(
        ctx.views.userlist.deref()!.length
            ? [SET_STATUS, [StatusType.SUCCESS, "list loaded from cache", true]]
            : [LOAD_USER_LIST]
    );
    return ["div", status, userList];
}

/**
 * The actual user list component.
 *
 * @param ctx - njected context object
 */
function userList(ctx: AppContext) {
    const profiles = ctx.views.users.deref();
    const list = ctx.views.userlist.deref();
    return (
        list && [
            "section",
            ctx.ui.userlist.root,
            list.map((u) => [user, u, !!profiles![u.id]]),
        ]
    );
}

/**
 * Single user component (used as list items)
 *
 * Based on:
 * http://tachyons.io/components/lists/follower-notifications/index.html
 *
 * @param ctx - njected context object
 * @param user - 
 * @param cached - 
 */
function user(ctx: AppContext, user: User, cached: boolean) {
    const ui = ctx.ui.userlist;
    return [
        "article",
        ui.container,
        ["div", ui.thumbWrapper, ["img", { ...ui.thumb, src: user.img }]],
        [
            "div",
            ui.body,
            [
                "h1",
                ui.title,
                [routeLink, USER_PROFILE.id, { id: user.id }, null, user.name],
            ],
            ["h2", ui.subtitle, `@${user.alias}`],
        ],
        cached ? ["div", ui.meta, "cached"] : undefined,
    ];
}
