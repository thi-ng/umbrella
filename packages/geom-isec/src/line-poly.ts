import type { IntersectionResult } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mag } from "@thi.ng/vectors/mag";
import { normalize } from "@thi.ng/vectors/normalize";
import { sub } from "@thi.ng/vectors/sub";
import { intersectRayPolylineAll } from "./ray-poly.js";

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
