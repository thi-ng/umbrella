import { circle } from "@thi.ng/hiccup-svg/circle";
import { group } from "@thi.ng/hiccup-svg/group";
import { polyline } from "@thi.ng/hiccup-svg/polyline";
import { svg } from "@thi.ng/hiccup-svg/svg";
import { GestureEvent, gestureStream, GestureType } from "@thi.ng/rstream-gestures";
import { fromIterable } from "@thi.ng/rstream/from/iterable";
import { merge } from "@thi.ng/rstream/stream-merge";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { comp } from "@thi.ng/transducers/func/comp";
import { identity } from "@thi.ng/transducers/func/identity";
import { peek } from "@thi.ng/transducers/func/peek";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { filter } from "@thi.ng/transducers/xform/filter";
import { map } from "@thi.ng/transducers/xform/map";
import { multiplexObj } from "@thi.ng/transducers/xform/multiplex-obj";
import { partition } from "@thi.ng/transducers/xform/partition";
import { Vec2 } from "@thi.ng/vectors/vec2";

import { CTA } from "./config";

/**
 * Root component function, attached to rstream (see further below).
 * Receives raw & processed gesture paths to visualize as SVG.
 *
 * @param raw
 * @param processed
 */
const app = ({ raw, processed }) =>
    ["div",
        svg(
            {
                width: window.innerWidth,
                height: window.innerHeight,
                stroke: "none",
                fill: "none",
            },
            path(raw || [], processed.path, processed.corners || [])
        ),
        ["div.fixed.top-0.left-0.ma3",
            ["div", `raw: ${(raw && raw.length) || 0}`],
            ["div", `resampled: ${(processed && processed.path.length) || 0}`],
            ["div", `corners: ${(processed && processed.corners.length) || 0}`],
        ]
    ];

/**
 * Gesture visualization component. Creates an SVG group of shape
 * elements & iterables.
 *
 * @param raw raw gesture path
 * @param sampled resampled path
 * @param corners array of corner points
 */
const path = (raw: Vec2[], sampled: Vec2[], corners: Vec2[]) =>
    group({},
        polyline(raw, { stroke: "#444" }),
        map((p) => circle(p, 2, { fill: "#444" }), raw),
        polyline(sampled, { stroke: "#fff" }),
        map((p) => circle(p, 2, { fill: "#fff" }), sampled),
        map((p) => circle(p, 6, { fill: "#cf0" }), corners),
        circle(sampled[0], 6, { fill: "#f0c" }),
        circle(peek(sampled), 6, { fill: "#0cf" }),
    );

/**
 * Re-samples given polyline at given uniform distance. Returns array of
 * interpolated points (does not modify original).
 *
 * @param step sample distance
 * @param pts
 */
const sampleUniform = (step: number, pts: Vec2[]) => {
    if (!pts.length) return [];
    let prev = pts[0];
    const res: Vec2[] = [prev];
    for (let i = 1, n = pts.length; i < n; prev = peek(res), i++) {
        const p = pts[i];
        let d = p.dist(prev);
        while (d >= step) {
            res.push(prev = prev.copy().mixN(p, step / d));
            d -= step;
        }
    }
    res.push(peek(pts));
    return res;
};

/**
 * Applies low-pass filter to given polyline. I.e. Each point in the
 * array (apart from the 1st) is interpolated towards the last point in
 * the result array. Returns new array of smoothed points.
 *
 * @param path
 */
const smoothPath = (smooth: number, path: Vec2[]) => {
    const res: Vec2[] = [path[0]];
    for (let i = 1, n = path.length; i < n; i++) {
        res.push(path[i].copy().mixN(res[i - 1], smooth));
    }
    return res;
};

/**
 * Corner detector HOF. Returns new function which takes 3 successive
 * path points and returns true if the middle point is a corner.
 *
 * @param thresh normalized angle threshold
 */
const isCorner = (thresh: number) => {
    thresh = Math.PI * (1 - thresh);
    return ([a, b, c]: Vec2[]) =>
        b.copy().sub(a).angleBetween(b.copy().sub(c), true) < thresh;
};

/**
 * Gesture event processor. Collects gesture event positions into an
 * array of Vec2.
 */
const collectPath = () => {
    let pts: Vec2[] = [];
    return (g: GestureEvent) => {
        const pos = new Vec2(g[1].pos);
        switch (g[0]) {
            case GestureType.START:
                pts = [pos];
                break;
            case GestureType.DRAG:
                pts.push(pos);
                break;
            // uncomment to destroy path on mouseup / touchend
            // case GestureType.END:
            // pts = [];
        }
        return pts;
    }
};

// gesture input stream(s)
const gesture = merge({
    src: [
        // the initial CTA (call-to-action) gesture (see config.ts)
        // will be shown prior to first user interaction.
        // this stream only emits this one single gesture path,
        // then closes and will be removed from the stream merge
        fromIterable([CTA]),
        // mouse & touch event stream attached to document.body
        // we're filtering out move & zoom events to avoid extraneous work
        gestureStream(document.body)
            .transform(
                filter((g) => g[0] != GestureType.MOVE && g[0] != GestureType.ZOOM),
                map(collectPath())
            )
    ]
});

// main gesture processor
// uses 2 inputs, both based on above `gesture` stream
// however one of them will be transformed via multi-stage transducer
// to create a resampled version and apply a corner detector
// the resulting stream will emit tuple objects of this structure:
// `{ raw: Vec2[], processed: { path: Vec2[], corners: Vec2[] } }
sync({
    src: {
        raw: gesture,
        processed: gesture.transform(
            comp(
                map((pts: Vec2[]) => smoothPath(3 / 4, pts)),
                map((pts: Vec2[]) => sampleUniform(20, pts)),
                multiplexObj({
                    path: map(identity),
                    corners: map(
                        (pts) => transduce(
                            comp(
                                partition(3, 1),
                                filter(isCorner(1 / 4)),
                                map((x) => x[1])
                            ),
                            push(),
                            pts
                        )
                    )
                })
            )
        ),
    },
}).transform(
    // transform result tuples into HDOM components
    map(app),
    // update UI diff
    updateDOM()
);
