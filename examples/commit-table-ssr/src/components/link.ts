import { AppContext } from "../api";

export const link = (ctx: AppContext, href: string, body: string) =>
    ["a", { ...ctx.ui.link, href }, body];
