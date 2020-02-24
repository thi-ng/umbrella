import { EPS } from "@thi.ng/math";
import { rgbaHcva } from "./rgba-hcva";
import type { ColorOp } from "./api";

export const rgbaHsva: ColorOp = (out, src) => {
    out = rgbaHcva(out, src);
    out[1] /= out[2] + EPS;
    return out;
};
