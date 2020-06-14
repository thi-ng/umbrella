import { centroid } from "@thi.ng/geom-poly-utils";
import {
    comp,
    map,
    partition,
    push,
    transduce,
    wrapSides,
    zip,
} from "@thi.ng/transducers";
import { mixN, ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { Tessellator } from "@thi.ng/geom-api";

export const tesselInset = (inset = 0.5, keepInterior = false): Tessellator => (
    points: ReadonlyVec[]
) => {
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
