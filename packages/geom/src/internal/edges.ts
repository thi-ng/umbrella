import { wrap } from "@thi.ng/transducers/iter/wrap";
import { partition } from "@thi.ng/transducers/xform/partition";

export const edges = <T>(vertices: Iterable<T>, closed = false) => {
    return partition<T>(2, 1, closed ? wrap(vertices, 1, false, true) : vertices);
};
