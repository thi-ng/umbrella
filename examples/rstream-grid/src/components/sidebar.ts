import { AppContext } from "../api";
import * as ev from "../events";

import { buttonGroup } from "./button-group";
import { link } from "./link";
import { slider, SliderOpts } from "./slider";

export const sidebar = (ctx: AppContext, ...specs: SliderOpts[]) => {
    const sliders = specs.map((s) => slider(ctx, s));
    return ["div", ctx.ui.sidebar.root,
        ["h2", ctx.ui.sidebar.title, "SVG Grid"],
        ...sliders,
        [buttonGroup,
            [[ev.UNDO], "undo"],
            [[ev.REDO], "redo"]],
        [buttonGroup,
            [[ev.SAVE_SVG], "download svg"]],
        [buttonGroup,
            [[ev.SAVE_ANIM], "download anim"]],
        ["div", ctx.ui.footer,
            [link, "https://github.com/thi-ng/umbrella/tree/master/examples/rs-undo", "Source"],
            ["br"],
            "Made with ",
            [link, "https://github.com/thi-ng/umbrella/", "@thi.ng/umbrella"]]
    ];
};
