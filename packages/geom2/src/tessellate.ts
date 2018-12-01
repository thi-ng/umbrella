import { isFunction } from "@thi.ng/checks/is-function";
import { comp } from "@thi.ng/transducers/func/comp";
import { range } from "@thi.ng/transducers/iter/range";
import { repeat } from "@thi.ng/transducers/iter/repeat";
import { tuples } from "@thi.ng/transducers/iter/tuples";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { reducer } from "@thi.ng/transducers/reduce";
import { last } from "@thi.ng/transducers/rfn/last";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { map } from "@thi.ng/transducers/xform/map";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { partition } from "@thi.ng/transducers/xform/partition";
import { scan } from "@thi.ng/transducers/xform/scan";
import { ReadonlyVec, Vec } from "@thi.ng/vectors3/api";
import { mixN } from "@thi.ng/vectors3/mixn";
import { signedArea2 } from "@thi.ng/vectors3/signed-area";
import { Tessellator } from "./api";
import { centroid } from "./internal/centroid";
import { pointInTriangle2 } from "./internal/corner";
import { polygonArea } from "./internal/polygon";

const snip = (points: ReadonlyVec[], u: number, v: number, w: number, n: number, ids: number[]) => {
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

export const earCut = (points: ReadonlyVec[]) => {
    const tris: Vec[][] = [];
    let n = points.length;
    const ids = [
        ...(polygonArea(points) > 0 ?
            range(n) :
            range(n - 1, -1, -1))
    ];
    let count = 2 * n - 1;
    let v = n - 1, u, w, t;
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

export const triFan = (points: ReadonlyVec[]) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<Vec>(2, 1),
            map(([a, b]) => [a, b, c])
        ),
        push(),
        wrap(points, 1, false, true)
    );
};

export const quadFan = (points: ReadonlyVec[]) => {
    const p = centroid(points);
    return transduce(
        comp(
            partition<Vec>(3, 1),
            map(([a, b, c]) => [mixN([], a, b, 0.5), b, mixN([], b, c, 0.5), p])
        ),
        push(),
        wrap(points, 1, true, true)
    );
};

export const edgeSplit = (points: ReadonlyVec[]) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<Vec>(2, 1),
            mapcat(([a, b]) => {
                const m = mixN([], a, b, 0.5);
                return [[a, m, c], [m, b, c]];
            })),
        push(),
        wrap(points, 1, false, true)
    );
};

export const rimTris = (points: ReadonlyVec[]) => {
    const edgeCentroids = transduce(
        comp(
            partition<Vec>(2, 1),
            map((e) => mixN([], e[0], e[1], 0.5))
        ),
        push(),
        wrap(points, 1, false, true)
    );
    return transduce(
        comp(
            partition<Vec[]>(2, 1),
            map((t) => [t[0][0], t[1][1], t[1][0]])
        ),
        push(),
        [edgeCentroids],
        wrap([...tuples(edgeCentroids, points)], 1, true, false)
    );
};

export const inset = (inset = 0.5, keepInterior = false) =>
    (points: ReadonlyVec[]) => {
        const c = centroid(points);
        const inner = points.map((p) => mixN([], p, c, inset));
        return transduce(
            comp(
                partition<Vec[]>(2, 1),
                map(([[a, b], [c, d]]) => [a, b, d, c])
            ),
            push(),
            keepInterior ? [inner] : [],
            wrap([...tuples(points, inner)], 1, false, true)
        );
    };

export function tessellatePoints(points: ReadonlyVec[], tessFn: Tessellator, iter?: number): Vec[][];
export function tessellatePoints(points: ReadonlyVec[], tessFns: Iterable<Tessellator>): Vec[][];
export function tessellatePoints(...args): Vec[][] {
    return transduce(
        scan(
            reducer(
                () => [args[0]],
                (acc: Vec[][], fn: Tessellator) =>
                    transduce(
                        mapcat(fn),
                        push(),
                        acc
                    )
            )
        ),
        last(),
        isFunction(args[1]) ?
            repeat(args[1], args[2] || 1) :
            args[1]
    );
}
