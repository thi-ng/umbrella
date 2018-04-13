import { AppContext } from "../api";

import { slider, SliderOpts } from "./slider";

export function sidebar(ctx: AppContext, ...specs: SliderOpts[]) {
    const sliders = specs.map((s) => slider(ctx, s));
    return ["div", ctx.ui.sidebar,
        ...sliders,
        ["div.absolute.bottom-1",
            "Made with ",
            ["a", { ...ctx.ui.link, href: "https://github.com/thi-ng/umbrella/tree/master/packages/hdom" }, "@thi.ng/hdom"]]
    ];
}
