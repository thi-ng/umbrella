import { group, rect, svg } from "@thi.ng/hiccup-svg";
import { EventBus } from "@thi.ng/interceptors";
import { initGraph, node } from "@thi.ng/rstream-graph";
import { map, range2d } from "@thi.ng/transducers";
import * as ev from "./events";
import * as paths from "./paths";

/**
 * Initializes data flow graph for generating SVG grid. Some of the
 * nodes are using subscriptions to value changes in certain
 * paths/locations in the app state atom. The final node (`svg`) in the
 * graph triggers the `UPDATE_SVG` event each time a new value has been
 * produced. In turn, this event will update the app state and so
 * trigger a DOM update to display the new result.
 *
 * @param bus
 */
export function initDataflow(bus: EventBus) {
    const graph = initGraph(bus.state, {
        grid: {
            fn: grid,
            ins: {
                cols: { path: paths.COLS },
                rows: { path: paths.ROWS },
            },
        },
        rotation: {
            fn: rotate,
            ins: {
                shapes: { stream: "/grid/node" },
                theta: { path: paths.THETA },
            },
        },
        svg: {
            fn: createSVG,
            ins: {
                shapes: { stream: "/rotation/node" },
                cols: { path: paths.COLS },
                rows: { path: paths.ROWS },
                stroke: { path: paths.STROKE },
            },
            // dispatch SVG result doc as event
            outs: {
                "*": (node) =>
                    node.subscribe({
                        next: (svg) => bus.dispatch([ev.UPDATE_SVG, svg]),
                    }),
            },
        },
    });
    return graph;
}

/**
 * Implementation for grid generator node.
 */
const grid = node(
    map(({ cols, rows }) => [
        ...map(
            ([x, y]) => ["rect", { x, y, width: 1, height: 1 }],
            range2d(cols, rows)
        ),
    ])
);

/**
 * Implementation for rotate node. Injects SVG `transform` attribute in
 * all received shapes.
 */
const rotate = node(
    map(({ shapes, theta }) =>
        shapes.map(
            (s: any) => (
                (s[1].transform = `rotate(${theta} ${s[1].x + 0.5} ${
                    s[1].y + 0.5
                })`),
                s
            )
        )
    )
);

/**
 * Implementation for svg dataflow node. Wraps received shapes as
 * complete svg document in hiccup format.
 */
const createSVG = node(
    map(({ shapes, cols, rows, stroke }) =>
        svg(
            {
                class: "w-100 h-100",
                preserveAspectRatio: "xMidYMid",
                viewBox: `-1 -1 ${cols + 2} ${rows + 2}`,
            },
            rect([-1, -1], cols + 2, rows + 2, { fill: "black" }),
            group(
                {
                    stroke: "white",
                    fill: "none",
                    "stroke-width": stroke,
                },
                ...shapes
            )
        )
    )
);
