import { EPS } from "@thi.ng/math";
import { Color, ReadonlyColor } from "./api";
import { rgbaHcva } from "./rgba-hcva";

export const rgbaHsva =
    (out: Color, src: ReadonlyColor) => {
        out = rgbaHcva(out, src);
        out[1] /= out[2] + EPS;
        return out;
    };
