import { partial } from "@thi.ng/compose/partial";
import {
    arcLength,
    asPolygon,
    centroid,
    IShape,
    Polygon2,
    tessellate,
    Tessellator,
    vertices
} from "@thi.ng/geom2/api";
import { circle } from "@thi.ng/geom2/circle";
import { polygon } from "@thi.ng/geom2/polygon";
import {
    edgeSplit,
    inset,
    quadFan,
    triFan
} from "@thi.ng/geom2/tessellate";
import { canvas } from "@thi.ng/hdom-canvas";
import { deg } from "@thi.ng/math/angle";
import { fit01, fit11 } from "@thi.ng/math/fit";
import { fromInterval } from "@thi.ng/rstream/from/interval";
import { sync } from "@thi.ng/rstream/stream-sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { cycle } from "@thi.ng/transducers/iter/cycle";
import { map } from "@thi.ng/transducers/xform/map";
import { take } from "@thi.ng/transducers/xform/take";
import { Vec } from "@thi.ng/vectors3/api";
import { polar } from "@thi.ng/vectors3/polar";

type Tint = (p: Polygon2) => string;

const MIN_RES = 3;
const MAX_RES = 30;
// const MAX_RES = MIN_RES;

// const SUBDIVS = [quadFan];
// const SUBDIVS = [triFan];
// const SUBDIVS = [edgeSplit];
const SUBDIVS = [quadFan, triFan, edgeSplit, quadFan];
// const SUBDIVS = [...take(4, cycle([quadFan]))];

const W = 600;
const W2 = W / 2;

/**
 * Creates a color by mapping the centroid of given shape from cartesian
 * space to HSL.
 */
const centroidToHSL = (p: IShape) => {
    const c = polar(null, centroid(p));
    const h = deg(c[1]);
    const s = fit01(c[0] / W2, 0, 100);
    const l = fit01(c[0] / W2, 100, 50);
    return `hsl(${h},${s}%,${l}%)`;
};

/**
 * Creates an HSL color from the arc length / circumference of the given
 * shape.
 */
const arclengthToHSL = (max: number, p: IShape) =>
    `hsl(${fit01(arcLength(p) / max, 0, 360)},100%,50%)`;

/**
 * Converts given point array into a polygon and computes fill color
 * with provided `tint` function.
 */
const tintedPoly = (tint: Tint, points: Vec[]) => {
    const p = polygon(points);
    p.attribs = {
        fill: tint(p),
        // stroke: tint(p),
    };
    return p;
};

/**
 * Creates a regular polygon, then recursively subdivides it and tints
 */
const tessellation = (t: number, tessel: Tessellator[], tint: Tint) => {
    return tessellate(
        asPolygon(circle([0, 0], W2), Math.floor(fit11(Math.sin(t), MIN_RES, MAX_RES))),
        tessel
    ).map(partial(tintedPoly, tint));
};

const main = sync({
    src: {
        time: fromInterval(16),
    }
}).transform(
    // root component function
    map(({ time }) => {
        time *= 0.1;
        // create tessellation
        // resulting array contains Polygon2 values
        // Polygon2 implements the .toHiccup() method for
        // auto-conversion during hdom tree normalization
        const cells = tessellation(
            time,
            SUBDIVS,
            partial(arclengthToHSL, 250)
        );
        return ["div.ma2.sans-serif",
            ["div", `Cells: ${cells.length}`],
            [canvas,
                { width: 600, height: 600 },
                // ["polygon", { stroke: "black" }, vertices(asPolygon(circle([300, 300], 300), 3))],
                ["g",
                    {
                        translate: [300, 300],
                        // rotate: (time / 10) % TAU,
                        stroke: "#000",
                        weight: 0.25
                    },
                    ...cells]
            ]];
    }),
    updateDOM()
);

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(() => main.done());
}
