import { centroid } from "@thi.ng/geom-poly-utils";
import {
    comp,
    map,
    partition,
    push,
    transduce,
    wrapSides,
} from "@thi.ng/transducers";
import { mixN, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Tessellator } from "@thi.ng/geom-api";

export const quadFan: Tessellator = (points: ReadonlyVec[]) => {
    const p = centroid(points);
    return transduce(
        comp(
            partition<Vec>(3, 1),
            map(([a, b, c]) => [mixN([], a, b, 0.5), b, mixN([], b, c, 0.5), p])
        ),
        push(),
        wrapSides(points)
    );
};
