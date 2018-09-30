import { peek } from "@thi.ng/transducers/func/peek";
import { SampleableVector } from "../api";

/**
 * Re-samples given polyline at given uniform distance. Returns array of
 * interpolated points (does not modify original).
 *
 * @param step sample distance
 * @param pts
 */
export const sampleUniform = <T extends SampleableVector<T>>(pts: ReadonlyArray<T>, step: number) => {
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
