import { partial } from "@thi.ng/compose/partial";
import type { Polygon } from "@thi.ng/geom";
import type { IShape, Tessellator } from "@thi.ng/geom-api";
import { edgeSplit } from "@thi.ng/geom-tessellate/edge-split";
import { quadFan } from "@thi.ng/geom-tessellate/quad-fan";
import { triFan } from "@thi.ng/geom-tessellate/tri-fan";
import { arcLength } from "@thi.ng/geom/arc-length";
import { asPolygon } from "@thi.ng/geom/as-polygon";
import { centroid } from "@thi.ng/geom/centroid";
import { circle } from "@thi.ng/geom/circle";
import { polygon } from "@thi.ng/geom/polygon";
import { tessellate } from "@thi.ng/geom/tessellate";
import { canvas } from "@thi.ng/hdom-canvas";
import { deg } from "@thi.ng/math/angle";
import { fit01, fit11 } from "@thi.ng/math/fit";
import { fromInterval } from "@thi.ng/rstream/interval";
import { sync } from "@thi.ng/rstream/sync";
import { updateDOM } from "@thi.ng/transducers-hdom";
import { map } from "@thi.ng/transducers/map";
import type { Vec } from "@thi.ng/vectors";
import { polar } from "@thi.ng/vectors/polar";

type Tint = (p: Polygon) => string;

const MIN_RES = 3;
const MAX_RES = 30;
// const MAX_RES = MIN_RES;

// const SUBDIVS = [tesselQuadFan];
// const SUBDIVS = [tesselTriFan];
// const SUBDIVS = [tesselEdgeSplit];
const SUBDIVS = [quadFan, triFan, edgeSplit, quadFan];
// const SUBDIVS = [...take(4, cycle([tesselQuadFan]))];

const W = 600;
const W2 = W / 2;

/**
 * Creates a color by mapping the centroid of given shape from cartesian
 * space to HSL.
 */
const centroidToHSL = (p: IShape) => {
    const c = polar(null, centroid(p)!);
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
        asPolygon(
            circle([0, 0], W2),
            Math.floor(fit11(Math.sin(t), MIN_RES, MAX_RES))
        ),
        tessel
    ).map(partial(tintedPoly, tint));
};

const main = sync({
    src: {
        time: fromInterval(16),
    },
}).transform(
    // root component function
    map(({ time }) => {
        time *= 0.1;
        // create tessellation
        // resulting array contains Polygon2 values
        // Polygon2 implements the .toHiccup() method for
        // auto-conversion during hdom tree normalization
        const cells = tessellation(time, SUBDIVS, partial(arclengthToHSL, 250));
        return [
            "div.ma2.sans-serif",
            ["div", `Cells: ${cells.length}`],
            [
                canvas,
                { width: 600, height: 600 },
                // ["polygon", { stroke: "black" }, vertices(asPolygon(circle([300, 300], 300), 3))],
                [
                    "g",
                    {
                        translate: [300, 300],
                        // rotate: (time / 10) % TAU,
                        stroke: "#000",
                        weight: 0.25,
                    },
                    ...cells,
                ],
            ],
        ];
    }),
    updateDOM()
);
