import { EPS } from "@thi.ng/math";
import { rgbaHcva } from "./rgba-hcva";
import type { ColorOp } from "./api";

export const rgbaHsla: ColorOp = (out, src) => {
    out = rgbaHcva(out, src);
    out[2] -= out[1] * 0.5;
    out[1] /= 1 + EPS - Math.abs(out[2] * 2 - 1);
    return out;
};
