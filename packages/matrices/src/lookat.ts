import type { ReadonlyVec } from "@thi.ng/vectors";
import { cross3 } from "@thi.ng/vectors/cross";
import { dot3 } from "@thi.ng/vectors/dot";
import { normalize } from "@thi.ng/vectors/normalize";
import { setC } from "@thi.ng/vectors/setc";
import { sub3 } from "@thi.ng/vectors/sub";
import type { Mat } from "./api";

/**
 * Constructs a 4x4 camera matrix for given `eye` position, look-at
 * `target` (both in world space) and normalized `up` vector. Creates
 * new matrix if `out` is `null`.
 *
 * @param out -
 * @param eye -
 * @param target -
 * @param up -
 */
export const lookAt = (
    out: Mat | null,
    eye: ReadonlyVec,
    target: ReadonlyVec,
    up: ReadonlyVec
): Mat => {
    const z = normalize(null, sub3([], eye, target));
    const x = normalize(null, cross3([], up, z));
    const y = normalize(null, cross3([], z, x));

    return setC(
        out || [],
        x[0],
        y[0],
        z[0],
        0,
        x[1],
        y[1],
        z[1],
        0,
        x[2],
        y[2],
        z[2],
        0,
        -dot3(eye, x),
        -dot3(eye, y),
        -dot3(eye, z),
        1
    );
};
