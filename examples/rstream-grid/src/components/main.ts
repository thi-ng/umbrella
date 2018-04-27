import { AppContext } from "../api";
import { sidebar } from "./sidebar";

import { SLIDERS } from "../sliders";

export const main = (ctx: AppContext) => {
    const bar = sidebar(ctx, ...SLIDERS);
    return () => ["div", ctx.ui.root, bar, ctx.views.svg];
};
