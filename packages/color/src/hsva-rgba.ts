import { setC3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { clampH } from "./clamp";
import { hueRgba } from "./hue-rgba";

export const hsvaRgba: ColorOp = (out, src) => {
    out = clampH(out || src, src);
    const s = out[1];
    const v = out[2];
    hueRgba(out, src[0], out[3]);
    return setC3(
        out,
        ((out[0] - 1) * s + 1) * v,
        ((out[1] - 1) * s + 1) * v,
        ((out[2] - 1) * s + 1) * v
    );
};
