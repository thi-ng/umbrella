import { valueSetter, ensureParamRange } from "@thi.ng/interceptors/interceptors"
import { AppConfig } from "./api";
// import * as ev from "./events";
// import * as fx from "./effects";

import { main } from "./components/main";

import { SLIDERS } from "./sliders";

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
        // generate event handlers from imported slider definitions
        // the same defs are used in the main root component (main.ts) to generate
        // their respective UI components
        // each of these handlers is dynamically composed of 2 interceptors:
        // the first to validate the event param, the second to update the app state
        // the state update will only be executed if validation
        // succeeds, else the event is canceled
        ...SLIDERS.reduce(
            (events, spec) => {
                events[spec.event] = [
                    ensureParamRange(spec.min, spec.max),
                    valueSetter(spec.view)
                ];
                return events;
            }, {})
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
        amp: 2.5,
        freq: 3,
        harmonics: 20,
        hstep: 2,
        phase: 0,
    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple
    // docs here:
    // https://github.com/thi-ng/umbrella/tree/master/packages/atom#derived-views
    // also see `app.ts` for view initialization
    views: {
        amp: "amp",
        freq: "freq",
        phase: "phase",
        harmonics: "harmonics",
        hstep: "hstep",
    },

    // component CSS class config using http://tachyons.io/ these
    // attribs are made available to all components and allow for easy
    // re-skinning of the whole app
    ui: {
        slider: {
            root: { class: "ttu mb3" },
            range: { class: "w-100" },
            number: { class: "fr w3 tr ttu bn bg-transparent" },
        },
        link: { class: "pointer link dim black b" },
        root: { class: "vw-100 vh-100 flex" },
        sidebar: { class: "bg-light-gray pa2 pt3 w5 f7" },
        waveform: { class: "w-100 h-100" }
    }
};
