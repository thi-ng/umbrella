import { Route } from "@thi.ng/router/api";

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
export function link(app: App, route: Route, params: any, attribs: any, body: any) {
    const href = app.router.format(route.id, params);
    return ["a",
        {
            ...attribs,
            href,
            onclick: (e) => (e.preventDefault(), app.router.routeTo(href)),
        },
        body
    ];
}