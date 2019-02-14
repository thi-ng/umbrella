import { EPS } from "@thi.ng/math";
import { Color, ReadonlyColor } from "./api";
import { rgbaHcva } from "./rgba-hcva";

export const rgbaHsla =
    (out: Color, src: ReadonlyColor) => {
        out = rgbaHcva(out, src);
        out[2] -= out[1] * 0.5;
        out[1] /= 1 + EPS - Math.abs(out[2] * 2 - 1);
        return out;
    };
