import { peek } from "@thi.ng/transducers/func/peek";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { partition } from "@thi.ng/transducers/xform/partition";
import { IDistance } from "@thi.ng/vectors/api";
import { SampleableVector } from "./api";

export const arcLength = <T extends IDistance<T>>(pts: Readonly<T>[], closed = false) => {
    const num = pts.length;
    if (num < 2) return 0;
    let i = pts[0];
    let j = pts[1];
    let res = 0;
    for (let k = 1; k < num; k++ , i = j, j = pts[k]) {
        res += i.dist(j);
    }
    closed && (res += i.dist(pts[0]));
    return res;
}

/**
 * Re-samples given polyline at given uniform distance. Returns array of
 * interpolated points (does not modify original).
 *
 * @param step sample distance
 * @param pts
 */
export const sampleUniform = <T extends SampleableVector<T>>(pts: T[], step: number) => {
    if (!pts.length) return [];
    let prev = pts[0];
    const res: T[] = [prev];
    for (let i = 1, n = pts.length; i < n; prev = peek(res), i++) {
        const p = pts[i];
        let d = p.dist(prev);
        while (d >= step) {
            res.push(prev = prev.copy().mixN(p, step / d));
            d -= step;
        }
    }
    res.push(peek(pts));
    return res;
};


export function edges<T>(vertices: T[], closed = false) {
    return partition(2, 1, closed ? wrap(vertices, 1, false, true) : vertices);
}
