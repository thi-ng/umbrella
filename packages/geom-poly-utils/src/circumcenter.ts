import { EPS } from "@thi.ng/math";
import { ReadonlyVec } from "@thi.ng/vectors";

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

    let m1, m2, mx1, mx2, my1, my2, xc, yc;

    const abx2 = (ax + bx) / 2;
    const aby2 = (ay + by) / 2;
    const bcx2 = (bx + cx) / 2;
    const bcy2 = (by + cy) / 2;

    if (deltaAB < eps) {
        m2 = -cbx / cby;
        mx2 = bcx2;
        my2 = bcy2;
        xc = abx2;
        yc = m2 * (xc - mx2) + my2;
    } else if (deltaBC < eps) {
        m1 = -bax / bay;
        mx1 = abx2;
        my1 = aby2;
        xc = bcx2;
        yc = m1 * (xc - mx1) + my1;
    } else {
        m1 = -bax / bay;
        m2 = -cbx / cby;
        mx1 = abx2;
        my1 = aby2;
        mx2 = bcx2;
        my2 = bcy2;
        xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        yc = deltaAB > deltaBC ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2;
    }

    return [xc, yc];
};
