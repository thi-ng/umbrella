import { arc, asCubic, group, pathFromCubics } from "@thi.ng/geom";
import { createElement } from "@thi.ng/hdom";
import { walk } from "@thi.ng/hdom-canvas";
import { fit01, TAU } from "@thi.ng/math";
import { fromRAF } from "@thi.ng/rstream";
import { map, normRange } from "@thi.ng/transducers";

const canvas = <HTMLCanvasElement>createElement(document.body, "canvas", {
    width: 600,
    height: 600,
});
const ctx = canvas.getContext("2d")!;

// generate random arc configurations
const arcs = [
    ...map(
        (i) => ({
            r: fit01(i, 50, 200),
            theta: Math.random() * TAU,
            spread: Math.random() * TAU,
            speed: (Math.random() * 2 - 1) * 0.1,
        }),
        normRange(10)
    ),
];

fromRAF().subscribe({
    next() {
        // update arc start angles
        arcs.forEach((a) => (a.theta += a.speed));
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // build arcs, convert them to cubic paths
        // then group and convert to hiccup tree for drawing
        // with hdom-canvas' standalone tree traversal & rendering feature

        // NOTE: this would be MUCH easier, if the HTML Canvas API would actually
        // support elliptic arcs and not just circular ones. IMHO it's a huge
        // oversight in terms of web standards that the canvas API is not more
        // compatible with SVG conventions/features...
        walk(
            ctx,
            group(
                { stroke: "red" },
                arcs.map(({ r, theta, spread }) =>
                    pathFromCubics(
                        asCubic(arc([300, 300], r, 0, theta, theta + spread))
                    )
                )
            ).toHiccup(),
            {
                attribs: {},
                edits: [],
            }
        );
    },
});
