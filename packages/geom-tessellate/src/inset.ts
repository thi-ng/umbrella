import type { Tessellator } from "@thi.ng/geom-api";
import { centroid } from "@thi.ng/geom-poly-utils/centroid";
import { comp } from "@thi.ng/transducers/func/comp";
import { wrapSides } from "@thi.ng/transducers/iter/wrap-sides";
import { zip } from "@thi.ng/transducers/iter/zip";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { partition } from "@thi.ng/transducers/xform/partition";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";

export const tesselInset =
    (inset = 0.5, keepInterior = false): Tessellator =>
    (points: ReadonlyVec[]) => {
        const c = centroid(points);
        const inner = points.map((p) => mixN([], p, c, inset));
        return transduce(
            comp(
                partition<Vec[]>(2, 1),
                map(([[a, b], [c, d]]) => [a, b, d, c])
            ),
            push(),
            keepInterior ? [inner] : [],
            wrapSides([...zip(points, inner)], 0, 1)
        );
    };
