import { centroid } from "@thi.ng/geom-poly-utils";
import {
    comp,
    mapcat,
    partition,
    push,
    transduce,
    wrapSides,
} from "@thi.ng/transducers";
import { mixN, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Tessellator } from "@thi.ng/geom-api";

export const edgeSplit: Tessellator = (points: ReadonlyVec[]) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<Vec>(2, 1),
            mapcat(([a, b]) => {
                const m = mixN([], a, b, 0.5);
                return [
                    [a, m, c],
                    [m, b, c],
                ];
            })
        ),
        push(),
        wrapSides(points, 0, 1)
    );
};
