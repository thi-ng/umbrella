import { partition, wrap } from "@thi.ng/transducers";
import { ReadonlyVec, VecPair } from "@thi.ng/vectors";

export const edgeIterator =
    (vertices: Iterable<ReadonlyVec>, closed = false) =>
        <IterableIterator<VecPair>>partition(
            2, 1,
            closed ?
                wrap(vertices, 1, false, true) :
                vertices
        );
