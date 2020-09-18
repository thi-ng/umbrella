import { IntersectionResult } from "@thi.ng/geom-api";
import { mag, normalize, ReadonlyVec, sub } from "@thi.ng/vectors";
import { intersectRayPolylineAll } from "./ray-poly";

export const intersectLinePolylineAll = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    pts: ReadonlyVec[],
    closed = false
): IntersectionResult => {
    const dir = sub([], b, a);
    const maxD = mag(dir);
    return intersectRayPolylineAll(
        a,
        normalize(null, dir),
        pts,
        closed,
        0,
        maxD
    );
};
