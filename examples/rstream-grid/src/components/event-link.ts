import type { Event } from "@thi.ng/interceptors";
import type { AppContext } from "../api";

/**
 * Customizable hyperlink component emitting given event on event bus
 * when clicked.
 *
 * @param ctx
 * @param event event tuple of `[event-id, payload]`
 * @param attribs element attribs
 * @param body link body
 */
export const eventLink = (
    ctx: AppContext,
    attribs: any,
    event: Event,
    body: any
) => [
    "a",
    {
        ...attribs,
        onclick: (e: any) => {
            e.preventDefault();
            ctx.bus.dispatch(event);
        },
    },
    body,
];
