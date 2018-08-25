import { AppContext } from "../api";

/**
 * Generic HTML link component.
 *
 * @param ctx
 * @param href
 * @param body
 */
export const link = (ctx: AppContext, href: string, body: string) =>
    ["a", { ...ctx.ui.link, href }, body];
