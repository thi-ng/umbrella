import type { Fn3, FnN7, FnU4, FnU5 } from "@thi.ng/api";
import { closestT } from "@thi.ng/geom-closest-point/line";
import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import type { MultiVecOpImpl, ReadonlyVec } from "@thi.ng/vectors";
import { clockwise2 } from "@thi.ng/vectors/clockwise";
import { distSq } from "@thi.ng/vectors/distsq";
import { magSq } from "@thi.ng/vectors/magsq";
import { mixN } from "@thi.ng/vectors/mixn";
import { signedArea2 } from "@thi.ng/vectors/signed-area";
import { vop } from "@thi.ng/vectors/vop";

export const pointInSegment = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    eps = EPS
) => {
    const t = closestT(p, a, b);
    return t !== undefined
        ? distSq(p, mixN([], a, b, clamp01(t))) < eps * eps
        : false;
};

export const pointInCircle = (p: ReadonlyVec, pos: ReadonlyVec, r: number) =>
    distSq(pos, p) <= r * r;

export const pointInSphere = pointInCircle;

export const classifyPointInCircle = (
    p: ReadonlyVec,
    pos: ReadonlyVec,
    r: number,
    eps = EPS
) => sign(r * r - distSq(pos, p), eps);

/**
 * Returns positive value if `p` lies inside the circle passing through a,b,c.
 * Returns negative value if `p` is outside and zero if all 4 points are
 * cocircular.
 *
 * @remarks
 * Assumes a,b,c are in ccw order or else result will be have inverted sign.
 *
 * Based on Jonathan R. Shewchuck:
 * http://www.cs.cmu.edu/afs/cs/project/quake/public/code/predicates.c
 *
 * Also see {@link pointInCircumCircle}
 *
 * @param p
 * @param a
 * @param b
 * @param c
 */
export const pointIn3Circle: FnU4<ReadonlyVec, number> = (
    [px, py],
    a,
    b,
    c
) => {
    const apx = a[0] - px;
    const apy = a[1] - py;
    const bpx = b[0] - px;
    const bpy = b[1] - py;
    const cpx = c[0] - px;
    const cpy = c[1] - py;

    const abdet = apx * bpy - bpx * apy;
    const bcdet = bpx * cpy - cpx * bpy;
    const cadet = cpx * apy - apx * cpy;
    const alift = apx * apx + apy * apy;
    const blift = bpx * bpx + bpy * bpy;
    const clift = cpx * cpx + cpy * cpy;

    return alift * bcdet + blift * cadet + clift * abdet;
};

/**
 * Returns positive value if `p` lies inside the sphere passing through a,b,c,d.
 * Returns negative value if `p` is outside and zero if all 5 points are
 * cospherical.
 *
 * @remarks
 * Assumes a,b,c,d are in ccw order or else result will be have inverted sign.
 *
 * Based on Jonathan R. Shewchuck:
 * http://www.cs.cmu.edu/afs/cs/project/quake/public/code/predicates.c
 *
 * @param p
 * @param a
 * @param b
 * @param c
 * @param d
 */
export const pointIn4Sphere: FnU5<ReadonlyVec, number> = (
    [px, py, pz],
    a,
    b,
    c,
    d
) => {
    const apx = a[0] - px;
    const bpx = b[0] - px;
    const cpx = c[0] - px;
    const dpx = d[0] - px;
    const apy = a[1] - py;
    const bpy = b[1] - py;
    const cpy = c[1] - py;
    const dpy = d[1] - py;
    const apz = a[2] - pz;
    const bpz = b[2] - pz;
    const cpz = c[2] - pz;
    const dpz = d[2] - pz;

    const ab = apx * bpy - bpx * apy;
    const bc = bpx * cpy - cpx * bpy;
    const cd = cpx * dpy - dpx * cpy;
    const da = dpx * apy - apx * dpy;

    const ac = apx * cpy - cpx * apy;
    const bd = bpx * dpy - dpx * bpy;

    const abc = apz * bc - bpz * ac + cpz * ab;
    const bcd = bpz * cd - cpz * bd + dpz * bc;
    const cda = cpz * da + dpz * ac + apz * cd;
    const dab = dpz * ab + apz * bd + bpz * da;

    const alift = apx * apx + apy * apy + apz * apz;
    const blift = bpx * bpx + bpy * bpy + bpz * bpz;
    const clift = cpx * cpx + cpy * cpy + cpz * cpz;
    const dlift = dpx * dpx + dpy * dpy + dpz * dpz;

    return dlift * abc - clift * dab + (blift * cda - alift * bcd);
};

