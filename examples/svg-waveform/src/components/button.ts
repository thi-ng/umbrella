import type { AppContext } from "../api";
import { eventLink } from "./event-link";

export function button(ctx: AppContext, event: Event, label: string) {
	return [eventLink, ctx.ui.button, event, label];
}
