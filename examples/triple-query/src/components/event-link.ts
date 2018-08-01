import { Event } from "@thi.ng/interceptors/api";

import { AppContext } from "../api";

/**
 * Customizable hyperlink component emitting given event on event bus
 * when clicked.
 *
 * @param ctx
 * @param event event tuple of `[event-id, payload]`
 * @param attribs element attribs
 * @param body link body
 */
export function eventLink(ctx: AppContext, attribs: any, event: Event, body: any) {
    return ["a",
        {
            ...attribs,
            onclick: (e) => {
                e.preventDefault();
                ctx.bus.dispatch(event);
            }
        },
        body];
}
