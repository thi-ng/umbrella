import { MultiVecOpVV, ReadonlyVec, setC, setC4, vop } from "@thi.ng/vectors";
import type { Mat } from "./api";

/**
 * Computes outer/tensor product of vectors `u` and `v`. Returns square
 * matrix of same dimensions as vectors, e.g. 3x3 matrix for 3D vectors.
 *
 * {@link https://en.wikipedia.org/wiki/Outer_product}
 */
export const outerProduct: MultiVecOpVV = vop(1);

export const outerProduct2 = outerProduct.add(
    2,
    (out: Mat | null, [ux, uy]: ReadonlyVec, [vx, vy]: ReadonlyVec) =>
        setC4(out || [], ux * vx, uy * vx, ux * vy, uy * vy)
);

export const outerProduct3 = outerProduct.add(
    3,
    (out: Mat | null, [ux, uy, uz]: ReadonlyVec, [vx, vy, vz]: ReadonlyVec) =>
        setC(
            out || [],
            ux * vx,
            uy * vx,
            uz * vx,
            ux * vy,
            uy * vy,
            uz * vy,
            ux * vz,
            uy * vz,
            uz * vz
        )
);

export const outerProduct4 = outerProduct.add(
    4,
    (
        out: Mat | null,
        [ux, uy, uz, uw]: ReadonlyVec,
        [vx, vy, vz, vw]: ReadonlyVec
    ) =>
        setC(
            out || [],
            ux * vx,
            uy * vx,
            uz * vx,
            uw * vx,
            ux * vy,
            uy * vy,
            uz * vy,
            uw * vy,
            ux * vz,
            uy * vz,
            uz * vz,
            uw * vz,
            ux * vw,
            uy * vw,
            uz * vw,
            uw * vw
        )
);
