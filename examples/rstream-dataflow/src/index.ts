import { equiv } from "@thi.ng/api/equiv";
import { Atom } from "@thi.ng/atom/atom";
import { start } from "@thi.ng/hdom";
import { comp } from "@thi.ng/transducers/func/comp";
import { choices } from "@thi.ng/transducers/iter/choices";
import { dedupe } from "@thi.ng/transducers/xform/dedupe";
import { map } from "@thi.ng/transducers/xform/map";

import { gestureStream } from "./gesture-stream";
import { extract, initNodes, node } from "./nodes";
import { circle } from "./circle";

// infinite iterator of randomized circle colors (Tachyons CSS class names)
const colors = choices([
    "bg-red", "bg-blue", "bg-gold", "bg-light-green",
    "bg-pink", "bg-light-purple", "bg-orange", "bg-gray"
]);

// atom for storing dataflow results (optional, here only for
// debugging/stringifying state)
const db = new Atom<any>({});

// combined mouse & touch event stream this stream produces tuples of:
// [eventtype, [pos, clickpos, delta]]
// Note: only single touches are supported, no multitouch!
const gestures = gestureStream(document.getElementById("app"));

// dataflow graph definition. each key in this object represents a node
// in the graph and its value is a `NodeSpec`. the `initNodes` function
// transforms these specs into a DAG (directed acyclic graph) of
// @thi.ng/rstream types, so each "node" is actually implemented as a
// stream of some kind...
const graph = initNodes(db, {

    // extracts current mouse/touch position
    mpos: {
        fn: extract([1, 0]),
        ins: [{ stream: () => gestures }],
        out: "mpos"
    },

    // extracts last click position
    // (only defined during drag gestures)
    clickpos: {
        fn: extract([1, 1]),
        ins: [{ stream: () => gestures }],
        out: "clickpos"
    },

    // computes distance between `clickpos` and `mpos`
    // (only defined during drag gestures)
    dist: {
        fn: node(map(({ mpos, clickpos }) =>
            mpos && clickpos &&
            Math.hypot(mpos[0] - clickpos[0], mpos[1] - clickpos[1]) | 0)),
        ins: [
            { stream: "mpos", id: "mpos" },
            { stream: "clickpos", id: "clickpos" },
        ],
        out: "dist",
    },

    // combines `clickpos`, `dist` and `color` streams to produce a
    // @thi.ng/hdom UI component (a circle around clickpos).
    // the resulting stream is then directly included in this app's root
    // component below...
    circle: {
        fn: node(map(({ clickpos, dist, color }) =>
            clickpos && dist && color ?
                circle(color, clickpos[0], clickpos[1], dist * 2) :
                undefined)),
        ins: [
            { stream: "clickpos" },
            { stream: "dist", id: "dist" },
            { stream: "color", id: "color" },
        ],
        out: "circle"
    },

    // produces a new random color for each new drag gesture (and
    // therefore each new circle will have a potentially different
    // color)
    color: {
        fn: ([click]) =>
            click.subscribe(
                comp(
                    dedupe(equiv),
                    map((x) => x && colors.next().value)
                )
            ),
        ins: [{ stream: "clickpos" }],
        out: "color",
    }
});

// start @thi.ng/hdom update loop
start("app", () =>
    ["div",
        ["pre.absolute.top-1.left-1.pa0.ma0.z-2.f7",
            JSON.stringify(db.deref(), null, 2)],
        // note: direct embedding of result stream below. this works
        // since @thi.ng/rstream subscriptions implement the
        // @thi.ng/api/IDeref interface (like several other types, e.g.
        // @thi.ng/atom's Atom, Cursor, View etc.)
        graph.circle,
    ]);
