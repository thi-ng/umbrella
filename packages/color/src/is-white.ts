import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { ReadonlyColor, TypedColor } from "./api.js";
import { EPS } from "./api/constants.js";
import { __dispatch0 } from "./internal/dispatch.js";
import { rgb } from "./rgb/rgb.js";

const isWhiteHsv = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[2] >= 1 - eps;

const isWhiteRgb = (x: ReadonlyColor, eps = EPS) => {
    eps = 1 - eps;
    return x[0] >= eps && x[1] >= eps && x[2] >= eps;
};

const isWhiteLch = (x: ReadonlyColor, eps = EPS) =>
    x[1] <= eps && x[0] >= 1 - eps;

export const isWhite = defmulti<TypedColor<any>, number | undefined, boolean>(
    __dispatch0,
    {
        hsl: "hsv",
        hsi: "hsv",
        labD50: "lch",
        labD65: "lch",
        srgb: "rgb",
        ycc: "lch",
    },
    {
        hcy: (x, eps = EPS) => x[1] <= eps && x[2] >= 1 - eps,
        hsv: isWhiteHsv,
        lch: isWhiteLch,
        rgb: isWhiteRgb,
        [DEFAULT]: (x: any) => isWhiteRgb(rgb(x)),
    }
);
