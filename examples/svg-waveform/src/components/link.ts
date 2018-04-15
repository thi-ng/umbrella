import { AppContext } from "../api";

export function link(ctx: AppContext, href, ...body) {
    return ["a", { ...ctx.ui.link, href }, ...body];
}
