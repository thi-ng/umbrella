import { eventLink } from "./event-link";
import type { AppContext } from "../api";

export function button(ctx: AppContext, event: Event, label: string) {
    return [eventLink, ctx.ui.button, event, label];
}
