import { EPS } from "@thi.ng/math";
import type { ColorOp } from "../api";
import { rgbHcv } from "./rgb-hcv";

export const rgbHsl: ColorOp = (out, src) => {
    out = rgbHcv(out, src);
    out[2] -= out[1] * 0.5;
    out[1] /= 1 + EPS - Math.abs(out[2] * 2 - 1);
    return out;
};
