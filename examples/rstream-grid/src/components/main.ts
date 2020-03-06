import { SLIDERS } from "../sliders";
import { sidebar } from "./sidebar";
import type { AppContext } from "../api";

export const main = (ctx: AppContext) => {
    const bar = sidebar(ctx, ...SLIDERS);
    return () => ["div", ctx.ui.root, bar, ctx.views.svg];
};
