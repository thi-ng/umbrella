import { EPS } from "@thi.ng/math/api";
import type { ColorOp } from "../api";
import { rgbHcv } from "./rgb-hcv";

export const rgbHsv: ColorOp = (out, src) => {
    out = rgbHcv(out, src);
    out[1] /= out[2] + EPS;
    return out;
};
