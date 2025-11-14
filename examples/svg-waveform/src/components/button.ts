// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api.js";
import { eventLink } from "./event-link.js";

export function button(ctx: AppContext, event: Event, label: string) {
	return [eventLink, ctx.ui.button, event, label];
}
