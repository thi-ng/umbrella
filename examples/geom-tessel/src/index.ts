import { partial } from "@thi.ng/compose/partial";
import { IArcLength, ICentroid, Tessellator } from "@thi.ng/geom/api";
import { circle2 } from "@thi.ng/geom/circle2";
import { polygon2, Polygon2 } from "@thi.ng/geom/polygon2";
import { edgeSplit, quadFan, triFan } from "@thi.ng/geom/tessellate";
import { canvas } from "@thi.ng/hdom-canvas";
import { start } from "@thi.ng/hdom/start";
import { deg } from "@thi.ng/math/angle";
import { TAU } from "@thi.ng/math/api";
import { fit01 } from "@thi.ng/math/fit";
import { Vec2 } from "@thi.ng/vectors/vec2";

type Tint = (p: Polygon2) => string;

const W = 600;
const W2 = W / 2;

/**
 * Creates a color by mapping the centroid of given shape from cartesian
 * space to HSL.
 */
const centroidToHSL = (p: ICentroid<Vec2>) => {
    const c = p.centroid().toPolar();
    const h = deg(c.y);
    const s = fit01(c.x / W2, 0, 100);
    const l = fit01(c.x / W2, 100, 50);
    return `hsl(${h},${s}%,${l}%)`;
};

/**
 * Creates an HSL color from the arc length / circumference of the given
 * shape.
 */
const arclengthToHSL = (max: number, p: IArcLength) =>
    `hsl(${fit01(p.arcLength() / max, 0, 360)},100%,50%)`;

/**
 * Converts given point array into a polygon and computes fill color
 * with provided `tint` function.
 */
const tintedPoly = (tint: Tint, points: Vec2[]) => {
    const p = polygon2(points);
    p.attribs = { fill: tint(p) };
    return p;
};

/**
 * Creates a regular polygon, then recursively subdivides it and tints
 */
const tessellation = (t: number, tessel: Tessellator<Vec2>[], tint: Tint) => {
    return circle2(W2)
        .toPolygon(Math.floor(12 + 9 * Math.sin(t)))
        .tessellate(tessel)
        .map(partial(tintedPoly, tint));
};

const cancel = start(() => {
    const t = Date.now() * 0.005;
    // create tessellation
    // resulting array contains Polygon2 values
    // Polygon2 implements the .toHiccup() method for
    // auto-conversion during hdom tree normalization
    const cells = tessellation(
        t,
        [quadFan, triFan, edgeSplit, quadFan],
        partial(arclengthToHSL, 250)
    );
    return ["div.ma2.sans-serif",
        ["div", `Cells: ${cells.length}`],
        [canvas,
            { width: 600, height: 600 },
            ["g",
                {
                    translate: [300, 300],
                    rotate: (t / 10) % TAU,
                    stroke: "#000",
                    weight: 0.25
                },
                ...cells]]];
});

// HMR handling
if (process.env.NODE_ENV !== "production") {
    const hot = (<any>module).hot;
    hot && hot.dispose(cancel);
}
