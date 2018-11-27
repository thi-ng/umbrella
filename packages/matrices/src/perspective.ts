import { Mat } from "./api";
import { frustum, frustumBounds } from "./frustum";

export const perspective = (
    out: Mat,
    fov: number,
    aspect: number,
    near: number,
    far: number) => {

    const f = frustumBounds(fov, aspect, near, far);
    return frustum(out, f.left, f.right, f.bottom, f.top, f.near, f.far);
};
