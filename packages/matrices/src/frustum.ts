import { DEG2RAD } from "@thi.ng/math/api";
import { setC } from "@thi.ng/vectors/setc";
import type { Mat } from "./api.js";

/**
 * Constructs a 4x4 matrix representing the given view frustum. Creates
 * new matrix if `out` is `null`.
 *
 * @param out -
 * @param left -
 * @param right -
 * @param bottom -
 * @param top -
 * @param near -
 * @param far -
 */
export const frustum = (
    out: Mat | null,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number
): Mat => {
    const dx = 1 / (right - left);
    const dy = 1 / (top - bottom);
    const dz = 1 / (far - near);

    return setC(
        out || [],
        near * 2 * dx,
        0,
        0,
        0,
        0,
        near * 2 * dy,
        0,
        0,
        (right + left) * dx,
        (top + bottom) * dy,
        -(far + near) * dz,
        -1,
        0,
        0,
        -(far * near * 2) * dz,
        0
    );
};

export const frustumBounds = (
    fovy: number,
    aspect: number,
    near: number,
    far: number
) => {
    const top = near * Math.tan((fovy * DEG2RAD) / 2);
    const right = top * aspect;

    return {
        left: -right,
        right,
        bottom: -top,
        top,
        near,
        far,
    };
};
