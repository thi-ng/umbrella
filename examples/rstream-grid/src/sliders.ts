import * as ev from "./events";
import * as paths from "./paths";

/**
 * Slider definitions used to generate UI components and their
 * respective event handlers.
 */
export const SLIDERS = [
    {
        event: ev.SET_COLS,
        path: paths.COLS,
        view: "cols",
        label: "cols",
        min: 1,
        max: 16,
    },
    {
        event: ev.SET_ROWS,
        path: paths.ROWS,
        view: "rows",
        label: "rows",
        min: 1,
        max: 16,
    },
    {
        event: ev.SET_THETA,
        path: paths.THETA,
        view: "theta",
        label: "rotate",
        min: 0,
        max: 360,
    },
    {
        event: ev.SET_STROKE,
        path: paths.STROKE,
        view: "stroke",
        label: "stroke weight",
        min: 0.01,
        max: 0.5,
        step: 0.01,
    },
];
