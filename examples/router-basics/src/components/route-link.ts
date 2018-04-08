import { App } from "../app";
import { AppContext } from "../api";

/**
 * Customizable hyperlink component emitting EV_ROUTE_TO event when clicked.
 *
 * @param ctx injected context object
 * @param routeID route ID
 * @param routeParams route parameter object
 * @param attribs element attribs
 * @param body link body
 */
export function routeLink(ctx: AppContext, routeID: PropertyKey, routeParams: any, attribs: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                ctx.bus.dispatch([App.EV_ROUTE_TO, [routeID, routeParams]]);
            }
        },
        body];
}
