import { implementations } from "@thi.ng/defmulti";
import { Mat } from "@thi.ng/matrices/api";
import { add2 } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { mixBilinear2 } from "@thi.ng/vectors3/mix-bilinear";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    centroid,
    clipConvex,
    convexHull,
    edges,
    flip,
    perimeter,
    Quad2,
    resample,
    tessellate,
    transform,
    translate,
    Type,
    unmapPoint,
    vertices
} from "./api";
import "./container2";
import { transformPoints } from "./internal/transform";
import "./polygon";

export function quad(points: Vec[], attribs?: Attribs): Quad2 {
    return new Quad2(points, attribs);
}

implementations(
    Type.QUAD2,

    {
        [Type.POINTS2]: [
            bounds,
            flip,
        ],
        [Type.POLYGON2]: [
            arcLength,
            area,
            centroid,
            clipConvex,
            convexHull,
            edges,
            perimeter,
            resample,
            tessellate,
            vertices,
        ],
    },

    transform,
    (quad: Quad2, mat: Mat) =>
        new Quad2(
            transformPoints(quad.points, mat),
            { ...quad.attribs }
        ),

    translate,
    (quad: Quad2, delta: ReadonlyVec) =>
        new Quad2(
            quad.points.map((p) => add2([], p, delta)),
            { ...quad.attribs }
        ),

    unmapPoint,
    (quad: Quad2, p: ReadonlyVec, out?: Vec) => {
        const pts = quad.points;
        return mixBilinear2(out, pts[0], pts[1], pts[3], pts[2], p[0], p[1]);
    },

);
