import { AppContext } from "../api";

export interface SliderOpts {
    event: PropertyKey;
    view: PropertyKey;
    label: string;
    min?: number;
    max?: number;
    step?: number;
}

export function slider(ctx: AppContext, opts: SliderOpts) {
    const listener = (e) => ctx.bus.dispatch([opts.event, parseFloat(e.target.value)]);
    opts = Object.assign({
        oninput: listener,
        min: 0,
        max: 100,
        step: 1,
    }, opts);
    return () => ["section", ctx.ui.slider.root,
        ["input",
            {
                ...ctx.ui.slider.range,
                ...opts,
                type: "range",
                value: ctx.views[opts.view].deref(),
            }],
        ["div", opts.label,
            ["input", {
                ...ctx.ui.slider.number,
                ...opts,
                type: "number",
                value: ctx.views[opts.view].deref(),
            }]]];
}
