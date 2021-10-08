import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyColor, TypedColor } from "./api";
import { EPS } from "./api/constants";
import { rgb } from "./rgb/rgb";

const isWhiteHsv = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[2] >= 1 - eps;

const isWhiteRgb = (x: ReadonlyColor, eps = EPS) => {
    eps = 1 - eps;
    return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};

const isWhiteLch = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[0] >= 1 - eps;

export const isWhite = defmulti<TypedColor<any>, number | undefined, boolean>(
    (x) => x.mode,
    {},
    {
        hcy: (x, eps = EPS) => x[1] <= eps && x[2] >= 1 - eps,
        hsi: isWhiteHsv,
        hsl: isWhiteHsv,
        hsv: isWhiteHsv,
        labD50: isWhiteLch,
        labD65: isWhiteLch,
        lch: isWhiteLch,
        rgb: isWhiteRgb,
        ycc: isWhiteLch,
        [DEFAULT]: (x: any) => isWhiteRgb(rgb(x)),
    }
);
