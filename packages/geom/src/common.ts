import { wrap } from "@thi.ng/transducers/iter/wrap";
import { partition } from "@thi.ng/transducers/xform/partition";
import { ReadonlyVec, ReadonlyVecOp2 } from "@thi.ng/vectors/api";

export const arcLength = (dist: ReadonlyVecOp2<number>, buf: ReadonlyVec, num: number, offset: number, stride: number, closed = false) => {
    num--;
    let res = 0;
    for (let n = num, i = offset, j = i + stride; n > 0; n-- , i = j, j += stride) {
        res += dist(buf, buf, i, j);
    }
    if (closed) {
        res += dist(buf, buf, offset + num * stride, offset);
    }
    return res;
}

export const resample = () => { };

export function edges<T>(vertices: T[], closed = false) {
    return partition(2, 1, closed ? wrap(vertices, 1, false, true) : vertices);
}
