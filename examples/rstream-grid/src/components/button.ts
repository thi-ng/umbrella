import { AppContext } from "../api";
import { eventLink } from "./event-link";

export const button = (ctx: AppContext, event: Event, label: string) =>
    [eventLink, ctx.ui.button, event, label];
