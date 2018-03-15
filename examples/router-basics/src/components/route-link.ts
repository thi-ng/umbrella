import { App } from "../app";

/**
 * Customizable hyperlink component emitting EV_ROUTE_TO event when clicked.
 *
 * @param app
 * @param routeID route ID
 * @param routeParams route parameter object
 * @param attribs element attribs
 * @param body link body
 */
export function routeLink(app: App, routeID: PropertyKey, routeParams: any, attribs: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                app.bus.dispatch([App.EV_ROUTE_TO, [routeID, routeParams]]);
            }
        },
        body];
}
