import { partition, wrap } from "@thi.ng/transducers";

export const edges =
    <T>(vertices: Iterable<T>, closed = false) =>
        partition<T>(2, 1, closed ? wrap(vertices, 1, false, true) : vertices);
