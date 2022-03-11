import type { AppContext } from "../api";
import { TOGGLE_DEBUG } from "../events";
import { eventLink } from "./event-link";

/**
 * Collapsible component showing stringified app state.
 *
 * @param ctx - njected context object
 * @param debug - 
 * @param json - 
 */
export function debugContainer(ctx: AppContext, debug: any, json: string) {
    return [
        "div#debug",
        ctx.ui.column.debug[debug],
        [
            eventLink,
            [TOGGLE_DEBUG],
            ctx.ui.debugToggle,
            debug ? "close \u25bc" : "open \u25b2",
        ],
        ["pre", ctx.ui.code, json],
    ];
}
