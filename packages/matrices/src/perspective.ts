import { Mat } from "./api";
import { frustum, frustumBounds } from "./frustum";

/**
 * Creates a 4x4 matrix perspective projection matrix and writes result
 * to `out`.
 *
 * @param out
 * @param fov
 * @param aspect
 * @param near
 * @param far
 */
export const perspective = (
    out: Mat | null,
    fov: number,
    aspect: number,
    near: number,
    far: number
) => {
    const f = frustumBounds(fov, aspect, near, far);
    return frustum(out, f.left, f.right, f.bottom, f.top, f.near, f.far);
};
