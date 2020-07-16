import { EPS } from "@thi.ng/math";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Computes and returns the center of the circumcircle of the given 2D
 * triangle points. Returns `undefined` if the points are colinear or
 * coincident.
 *
 * @param a - triangle vertex 1
 * @param b - triangle vertex 2
 * @param c - triangle vertex 3
 * @param eps - epsilon value for colinear check
 */
export const circumCenter2 = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    eps = EPS
) => {
    const ax = a[0],
        ay = a[1];
    const bx = b[0],
        by = b[1];
    const cx = c[0],
        cy = c[1];

    const bax = bx - ax;
    const bay = by - ay;
    const cbx = cx - bx;
    const cby = cy - by;

    const deltaAB = Math.abs(bay);
    const deltaBC = Math.abs(cby);

    // colinear check
    if (
        (deltaAB < eps && deltaBC < eps) ||
        (Math.abs(bax) < eps && Math.abs(cbx) < eps)
    ) {
        return;
    }

    const abx2 = (ax + bx) / 2;
    const aby2 = (ay + by) / 2;
    const bcx2 = (bx + cx) / 2;
    const bcy2 = (by + cy) / 2;

    if (deltaAB < eps) {
        return [abx2, (-cbx / cby) * (abx2 - bcx2) + bcy2];
    }
    if (deltaBC < eps) {
        return [bcx2, (-bax / bay) * (bcx2 - abx2) + aby2];
    }
    let m1 = -bax / bay;
    let m2 = -cbx / cby;
    let mx1 = abx2;
    let my1 = aby2;
    let mx2 = bcx2;
    let my2 = bcy2;
    let xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
    let yc = deltaAB > deltaBC ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2;
    return [xc, yc];
};
