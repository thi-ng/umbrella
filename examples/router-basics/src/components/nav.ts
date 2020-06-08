import { CONTACT, HOME, USER_LIST } from "../routes";
import { routeLink } from "./route-link";
import type { AppContext } from "../api";

/**
 * Main nav component with hard coded routes.
 *
 * @param ctx injected context object
 */
export function nav(ctx: AppContext) {
    const ui = ctx.ui.nav;
    return [
        "nav",
        ["h1", ui.title, "Demo app"],
        [
            "div",
            ui.inner,
            [routeLink, HOME.id, null, ui.link, "Home"],
            [routeLink, USER_LIST.id, null, ui.link, "Users"],
            [routeLink, CONTACT.id, null, ui.linkLast, "Contact"],
        ],
    ];
}
