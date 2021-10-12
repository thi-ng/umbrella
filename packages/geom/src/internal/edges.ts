import { partition } from "@thi.ng/transducers/partition";
import { wrapSides } from "@thi.ng/transducers/wrap-sides";
import type { ReadonlyVec, VecPair } from "@thi.ng/vectors";

export const __edges = (vertices: Iterable<ReadonlyVec>, closed = false) =>
    <IterableIterator<VecPair>>(
        partition(2, 1, closed ? wrapSides(vertices, 0, 1) : vertices)
    );
