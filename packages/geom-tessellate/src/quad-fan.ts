import { centroid } from "@thi.ng/geom-poly-utils";
import {
    comp,
    map,
    partition,
    push,
    transduce,
    wrap
} from "@thi.ng/transducers";
import { mixN, ReadonlyVec, Vec } from "@thi.ng/vectors";

export const quadFan =
    (points: ReadonlyVec[]) => {
        const p = centroid(points);
        return transduce(
            comp(
                partition<Vec>(3, 1),
                map(([a, b, c]) => [mixN([], a, b, 0.5), b, mixN([], b, c, 0.5), p])
            ),
            push(),
            wrap(points, 1, true, true)
        );
    };
