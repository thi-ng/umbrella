import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/comp";
import { mapcat } from "@thi.ng/transducers/mapcat";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";

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
