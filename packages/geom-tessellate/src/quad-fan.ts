import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/func/comp";
import { wrapSides } from "@thi.ng/transducers/iter/wrap-sides";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";

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
