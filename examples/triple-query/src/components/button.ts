// SPDX-License-Identifier: Apache-2.0
import type { AppContext } from "../api";
import { eventLink } from "./event-link.js";

export function button(
	ctx: AppContext,
	event: Event,
	label: string,
	disabled = false
) {
	return disabled
		? ["span", ctx.ui.buttonDisabled, label]
		: [eventLink, ctx.ui.button, event, label];
}
