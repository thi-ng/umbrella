import * as ev from "./events";

/**
 * Slider definitions used to generate UI components and their event handlers
 */
export const SLIDERS = [
    { event: ev.SET_PHASE, view: "phase", label: "phase", min: 0, max: 360 },
    {
        event: ev.SET_FREQ,
        view: "freq",
        label: "frequency",
        min: 1,
        max: 10,
        step: 0.01,
    },
    {
        event: ev.SET_AMP,
        view: "amp",
        label: "amplitude",
        min: 0,
        max: 4,
        step: 0.01,
    },
    {
        event: ev.SET_HARMONICS,
        view: "harmonics",
        label: "harmonics",
        min: 1,
        max: 20,
    },
    {
        event: ev.SET_HSTEP,
        view: "hstep",
        label: "h step",
        min: 1,
        max: 4,
        step: 0.01,
    },
];
