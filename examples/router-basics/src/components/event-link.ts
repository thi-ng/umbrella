import type { Event } from "@thi.ng/interceptors";
import type { AppContext } from "../api";

/**
 * Customizable hyperlink component emitting given event on app's event
 * bus when clicked.
 *
 * @param ctx - njected context object
 * @param event - vent tuple of `[event-id, payload]`
 * @param attribs - lement attribs
 * @param body - ink body
 */
export function eventLink(
	ctx: AppContext,
	event: Event,
	attribs: any,
	body: any
) {
	return [
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
}
