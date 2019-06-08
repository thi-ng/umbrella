import { EPS } from "@thi.ng/math";
import { Vec } from "@thi.ng/vectors";

/**
 * Performs Liang-Barsky clipping of the line segment with endpoints
 * `a`, `b` against the clipping rect defined by `min` and `max`. The
 * optional `ca` and `cb` vectors can be given to store the result
 * (clipped points). If omitted creates new vectors. Returns a tuple of
 * `[ca, cb, a, b]`, where the latter two values represent the
 * normalized distances of the clipped points relative to original given
 * line segment. Returns `undefined` iff the line lies completely
 * outside the rect.
 *
 * https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm
 * https://github.com/thi-ng/c-thing/blob/master/src/geom/clip/liangbarsky.c
 *
 * @param a
 * @param b
 * @param min
 * @param max
 * @param ca
 * @param cb
 */
export const liangBarsky2 = (
    a: Vec,
    b: Vec,
    min: Vec,
    max: Vec,
    ca?: Vec,
    cb?: Vec
): [Vec, Vec, number, number] | undefined => {
    const ax = a[0];
    const ay = a[1];
    const dx = b[0] - ax;
    const dy = b[1] - ay;
    let alpha = 0;
    let beta = 1;

    const clip = (p: number, q: number) => {
        if (q < 0 && Math.abs(p) < EPS) {
            return false;
        }
        const r = q / p;
        if (p < 0) {
            if (r > beta) {
                return false;
            } else if (r > alpha) {
                alpha = r;
            }
        } else {
            if (r < alpha) {
                return false;
            } else if (r < beta) {
                beta = r;
            }
        }
        return true;
    };

    if (
        !(
            clip(-dx, -(min[0] - ax)) &&
            clip(dx, max[0] - ax) &&
            clip(-dy, -(min[1] - ay)) &&
            clip(dy, max[1] - ay)
        )
    ) {
        return;
    }

    !ca && (ca = []);
    !cb && (cb = []);

    ca[0] = alpha * dx + ax;
    ca[1] = alpha * dy + ay;
    cb[0] = beta * dx + ax;
    cb[1] = beta * dy + ay;

    return [ca, cb, alpha, beta];
};
