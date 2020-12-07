import type { Tessellator } from "@thi.ng/geom-api";
import { pointInTriangle2 } from "@thi.ng/geom-isec";
import { polyArea2 } from "@thi.ng/geom-poly-utils";
import { range } from "@thi.ng/transducers";
import { ReadonlyVec, signedArea2, Vec } from "@thi.ng/vectors";

const snip = (
    points: ReadonlyVec[],
    u: number,
    v: number,
    w: number,
    n: number,
    ids: number[]
) => {
    const a = points[ids[u]];
    const b = points[ids[v]];
    const c = points[ids[w]];
    if (signedArea2(a, b, c) > 0) {
        for (let i = 0; i < n; i++) {
            if (i !== u && i !== v && i !== w) {
                if (pointInTriangle2(points[ids[i]], a, b, c)) {
                    return;
                }
            }
        }
        return [a, b, c];
    }
};

/**
 * Tessellator for simple 2D polygons.
 *
 * @param points - polygon vertices
 */
export const earCut2: Tessellator = (points: ReadonlyVec[]) => {
    const tris: Vec[][] = [];
    let n = points.length;
    const ids = [...(polyArea2(points) > 0 ? range(n) : range(n - 1, -1, -1))];
    let count = 2 * n - 1;
    let v = n - 1,
        u,
        w,
        t;
    while (count > 0 && n > 2) {
        u = n <= v ? 0 : v;
        v = u + 1;
        v = n <= v ? 0 : v;
        w = v + 1;
        w = n <= w ? 0 : w;
        t = snip(points, u, v, w, n, ids);
        if (t !== undefined) {
            tris.push(t);
            ids.splice(v, 1);
            n--;
            count = 2 * n;
        } else {
            count--;
        }
    }
    return tris;
};
