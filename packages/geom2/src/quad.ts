import { implementations, relations } from "@thi.ng/defmulti";
import { addNew, ReadonlyVec, Vec } from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import { mixBilinear2 } from "@thi.ng/vectors2/vec2";
import {
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

const type = Type.QUAD2;

relations(
    type,
    {
        [Type.POINTS2]: [
            bounds,
            flip,
        ],
        [Type.POLYGON2]: [
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
    }
);

implementations(
    type,

    transform,
    (quad: Quad2, mat: Mat23) =>
        new Quad2(
            transformPoints(quad.points, mat),
            { ...quad.attribs }
        ),

    translate,
    (quad: Quad2, delta: ReadonlyVec) =>
        new Quad2(
            quad.points.map((p) => addNew(p, delta)),
            { ...quad.attribs }
        ),

    unmapPoint,
    (quad: Quad2, p: ReadonlyVec, out?: Vec) => {
        const pts = quad.points;
        return mixBilinear2(pts[0], pts[1], pts[3], pts[2], p[0], p[1], out);
    },

);
