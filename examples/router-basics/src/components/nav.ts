// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";
import { CONTACT, HOME, USER_LIST } from "../routes.js";
import { routeLink } from "./route-link.js";

/**
 * Main nav component with hard coded routes.
 *
 * @param ctx - njected context object
 */
export function nav(ctx: AppContext) {
	const ui = ctx.ui.nav;
	return [
		"nav",
		["h1", ui.title, "Demo app"],
		[
			"div",
			ui.inner,
			[routeLink, HOME.id, null, ui.link, "Home"],
			[routeLink, USER_LIST.id, null, ui.link, "Users"],
			[routeLink, CONTACT.id, null, ui.linkLast, "Contact"],
		],
	];
}
