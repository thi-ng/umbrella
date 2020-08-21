import type { AppContext } from "../api";
import { ROUTE_TO } from "../events";

/**
 * Customizable hyperlink component emitting EV_ROUTE_TO event when clicked.
 *
 * @param ctx injected context object
 * @param routeID route ID
 * @param routeParams route parameter object
 * @param attribs element attribs
 * @param body link body
 */
export function routeLink(
    ctx: AppContext,
    routeID: PropertyKey,
    routeParams: any,
    attribs: any,
    body: any
) {
    return [
        "a",
        {
            ...attribs,
            onclick: (e: Event) => {
                e.preventDefault();
                ctx.bus.dispatch([ROUTE_TO, [routeID, routeParams]]);
            },
        },
        body,
    ];
}
