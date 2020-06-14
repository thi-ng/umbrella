import { eventLink } from "./event-link";
import type { AppContext } from "../api";

export const button = (ctx: AppContext, event: Event, label: string) => [
    eventLink,
    ctx.ui.button,
    event,
    label,
];
