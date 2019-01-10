import { partition, wrap } from "@thi.ng/transducers";
import { Vec } from "@thi.ng/vectors3";
import { VecPair } from "../api";

export const edges =
    (vertices: Iterable<Vec>, closed = false) =>
        <IterableIterator<VecPair>>partition(
            2, 1,
            closed ?
                wrap(vertices, 1, false, true) :
                vertices
        );
