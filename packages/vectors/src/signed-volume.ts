import type { FnU4 } from "@thi.ng/api";
import type { ReadonlyVec } from "./api.js";

/**
 * Returns 6x the signed volume of the tetrahedron defined by given 3D points.
 *
 * @remarks
 * Returns positive or negative value if `d` lies below/above the plane defined
 * by a,b,c respectively (where "below" is defined such that a,b,c are
 * counterclockwise if viewed from above). Returns zero if all points are
 * coplanar.
 *
 * Based on code by Jonathan R. Shewchuk
 * http://www.cs.cmu.edu/afs/cs/project/quake/public/code/predicates.c
 *
 * @param a - 
 * @param b - 
 * @param c - 
 * @param d - 
 */
export const signedVolume: FnU4<ReadonlyVec, number> = (
    a,
    b,
    c,
    [dx, dy, dz]
) => {
    const ady = a[1] - dy;
    const bdy = b[1] - dy;
    const cdy = c[1] - dy;
    const adz = a[2] - dz;
    const bdz = b[2] - dz;
    const cdz = c[2] - dz;
    return (
        (a[0] - dx) * (bdy * cdz - bdz * cdy) +
        (b[0] - dx) * (cdy * adz - cdz * ady) +
        (c[0] - dx) * (ady * bdz - adz * bdy)
    );
};
