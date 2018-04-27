import { AppContext } from "../api";

export const link = (ctx: AppContext, href, ...body) =>
    ["a", { ...ctx.ui.link, href }, ...body];
