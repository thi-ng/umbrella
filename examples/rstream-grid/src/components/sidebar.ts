import type { AppContext } from "../api";
import * as ev from "../events";
import { buttonGroup } from "./button-group";
import { link } from "./link";
import { slider, SliderOpts } from "./slider";

export const sidebar = (ctx: AppContext, ...specs: SliderOpts[]) => {
    const sliders = specs.map((s) => slider(ctx, s));
    return [
        "div",
        ctx.ui.sidebar.root,
        ["h3", ctx.ui.sidebar.title, "@thi.ng/rstream grid"],
        ...sliders,
        [buttonGroup, [[ev.UNDO], "undo"], [[ev.REDO], "redo"]],
        [buttonGroup, [[ev.SAVE_SVG], "download svg"]],
        [buttonGroup, [[ev.SAVE_ANIM], "download anim"]],
        [
            "div",
            "Undo / Redo can also be triggered via ",
            ["code", "Ctrl+Z"],
            " / ",
            ["code", "Ctrl+Y"],
            ". The last 1000 edits are stored.",
        ],
        [
            "div",
            ctx.ui.footer,
            [
                link,
                "https://github.com/thi-ng/umbrella/tree/develop/examples/rstream-grid",
                "Source",
            ],
            ["br"],
            "Made with ",
            [link, "https://github.com/thi-ng/umbrella/", "@thi.ng/umbrella"],
        ],
    ];
};
