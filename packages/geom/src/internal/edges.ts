import { partition, wrap } from "@thi.ng/transducers";
import { ReadonlyVec } from "@thi.ng/vectors";
import { VecPair } from "../api";

export const edgeIterator =
    (vertices: Iterable<ReadonlyVec>, closed = false) =>
        <IterableIterator<VecPair>>partition(
            2, 1,
            closed ?
                wrap(vertices, 1, false, true) :
                vertices
        );
