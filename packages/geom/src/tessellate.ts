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
import { IVector } from "@thi.ng/vectors/api";
import { Vec2 } from "@thi.ng/vectors/vec2";
import { Tessellator } from "./api";
import { polygonArea } from "./internal/area";
import { centroid } from "./internal/centroid";
import { corner, pointInTriangle2 } from "./internal/corner";

const snip = (points: ReadonlyArray<Vec2>, u: number, v: number, w: number, n: number, ids: number[]) => {
    const a = points[ids[u]];
    const b = points[ids[v]];
    const c = points[ids[w]];
    if (corner(a, b, c) > 0) {
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

export const earCut = (points: ReadonlyArray<Vec2>) => {
    const tris: Vec2[][] = [];
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

export const triFan = <T extends IVector<T>>(points: ReadonlyArray<T>) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<T>(2, 1),
            map(([a, b]) => [a, b, c])
        ),
        push(),
        wrap(points, 1, false, true)
    );
};

export const quadFan = <T extends IVector<T>>(points: ReadonlyArray<T>) => {
    const p = centroid(points);
    return transduce(
        comp(
            partition<T>(3, 1),
            map(([a, b, c]) => [a.mixNewN(b, 0.5), b, b.mixNewN(c, 0.5), p])
        ),
        push(),
        wrap(points, 1, true, true)
    );
};

export const edgeSplit = <T extends IVector<T>>(points: ReadonlyArray<T>) => {
    const c = centroid(points);
    return transduce(
        comp(
            partition<T>(2, 1),
            mapcat(([a, b]) => {
                const m = a.mixNewN(b, 0.5);
                return [[a, m, c], [m, b, c]];
            })),
        push(),
        wrap(points, 1, false, true)
    );
};

export const rimTris = <T extends IVector<T>>(points: ReadonlyArray<T>) => {
    const edgeCentroids = transduce(
        comp(
            partition<T>(2, 1),
            map((e) => e[0].mixNewN(e[1], 0.5))
        ),
        push(),
        wrap(points, 1, false, true)
    );
    return transduce(
        comp(
            partition<T[]>(2, 1),
            map((t) => [t[0][0], t[1][1], t[1][0]])
        ),
        push(),
        [edgeCentroids],
        wrap([...tuples(edgeCentroids, points)], 1, true, false)
    );
};

export const inset = (inset = 0.5, keepInterior = false) =>
    <T extends IVector<T>>(points: ReadonlyArray<T>) => {
        const c = centroid(points);
        const inner = points.map((p) => p.mixNewN(c, inset));
        return transduce(
            comp(
                partition<T[]>(2, 1),
                map(([[a, b], [c, d]]) => [a, b, d, c])
            ),
            push(),
            keepInterior ? [inner] : [],
            wrap([...tuples(points, inner)], 1, false, true)
        );
    };

export function tessellate<T extends IVector<T>>(points: T[], tessFn: Tessellator<T>, iter?: number): T[][];
export function tessellate<T extends IVector<T>>(points: T[], tessFns: Iterable<Tessellator<T>>): T[][];
export function tessellate<T extends IVector<T>>(...args): T[][] {
    return transduce(
        scan(
            reducer(
                () => [args[0]],
                (acc: T[][], fn: Tessellator<T>) =>
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

/*
v=require("@thi.ng/vectors"); g=require("@thi.ng/geom"); h=require("@thi.ng/hiccup"); svg=require("@thi.ng/hiccup-svg"); s=require("@thi.ng/strings"); tx=require("@thi.ng/transducers"); fs=require("fs");
*/