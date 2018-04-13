import { valueSetter, ensureParamRange } from "@thi.ng/interceptors/interceptors"
import { AppConfig } from "./api";
import * as ev from "./events";
// import * as fx from "./effects";

import { main } from "./components/main";

// main App configuration
export const CONFIG: AppConfig = {

    // event handlers events are queued and batch processed in app's RAF
    // render loop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://github.com/thi-ng/umbrella/blob/master/packages/interceptors/src/event-bus.ts#L14
    events: {
        [ev.SET_AMP]: [ensureParamRange(0, 4), valueSetter("amp")],
        [ev.SET_FREQ]: [ensureParamRange(0, 10), valueSetter("freq")],
        [ev.SET_PHASE]: [ensureParamRange(0, 360), valueSetter("phase")],
        [ev.SET_HARMONICS]: [ensureParamRange(1, 20), valueSetter("harmonics")],
        [ev.SET_HSTEP]: [ensureParamRange(1, 3), valueSetter("hstep")],
    },

    // custom side effects
    effects: {

    },

    // DOM root element (or ID)
    domRoot: "app",

    // root component function used by the app
    rootComponent: main,

    // initial app state
    initialState: {
        amp: 2,
        freq: 2,
        phase: 0,
        harmonics: 20,
        hstep: 2,
    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple
    // docs here:
    // https://github.com/thi-ng/umbrella/tree/master/packages/atom#derived-views
    views: {
        amp: "amp",
        freq: "freq",
        phase: "phase",
        harmonics: "harmonics",
        hstep: "hstep",
    },

    // component CSS class config using http://tachyons.io/
    // these attribs are being passed to all/most components
    ui: {
        slider: {
            root: { class: "f7 ttu mb3" },
            range: { class: "w-100" },
            number: { class: "fr w3 tr ttu bn bg-transparent" },
        },
        link: { class: "pointer link blue" },
        root: { class: "vw-100 vh-100 flex" },
        sidebar: { class: "bg-light-gray pa2 w5" },
        wave: { stroke: "#f04", fill: "#f04", "stroke-linejoin": "round" }
    }
};
