import type { Attribs } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { dot3 } from "@thi.ng/vectors/dot";
import { normalize } from "@thi.ng/vectors/normalize";
import { orthoNormal3 } from "@thi.ng/vectors/ortho-normal";
import { Plane } from "./api/plane.js";

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
