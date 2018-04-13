import { AppContext } from "../api";

import { slider, SliderOpts } from "./slider";

export function sidebar(ctx: AppContext, ...specs: SliderOpts[]) {
    const sliders = specs.map((s) => slider(ctx, s));
    return () => ["div", ctx.ui.sidebar, ...sliders];
}
