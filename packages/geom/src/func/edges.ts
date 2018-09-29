import { wrap } from "@thi.ng/transducers/iter/wrap";
import { partition } from "@thi.ng/transducers/xform/partition";

export const edges = <T>(vertices: T[], closed = false) => {
    return partition(2, 1, closed ? wrap(vertices, 1, false, true) : vertices);
};
