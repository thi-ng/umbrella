import { Event } from "@thi.ng/interceptors/api";

import { App } from "../app";

/**
 * Customizable hyperlink component emitting given event on app's event
 * bus when clicked.
 *
 * @param app
 * @param event event tuple of `[event-id, payload]`
 * @param attribs element attribs
 * @param body link body
 */
export function eventLink(app: App, event: Event, attribs: any, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                app.bus.dispatch(event);
            }
        },
        body];
}