export const pointInCircumCircle: FnU4<ReadonlyVec, boolean> = (a, b, c, d) =>
    magSq(a) * signedArea2(b, c, d) -
        magSq(b) * signedArea2(a, c, d) +
        magSq(c) * signedArea2(a, b, d) -
        magSq(d) * signedArea2(a, b, c) >
    0;

export const pointInTriangle2: FnU4<ReadonlyVec, boolean> = (p, a, b, c) => {
    const s = clockwise2(a, b, c) ? 1 : -1;
    return (
        s * signedArea2(a, c, p) >= 0 &&
        s * signedArea2(b, a, p) >= 0 &&
        s * signedArea2(c, b, p) >= 0
    );
};

export const classifyPointInTriangle2 = (
    p: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    eps = EPS
) => {
    const s = clockwise2(a, b, c) ? 1 : -1;
    return sign(
        Math.min(
            s * signedArea2(a, c, p),
            s * signedArea2(b, a, p),
            s * signedArea2(c, b, p)
        ),
        eps
    );
};

export const pointInPolygon2 = (p: ReadonlyVec, pts: ReadonlyVec[]) => {
    const n = pts.length - 1;
    const px = p[0];
    const py = p[1];
    let a = pts[n];
    let b = pts[0];
    let inside = 0;
    for (let i = 0; i <= n; a = b, b = pts[++i]) {
        inside = classifyPointPolyPair(px, py, a[0], a[1], b[0], b[1], inside);
    }
    return inside;
};

export const classifyPointPolyPair: FnN7 = (px, py, ax, ay, bx, by, inside) =>
    ((ay < py && by >= py) || (by < py && ay >= py)) && (ax <= px || bx <= px)
        ? inside ^ (ax + ((py - ay) / (by - ay)) * (bx - ax) < px ? 1 : 0)
        : inside;

export const pointInBox: MultiVecOpImpl<
    Fn3<ReadonlyVec, ReadonlyVec, ReadonlyVec, boolean>
> = vop(0);

export const pointInRect = pointInBox.add(
    2,
    ([x, y]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
        x >= pos[0] &&
        x <= pos[0] + size[0] &&
        y >= pos[1] &&
        y <= pos[1] + size[1]
);

export const pointInAABB = pointInBox.add(
    3,
    ([x, y, z]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
        x >= pos[0] &&
        x <= pos[0] + size[0] &&
        y >= pos[1] &&
        y <= pos[1] + size[1] &&
        z >= pos[2] &&
        z <= pos[2] + size[2]
);

pointInBox.default((p, boxMin, boxSize) => {
    for (let i = p.length; --i >= 0; ) {
        const x = p[i];
        const y = boxMin[i];
        if (x < y || x > y + boxSize[i]) return false;
    }
    return true;
});

export const pointInCenteredBox: MultiVecOpImpl<
    Fn3<ReadonlyVec, ReadonlyVec, ReadonlyVec, boolean>
> = vop(0);

export const pointInCenteredRect = pointInCenteredBox.add(
    2,
    ([x, y], pos, size) =>
        x >= pos[0] - size[0] &&
        x <= pos[0] + size[0] &&
        y >= pos[1] - size[1] &&
        y <= pos[1] + size[1]
);

export const pointInCenteredAABB = pointInCenteredBox.add(
    3,
    ([x, y, z]: ReadonlyVec, pos: ReadonlyVec, size: ReadonlyVec) =>
        x >= pos[0] - size[0] &&
        x <= pos[0] + size[0] &&
        y >= pos[1] - size[1] &&
        y <= pos[1] + size[1] &&
        z >= pos[2] - size[2] &&
        z <= pos[2] + size[2]
);

pointInCenteredBox.default((p, boxCenter, boxExtent) => {
    for (let i = p.length; --i >= 0; ) {
        const x = p[i];
        const y = boxCenter[i];
        const z = boxExtent[i];
        if (x < y - z || x > y + z) return false;
    }
    return true;
});
