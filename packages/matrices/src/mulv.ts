import {
    dotS2,
    dotS3,
    dotS4,
    ReadonlyVec,
    setC2,
    setC3,
    setC4,
    Vec,
    vop
} from "@thi.ng/vectors3";
import { MatOpMV, MultiMatOpMV } from "./api";

/**
 * Matrix-vector multiplication. Supports in-place modification, i.e. if
 * `out === v`.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV: MultiMatOpMV = vop(1);

/**
 * Multiplies M22 `m` with 2D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV22: MatOpMV =
    mulV.add(4, (out, m, v) =>
        setC2(
            out || v,
            dotS2(m, v, 0, 0, 2),
            dotS2(m, v, 1, 0, 2)
        )
    );

/**
 * Multiplies M23 `m` with 2D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV23: MatOpMV =
    mulV.add(6, (out, m, v) =>
        setC2(
            out || v,
            dotS2(m, v, 0, 0, 2) + m[4],
            dotS2(m, v, 1, 0, 2) + m[5]
        )
    );

/**
 * Multiplies M33 `m` with 3D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV33: MatOpMV =
    mulV.add(9, (out, m, v) =>
        setC3(
            out || v,
            dotS3(m, v, 0, 0, 3),
            dotS3(m, v, 1, 0, 3),
            dotS3(m, v, 2, 0, 3)
        )
    );

/**
 * Multiplies M44 `m` with 4D vector `v`. Supports in-place
 * modification, i.e. if `out === v`.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV44: MatOpMV =
    mulV.add(16, (out, m, v) =>
        setC4(
            out || v,
            dotS4(m, v, 0, 0, 4),
            dotS4(m, v, 1, 0, 4),
            dotS4(m, v, 2, 0, 4),
            dotS4(m, v, 3, 0, 4)
        )
    );

/**
 * Multiplies M44 `m` with 3D vector `v` and assumes `w=1`, i.e. the
 * vector is interpreted as `[x,y,z,1]`. After transformation applies
 * perspective divide of the resulting XYZ components.
 *
 * @param out
 * @param m
 * @param v
 */
export const mulV344: MatOpMV =
    (out, m, v) => {
        const w = dotS3(m, v, 3, 0, 4) || 1;
        return setC3(
            out || v,
            (dotS3(m, v, 0, 0, 4) + m[12]) / w,
            (dotS3(m, v, 1, 0, 4) + m[13]) / w,
            (dotS3(m, v, 2, 0, 4) + m[14]) / w
        );
    };

/**
 * Multiplies quaternion `q` with 3D vector `v`. Returns transformed
 * vector or modifies in-place if `out` is null or `v`.
 *
 * @param out
 * @param quat
 * @param v
 */
export const mulVQ =
    (out: Vec, quat: ReadonlyVec, v: ReadonlyVec) => {
        const { 0: px, 1: py, 2: pz } = v;
        const { 0: qx, 1: qy, 2: qz, 3: qw } = quat;
        const ix = qw * px + qy * pz - qz * py;
        const iy = qw * py + qz * px - qx * pz;
        const iz = qw * pz + qx * py - qy * px;
        const iw = -qx * px - qy * py - qz * pz;
        return setC3(
            out || v,
            ix * qw + iw * -qx + iy * -qz - iz * -qy,
            iy * qw + iw * -qy + iz * -qx - ix * -qz,
            iz * qw + iw * -qz + ix * -qy - iy * -qx
        );
    };
