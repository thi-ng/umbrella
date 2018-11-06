import { wrap } from "@thi.ng/transducers/iter/wrap";
import { partition } from "@thi.ng/transducers/xform/partition";
import { VecPair } from "../api";
import { Vec } from "@thi.ng/vectors2/api";

export const edges = (vertices: Iterable<Vec>, closed = false) =>
    <IterableIterator<VecPair>>partition(
        2, 1,
        closed ?
            wrap(vertices, 1, false, true) :
            vertices
    );
