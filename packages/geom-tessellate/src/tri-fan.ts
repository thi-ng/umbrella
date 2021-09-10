import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/func/comp";
import { wrapSides } from "@thi.ng/transducers/iter/wrap-sides";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export const triFan: Tessellator = (points: ReadonlyVec[]) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<Vec>(2, 1),
            map(([a, b]) => [a, b, c])
        ),
        push(),
        wrapSides(points, 0, 1)
    );
};
