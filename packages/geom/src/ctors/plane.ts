import { Attribs } from "@thi.ng/geom-api";
import {
    dot3,
    normalize,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors";
import { Plane } from "../api";

export const plane = (normal: Vec, w: number, attribs?: Attribs) =>
    new Plane(normalize(null, normal), w, attribs);

export const planeWithPoint = (
    normal: Vec,
    p: ReadonlyVec,
    attribs?: Attribs
) => {
    normal = normalize(null, normal);
    return new Plane(normal, -dot3(normal, p), attribs);
};
