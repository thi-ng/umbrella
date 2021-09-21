import { downloadWithMime } from "@thi.ng/dl-asset/raw";
import { serialize } from "@thi.ng/hiccup/serialize";
import { snapshot, valueSetter } from "@thi.ng/interceptors/interceptors";
import { getInUnsafe } from "@thi.ng/paths/get-in";
import { fromIterable } from "@thi.ng/rstream/iterable";
import { range } from "@thi.ng/transducers/range";
import type { AppConfig } from "./api";
import { main } from "./components/main";
import * as fx from "./effects";
import * as ev from "./events";
import * as paths from "./paths";
import { SLIDERS } from "./sliders";

const FG_COL = "light-silver";
const LINK_COL = "white";

// main App configuration
export const CONFIG: AppConfig = {
    // event handlers events are queued and batch processed in app's RAF
    // render loop event handlers can be single functions, interceptor
    // objects with `pre`/`post` keys or arrays of either.

    // the event handlers' only task is to transform the event into a
    // number of side effects. event handlers should be pure functions
    // and only side effect functions execute any "real" work.

    // Docs here:
    // https://github.com/thi-ng/umbrella/blob/develop/packages/interceptors/src/event-bus.ts#L14
    events: {
        // generate slider event handlers. each uses the `snapshot()`
        // interceptor to record a snapshot of the current app state
        // before applying new slider value
        ...SLIDERS.reduce(
            (events: any, spec) => (
                (events[spec.event] = [snapshot(), valueSetter(spec.path)]),
                events
            ),
            {}
        ),
        [ev.UPDATE_SVG]: [valueSetter(paths.SVG)],
        [ev.SAVE_SVG]: (state) => ({
            [fx.SAVE_SVG]: getInUnsafe(state, paths.SVG),
        }),
        [ev.SAVE_ANIM]: () => ({ [fx.SAVE_ANIM]: true }),
    },

    // custom side effects
    effects: {
        // prepares given hiccup format SVG doc with bounds
        // then uses @thi.ng/hiccup to serialize to XML syntax
        // finally triggers download to local disk
        [fx.SAVE_SVG]: (src) => {
            src = src.slice();
            src[1] = { ...src[1], width: 1000, height: 1000 };
            downloadWithMime(`grid-${Date.now()}.svg`, serialize(src), {
                mime: "image/svg+xml",
            });
        },
        // triggers download of 18 svg files (each delayed by 1sec),
        // each with a different rotation in the 0-90 degrees interval
        [fx.SAVE_ANIM]: (_, bus) =>
            fromIterable(range(0, 90, 5), { delay: 1000 }).subscribe({
                next: (x) => {
                    bus.dispatch([ev.SET_THETA, x]);
                    bus.dispatchLater([ev.SAVE_SVG]);
                },
            }),
    },

    rootComponent: main,

    // DOM root element (or ID)
    domRoot: "app",

    // initial app state
    initialState: {
        [paths.PARAM_BASE]: {
            cols: 5,
            rows: 5,
            theta: 35,
            stroke: 0.3,
        },
    },

    // derived view declarations
    // each key specifies the name of the view and each value is
    // a state path or `[path, transformer]` tuple

    // docs here:
    // https://github.com/thi-ng/umbrella/tree/develop/packages/atom#derived-views
    views: {
        cols: paths.COLS,
        rows: paths.ROWS,
        stroke: paths.STROKE,
        theta: paths.THETA,
        svg: paths.SVG,
    },

    // component CSS class config using http://tachyons.io/
    // these attribs are being passed to all component functions
    // as part of the AppContext object
    ui: {
        button: {
            class: `pointer bg-${FG_COL} hover-bg-${LINK_COL} bg-animate black pa2 mr1 w-100 ttu b tracked-tight`,
        },
        buttongroup: { class: "flex mb1" },
        footer: { class: "absolute bottom-1" },
        link: { class: `pointer link dim ${LINK_COL} b` },
        root: { class: "vw-100 vh-100 flex" },
        sidebar: {
            root: { class: `bg-near-black pa2 pt3 w5 f7 ${FG_COL}` },
            title: { class: `mt0 ${FG_COL}` },
        },
        slider: {
            root: { class: `mb3 ttu b tracked-tight ${FG_COL}` },
            range: { class: "w-100" },
            label: { class: "pl2" },
            number: { class: `fr w3 tr ttu bn bg-transparent ${FG_COL}` },
        },
    },
};
