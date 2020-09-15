import { setC3 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { clamp } from "./clamp";
import { luminanceRGB } from "./luminance-rgb";

export const rgbaYcbcra: ColorOp = (out, src) => {
    out = clamp(out || src, src);
    const y = luminanceRGB(src);
    return setC3(out, y, (src[2] - y) * 0.565, (src[0] - y) * 0.713);
};
