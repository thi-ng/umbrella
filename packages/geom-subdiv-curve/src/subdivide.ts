import type { SubdivKernel } from "@thi.ng/geom-api";
import { comp } from "@thi.ng/transducers/comp";
import { mapcatIndexed } from "@thi.ng/transducers/mapcat-indexed";
import { partition } from "@thi.ng/transducers/partition";
import { push } from "@thi.ng/transducers/push";
import { transduce } from "@thi.ng/transducers/transduce";
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
    while (iter-- > 0) {
        const nump = pts.length;
        pts = transduce<ReadonlyVec, ReadonlyVec, Vec[]>(
            comp(
                partition(size, 1),
                mapcatIndexed((i, pts) => fn(pts, i, nump))
            ),
            push(),
            pre ? pre(pts) : pts
        );
    }
    return pts;
};
