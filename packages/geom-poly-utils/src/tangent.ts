import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addmN } from "@thi.ng/vectors/addmn";
import { direction } from "@thi.ng/vectors/direction";
import { mag } from "@thi.ng/vectors/mag";
import { mixN } from "@thi.ng/vectors/mixn";
import { normalize } from "@thi.ng/vectors/normalize";
import { perpendicularCCW } from "@thi.ng/vectors/perpendicular";
import { set } from "@thi.ng/vectors/set";
import { sub } from "@thi.ng/vectors/sub";

/**
 * Takes an array of polyline/polygon vertices and computes the tangent
 * directions for each (point).
 *
 * @remarks
 * Use `close=true` to indicate a polygon and cause the last tangent to be the
 * direction from last vertex to the first. If `close=false`, the last point's
 * tangent will be the same as the previous one.
 *
 * The optional `scale` arg can be used to scale the tangents (default: 1).
 *
 * @param pts - 
 * @param close - 
 * @param scale - 
 */
export const tangents = (pts: ReadonlyVec[], close = false, scale = 1) => {
    const n = pts.length - 1;
    const res: Vec[] = [];
    for (let i = 1; i <= n; i++) {
        res.push(direction([], pts[i - 1], pts[i], scale));
    }
    res.push(
        close ? direction([], pts[n], pts[0], scale) : set([], res[n - 1])
    );
    return res;
};

/**
 * Extended version of {@link tangents}. Takes an array of polyline/polygon
 * vertices and computes the smoothed tangent directions for each (point).
 *
 * @remarks
 * By default, the tangent direction is proportionally influenced by the length
 * ratio of a point's previous and current line segments: `currLen / (prevLen +
 * currLen)`.
 *
 * If `proportional` is disabled, the tangents will be the simple mean of the
 * direction of the prev/curr segments.
 *
 * The optional `scale` arg can be used to scale the tangents (default: 1).
 *
 * @param pts - 
 * @param close - 
 * @param proportional - 
 * @param scale - 
 */
export const smoothTangents = (
    pts: ReadonlyVec[],
    close = false,
    proportional = true,
    scale = 1
) => {
    const res: Vec[] = [];
    const n = pts.length - 1;
    if (n < 1) return res;
    let prev: Vec | undefined;
    let plen: number | undefined;
    if (close) {
        prev = sub([], pts[0], pts[n]);
        plen = mag(prev!);
        normalize(null, prev!);
    }
    let t: Vec;
    for (let i = 0; i <= n; i++) {
        let curr: Vec;
        let clen: number;
        if (i === n) {
            if (close) {
                curr = sub([], pts[0], pts[i]);
            } else {
                res.push(prev!);
                return res;
            }
        } else {
            curr = sub([], pts[i + 1], pts[i]);
        }
        clen = mag(curr);
        normalize(null, curr);
        if (i > 0 || close) {
            t = proportional
                ? mixN(
                      [],
                      prev!,
                      curr,
                      Math.min(1, clen / (clen + plen! + EPS))
                  )
                : addmN([], prev!, curr, 0.5);
        } else {
            t = set([], curr);
        }
        res.push(normalize(null, t, scale));
        prev = curr;
        plen = clen;
    }
    return res;
};

/**
 * Transforms an array of 2d tangent vectors into a new array with each tangent
 * rotated 90 degrees counter-clockwise.
 *
 * @param tangents - 
 */
export const bitangents2 = (tangents: ReadonlyVec[]) =>
    tangents.map((t) => perpendicularCCW([], t));
