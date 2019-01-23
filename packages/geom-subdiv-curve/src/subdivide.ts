import { SubdivKernel } from "@thi.ng/geom-api";
import {
    comp,
    indexed,
    mapcat,
    partition,
    push,
    transduce
} from "@thi.ng/transducers";
import { ReadonlyVec, Vec } from "@thi.ng/vectors";

/**
 * http://algorithmicbotany.org/papers/subgpu.sig2003.pdf
 *
 * @param kernel subdivision scheme
 * @param pts source points
 * @param recurse number of iterations
 */
export const subdivide = (
    pts: ReadonlyVec[],
    { fn, iter, size }: SubdivKernel,
    recurse = 1
) => {
    while (--recurse >= 0) {
        const nump = pts.length;
        pts = transduce<ReadonlyVec, ReadonlyVec, Vec[]>(
            comp(
                partition(size, 1),
                indexed(),
                mapcat(([i, pts]) => fn(pts, i, nump))
            ),
            push(),
            iter ? iter(pts) : pts
        );
    }
    return pts;
};
