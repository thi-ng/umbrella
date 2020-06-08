import {
    dot3,
    normalize,
    orthoNormal3,
    ReadonlyVec,
    Vec,
} from "@thi.ng/vectors";
import { Plane } from "../api/plane";
import type { Attribs } from "@thi.ng/geom-api";

export const plane = (normal: Vec, w: number, attribs?: Attribs) =>
    new Plane(normalize(null, normal), w, attribs);

export const planeWithPoint = (
    normal: Vec,
    p: ReadonlyVec,
    attribs?: Attribs
) => {
    normal = normalize(null, normal);
    return new Plane(normal, dot3(normal, p), attribs);
};

export const planeFrom3Points = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    attribs?: Attribs
) => planeWithPoint(orthoNormal3([], a, b, c), a, attribs);
