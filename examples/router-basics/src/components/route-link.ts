import type { AppContext } from "../api";
import { ROUTE_TO } from "../events";

/**
 * Customizable hyperlink component emitting EV_ROUTE_TO event when clicked.
 *
 * @param ctx - njected context object
 * @param routeID - oute ID
 * @param routeParams - oute parameter object
 * @param attribs - lement attribs
 * @param body - ink body
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
