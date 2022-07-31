import type { AppContext } from "../api";

export function link(ctx: AppContext, href: string, ...body: any[]) {
	return ["a", { ...ctx.ui.link, href }, ...body];
}
