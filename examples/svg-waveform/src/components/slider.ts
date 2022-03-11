import type { AppContext } from "../api";

export interface SliderOpts {
    event: PropertyKey;
    view: PropertyKey;
    label: string;
    min?: number;
    max?: number;
    step?: number;
}

/**
 * Higher-order slider component using both an HTML5 range and number
 * control connected to the same derived view of an app state value.
 * Changes as dispatched via event configured via `opts` object.
 *
 * Because it's an higher order component, it CANNOT be used in an
 * inline manner in the parent component and must be initialized
 * separately.
 *
 * See `main.ts` for usage.
 *
 * @param ctx - 
 * @param opts - 
 */
export function slider(ctx: AppContext, opts: SliderOpts) {
    opts = Object.assign(
        {
            oninput: (e: Event) =>
                ctx.bus.dispatch([
                    opts.event,
                    parseFloat((<HTMLInputElement>e.target).value),
                ]),
            min: 0,
            max: 100,
            step: 1,
        },
        opts
    );
    return (ctx: AppContext) => [
        "section",
        ctx.ui.slider.root,
        [
            "input",
            {
                ...ctx.ui.slider.range,
                ...opts,
                type: "range",
                value: (<any>ctx.views)[opts.view].deref(),
            },
        ],
        [
            "div",
            opts.label,
            [
                "input",
                {
                    ...ctx.ui.slider.number,
                    ...opts,
                    type: "number",
                    value: (<any>ctx.views)[opts.view].deref(),
                },
            ],
        ],
    ];
}
