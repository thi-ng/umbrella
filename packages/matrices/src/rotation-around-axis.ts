import { normalize as _normalize, ReadonlyVec, setC } from "@thi.ng/vectors";
import { Mat } from "./api";
import { mat33to44 } from "./m33-m44";

/**
 * Constructs a M33 representing a rotation of `theta` around `axis` and
 * writes result to `out`. If `normalize` is true (default false),
 * non-destructively first normalizes axis vector.
 *
 * @param out
 * @param axis
 * @param theta
 * @param normalize
 */
export const rotationAroundAxis33 = (
    out: Mat,
    axis: ReadonlyVec,
    theta: number,
    normalize = false
) => {
    const [x, y, z] = normalize ? _normalize([], axis) : axis;
    const s = Math.sin(theta);
    const c = Math.cos(theta);
    const t = 1 - c;
    return setC(
        out || [],
        x * x * t + c,
        y * x * t + z * s,
        z * x * t - y * s,
        x * y * t - z * s,
        y * y * t + c,
        z * y * t + x * s,
        x * z * t + y * s,
        y * z * t - x * s,
        z * z * t + c
    );
};

/**
 * Constructs a M44 representing a rotation of `theta` around `axis` and
 * writes result to `out`. If `normalize` is true (default false),
 * non-destructively first normalizes axis vector.
 *
 * @param out
 * @param axis
 * @param theta
 * @param normalize
 */
export const rotationAroundAxis44 = (
    out: Mat,
    axis: ReadonlyVec,
    theta: number,
    normalize = false
) => mat33to44(out, rotationAroundAxis33([], axis, theta, normalize));
