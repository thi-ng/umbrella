import type { AppContext } from "../api";
import { eventLink } from "./event-link";

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
