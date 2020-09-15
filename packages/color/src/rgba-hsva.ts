import { EPS } from "@thi.ng/math";
import type { ColorOp } from "./api";
import { rgbaHcva } from "./rgba-hcva";

export const rgbaHsva: ColorOp = (out, src) => {
    out = rgbaHcva(out, src);
    out[1] /= out[2] + EPS;
    return out;
};
