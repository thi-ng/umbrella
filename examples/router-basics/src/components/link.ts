import { App } from "../app";

/**
 * Takes a route ID, route params and creates a DOM `<a>` component
 * with `href` set to route and using provided attribs and body.
 * Also attaches an `onclick` handler to forward route to router.
 *
 * @param route
 * @param params
 * @param attribs
 * @param body
 */
export function appLink(app: App, id: PropertyKey, params: any, attribs: any, body: any) {
    return ["a",
        {
            class: "link black",
            href: "#",
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                app.bus.dispatch([App.EV_ROUTE_TO, [id, params]]);
            }
        },
        body];
}