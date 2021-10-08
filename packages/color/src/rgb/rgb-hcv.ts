import { EPS } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { setC3 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api";
import { clamp } from "../clamp";

/**
 * Based on:
 * {@link https://github.com/tobspr/GLSL-Color-Spaces/blob/develop/ColorSpaces.inc.glsl#L159}
 *
 * @param out - result
 * @param src - source color
 */
export const rgbHcv: ColorOp = (out, src) => {
    out = clamp(out || src, src);
    const p =
        out[1] < out[2]
            ? [out[2], out[1], -1, 2 / 3]
            : [out[1], out[2], 0, -1 / 3];
    const q =
        out[0] < p[0] ? [p[0], p[1], p[3], out[0]] : [out[0], p[1], p[2], p[0]];
    const c = q[0] - Math.min(q[1], q[3]);
    return setC3(
        out,
        clamp01(Math.abs((q[3] - q[1]) / (6 * c + EPS) + q[2])),
        clamp01(c),
        clamp01(q[0])
    );
};
