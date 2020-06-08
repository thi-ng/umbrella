import {
    comp,
    indexed,
    mapcat,
    partition,
    push,
    transduce,
} from "@thi.ng/transducers";
import type { SubdivKernel } from "@thi.ng/geom-api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * {@link http://algorithmicbotany.org/papers/subgpu.sig2003.pdf}
 *
 * @param kernel - subdivision scheme
 * @param pts - source points
 * @param iter - number of iterations
 */
export const subdivide = (
    pts: ReadonlyVec[],
    { fn, pre, size }: SubdivKernel,
    iter = 1
) => {
    while (--iter >= 0) {
        const nump = pts.length;
        pts = transduce<ReadonlyVec, ReadonlyVec, Vec[]>(
            comp(
                partition(size, 1),
                indexed(),
                mapcat(([i, pts]) => fn(pts, i, nump))
            ),
            push(),
            pre ? pre(pts) : pts
        );
    }
    return pts;
};
