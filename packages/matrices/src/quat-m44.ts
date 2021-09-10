import { ReadonlyVec, ZERO3 } from "@thi.ng/vectors/api";
import { setC } from "@thi.ng/vectors/setc";
import type { Mat } from "./api";

/**
 * Converts quaternion into 4x4 matrix with optional 3D translation offset `t`,
 * then writes result to `out`.
 *
 * @param out -
 * @param q -
 */
export const quatToMat44 = (
    out: Mat | null,
    a: ReadonlyVec,
    t: ReadonlyVec = ZERO3
) => {
    const [x, y, z, w] = a;
    const x2 = x + x;
    const y2 = y + y;
    const z2 = z + z;
    const xx = x * x2;
    const xy = x * y2;
    const xz = x * z2;
    const yy = y * y2;
    const yz = y * z2;
    const zz = z * z2;
    const wx = w * x2;
    const wy = w * y2;
    const wz = w * z2;
    return setC(
        out || [],
        1 - yy - zz,
        xy + wz,
        xz - wy,
        0,
        xy - wz,
        1 - xx - zz,
        yz + wx,
        0,
        xz + wy,
        yz - wx,
        1 - xx - yy,
        0,
        t[0],
        t[1],
        t[2],
        1
    );
};
