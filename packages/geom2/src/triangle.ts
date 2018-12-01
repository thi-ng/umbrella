import { implementations } from "@thi.ng/defmulti";
import { PI } from "@thi.ng/math/api";
import { Mat } from "@thi.ng/matrices/api";
import { add } from "@thi.ng/vectors3/add";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { divN } from "@thi.ng/vectors3/divn";
import { maddN } from "@thi.ng/vectors3/maddn";
import { mag } from "@thi.ng/vectors3/mag";
import { normalize } from "@thi.ng/vectors3/normalize";
import { perpendicularLeft2 } from "@thi.ng/vectors3/perpendicular";
import { signedArea2 } from "@thi.ng/vectors3/signed-area";
import { sub } from "@thi.ng/vectors3/sub";
import {
    arcLength,
    area,
    Attribs,
    bounds,
    centroid,
    classifyPoint,
    clipConvex,
    convexHull,
    edges,
    perimeter,
    pointInside,
    resample,
    tessellate,
    transform,
    translate,
    Triangle2,
    Type,
    vertices
} from "./api";
import { classifyPointInTriangle2, pointInTriangle2 } from "./internal/corner";
import { transformPoints } from "./internal/transform";

export function triangle(a: Vec, b: Vec, c: Vec, attribs?: Attribs) {
    return new Triangle2([a, b, c], attribs);
}

export const equilateralTriangle2 = (a: Vec, b: Vec) => {
    const dir = sub([], b, a);
    const c = normalize(null, perpendicularLeft2([], dir), mag(dir) * Math.sin(PI / 3));
    return new Triangle2([a, b, maddN(null, c, dir, 0.5)]);
};

implementations(
    Type.TRIANGLE2,

    {
        [Type.POINTS2]: [
            bounds,
        ],
        [Type.POLYGON2]: [
            arcLength,
            clipConvex,
            edges,
            perimeter,
            resample,
            tessellate,
            vertices,
        ]
    },

    area,
    (tri: Triangle2, signed = true) => {
        const area = 0.5 * signedArea2(...<[Vec, Vec, Vec]>tri.points);
        return signed ? area : Math.abs(area);
    },

    centroid,
    (tri: Triangle2, c?: Vec) => {
        const pts = tri.points;
        return divN(null, add(null, add(c, pts[0], pts[1]), pts[2]), 3);
    },

    classifyPoint,
    (tri: Triangle2, p: ReadonlyVec) =>
        classifyPointInTriangle2(p, ...<[Vec, Vec, Vec]>tri.points),

    convexHull,
    (tri: Triangle2) => tri,

    pointInside,
    (tri: Triangle2, p: ReadonlyVec) =>
        pointInTriangle2(p, ...<[Vec, Vec, Vec]>tri.points),

    transform,
    (tri: Triangle2, mat: Mat) =>
        new Triangle2(
            transformPoints(tri.points, mat),
            { ...tri.attribs }
        ),

    translate,
    (tri: Triangle2, delta: ReadonlyVec) =>
        new Triangle2(
            tri.points.map((p) => add([], p, delta)),
            { ...tri.attribs }
        ),
);
