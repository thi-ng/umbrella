import { implementations } from "@thi.ng/defmulti";
import { PI } from "@thi.ng/math/api";
import {
    add,
    addNew,
    divN,
    maddN,
    mag,
    normalize,
    ReadonlyVec,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";
import { Mat23 } from "@thi.ng/vectors2/mat23";
import { perpendicularLeft2 } from "@thi.ng/vectors2/vec2";
import {
    area,
    Attribs,
    bounds,
    centroid,
    classifyPoint,
    clipConvex,
    edges,
    perimeter,
    pointInside,
    tessellate,
    transform,
    translate,
    Triangle2,
    Type,
    vertices,
    convexHull,
    resample
} from "./api";
import { classifyPointInTriangle2, pointInTriangle2, signedArea } from "./internal/corner";
import { transformPoints } from "./internal/transform";

export function triangle(a: Vec, b: Vec, c: Vec, attribs?: Attribs) {
    return new Triangle2([a, b, c], attribs);
}

export const equilateralTriangle = (a: Vec, b: Vec) => {
    const dir = subNew(b, a);
    const c = normalize(perpendicularLeft2(dir), mag(dir) * Math.sin(PI / 3));
    return new Triangle2([a, b, maddN(c, dir, 0.5)]);
};

implementations(
    Type.TRIANGLE2,

    {
        [Type.POINTS2]: [
            bounds,
        ],
        [Type.POLYGON2]: [
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
        const area = 0.5 * signedArea(...<[Vec, Vec, Vec]>tri.points);
        return signed ? area : Math.abs(area);
    },

    centroid,
    (tri: Triangle2, c?: Vec) => {
        const pts = tri.points;
        return divN(add(addNew(pts[0], pts[1], c), pts[2]), 3);
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
    (tri: Triangle2, mat: Mat23) =>
        new Triangle2(
            transformPoints(tri.points, mat),
            { ...tri.attribs }
        ),

    translate,
    (tri: Triangle2, delta: ReadonlyVec) =>
        new Triangle2(
            tri.points.map((p) => addNew(p, delta)),
            { ...tri.attribs }
        ),
);
