import type { AppContext } from "../api";
import { SLIDERS } from "../sliders";
import { sidebar } from "./sidebar";

export const main = (ctx: AppContext) => {
	const bar = sidebar(ctx, ...SLIDERS);
	return () => ["div", ctx.ui.root, bar, ctx.views.svg];
};
