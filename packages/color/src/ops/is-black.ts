import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyColor, TypedColor } from "../api";
import { EPS } from "../api/constants";
import { rgb } from "../rgb/rgb";

const isBlackHsv = (x: ReadonlyColor, eps = EPS) => x[2] <= eps;

const isBlackRgb = (x: ReadonlyColor, eps = EPS) =>
    x[0] <= eps && x[1] <= eps && x[2] <= eps;

const isBlackLch = (x: ReadonlyColor, eps = EPS) => x[0] <= eps;

export const isBlack = defmulti<TypedColor<any>, number | undefined, boolean>(
    (x) => x.mode,
    {},
    {
        hcy: isBlackHsv,
        hsi: isBlackHsv,
        hsl: isBlackHsv,
        hsv: isBlackHsv,
        labD50: isBlackLch,
        labD65: isBlackLch,
        lch: isBlackLch,
        rgb: isBlackRgb,
        ycc: isBlackRgb,
        [DEFAULT]: (x: any) => isBlackRgb(rgb(x)),
    }
);
