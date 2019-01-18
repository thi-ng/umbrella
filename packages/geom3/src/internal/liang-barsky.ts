import { EPS } from "@thi.ng/math";
import { Vec } from "@thi.ng/vectors3";

/**
 * Performs Liang-Barsky clipping with given line endpoints `la`, `lb`
 * and clipping rect defined by top-left `tr` and bottom-right `br`
 * points. The optional `ca` and `cb` vectors can be given to store the
 * result (clipped points). If omitted creates new vectors. Returns a
 * tuple of `[ca, cb, a, b]`, where the latter two values represent the
 * normalized distances of the clipped points relative to original given
 * line segment. Returns `undefined` iff the line lies completely
 * outside the rect.
 *
 * https://en.wikipedia.org/wiki/Liang%E2%80%93Barsky_algorithm
 * https://github.com/thi-ng/c-thing/blob/master/src/geom/clip/liangbarsky.c
 *
 * @param la
 * @param lb
 * @param tl
 * @param br
 * @param ca
 * @param cb
 */
export const liangBarsky = (
    la: Vec,
    lb: Vec,
    tl: Vec,
    br: Vec,
    ca: Vec = [],
    cb: Vec = []
): [Vec, Vec, number, number] => {
    const lax = la[0];
    const lay = la[1];
    const dx = lb[0] - lax;
    const dy = lb[1] - lay;
    let a = 0;
    let b = 1;

    const clip = (p: number, q: number) => {
        if (q < 0 && Math.abs(p) < EPS) {
            return 0;
        }
        const r = q / p;
        if (p < 0) {
            if (r > b) {
                return false;
            } else if (r > a) {
                a = r;
            }
        } else {
            if (r < a) {
                return false;
            } else if (r < b) {
                b = r;
            }
        }
        return true;
    };

    if (!(
        clip(-dx, -(tl[0] - lax)) &&
        clip(dx, br[0] - lax) &&
        clip(-dy, -(tl[1] - lay)) &&
        clip(dy, br[1] - lay)
    )) {
        return;
    }

    ca[0] = a * dx + lax;
    ca[1] = a * dy + lay;
    cb[0] = b * dx + lax;
    cb[1] = b * dy + lay;

    return [ca, cb, a, b];
};
