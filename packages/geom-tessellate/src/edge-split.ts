import { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils";
import {
    comp,
    mapcat,
    partition,
    push,
    transduce,
    wrap
} from "@thi.ng/transducers";
import { mixN, ReadonlyVec, Vec } from "@thi.ng/vectors";

export const edgeSplit: Tessellator =
    (points: ReadonlyVec[]) => {
        const c = centroid(points);
        return transduce(
            comp(
                partition<Vec>(2, 1),
                mapcat(([a, b]) => {
                    const m = mixN([], a, b, 0.5);
                    return [[a, m, c], [m, b, c]];
                })),
            push(),
            wrap(points, 1, false, true)
        );
    };
