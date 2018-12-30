import { DEG2RAD } from "@thi.ng/math/api";
import { setC } from "@thi.ng/vectors3/setc";
import { Mat } from "./api";

export const frustum = (
    out: Mat,
    left: number,
    right: number,
    bottom: number,
    top: number,
    near: number,
    far: number) => {

    const dx = 1 / (right - left);
    const dy = 1 / (top - bottom);
    const dz = 1 / (far - near);

    return setC(
        out || [],
        near * 2 * dx, 0, 0, 0,
        0, near * 2 * dy, 0, 0,
        (right + left) * dx, (top + bottom) * dy, -(far + near) * dz, -1,
        0, 0, -(far * near * 2) * dz, 0,
    );
};

export const frustumBounds = (
    fovy: number,
    aspect: number,
    near: number,
    far: number) => {

    const top = near * Math.tan(fovy * DEG2RAD / 2);
    const right = top * aspect;

    return {
        left: -right,
        right,
        bottom: -top,
        top,
        near,
        far
    };
};
