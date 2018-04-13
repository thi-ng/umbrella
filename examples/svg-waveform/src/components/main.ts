import { AppContext } from "../api";
import * as ev from "../events";

import { sidebar } from "./sidebar";
import { waveform } from "./waveform";

export function main(ctx: AppContext) {
    const bar = sidebar(ctx,
        { event: ev.SET_PHASE, view: "phase", label: "phase", max: 360 },
        { event: ev.SET_FREQ, view: "freq", label: "frequency", max: 10, step: 0.01 },
        { event: ev.SET_AMP, view: "amp", label: "amplitude", max: 4, step: 0.01 },
        { event: ev.SET_HARMONICS, view: "harmonics", label: "harmonics", min: 1, max: 20 },
        { event: ev.SET_HSTEP, view: "hstep", label: "h step", min: 1, max: 3, step: 0.01 },
    );
    return () => [
        "div", ctx.ui.root,
        bar,
        [waveform, {
            phase: ctx.views.phase.deref(),
            freq: ctx.views.freq.deref(),
            amp: ctx.views.amp.deref(),
            harmonics: ctx.views.harmonics.deref(),
            hstep: ctx.views.hstep.deref(),
            res: 500,
        }]
    ];
}
