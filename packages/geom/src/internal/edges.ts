import { wrapSides } from "@thi.ng/transducers/iter/wrap-sides";
import { partition } from "@thi.ng/transducers/xform/partition";
import type { ReadonlyVec, VecPair } from "@thi.ng/vectors";

export const edgeIterator = (vertices: Iterable<ReadonlyVec>, closed = false) =>
    <IterableIterator<VecPair>>(
        partition(2, 1, closed ? wrapSides(vertices, 0, 1) : vertices)
    );
