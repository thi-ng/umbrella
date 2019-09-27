import { ReadonlyVec } from "@thi.ng/vectors";
import { Mat } from "./api";
import { concat } from "./concat";
import { mulM44 } from "./mulm";
import { quatFromEuler } from "./quat-euler";
import { quatToMat44 } from "./quat-m44";
import { rotation23 } from "./rotation";
import { scale23, scale44 } from "./scale";
import { translation23 } from "./translation";

/**
 * Creates 2x3 TRS transformation matrix from given translation vector,
 * rotation angle and scale factor/vector.
 *
 * @param out
 * @param translate
 * @param rotation
 * @param scale
 */
export const transform23 = (
    out: Mat | null,
    translate: ReadonlyVec,
    rotation: number,
    scale: number | ReadonlyVec
) =>
    concat(
        out,
        translation23([], translate),
        rotation23([], rotation),
        scale23([], scale)
    );

/**
 * Creates 4x4 TRS transformation matrix from given translation vector,
 * rotation angles (given as 3D vector) and scale factor/vector.
 * Internally, uses a quaternion for constructing the rotation matrix
 * part. The quaternion is created via `quatFromEuler()` with ZYX
 * ordering.
 *
 * @param out
 * @param translate
 * @param rotation
 * @param scale
 */
export const transform44 = (
    out: Mat | null,
    translate: ReadonlyVec,
    rotation: ReadonlyVec,
    scale: number | ReadonlyVec
) =>
    mulM44(
        out,
        quatToMat44(
            out,
            quatFromEuler("zyx", rotation[2], rotation[1], rotation[0]),
            translate
        ),
        scale44([], scale)
    );
